import { NextResponse } from "next/server";
import { ccConfigured, ccConnected, upsertContact } from "@/lib/constant-contact";
import { checkNonce } from "@/lib/form-nonce";
import { dbConfigured, recordSubscriber } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Morning With Jesus subscribe endpoint — signs people up directly.
 *
 * Spam is turned away first (honeypot + signed nonce; see lib/form-nonce.ts),
 * then the subscriber is added to Joe's Constant Contact list.
 *
 * Once Constant Contact is configured AND connected, its result decides the
 * response: a failure returns an error so the visitor can try again or email Joe,
 * instead of being told "you're all set" when they aren't. Before it's connected
 * — or if it isn't configured at all — the signup still succeeds and is captured
 * in the database and by notification email, so nobody is lost during setup.
 */

/** Bots that fill every field trip this; a person never sees it. */
function isBot(body: Record<string, unknown>): boolean {
  return typeof body.website === "string" && body.website.trim() !== "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const place = String(body.place ?? "").trim();

  // ── Spam checks ──────────────────────────────────────────────────────────
  // Answer bots with a plain 200 and no signup: a script that sees an error
  // retries with a different shape, while one that sees success moves on.
  if (isBot(body)) return NextResponse.json({ ok: true });

  const nonce = checkNonce(body.nonce);
  // A nonce that doesn't verify means tampering — drop it. A MISSING one can be
  // a real person whose nonce request failed, so let them through rather than
  // lose a subscriber to our own network hiccup.
  if (nonce === "invalid") return NextResponse.json({ ok: true });
  if (nonce === "missing") {
    console.warn("Subscribe submitted without a nonce — allowing", { email });
  }
  if (nonce === "too-fast") {
    return NextResponse.json(
      { ok: false, error: "That was quick — please try once more." },
      { status: 429 }
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const [firstName, ...rest] = name.split(/\s+/).filter(Boolean);
  const lastName = rest.join(" ");

  // ── Constant Contact ─────────────────────────────────────────────────────
  const connected = ccConfigured() && (await ccConnected().catch(() => false));
  if (connected) {
    try {
      await upsertContact({ email, firstName, lastName, city: place });
    } catch (err) {
      console.error("Constant Contact signup failed", err);
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn't complete your signup just now. Please try again in a moment.",
        },
        { status: 502 }
      );
    }
  }

  // ── Backups (best-effort; never block the visitor) ────────────────────────
  if (dbConfigured()) {
    try {
      await recordSubscriber({ email, name, city: place });
    } catch {
      // Ignore DB hiccups.
    }
  }

  // Until Constant Contact is connected, email each signup through so none are
  // lost while setup is being finished.
  const key = process.env.RESEND_API_KEY;
  const to = process.env.SUBSCRIBE_NOTIFY_EMAIL || process.env.PARTNER_NOTIFY_EMAIL;
  if (!connected && key && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Morning With Jesus <no-reply@elijahdesent.com>",
          to: [to],
          subject: `New Morning With Jesus subscriber: ${name || email}`,
          text: [
            `Name: ${name || "—"}`,
            `Email: ${email}`,
            `City/State: ${place || "—"}`,
            ``,
            `Constant Contact isn't connected yet, so this person needs adding to the list by hand.`,
          ].join("\n"),
        }),
      });
    } catch {
      // Don't fail the visitor's signup over the notification.
    }
  }

  return NextResponse.json({ ok: true });
}

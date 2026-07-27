import { NextResponse } from "next/server";
import { ccConfigured, upsertContact } from "@/lib/constant-contact";

export const runtime = "nodejs";

/**
 * Morning With Jesus subscribe endpoint.
 *
 * Adds the subscriber to Constant Contact when it's configured + connected, and
 * (if RESEND_API_KEY + SUBSCRIBE_NOTIFY_EMAIL are set) also emails a notification
 * as a backup. Both are best-effort — the visitor's signup always succeeds.
 */
export async function POST(request: Request) {
  let name = "";
  let email = "";
  let place = "";
  try {
    const body = await request.json();
    name = String(body.name ?? "").trim();
    email = String(body.email ?? "").trim();
    place = String(body.place ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
  }

  // Add to Constant Contact (best-effort — never block the visitor's signup).
  if (ccConfigured()) {
    try {
      const [firstName, ...rest] = name.split(/\s+/).filter(Boolean);
      await upsertContact({ email, firstName, lastName: rest.join(" ") });
    } catch {
      // Ignore — CC may not be connected yet, or the API may hiccup.
    }
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.SUBSCRIBE_NOTIFY_EMAIL;

  if (key && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Morning With Jesus <no-reply@elijahdesent.com>",
          to: [to],
          subject: `New Morning With Jesus subscriber: ${name || email}`,
          text: `Name: ${name}\nEmail: ${email}\nCity/State: ${place}`,
        }),
      });
    } catch {
      // Don't fail the visitor's signup if the notification email hiccups.
    }
  }

  return NextResponse.json({ ok: true });
}

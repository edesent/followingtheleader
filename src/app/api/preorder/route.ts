import { NextResponse } from "next/server";
import { checkNonce } from "@/lib/form-nonce";
import { dbConfigured, recordOrder } from "@/lib/db";
import { NEW_RELEASE, SITE } from "@/config/site";

export const runtime = "nodejs";

/**
 * Book preorder endpoint.
 *
 * There's no payment step: the preorder is emailed to Dr. Joe (reply-to the
 * reader, so he can answer with one tap) and the reader gets a confirmation.
 * Joe's copy is REQUIRED — if it can't be sent the reader gets an error and
 * Joe's address, so an order is never silently lost.
 *
 * Requires RESEND_API_KEY. PARTNER_NOTIFY_EMAIL overrides where Joe's copy goes.
 */

const FROM = "Following the Leader <orders@elijahdesent.com>";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MAX_QTY = 100;

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Escape for HTML and keep the reader's line breaks (addresses, notes). */
function escLines(s: string) {
  return esc(s).replace(/\r?\n/g, "<br />");
}

async function send(
  key: string,
  {
    to,
    subject,
    text,
    html,
    replyTo,
  }: { to: string; subject: string; text: string; html: string; replyTo?: string }
) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
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
  const phone = String(body.phone ?? "").trim();
  const address = String(body.address ?? "").trim();
  const message = String(body.message ?? "").trim();

  // ── Spam checks (same pair the subscribe form uses) ──────────────────────
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  const nonce = checkNonce(body.nonce);
  if (nonce === "invalid") return NextResponse.json({ ok: true });
  if (nonce === "missing") {
    console.warn("Preorder submitted without a nonce — allowing", { email });
  }
  if (nonce === "too-fast") {
    return NextResponse.json(
      { ok: false, error: "That was quick — please try once more." },
      { status: 429 }
    );
  }

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid name and email are required." },
      { status: 400 }
    );
  }

  const quantity = Math.min(MAX_QTY, Math.max(1, Math.round(Number(body.quantity) || 1)));

  const key = process.env.RESEND_API_KEY;
  const to = process.env.PARTNER_NOTIFY_EMAIL || SITE.email;
  if (!key) {
    console.error("Preorder received but RESEND_API_KEY is not set", { name, email, quantity });
    return NextResponse.json({ ok: false, error: "Email is not configured" }, { status: 500 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Copies", String(quantity)],
    ["Book", `${NEW_RELEASE.title} — ${NEW_RELEASE.tagline}`],
  ];

  /* ---------- 1. Joe's notification (required) ---------- */
  try {
    await send(key, {
      to,
      replyTo: email,
      subject: `Book preorder: ${name} — ${quantity} ${quantity === 1 ? "copy" : "copies"}`,
      text: [
        ...rows.map(([k, v]) => `${k}: ${v}`),
        ``,
        `Ship to:`,
        address || "—",
        ``,
        `Message:`,
        message || "—",
        ``,
        `Reply straight to this email to reach ${name}.`,
      ].join("\n"),
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;color:#1f2937">
          <p style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#8a6a2f;margin:0 0 6px">
            Following the Leader
          </p>
          <h2 style="font-size:22px;color:#1e3a5c;margin:0 0 18px">New book preorder</h2>
          <table style="border-collapse:collapse;width:100%;font-family:Helvetica,Arial,sans-serif;font-size:14px">
            ${rows
              .map(
                ([k, v]) => `<tr>
                  <td style="padding:7px 12px 7px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${k}</td>
                  <td style="padding:7px 0;color:#111827;font-weight:600">${esc(v)}</td>
                </tr>`
              )
              .join("")}
          </table>
          ${
            address
              ? `<p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;margin:22px 0 4px">Ship to</p>
                 <p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#111827;margin:0;padding:14px 16px;background:#f6f8fb;border-left:3px solid #c8a35a">${escLines(address)}</p>`
              : `<p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;margin:22px 0 0">No shipping address given — ask when you follow up.</p>`
          }
          ${
            message
              ? `<p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;margin:22px 0 4px">Message</p>
                 <p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#111827;margin:0;padding:14px 16px;background:#f6f8fb;border-left:3px solid #c8a35a">${escLines(message)}</p>`
              : ""
          }
          <p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;margin:24px 0 0">
            Reply straight to this email to reach ${esc(name)} at
            <a href="mailto:${esc(email)}" style="color:#1e3a5c">${esc(email)}</a>.
          </p>
        </div>`,
    });
  } catch (err) {
    console.error("Failed to email the book preorder to Joe", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your preorder just now. Please try again in a moment." },
      { status: 502 }
    );
  }

  /* ---------- 2. Confirmation to the reader (best-effort) ---------- */
  const firstName = name.split(/\s+/)[0];
  const copies = `${quantity} ${quantity === 1 ? "copy" : "copies"}`;
  try {
    await send(key, {
      to: email,
      replyTo: SITE.email,
      subject: `Your preorder — ${NEW_RELEASE.title}`,
      text: [
        `${firstName},`,
        ``,
        `Thank you for preordering ${copies} of ${NEW_RELEASE.title} — ${NEW_RELEASE.tagline}.`,
        ``,
        `There's nothing to pay yet. Joe will follow up with you personally with the total and how to send it, and your ${quantity === 1 ? "copy" : "copies"} will go out as soon as the book is printed.`,
        ``,
        `Grateful for you,`,
        `Following the Leader`,
        `${SITE.email} · ${SITE.phone}`,
      ].join("\n"),
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;color:#1f2937;line-height:1.65">
          <p style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#8a6a2f;margin:0 0 6px">
            Following the Leader
          </p>
          <h2 style="font-size:24px;color:#1e3a5c;margin:0 0 18px">Thank you, ${esc(firstName)}.</h2>
          <p style="margin:0 0 16px">
            Thank you for preordering <strong>${copies}</strong> of
            <em>${esc(NEW_RELEASE.title)} — ${esc(NEW_RELEASE.tagline)}</em>.
          </p>
          <p style="margin:0 0 16px">
            There&rsquo;s nothing to pay yet. Joe will follow up with you personally with the total and
            how to send it, and your ${quantity === 1 ? "copy" : "copies"} will go out as soon as the
            book is printed.
          </p>
          <p style="margin:0">
            Grateful for you,<br />
            <span style="color:#1e3a5c">Following the Leader</span>
          </p>
          <p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;margin:14px 0 0">
            <a href="mailto:${SITE.email}" style="color:#1e3a5c">${SITE.email}</a> &middot; ${SITE.phone}
          </p>
        </div>`,
    });
  } catch (err) {
    // Joe already has the preorder — don't fail the reader over the courtesy copy.
    console.error("Failed to email the reader their preorder confirmation", err);
  }

  /* ---------- 3. Record it (best-effort) ---------- */
  if (dbConfigured()) {
    try {
      await recordOrder({
        email,
        name,
        bookId: "following-the-leader",
        bookTitle: NEW_RELEASE.title,
        quantity,
        status: "preorder",
      });
    } catch {
      // Ignore DB hiccups.
    }
  }

  return NextResponse.json({ ok: true });
}

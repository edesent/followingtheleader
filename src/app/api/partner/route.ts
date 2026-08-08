import { NextResponse } from "next/server";
import { dbConfigured, recordPartner } from "@/lib/db";
import { SITE } from "@/config/site";

export const runtime = "nodejs";

/**
 * Partnership inquiry endpoint.
 *
 * Giving is by check right now — there is no payment step — so this form IS the
 * signup: it emails Dr. Joe the inquiry (reply-to set to the partner, so he can
 * answer with one tap) and sends the partner a confirmation with the mailing
 * address.
 *
 * Joe's notification is required: if it can't be sent, the visitor gets an error
 * and is pointed at Joe's email address, so an inquiry is never silently lost.
 * Requires RESEND_API_KEY. PARTNER_NOTIFY_EMAIL overrides where Joe's copy goes.
 */

const FROM = "Following the Leader <partner@elijahdesent.com>";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const GIVING_METHOD = "Check (by mail)";

const CHECK_ADDRESS = [
  "Following the Leader",
  SITE.address.line,
  `${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`,
].join("\n");

/** Escape user-supplied text for the HTML body of the emails. */
function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type SendArgs = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  bcc?: string[];
};

async function send(key: string, { to, subject, text, html, replyTo, bcc }: SendArgs) {
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
      ...(bcc && bcc.length ? { bcc } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

/**
 * Extra addresses blind-copied on every partner notification.
 * Set PARTNER_NOTIFY_BCC to one address, or several separated by commas.
 */
function notifyBcc(): string[] {
  return (process.env.PARTNER_NOTIFY_BCC || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  let name = "";
  let email = "";
  let phone = "";
  let org = "";
  let interest = "";
  let amount = "";
  let frequency = "";
  let message = "";

  try {
    const body = await request.json();
    name = String(body.name ?? "").trim();
    email = String(body.email ?? "").trim();
    phone = String(body.phone ?? "").trim();
    org = String(body.org ?? "").trim();
    interest = String(body.interest ?? "").trim();
    amount = String(body.amount ?? "").trim();
    frequency = String(body.frequency ?? "").trim();
    message = String(body.message ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid name and email are required" },
      { status: 400 }
    );
  }

  // Save to our database (best-effort — never block the submission).
  // `method` is always check while that's the only way to give; when online
  // giving is added, take it from the form again.
  if (dbConfigured()) {
    try {
      await recordPartner({
        name,
        email,
        phone,
        org,
        interest,
        amount,
        frequency,
        method: GIVING_METHOD,
        message,
      });
    } catch {
      // Ignore DB hiccups.
    }
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.PARTNER_NOTIFY_EMAIL || SITE.email;

  if (!key) {
    console.error("Partner inquiry received but RESEND_API_KEY is not set", { name, email });
    return NextResponse.json(
      { ok: false, error: "Email is not configured" },
      { status: 500 }
    );
  }

  const gift = amount ? `${amount}${frequency ? ` ${frequency.toLowerCase()}` : ""}` : "Not specified";
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Church / organization", org || "—"],
    ["Partnership type", interest || "—"],
    ["Gift in mind", gift],
    ["Giving method", GIVING_METHOD],
  ];

  /* ---------- 1. Joe's notification (required) ---------- */
  try {
    await send(key, {
      to,
      replyTo: email,
      bcc: notifyBcc(),
      subject: `New partnership inquiry: ${name}${amount ? ` — ${gift}` : ""}`,
      text: [
        ...rows.map(([k, v]) => `${k}: ${v}`),
        "",
        "Message:",
        message || "—",
        "",
        `Reply straight to this email to reach ${name}.`,
      ].join("\n"),
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;color:#1f2937">
          <p style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#8a6a2f;margin:0 0 6px">
            Following the Leader
          </p>
          <h2 style="font-size:22px;color:#1e3a5c;margin:0 0 18px">New partnership inquiry</h2>
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
            message
              ? `<p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;margin:22px 0 4px">Message</p>
                 <p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#111827;margin:0;padding:14px 16px;background:#f6f8fb;border-left:3px solid #c8a35a;white-space:pre-wrap">${esc(message)}</p>`
              : ""
          }
          <p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;margin:24px 0 0">
            Reply straight to this email to reach ${esc(name)} at
            <a href="mailto:${esc(email)}" style="color:#1e3a5c">${esc(email)}</a>.
          </p>
        </div>`,
    });
  } catch (err) {
    console.error("Failed to email the partnership inquiry to Joe", err);
    return NextResponse.json(
      { ok: false, error: "Could not send the inquiry" },
      { status: 502 }
    );
  }

  /* ---------- 2. Confirmation to the partner (best-effort) ---------- */
  const firstName = name.split(/\s+/)[0];
  try {
    await send(key, {
      to: email,
      replyTo: SITE.email,
      subject: "Thank you for partnering with Following the Leader",
      text: [
        `${firstName},`,
        "",
        "Thank you for stepping forward to partner with Following the Leader. Joe has your note and will follow up with you personally.",
        "",
        "To send your gift, make your check payable to Following the Leader and mail it to:",
        "",
        CHECK_ADDRESS,
        "",
        "Following the Leader is a federally recognized 501(c)(3) nonprofit ministry. Gifts are tax-deductible as allowed by law, and a receipt will be provided for every contribution. If you would prefer to give through a donor-advised fund or appreciated securities, just mention it when Joe reaches out.",
        "",
        "Grateful for you,",
        "Following the Leader",
        `${SITE.email} · ${SITE.phone}`,
      ].join("\n"),
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;color:#1f2937;line-height:1.65">
          <p style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#8a6a2f;margin:0 0 6px">
            Following the Leader
          </p>
          <h2 style="font-size:24px;color:#1e3a5c;margin:0 0 18px">Thank you, ${esc(firstName)}.</h2>
          <p style="margin:0 0 16px">
            Thank you for stepping forward to partner with Following the Leader. Joe has your note and
            will follow up with you personally.
          </p>
          <div style="padding:20px 22px;background:#f6f8fb;border:1px solid #e5e7eb;border-radius:12px;margin:0 0 18px">
            <p style="font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#1e3a5c;margin:0 0 10px">
              To send your gift
            </p>
            <p style="margin:0 0 12px">
              Make your check payable to <strong>Following the Leader</strong> and mail it to:
            </p>
            <p style="font-size:17px;color:#1e3a5c;margin:0;line-height:1.5">
              Following the Leader<br />${SITE.address.line}<br />${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}
            </p>
          </div>
          <p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.7;color:#6b7280;margin:0 0 20px">
            Following the Leader is a federally recognized 501(c)(3) nonprofit ministry. Gifts are
            tax-deductible as allowed by law, and a receipt will be provided for every contribution. If
            you&rsquo;d prefer to give through a donor-advised fund or appreciated securities, just
            mention it when Joe reaches out.
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
    // Joe already has the inquiry — don't fail the visitor over the courtesy copy.
    console.error("Failed to email the partner their confirmation", err);
  }

  return NextResponse.json({ ok: true });
}

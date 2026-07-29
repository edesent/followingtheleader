import { NextResponse } from "next/server";
import { dbConfigured, recordPartner } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Partnership inquiry endpoint.
 *
 * If RESEND_API_KEY + a notify address (PARTNER_NOTIFY_EMAIL, falling back to
 * SUBSCRIBE_NOTIFY_EMAIL) are set, the inquiry is emailed to Joe so he can
 * follow up personally. Without them the request still succeeds so the visitor
 * isn't blocked — but no email is sent, so set those env vars before relying on
 * this form to capture partners.
 */
export async function POST(request: Request) {
  let name = "";
  let email = "";
  let phone = "";
  let org = "";
  let interest = "";
  let amount = "";
  let frequency = "";
  let method = "";
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
    method = String(body.method ?? "").trim();
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
  if (dbConfigured()) {
    try {
      await recordPartner({ name, email, phone, org, interest, amount, frequency, method, message });
    } catch {
      // Ignore DB hiccups.
    }
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.PARTNER_NOTIFY_EMAIL || process.env.SUBSCRIBE_NOTIFY_EMAIL;

  if (key && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Following the Leader <partner@elijahdesent.com>",
          to: [to],
          reply_to: email,
          subject: `New partnership inquiry: ${name}${amount ? ` (${amount}${frequency ? ` ${frequency}` : ""})` : ""}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || "—"}`,
            `Church / Organization: ${org || "—"}`,
            `Partnership type: ${interest || "—"}`,
            `Intended gift: ${amount || "—"}${frequency ? ` (${frequency})` : ""}`,
            `Preferred giving method: ${method || "—"}`,
            ``,
            `Message:`,
            message || "—",
          ].join("\n"),
        }),
      });
    } catch {
      // Don't fail the visitor's submission if the notification email hiccups.
    }
  }

  return NextResponse.json({ ok: true });
}

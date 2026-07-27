import { NextResponse } from "next/server";

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
  let message = "";

  try {
    const body = await request.json();
    name = String(body.name ?? "").trim();
    email = String(body.email ?? "").trim();
    phone = String(body.phone ?? "").trim();
    org = String(body.org ?? "").trim();
    interest = String(body.interest ?? "").trim();
    amount = String(body.amount ?? "").trim();
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
          from: "Following the Leader <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject: `New partnership inquiry: ${name}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || "—"}`,
            `Church / Organization: ${org || "—"}`,
            `Interested in: ${interest || "—"}`,
            `Intended gift: ${amount || "—"}`,
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

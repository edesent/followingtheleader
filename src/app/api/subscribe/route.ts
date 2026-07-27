import { NextResponse } from "next/server";

/**
 * Morning With Jesus subscribe endpoint.
 *
 * If RESEND_API_KEY + SUBSCRIBE_NOTIFY_EMAIL are set, a notification is emailed
 * so the new subscriber can be added to the daily send list. Without them, the
 * request still succeeds (nothing is stored) — connect a mailing provider
 * (Resend, Mailchimp, etc.) when the site goes live.
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

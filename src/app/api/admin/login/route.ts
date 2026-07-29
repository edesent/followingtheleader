import { NextResponse } from "next/server";
import { authConfigured, isAdminEmail, createMagicToken } from "@/lib/admin-auth";
import { SITE } from "@/config/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!authConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin login isn't configured yet." },
      { status: 503 }
    );
  }

  let email = "";
  try {
    const body = await request.json();
    email = String(body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Only send a link to allow-listed admins, but always respond the same so we
  // don't reveal which addresses are admins.
  if (isAdminEmail(email)) {
    const token = createMagicToken(email);
    const link = `${SITE.url}/admin/verify?token=${encodeURIComponent(token)}`;
    const key = process.env.RESEND_API_KEY;
    if (key) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Following the Leader <login@elijahdesent.com>",
            to: [email],
            subject: "Your Following the Leader admin login link",
            text: `Click to sign in to your dashboard (this link is valid for 15 minutes):\n\n${link}\n\nIf you didn't request this, you can safely ignore this email.`,
          }),
        });
      } catch {
        // Don't reveal send failures to the client.
      }
    }
  }

  return NextResponse.json({ ok: true });
}

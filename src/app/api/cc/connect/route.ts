import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { ccConfigured, authorizeUrl } from "@/lib/constant-contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * One-time admin step: visit this URL to authorize Constant Contact.
 * Redirects to CC's login/consent screen; the callback stores the token.
 */
export async function GET() {
  if (!ccConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Constant Contact is not configured yet (missing env vars)." },
      { status: 503 }
    );
  }
  const state = crypto.randomBytes(16).toString("hex");
  const res = NextResponse.redirect(authorizeUrl(state));
  res.cookies.set("cc_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return res;
}

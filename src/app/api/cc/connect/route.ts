import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { ccConfigured, authorizeUrl } from "@/lib/constant-contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * One-time admin step: visit this URL to authorize Constant Contact.
 * Redirects to CC's login/consent screen; the callback stores the token.
 *
 * This URL never goes stale — every visit mints a new state and starts over. The
 * cookie below is the only clock, and it's deliberately generous: the person
 * doing this is signing into Constant Contact, possibly hunting for a password,
 * on someone else's schedule. Ten minutes wasn't enough in practice.
 */
const STATE_TTL_SECONDS = 60 * 60; // an hour to finish signing in

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
    maxAge: STATE_TTL_SECONDS,
    path: "/",
  });
  return res;
}

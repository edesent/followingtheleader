import { NextResponse } from "next/server";
import {
  authConfigured,
  verifyMagicToken,
  createSessionToken,
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  const email = authConfigured() ? verifyMagicToken(token) : null;

  if (!email) {
    return NextResponse.redirect(new URL("/admin/login?error=expired", request.url));
  }

  const res = NextResponse.redirect(new URL("/admin", request.url));
  res.cookies.set(ADMIN_COOKIE, createSessionToken(email), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}

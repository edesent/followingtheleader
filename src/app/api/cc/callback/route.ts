import { NextResponse } from "next/server";
import { ccConfigured, exchangeCode } from "@/lib/constant-contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function page(title: string, message: string, ok = false) {
  const color = ok ? "#2f5f92" : "#b0453a";
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head><body style="font-family:ui-sans-serif,system-ui,sans-serif;background:#f6f8fb;color:#1e3a5c;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:24px"><div style="max-width:440px;text-align:center;background:#fff;border:1px solid #e2e9f2;border-radius:16px;padding:40px"><h1 style="font-size:22px;margin:0 0 12px;color:${color}">${title}</h1><p style="font-size:15px;line-height:1.6;color:#46566c;margin:0">${message}</p></div></body></html>`,
    { status: ok ? 200 : 400, headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

export async function GET(request: Request) {
  if (!ccConfigured()) {
    return page("Not configured", "Constant Contact isn't configured yet.");
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");

  if (oauthError) {
    return page("Authorization declined", `Constant Contact returned: ${oauthError}.`);
  }

  // Verify state against the cookie set in /api/cc/connect.
  const cookie = request.headers.get("cookie") ?? "";
  const savedState = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("cc_oauth_state="))
    ?.slice("cc_oauth_state=".length);

  if (!state || !savedState || state !== savedState) {
    return page("Security check failed", "The authorization state didn't match. Please start again from /api/cc/connect.");
  }
  if (!code) {
    return page("Missing code", "No authorization code was returned by Constant Contact.");
  }

  try {
    await exchangeCode(code);
    const res = page(
      "Connected!",
      "Constant Contact is connected. New Morning With Jesus subscribers will now be added to your list automatically. You can close this tab.",
      true
    );
    res.cookies.set("cc_oauth_state", "", { maxAge: 0, path: "/" });
    return res;
  } catch (e) {
    return page("Connection error", `Something went wrong finishing the connection: ${(e as Error).message}`);
  }
}

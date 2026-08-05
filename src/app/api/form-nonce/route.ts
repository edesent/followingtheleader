import { NextResponse } from "next/server";
import { issueNonce } from "@/lib/form-nonce";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Hands a form a signed nonce when someone starts filling it in.
 * Submissions are checked against it, so scripted posts that never opened the
 * page (or fill it out in milliseconds) are rejected. Shared by the subscribe and
 * book-preorder forms. See lib/form-nonce.ts.
 */
export async function GET() {
  return NextResponse.json(
    { nonce: issueNonce() },
    { headers: { "Cache-Control": "no-store" } }
  );
}

/**
 * Signed form nonces — the anti-spam time trap.
 *
 * A form asks for a nonce when a real person starts filling it in; the nonce is
 * an HMAC over the issue time, so the server can prove a submission came from a
 * page that was actually opened, and reject anything submitted implausibly fast
 * (a script) or implausibly late (a stale replay). Nothing is stored server-side,
 * which keeps it working on serverless with no database.
 *
 * Pair it with a honeypot field: together they stop essentially all drive-by
 * form spam without making a real subscriber solve anything.
 */
import crypto from "node:crypto";

/** Faster than this and it wasn't a human typing. */
const MIN_AGE_MS = 2_000;
/** Older than this and the page has been sitting open (or is a replay). */
const MAX_AGE_MS = 60 * 60 * 1000;

function secret(): string {
  return (
    process.env.FORM_NONCE_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.CC_TOKEN_SECRET ||
    ""
  );
}

/** True when a signing secret is available (all of ours already set one). */
export function nonceConfigured(): boolean {
  return Boolean(secret());
}

function sign(issuedAt: number): string {
  return crypto.createHmac("sha256", secret()).update(String(issuedAt)).digest("base64url");
}

export function issueNonce(): string {
  const issuedAt = Date.now();
  return `${issuedAt}.${sign(issuedAt)}`;
}

/**
 * `missing` and `invalid` are deliberately separate. A submission with NO nonce
 * can be a real person whose nonce fetch failed, so callers should let it
 * through; a submission with a nonce that doesn't verify is tampering.
 */
export type NonceResult = "ok" | "missing" | "too-fast" | "invalid";

export function checkNonce(nonce: unknown): NonceResult {
  if (!nonceConfigured()) return "ok"; // no secret configured — don't block signups
  if (nonce === undefined || nonce === null || nonce === "") return "missing";
  if (typeof nonce !== "string" || !nonce.includes(".")) return "invalid";

  const [issuedRaw, mac] = nonce.split(".", 2);
  const issuedAt = Number(issuedRaw);
  if (!Number.isFinite(issuedAt) || !mac) return "invalid";

  const expected = sign(issuedAt);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return "invalid";

  const age = Date.now() - issuedAt;
  if (age < MIN_AGE_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "invalid";
  return "ok";
}

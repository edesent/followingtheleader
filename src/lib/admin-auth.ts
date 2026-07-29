/**
 * Admin authentication — passwordless magic-link login.
 *
 * No auth tables: magic-link tokens and session tokens are stateless, signed
 * with HMAC-SHA256 using AUTH_SECRET. Only emails in ADMIN_EMAILS may log in.
 */
import crypto from "node:crypto";

export const ADMIN_COOKIE = "ftl_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days (seconds)
const MAGIC_TTL_MS = 15 * 60 * 1000; // 15 minutes

export function authConfigured(): boolean {
  return Boolean(process.env.AUTH_SECRET && process.env.ADMIN_EMAILS);
}

export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string): boolean {
  return adminEmails().includes(email.trim().toLowerCase());
}

type Payload = { email: string; typ: "magic" | "session"; exp: number };

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return s;
}

function sign(payload: Payload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verify(token: string, typ: Payload["typ"]): string | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString()) as Payload;
    if (p.typ !== typ || typeof p.exp !== "number" || p.exp < Date.now()) return null;
    if (!isAdminEmail(p.email)) return null;
    return p.email.toLowerCase();
  } catch {
    return null;
  }
}

export function createMagicToken(email: string): string {
  return sign({ email: email.toLowerCase(), typ: "magic", exp: Date.now() + MAGIC_TTL_MS });
}
export function verifyMagicToken(token: string): string | null {
  return verify(token, "magic");
}
export function createSessionToken(email: string): string {
  return sign({ email: email.toLowerCase(), typ: "session", exp: Date.now() + SESSION_MAX_AGE * 1000 });
}
export function verifySessionToken(token: string): string | null {
  return verify(token, "session");
}

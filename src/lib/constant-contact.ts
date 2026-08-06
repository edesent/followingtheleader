/**
 * Constant Contact v3 integration.
 *
 * OAuth2 with refresh-token rotation. Because CC issues a NEW refresh token on
 * every refresh, we persist the current token set (encrypted with AES-256-GCM)
 * in Vercel Blob and rotate it in place. Everything is gated on env vars, so the
 * whole module stays dormant until the credentials are configured.
 *
 * Required env vars:
 *   CONSTANT_CONTACT_CLIENT_ID       — API Key from the CC developer portal
 *   CONSTANT_CONTACT_CLIENT_SECRET   — the app secret
 *   CONSTANT_CONTACT_LIST_ID         — list(s) subscribers are added to;
 *                                      comma-separate to use more than one
 *   CC_TOKEN_SECRET                  — random string; encrypts the stored token
 *   BLOB_READ_WRITE_TOKEN            — (already set) stores the token blob
 * Optional:
 *   CONSTANT_CONTACT_REDIRECT_URI    — defaults to the production callback URL
 */
import { put, list } from "@vercel/blob";
import crypto from "node:crypto";

const AUTHZ_BASE = "https://authz.constantcontact.com/oauth2/default/v1";
const API_BASE = "https://api.cc.email/v3";
const TOKEN_BLOB_PATH = "constant-contact/token.enc";
const SCOPES = "contact_data offline_access";

type StoredToken = {
  access_token: string;
  refresh_token: string;
  expires_at: number; // epoch ms (already includes a safety margin)
};

/**
 * CONSTANT_CONTACT_LIST_ID may name more than one list, comma-separated — a new
 * subscriber is added to all of them in a single call.
 */
function listIds(): string[] {
  return (process.env.CONSTANT_CONTACT_LIST_ID || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export function ccConfig() {
  return {
    clientId: process.env.CONSTANT_CONTACT_CLIENT_ID || "",
    clientSecret: process.env.CONSTANT_CONTACT_CLIENT_SECRET || "",
    listIds: listIds(),
    redirectUri:
      process.env.CONSTANT_CONTACT_REDIRECT_URI ||
      "https://followingtheleader.elijahdesent.com/api/cc/callback",
    tokenSecret: process.env.CC_TOKEN_SECRET || "",
    blobToken: process.env.BLOB_READ_WRITE_TOKEN || "",
  };
}

/** True when the app credentials + storage secrets are present. */
export function ccConfigured(): boolean {
  const c = ccConfig();
  return Boolean(c.clientId && c.clientSecret && c.tokenSecret && c.blobToken);
}

// ── encryption (AES-256-GCM) ──────────────────────────────────────────────
function encKey(): Buffer {
  const secret = ccConfig().tokenSecret;
  if (!secret) throw new Error("CC_TOKEN_SECRET is not set");
  return crypto.createHash("sha256").update(secret).digest();
}
function encrypt(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString("base64");
}
function decrypt(b64: string): string {
  const raw = Buffer.from(b64, "base64");
  const iv = raw.subarray(0, 12);
  const tag = raw.subarray(12, 28);
  const enc = raw.subarray(28);
  const decipher = crypto.createDecipheriv("aes-256-gcm", encKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}

// ── token storage (Vercel Blob) ───────────────────────────────────────────
async function readStored(): Promise<StoredToken | null> {
  const { blobToken } = ccConfig();
  const { blobs } = await list({ prefix: TOKEN_BLOB_PATH, token: blobToken, limit: 1 });
  const found = blobs.find((b) => b.pathname === TOKEN_BLOB_PATH) ?? blobs[0];
  if (!found) return null;
  const res = await fetch(found.url, { cache: "no-store" });
  if (!res.ok) return null;
  try {
    return JSON.parse(decrypt(await res.text())) as StoredToken;
  } catch {
    return null;
  }
}
async function writeStored(tok: StoredToken): Promise<void> {
  const { blobToken } = ccConfig();
  await put(TOKEN_BLOB_PATH, encrypt(JSON.stringify(tok)), {
    access: "public", // Vercel Blob is public-URL only; contents are encrypted.
    contentType: "text/plain",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
    token: blobToken,
  });
}

/** True when we have a stored token set (i.e. the one-time connect happened). */
export async function ccConnected(): Promise<boolean> {
  if (!ccConfigured()) return false;
  try {
    return (await readStored()) !== null;
  } catch {
    return false;
  }
}

// ── OAuth ─────────────────────────────────────────────────────────────────
export function authorizeUrl(state: string): string {
  const c = ccConfig();
  const p = new URLSearchParams({
    client_id: c.clientId,
    redirect_uri: c.redirectUri,
    response_type: "code",
    scope: SCOPES,
    state,
  });
  return `${AUTHZ_BASE}/authorize?${p.toString()}`;
}

async function tokenRequest(body: Record<string, string>): Promise<StoredToken> {
  const c = ccConfig();
  const basic = Buffer.from(`${c.clientId}:${c.clientSecret}`).toString("base64");
  const res = await fetch(`${AUTHZ_BASE}/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body).toString(),
  });
  if (!res.ok) {
    throw new Error(`CC token error ${res.status}: ${await res.text()}`);
  }
  const j = (await res.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
  return {
    access_token: j.access_token,
    refresh_token: j.refresh_token,
    expires_at: Date.now() + (j.expires_in - 120) * 1000,
  };
}

/** Exchange the one-time authorization code and store the initial token set. */
export async function exchangeCode(code: string): Promise<void> {
  const c = ccConfig();
  const tok = await tokenRequest({
    grant_type: "authorization_code",
    code,
    redirect_uri: c.redirectUri,
  });
  await writeStored(tok);
}

async function getAccessToken(): Promise<string> {
  const stored = await readStored();
  if (!stored) throw new Error("Constant Contact is not connected");
  if (Date.now() < stored.expires_at) return stored.access_token;
  const refreshed = await tokenRequest({
    grant_type: "refresh_token",
    refresh_token: stored.refresh_token,
  });
  await writeStored(refreshed);
  return refreshed.access_token;
}

// ── API calls ─────────────────────────────────────────────────────────────
/** Look up a list's id by its display name (used once during setup). */
export async function findListIdByName(name: string): Promise<string | null> {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}/contact_lists?include_count=false&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const j = (await res.json()) as { lists?: { list_id: string; name: string }[] };
  return j.lists?.find((l) => l.name.toLowerCase() === name.toLowerCase())?.list_id ?? null;
}

/**
 * Create or update a contact and add them to the configured list.
 *
 * `city` may arrive as free text ("Brownsville, TN"), so it's split into city and
 * state where possible — Constant Contact keeps those as separate fields.
 */
export async function upsertContact(input: {
  email: string;
  firstName?: string;
  lastName?: string;
  city?: string;
}): Promise<void> {
  const c = ccConfig();
  if (c.listIds.length === 0) throw new Error("CONSTANT_CONTACT_LIST_ID is not set");
  const token = await getAccessToken();

  let address: { kind: string; city?: string; state?: string } | undefined;
  const place = input.city?.trim();
  if (place) {
    const [city, ...restOfPlace] = place.split(",").map((s) => s.trim());
    address = { kind: "home", city: city || undefined, state: restOfPlace.join(", ") || undefined };
  }

  const res = await fetch(`${API_BASE}/contacts/sign_up_form`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: input.email,
      first_name: input.firstName || undefined,
      last_name: input.lastName || undefined,
      street_address: address,
      list_memberships: c.listIds,
    }),
  });
  if (!res.ok) {
    throw new Error(`CC contact error ${res.status}: ${await res.text()}`);
  }
}

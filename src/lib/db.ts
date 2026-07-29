/**
 * Database layer (Neon serverless Postgres).
 *
 * Everything is gated on DATABASE_URL, so the app runs fine without a database
 * (writes become no-ops). Tables are created by scripts/migrate.mjs.
 */
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export function dbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let _sql: NeonQueryFunction<false, false> | null = null;
function sql(): NeonQueryFunction<false, false> {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  if (!_sql) _sql = neon(process.env.DATABASE_URL);
  return _sql;
}

// ── Types ─────────────────────────────────────────────────────────────────
export type Subscriber = {
  id: number;
  email: string;
  name: string | null;
  city: string | null;
  created_at: string;
};
export type Partner = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  org: string | null;
  interest: string | null;
  amount: string | null;
  frequency: string | null;
  method: string | null;
  message: string | null;
  created_at: string;
};
export type Order = {
  id: number;
  email: string;
  name: string | null;
  book_id: string | null;
  book_title: string | null;
  quantity: number;
  amount_cents: number | null;
  status: string;
  provider_ref: string | null;
  created_at: string;
};

// ── Writes (best-effort; callers wrap in try/catch) ────────────────────────
export async function recordSubscriber(input: {
  email: string;
  name?: string;
  city?: string;
}): Promise<void> {
  const db = sql();
  await db`
    INSERT INTO subscribers (email, name, city)
    VALUES (${input.email}, ${input.name ?? null}, ${input.city ?? null})
    ON CONFLICT (email) DO UPDATE
      SET name = COALESCE(EXCLUDED.name, subscribers.name),
          city = COALESCE(EXCLUDED.city, subscribers.city)
  `;
}

export async function recordPartner(input: {
  name: string;
  email: string;
  phone?: string;
  org?: string;
  interest?: string;
  amount?: string;
  frequency?: string;
  method?: string;
  message?: string;
}): Promise<void> {
  const db = sql();
  await db`
    INSERT INTO partners (name, email, phone, org, interest, amount, frequency, method, message)
    VALUES (${input.name}, ${input.email}, ${input.phone ?? null}, ${input.org ?? null},
            ${input.interest ?? null}, ${input.amount ?? null}, ${input.frequency ?? null},
            ${input.method ?? null}, ${input.message ?? null})
  `;
}

export async function recordOrder(input: {
  email: string;
  name?: string;
  bookId?: string;
  bookTitle?: string;
  quantity?: number;
  amountCents?: number;
  status?: string;
  providerRef?: string;
}): Promise<void> {
  const db = sql();
  await db`
    INSERT INTO orders (email, name, book_id, book_title, quantity, amount_cents, status, provider_ref)
    VALUES (${input.email}, ${input.name ?? null}, ${input.bookId ?? null}, ${input.bookTitle ?? null},
            ${input.quantity ?? 1}, ${input.amountCents ?? null}, ${input.status ?? "paid"},
            ${input.providerRef ?? null})
  `;
}

// ── Reads (admin dashboard) ────────────────────────────────────────────────
export async function listSubscribers(limit = 500): Promise<Subscriber[]> {
  const db = sql();
  return (await db`SELECT * FROM subscribers ORDER BY created_at DESC LIMIT ${limit}`) as Subscriber[];
}
export async function listPartners(limit = 500): Promise<Partner[]> {
  const db = sql();
  return (await db`SELECT * FROM partners ORDER BY created_at DESC LIMIT ${limit}`) as Partner[];
}
export async function listOrders(limit = 500): Promise<Order[]> {
  const db = sql();
  return (await db`SELECT * FROM orders ORDER BY created_at DESC LIMIT ${limit}`) as Order[];
}

export async function counts(): Promise<{ subscribers: number; partners: number; orders: number }> {
  const db = sql();
  const [s] = (await db`SELECT COUNT(*)::int AS n FROM subscribers`) as { n: number }[];
  const [p] = (await db`SELECT COUNT(*)::int AS n FROM partners`) as { n: number }[];
  const [o] = (await db`SELECT COUNT(*)::int AS n FROM orders`) as { n: number }[];
  return { subscribers: s.n, partners: p.n, orders: o.n };
}

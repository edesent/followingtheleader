-- Following the Leader — database schema.
-- Applied by scripts/migrate.mjs (idempotent; safe to re-run).

CREATE TABLE IF NOT EXISTS subscribers (
  id          SERIAL PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  name        TEXT,
  city        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS partners (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  org         TEXT,
  interest    TEXT,
  amount      TEXT,
  frequency   TEXT,
  method      TEXT,
  message     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id           SERIAL PRIMARY KEY,
  email        TEXT NOT NULL,
  name         TEXT,
  book_id      TEXT,
  book_title   TEXT,
  quantity     INTEGER NOT NULL DEFAULT 1,
  amount_cents INTEGER,
  status       TEXT NOT NULL DEFAULT 'paid',
  provider_ref TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partners_created_at ON partners (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

// Apply scripts/schema.sql to the database in DATABASE_URL.
// Usage: DATABASE_URL=postgres://... node scripts/migrate.mjs
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!url) {
  console.error("DATABASE_URL / POSTGRES_URL is not set");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const schema = readFileSync(join(here, "schema.sql"), "utf8");

const sql = neon(url);
// Split on statement boundaries and run each (neon http driver runs one at a time).
const statements = schema
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s && !s.startsWith("--"));

for (const stmt of statements) {
  await sql.query(stmt);
  console.log("✓", stmt.split("\n")[0].slice(0, 60));
}
console.log("Migration complete.");

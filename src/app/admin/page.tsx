import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, authConfigured, verifySessionToken } from "@/lib/admin-auth";
import {
  dbConfigured,
  counts,
  listSubscribers,
  listPartners,
  listOrders,
} from "@/lib/db";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function fmtDate(s: string): string {
  const d = new Date(s);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function Shell({ email, children }: { email: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-hair bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              Following <span className="italic text-dawn-deep">the</span> Leader
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Admin Dashboard
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-muted sm:inline">{email}</span>
            <a
              href="/api/admin/logout"
              className="rounded-full border border-ink/15 px-4 py-2 font-semibold text-ink transition-colors hover:border-dawn-deep hover:text-dawn-deep"
            >
              Sign out
            </a>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-hair bg-paper p-6 shadow-sm">
      <p className="font-display text-4xl font-semibold text-dawn-deep">{value}</p>
      <p className="mt-1 text-sm font-medium text-muted">{label}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-hair bg-paper shadow-sm">
        {children}
      </div>
    </section>
  );
}

const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-muted";
const td = "px-4 py-3 text-sm text-ink align-top";

export default async function AdminPage() {
  const c = await cookies();
  const token = c.get(ADMIN_COOKIE)?.value;
  const email = authConfigured() && token ? verifySessionToken(token) : null;
  if (!email) redirect("/admin/login");

  if (!dbConfigured()) {
    return (
      <Shell email={email}>
        <div className="rounded-2xl border border-hair bg-paper p-8 text-center shadow-sm">
          <p className="font-display text-xl font-semibold text-ink">Database not connected yet</p>
          <p className="mx-auto mt-2 max-w-md text-body">
            Once the database is provisioned and <code>DATABASE_URL</code> is set, your subscribers,
            partners, and orders will appear here automatically.
          </p>
        </div>
      </Shell>
    );
  }

  const [cnt, subs, partners, orders] = await Promise.all([
    counts(),
    listSubscribers(),
    listPartners(),
    listOrders(),
  ]);

  return (
    <Shell email={email}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Subscribers" value={cnt.subscribers} />
        <StatCard label="Partners" value={cnt.partners} />
        <StatCard label="Book orders" value={cnt.orders} />
      </div>

      <Section title={`Subscribers (${cnt.subscribers})`}>
        {subs.length === 0 ? (
          <p className="px-4 py-6 text-sm text-muted">No subscribers yet.</p>
        ) : (
          <table className="w-full min-w-[560px]">
            <thead className="border-b border-hair">
              <tr>
                <th className={th}>Email</th>
                <th className={th}>Name</th>
                <th className={th}>City</th>
                <th className={th}>Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hair/70">
              {subs.map((s) => (
                <tr key={s.id}>
                  <td className={td}>{s.email}</td>
                  <td className={td}>{s.name || "—"}</td>
                  <td className={td}>{s.city || "—"}</td>
                  <td className={`${td} whitespace-nowrap text-muted`}>{fmtDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>

      <Section title={`Partners (${cnt.partners})`}>
        {partners.length === 0 ? (
          <p className="px-4 py-6 text-sm text-muted">No partner inquiries yet.</p>
        ) : (
          <table className="w-full min-w-[760px]">
            <thead className="border-b border-hair">
              <tr>
                <th className={th}>Name</th>
                <th className={th}>Email</th>
                <th className={th}>Interest</th>
                <th className={th}>Gift</th>
                <th className={th}>Method</th>
                <th className={th}>Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hair/70">
              {partners.map((p) => (
                <tr key={p.id}>
                  <td className={td}>
                    {p.name}
                    {p.org ? <span className="block text-xs text-muted">{p.org}</span> : null}
                  </td>
                  <td className={td}>
                    {p.email}
                    {p.phone ? <span className="block text-xs text-muted">{p.phone}</span> : null}
                  </td>
                  <td className={td}>{p.interest || "—"}</td>
                  <td className={td}>
                    {p.amount || "—"}
                    {p.frequency ? <span className="block text-xs text-muted">{p.frequency}</span> : null}
                  </td>
                  <td className={td}>{p.method || "—"}</td>
                  <td className={`${td} whitespace-nowrap text-muted`}>{fmtDate(p.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>

      <Section title={`Book orders (${cnt.orders})`}>
        {orders.length === 0 ? (
          <p className="px-4 py-6 text-sm text-muted">
            No orders yet. This will fill automatically once direct book sales are turned on.
          </p>
        ) : (
          <table className="w-full min-w-[640px]">
            <thead className="border-b border-hair">
              <tr>
                <th className={th}>Book</th>
                <th className={th}>Buyer</th>
                <th className={th}>Qty</th>
                <th className={th}>Amount</th>
                <th className={th}>Status</th>
                <th className={th}>Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hair/70">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className={td}>{o.book_title || o.book_id || "—"}</td>
                  <td className={td}>
                    {o.name || "—"}
                    <span className="block text-xs text-muted">{o.email}</span>
                  </td>
                  <td className={td}>{o.quantity}</td>
                  <td className={td}>
                    {o.amount_cents != null ? `$${(o.amount_cents / 100).toFixed(2)}` : "—"}
                  </td>
                  <td className={td}>{o.status}</td>
                  <td className={`${td} whitespace-nowrap text-muted`}>{fmtDate(o.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>
    </Shell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { SITE } from "@/config/site";

export const metadata: Metadata = { title: "Thank You", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function PartnerThankYou({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let name = "";
  let amountLabel = "";
  let monthly = false;
  if (session_id && stripeConfigured()) {
    try {
      const s = await getStripe().checkout.sessions.retrieve(session_id);
      name = (s.metadata?.name as string) || s.customer_details?.name || "";
      amountLabel =
        (s.metadata?.amount_label as string) ||
        (s.amount_total != null ? `$${(s.amount_total / 100).toFixed(2)}` : "");
      monthly = String(s.metadata?.frequency ?? "").toLowerCase() === "monthly";
    } catch {
      // Fall back to a generic thank-you.
    }
  }
  const firstName = name.split(/\s+/)[0];

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-cream">
      <div className="dawn-sky pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-dawn/20 text-dawn-deep">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Thank you{firstName ? `, ${firstName}` : ""}.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-body">
          {amountLabel ? (
            <>
              Your {monthly ? "monthly " : ""}gift of{" "}
              <span className="font-semibold text-ink">{amountLabel}</span> has been received.{" "}
            </>
          ) : (
            "Your gift has been received. "
          )}
          A receipt is on its way to your email. Because of partners like you, Following the Leader
          can keep helping people faithfully follow Jesus.
        </p>
        {monthly && (
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
            Your monthly partnership will continue automatically. To change or stop it at any time,
            just reply to your receipt or email {SITE.email}.
          </p>
        )}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-dawn-deep px-7 py-3.5 text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-colors hover:bg-ink"
          >
            Back to home
          </Link>
          <Link
            href="/morning-with-jesus#subscribe"
            className="rounded-full border border-ink/15 px-7 py-3.5 text-[0.98rem] font-semibold text-ink transition-colors hover:border-dawn-deep hover:text-dawn-deep"
          >
            Get the daily devotional
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { NEW_RELEASE } from "@/config/site";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="dawn-sky pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-2xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-dawn-deep/10 text-dawn-deep">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Thank you for your order
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-body">
          Your copy of <em>{NEW_RELEASE.title}</em> is on its way. It&apos;s printed to order and
          shipped directly to you — you&apos;ll receive a confirmation by email, and tracking once it
          ships. Thank you for supporting the ministry.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-ink px-7 py-3.5 text-[0.98rem] font-semibold text-white transition-colors hover:bg-dawn-deep"
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

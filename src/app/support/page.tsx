import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SUPPORT, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Morning With Jesus is free to more than 60,000 readers — and always will be. Become a monthly partner and help keep the daily devotional going.",
};

const partnerMailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
  "I'd like to partner with Following the Leader"
)}`;

export default function SupportPage() {
  return (
    <>
      <PageHero eyebrow={SUPPORT.eyebrow} title={SUPPORT.title} intro={SUPPORT.lead} />

      {/* Tiers */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-6 sm:grid-cols-2">
            {SUPPORT.tiers.map((tier, i) => (
              <Reveal key={tier.amount} delay={i * 90}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                    tier.highlight
                      ? "border-dawn-deep/30 bg-paper shadow-lg shadow-dawn-deep/10"
                      : "border-hair bg-paper shadow-sm"
                  }`}
                >
                  {tier.highlight && (
                    <span className="absolute right-6 top-6 rounded-full bg-dawn/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-dawn-deep">
                      Most chosen
                    </span>
                  )}
                  <p className="font-display text-4xl font-semibold text-ink">
                    {tier.amount}
                    <span className="text-lg font-normal text-muted">{tier.cadence}</span>
                  </p>
                  <p className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-body">{tier.body}</p>
                  <a
                    href={partnerMailto}
                    className={`mt-6 rounded-full px-6 py-3 text-center text-[0.95rem] font-semibold transition-colors ${
                      tier.highlight
                        ? "bg-dawn-deep text-white shadow-lg shadow-dawn-deep/20 hover:bg-ink"
                        : "border border-ink/15 text-ink hover:border-dawn-deep hover:text-dawn-deep"
                    }`}
                  >
                    Become a partner
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mx-auto mt-10 max-w-2xl text-center text-[0.98rem] leading-relaxed text-muted">
              {SUPPORT.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Other ways / contact */}
      <section className="border-t border-hair bg-cream-2/50">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              More ways to help
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-hair bg-paper p-7 text-left">
                <p className="font-display text-lg font-semibold text-ink">Buy a book</p>
                <p className="mt-2 text-body">
                  Every purchase through Christianbook sends a small donation back to the ministry.
                </p>
                <Link
                  href="/books"
                  className="mt-4 inline-flex text-[0.95rem] font-semibold text-dawn-deep hover:text-ink"
                >
                  Browse Joe&apos;s books →
                </Link>
              </div>
              <div className="rounded-2xl border border-hair bg-paper p-7 text-left">
                <p className="font-display text-lg font-semibold text-ink">Pray & share</p>
                <p className="mt-2 text-body">
                  Forward the morning devotional to a friend, and pray for those who read it each day.
                </p>
                <Link
                  href="/morning-with-jesus#subscribe"
                  className="mt-4 inline-flex text-[0.95rem] font-semibold text-dawn-deep hover:text-ink"
                >
                  Invite someone to subscribe →
                </Link>
              </div>
            </div>

            <div className="mt-10 text-sm text-muted">
              <p>Questions about partnering? Reach Joe directly:</p>
              <p className="mt-2">
                <a href={`mailto:${SITE.email}`} className="font-semibold text-ink hover:text-dawn-deep">
                  {SITE.email}
                </a>
                <span className="mx-2 text-hair-2">·</span>
                <a href={`tel:${SITE.phoneHref}`} className="font-semibold text-ink hover:text-dawn-deep">
                  {SITE.phone}
                </a>
              </p>
              <p className="mt-1">
                {SITE.address.line} · {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

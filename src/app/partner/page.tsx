import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { PARTNER, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Become a Founding Partner",
  description:
    "Join Dr. Joe Pettigrew in strengthening the Church for eternity. Partner with Following the Leader to equip believers, encourage pastors, and make disciples who make disciples.",
};

const partnerMailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
  "I'd like to explore partnering with Following the Leader"
)}`;

export default function PartnerPage() {
  return (
    <>
      <PageHero eyebrow={PARTNER.eyebrow} title={PARTNER.title} intro={PARTNER.lead} />

      {/* Opening vision */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {PARTNER.vision.heading}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5">
            {PARTNER.vision.body.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className="text-lg leading-relaxed text-body">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <figure className="mt-10 border-l-2 border-gold pl-6">
              <blockquote className="font-display text-xl italic leading-relaxed text-dawn-deep sm:text-2xl">
                &ldquo;{PARTNER.vision.verse.text}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                {PARTNER.vision.verse.ref}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* What God has already done */}
      <section className="border-y border-hair bg-cream-2/50">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-gold">He plants. He grows. He multiplies.</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
              {PARTNER.impact.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-body">
              {PARTNER.impact.lead}
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {PARTNER.impact.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="rounded-2xl border border-hair bg-paper px-4 py-8 shadow-sm">
                  <p className="font-display text-3xl font-semibold text-dawn-deep sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The burden */}
      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                {PARTNER.burden.heading}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-body">
                {PARTNER.burden.lead}
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PARTNER.burden.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-hair bg-paper p-7 shadow-sm">
                  <p className="font-display text-xl font-semibold text-ink">{item.title}</p>
                  <p className="mt-3 leading-relaxed text-body">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mx-auto mt-10 max-w-3xl text-center font-display text-xl italic leading-relaxed text-dawn-deep sm:text-2xl">
              {PARTNER.burden.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Your partnership makes the difference */}
      <section className="border-t border-hair bg-cream-2/50">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold text-ink sm:text-4xl">
              {PARTNER.difference.heading}
            </h2>
          </Reveal>
          <div className="mt-12 space-y-4">
            {PARTNER.difference.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="flex gap-5 rounded-2xl border border-hair bg-paper p-6 shadow-sm sm:p-7">
                  <span
                    className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-dawn/15 font-display text-lg font-semibold text-dawn-deep"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">{item.title}</p>
                    <p className="mt-1.5 leading-relaxed text-body">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The vision ahead */}
      <section className="relative overflow-hidden bg-ink">
        <div className="dawn-sky-dark pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-dawn">The best is yet to come</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
              {PARTNER.future.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {PARTNER.future.lead}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {PARTNER.future.goals.map((g, i) => (
              <Reveal key={g.label} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-7 backdrop-blur-sm">
                  <p className="font-display text-3xl font-semibold text-dawn">{g.value}</p>
                  <p className="mt-2 text-sm leading-snug text-white/70">{g.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Three ways to partner */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow text-gold">Three ways to partner in this vision</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Ways you can shape the future
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PARTNER.ways.map((way, i) => (
              <Reveal key={way.title} delay={i * 90}>
                <div
                  className={`flex h-full flex-col rounded-2xl border p-8 ${
                    way.highlight
                      ? "border-dawn-deep/30 bg-paper shadow-lg shadow-dawn-deep/10"
                      : "border-hair bg-paper shadow-sm"
                  }`}
                >
                  {way.highlight && (
                    <span className="mb-4 self-start rounded-full bg-dawn/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-dawn-deep">
                      Founding Partner
                    </span>
                  )}
                  <p className="font-display text-2xl font-semibold text-ink">{way.title}</p>
                  <p className="mt-4 flex-1 leading-relaxed text-body">{way.body}</p>
                  <p className="mt-5 font-display text-lg italic leading-snug text-dawn-deep">
                    {way.tagline}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Personal invitation from Joe */}
      <section className="border-t border-hair bg-cream-2/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            {/* Portrait */}
            <Reveal>
              <div className="mx-auto max-w-sm">
                <div className="relative">
                  <Image
                    src="/images/pastor-joe.jpg"
                    alt="Dr. Joe Pettigrew"
                    width={600}
                    height={800}
                    className="w-full rounded-2xl shadow-xl shadow-ink/20 ring-1 ring-hair"
                  />
                  <div className="absolute -bottom-3 left-1/2 h-px w-24 -translate-x-1/2 bg-gold" aria-hidden />
                </div>
                <div className="mt-6 text-center">
                  <p className="font-display text-2xl font-semibold text-ink">Dr. Joe Pettigrew</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    Founder · Following the Leader
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Invitation */}
            <Reveal delay={120}>
              <div>
                <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  {PARTNER.invitation.heading}
                </h2>
                <div className="mt-6 space-y-5">
                  {PARTNER.invitation.body.map((p, i) => (
                    <p key={i} className="text-lg leading-relaxed text-body">
                      {p}
                    </p>
                  ))}
                </div>
                <p className="mt-6 font-display text-xl italic text-dawn-deep">
                  {PARTNER.invitation.signoff}
                </p>

                <figure className="mt-8 border-l-2 border-gold pl-6">
                  <blockquote className="font-display text-lg italic leading-relaxed text-ink">
                    &ldquo;{PARTNER.invitation.verse.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    {PARTNER.invitation.verse.ref}
                  </figcaption>
                </figure>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href={partnerMailto}
                    className="rounded-full bg-dawn-deep px-7 py-3.5 text-center text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-colors hover:bg-ink"
                  >
                    {PARTNER.invitation.cta}
                  </a>
                  <div className="text-sm text-muted">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="font-semibold text-ink hover:text-dawn-deep"
                    >
                      {SITE.email}
                    </a>
                    <span className="mx-2 text-hair-2">·</span>
                    <a
                      href={`tel:${SITE.phoneHref}`}
                      className="font-semibold text-ink hover:text-dawn-deep"
                    >
                      {SITE.phone}
                    </a>
                  </div>
                </div>

                <p className="mt-6 text-sm text-muted">
                  Prefer to start smaller?{" "}
                  <Link href="/support" className="font-semibold text-dawn-deep hover:text-ink">
                    Become a monthly supporter →
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

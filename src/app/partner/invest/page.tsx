import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SignatureRule from "@/components/SignatureRule";
import GiveButton from "@/components/GiveButton";
import { INVEST, SITE } from "@/config/site";

/**
 * /partner/invest — the major-gift page for the $125,000 campaign.
 *
 * This is where Joe's personal letter sends people, so the page follows the
 * letter's arc: the turn from devotional to discipleship, what the study is,
 * what the money does, the no-salary commitment, the foundation already built,
 * then the direct ask. The letter itself is reproduced in full further down for
 * anyone who arrives without having read it.
 *
 * Unlisted by design — it is absent from NAV and PAGES (so it stays out of the
 * footer and the sitemap) and marked noindex below. Only the letter links here.
 */
export const metadata: Metadata = {
  title: "I Don’t Want You to Miss This Opportunity",
  description:
    "A personal request from Dr. Joe Pettigrew — help produce Following the Leader, a 40-day study on what it means to follow Jesus.",
  robots: { index: false, follow: false },
};

/** Quick-pick amounts for a major gift, replacing the monthly-partner presets. */
const GIFT_PRESETS = ["$1,000", "$5,000", "$10,000", "$25,000", "$50,000"];

/** What this page's giving form asks instead of the monthly tier question. */
const GIFT_INTERESTS = [
  "A one-time gift toward the $125,000 goal",
  "Underwrite part of the study",
  "I’d like to speak with Joe first",
  "I’m not sure yet — let’s talk",
];

/** Every give call on this page opens the form as a one-time major gift. */
function InvestButton({
  className,
  children,
  amount,
  ariaLabel,
}: {
  className: string;
  children: React.ReactNode;
  amount?: string;
  ariaLabel?: string;
}) {
  return (
    <GiveButton
      className={className}
      ariaLabel={ariaLabel}
      amount={amount}
      frequency="One-time"
      presets={GIFT_PRESETS}
      interests={GIFT_INTERESTS}
      eyebrow="Toward the $125,000 goal"
      title="Invest in Following the Leader"
      emphasizeMonthly={false}
    >
      {children}
    </GiveButton>
  );
}

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function CheckMark() {
  return (
    <svg {...svgProps} strokeWidth={2} className="h-4 w-4">
      <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />
    </svg>
  );
}

function GivingIcon() {
  return (
    <svg {...svgProps} className="h-10 w-10">
      <path d="M2 15.5c2.6 0 3.1 1.8 6.2 1.8H15a2 2 0 0 0 0-4h-3.5" />
      <path d="M14.7 6.1c-.9-.9-2.4-.9-3.3 0l-.2.2-.2-.2c-.9-.9-2.4-.9-3.3 0-.9.9-.9 2.4 0 3.3l3.5 3.4 3.5-3.4c.9-.9.9-2.4 0-3.3z" />
    </svg>
  );
}

export default function InvestPage() {
  return (
    <>
      <PageHero
        eyebrow={INVEST.hero.eyebrow}
        title={INVEST.hero.title}
        intro={INVEST.hero.lead}
      />

      {/* Straight to the ask for anyone who has already made up their mind,
          then the full case below for everyone still praying about it. */}
      <section className="border-b border-hair bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-10 text-center sm:px-8 sm:py-12">
          <Reveal>
            <InvestButton className="inline-flex items-center gap-2 rounded-full bg-dawn-deep px-8 py-3.5 text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/25 transition-colors hover:bg-ink">
              Make your gift
              <span aria-hidden>→</span>
            </InvestButton>
            <p className="mt-3 text-sm text-muted">
              Give securely by card, or by mail. Joe follows up personally either way.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The turn: from a few minutes of encouragement to real discipleship */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="font-display text-[2.1rem] font-semibold leading-[1.12] text-ink sm:text-[2.85rem]">
              {INVEST.opening.heading}
            </h2>
            <SignatureRule align="left" className="mt-5" />
          </Reveal>
          <div className="mt-6 space-y-5">
            {INVEST.opening.body.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className="text-lg leading-relaxed text-body">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140}>
            <p className="mt-10 border-l-2 border-gold pl-6 font-display text-2xl italic leading-snug text-dawn-deep sm:text-3xl">
              {INVEST.opening.pull}
            </p>
          </Reveal>
        </div>
      </section>

      {/* What the study is — the thing the money produces */}
      <section className="border-y border-hair bg-cream-2/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <Reveal>
              <div className="mx-auto max-w-xs lg:sticky lg:top-28">
                <Image
                  src="/images/following-the-leader.png"
                  alt="Following the Leader — a forty-day journey with Jesus, by Dr. Joe Pettigrew"
                  width={600}
                  height={800}
                  className="w-full rounded-xl shadow-xl shadow-ink/20"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <p className="eyebrow text-gold">{INVEST.study.eyebrow}</p>
                <h2 className="mt-4 font-display text-[2.1rem] font-semibold leading-[1.12] text-ink sm:text-[2.6rem]">
                  {INVEST.study.heading}
                </h2>
                <SignatureRule align="left" className="mt-5" />
                <div className="mt-6 space-y-5">
                  {INVEST.study.body.map((p, i) => (
                    <p key={i} className="text-lg leading-relaxed text-body">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Everything in the package */}
                <div className="mt-9 rounded-2xl border border-hair bg-paper p-7 shadow-sm sm:p-8">
                  <h3 className="font-display text-lg font-semibold uppercase tracking-[0.04em] text-ink">
                    {INVEST.study.includesTitle}
                  </h3>
                  <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {INVEST.study.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-relaxed text-body">
                        <span className="mt-0.5 shrink-0 text-gold" aria-hidden>
                          <CheckMark />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Who it is built for */}
          <Reveal className="mt-14">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {INVEST.study.audiencesTitle}
            </p>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {INVEST.study.audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-hair bg-paper p-7 text-center shadow-sm">
                  <p className="font-display text-xl font-semibold text-ink">{a.title}</p>
                  <p className="mt-2.5 leading-relaxed text-body">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The need — $125,000, and precisely what it does */}
      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow text-gold">{INVEST.need.eyebrow}</p>
              <p className="mt-5 font-display text-[3.5rem] font-semibold leading-none text-dawn-deep sm:text-[5rem]">
                {INVEST.need.amount}
              </p>
              <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.15] text-ink sm:text-[2.5rem]">
                {INVEST.need.heading}
              </h2>
              <SignatureRule className="mt-6" />
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
                {INVEST.need.lead}
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {INVEST.need.uses.map((use, i) => (
              <Reveal key={use.title} delay={i * 80}>
                <div className="flex h-full gap-5 rounded-2xl border border-hair bg-paper p-7 shadow-sm">
                  <span
                    className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-dawn/20 font-display text-lg font-semibold text-dawn-deep"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold text-ink">{use.title}</p>
                    <p className="mt-2 leading-relaxed text-body">{use.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The no-salary commitment — the trust statement gets its own band */}
      <section className="bg-ink">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-dawn">A word about the money</p>
            <h2 className="mt-5 font-display text-[1.9rem] font-semibold leading-[1.15] text-white sm:text-[2.6rem]">
              {INVEST.salary.heading}
            </h2>
            <SignatureRule className="mt-7" />
            <div className="mx-auto mt-7 max-w-2xl space-y-5">
              {INVEST.salary.body.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-white/85">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Not starting from nothing */}
      <section className="border-b border-hair bg-cream-2/50">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-gold">{INVEST.foundation.eyebrow}</p>
            <h2 className="mt-4 font-display text-[2.1rem] font-semibold text-ink sm:text-[2.85rem]">
              {INVEST.foundation.heading}
            </h2>
            <SignatureRule className="mt-6" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
              {INVEST.foundation.lead}
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {INVEST.foundation.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="h-full rounded-2xl border border-hair bg-paper px-4 py-8 shadow-sm">
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

      {/* The ask, with the letter's own gift levels */}
      <section id="give" className="scroll-mt-[84px] bg-cream">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow text-gold">{INVEST.ask.eyebrow}</p>
              <h2 className="mt-4 font-display text-[2.1rem] font-semibold leading-[1.12] text-ink sm:text-[2.85rem]">
                {INVEST.ask.heading}
              </h2>
              <SignatureRule className="mt-6" />
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
                {INVEST.ask.lead}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INVEST.ask.levels.map((level, i) => {
              const l = level as typeof level & { featured?: boolean; cta?: string };
              return (
                <Reveal key={l.amount} delay={i * 80}>
                  <InvestButton
                    amount={l.cta ? undefined : l.amount}
                    ariaLabel={
                      l.cta ? "Give another amount" : `Give a one-time gift of ${l.amount}`
                    }
                    className={`group flex h-full w-full flex-col rounded-2xl border p-7 text-left transition-all ${
                      l.featured
                        ? "border-dawn-deep bg-paper shadow-lg shadow-dawn-deep/15 ring-1 ring-dawn-deep hover:shadow-xl"
                        : "border-hair bg-paper shadow-sm hover:border-dawn-deep hover:shadow-md"
                    }`}
                  >
                    <span className="font-display text-3xl font-semibold text-gold">
                      {l.amount}
                    </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      One-time gift
                    </span>
                    <span className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-body">
                      {l.body}
                    </span>
                    <span
                      className={`mt-6 rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors ${
                        l.featured
                          ? "bg-dawn-deep text-white group-hover:bg-ink"
                          : "border border-ink/15 text-ink group-hover:border-dawn-deep group-hover:text-dawn-deep"
                      }`}
                    >
                      {l.cta ?? `Give ${l.amount}`}
                    </span>
                  </InvestButton>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <div className="mt-12 text-center">
              <p className="font-display text-2xl italic text-dawn-deep sm:text-3xl">
                {INVEST.ask.note}
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-body">
                {INVEST.ask.closing}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The personal weight of the request */}
      <section className="border-y border-hair bg-cream-2/50">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <Reveal>
            {INVEST.urgency.body.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-body">
                {p}
              </p>
            ))}
            <SignatureRule className="mt-7" />
            <p className="mt-7 font-display text-2xl italic leading-snug text-ink sm:text-3xl">
              {INVEST.urgency.pull}
            </p>
          </Reveal>
        </div>
      </section>

      {/* The letter, in full */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow text-gold">{INVEST.letter.eyebrow}</p>
              <h2 className="mt-4 font-display text-[2.1rem] font-semibold text-ink sm:text-[2.6rem]">
                {INVEST.letter.heading}
              </h2>
              <SignatureRule className="mt-6" />
              <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
                {INVEST.letter.lead}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 rounded-2xl border border-hair bg-paper p-7 shadow-sm sm:p-12">
              <p className="font-display text-xl text-ink">{INVEST.letter.salutation}</p>
              <div className="mt-6 space-y-6">
                {INVEST.letter.blocks.map((block, i) =>
                  "emphasis" in block ? (
                    <p
                      key={i}
                      className="text-center font-display text-xl font-semibold italic leading-snug text-dawn-deep sm:text-2xl"
                    >
                      {block.emphasis}
                    </p>
                  ) : (
                    <p key={i} className="leading-[1.85] text-body">
                      {block.p}
                    </p>
                  ),
                )}
              </div>

              {/* Signature */}
              <div className="mt-10 flex items-center gap-5 border-t border-hair pt-8">
                <Image
                  src="/images/pastor-joe.jpg"
                  alt="Dr. Joe Pettigrew"
                  width={200}
                  height={200}
                  className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-hair"
                />
                <div>
                  <p className="font-display text-2xl font-semibold text-ink">
                    {INVEST.letter.signature.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{INVEST.letter.signature.title}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    {INVEST.letter.signature.org}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final call */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/ftl-open-door.jpg"
          alt="An open wooden door looking out over a sunrise valley with a distant cross"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/88 via-ink/78 to-ink/92"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-28">
          <Reveal>
            <p className="eyebrow text-dawn">{INVEST.close.eyebrow}</p>
            <h2 className="mt-4 font-display text-[2.1rem] font-semibold leading-tight text-white sm:text-[2.85rem]">
              {INVEST.close.heading}
            </h2>
            <SignatureRule className="mt-6" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
              {INVEST.close.lead}
            </p>
            <InvestButton className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[0.98rem] font-semibold text-ink shadow-lg shadow-black/25 transition-colors hover:bg-dawn">
              {INVEST.close.cta}
              <span aria-hidden>→</span>
            </InvestButton>
            <p className="mx-auto mt-10 max-w-xl font-display text-xl italic leading-relaxed text-white/90">
              &ldquo;{INVEST.close.verse.text}&rdquo;
              <span className="mt-2 block text-xs font-semibold not-italic uppercase tracking-[0.18em] text-dawn">
                {INVEST.close.verse.ref}
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Practical details, then a way to reach Joe directly */}
      <section className="border-t border-hair bg-cream-2/50">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="rounded-2xl border border-gold/30 bg-paper p-7 shadow-sm sm:p-9">
              <div className="flex flex-col gap-5 sm:flex-row">
                <span className="shrink-0 text-dawn-deep">
                  <GivingIcon />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold uppercase tracking-[0.04em] text-ink">
                    {INVEST.giving.title}
                  </h3>
                  <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {INVEST.giving.points.map((p) => (
                      <li key={p} className="flex gap-2.5 leading-relaxed text-body">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                          aria-hidden
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-8 text-center">
              <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {INVEST.talk.heading}
              </h3>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-body">
                {INVEST.talk.body}
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <InvestButton className="rounded-full bg-dawn-deep px-7 py-3.5 text-center text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-colors hover:bg-ink">
                  {INVEST.talk.cta}
                </InvestButton>
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
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

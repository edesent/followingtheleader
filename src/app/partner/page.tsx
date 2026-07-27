import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SignatureRule from "@/components/SignatureRule";
import PartnerForm from "@/components/PartnerForm";
import { PARTNER, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Become a Founding Partner",
  description:
    "Join Dr. Joe Pettigrew in strengthening the Church for eternity. Partner with Following the Leader to equip believers, encourage pastors, and make disciples who make disciples.",
};

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Icon for each monthly-partner tier. */
function TierIcon({ name }: { name: string }) {
  switch (name) {
    case "cup":
      return (
        <svg {...svgProps} className="h-6 w-6">
          <path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" />
          <path d="M4 9h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
          <path d="M7.5 3.5c-.5.7-.5 1.3 0 2M10.5 3.5c-.5.7-.5 1.3 0 2M13.5 3.5c-.5.7-.5 1.3 0 2" />
        </svg>
      );
    case "people":
      return (
        <svg {...svgProps} className="h-6 w-6">
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <path d="M16 6.4a3 3 0 0 1 0 5.8" />
          <path d="M17.8 19a5.5 5.5 0 0 0-2.6-4.6" />
        </svg>
      );
    case "book":
      return (
        <svg {...svgProps} className="h-6 w-6">
          <path d="M12 6.5C10.6 5.2 8.6 4.5 6 4.5H4v13h3c2 0 3.8.5 5 1.5" />
          <path d="M12 6.5C13.4 5.2 15.4 4.5 18 4.5h2v13h-3c-2 0-3.8.5-5 1.5" />
          <path d="M12 6.5V19" />
        </svg>
      );
    case "globe":
      return (
        <svg {...svgProps} className="h-6 w-6">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17" />
          <path d="M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5C9.8 18.2 8.6 15.2 8.6 12S9.8 5.8 12 3.5z" />
        </svg>
      );
    case "heart":
      return (
        <svg {...svgProps} className="h-6 w-6">
          <path d="M12 20s-6.5-4.35-9-8.5C1.4 8.7 2.6 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.4 0 4.6 3.7 3 6.5-2.5 4.15-9 8.5-9 8.5z" />
        </svg>
      );
    default:
      return null;
  }
}

function ShieldIcon() {
  return (
    <svg {...svgProps} strokeWidth={1.4} className="h-12 w-12">
      <path d="M12 3 5 6v5.4c0 4.3 3 7.4 7 8.6 4-1.2 7-4.3 7-8.6V6z" />
      <path d="M12 8.2v6M9.2 10.6h5.6" />
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

export default function PartnerPage() {
  return (
    <>
      <PageHero eyebrow={PARTNER.eyebrow} title={PARTNER.title} intro={PARTNER.lead} />

      {/* Opening vision */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="font-display text-[2.1rem] font-semibold leading-[1.12] text-ink sm:text-[2.85rem]">
              {PARTNER.vision.heading}
            </h2>
            <SignatureRule align="left" className="mt-5" />
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
            <h2 className="mt-4 font-display text-[2.1rem] font-semibold text-ink sm:text-[2.85rem]">
              {PARTNER.impact.heading}
            </h2>
            <SignatureRule className="mt-6" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
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
              <h2 className="font-display text-[2.1rem] font-semibold text-ink sm:text-[2.85rem]">
                {PARTNER.burden.heading}
              </h2>
              <SignatureRule className="mt-6" />
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
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
            <div className="text-center">
              <h2 className="font-display text-[2.1rem] font-semibold text-ink sm:text-[2.85rem]">
                {PARTNER.difference.heading}
              </h2>
              <SignatureRule className="mt-6" />
            </div>
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
        <Image
          src="/images/ftl-path-sunrise.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/88 via-ink/78 to-ink/93"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-dawn">The best is yet to come</p>
            <h2 className="mt-4 font-display text-[2.1rem] font-semibold text-white sm:text-[2.85rem]">
              {PARTNER.future.heading}
            </h2>
            <SignatureRule className="mt-6" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
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

      {/* Become a Monthly Partner */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-[2.1rem] font-semibold text-ink sm:text-[2.85rem]">
              {PARTNER.monthly.title}
            </h2>
            <SignatureRule className="mt-6" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
              {PARTNER.monthly.intro}
            </p>
          </Reveal>
        </div>

        {/* Tiers — full-width horizontal scroller (pan with mouse or thumb) */}
        <Reveal className="mt-12">
          <div className="overflow-x-auto overscroll-x-contain pb-4">
            <ul className="flex w-max snap-x snap-mandatory gap-5 px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-56rem)/2))]">
              {PARTNER.monthly.tiers.map((tier) => (
                <li key={tier.name} className="w-[270px] shrink-0 snap-start sm:w-[300px]">
                  <div className="flex h-full flex-col rounded-2xl border border-hair bg-paper p-7 shadow-sm">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-dawn">
                      <TierIcon name={tier.icon} />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-[0.03em] text-ink">
                      {tier.name}
                    </h3>
                    <p className="mt-1.5 font-display text-2xl font-semibold text-gold">
                      {tier.price}
                      <span className="text-sm font-normal text-muted"> {tier.cadence}</span>
                    </p>
                    <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-body">{tier.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-2 text-center text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Scroll or swipe to see all levels →
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-4xl px-5 sm:px-8">
          {/* Stewardship commitment */}
          <Reveal>
            <div className="rounded-2xl border-2 border-dawn/30 bg-ink p-2">
              <div className="rounded-xl ring-1 ring-inset ring-dawn/40">
                <div className="flex flex-col items-start gap-5 p-7 sm:flex-row sm:p-9">
                  <span className="shrink-0 text-dawn">
                    <ShieldIcon />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold uppercase tracking-[0.04em] text-dawn">
                      {PARTNER.monthly.stewardship.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-white/85">
                      {PARTNER.monthly.stewardship.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Giving information */}
          <Reveal className="mt-6">
            <div className="rounded-2xl border border-gold/30 bg-cream-2/50 p-7 sm:p-9">
              <div className="flex flex-col gap-5 sm:flex-row">
                <span className="shrink-0 text-dawn-deep">
                  <GivingIcon />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold uppercase tracking-[0.04em] text-ink">
                    {PARTNER.monthly.giving.title}
                  </h3>
                  <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {PARTNER.monthly.giving.points.map((p) => (
                      <li key={p} className="flex gap-2.5 leading-relaxed text-body">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Verse + closing */}
          <Reveal className="mt-14 text-center">
            <p className="mx-auto max-w-2xl font-display text-xl italic leading-relaxed text-ink">
              &ldquo;{PARTNER.monthly.verse.text}&rdquo;
              <span className="mt-2 block text-sm font-semibold not-italic uppercase tracking-[0.16em] text-gold">
                {PARTNER.monthly.verse.ref}
              </span>
            </p>
            <SignatureRule className="mt-7" />
            <p className="mx-auto mt-7 max-w-2xl font-display text-lg font-semibold leading-relaxed text-ink">
              {PARTNER.monthly.closing[0]}
            </p>
            <p className="mx-auto mt-2 max-w-2xl font-display text-lg italic leading-relaxed text-dawn-deep">
              {PARTNER.monthly.closing[1]}
            </p>
            <a
              href="#signup"
              className="mt-9 inline-block rounded-full bg-dawn-deep px-8 py-3.5 text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-colors hover:bg-ink"
            >
              Become a partner
            </a>
          </Reveal>
        </div>
      </section>

      {/* Open door — a call to walk through it */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/ftl-open-door.jpg"
          alt="An open wooden door looking out over a sunrise valley with a distant cross"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/88 via-ink/78 to-ink/90"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-28">
          <Reveal>
            <p className="eyebrow text-dawn">God is opening a door</p>
            <h2 className="mt-4 font-display text-[2.1rem] font-semibold leading-tight text-white sm:text-[2.85rem]">
              We&apos;re looking for people to walk through it with Him.
            </h2>
            <SignatureRule className="mt-6" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
              Every great ministry begins with men and women who choose to believe in God&apos;s vision before
              the rest of the world can see it. We&apos;re praying God will raise up a small group of Founding
              Partners to help establish Following the Leader for generations to come.
            </p>
            <a
              href="#signup"
              className="mt-9 inline-block rounded-full bg-white px-8 py-3.5 text-[0.98rem] font-semibold text-ink shadow-lg shadow-black/25 transition-colors hover:bg-dawn"
            >
              Will you prayerfully consider it?
            </a>
          </Reveal>
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
                <h2 className="font-display text-[2.1rem] font-semibold text-ink sm:text-[2.85rem]">
                  {PARTNER.invitation.heading}
                </h2>
                <SignatureRule align="left" className="mt-5" />
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
                    href="#signup"
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
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Partnership signup form */}
      <section id="signup" className="scroll-mt-24 border-t border-hair bg-cream">
        <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal className="text-center">
            <p className="eyebrow text-gold">Become a Partner</p>
            <h2 className="mt-4 font-display text-[2.1rem] font-semibold text-ink sm:text-[2.85rem]">
              Take the first step
            </h2>
            <SignatureRule className="mt-6" />
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-body">
              A few quick steps — tell us about you, the gift you have in mind, and how you&apos;d like to
              give. It only takes a minute, and Joe will personally follow up.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <PartnerForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

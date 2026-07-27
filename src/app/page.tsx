import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import NewRelease from "@/components/NewRelease";
import HeroVideo from "@/components/HeroVideo";
import PodcastPlayer from "@/components/PodcastPlayer";
import SubscribeForm from "@/components/SubscribeForm";
import {
  HERO,
  HERO_VIDEO,
  HOME_INTRO,
  STATS,
  DEVOTIONAL,
  BOOKS,
  TESTIMONIALS,
  PODCAST,
  BIO,
  SITE,
} from "@/config/site";

const ENDORSERS = ["Dr. Tony Evans", "Phil Robertson", "Pastor Ed Young", "Pastor Ken Whitten"];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/#joe`,
      name: "Dr. Joe Pettigrew",
      jobTitle: "Author, Devotional Writer & Pastor",
      description:
        "Author of the daily devotional Morning With Jesus, read by more than 60,000 people across all 50 states and 36 countries.",
      email: SITE.email,
      telephone: SITE.phone,
      url: `${SITE.url}/about`,
      worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
  ],
};

export default function Home() {
  const featured = BOOKS.find((b) => b.featured) ?? BOOKS[0];
  const featuredQuotes = TESTIMONIALS.filter((t) => t.featured).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      {/* pulled up under the translucent 76px header so the image runs to the very top */}
      <section className="relative -mt-[76px] overflow-hidden bg-paper">
        {/* background image — cross-at-sunrise, matching the brand */}
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* white overlay — clear-ish in the center, fading to white at the edges */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 34%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.32) 36%, rgba(255,255,255,0.85) 66%, rgba(255,255,255,1) 90%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-[196px] pb-[120px] sm:px-8 sm:pt-[276px] sm:pb-[200px]">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            {/* left — brand, headline, CTAs */}
            <div className="text-center lg:text-left">
              <p className="rise d1 eyebrow text-dawn-deep">{HERO.eyebrow}</p>
              <h1 className="rise d2 mt-5 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-[3.5rem]">
                {HERO.title}
              </h1>
              <p className="rise d3 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-body sm:text-xl lg:mx-0">
                {HERO.subtitle}
              </p>
              <div className="rise d4 mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href="#subscribe"
                  className="rounded-full bg-dawn-deep px-8 py-3.5 text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/25 transition-all hover:bg-ink hover:shadow-xl"
                >
                  {HERO.primaryCta.label}
                </Link>
                <Link
                  href={HERO.secondaryCta.href}
                  className="rounded-full border border-ink/15 bg-paper/60 px-8 py-3.5 text-[0.98rem] font-semibold text-ink backdrop-blur-sm transition-colors hover:border-dawn-deep hover:text-dawn-deep"
                >
                  {HERO.secondaryCta.label}
                </Link>
              </div>
            </div>

            {/* right — intro video + link to the new book */}
            <div className="rise d5 mx-auto w-full max-w-xl lg:mx-0">
              <HeroVideo src={HERO_VIDEO.url} poster={HERO_VIDEO.poster} label={HERO_VIDEO.label} />
              <div className="mt-5 text-center lg:text-left">
                <Link
                  href={HERO_VIDEO.linkHref}
                  className="inline-flex items-center gap-2 text-[0.98rem] font-semibold text-dawn-deep transition-colors hover:text-ink"
                >
                  {HERO_VIDEO.linkLabel}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* horizon line */}
        <div className="rule-dawn relative" aria-hidden />
      </section>

      {/* ── Endorser trust strip ─────────────────────────────────────── */}
      <section className="border-b border-hair bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <p className="text-center text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted">
            Read every morning by
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {ENDORSERS.map((name) => (
              <span key={name} className="font-display text-lg font-semibold text-ink/70">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── New release ──────────────────────────────────────────────── */}
      <section id="new-book" className="scroll-mt-24 bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <NewRelease />
          </Reveal>
        </div>
      </section>

      {/* ── A Message From Joe ───────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <Reveal>
            <span className="eyebrow text-gold">{HOME_INTRO.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.6rem]">
              {HOME_INTRO.heading}
            </h2>
            {HOME_INTRO.body.map((p) => (
              <p key={p} className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-body">
                {p}
              </p>
            ))}
            <p className="mt-6 font-display text-xl font-semibold text-ink">{HOME_INTRO.signoff}</p>
          </Reveal>

          {/* stats */}
          <Reveal delay={120}>
            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-y-8 border-t border-hair pt-10 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-semibold text-dawn-deep sm:text-4xl">{s.value}</p>
                  <p className="mt-1 text-sm text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Morning With Jesus + subscribe ───────────────────────────── */}
      <section id="subscribe" className="relative overflow-hidden bg-ink scroll-mt-24">
        <div className="dawn-sky-dark pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <span className="eyebrow text-dawn">{DEVOTIONAL.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-[2.7rem]">
                {DEVOTIONAL.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/75">{DEVOTIONAL.paragraphs[0]}</p>
              <ul className="mt-7 space-y-3">
                {DEVOTIONAL.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-white/80">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-dawn/20 text-dawn" aria-hidden>
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <p className="mb-4 font-display text-xl font-semibold text-white">
                  {DEVOTIONAL.subscribe.heading}
                </p>
                <p className="mb-5 text-white/60">{DEVOTIONAL.subscribe.body}</p>
                <SubscribeForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Books ────────────────────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="text-center">
            <span className="eyebrow text-gold">Joe&apos;s Books</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-[2.6rem]">
              Written for real life
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
              Seven books for men, women, small groups, and young adults — each pointing back to Christ.
            </p>
          </Reveal>

          {/* featured book */}
          <Reveal delay={80}>
            <div className="mt-14 grid items-center gap-10 rounded-3xl border border-hair bg-paper p-6 sm:p-10 lg:grid-cols-[auto_1fr]">
              <div className="mx-auto w-44 shrink-0 sm:w-52">
                <Image
                  src={featured.image}
                  alt={`${featured.title} book cover`}
                  width={500}
                  height={750}
                  className="w-full rounded-lg shadow-2xl shadow-ink/25"
                />
              </div>
              <div>
                <span className="inline-block rounded-full bg-cream-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                  {featured.audience}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-body">{featured.blurb}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={featured.buyUrl}
                    target="_blank"
                    rel="noopener"
                    className="rounded-full bg-dawn-deep px-7 py-3 text-[0.95rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-colors hover:bg-ink"
                  >
                    Get the book
                  </a>
                  <Link
                    href="/books"
                    className="rounded-full border border-ink/15 px-7 py-3 text-[0.95rem] font-semibold text-ink transition-colors hover:border-dawn-deep hover:text-dawn-deep"
                  >
                    See all books
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* the rest */}
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {BOOKS.filter((b) => !b.featured).map((b, i) => (
              <Reveal key={b.id} delay={i * 60}>
                <a href={b.buyUrl} target="_blank" rel="noopener" className="group block">
                  <div className="overflow-hidden rounded-lg shadow-lg shadow-ink/10 transition-transform group-hover:-translate-y-1">
                    <Image
                      src={b.image}
                      alt={`${b.title} book cover`}
                      width={500}
                      height={750}
                      className="w-full"
                    />
                  </div>
                  <p className="mt-3 text-center text-sm font-semibold text-ink group-hover:text-dawn-deep">
                    {b.title}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="border-y border-hair bg-cream-2/50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="text-center">
            <span className="eyebrow text-gold">What People Are Saying</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-[2.6rem]">
              A blessing to homes and pulpits alike
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {featuredQuotes.map((t, i) => (
              <Reveal key={t.name + i} delay={i * 90}>
                <figure className="flex h-full flex-col rounded-2xl border border-hair bg-paper p-8 shadow-sm">
                  <div className="font-display text-5xl leading-none text-dawn/40" aria-hidden>&ldquo;</div>
                  <blockquote className="-mt-3 flex-1 text-[1.02rem] leading-relaxed text-body">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-hair pt-5">
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/testimonials" className="text-[0.98rem] font-semibold text-dawn-deep hover:text-ink">
              Read more testimonials →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Podcast ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink">
        <div className="dawn-sky-dark pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <Reveal>
              <span className="eyebrow text-dawn">{PODCAST.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-[2.7rem]">
                {PODCAST.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/75">{PODCAST.description}</p>
              <a
                href={PODCAST.cta.href}
                target="_blank"
                rel="noopener"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[0.98rem] font-semibold text-ink transition-colors hover:bg-dawn"
              >
                {PODCAST.cta.label}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Reveal>

            <Reveal delay={120}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-dawn">
                Featured Episode
              </p>
              <PodcastPlayer
                src={PODCAST.featured.audioUrl}
                title={PODCAST.featured.title}
                blurb={PODCAST.featured.blurb}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Closing / About + Support ────────────────────────────────── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="relative grid items-center gap-8 overflow-hidden rounded-[2rem] border border-hair bg-paper p-8 text-center sm:grid-cols-[auto_1fr] sm:gap-12 sm:p-12 sm:text-left lg:p-16">
              <div className="dawn-sky pointer-events-none absolute inset-0 opacity-70" aria-hidden />
              <Image
                src="/images/pastor-joe.jpg"
                alt="Dr. Joe Pettigrew"
                width={600}
                height={800}
                className="relative mx-auto h-auto w-48 shrink-0 rounded-2xl object-cover object-top shadow-xl shadow-ink/20 ring-1 ring-hair sm:mx-0 sm:w-56 lg:w-64"
              />
              <div className="relative">
                <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  {BIO.name}
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-body">
                  {BIO.lead}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
                  <Link
                    href="/about"
                    className="rounded-full bg-ink px-7 py-3.5 text-[0.98rem] font-semibold text-white transition-colors hover:bg-dawn-deep"
                  >
                    Meet Joe
                  </Link>
                  <Link
                    href="/partner"
                    className="rounded-full border border-ink/15 px-7 py-3.5 text-[0.98rem] font-semibold text-ink transition-colors hover:border-dawn-deep hover:text-dawn-deep"
                  >
                    Partner with the ministry
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

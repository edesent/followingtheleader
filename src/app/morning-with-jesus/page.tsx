import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SubscribeButton from "@/components/SubscribeButton";
import { DEVOTIONAL, STATS, PODCAST_URL, TESTIMONIALS } from "@/config/site";

export const metadata: Metadata = {
  title: "Morning With Jesus",
  description:
    "Morning With Jesus is a free daily devotional by Dr. Joe Pettigrew — a short, Scripture-rooted word delivered to your inbox each morning. Read by more than 60,000 people. Subscribe free.",
};

export default function MorningWithJesusPage() {
  const quote = TESTIMONIALS.find((t) => t.featured) ?? TESTIMONIALS[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-hair bg-cream">
        <div className="dawn-sky pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="sun-glow pointer-events-none absolute left-1/2 bottom-0 h-[30rem] w-[30rem] -translate-x-1/2 translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(230,196,111,0.5) 0%, rgba(230,196,111,0) 68%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <p className="eyebrow text-dawn-deep">{DEVOTIONAL.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.03] text-ink sm:text-5xl md:text-[3.6rem]">
            {DEVOTIONAL.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-body">{DEVOTIONAL.lead}</p>
        </div>
      </section>

      {/* What it is */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="space-y-5">
              {DEVOTIONAL.paragraphs.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-body">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {DEVOTIONAL.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 rounded-xl border border-hair bg-paper px-5 py-4 text-[0.98rem] text-body">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-dawn/15 text-dawn-deep" aria-hidden>
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Subscribe */}
      <section id="subscribe" className="relative overflow-hidden bg-ink scroll-mt-24">
        <div className="dawn-sky-dark pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-[2.5rem]">
              {DEVOTIONAL.subscribe.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{DEVOTIONAL.subscribe.body}</p>
          </Reveal>
          <Reveal delay={100} className="mt-10 text-center">
            <SubscribeButton className="rounded-full bg-dawn-deep px-9 py-4 text-[1.02rem] font-semibold text-white shadow-lg shadow-black/25 transition-colors hover:bg-dawn hover:text-ink">
              {DEVOTIONAL.subscribe.cta}
            </SubscribeButton>
            <p className="mt-4 text-sm text-white/45">
              No cost and no catch — unsubscribe any time.
            </p>
          </Reveal>

          {/* stats under form */}
          <Reveal delay={160}>
            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-y-6 border-t border-white/10 pt-8 text-center sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-semibold text-dawn sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quote + podcast */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Reveal>
            <div className="font-display text-5xl leading-none text-dawn/40" aria-hidden>&ldquo;</div>
            <blockquote className="-mt-4 font-display text-2xl font-medium italic leading-relaxed text-ink sm:text-[1.9rem]">
              {quote.quote}
            </blockquote>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-dawn-deep">
              {quote.name} · {quote.role}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-14 rounded-2xl border border-hair bg-paper px-6 py-8 sm:px-10">
              <p className="font-display text-xl font-semibold text-ink">Prefer to listen?</p>
              <p className="mx-auto mt-2 max-w-lg text-body">
                Past devotionals are read aloud on the podcast — take the morning word with you wherever you go.
              </p>
              <a
                href={PODCAST_URL}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex rounded-full border border-ink/15 px-7 py-3 font-semibold text-ink transition-colors hover:border-dawn-deep hover:text-dawn-deep"
              >
                Listen to the podcast →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

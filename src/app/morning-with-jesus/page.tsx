import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SubscribeForm from "@/components/SubscribeForm";
import EpisodeList from "@/components/EpisodeList";
import { getEpisodes } from "@/lib/podcast";
import { DEVOTIONAL, STATS, PODCAST_URL, TESTIMONIALS } from "@/config/site";

export const metadata: Metadata = {
  title: "Morning With Jesus",
  description:
    "Morning With Jesus is a free daily devotional by Dr. Joe Pettigrew — a short, Scripture-rooted word delivered to your inbox each morning. Read by more than 60,000 people. Subscribe free.",
};

export default async function MorningWithJesusPage() {
  const quote = TESTIMONIALS.find((t) => t.featured) ?? TESTIMONIALS[0];
  // Read live from the podcast feed; cached for an hour (see lib/podcast.ts).
  const episodes = await getEpisodes(10);

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
          <Reveal delay={100} className="mx-auto mt-10 max-w-xl">
            <SubscribeForm tone="dark" />
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

        </div>
      </section>

      {/* Listen — episodes read live from the podcast feed */}
      <section id="listen" className="scroll-mt-24 border-t border-hair bg-cream-2/50">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal className="text-center">
            <p className="eyebrow text-gold">Prefer to listen?</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-[2.5rem]">
              Every morning, read aloud
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-body">
              A new episode goes up each weekday — take the morning word with you wherever you go.
            </p>
          </Reveal>

          {episodes.length > 0 ? (
            <>
              <Reveal delay={100} className="mt-10">
                <EpisodeList episodes={episodes} />
              </Reveal>
              <Reveal delay={140} className="mt-8 text-center">
                <a
                  href={PODCAST_URL}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex rounded-full border border-ink/15 px-7 py-3 font-semibold text-ink transition-colors hover:border-dawn-deep hover:text-dawn-deep"
                >
                  Browse every episode →
                </a>
              </Reveal>
            </>
          ) : (
            /* The feed is unreachable — send people to the show itself. */
            <Reveal delay={100} className="mt-10 text-center">
              <a
                href={PODCAST_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex rounded-full bg-dawn-deep px-8 py-3.5 font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-colors hover:bg-ink"
              >
                Listen to the podcast →
              </a>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

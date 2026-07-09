import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BIO } from "@/config/site";

export const metadata: Metadata = {
  title: "About Joe",
  description:
    "Dr. Joe Pettigrew — author, devotional writer, and pastor. From the boardrooms of the Fortune 500 to a daily word read by 60,000 people, meet the man behind Morning With Jesus.",
};

const HIGHLIGHTS = [
  {
    label: "Education",
    body: "Degrees from the University of Tennessee and Murray State University, and a Ph.D. from the University of Memphis.",
  },
  {
    label: "In the Marketplace",
    body: "A university professor and college dean who founded Leaderpoint Consulting Group, advising leaders at more than half the Fortune 500.",
  },
  {
    label: "In Ministry",
    body: "Co-founder of In The Zone Ministries with Kyle Rote, Jr., and today the pastor of First Presbyterian Church in Brownsville, Tennessee.",
  },
  {
    label: "At Home",
    body: "Married to his wife for fifty years, writing each morning to point readers to Christ.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Joe"
        title="From the boardroom to the morning."
        intro={BIO.lead}
      />

      {/* Bio */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-gold">{BIO.role}</p>
            <div className="mt-6 space-y-5">
              {BIO.paragraphs.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-body">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {/* stats */}
          <Reveal delay={120}>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-hair pt-10 text-center">
              {BIO.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-semibold text-dawn-deep sm:text-4xl">{s.value}</p>
                  <p className="mt-1 text-sm text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-hair bg-cream-2/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal className="text-center">
            <span className="eyebrow text-gold">A Life in Brief</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Four seasons, one calling
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.label} delay={i * 80}>
                <div className="h-full rounded-2xl border border-hair bg-paper p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dawn-deep">{h.label}</p>
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-body">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="relative overflow-hidden bg-ink">
        <div className="dawn-sky-dark pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Reveal>
            <p className="font-display text-2xl font-medium italic leading-relaxed text-white sm:text-[2rem]">
              &ldquo;My prayer is simple: that before the noise begins, you would hear from Him
              first.&rdquo;
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-dawn">
              {BIO.name}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Start each morning with Joe
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-body">
              Join more than 60,000 readers who begin the day with a short word from Jesus.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/morning-with-jesus#subscribe"
                className="rounded-full bg-dawn-deep px-7 py-3.5 font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-colors hover:bg-ink"
              >
                Subscribe free
              </Link>
              <Link
                href="/books"
                className="rounded-full border border-ink/15 px-7 py-3.5 font-semibold text-ink transition-colors hover:border-dawn-deep hover:text-dawn-deep"
              >
                Explore his books
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

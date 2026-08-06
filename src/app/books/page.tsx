import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import NewRelease from "@/components/NewRelease";
import { BOOKS } from "@/config/site";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Books by Dr. Joe Pettigrew — devotionals and studies for men, women, small groups, and young adults. Watch Joe introduce each one. Every purchase through Christianbook helps support the ministry.",
};

export default function BooksPage() {
  return (
    <>
      <PageHero
        eyebrow="Joe's Books"
        title="Books for every season of following Jesus"
        intro="Books written for men, women, small groups, and young adults. Open any one to watch Joe introduce it — and every purchase through Christianbook helps support the ministry."
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          {/* New release — featured at the top */}
          <Reveal>
            <div className="mb-16 sm:mb-20">
              <NewRelease />
            </div>
          </Reveal>

          <div className="grid gap-8 sm:gap-10">
            {BOOKS.map((b, i) => (
              <Reveal key={b.id} delay={(i % 2) * 80}>
                <article className="grid items-center gap-7 rounded-2xl border border-hair bg-paper p-6 shadow-sm transition-shadow hover:shadow-md sm:grid-cols-[auto_1fr] sm:p-8">
                  <Link
                    href={`/books/${b.id}`}
                    className="group mx-auto block w-36 shrink-0 sm:w-44"
                  >
                    <Image
                      src={b.image}
                      alt={`${b.title} book cover`}
                      width={500}
                      height={750}
                      className="w-full rounded-lg shadow-xl shadow-ink/15 transition-transform group-hover:-translate-y-1"
                    />
                  </Link>
                  <div>
                    <span className="inline-block rounded-full bg-cream-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                      {b.audience}
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
                      <Link href={`/books/${b.id}`} className="transition-colors hover:text-dawn-deep">
                        {b.title}
                      </Link>
                    </h2>
                    <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-body">{b.blurb}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link
                        href={`/books/${b.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-dawn-deep px-6 py-3 text-[0.95rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-colors hover:bg-ink"
                      >
                        {b.video ? "Watch & learn more" : "Learn more"}
                        <span aria-hidden>→</span>
                      </Link>
                      <a
                        href={b.buyUrl}
                        target="_blank"
                        rel="noopener"
                        className="text-[0.95rem] font-semibold text-dawn-deep transition-colors hover:text-ink"
                      >
                        Buy at Christianbook
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted">
              Purchases made through Christianbook generate a small donation that supports Following the
              Leader — a simple way to help keep the daily devotional free.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

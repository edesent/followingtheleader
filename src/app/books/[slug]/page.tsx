import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";
import { BOOKS, getBook } from "@/config/site";

export function generateStaticParams() {
  return BOOKS.map((b) => ({ slug: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Book Not Found" };
  return {
    title: book.title,
    description: `${book.subtitle} A book by Dr. Joe Pettigrew — ${book.blurb}`,
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-hair bg-cream">
        <div className="dawn-sky pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-dawn-deep transition-colors hover:text-ink"
          >
            <span aria-hidden>←</span> Joe&apos;s Books
          </Link>
          <p className="eyebrow mt-6 text-gold">{book.audience}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-[3.4rem]">
            {book.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
            {book.subtitle}
          </p>
        </div>
      </section>

      {/* ── Video ────────────────────────────────────────────────────────── */}
      {book.video && (
        <section className="bg-paper">
          <div className="mx-auto max-w-3xl px-5 pt-16 sm:px-8 sm:pt-20">
            <Reveal>
              <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Hear Joe introduce this book
              </p>
              <VideoEmbed id={book.video} title={`${book.title} — Dr. Joe Pettigrew`} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Cover + content ──────────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid items-start gap-10 sm:grid-cols-[auto_1fr] sm:gap-14">
            <Reveal>
              <a
                href={book.buyUrl}
                target="_blank"
                rel="noopener"
                className="group mx-auto block w-48 shrink-0 sm:w-56"
              >
                <Image
                  src={book.image}
                  alt={`${book.title} book cover`}
                  width={500}
                  height={750}
                  className="w-full rounded-lg shadow-2xl shadow-ink/20 transition-transform group-hover:-translate-y-1"
                />
              </a>
            </Reveal>

            <Reveal delay={80}>
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  About this book
                </h2>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-body">{book.blurb}</p>

                <a
                  href={book.buyUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-dawn-deep px-7 py-3.5 text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-colors hover:bg-ink"
                >
                  Buy at Christianbook
                  <span aria-hidden>→</span>
                </a>
                <p className="mt-4 text-sm text-muted">
                  Every purchase through Christianbook helps support the ministry and keep the daily
                  devotional free.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── More books ───────────────────────────────────────────────────── */}
      <section className="border-t border-hair bg-cream">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow text-dawn-deep">Keep Reading</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Explore more of Joe&apos;s books
            </h2>
            <Link
              href="/books"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[0.98rem] font-semibold text-white transition-colors hover:bg-dawn-deep"
            >
              See all of Joe&apos;s books
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

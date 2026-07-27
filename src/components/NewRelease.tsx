import Image from "next/image";
import { NEW_RELEASE } from "@/config/site";

/**
 * Featured "new book" card — used on the home page and atop the Books page.
 * The cover mockup has a white background, so it blends into the white card.
 */
export default function NewRelease() {
  const r = NEW_RELEASE;
  return (
    <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-hair bg-paper p-6 shadow-sm sm:gap-12 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 45%, rgba(230,196,111,0.16) 0%, rgba(255,255,255,0) 70%)",
          }}
          aria-hidden
        />
        <Image
          src={r.image}
          alt={`${r.title} — ${r.tagline}, a new book by ${r.author}`}
          width={1200}
          height={842}
          className="relative mx-auto h-auto w-full max-w-xl"
        />
      </div>

      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-dawn/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          {r.badge}
        </span>
        <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] text-ink sm:text-[2.6rem]">
          {r.title}
        </h2>
        <p className="mt-2 font-display text-xl italic text-dawn-deep sm:text-2xl">{r.tagline}</p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          by {r.author}
        </p>
        <div className="mt-6 space-y-4">
          {r.description.map((p) => (
            <p key={p} className="text-[1.05rem] leading-relaxed text-body">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <a
            href={r.cta.href}
            className="inline-flex items-center gap-2 rounded-full bg-dawn-deep px-8 py-3.5 text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/25 transition-colors hover:bg-ink"
          >
            {r.cta.label}
            <span aria-hidden>→</span>
          </a>
          <p className="mt-3 text-sm text-muted">{r.note}</p>
        </div>
      </div>
    </div>
  );
}

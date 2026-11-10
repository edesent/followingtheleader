import PreorderButton from "@/components/PreorderButton";
import { NEW_RELEASE } from "@/config/site";

/**
 * Featured "coming soon" card for Joe's next book — used on the home page and
 * atop the Books page.
 *
 * Deliberately text-only: no cover image anywhere on the site. Joe is in talks
 * with a national publisher who will redesign the cover (Nov 2026), and he
 * doesn't want the old cover out in public. Don't add a cover back until he
 * sends the publisher's final one.
 */
export default function NewRelease() {
  const r = NEW_RELEASE;
  return (
    <div className="relative grid gap-8 overflow-hidden rounded-3xl border border-hair bg-paper p-6 shadow-sm sm:gap-10 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-14">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80"
        style={{
          background:
            "radial-gradient(closest-side, rgba(230,196,111,0.18) 0%, rgba(255,255,255,0) 100%)",
        }}
        aria-hidden
      />

      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-dawn/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          {r.badge}
        </span>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl lg:text-[3.4rem]">
          {r.title}
        </h2>
        <p className="mt-3 font-display text-xl italic text-dawn-deep sm:text-2xl">{r.tagline}</p>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          by {r.author}
        </p>
      </div>

      <div className="relative lg:border-l lg:border-hair lg:pl-14">
        <div className="space-y-4">
          {r.description.map((p) => (
            <p key={p} className="text-[1.05rem] leading-relaxed text-body">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <PreorderButton label={r.cta.label} />
          <p className="mt-3 text-sm text-muted">{r.note}</p>
        </div>
      </div>
    </div>
  );
}

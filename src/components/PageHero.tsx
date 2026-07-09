/** Compact hero used at the top of interior pages. Cream, with a dawn glow. */
export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hair bg-cream">
      <div className="dawn-sky pointer-events-none absolute inset-0" aria-hidden />
      {/* sun disc low on the horizon */}
      <div
        className="pointer-events-none absolute left-1/2 top-full h-56 w-56 -translate-x-1/2 -translate-y-24 rounded-full opacity-70 blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(231,154,95,0.7) 0%, rgba(231,154,95,0) 70%)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="eyebrow text-dawn-deep">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-[3.4rem]">
          {title}
        </h1>
        {intro && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">{intro}</p>
        )}
      </div>
    </section>
  );
}

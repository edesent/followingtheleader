import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="dawn-sky-dark pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 py-24 text-center">
        <p className="font-display text-7xl font-semibold text-dawn">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 max-w-md text-lg text-white/70">
          The page you were looking for may have moved. Let&apos;s get you back to the morning.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-dawn-deep px-7 py-3.5 font-semibold text-white transition-colors hover:bg-dawn"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}

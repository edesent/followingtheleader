import Link from "next/link";

/** Wordmark — echoes the brand logo: navy serif with an italic "the". */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex flex-col leading-none"
      aria-label="Following the Leader — home"
    >
      <span
        className={`font-display text-[1.5rem] font-semibold tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        Following{" "}
        <span className="italic underline decoration-gold decoration-1 underline-offset-4">the</span>{" "}
        Leader
      </span>
      <span
        className={`mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.24em] ${
          light ? "text-white/60" : "text-gold"
        }`}
      >
        Dr. Joe Pettigrew
      </span>
    </Link>
  );
}

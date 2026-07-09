import Link from "next/link";

/** Wordmark — a rising-sun mark + the ministry name. */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="Following the Leader — home"
    >
      <span className="relative grid h-9 w-9 place-items-center" aria-hidden>
        <svg viewBox="0 0 40 40" className="h-9 w-9">
          {/* rising sun */}
          <defs>
            <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e79a5f" />
              <stop offset="100%" stopColor="#c56a38" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="23" r="8.5" fill="url(#sun)" />
          {/* rays */}
          <g stroke="#b3862f" strokeWidth="1.6" strokeLinecap="round">
            <line x1="20" y1="4.5" x2="20" y2="9" />
            <line x1="7" y1="9.5" x2="10" y2="12.5" />
            <line x1="33" y1="9.5" x2="30" y2="12.5" />
            <line x1="3.5" y1="21" x2="7.5" y2="21" />
            <line x1="32.5" y1="21" x2="36.5" y2="21" />
          </g>
          {/* horizon */}
          <line
            x1="4"
            y1="33"
            x2="36"
            y2="33"
            stroke={light ? "#fbf6ec" : "#221d15"}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.15rem] font-semibold tracking-tight ${
            light ? "text-white" : "text-ink"
          }`}
        >
          Following the Leader
        </span>
        <span
          className={`mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] ${
            light ? "text-white/60" : "text-gold"
          }`}
        >
          Dr. Joe Pettigrew
        </span>
      </span>
    </Link>
  );
}

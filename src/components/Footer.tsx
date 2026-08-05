"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PAGES, LEGAL, SITE, PODCAST_URL, BUILDER_CREDIT } from "@/config/site";

export default function Footer() {
  const pathname = usePathname();
  const year = 2026;

  // The admin area has its own chrome — no public footer there.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="relative overflow-hidden bg-ink text-white/80">
      {/* dawn glow along the top edge */}
      <div className="dawn-sky-dark h-px w-full" aria-hidden />
      {/* warm dawn glow rising from the base, echoing the logo */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "radial-gradient(90% 130% at 50% 140%, rgba(230,196,111,0.16) 0%, rgba(2,52,121,0) 62%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1.1fr]">
          {/* logo section — cropped lockup blends into the matching royal-blue field */}
          <div>
            <Image
              src="/images/footer-logo.jpg"
              alt="Following the Leader — Walking with Jesus in everyday life"
              width={640}
              height={411}
              className="h-auto w-full max-w-[248px]"
            />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/60">
              The ministry of Dr. Joe Pettigrew — home of <em>Morning With Jesus</em>, a daily
              devotional helping more than 60,000 readers walk with Christ in everyday life.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Explore</p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {PAGES.slice(1).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Connect</p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              <li>
                <a href={`mailto:${SITE.email}`} className="text-white/70 transition-colors hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneHref}`} className="text-white/70 transition-colors hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={PODCAST_URL} target="_blank" rel="noopener" className="text-white/70 transition-colors hover:text-white">
                  Listen to the Podcast
                </a>
              </li>
              <li className="pt-1 text-white/45">
                {SITE.address.line} · {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-sm text-white/45 sm:flex-row">
          <p>© {year} Following the Leader. All rights reserved.</p>
          <nav className="flex items-center gap-5">
            {LEGAL.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/70 transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Builder credit */}
        <p className="mt-5 text-center text-xs text-white/35 sm:text-left">
          Church and ministry sites by{" "}
          <a
            href={BUILDER_CREDIT.href}
            target="_blank"
            rel="noopener"
            className="font-medium text-white/55 underline decoration-white/20 underline-offset-2 transition-colors hover:text-white hover:decoration-white/50"
          >
            {BUILDER_CREDIT.label}
          </a>
        </p>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/config/site";
import Logo from "./Logo";
import SubscribeButton from "./SubscribeButton";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  // The admin area has its own chrome — no public header there.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_rgba(34,29,21,0.07)]"
          : "bg-cream/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${
                  active ? "text-dawn-deep" : "text-ink/75 hover:text-dawn-deep"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <SubscribeButton className="ml-2 rounded-full bg-dawn-deep px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-ink hover:shadow">
            Subscribe Free
          </SubscribeButton>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-cream-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <div className="space-y-[5px]">
            <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-hair bg-cream transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[85vh]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b border-hair/70 py-3.5 text-base font-medium ${
                isActive(item.href) ? "text-dawn-deep" : "text-ink/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <SubscribeButton className="mt-4 rounded-full bg-dawn-deep px-5 py-3 text-center text-base font-semibold text-white">
            Subscribe Free
          </SubscribeButton>
        </nav>
      </div>
    </header>
  );
}

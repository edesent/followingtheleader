"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SubscribeForm from "./SubscribeForm";

/**
 * "Subscribe free" button that opens the Morning With Jesus signup in a modal.
 *
 * The form is ours (SubscribeForm → /api/subscribe → Constant Contact), so
 * people are signed up without ever leaving the page.
 *
 * The modal is rendered through a portal to <body> on purpose: the header uses
 * backdrop-blur, which makes it a containing block for `position: fixed`, so a
 * modal rendered in place would be trapped inside the 76px header strip.
 *
 * Wrap the trigger's look in `className` — the button is otherwise unstyled so
 * the same component can be a navy pill in the header and a gold pill on a dark
 * section.
 */
export default function SubscribeButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

  // Lock the page behind the modal, close on Escape, and give focus to the
  // panel while open (then hand it back to whatever opened it).
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={(e) => {
          openerRef.current = e.currentTarget;
          setOpen(true);
        }}
      >
        {children}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Subscribe to Morning With Jesus"
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 py-10 sm:items-center sm:p-6"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="fixed inset-0 cursor-default bg-ink/75 backdrop-blur-sm"
            />

            <div
              ref={panelRef}
              tabIndex={-1}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-cream shadow-2xl outline-none"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-cream-2 hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>

              <div className="px-6 pt-8 text-center sm:px-8">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  Free daily devotional
                </p>
                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  Morning With Jesus
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-body">
                  A short, Scripture-rooted word in your inbox each morning. Join more than 60,000
                  readers.
                </p>
              </div>

              <div className="px-6 pb-8 pt-6 sm:px-8">
                <SubscribeForm autoFocus bare />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

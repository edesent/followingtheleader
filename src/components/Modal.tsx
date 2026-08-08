"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Button that opens a centred modal.
 *
 * The panel is rendered through a portal to <body> on purpose: the header uses
 * backdrop-blur, which makes it a containing block for `position: fixed`, so a
 * modal rendered in place would be trapped inside the 76px header strip.
 *
 * Escape and the backdrop close it, the page behind is locked from scrolling,
 * and focus returns to the trigger afterwards. `render` receives a `close`
 * function so a form can dismiss the modal itself.
 */
export default function ModalButton({
  className,
  children,
  label,
  ariaLabel,
  eyebrow,
  title,
  intro,
  maxWidth = "max-w-md",
  render,
}: {
  className?: string;
  children: React.ReactNode;
  /** Accessible name for the dialog. */
  label: string;
  /** Accessible name for the trigger, when its contents aren't plain text. */
  ariaLabel?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  maxWidth?: string;
  render: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

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
        aria-label={ariaLabel}
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
            aria-label={label}
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
              className={`relative w-full ${maxWidth} overflow-hidden rounded-2xl bg-cream shadow-2xl outline-none`}
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

              {(eyebrow || title || intro) && (
                <div className="px-6 pt-8 text-center sm:px-8">
                  {eyebrow && (
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">
                      {eyebrow}
                    </p>
                  )}
                  {title && (
                    <p className="mt-2 font-display text-2xl font-semibold text-ink">{title}</p>
                  )}
                  {intro && (
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{intro}</p>
                  )}
                </div>
              )}

              <div className="px-6 pb-8 pt-6 sm:px-8">{render(close)}</div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

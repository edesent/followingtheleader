"use client";

import { SUBSCRIBE_FORM } from "@/config/site";

const POPUP_WIDTH = 620;
const POPUP_HEIGHT = 780;

/**
 * "Subscribe free" button that opens the Morning With Jesus signup in a popup
 * window, so new subscribers land straight in Joe's Constant Contact list.
 *
 * The form is hosted by Constant Contact (SUBSCRIBE_FORM.url in
 * src/config/site.ts). It CANNOT be embedded in an on-page modal: Constant
 * Contact serves that page behind a Cloudflare bot check which sends
 * X-Frame-Options: SAMEORIGIN, so an iframe renders empty. A real popup window
 * is a normal top-level page load, so it always works. (If Constant Contact
 * ever gives us an embeddable form snippet, that could live in an in-page modal
 * instead.)
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
  function openSignup() {
    // Centre the popup over the current window.
    const left = window.screenX + Math.max(0, (window.outerWidth - POPUP_WIDTH) / 2);
    const top = window.screenY + Math.max(0, (window.outerHeight - POPUP_HEIGHT) / 2.4);

    const win = window.open(
      SUBSCRIBE_FORM.url,
      "morning-with-jesus-signup",
      `popup=yes,width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${Math.round(left)},top=${Math.round(top)}`
    );

    // Blocked, or a phone that ignores window features — fall back to a tab.
    if (!win) {
      window.open(SUBSCRIBE_FORM.url, "_blank", "noopener,noreferrer");
      return;
    }
    win.focus();
  }

  return (
    <button type="button" className={className} onClick={openSignup}>
      {children}
    </button>
  );
}

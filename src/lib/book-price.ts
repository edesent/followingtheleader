import "server-only";

/**
 * Retail price for the new release — SERVER ONLY.
 *
 * The price is not public yet: preorders are taken by hand and Joe quotes the
 * total when he follows up, so no page shows a figure. Keeping it out of
 * src/config/site.ts keeps it out of the browser bundle too (everything in that
 * file ships to the client, where anyone could read it in the page source).
 *
 * $29.99 is the working number as of 2026-08-05 — confirm it before card
 * checkout is switched back on, or before any price appears on a page.
 * `BOOK_PRICE_CENTS` can override it without a deploy.
 */
export const BOOK_PRICE_CENTS = Number(process.env.BOOK_PRICE_CENTS) || 2999;
export const BOOK_CURRENCY = "usd";

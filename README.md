# Following the Leader — website

The ministry site of **Dr. Joe Pettigrew** — home of *Morning With Jesus*, a free daily
devotional read by more than 60,000 people, plus his books and ways to partner with the ministry.

Built and maintained by Pastor Eli — **[elijahdesent.com](https://www.elijahdesent.com)**.

---

## Edit the site in plain English (no code)

You don't have to touch the files below by hand. This site can be edited in plain English
through the **Custom Website Editor** — a hosted tool that makes the exact change and ships it
live in about 30 seconds.

- **Endpoint:** `https://www.elijahdesent.com/api/mcp` (Streamable HTTP, sign in once with OAuth)
- Add it in ChatGPT (Settings → Connectors → Add) or Claude, then just ask for the change.

## Almost everything lives in one file

Nearly all wording, links, books, and testimonials are in **`src/config/site.ts`**. Change what's
between the "quotes", save, and the live site updates. You rarely need to touch anything else.

| Want to change… | Edit in `src/config/site.ts` |
|---|---|
| Phone, email, mailing address | `SITE` |
| Hero headline / buttons | `HERO` |
| "A Message From Joe" | `HOME_INTRO` |
| The devotional page + bullet points | `DEVOTIONAL` |
| Books (title, blurb, buy link) | `BOOKS` |
| Endorsements | `TESTIMONIALS` |
| Joe's bio | `BIO` |
| Partner tiers | `SUPPORT` |

Book covers and images live in `public/images/`.

---

## Tech stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 — theme tokens ("Morning Light" palette) in `src/app/globals.css` under `@theme inline`.
  Do **not** create a `tailwind.config.ts`.

## Pages

- `/` — Home
- `/morning-with-jesus` — the daily devotional + subscribe form
- `/about` — About Joe
- `/books` — Joe's books (each links to Christianbook)
- `/testimonials` — What people are saying
- `/support` — Partner with the ministry

## The subscribe form

The Morning With Jesus signup posts to `/api/subscribe`. To have new subscribers emailed to Joe,
set `RESEND_API_KEY` and `SUBSCRIBE_NOTIFY_EMAIL` in the environment. Without them the form still
works (returns success) — wire it to Joe's real mailing provider (Resend, Mailchimp, etc.) when live.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

---

## Notes for AI editors (Claude / ChatGPT)

- **Next.js 16** — APIs may differ from older training data. See `AGENTS.md`.
- **Tailwind v4** with tokens in `globals.css`. Colors: `cream`, `ink`, `dawn`, `dawn-deep`, `gold`, `rose`, `body`, `muted`, `hair`.
- Section components are server components; `Header` and `SubscribeForm` are `"use client"`.
- For any change to an existing file, replace the smallest exact string you can. Don't rewrite whole files unless asked.

Built and maintained by Pastor Eli — [elijahdesent.com](https://www.elijahdesent.com).

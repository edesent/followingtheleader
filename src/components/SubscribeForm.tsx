"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SITE } from "@/config/site";

type Status = "idle" | "loading" | "done" | "error";

const emailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

/**
 * Morning With Jesus signup. Subscribers go straight into Constant Contact
 * (POST /api/subscribe → lib/constant-contact.ts).
 *
 * Anti-spam, none of which a real person ever notices:
 *  - a honeypot field, hidden from sight and from screen readers, that only a
 *    bot filling every input will complete;
 *  - a signed nonce fetched when the form is first touched, so the server can
 *    reject posts that never opened the page or were filled in milliseconds.
 *
 * `tone="dark"` styles it for the navy sections; the default suits light cards.
 * `bare` drops the form's own card so it doesn't nest inside one (the modal).
 */
export default function SubscribeForm({
  tone = "light",
  autoFocus = false,
  bare = false,
}: {
  tone?: "light" | "dark";
  autoFocus?: boolean;
  bare?: boolean;
}) {
  const dark = tone === "dark";
  // The form appears more than once per page (inline section + modal), so ids
  // have to be unique or the labels point at the wrong inputs.
  const uid = useId();
  const fieldId = (field: string) => `mwj-${field}-${uid}`;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", place: "" });
  const [touched, setTouched] = useState(false);
  const nonce = useRef("");
  const honeypot = useRef<HTMLInputElement>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Ask for the nonce as soon as someone starts interacting — that first
  // keystroke is also what starts the "was this too fast to be human?" clock.
  useEffect(() => {
    if (!touched || nonce.current) return;
    let alive = true;
    fetch("/api/subscribe/nonce", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (alive && typeof d?.nonce === "string") nonce.current = d.nonce;
      })
      .catch(() => {
        /* the server treats a missing nonce leniently — never block a real person */
      });
    return () => {
      alive = false;
    };
  }, [touched]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailValid(form.email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          nonce: nonce.current,
          website: honeypot.current?.value ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  /* ---------- Success ---------- */
  if (status === "done") {
    const firstName = form.name.trim().split(/\s+/)[0];
    return (
      <div
        className={`rounded-2xl text-center ${
          bare
            ? "py-2"
            : dark
            ? "border border-white/15 bg-white/[0.07] p-8"
            : "border border-hair bg-paper p-8 shadow-sm"
        }`}
      >
        <div
          className={`mx-auto grid h-12 w-12 place-items-center rounded-full ${
            dark ? "bg-dawn/20 text-dawn" : "bg-dawn/15 text-dawn-deep"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className={`mt-4 font-display text-2xl font-semibold ${dark ? "text-white" : "text-ink"}`}>
          You&apos;re all set{firstName ? `, ${firstName}` : ""}.
        </p>
        <p className={`mt-2 leading-relaxed ${dark ? "text-white/70" : "text-body"}`}>
          Welcome to Morning With Jesus. Your first devotional arrives in the morning — before the
          noise of the day begins.
        </p>
      </div>
    );
  }

  const inputClass = dark
    ? "w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3.5 text-white placeholder:text-white/45 outline-none transition-colors focus:border-dawn focus:bg-white/[0.1]"
    : "w-full rounded-xl border border-hair-2 bg-paper px-4 py-3.5 text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-dawn-deep";

  const labelClass = `mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] ${
    dark ? "text-white/55" : "text-muted"
  }`;

  return (
    <form
      onSubmit={onSubmit}
      onFocus={() => setTouched(true)}
      noValidate
      className={
        bare
          ? ""
          : dark
          ? "rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-7"
          : "rounded-2xl border border-hair bg-paper p-6 shadow-sm sm:p-7"
      }
    >
      <div className="space-y-4">
        <div>
          <label className={labelClass} htmlFor={fieldId("name")}>
            Your name
          </label>
          <input
            id={fieldId("name")}
            className={inputClass}
            type="text"
            name="name"
            placeholder="Joe Pettigrew"
            autoComplete="name"
            autoFocus={autoFocus}
            value={form.name}
            onChange={set("name")}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={fieldId("email")}>
            Email address
          </label>
          <input
            id={fieldId("email")}
            className={inputClass}
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            required
            value={form.email}
            onChange={set("email")}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={fieldId("place")}>
            City, State <span className="normal-case tracking-normal opacity-70">(optional)</span>
          </label>
          <input
            id={fieldId("place")}
            className={inputClass}
            type="text"
            name="place"
            placeholder="Brownsville, TN"
            autoComplete="address-level2"
            value={form.place}
            onChange={set("place")}
          />
        </div>
      </div>

      {/* Honeypot — hidden from people and from screen readers; bots fill it. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          ref={honeypot}
          id={fieldId("website")}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={`mt-6 w-full rounded-full px-8 py-4 text-[1rem] font-semibold shadow-lg transition-all disabled:opacity-70 ${
          dark
            ? "bg-dawn text-ink shadow-black/25 hover:bg-white"
            : "bg-dawn-deep text-white shadow-dawn-deep/20 hover:bg-ink"
        }`}
      >
        {status === "loading" ? "Subscribing…" : "Subscribe free"}
      </button>

      {status === "error" && (
        <p
          className={`mt-3 text-sm ${dark ? "text-dawn" : "text-dawn-deep"}`}
          role="alert"
        >
          {error}{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            Or email Joe directly.
          </a>
        </p>
      )}

      <p className={`mt-4 text-xs leading-relaxed ${dark ? "text-white/45" : "text-muted"}`}>
        Free forever, and your email stays private — just a short word each morning. Unsubscribe any
        time with one click.
      </p>
    </form>
  );
}

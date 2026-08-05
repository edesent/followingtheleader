"use client";

import { useEffect, useId, useRef, useState } from "react";
import { NEW_RELEASE, SITE } from "@/config/site";

type Status = "idle" | "loading" | "done" | "error";

const emailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

const MAX_QTY = 100;

/**
 * Preorder form for the new book. There's no payment step — the preorder is
 * emailed to Joe (POST /api/preorder) and he follows up personally with the
 * total and how to pay, the same way partnership gifts work.
 *
 * Shares the site's quiet anti-spam: a hidden honeypot field plus a signed
 * nonce (see lib/form-nonce.ts).
 */
export default function PreorderForm({ autoFocus = false }: { autoFocus?: boolean }) {
  const uid = useId();
  const fieldId = (field: string) => `pre-${field}-${uid}`;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const nonce = useRef("");
  const honeypot = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "1",
    address: "",
    message: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    if (!touched || nonce.current) return;
    let alive = true;
    fetch("/api/form-nonce", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (alive && typeof d?.nonce === "string") nonce.current = d.nonce;
      })
      .catch(() => {
        /* a missing nonce is treated leniently — never block a real person */
      });
    return () => {
      alive = false;
    };
  }, [touched]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Please tell us your name.");
      setStatus("error");
      return;
    }
    if (!emailValid(form.email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/preorder", {
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
    const qty = Number(form.quantity) || 1;
    return (
      <div className="rounded-2xl py-2 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-dawn/15 text-dawn-deep">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="mt-4 font-display text-2xl font-semibold text-ink">
          Thank you{firstName ? `, ${firstName}` : ""}.
        </p>
        <p className="mt-2 leading-relaxed text-body">
          Your preorder for {qty} {qty === 1 ? "copy" : "copies"} of{" "}
          <span className="font-semibold text-ink">{NEW_RELEASE.title}</span>{" "}
          is with Joe, and he&apos;ll be in touch with you personally. Your{" "}
          {qty === 1 ? "copy" : "copies"} will go out as soon as the book is printed.
        </p>
        <p className="mt-4 text-sm text-muted">
          Questions in the meantime?{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-dawn-deep underline">
            {SITE.email}
          </a>
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-hair-2 bg-paper px-4 py-3.5 text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-dawn-deep";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-muted";
  const optional = <span className="normal-case tracking-normal opacity-70">(optional)</span>;

  return (
    <form onSubmit={onSubmit} onFocus={() => setTouched(true)} noValidate>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_7rem]">
          <div>
            <label className={labelClass} htmlFor={fieldId("name")}>
              Your name
            </label>
            <input
              id={fieldId("name")}
              className={inputClass}
              type="text"
              name="name"
              placeholder="Ruth Baker"
              autoComplete="name"
              autoFocus={autoFocus}
              required
              value={form.name}
              onChange={set("name")}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor={fieldId("quantity")}>
              Copies
            </label>
            <input
              id={fieldId("quantity")}
              className={inputClass}
              type="number"
              name="quantity"
              min={1}
              max={MAX_QTY}
              inputMode="numeric"
              value={form.quantity}
              onChange={set("quantity")}
            />
          </div>
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
          <label className={labelClass} htmlFor={fieldId("phone")}>
            Phone {optional}
          </label>
          <input
            id={fieldId("phone")}
            className={inputClass}
            type="tel"
            name="phone"
            placeholder="901-555-0134"
            autoComplete="tel"
            value={form.phone}
            onChange={set("phone")}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={fieldId("address")}>
            Where should we ship it? {optional}
          </label>
          <textarea
            id={fieldId("address")}
            className={`${inputClass} min-h-[80px] resize-y`}
            name="address"
            placeholder={"123 Main Street\nBrownsville, TN 38012"}
            autoComplete="street-address"
            value={form.address}
            onChange={set("address")}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={fieldId("message")}>
            Anything Joe should know? {optional}
          </label>
          <textarea
            id={fieldId("message")}
            className={`${inputClass} min-h-[70px] resize-y`}
            name="message"
            placeholder="Ordering for our small group…"
            value={form.message}
            onChange={set("message")}
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
        className="mt-6 w-full rounded-full bg-dawn-deep px-8 py-4 text-[1rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-all hover:bg-ink disabled:opacity-70"
      >
        {status === "loading" ? "Sending…" : "Place my preorder"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm text-dawn-deep" role="alert">
          {error}{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            Or email Joe directly.
          </a>
        </p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        No payment now. Joe will follow up personally with the total and how to send it.
      </p>
    </form>
  );
}

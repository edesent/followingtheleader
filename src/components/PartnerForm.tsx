"use client";

import { useState } from "react";
import { SITE } from "@/config/site";

type Status = "idle" | "loading" | "done" | "error";

const INTEREST_OPTIONS = [
  "Become a Founding Partner",
  "Underwrite an initiative",
  "Support the mission (one-time or recurring gift)",
  "I'm not sure yet — let's talk",
];

/** Partnership signup — emails Joe, then explains how to give by check. */
export default function PartnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    org: "",
    interest: INTEREST_OPTIONS[0],
    amount: "",
    message: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    const firstName = form.name.trim().split(/\s+/)[0];
    return (
      <div className="rounded-2xl border border-hair bg-paper p-8 text-center shadow-sm">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-dawn/15 text-dawn-deep">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="mt-4 font-display text-2xl font-semibold text-ink">
          Thank you{firstName ? `, ${firstName}` : ""}.
        </p>
        <p className="mt-2 text-body">
          Your interest has been received, and Joe will personally follow up with you soon.
        </p>

        <div className="mt-7 rounded-xl border border-hair bg-cream-2/50 p-6 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dawn-deep">
            To give now — by check
          </p>
          <p className="mt-2 leading-relaxed text-body">
            Make your check payable to <span className="font-semibold text-ink">Following the Leader</span>{" "}
            and mail it to:
          </p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">
            Following the Leader
            <br />
            {SITE.address.line}
            <br />
            {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
          </p>
          <p className="mt-4 text-sm text-muted">
            Prefer to give online by card? Secure card giving is coming soon — we&apos;ll let you know
            as soon as it&apos;s available.
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-hair-2 bg-paper px-4 py-3 text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-dawn-deep";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-hair bg-paper p-6 shadow-sm sm:p-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={inputClass}
          type="text"
          name="name"
          placeholder="Your name *"
          autoComplete="name"
          required
          value={form.name}
          onChange={set("name")}
        />
        <input
          className={inputClass}
          type="email"
          name="email"
          placeholder="Email address *"
          autoComplete="email"
          required
          value={form.email}
          onChange={set("email")}
        />
        <input
          className={inputClass}
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          autoComplete="tel"
          value={form.phone}
          onChange={set("phone")}
        />
        <input
          className={inputClass}
          type="text"
          name="org"
          placeholder="Church / organization (optional)"
          autoComplete="organization"
          value={form.org}
          onChange={set("org")}
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <select
          className={`${inputClass} appearance-none`}
          name="interest"
          value={form.interest}
          onChange={set("interest")}
          aria-label="How would you like to partner?"
        >
          {INTEREST_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <input
          className={inputClass}
          type="text"
          name="amount"
          placeholder="Gift amount you have in mind (optional)"
          value={form.amount}
          onChange={set("amount")}
        />
      </div>

      <textarea
        className={`${inputClass} mt-3 min-h-[110px] resize-y`}
        name="message"
        placeholder="Anything you'd like Joe to know? (optional)"
        value={form.message}
        onChange={set("message")}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full rounded-full bg-dawn-deep px-7 py-3.5 text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-all hover:bg-ink disabled:opacity-70"
      >
        {status === "loading" ? "Sending…" : "Send my interest to Joe"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm text-dawn-deep">
          Something went wrong. Please try again, or email{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
          .
        </p>
      )}

      <p className="mt-3 text-xs leading-relaxed text-muted">
        Joe will follow up personally. Gifts are currently made by check (mailing details provided after
        you submit); secure online card giving is coming soon.
      </p>
    </form>
  );
}

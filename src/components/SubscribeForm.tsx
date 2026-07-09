"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

/** Email signup for the Morning With Jesus daily devotional. */
export default function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", place: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
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
    return (
      <div className="rounded-2xl border border-hair bg-paper p-8 text-center shadow-sm">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-dawn/15 text-dawn-deep">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="mt-4 font-display text-xl font-semibold text-ink">You&apos;re all set.</p>
        <p className="mt-2 text-body">
          Welcome to Morning With Jesus. Your first devotional will arrive soon — see you in the morning.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-hair-2 bg-paper px-4 py-3 text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-dawn-deep";

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl border border-hair bg-paper p-6 shadow-sm sm:p-8 ${compact ? "" : ""}`}
    >
      <div className={`grid gap-3 ${compact ? "sm:grid-cols-3" : ""}`}>
        <input
          className={inputClass}
          type="text"
          name="name"
          placeholder="Your name"
          autoComplete="name"
          required
          value={form.name}
          onChange={set("name")}
        />
        <input
          className={inputClass}
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="email"
          required
          value={form.email}
          onChange={set("email")}
        />
        <input
          className={inputClass}
          type="text"
          name="place"
          placeholder="City, State"
          autoComplete="address-level2"
          value={form.place}
          onChange={set("place")}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full rounded-full bg-dawn-deep px-7 py-3.5 text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-all hover:bg-ink disabled:opacity-70 sm:w-auto sm:px-9"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe free"}
      </button>
      {status === "error" && (
        <p className="mt-3 text-sm text-dawn-deep">
          Something went wrong. Please try again, or email {""}
          <a href="mailto:joe@joepettigrew.org" className="underline">joe@joepettigrew.org</a>.
        </p>
      )}
      <p className="mt-3 text-xs text-muted">
        Free forever. No spam — just a short word each morning. Unsubscribe anytime.
      </p>
    </form>
  );
}

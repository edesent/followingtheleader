"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "sent" | "error";

export default function LoginForm({ initialError }: { initialError?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-dawn/15 text-dawn-deep">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />
          </svg>
        </div>
        <p className="mt-4 font-display text-xl font-semibold text-ink">Check your email</p>
        <p className="mt-2 text-body">
          If that address has admin access, a secure sign-in link is on its way. It&apos;s valid for
          15 minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      {initialError && (
        <p className="mb-4 rounded-lg bg-rose/10 px-4 py-2.5 text-sm text-dawn-deep">
          That link was invalid or expired. Enter your email to get a new one.
        </p>
      )}
      <label htmlFor="admin-email" className="text-sm font-semibold text-ink">
        Admin email
      </label>
      <input
        id="admin-email"
        type="email"
        required
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="mt-2 w-full rounded-xl border border-hair-2 bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-dawn-deep"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full rounded-full bg-dawn-deep px-7 py-3.5 text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-colors hover:bg-ink disabled:opacity-70"
      >
        {status === "loading" ? "Sending…" : "Email me a login link"}
      </button>
      {status === "error" && (
        <p className="mt-3 text-sm text-dawn-deep">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

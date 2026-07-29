"use client";

import { useState } from "react";

/** Starts a Stripe Checkout session for the book and redirects to it. */
export default function BuyButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function start() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setMessage(data.error || "Ordering isn't available just yet — check back soon.");
    } catch {
      setMessage("Something went wrong starting checkout. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={start}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-dawn-deep px-8 py-3.5 text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/25 transition-colors hover:bg-ink disabled:opacity-70"
      >
        {loading ? "Starting checkout…" : label}
        {!loading && <span aria-hidden>→</span>}
      </button>
      {message && <p className="mt-3 text-sm text-muted">{message}</p>}
    </div>
  );
}

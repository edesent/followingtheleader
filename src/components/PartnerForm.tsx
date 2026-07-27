"use client";

import { useState } from "react";
import { SITE } from "@/config/site";

type Status = "idle" | "loading" | "done" | "error";

const STEPS = ["Your info", "Your gift", "How to give"];

const INTEREST_OPTIONS = [
  "Become a Founding Partner",
  "Underwrite an initiative",
  "Support the mission",
  "I'm not sure yet — let's talk",
];

const AMOUNT_PRESETS = ["$50", "$100", "$250", "$500", "$1,000"];

const emailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

/** Three-step partnership signup: contact → gift → giving method. */
export default function PartnerForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    org: "",
    interest: INTEREST_OPTIONS[0],
    frequency: "One-time",
    amount: "",
    method: "",
    message: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const patch = (v: Partial<typeof form>) => setForm((f) => ({ ...f, ...v }));

  const step1Ok = form.name.trim().length > 0 && emailValid(form.email);
  const canSubmit = step1Ok && form.method !== "";

  async function submit() {
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

  /* ---------- Success ---------- */
  if (status === "done") {
    const firstName = form.name.trim().split(/\s+/)[0];
    const chose = form.method;
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
          {chose === "online" ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dawn-deep">
                Online card giving — coming soon
              </p>
              <p className="mt-2 leading-relaxed text-body">
                Secure giving by card is launching soon. We&apos;ve saved your interest and will email you
                the moment it&apos;s ready. If you&apos;d like to give sooner, you can always mail a check:
              </p>
            </>
          ) : (
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dawn-deep">
              To give by check
            </p>
          )}
          <p className={`${chose === "online" ? "mt-3" : "mt-2"} leading-relaxed text-body`}>
            Make your check payable to{" "}
            <span className="font-semibold text-ink">Following the Leader</span> and mail it to:
          </p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">
            Following the Leader
            <br />
            {SITE.address.line}
            <br />
            {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-hair-2 bg-paper px-4 py-3 text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-dawn-deep";

  return (
    <div className="rounded-2xl border border-hair bg-paper p-6 shadow-sm sm:p-8">
      {/* Stepper */}
      <ol className="flex items-center">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const active = step === n;
          return (
            <li key={label} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
              <div className="flex items-center gap-2.5">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors ${
                    done
                      ? "bg-dawn-deep text-white"
                      : active
                      ? "bg-dawn-deep/10 text-dawn-deep ring-2 ring-dawn-deep"
                      : "bg-cream-2 text-muted"
                  }`}
                >
                  {done ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    n
                  )}
                </span>
                <span
                  className={`hidden text-sm font-semibold sm:inline ${
                    active || done ? "text-ink" : "text-muted"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span className={`mx-3 h-px flex-1 ${done ? "bg-dawn-deep" : "bg-hair"}`} />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-8">
        {/* ---------- Step 1: contact ---------- */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className={inputClass}
                type="text"
                placeholder="Your name *"
                autoComplete="name"
                value={form.name}
                onChange={set("name")}
              />
              <input
                className={inputClass}
                type="email"
                placeholder="Email address *"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
              />
              <input
                className={inputClass}
                type="tel"
                placeholder="Phone (optional)"
                autoComplete="tel"
                value={form.phone}
                onChange={set("phone")}
              />
              <input
                className={inputClass}
                type="text"
                placeholder="Church / organization (optional)"
                autoComplete="organization"
                value={form.org}
                onChange={set("org")}
              />
            </div>
          </div>
        )}

        {/* ---------- Step 2: gift ---------- */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-semibold text-ink">How would you like to partner?</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {INTEREST_OPTIONS.map((o) => {
                  const on = form.interest === o;
                  return (
                    <button
                      key={o}
                      type="button"
                      onClick={() => patch({ interest: o })}
                      className={`rounded-xl border px-4 py-3 text-left text-[0.95rem] font-medium transition-colors ${
                        on
                          ? "border-dawn-deep bg-dawn-deep/[0.06] text-ink"
                          : "border-hair-2 text-body hover:border-dawn-deep/50"
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-ink">Gift amount you have in mind</p>
              <div className="flex flex-wrap gap-2">
                {AMOUNT_PRESETS.map((a) => {
                  const on = form.amount === a;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => patch({ amount: a })}
                      className={`rounded-full border px-5 py-2 text-[0.95rem] font-semibold transition-colors ${
                        on
                          ? "border-dawn-deep bg-dawn-deep text-white"
                          : "border-hair-2 text-body hover:border-dawn-deep/50"
                      }`}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>
              <input
                className={`${inputClass} mt-3`}
                type="text"
                placeholder="Or enter another amount (optional)"
                value={AMOUNT_PRESETS.includes(form.amount) ? "" : form.amount}
                onChange={set("amount")}
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-ink">How often?</p>
              <div className="inline-flex rounded-full border border-hair-2 p-1">
                {["One-time", "Monthly"].map((fq) => {
                  const on = form.frequency === fq;
                  return (
                    <button
                      key={fq}
                      type="button"
                      onClick={() => patch({ frequency: fq })}
                      className={`rounded-full px-5 py-1.5 text-[0.9rem] font-semibold transition-colors ${
                        on ? "bg-dawn-deep text-white" : "text-body hover:text-dawn-deep"
                      }`}
                    >
                      {fq}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ---------- Step 3: method ---------- */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-ink">How would you like to give?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => patch({ method: "check" })}
                className={`rounded-xl border p-5 text-left transition-colors ${
                  form.method === "check"
                    ? "border-dawn-deep bg-dawn-deep/[0.06]"
                    : "border-hair-2 hover:border-dawn-deep/50"
                }`}
              >
                <p className="font-display text-lg font-semibold text-ink">Mail a check</p>
                <p className="mt-1.5 text-sm leading-relaxed text-body">
                  We&apos;ll show you where to send it. Available now.
                </p>
              </button>
              <button
                type="button"
                onClick={() => patch({ method: "online" })}
                className={`relative rounded-xl border p-5 text-left transition-colors ${
                  form.method === "online"
                    ? "border-dawn-deep bg-dawn-deep/[0.06]"
                    : "border-hair-2 hover:border-dawn-deep/50"
                }`}
              >
                <span className="absolute right-4 top-4 rounded-full bg-dawn/15 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-dawn-deep">
                  Coming soon
                </span>
                <p className="font-display text-lg font-semibold text-ink">Give online</p>
                <p className="mt-1.5 text-sm leading-relaxed text-body">
                  Secure card giving. We&apos;ll notify you the moment it&apos;s ready.
                </p>
              </button>
            </div>

            <textarea
              className={`${inputClass} min-h-[90px] resize-y`}
              placeholder="Anything you'd like Joe to know? (optional)"
              value={form.message}
              onChange={set("message")}
            />

            {status === "error" && (
              <p className="text-sm text-dawn-deep">
                Something went wrong. Please try again, or email{" "}
                <a href={`mailto:${SITE.email}`} className="underline">
                  {SITE.email}
                </a>
                .
              </p>
            )}
          </div>
        )}
      </div>

      {/* ---------- Nav ---------- */}
      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-full px-5 py-3 text-[0.95rem] font-semibold text-ink transition-colors hover:text-dawn-deep"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={step === 1 && !step1Ok}
            className="rounded-full bg-dawn-deep px-8 py-3 text-[0.95rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-all hover:bg-ink disabled:opacity-50"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!canSubmit || status === "loading"}
            className="rounded-full bg-dawn-deep px-8 py-3 text-[0.95rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-all hover:bg-ink disabled:opacity-50"
          >
            {status === "loading" ? "Sending…" : "Send my interest to Joe"}
          </button>
        )}
      </div>

      {step === 1 && !step1Ok && (
        <p className="mt-3 text-right text-xs text-muted">Name and a valid email are required to continue.</p>
      )}
    </div>
  );
}

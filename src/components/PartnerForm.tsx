"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/config/site";

type Status = "idle" | "loading" | "done" | "error";

const STEPS = ["Your details", "Your gift", "How to give"];

// Plain-English heading shown above each step, so it's always clear what the
// form is asking for — especially on a phone, where the step labels are hidden.
const STEP_INTRO = [
  {
    title: "Enter your details to give",
    hint: "Start with your name and email. Joe uses these to send your receipt and to follow up with you personally.",
  },
  {
    title: "Choose your gift",
    hint: "Tell us how often and how much you'd like to give.",
  },
  {
    title: "Choose how to give",
    hint: "Give securely by card, or mail a check — either way, Joe will follow up.",
  },
];

const INTEREST_OPTIONS = [
  "Become a Founding Partner",
  "Underwrite an initiative",
  "Support the mission",
  "I'm not sure yet — let's talk",
];

const AMOUNT_PRESETS = ["$25", "$50", "$100", "$250", "$500"];

const emailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const amountCents = (a: string) => Math.round(parseFloat(a.replace(/[^0-9.]/g, "")) * 100) || 0;

/**
 * Three-step partnership form: contact → gift → how to give.
 * Card gifts go to Stripe (monthly = recurring); checks show mailing details.
 */
export default function PartnerForm({
  initialAmount = "",
  initialFrequency,
  bare = false,
  presets = AMOUNT_PRESETS,
  interests = INTEREST_OPTIONS,
  oneTimeOnly = false,
}: {
  /** Pre-chosen gift, e.g. "$50" — set when a tier card opens the form. */
  initialAmount?: string;
  initialFrequency?: "Monthly" | "One-time";
  /** Drop the card chrome — the lightbox supplies its own panel. */
  bare?: boolean;
  /** Override the quick-pick amounts — the major-gift page passes its own. */
  presets?: string[];
  /** Override the "how would you like to partner?" choices. */
  interests?: string[];
  /**
   * Drop the monthly option entirely. The major-gift page asks for a single
   * significant gift, so a monthly toggle there offered major donors a
   * $1,000/mo or $5,000/mo commitment nobody was asking them to make.
   */
  oneTimeOnly?: boolean;
} = {}) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [prefilled, setPrefilled] = useState(Boolean(initialAmount || initialFrequency));
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    org: "",
    interest: interests[0],
    frequency: oneTimeOnly ? "One-time" : initialFrequency ?? "Monthly",
    amount: initialAmount,
    method: "" as "" | "card" | "check",
    message: "",
  });

  // Prefill amount/frequency when arriving from an old tier link
  // (?amount=50&freq=monthly). Props win — they're the deliberate choice.
  useEffect(() => {
    if (initialAmount || initialFrequency) return;
    const q = new URLSearchParams(window.location.search);
    const amt = q.get("amount");
    const freq = q.get("freq");
    if (!amt && !freq) return;
    setPrefilled(true);
    setForm((f) => ({
      ...f,
      amount: amt ? `$${amt.replace(/[^0-9]/g, "")}` : f.amount,
      frequency: oneTimeOnly
        ? "One-time"
        : freq === "monthly"
        ? "Monthly"
        : freq === "onetime"
        ? "One-time"
        : f.frequency,
    }));
  }, [initialAmount, initialFrequency, oneTimeOnly]);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  const patch = (v: Partial<typeof form>) => setForm((f) => ({ ...f, ...v }));

  const step1Ok = form.name.trim().length > 0 && emailValid(form.email);
  const hasAmount = amountCents(form.amount) >= 100;

  async function submit() {
    setErrorMsg("");
    if (!form.method) return;

    // Card → Stripe Checkout (requires an amount).
    if (form.method === "card") {
      if (!hasAmount) {
        setErrorMsg("Please choose an amount to give by card.");
        return;
      }
      setStatus("loading");
      try {
        const res = await fetch("/api/partner-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok && data.url) {
          window.location.href = data.url;
          return;
        }
        setErrorMsg(data.error || "Could not start card giving. Please try again.");
        setStatus("idle");
      } catch {
        setErrorMsg("Something went wrong. Please try again.");
        setStatus("idle");
      }
      return;
    }

    // Check → email Joe + show mailing details.
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

  /* ---------- Success (check) ---------- */
  if (status === "done") {
    const firstName = form.name.trim().split(/\s+/)[0];
    return (
      <div
        className={
          bare
            ? "text-center"
            : "rounded-2xl border border-hair bg-paper p-8 text-center shadow-sm"
        }
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-dawn/15 text-dawn-deep">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="mt-4 font-display text-2xl font-semibold text-ink">
          Thank you{firstName ? `, ${firstName}` : ""}.
        </p>
        <p className="mt-2 text-body">Joe has been notified and will follow up with you personally.</p>
        <div className="mt-7 rounded-xl border border-hair bg-cream-2/50 p-6 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dawn-deep">To send your gift</p>
          <p className="mt-2 leading-relaxed text-body">
            Make your check payable to <span className="font-semibold text-ink">Following the Leader</span> and mail it to:
          </p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">
            Following the Leader
            <br />
            {SITE.address.line}
            <br />
            {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            A federally recognized 501(c)(3) nonprofit ministry. Gifts are tax-deductible as allowed
            by law, and a receipt will be provided for every contribution.
          </p>
        </div>
      </div>
    );
  }

  // With monthly off there is nothing to choose but the amount, so step 2 says so.
  const stepIntro = oneTimeOnly
    ? STEP_INTRO.map((s, i) =>
        i === 1 ? { ...s, hint: "Tell us how much you'd like to give." } : s,
      )
    : STEP_INTRO;

  const inputClass =
    "w-full rounded-xl border border-hair-2 bg-paper px-4 py-3.5 text-[1.05rem] text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-dawn-deep";

  const labelClass = "mb-1.5 block text-[0.95rem] font-semibold text-ink";

  return (
    <div className={bare ? "" : "rounded-2xl border border-hair bg-paper p-6 shadow-sm sm:p-8"}>
      {/* The gift they picked, kept in view the whole way through */}
      {form.amount && (
        <div className="mb-6 rounded-xl border border-dawn-deep/25 bg-dawn-deep/[0.06] px-4 py-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-dawn-deep">Your gift</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            {form.amount}
            <span className="text-base font-normal text-muted">
              {form.frequency === "Monthly" ? " a month" : " one time"}
            </span>
          </p>
          {prefilled && step < 2 && (
            <p className="mt-1.5 text-sm text-muted">You can change this on the next step.</p>
          )}
        </div>
      )}

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
                    done ? "bg-dawn-deep text-white" : active ? "bg-dawn-deep/10 text-dawn-deep ring-2 ring-dawn-deep" : "bg-cream-2 text-muted"
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
                <span className={`hidden text-sm font-semibold sm:inline ${active || done ? "text-ink" : "text-muted"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && <span className={`mx-3 h-px flex-1 ${done ? "bg-dawn-deep" : "bg-hair"}`} />}
            </li>
          );
        })}
      </ol>

      {/* What this step is asking for */}
      <div className="mt-7 border-t border-hair pt-6">
        <p className="font-display text-xl font-semibold text-ink">{stepIntro[step - 1].title}</p>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{stepIntro[step - 1].hint}</p>
      </div>

      <div className="mt-6">
        {/* Step 1 */}
        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>
                Your name <span className="text-dawn-deep">(required)</span>
              </span>
              <input className={inputClass} type="text" autoComplete="name" value={form.name} onChange={set("name")} />
            </label>
            <label className="block">
              <span className={labelClass}>
                Email address <span className="text-dawn-deep">(required)</span>
              </span>
              <input className={inputClass} type="email" autoComplete="email" value={form.email} onChange={set("email")} />
            </label>
            <label className="block">
              <span className={labelClass}>
                Phone number <span className="font-normal text-muted">(optional)</span>
              </span>
              <input className={inputClass} type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} />
            </label>
            <label className="block">
              <span className={labelClass}>
                Church or organization <span className="font-normal text-muted">(optional)</span>
              </span>
              <input className={inputClass} type="text" autoComplete="organization" value={form.org} onChange={set("org")} />
            </label>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Frequency — monthly emphasized. Hidden entirely on a major-gift
                ask, where the whole request is one significant gift. */}
            {!oneTimeOnly && (
            <div>
              <p className="mb-2 text-sm font-semibold text-ink">How often?</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => patch({ frequency: "Monthly" })}
                  className={`relative rounded-xl border p-4 text-left transition-colors ${
                    form.frequency === "Monthly" ? "border-dawn-deep bg-dawn-deep/[0.06] ring-1 ring-dawn-deep" : "border-hair-2 hover:border-dawn-deep/50"
                  }`}
                >
                  <span className="absolute right-3 top-3 hidden rounded-full bg-dawn/20 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-dawn-deep sm:block">
                    Most impact
                  </span>
                  <p className="font-display text-lg font-semibold text-ink">Monthly</p>
                  <p className="mt-0.5 text-xs leading-snug text-muted">Steady support that sustains the ministry.</p>
                </button>
                <button
                  type="button"
                  onClick={() => patch({ frequency: "One-time" })}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    form.frequency === "One-time" ? "border-dawn-deep bg-dawn-deep/[0.06] ring-1 ring-dawn-deep" : "border-hair-2 hover:border-dawn-deep/50"
                  }`}
                >
                  <p className="font-display text-lg font-semibold text-ink">One-time</p>
                  <p className="mt-0.5 text-xs leading-snug text-muted">A single gift, given once.</p>
                </button>
              </div>
            </div>
            )}

            {/* Amount */}
            <div>
              <p className="mb-2 text-sm font-semibold text-ink">
                Amount {form.frequency === "Monthly" ? "per month" : ""}
              </p>
              <div className="flex flex-wrap gap-2">
                {presets.map((a) => {
                  const on = form.amount === a;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => patch({ amount: a })}
                      className={`rounded-full border px-5 py-2 text-[0.95rem] font-semibold transition-colors ${
                        on ? "border-dawn-deep bg-dawn-deep text-white" : "border-hair-2 text-body hover:border-dawn-deep/50"
                      }`}
                    >
                      {a}
                      {form.frequency === "Monthly" ? <span className="text-xs font-normal">/mo</span> : null}
                    </button>
                  );
                })}
              </div>
              <input
                className={`${inputClass} mt-3`}
                type="text"
                inputMode="decimal"
                placeholder="Or enter an amount"
                value={presets.includes(form.amount) ? "" : form.amount}
                onChange={set("amount")}
              />
            </div>

            {/* Interest */}
            <div>
              <p className="mb-2 text-sm font-semibold text-ink">How would you like to partner?</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {interests.map((o) => {
                  const on = form.interest === o;
                  return (
                    <button
                      key={o}
                      type="button"
                      onClick={() => patch({ interest: o })}
                      className={`rounded-xl border px-4 py-3 text-left text-[0.95rem] font-medium transition-colors ${
                        on ? "border-dawn-deep bg-dawn-deep/[0.06] text-ink" : "border-hair-2 text-body hover:border-dawn-deep/50"
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-ink">How would you like to give?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => patch({ method: "card" })}
                className={`rounded-xl border p-5 text-left transition-colors ${
                  form.method === "card" ? "border-dawn-deep bg-dawn-deep/[0.06]" : "border-hair-2 hover:border-dawn-deep/50"
                }`}
              >
                <p className="font-display text-lg font-semibold text-ink">Give by card</p>
                <p className="mt-1.5 text-sm leading-relaxed text-body">
                  Secure checkout{form.frequency === "Monthly" ? " — your monthly gift renews automatically." : "."}
                </p>
              </button>
              <button
                type="button"
                onClick={() => patch({ method: "check" })}
                className={`rounded-xl border p-5 text-left transition-colors ${
                  form.method === "check" ? "border-dawn-deep bg-dawn-deep/[0.06]" : "border-hair-2 hover:border-dawn-deep/50"
                }`}
              >
                <p className="font-display text-lg font-semibold text-ink">Mail a check</p>
                <p className="mt-1.5 text-sm leading-relaxed text-body">
                  We&apos;ll show you where to send it and Joe will follow up.
                </p>
              </button>
            </div>

            {form.method === "card" && !hasAmount && (
              <p className="text-sm text-dawn-deep">Go back and choose an amount to give by card.</p>
            )}

            <textarea
              className={`${inputClass} min-h-[90px] resize-y`}
              placeholder="Anything you'd like Joe to know? (optional)"
              value={form.message}
              onChange={set("message")}
            />

            {errorMsg && <p className="text-sm text-dawn-deep">{errorMsg}</p>}
            {status === "error" && (
              <p className="text-sm text-dawn-deep">
                Something went wrong. Please try again, or email{" "}
                <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="rounded-full px-5 py-3 text-[0.95rem] font-semibold text-ink transition-colors hover:text-dawn-deep">
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
            disabled={!form.method || status === "loading"}
            className="rounded-full bg-dawn-deep px-8 py-3 text-[0.95rem] font-semibold text-white shadow-lg shadow-dawn-deep/20 transition-all hover:bg-ink disabled:opacity-50"
          >
            {status === "loading"
              ? "Working…"
              : form.method === "card"
              ? "Continue to secure checkout"
              : "Send to Joe"}
          </button>
        )}
      </div>
    </div>
  );
}

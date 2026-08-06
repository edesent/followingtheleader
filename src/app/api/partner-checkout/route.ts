import { NextResponse } from "next/server";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { SITE } from "@/config/site";

export const runtime = "nodejs";

/**
 * Creates a Stripe Checkout Session for a card gift to the ministry.
 * One-time gifts use payment mode; monthly gifts create a subscription.
 * The gift is recorded (and Joe notified) from the Stripe webhook on success.
 */

function parseCents(raw: string): number {
  const n = Math.round(parseFloat(String(raw).replace(/[^0-9.]/g, "")) * 100);
  return Number.isFinite(n) ? n : 0;
}

export async function POST(request: Request) {
  if (!stripeConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Card giving isn't available yet." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const org = String(body.org ?? "").trim();
  const interest = String(body.interest ?? "").trim();
  const message = String(body.message ?? "").trim();
  const frequency = String(body.frequency ?? "").trim().toLowerCase() === "monthly" ? "Monthly" : "One-time";
  const cents = parseCents(String(body.amount ?? ""));

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid name and email are required" }, { status: 400 });
  }
  if (cents < 100) {
    return NextResponse.json({ ok: false, error: "Please choose an amount of at least $1." }, { status: 400 });
  }

  const monthly = frequency === "Monthly";
  const origin = request.headers.get("origin") || SITE.url;
  const amountLabel = `$${(cents / 100).toFixed(2)}${monthly ? "/mo" : ""}`;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: monthly ? "subscription" : "payment",
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: cents,
            ...(monthly ? { recurring: { interval: "month" as const } } : {}),
            product_data: {
              name: monthly
                ? "Monthly Partnership — Following the Leader"
                : "Gift to Following the Leader",
            },
          },
        },
      ],
      metadata: {
        type: "partner",
        name,
        email,
        phone,
        org,
        interest,
        frequency,
        amount_label: amountLabel,
        message: message.slice(0, 480),
      },
      success_url: `${origin}/partner/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/partner#give`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    console.error("Partner checkout error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not start card giving. Please try again." },
      { status: 500 }
    );
  }
}

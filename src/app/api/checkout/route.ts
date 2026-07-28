import { NextResponse } from "next/server";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { NEW_RELEASE, SITE } from "@/config/site";

export const runtime = "nodejs";

/**
 * Creates a Stripe Checkout Session for the print book and returns its URL.
 * Fulfillment happens in the Stripe webhook (submits a Lulu print job).
 */
export async function POST(request: Request) {
  if (!stripeConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Checkout isn't available yet." },
      { status: 503 }
    );
  }

  const origin = request.headers.get("origin") || SITE.url;
  const image = new URL(NEW_RELEASE.image, SITE.url).toString();
  const shippingFlatCents = Number(process.env.SHIPPING_FLAT_CENTS || 499);

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 20 },
          price_data: {
            currency: NEW_RELEASE.currency,
            unit_amount: NEW_RELEASE.priceCents,
            product_data: {
              name: `${NEW_RELEASE.title} — ${NEW_RELEASE.tagline}`,
              description: `Paperback by ${NEW_RELEASE.author}. Printed to order and shipped to you.`,
              images: [image],
            },
          },
        },
      ],
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      phone_number_collection: { enabled: true },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Standard shipping",
            fixed_amount: { amount: shippingFlatCents, currency: NEW_RELEASE.currency },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 12 },
            },
          },
        },
      ],
      metadata: { sku: "following-the-leader", title: NEW_RELEASE.title },
      success_url: `${origin}/books/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#new-book`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}

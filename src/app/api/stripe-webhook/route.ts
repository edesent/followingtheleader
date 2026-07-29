import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { createPrintJob, luluConfigured } from "@/lib/lulu";
import { dbConfigured, recordOrder } from "@/lib/db";
import { NEW_RELEASE } from "@/config/site";

export const runtime = "nodejs";

/**
 * Stripe webhook. On a completed checkout we submit a Lulu print job with the
 * buyer's shipping address so the book prints on demand and ships to them.
 * Everything is best-effort and logged — a failure here never 500s Stripe into
 * endless retries beyond what's useful.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeConfigured() || !secret) {
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  const sig = request.headers.get("stripe-signature");
  const raw = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig ?? "", secret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ ok: false, error: "Bad signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const full = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
      });

      // Shipping details live in different places across API versions.
      const loose = full as unknown as {
        collected_information?: { shipping_details?: { name?: string; address?: Stripe.Address } };
        shipping_details?: { name?: string; address?: Stripe.Address };
      };
      const shipping = loose.collected_information?.shipping_details ?? loose.shipping_details;
      const addr = shipping?.address;
      const name = shipping?.name || full.customer_details?.name || "";
      const email = full.customer_details?.email || "";
      const phone = full.customer_details?.phone || "";
      const qty = full.line_items?.data?.[0]?.quantity ?? 1;

      // Record the order in our database so it shows in the admin dashboard.
      if (dbConfigured()) {
        try {
          await recordOrder({
            email,
            name,
            bookId: "following-the-leader",
            bookTitle: NEW_RELEASE.title,
            quantity: qty,
            amountCents: full.amount_total ?? undefined,
            status: "paid",
            providerRef: full.id,
          });
        } catch (e) {
          console.error("Order DB insert failed:", e);
        }
      }

      if (luluConfigured() && addr?.line1 && addr.country && addr.postal_code) {
        const job = await createPrintJob({
          quantity: qty,
          contactEmail: email,
          externalId: full.id,
          title: NEW_RELEASE.title,
          shippingAddress: {
            name,
            street1: addr.line1,
            street2: addr.line2 || undefined,
            city: addr.city || "",
            state_code: addr.state || undefined,
            country_code: addr.country,
            postcode: addr.postal_code,
            phone_number: phone || "0000000000",
          },
        });
        console.log(`Lulu print job created: ${job.id} for Stripe session ${full.id}`);
      } else {
        console.warn(
          `Order ${full.id} paid but Lulu not configured or address incomplete — no print job submitted.`
        );
      }

      // Notify the ministry (best-effort).
      const resendKey = process.env.RESEND_API_KEY;
      const notify = process.env.ORDER_NOTIFY_EMAIL || process.env.SUBSCRIBE_NOTIFY_EMAIL;
      if (resendKey && notify) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Following the Leader <no-reply@elijahdesent.com>",
            to: [notify],
            subject: `New book order: ${NEW_RELEASE.title} (x${qty})`,
            text: `Order ${full.id}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nShip to: ${
              addr ? `${addr.line1}, ${addr.city} ${addr.state ?? ""} ${addr.postal_code}, ${addr.country}` : "n/a"
            }\nAmount: ${((full.amount_total ?? 0) / 100).toFixed(2)} ${(full.currency ?? "").toUpperCase()}`,
          }),
        }).catch(() => {});
      }
    } catch (err) {
      console.error("Fulfillment error:", err);
      // Return 200 so Stripe doesn't hammer retries; the order is logged for manual follow-up.
    }
  }

  return NextResponse.json({ received: true });
}

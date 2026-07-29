/**
 * Minimal Lulu Print API client (https://developers.lulu.com).
 *
 * Fulfillment for the print book: after a successful Stripe payment, we submit a
 * print job with the buyer's shipping address. Lulu prints on demand and ships
 * directly to the reader.
 *
 * Configure via environment variables:
 *   LULU_API_BASE          https://api.sandbox.lulu.com  (default) | https://api.lulu.com
 *   LULU_CLIENT_KEY        OAuth client key
 *   LULU_CLIENT_SECRET     OAuth client secret
 *   LULU_POD_PACKAGE_ID    e.g. 0550X0850BWSTDPB060UW444GXX (trim/paper/bind spec)
 *   LULU_INTERIOR_URL      public URL of the print-ready interior PDF
 *   LULU_COVER_URL         public URL of the print-ready cover PDF
 *   LULU_SHIPPING_LEVEL    MAIL (default) | PRIORITY_MAIL | GROUND | EXPEDITED | EXPRESS
 */

const BASE = process.env.LULU_API_BASE || "https://api.sandbox.lulu.com";

export function luluConfigured(): boolean {
  return Boolean(
    process.env.LULU_CLIENT_KEY &&
      process.env.LULU_CLIENT_SECRET &&
      process.env.LULU_POD_PACKAGE_ID &&
      process.env.LULU_INTERIOR_URL &&
      process.env.LULU_COVER_URL
  );
}

export type LuluShippingAddress = {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  postcode: string;
  phone_number: string;
};

async function getToken(): Promise<string> {
  const key = process.env.LULU_CLIENT_KEY!;
  const secret = process.env.LULU_CLIENT_SECRET!;
  const basic = Buffer.from(`${key}:${secret}`).toString("base64");

  const res = await fetch(`${BASE}/auth/realms/glasstree/protocol/openid-connect/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    throw new Error(`Lulu auth failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/** Submit a print job to Lulu for one title. Returns the created job. */
export async function createPrintJob(opts: {
  quantity: number;
  contactEmail: string;
  shippingAddress: LuluShippingAddress;
  externalId: string; // our order reference (e.g. the Stripe session id)
  title: string;
}): Promise<{ id: number | string; status?: unknown }> {
  const token = await getToken();

  const body = {
    contact_email: opts.contactEmail,
    external_id: opts.externalId,
    line_items: [
      {
        external_id: opts.externalId,
        title: opts.title,
        quantity: opts.quantity,
        printable_normalization: {
          pod_package_id: process.env.LULU_POD_PACKAGE_ID,
          cover: { source_url: process.env.LULU_COVER_URL },
          interior: { source_url: process.env.LULU_INTERIOR_URL },
        },
      },
    ],
    shipping_level: process.env.LULU_SHIPPING_LEVEL || "MAIL",
    shipping_address: opts.shippingAddress,
  };

  const res = await fetch(`${BASE}/print-jobs/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Lulu print-job failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as { id: number | string };
}

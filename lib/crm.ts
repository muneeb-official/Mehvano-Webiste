/**
 * CRM ADAPTER — the seam between site forms and whatever CRM she keeps
 * (report §11: every capture feeds HER database).
 *
 * Swap the implementation of `deliverLead` to wire up Follow Up Boss, Lofty,
 * a webhook (Make/n8n/Zapier), or email. The API route + forms never change.
 */

export type LeadSource =
  | "home-value"
  | "home-value-zip"
  | "contact"
  | "guide-download"
  | "listing-inquiry";

export type LeadPayload = {
  source: LeadSource;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  /** Property address for home-value requests. */
  address?: string;
  /** Target zip slug/context, e.g. "pasadena-21122". */
  context?: string;
  /** Anti-spam honeypot — must be empty. */
  company?: string;
  page?: string;
};

export type LeadResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function validateLead(input: Partial<LeadPayload>): {
  valid: boolean;
  errors: Record<string, string>;
  data?: LeadPayload;
} {
  const errors: Record<string, string> = {};

  // Honeypot: a filled "company" field means a bot — reject silently upstream.
  if (input.company) errors.company = "spam";

  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (!input.source) errors.source = "Missing source.";

  if (Object.keys(errors).length > 0) return { valid: false, errors };

  return {
    valid: true,
    errors,
    data: {
      source: input.source as LeadSource,
      name,
      email,
      phone: input.phone?.trim() || undefined,
      message: input.message?.trim() || undefined,
      address: input.address?.trim() || undefined,
      context: input.context?.trim() || undefined,
      page: input.page?.trim() || undefined,
    },
  };
}

/**
 * Deliver the lead to the CRM. Configure a webhook via CRM_WEBHOOK_URL
 * (Make / n8n / Zapier / Follow Up Boss inbound). Without it, the lead is
 * logged so nothing is lost during setup.
 */
export async function deliverLead(lead: LeadPayload): Promise<LeadResult> {
  const id = `lead_${Date.now().toString(36)}`;
  const webhook = process.env.CRM_WEBHOOK_URL;

  if (!webhook) {
    console.info("[CRM] No CRM_WEBHOOK_URL set — logging lead:", { id, ...lead });
    return { ok: true, id };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, receivedAt: new Date().toISOString(), ...lead }),
    });
    if (!res.ok) return { ok: false, error: `CRM responded ${res.status}` };
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Delivery failed" };
  }
}

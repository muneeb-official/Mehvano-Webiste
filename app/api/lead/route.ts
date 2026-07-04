import { NextResponse } from "next/server";
import { deliverLead, validateLead } from "@/lib/crm";

// Leads are dynamic per-request; never cache.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { valid, errors, data } = validateLead(body as Record<string, string>);

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (errors.company) {
    return NextResponse.json({ ok: true, id: "ok" });
  }

  if (!valid || !data) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const result = await deliverLead(data);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "We couldn't submit that just now. Please try again or call directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, id: result.id });
}

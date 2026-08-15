"use client";

import { useState, type FormEvent } from "react";
import type { LeadSource } from "@/lib/crm";
import { Field, Input, Textarea, Honeypot } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** Phone was intentionally removed — the business collects email only. */
type ExtraField = "address" | "message";

type LeadFormProps = {
  source: LeadSource;
  /** Context passed to the CRM, e.g. a zip slug. */
  context?: string;
  /** Which optional fields to show (name + email are always present). */
  fields?: ExtraField[];
  submitLabel?: string;
  successTitle?: string;
  successText?: string;
  className?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm({
  source,
  context,
  fields = [],
  submitLabel = "Send",
  successTitle = "You're all set!",
  successText = "Thanks — I'll be in touch shortly, usually within minutes during the day.",
  className,
}: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source,
          context,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrors(json.errors ?? {});
        setMessage(json.error ?? "Something went wrong. Please try again or email us directly.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("flex flex-col items-center gap-4 rounded-2xl border border-line bg-paper p-8 text-center", className)}>
        <span className="grid h-14 w-14 place-items-center rounded-full bg-success/12 text-success">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3 className="font-display text-xl font-bold text-fg">{successTitle}</h3>
        <p className="max-w-sm text-sm text-fg-muted">{successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-4", className)} noValidate>
      <Honeypot />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={errors.name}>
          <Input id="name" name="name" autoComplete="name" placeholder="Jane Doe" required />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="jane@email.com" required />
        </Field>
      </div>

      {fields.includes("address") ? (
        <Field label="Property address" htmlFor="address" required error={errors.address}>
          <Input id="address" name="address" autoComplete="street-address" placeholder="123 Main St, City, State 12345" />
        </Field>
      ) : null}

      {fields.includes("message") ? (
        <Field label="How can I help?" htmlFor="message" error={errors.message}>
          <Textarea id="message" name="message" placeholder="Tell me a bit about what you're looking for…" />
        </Field>
      ) : null}

      {status === "error" && message ? (
        <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
          {message}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "submitting"} icon="arrow-up-right" className="mt-1 w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : submitLabel}
      </Button>

      <p className="text-xs leading-relaxed text-fg-subtle">
        By submitting, you agree to be contacted about your inquiry. Your information is never sold.
      </p>
    </form>
  );
}

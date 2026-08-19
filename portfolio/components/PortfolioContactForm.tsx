"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Amber-themed contact form for the /portfolio page (reference layout:
 * Name / Email / Messages / Send). Self-contained so it can style white-on-gold
 * without fighting the site's light-theme Field/Input tokens — but it posts to
 * the SAME /api/lead endpoint as every other form on the site.
 */
export function PortfolioContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "contact",
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
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
      <div className="flex flex-col items-start gap-3 rounded-2xl bg-white/15 p-8 backdrop-blur">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#c07f16]">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h3 className="font-display text-xl font-bold text-white">Message sent!</h3>
        <p className="max-w-sm text-sm text-white/85">
          Thanks for reaching out — I&rsquo;ll reply personally, usually within minutes during
          the day.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none transition-colors focus:border-white/70 focus:bg-white/15";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {/* Honeypot — bots fill this; humans never see it. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-white/90">Name</span>
        <input name="name" autoComplete="name" placeholder="Enter name" required className={inputClass} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-white/90">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ex: email@gmail.com"
          required
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-white/90">Messages</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Type message"
          className={`${inputClass} resize-y`}
        />
      </label>

      {status === "error" && message ? (
        <p className="rounded-xl bg-black/20 px-4 py-3 text-sm text-white" role="alert">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

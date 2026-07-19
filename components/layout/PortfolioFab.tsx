"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { AGENT } from "@/lib/constants";
import { HERO_CARD_STATS } from "@/lib/portfolio";

const SPECIALTIES = ["Fort Meade relocation", "First-time buyers", "Seller pricing"];

/**
 * Floating agent widget. A blinking, always-reachable button in the bottom-right
 * corner; clicking it opens the agent's portfolio card as a popover, and the
 * card's "View full portfolio" button navigates to /portfolio. Closes on the ✕,
 * Escape, a click outside, or a route change. Hidden on the portfolio page, and
 * the pulse/blink pause under prefers-reduced-motion (see globals.css).
 */
export function PortfolioFab() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const firstName = AGENT.name.split(" ")[0];

  // Close whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape + click-outside to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  // Move focus into the card on open; return it to the button on close.
  useEffect(() => {
    if (open) closeRef.current?.focus();
    else if (wasOpen.current) fabRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  if (pathname === "/portfolio") return null;

  return (
    <div
      ref={rootRef}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
    >
      {/* Portfolio identity card (popover) */}
      {open ? (
        <div
          role="dialog"
          aria-label={`${AGENT.name} — portfolio preview`}
          className="fab-pop relative max-h-[calc(100vh-8rem)] w-[min(22rem,calc(100vw-2.5rem))] overflow-y-auto rounded-3xl border border-white/10 bg-ink p-5 text-white shadow-lift sm:p-6"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close agent card"
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>

          {/* Identity row */}
          <div className="flex items-center gap-4 pr-6">
            <Avatar name={AGENT.name} size={56} />
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1.5">
                <p className="truncate font-display text-lg font-bold text-white">{AGENT.name}</p>
                <Icon name="check" className="h-4 w-4 shrink-0 rounded-full bg-gold-bright/90 p-0.5 text-ink" />
              </div>
              <p className="text-xs text-white/65">
                {AGENT.role} · MD #{AGENT.licenseNumber}
              </p>
              <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-gold-bright">
                <Icon name="star" className="h-3.5 w-3.5 fill-gold-bright" />
                4.9 · Client rated
              </span>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Your hyperlocal expert for Severn, Pasadena &amp; Ellicott City — buying,
            selling, and straight answers backed by real market data.
          </p>

          {/* Stat trio */}
          <dl className="mt-5 grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/5 py-3 text-center">
            {HERO_CARD_STATS.map((s) => (
              <div key={s.label} className="px-2">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-xl font-extrabold text-white">{s.value}</dd>
                <span className="mt-0.5 block text-[0.68rem] leading-tight text-white/60">{s.label}</span>
              </div>
            ))}
          </dl>

          {/* Specialty chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {SPECIALTIES.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
              >
                {chip}
              </span>
            ))}
          </div>

          <Link
            href="/portfolio"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            View full portfolio
            <Icon name="arrow-up-right" className="h-4 w-4" />
          </Link>
        </div>
      ) : null}

      {/* Floating button (toggles the card) */}
      <div className="group flex items-center self-end">
        {!open ? (
          <span
            aria-hidden
            className="pointer-events-none mr-3 max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-ink px-0 py-2.5 text-sm font-medium text-white opacity-0 shadow-lift transition-all duration-300 ease-out group-hover:max-w-[20rem] group-hover:px-4 group-hover:opacity-100 group-focus-within:max-w-[20rem] group-focus-within:px-4 group-focus-within:opacity-100"
          >
            Meet {firstName}, your real estate agent
          </span>
        ) : null}

        <button
          ref={fabRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={open ? "Close agent card" : `Meet ${AGENT.name}, your real estate agent`}
          className="relative grid h-14 w-14 shrink-0 place-items-center"
        >
          {!open ? (
            <>
              <span aria-hidden className="fab-ping absolute inset-0 rounded-full bg-gold/70" />
              <span
                aria-hidden
                className="fab-ping absolute inset-0 rounded-full bg-gold/70 [animation-delay:1.2s]"
              />
            </>
          ) : null}

          <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-ink shadow-lift transition-transform duration-300 group-hover:scale-105">
            {open ? (
              <Icon name="close" className="h-6 w-6 text-white" />
            ) : (
              <>
                <Avatar name={AGENT.name} size={44} />
                <span
                  aria-hidden
                  className="fab-blink absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-ink bg-success"
                />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}

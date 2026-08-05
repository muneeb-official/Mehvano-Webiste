"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useScrollDirection } from "@/hooks/useScrollDirection";

/**
 * Site-wide floating glass "pill" navbar (RESADEX-style). The same capsule
 * appears on every page; at the top it's translucent, and once scrolled it
 * becomes a touch more solid so it stays readable over page content.
 *
 * Motion enhancements (all reduced-motion + a11y safe):
 *   - Solidifies after scrolling past a threshold (existing behaviour).
 *   - Hides while scrolling DOWN, reappears while scrolling UP — but never
 *     while the mobile menu is open (so the menu stays reachable).
 *   - Subtle load-in on first mount.
 *   - Mobile drawer staggers its links in and locks background scroll while
 *     open; scroll is restored on close.
 */
// NOTE: "For clients" (/portfolio) and "Blog" (/guides) are temporarily hidden
// while the real-estate division is offline — restore when it relaunches.
const PILL_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Explore", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { direction, scrolled } = useScrollDirection(24);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll while the mobile drawer is open; restore on close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Hide on scroll-down, show on scroll-up — but stay visible when the menu is
  // open. Near the top the direction hook reports "up", so the bar shows.
  const hidden = direction === "down" && scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6",
        hidden ? "-translate-y-[140%]" : "translate-y-0",
        mounted ? "opacity-100" : "opacity-0"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex h-16 max-w-[1200px] items-center justify-between rounded-full border px-4 pr-3 backdrop-blur-xl transition-colors duration-300 sm:px-6",
          scrolled || open
            ? "border-white/50 bg-white/70 shadow-[0_10px_44px_-12px_rgba(19,23,32,0.35)]"
            : "border-white/40 bg-white/25 shadow-[0_8px_40px_-12px_rgba(19,23,32,0.4)]"
        )}
      >
        <Logo tone="default" />

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {PILL_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white text-ink shadow-sm"
                    : "text-fg/80 hover:bg-white/50 hover:text-fg"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            data-cursor="open"
            className="hidden h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-white transition-colors hover:bg-charcoal sm:inline-flex"
          >
            Contact us
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full text-fg transition-colors hover:bg-white/50 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "mx-4 overflow-hidden rounded-2xl border border-white/50 bg-white/90 backdrop-blur-xl transition-[max-height] duration-300 sm:mx-6 lg:hidden",
          open ? "mt-2 max-h-[26rem]" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-1 p-4">
          {PILL_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              className={cn(
                "rounded-xl px-4 py-3 text-base font-medium text-fg transition-all duration-300 hover:bg-sand",
                open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" className="mt-2 w-full" icon="arrow-up-right">
            Contact us
          </Button>
        </div>
      </div>
    </header>
  );
}

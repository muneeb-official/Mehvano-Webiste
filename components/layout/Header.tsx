"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Site-wide floating glass "pill" navbar (RESADEX-style). The same capsule
 * appears on every page; at the top it's translucent, and once scrolled it
 * becomes a touch more solid so it stays readable over page content.
 */
const PILL_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Explore", href: "/services" },
  { label: "For clients", href: "/portfolio" },
  { label: "Blog", href: "/guides" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300 sm:px-6">
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
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
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
          {PILL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3 text-base font-medium text-fg hover:bg-sand"
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

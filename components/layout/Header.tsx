"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type HeaderProps = {
  /** Force the transparent-over-hero look. Defaults to true only on "/". */
  overHero?: boolean;
};

export function Header({ overHero }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Only the homepage has a dark hero for the bar to float over.
  const floatsOverHero = overHero ?? pathname === "/";

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

  // Transparent look only when over the hero AND not scrolled AND menu closed.
  const transparent = floatsOverHero && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "border-b border-line/70 bg-cream/85 backdrop-blur-lg supports-[backdrop-filter]:bg-cream/70"
      )}
    >
      <nav className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Logo tone={transparent ? "inverse" : "default"} />

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  transparent
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-fg-muted hover:bg-sand hover:text-fg",
                  active && (transparent ? "text-white" : "text-fg")
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button
            href="/contact"
            size="sm"
            variant={transparent ? "light" : "primary"}
            className="hidden sm:inline-flex"
          >
            Book a Call
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden",
              transparent ? "text-white hover:bg-white/10" : "text-fg hover:bg-sand"
            )}
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-line bg-cream transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[26rem]" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3 text-base font-medium text-fg hover:bg-sand"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" className="mt-2 w-full" icon="arrow-up-right">
            Book a Call
          </Button>
        </div>
      </div>
    </header>
  );
}

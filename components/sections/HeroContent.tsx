"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { easings } from "@/lib/animation-config";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/animation";
import { cn } from "@/lib/utils";

/**
 * Light, centered hero foreground — Antigravity-style. Eyebrow → large bold
 * headline → subheadline → two CTAs → scroll cue, choreographed on mount with a
 * gentle scroll-exit. Content is Mehvano's (Maryland services & realty). Sits
 * above the radiating dash-particle burst (HeroParticles) on a light surface.
 *
 * Accessibility / robustness:
 *   - Real <h1>; the headline text is present and readable with JS off.
 *   - Per-word rise out of clipping masks (no character-by-character).
 *   - Ships fully visible; GSAP sets the "from" state on mount only, and does
 *     nothing under reduced motion.
 *   - Transform/opacity only; timeline + ScrollTrigger reverted on unmount.
 */
const HEADLINE_LINES = [
  ["One", "trusted", "partner"],
  ["for", "care,", "tech", "&", "realty."],
];

export function HeroContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: easings.reveal } });
      tl.from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0.1)
        .from(
          ".hero-word",
          { yPercent: 115, opacity: 0, duration: 0.85, stagger: 0.055 },
          0.2
        )
        .from(".hero-sub", { y: 18, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-cta", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.35")
        .from(".hero-cue", { y: 12, opacity: 0, duration: 0.6 }, "-=0.2");

      // Gentle scroll-exit: fade + lift the whole foreground as the hero leaves.
      gsap.to(".hero-foreground", {
        yPercent: -12,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.closest("section") ?? root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="hero-foreground relative z-10 mx-auto flex min-h-screen w-[90%] max-w-8xl flex-col items-center justify-center gap-7 text-center"
    >
      <span className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-cyan-deep/25 bg-white/70 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-cyan-deep backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
        Maryland · Services &amp; Realty
      </span>

      <h1 className="font-display text-4xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.75rem]">
        <span className="sr-only">One trusted partner for care, tech &amp; realty.</span>
        {HEADLINE_LINES.map((line, li) => (
          <span key={li} aria-hidden className="flex flex-wrap justify-center overflow-hidden">
            {line.map((word, wi) => (
              <span
                key={wi}
                className={cn(
                  "hero-word inline-block whitespace-nowrap",
                  wi < line.length - 1 && "mr-[0.28em]"
                )}
              >
                {word === "care," || word === "tech" || word === "realty." ? (
                  <span className="text-gradient-cyan">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <p className="hero-sub max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
        Healthcare, technology, real estate, and business services — Maryland-registered
        specialists under one roof. Adapt, scale, and thrive without juggling a dozen vendors.
      </p>

      <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
        <MagneticButton cursor="open" className="hero-cta">
          <Button href="/contact" size="lg" icon="arrow-up-right" iconCircle>
            Get a Free Consultation
          </Button>
        </MagneticButton>
        <span className="hero-cta">
          <Button href="/services" variant="outline" size="lg" className="bg-white/70 backdrop-blur-sm">
            Explore Services
          </Button>
        </span>
      </div>

      <a
        href="#services"
        data-cursor="view"
        className="hero-cue absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-fg-subtle transition-colors hover:text-ink"
      >
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.4em]">Scroll</span>
        <span className="hero-cue-dot grid h-9 w-9 place-items-center rounded-full border border-line-strong">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M6 1v10M2.5 7.5 6 11l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}

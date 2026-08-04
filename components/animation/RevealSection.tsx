"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { reveal } from "@/lib/animation-config";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "fade"
  | "blur";

type RevealSectionProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  /** Seconds of delay before this element animates. */
  delay?: number;
  /** Stagger direct children instead of animating the block as one. */
  stagger?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Play only once (default) vs. replay when scrolled back into view. */
  once?: boolean;
};

/**
 * The one reusable scroll-triggered reveal used across the site. A consistent
 * motion vocabulary — pick a variant, not a bespoke animation. Uses GSAP
 * ScrollTrigger, scoped + cleaned via gsap.context.
 *
 *  - Content ships VISIBLE (no opacity:0 in markup) so it's readable with JS
 *    off or on error; GSAP sets the "from" state only after mount.
 *  - Under reduced motion it does nothing (content stays put).
 *  - `stagger` animates immediate element children one-by-one.
 */
export function RevealSection({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  stagger = false,
  className,
  style,
  once = true,
}: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fromVars: gsap.TweenVars = { opacity: reveal.opacity, duration: reveal.duration, ease: reveal.ease };
    switch (variant) {
      case "up": fromVars.y = reveal.y; break;
      case "down": fromVars.y = -reveal.y; break;
      case "left": fromVars.x = -reveal.y; break;
      case "right": fromVars.x = reveal.y; break;
      case "scale": fromVars.scale = 0.96; fromVars.y = 16; break;
      case "blur": fromVars.filter = "blur(10px)"; fromVars.y = 20; break;
      case "fade": break;
    }

    const ctx = gsap.context(() => {
      const targets = stagger ? (Array.from(el.children) as HTMLElement[]) : el;
      gsap.from(targets, {
        ...fromVars,
        delay,
        stagger: stagger ? reveal.stagger : 0,
        scrollTrigger: {
          trigger: el,
          start: reveal.start,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
        // Clear inline transforms once done so hover/other transforms are free.
        clearProps: "filter",
      });
    }, el);

    return () => ctx.revert();
  }, [variant, delay, stagger, once]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

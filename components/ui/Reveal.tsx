"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { RevealSection, type RevealVariant } from "@/components/animation/RevealSection";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  /** Delay in ms (legacy call sites pass stagger(i) in ms) — converted to s. */
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  style?: CSSProperties;
};

/**
 * Scroll-triggered reveal wrapper. Now backed by the unified GSAP reveal system
 * (components/animation/RevealSection) — it replaces the old ScrollSlide-based
 * approach. The public API is unchanged so every existing call site keeps
 * working; `delay` is still accepted in MILLISECONDS (matching lib/utils
 * `stagger()`), `amount` is accepted for compatibility but no longer needed.
 * Respects reduced motion and ships content visible for no-JS.
 */
export function Reveal({
  children,
  as = "div",
  variant = "up",
  delay = 0,
  className,
  once = true,
  style,
}: RevealProps) {
  return (
    <RevealSection
      as={as}
      variant={variant}
      delay={delay / 1000}
      once={once}
      className={className}
      style={style}
    >
      {children}
    </RevealSection>
  );
}

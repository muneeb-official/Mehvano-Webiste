"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { parallax, breakpoints } from "@/lib/animation-config";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type ParallaxElementProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Vertical travel in px across the element's scroll window (+down / -up). */
  distance?: number;
  /** Horizontal travel in px (for decorative labels / shapes). */
  distanceX?: number;
  /** Reduce or disable on mobile (default: halve). */
  mobileScale?: number;
};

/**
 * Subtle scroll-linked parallax. Scrubs a transform as the element passes
 * through the viewport. Transform-only, cleaned via gsap.context. Disabled
 * under reduced motion; travel is scaled down on mobile so nothing drifts far
 * enough to hurt readability.
 */
export function ParallaxElement({
  children,
  as: Tag = "div",
  className,
  style,
  distance = parallax.distance,
  distanceX = 0,
  mobileScale = 0.4,
}: ParallaxElementProps) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery(breakpoints.mobile);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const factor = isMobile ? mobileScale : 1;
    const dy = distance * factor;
    const dx = distanceX * factor;
    if (dy === 0 && dx === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0, y: -dy, x: -dx },
        {
          y: dy,
          x: dx,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [distance, distanceX, isMobile, mobileScale]);

  return (
    <Tag ref={ref} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </Tag>
  );
}

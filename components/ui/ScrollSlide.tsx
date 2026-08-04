"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/* ---------------------------------------------------------------------------
 *  ScrollSlide — horizontal slide-in tied to scroll position, alternating
 *  direction (right → left → right) down the document. Rewritten on top of the
 *  unified GSAP/ScrollTrigger motion system (replaces the old bespoke rAF
 *  singleton). Same public API and same visual language as before.
 *
 *  - Direction alternates by DOM order via a shared counter.
 *  - Scrubbed: position follows scroll both ways (glides back out on scroll up).
 *  - Bails under prefers-reduced-motion; ships content centred/visible for
 *    no-JS. Cleaned via gsap.context on unmount.
 * ------------------------------------------------------------------------- */

/** Percentage of its own width a slide starts offset to the side. */
const OFFSET = 40;

// Module counter so successive ScrollSlides alternate direction in mount order.
let mountIndex = 0;

type ScrollSlideProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export function ScrollSlide({ children, as: Tag = "div", className }: ScrollSlideProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dir = mountIndex % 2 === 0 ? 1 : -1;
    mountIndex += 1;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { xPercent: dir * OFFSET, opacity: 0.4 },
        {
          xPercent: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 45%",
            scrub: 0.6,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      mountIndex = Math.max(0, mountIndex - 1);
    };
  }, []);

  return (
    <Tag ref={ref} data-scroll-slide className={className} style={{ willChange: "transform" }}>
      {children}
    </Tag>
  );
}

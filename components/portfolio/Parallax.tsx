"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  as?: ElementType;
  /** Vertical drift range in px across the viewport pass (negative = up). */
  speed?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Lightweight scroll-linked vertical parallax for the portfolio's decorative
 * photo stacks and layered service cards. No-op under prefers-reduced-motion.
 * Drives transform from the element's progress through the viewport via one
 * rAF-throttled scroll listener.
 */
export function Parallax({ children, as: Tag = "div", speed = 40, className, style }: ParallaxProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (below) → 0 (centred) → 1 (above), clamped a little past the edges.
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(progress * speed).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <Tag ref={ref} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </Tag>
  );
}

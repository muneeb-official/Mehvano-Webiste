"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollState = {
  /** "up" | "down" — the last committed scroll direction. */
  direction: "up" | "down";
  /** True once the page has scrolled past `threshold`. */
  scrolled: boolean;
  /** Raw current scrollY (throttled to rAF). */
  y: number;
};

/**
 * Tracks scroll direction + a "past threshold" flag with a small hysteresis so
 * direction doesn't flip on sub-pixel jitter. Drives the hide-on-scroll header.
 * One passive listener, coalesced to a single rAF per frame.
 */
export function useScrollDirection(threshold = 24, delta = 6): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: "up",
    scrolled: false,
    y: 0,
  });
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastY.current = window.scrollY;

    const update = () => {
      ticking.current = false;
      const y = window.scrollY;
      const diff = y - lastY.current;
      setState((prev) => {
        let direction = prev.direction;
        // Only flip direction once movement exceeds the jitter delta.
        if (Math.abs(diff) > delta) direction = diff > 0 ? "down" : "up";
        // Near the very top, always treat as "up" so the header shows.
        if (y <= threshold) direction = "up";
        const scrolled = y > threshold;
        if (direction === prev.direction && scrolled === prev.scrolled && y === prev.y) {
          return prev;
        }
        return { direction, scrolled, y };
      });
      lastY.current = y;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, delta]);

  return state;
}

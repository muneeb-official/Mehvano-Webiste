"use client";

import { useEffect, useRef } from "react";

/**
 * Thin scroll-progress bar pinned to the top of the viewport. Uses transform:
 * scaleX (compositor-friendly) rather than animating width. Driven by one
 * passive scroll listener coalesced to rAF. Hidden under reduced motion (the
 * information is non-essential). Sits above content but below the header pill.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="scroll-progress-track pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={barRef} className="scroll-progress-bar h-full origin-left" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

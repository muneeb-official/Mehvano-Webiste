"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** useLayoutEffect on the client, useEffect on the server (avoids SSR warning). */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DESKTOP = "(min-width: 1024px)";
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const clamp = (x: number, lo: number, hi: number) => (x < lo ? lo : x > hi ? hi : x);

/**
 * Scroll-driven pinned-panel slideshow (the homepage on desktop).
 *
 * Panel 0 is the fixed base (the hero). Every later panel is stacked full-screen
 * over it and slides in from an alternating side (right, left, right, …) as you
 * scroll, tracking scroll position and covering the previous panel. Scroll up to
 * reverse. On mobile / reduced-motion / no-JS the panels fall back to a normal
 * vertical stack (see the `.panel-deck*` rules in globals.css, which only turn on
 * for `.js` + desktop + no-reduced-motion).
 */
export function PanelDeck({ panels }: { panels: ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const container = containerRef.current;
    const viewport = viewportRef.current;
    if (!container || !viewport) return;

    const panelEls = Array.from(viewport.children) as HTMLElement[];
    const n = panelEls.length;
    let rafId = 0;
    let active = false;

    const paint = () => {
      rafId = 0;
      const vh = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - vh;
      const p = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
      panelEls[0].style.transform = "translate3d(0,0,0)";
      for (let i = 1; i < n; i++) {
        const seg = clamp(p * (n - 1) - (i - 1), 0, 1);
        const eased = easeOutCubic(seg);
        const dir = i % 2 === 1 ? 1 : -1; // panel 1 (section 2) from right, alternating
        const x = dir * (1 - eased) * 100;
        panelEls[i].style.transform = `translate3d(${x}%,0,0)`;
      }
    };

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(paint);
    };

    const enable = () => {
      if (active) return;
      active = true;
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      paint();
    };

    const disable = () => {
      if (!active) return;
      active = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      panelEls.forEach((el) => (el.style.transform = ""));
    };

    const desktop = window.matchMedia(DESKTOP);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => (desktop.matches && !reduce.matches ? enable() : disable());

    sync();
    desktop.addEventListener("change", sync);
    reduce.addEventListener("change", sync);

    return () => {
      desktop.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      disable();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="panel-deck"
      style={{ "--deck-count": panels.length } as CSSProperties}
    >
      <div ref={viewportRef} className="panel-deck-viewport">
        {panels.map((panel, i) => (
          <div
            key={i}
            className="panel-deck-panel"
            style={{ zIndex: i, "--dir": i === 0 ? 0 : i % 2 === 1 ? 1 : -1 } as CSSProperties}
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}

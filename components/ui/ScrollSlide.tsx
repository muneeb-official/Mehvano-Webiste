"use client";

import { useEffect, useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";

/** useLayoutEffect on the client, useEffect on the server (avoids SSR warning). */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ---------------------------------------------------------------------------
 *  Shared scroll controller
 *  One scroll/resize listener drives every <ScrollSlide> on the page. Each
 *  registered element's horizontal position is tied to how far it has scrolled
 *  toward the viewport centre (a "scrub"), so it glides in from the side as you
 *  scroll and glides back out when you scroll up. Direction auto-alternates
 *  right → left → right down the document.
 * ------------------------------------------------------------------------- */

const registry = new Set<HTMLElement>();
let rafId = 0;
let listening = false;

/** Percentage of its own width a section starts offset to the side. */
const OFFSET = 55;
/** Fraction of the viewport height where a section finishes centring (p = 1). */
const FINISH = 0.4;
/** Smoothing transition — the section glides toward its scroll target (no fade). */
const SLIDE_TRANSITION = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

function paint() {
  rafId = 0;
  const vh = window.innerHeight;
  const span = vh * (1 - FINISH); // scroll distance from "just entered" to centred
  registry.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const p = clamp01((vh - rect.top) / span);
    const eased = easeOutCubic(p);
    const dir = el.dataset.slideDir === "left" ? -1 : 1;
    const x = dir * (1 - eased) * OFFSET;
    el.style.transform = `translate3d(${x}%, 0, 0)`;
  });
}

function schedule() {
  if (!rafId) rafId = requestAnimationFrame(paint);
}

/** Re-assign alternating directions across all registered slides, in DOM order. */
function assignDirections() {
  const ordered = Array.from(registry).sort((a, b) =>
    a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
  );
  ordered.forEach((el, i) => {
    el.dataset.slideDir = i % 2 === 0 ? "right" : "left";
  });
}

type ScrollSlideProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * Wraps a block so it slides in horizontally, scrubbed by scroll position,
 * alternating direction with the other slides on the page. Applied to section
 * content in Section.tsx. Respects prefers-reduced-motion (renders static) and
 * degrades to fully-visible content when JS is unavailable.
 */
export function ScrollSlide({ children, as: Tag = "div", className }: ScrollSlideProps) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    registry.add(el);
    assignDirections();

    if (!listening) {
      listening = true;
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
    }

    // Snap to the initial scroll position without animating, then enable the
    // smoothing transition so subsequent scroll updates glide.
    el.style.transition = "none";
    paint();
    const enableId = requestAnimationFrame(() => {
      el.style.transition = SLIDE_TRANSITION;
    });

    return () => {
      cancelAnimationFrame(enableId);
      registry.delete(el);
      el.style.transform = "";
      el.style.transition = "";
      assignDirections();
      if (registry.size === 0 && listening) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        listening = false;
      }
    };
  }, []);

  return (
    <Tag ref={ref} data-scroll-slide className={className} style={{ willChange: "transform" }}>
      {children}
    </Tag>
  );
}

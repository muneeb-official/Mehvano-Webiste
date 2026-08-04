"use client";

import { useEffect, useRef, useState } from "react";
import { cursor as CFG } from "@/lib/animation-config";

/**
 * Custom animated cursor — a small centre dot plus a larger, delayed follower
 * ring. DESKTOP FINE-POINTER ONLY. It reads interactive intent from data
 * attributes on hovered elements and scales / labels accordingly:
 *
 *   data-cursor="view|open|play|drag"   → shows a label inside the follower
 *   data-cursor-scale="large"            → extra-large follower
 *   [href], button, [role=button]        → auto hover scale (no attr needed)
 *
 * Guarantees:
 *   - pointer-events: none (never blocks clicks).
 *   - Transform-only animation (GPU), single rAF loop.
 *   - Hides the native cursor only while active; restores it when the pointer
 *     leaves the window or the component is disabled.
 *   - Disabled on touch / coarse pointers and under prefers-reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => setEnabled(fine.matches && !reduce.matches);
    evaluate();
    fine.addEventListener("change", evaluate);
    reduce.addEventListener("change", evaluate);
    return () => {
      fine.removeEventListener("change", evaluate);
      reduce.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Hide native cursor site-wide while the custom cursor is active.
    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    // Follower (lagging) position.
    let fx = mx;
    let fy = my;
    // Dot (snappier) position.
    let dx = mx;
    let dy = my;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        // Jump both to the pointer on first appearance (no long slide in).
        fx = dx = mx;
        fy = dy = my;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      // Resolve interactive intent from whatever is under the pointer.
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor], [data-cursor-scale], a[href], button, [role='button'], input, textarea, select, label"
      ) as HTMLElement | null;

      let text = "";
      let want = 1;
      if (el) {
        const kind = el.getAttribute("data-cursor");
        const scaleAttr = el.getAttribute("data-cursor-scale");
        if (kind) text = kind;
        if (scaleAttr === "large" || kind) want = CFG.largeScale;
        else want = CFG.hoverScale;
        // On text inputs, shrink to a subtle caret hint instead of growing.
        const tag = el.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea" || tag === "select") {
          want = 0.6;
          text = "";
        }
      }
      targetScale = want;
      if (label.textContent !== text) {
        label.textContent = text;
        label.style.opacity = text ? "1" : "0";
      }
      ring.dataset.state = text || (el ? "hover" : "");
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onDown = () => (ring.style.transform += " scale(0.82)");

    const tick = () => {
      dx += (mx - dx) * CFG.dotLerp;
      dy += (my - dy) * CFG.dotLerp;
      fx += (mx - fx) * CFG.followerLerp;
      fy += (my - fy) * CFG.followerLerp;
      scale += (targetScale - scale) * 0.18;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${fx}px, ${fy}px, 0) translate(-50%, -50%) scale(${scale})`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none fixed left-0 top-0 rounded-full opacity-0"
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 grid place-items-center rounded-full opacity-0"
      >
        <span
          ref={labelRef}
          className="cursor-label select-none text-[0.5rem] font-semibold uppercase tracking-[0.18em] opacity-0"
        />
      </div>
    </div>
  );
}

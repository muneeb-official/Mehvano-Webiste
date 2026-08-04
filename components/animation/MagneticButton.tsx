"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { magnetic as CFG } from "@/lib/animation-config";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** Pull strength override (fraction of cursor→centre delta). */
  strength?: number;
  /** data-cursor hint forwarded to the wrapper for the custom cursor. */
  cursor?: "view" | "open" | "play" | "drag";
};

/**
 * Wraps a single high-value CTA so it drifts toward the cursor when the pointer
 * is near, and springs back on leave. The immediate child (button/link) moves
 * at full strength; a nested [data-magnetic-child] moves less for a depth cue.
 *
 * Fine-pointer + no-reduced-motion only — otherwise it renders a plain,
 * fully-clickable wrapper with zero listeners. Transform-only; never blocks
 * clicks (the real button stays the event target).
 */
export function MagneticButton({
  children,
  className,
  strength = CFG.strength,
  cursor,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const child = el.querySelector<HTMLElement>("[data-magnetic-child]");
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const render = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (child) {
        child.style.transform = `translate3d(${cx * (CFG.childStrength / strength)}px, ${
          cy * (CFG.childStrength / strength)
        }px, 0)`;
      }
      const settled = Math.abs(tx - cx) < 0.05 && Math.abs(ty - cy) < 0.05;
      raf = settled ? 0 : requestAnimationFrame(render);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - (rect.left + rect.width / 2);
      const my = e.clientY - (rect.top + rect.height / 2);
      tx = mx * strength;
      ty = my * strength;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    // Listen on a padded region so the pull begins slightly before hover.
    const onWindowMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const near =
        e.clientX >= rect.left - CFG.padding &&
        e.clientX <= rect.right + CFG.padding &&
        e.clientY >= rect.top - CFG.padding &&
        e.clientY <= rect.bottom + CFG.padding;
      if (near) onMove(e);
      else if (tx !== 0 || ty !== 0) onLeave();
    };

    window.addEventListener("pointermove", onWindowMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onWindowMove);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
      if (child) child.style.transform = "";
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={className}
      data-cursor={cursor}
      style={{ display: "inline-flex", willChange: "transform" }}
    >
      {children}
    </span>
  );
}

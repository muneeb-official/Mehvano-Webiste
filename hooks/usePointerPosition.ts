"use client";

import { useEffect, useRef, type RefObject } from "react";

export type Pointer = { x: number; y: number };

/**
 * Shared pointer tracker. Instead of returning state (which would re-render on
 * every mouse move), it writes the latest pointer position into a ref and calls
 * an optional per-frame callback via a single rAF loop. Consumers read the ref
 * inside their own animation loop and drive transforms — zero React re-renders.
 * Only attaches on fine-pointer devices.
 */
export function usePointerPosition(onMove?: (p: Pointer) => void): RefObject<Pointer> {
  const pos = useRef<Pointer>({ x: 0, y: 0 });
  const cb = useRef(onMove);
  cb.current = onMove;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const handle = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      cb.current?.(pos.current);
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  return pos;
}

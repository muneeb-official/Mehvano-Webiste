"use client";

import { useEffect, useRef, type DependencyList, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Runs a GSAP setup callback inside a scoped gsap.context() and cleans it up on
 * unmount / dep change. All tweens, timelines and ScrollTriggers created inside
 * the callback are reverted automatically — the canonical React + GSAP cleanup
 * pattern. Selector strings in the callback are scoped to `scope.current`.
 *
 *   const scope = useRef<HTMLDivElement>(null);
 *   useGSAPContext(scope, () => { gsap.from(".item", { y: 40 }); }, []);
 *   return <div ref={scope}>…</div>;
 */
export function useGSAPContext<T extends HTMLElement>(
  scope: RefObject<T | null>,
  setup: (ctx: gsap.Context) => void,
  deps: DependencyList = []
): void {
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context((self) => setupRef.current(self), scope.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

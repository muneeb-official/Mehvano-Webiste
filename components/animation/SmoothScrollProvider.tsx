"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisConfig } from "@/lib/animation-config";

/**
 * ONE global smooth-scroll provider, mounted once in the root layout. It:
 *   - Drives Lenis from GSAP's ticker (single rAF loop for the whole site).
 *   - Keeps ScrollTrigger in sync via lenis.on("scroll", ScrollTrigger.update).
 *   - Preserves anchor links (#id) by routing them through lenis.scrollTo.
 *   - Preserves keyboard scrolling (Lenis handles arrows/space/PgUp/Dn/Home/End).
 *   - Disables itself entirely under prefers-reduced-motion (native scroll).
 *   - Exposes the Lenis instance via context for anything that needs scrollTo.
 *
 * It must NOT interfere with nested scroll containers, modals, or forms — any
 * element (or ancestor) marked data-lenis-prevent keeps native scrolling.
 */

const LenisContext = createContext<Lenis | null>(null);

/** Access the shared Lenis instance (null under reduced motion / before mount). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion: no Lenis, keep native (already smooth via CSS,
    // which the reduce media query neutralises to `auto`).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      // Still let ScrollTrigger work off native scroll.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: lenisConfig.duration,
      easing: lenisConfig.easing,
      wheelMultiplier: lenisConfig.wheelMultiplier,
      touchMultiplier: lenisConfig.touchMultiplier,
      // Let native touch scrolling handle mobile; Lenis smooths wheel/keys.
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger updated on every Lenis scroll frame.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker — one shared rAF loop, no competing loops.
    const raf = (time: number) => lenis.raf(time * 1000); // ticker time is seconds
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links: intercept in-page #hash clicks and route through Lenis so
    // they animate smoothly and land accurately.
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
      // Keep the URL hash + focus semantics for accessibility.
      history.pushState(null, "", href);
    };
    document.addEventListener("click", onAnchorClick);

    // Recompute ScrollTrigger positions once fonts/images settle.
    ScrollTrigger.refresh();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}

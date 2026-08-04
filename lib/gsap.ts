/**
 * Central GSAP + ScrollTrigger registration. Import gsap / ScrollTrigger from
 * HERE (not directly from "gsap") so the plugin is registered exactly once and
 * we never double-register. Client-only — never import this into a Server
 * Component module graph without a "use client" boundary.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Guard against double registration across HMR / multiple imports.
if (typeof window !== "undefined" && !(gsap.core as unknown as { _mehvanoRegistered?: boolean })._mehvanoRegistered) {
  gsap.registerPlugin(ScrollTrigger);
  (gsap.core as unknown as { _mehvanoRegistered?: boolean })._mehvanoRegistered = true;
}

export { gsap, ScrollTrigger };

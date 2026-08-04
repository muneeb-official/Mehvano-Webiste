/**
 * ============================================================================
 *  MEHVANO — MOTION SYSTEM CONFIG (single source of truth for animation)
 * ============================================================================
 *  Central durations, easings, distances and breakpoints so every animated
 *  component speaks the same motion language. Keep this list SMALL — a limited
 *  vocabulary is what makes the whole site feel cohesive rather than noisy.
 *
 *  Motion categories (map to these, don't invent new ones per component):
 *    1. Primary reveal      — headings, hero, section entrances
 *    2. Secondary reveal    — supporting copy, cards, list items
 *    3. Hover interaction   — magnetic buttons, tilt, cursor states
 *    4. Scroll-linked       — parallax, pins, scrubbed transforms
 *    5. Page transition     — route fade/mask
 * ============================================================================
 */

/** GSAP easing strings. `reveal` mirrors the site's --ease-out-soft token. */
export const easings = {
  reveal: "power3.out",
  smooth: "power2.out",
  exit: "power2.inOut",
  elastic: "back.out(1.4)",
} as const;

/** Seconds. Keep durations consistent across categories. */
export const durations = {
  fast: 0.25,
  normal: 0.6,
  slow: 1,
} as const;

/** Shared reveal defaults (Suggested defaults from the brief). */
export const reveal = {
  duration: 0.8,
  ease: easings.reveal,
  y: 40,
  opacity: 0,
  stagger: 0.08,
  /** Start the animation shortly before the element reaches viewport centre. */
  start: "top 82%",
} as const;

/**
 * Responsive breakpoints (px). Mirrors Tailwind so JS motion logic and CSS
 * layout stay in lockstep. Used by GSAP matchMedia and useMediaQuery.
 */
export const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
  /** Devices with a precise pointer — gate the custom cursor / magnetics here. */
  finePointer: "(hover: hover) and (pointer: fine)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

/** Lenis smooth-scroll tuning. duration in seconds; lerp is the smoothing factor. */
export const lenisConfig = {
  duration: 1.1,
  /** easeOutExpo — a long, luxurious settle that matches the reveal easing. */
  easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  wheelMultiplier: 1,
  touchMultiplier: 1.6,
} as const;

/** Custom-cursor interpolation + sizing. */
export const cursor = {
  /** Follower lerp (0–1): lower = more lag/trail. */
  followerLerp: 0.16,
  /** Dot lerp — snappier than the follower. */
  dotLerp: 0.35,
  dotSize: 6,
  followerSize: 40,
  /** Scale multipliers for data-cursor / data-cursor-scale states. */
  hoverScale: 2.4,
  largeScale: 3.4,
} as const;

/** Magnetic-button pull. strength = fraction of the cursor→centre delta. */
export const magnetic = {
  strength: 0.35,
  /** Inner text/icon moves less than the shell for a subtle depth cue. */
  childStrength: 0.15,
  /** Radius (px) beyond the button bounds where the pull begins. */
  padding: 28,
} as const;

/** Parallax default travel (px) mapped across the element's scroll window. */
export const parallax = {
  distance: 60,
} as const;

"use client";

import { breakpoints } from "@/lib/animation-config";
import { useMediaQuery } from "./useMediaQuery";

/**
 * True when the user asks for reduced motion. The single gate every animated
 * component checks before enabling elaborate motion. SSR-safe (false until
 * mounted). Note: this is intentionally conservative — components should treat
 * `true` as "simple fades / no animation only".
 */
export function useReducedMotion(): boolean {
  return useMediaQuery(breakpoints.reduced);
}

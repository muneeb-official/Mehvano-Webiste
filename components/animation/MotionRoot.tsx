"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";

/**
 * Single client boundary for the site-wide motion layer, mounted once in the
 * root layout. Keeps the root layout a Server Component (children stay
 * server-rendered — only this wrapper is client). Bundles the global smooth
 * scroll, the custom cursor, and the scroll-progress bar. Each sub-component
 * self-disables on touch / reduced-motion, so this is safe everywhere.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <CustomCursor />
      {children}
    </SmoothScrollProvider>
  );
}

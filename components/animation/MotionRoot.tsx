"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { ScrollProgress } from "./ScrollProgress";

/**
 * Single client boundary for the site-wide motion layer, mounted once in the
 * root layout. Keeps the root layout a Server Component (children stay
 * server-rendered — only this wrapper is client). Bundles the global smooth
 * scroll and the scroll-progress bar.
 *
 * NOTE: the custom dot+ring cursor was removed in favour of the native OS
 * pointer (which adapts to light/dark surroundings on the OS level and is more
 * familiar/usable). The CustomCursor component + its CSS remain in the codebase
 * (unused) so it can be restored by re-adding <CustomCursor /> here.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      {children}
    </SmoothScrollProvider>
  );
}

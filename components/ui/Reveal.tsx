"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "fade";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  style?: CSSProperties;
};

/**
 * Lightweight static wrapper. The site's scroll motion is now handled at the
 * section level by <ScrollSlide> (see Section.tsx), which slides whole sections
 * in from alternating sides as you scroll. Reveal stays a plain wrapper so its
 * existing call sites keep working without double-animating inside a sliding
 * section. The animation-related props (variant/delay/once/amount) are accepted
 * for compatibility but intentionally have no effect.
 */
export function Reveal({ children, as: Tag = "div", className, style }: RevealProps) {
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
}

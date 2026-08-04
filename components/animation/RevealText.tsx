"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap } from "@/lib/gsap";
import { reveal, easings } from "@/lib/animation-config";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  /** word = split by word (default); line = mask-reveal whole lines. */
  split?: "word" | "line";
  delay?: number;
  /** Play on mount instead of on scroll (for above-the-fold hero copy). */
  immediate?: boolean;
};

/**
 * Accessible text reveal. The ORIGINAL string is always present as the readable
 * accessible label (aria-label on the wrapper) and the split spans are
 * aria-hidden, so screen readers get one clean phrase, never fragments. With JS
 * off / reduced motion, the visible text renders plainly.
 *
 * Words rise out of a clipping mask (overflow-hidden per line/word) — no
 * character-by-character animation, no layout thrash.
 */
export function RevealText({
  children,
  as: Tag = "span",
  className,
  split = "word",
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parts = el.querySelectorAll<HTMLElement>("[data-rt-inner]");
    if (!parts.length) return;

    const ctx = gsap.context(() => {
      gsap.set(parts, { yPercent: 115 });
      gsap.to(parts, {
        yPercent: 0,
        duration: reveal.duration,
        ease: easings.reveal,
        delay,
        stagger: split === "word" ? 0.045 : 0.12,
        ...(immediate
          ? {}
          : {
              scrollTrigger: { trigger: el, start: reveal.start },
            }),
      });
    }, el);

    return () => ctx.revert();
  }, [children, split, delay, immediate]);

  // Split into words (default) or lines-as-tokens. Each token sits in an
  // overflow-hidden mask; the inner span is what translates up.
  const tokens =
    split === "line" ? children.split("\n") : children.split(/(\s+)/);

  return (
    <Tag ref={ref} className={cn("reveal-text", className)} aria-label={children}>
      {tokens.map((tok, i) =>
        /^\s+$/.test(tok) ? (
          <span key={i} aria-hidden> </span>
        ) : (
          <span key={i} aria-hidden className="reveal-text-mask">
            <span data-rt-inner className="reveal-text-inner">
              {tok}
            </span>
          </span>
        )
      )}
    </Tag>
  );
}

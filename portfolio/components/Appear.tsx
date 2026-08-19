"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/** useLayoutEffect on the client, useEffect on the server (avoids SSR warning). */
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type AppearVariant = "up" | "fade" | "scale" | "tilt-left" | "tilt-right";

type AppearProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: AppearVariant;
  /** ms delay before the enter transition (staggering). */
  delay?: number;
  /** IntersectionObserver threshold. */
  amount?: number;
  /** Re-hide + replay when scrolled out of view. */
  once?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Scroll-reveal wrapper for the portfolio page.
 *
 * The [data-appear] attribute (which the CSS in globals.css uses to hide the
 * element) is added imperatively AFTER mount and BEFORE paint — so the content
 * ships fully visible with JS disabled and under prefers-reduced-motion, and
 * only becomes animated when the script is actually running. No flash-of-hidden
 * for content that starts on screen: it paints hidden for one frame, then the
 * observer reveals it, which reads as a clean entrance.
 */
export function Appear({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  amount = 0.2,
  once = true,
  className,
  style,
}: AppearProps) {
  const ref = useRef<HTMLElement>(null);

  useIso(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // "up" is the default rule ([data-appear]); named variants add their own.
    el.setAttribute("data-appear", variant === "up" ? "" : variant);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-in");
          }
        });
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [variant, amount, once]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ["--appear-delay"]: `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

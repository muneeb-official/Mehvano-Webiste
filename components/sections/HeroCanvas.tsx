"use client";

import { useEffect, useRef } from "react";

/**
 * Animated hero background — a levitating chrome sphere bobs gently up and
 * down, dead-centre, while concentric ripple rings expand outward from beneath
 * it like a droplet suspended over cool silver water. The whole scene
 * parallaxes softly toward the cursor. Matches the RESADEX-style reference.
 *
 * Performance guardrails (must never hurt load or jank the page):
 *   - Pure inline SVG + CSS transforms → ~0 KB added beyond this file, no libs.
 *     Client-only work in useEffect, so it never blocks SSR / first paint; the
 *     .hero-silver gradient underneath is the instant, finished fallback.
 *   - Sphere bob, ripple expansion, and highlight shimmer are all CSS
 *     @keyframes on transform/opacity (GPU-composited, no JS per frame). Mouse
 *     parallax is the ONLY JS loop, throttled to one rAF per pointer move and
 *     skipped while the hero is off-screen.
 *   - Fully static under prefers-reduced-motion (CSS disables the keyframes; JS
 *     parallax listener is never attached).
 */

/** Ripple rings expand + fade on staggered loops, seeding a continuous wave. */
const RIPPLES = [0, 1, 2, 3, 4, 5, 6, 7];

// Scene is 1200×800; the sphere + ripples are centred here.
const CX = 600;
const CY = 380;

export function HeroCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const layer = parallaxRef.current;
    const sphere = sphereRef.current;
    if (!root || !layer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Parallax is a pointer nicety — skip it on touch/coarse pointers.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let visible = true;
    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible && rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        } else if (visible && !rafId) {
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.02 }
    );
    io.observe(root);

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      // -1..1 offset from centre.
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (visible && !rafId) rafId = requestAnimationFrame(tick);
    };

    const tick = () => {
      // Ease toward the target so motion feels smooth, not twitchy.
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      // Ripple field (far) shifts ~18px; the sphere (near) moves more for depth.
      layer.style.transform = `translate3d(${curX * 18}px, ${curY * 18}px, 0)`;
      if (sphere) {
        sphere.style.transform = `translate3d(${curX * 38}px, ${curY * 38}px, 0)`;
      }
      const settled = Math.abs(targetX - curX) < 0.001 && Math.abs(targetY - curY) < 0.001;
      rafId = settled ? 0 : requestAnimationFrame(tick);
    };

    root.addEventListener("pointermove", onMove);
    return () => {
      root.removeEventListener("pointermove", onMove);
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Far layer: the concentric ripple field (smaller parallax). */}
      <div ref={parallaxRef} className="absolute inset-[-8%] will-change-transform">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Ripple crest — a bright light band riding a darker trough edge,
               reading as a raised concentric wave on the silver surface. */}
            <radialGradient id="hr-crest" cx="50%" cy="50%" r="50%">
              <stop offset="80%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="88%" stopColor="#6f809b" stopOpacity="0.3" />
              <stop offset="93%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="98%" stopColor="#5a6a85" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5a6a85" stopOpacity="0" />
            </radialGradient>
            {/* Cool ambient wash centred on the sphere */}
            <radialGradient id="hr-wash" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#eef3f9" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#c6d2e2" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#c6d2e2" stopOpacity="0" />
            </radialGradient>
            <filter id="hr-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>

          {/* Ambient bloom under the sphere */}
          <ellipse cx={CX} cy={CY} rx="700" ry="480" fill="url(#hr-wash)" />

          {/* Concentric ripple rings, each expanding + fading on its own loop.
             Filled with the crest gradient so the ring reads as a soft wave. */}
          <g className="hr-rings" transform={`translate(${CX} ${CY})`} filter="url(#hr-soft)">
            {RIPPLES.map((i) => (
              <ellipse
                key={i}
                className={`hr-ring hr-ring-${i}`}
                cx="0"
                cy="0"
                rx="150"
                ry="108"
                fill="url(#hr-crest)"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Near layer: the levitating chrome sphere (larger parallax + bob). */}
      <div ref={sphereRef} className="absolute inset-[-8%] will-change-transform">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Chrome body: bright top-left rim, dark core, silver base bounce */}
            <radialGradient id="hs-body" cx="40%" cy="30%" r="72%">
              <stop offset="0%" stopColor="#fbfdff" />
              <stop offset="20%" stopColor="#cfd8e5" />
              <stop offset="42%" stopColor="#5f6c80" />
              <stop offset="66%" stopColor="#1c222c" />
              <stop offset="100%" stopColor="#080b10" />
            </radialGradient>
            {/* Cool bounce light from the "water" onto the underside */}
            <radialGradient id="hs-bounce" cx="50%" cy="90%" r="55%">
              <stop offset="0%" stopColor="#cdd9ec" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#9fb0cb" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#9fb0cb" stopOpacity="0" />
            </radialGradient>
            {/* Specular highlight */}
            <radialGradient id="hs-spec" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            {/* Soft contact shadow / glow blur */}
            <filter id="hs-shadow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
          </defs>

          {/* Scale the whole sphere group to ~50% around its centre for a
             smaller, more professional presence. The inner .hs-bob group still
             owns the up/down bob animation. */}
          <g transform={`translate(${CX} ${CY}) scale(0.5) translate(${-CX} ${-CY})`}>
          <g className="hs-bob" style={{ transformOrigin: `${CX}px ${CY}px` }}>
            {/* Drop shadow beneath the sphere (its own subtle counter-bob) */}
            <ellipse
              className="hs-shadow"
              cx={CX}
              cy={CY + 118}
              rx="120"
              ry="30"
              fill="#3b475b"
              opacity="0.4"
              filter="url(#hs-shadow)"
            />

            {/* Sphere body */}
            <circle cx={CX} cy={CY} r="120" fill="url(#hs-body)" />
            {/* Underside bounce light */}
            <circle cx={CX} cy={CY} r="120" fill="url(#hs-bounce)" />
            {/* Rim light on the shaded lower-right edge */}
            <circle
              cx={CX}
              cy={CY}
              r="120"
              fill="none"
              stroke="#e6edf6"
              strokeOpacity="0.35"
              strokeWidth="1.5"
            />
            {/* Primary specular highlight, upper-left */}
            <ellipse cx={CX - 42} cy={CY - 52} rx="42" ry="32" fill="url(#hs-spec)" />
            {/* Tiny sharp glint */}
            <circle cx={CX - 56} cy={CY - 62} r="7" fill="#ffffff" opacity="0.95" />
          </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

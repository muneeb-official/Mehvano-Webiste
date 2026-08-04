"use client";

import { useEffect, useRef } from "react";

/**
 * Antigravity-style hero backdrop — a radiating burst of small colored DOTS on
 * a light, faintly-grained surface. Dots fan outward from the centre in a
 * circular field ("liftoff"), recreated with Mehvano's teal + slate palette.
 *
 * Cursor interaction: while the pointer moves over the hero, nearby dots are
 * pulled toward it (attraction falls off with distance), then ease back to
 * their home position when the pointer leaves. Every dot also drifts gently in
 * and out on its own loop. Canvas 2D — cheap, no libraries.
 *
 * Scope: this component is only rendered inside <Hero>, so the effect is
 * confined to the hero section — it never appears elsewhere on the page.
 *
 * Performance / a11y guardrails:
 *   - Capped DPR, downscaled internal resolution, fewer dots on small screens.
 *   - Pauses when scrolled out of view (IntersectionObserver).
 *   - Under prefers-reduced-motion the field renders ONCE as a static burst
 *     (no rAF loop, no cursor pull) — matching the reference screenshot.
 *   - The .hero-light CSS gradient underneath is the no-JS fallback.
 */

type Dot = {
  hx: number; // home x (px, canvas space) — where the dot wants to rest
  hy: number; // home y
  x: number; // current x
  y: number; // current y
  baseDist: number; // fractional distance from centre (for fade + drift scale)
  angle: number; // radial direction (for the breathing drift)
  r: number; // radius px
  color: string;
  phase: number; // drift phase offset
  speed: number; // drift speed
  amp: number; // drift amplitude (px)
};

// Mehvano teal + slate + soft gray. Weighted so gray/slate dominate and teal
// provides the accent pops (like the ref's mostly-blue with red/purple accents).
const PALETTE = [
  "#94a3b8", "#94a3b8", "#94a3b8", // slate gray (common)
  "#5a6a85", "#5a6a85",            // deep slate
  "#35e0d0", "#0e8f86",            // teal accents
  "#6f809b",                        // steel
  "#cbd5e1",                        // light gray
];

/** Cursor pull radius (px) and strength (0–1 fraction of the gap closed). */
const PULL_RADIUS = 190;
const PULL_STRENGTH = 0.9;

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root || typeof window === "undefined") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5);

    const COUNT = small ? 150 : 320;

    // Deterministic pseudo-random (no Math.random — reproducible + sandbox-safe).
    let seed = 1337;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    // Dot templates are generated with fractional positions; homes are resolved
    // to pixels in layout() so the burst re-centres on resize.
    const seeds = Array.from({ length: COUNT }, () => {
      const angle = rnd() * Math.PI * 2;
      const dist = 0.16 + Math.pow(rnd(), 0.7) * 0.84; // clear inner hole
      return {
        angle,
        dist,
        r: 2 + rnd() * 3,
        color: PALETTE[Math.floor(rnd() * PALETTE.length)],
        phase: rnd() * Math.PI * 2,
        speed: 0.0004 + rnd() * 0.0006,
        amp: 2 + rnd() * 5,
      };
    });

    const dots: Dot[] = [];
    let w = 0;
    let h = 0;

    const layout = () => {
      const rect = root.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = w / 2;
      const cy = h * 0.5;
      const maxR = Math.min(w, h) * 0.62;
      dots.length = 0;
      for (const s of seeds) {
        const hx = cx + Math.cos(s.angle) * s.dist * maxR;
        const hy = cy + Math.sin(s.angle) * s.dist * maxR;
        dots.push({
          hx,
          hy,
          x: hx,
          y: hy,
          baseDist: s.dist,
          angle: s.angle,
          r: s.r,
          color: s.color,
          phase: s.phase,
          speed: s.speed,
          amp: s.amp,
        });
      }
    };
    layout();

    // Pointer position in canvas px; -1 means "no pointer" (pull disabled).
    let mx = -1;
    let my = -1;
    const onMove = (ev: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      mx = ev.clientX - rect.left;
      my = ev.clientY - rect.top;
    };
    const clearPointer = () => {
      mx = -1;
      my = -1;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const hasPointer = mx >= 0 && my >= 0;
      for (const d of dots) {
        // Breathing drift outward/inward along the dot's own radius.
        const drift = reduce ? 0 : Math.sin(time * d.speed + d.phase) * d.amp;
        let tx = d.hx + Math.cos(d.angle) * drift;
        let ty = d.hy + Math.sin(d.angle) * drift;

        // Cursor attraction: pull the target toward the pointer, strongest when
        // the dot is close, fading to nothing beyond PULL_RADIUS.
        if (hasPointer && !reduce) {
          const dx = mx - tx;
          const dy = my - ty;
          const dsq = dx * dx + dy * dy;
          if (dsq < PULL_RADIUS * PULL_RADIUS) {
            const distp = Math.sqrt(dsq) || 1;
            const falloff = 1 - distp / PULL_RADIUS; // 1 at cursor → 0 at edge
            const pull = falloff * PULL_STRENGTH;
            tx += dx * pull;
            ty += dy * pull;
          }
        }

        // Ease current position toward the target (spring-back when pointer
        // leaves, smooth follow when it's near).
        d.x += (tx - d.x) * (reduce ? 1 : 0.16);
        d.y += (ty - d.y) * (reduce ? 1 : 0.16);

        // Fade dots near the centre so the headline area stays clean.
        const alpha = Math.min(1, (d.baseDist - 0.1) * 2.2) * 0.9;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let rafId = 0;
    let t0 = 0;
    let visible = true;
    const frame = (t: number) => {
      if (!t0) t0 = t;
      draw(t - t0);
      rafId = visible ? requestAnimationFrame(frame) : 0;
    };

    if (reduce) {
      draw(0); // static burst — no loop, no cursor pull
      const onResize = () => {
        layout();
        draw(0);
      };
      window.addEventListener("resize", onResize, { passive: true });
      return () => window.removeEventListener("resize", onResize);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !rafId) rafId = requestAnimationFrame(frame);
      },
      { threshold: 0.01 }
    );
    io.observe(root);

    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      root.addEventListener("pointerleave", clearPointer);
      window.addEventListener("blur", clearPointer);
    }
    const onResize = () => layout();
    window.addEventListener("resize", onResize, { passive: true });
    rafId = requestAnimationFrame(frame);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      if (fine) {
        window.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", clearPointer);
        window.removeEventListener("blur", clearPointer);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

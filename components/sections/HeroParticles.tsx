"use client";

import { useEffect, useRef } from "react";

/**
 * Antigravity-style hero backdrop — a field of small colored DOTS spread across
 * the FULL width of the hero on a light, faintly-grained surface. Dots scatter
 * edge-to-edge (denser toward the sides, thinned in the centre so the headline
 * stays clean), recreated with Mehvano's teal + slate palette.
 *
 * Cursor interaction: dots are pulled toward the pointer with lightweight spring
 * physics (per-dot velocity + damping), so they follow the cursor smoothly and
 * dynamically — chasing quick movements, easing back home when the pointer
 * leaves. Every dot also drifts gently on its own loop. Canvas 2D — no libs.
 *
 * Scope: rendered ONLY inside <Hero>, so the effect is confined to the hero.
 *
 * Performance / a11y guardrails:
 *   - Capped DPR, downscaled internal resolution, fewer dots on small screens.
 *   - Pauses when scrolled out of view (IntersectionObserver).
 *   - Under prefers-reduced-motion the field renders ONCE as a static scatter
 *     (no rAF loop, no cursor pull).
 *   - The .hero-light CSS gradient underneath is the no-JS fallback.
 */

type Dot = {
  hx: number; // home x (px, canvas space) — where the dot wants to rest
  hy: number; // home y
  x: number; // current x
  y: number; // current y
  vx: number; // velocity x (spring physics)
  vy: number; // velocity y
  fade: number; // 0–1 opacity multiplier (centre-thinned)
  r: number; // radius px
  color: string;
  phase: number; // drift phase offset
  speed: number; // drift speed
  ampX: number; // drift amplitude x (px)
  ampY: number; // drift amplitude y (px)
};

// Mehvano teal + slate + soft gray. Weighted so gray/slate dominate and teal
// provides the accent pops.
const PALETTE = [
  "#94a3b8", "#94a3b8", "#94a3b8", // slate gray (common)
  "#5a6a85", "#5a6a85",            // deep slate
  "#35e0d0", "#0e8f86",            // teal accents
  "#6f809b",                        // steel
  "#cbd5e1",                        // light gray
];

/**
 * Cursor attraction — a GLOBAL, gentle lean: EVERY dot drifts a little toward
 * the pointer (not just those in a radius). Near dots lean a touch more than
 * far ones, but all move. Displacement is capped so nothing flies across the
 * screen, and the spring is soft so it glides rather than snaps.
 */
const LEAN_FRACTION = 0.16; // base fraction of the dot→pointer gap to lean by
const LEAN_NEAR_BONUS = 0.14; // extra lean for dots close to the pointer
const LEAN_FALLOFF = 520; // px over which the "near bonus" fades to zero
const MAX_LEAN = 60; // px cap on how far a dot can be pulled from home
const HOME_SPRING = 0.045; // spring accel back toward the (leaned) target
const DAMPING = 0.86; // velocity retention per frame (0–1) — higher = smoother

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

    // More dots to cover the full width comfortably.
    const COUNT = small ? 190 : 460;

    // Deterministic pseudo-random (no Math.random — reproducible + sandbox-safe).
    let seed = 1337;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    // Fractional home positions across the FULL canvas (0–1 in x and y), plus a
    // per-dot drift + style. Resolved to px in layout() so it re-fits on resize.
    const seeds = Array.from({ length: COUNT }, () => ({
      fx: rnd(),
      fy: rnd(),
      r: 1.6 + rnd() * 3.2,
      color: PALETTE[Math.floor(rnd() * PALETTE.length)],
      phase: rnd() * Math.PI * 2,
      speed: 0.0004 + rnd() * 0.0007,
      ampX: 3 + rnd() * 7,
      ampY: 3 + rnd() * 7,
    }));

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
      const cy = h / 2;
      // Radius at which centre-thinning stops (dots fully visible past this).
      const clearR = Math.min(w, h) * 0.34;
      dots.length = 0;
      for (const s of seeds) {
        // Spread edge-to-edge with a small inset so nothing clips at the border.
        const hx = 12 + s.fx * (w - 24);
        const hy = 12 + s.fy * (h - 24);
        // Thin out dots near the centre so the headline area stays clean, but
        // never fully empty — a soft fade rather than a hard hole.
        const dcx = hx - cx;
        const dcy = hy - cy;
        const dc = Math.sqrt(dcx * dcx + dcy * dcy);
        const fade = Math.min(1, 0.12 + (dc / clearR) * 0.9);
        dots.push({
          hx,
          hy,
          x: hx,
          y: hy,
          vx: 0,
          vy: 0,
          fade,
          r: s.r,
          color: s.color,
          phase: s.phase,
          speed: s.speed,
          ampX: s.ampX,
          ampY: s.ampY,
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
        // Home position with a gentle breathing drift (independent x/y wander).
        const driftX = reduce ? 0 : Math.sin(time * d.speed + d.phase) * d.ampX;
        const driftY = reduce ? 0 : Math.cos(time * d.speed * 0.9 + d.phase) * d.ampY;
        const homeX = d.hx + driftX;
        const homeY = d.hy + driftY;

        if (reduce) {
          d.x = homeX;
          d.y = homeY;
        } else {
          // Global lean: EVERY dot targets a point a little way from its home
          // toward the pointer. Near dots lean a touch more (near-bonus), but
          // all dots move. The lean is capped so nothing shoots across screen.
          let targetX = homeX;
          let targetY = homeY;
          if (hasPointer) {
            const dx = mx - homeX;
            const dy = my - homeY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const nearBonus = Math.max(0, 1 - dist / LEAN_FALLOFF) * LEAN_NEAR_BONUS;
            let lean = (LEAN_FRACTION + nearBonus) * dist;
            if (lean > MAX_LEAN) lean = MAX_LEAN; // cap displacement
            targetX = homeX + (dx / dist) * lean;
            targetY = homeY + (dy / dist) * lean;
          }

          // Soft spring toward the (leaned) target + damping → glides, no snap.
          d.vx += (targetX - d.x) * HOME_SPRING;
          d.vy += (targetY - d.y) * HOME_SPRING;
          d.vx *= DAMPING;
          d.vy *= DAMPING;
          d.x += d.vx;
          d.y += d.vy;
        }

        ctx.globalAlpha = d.fade * 0.9;
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
      draw(0); // static scatter — no loop, no cursor pull
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

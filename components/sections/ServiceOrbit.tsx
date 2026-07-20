import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Animated brand visual for the home "About" block — the seven service icons
 * slowly orbit a central Mehvano hub on two counter-rotating rings, with a
 * quiet "4.9 rating" proof badge folded in. Pure SVG/CSS (no photos, no libs);
 * motion is GPU-composited and disabled under prefers-reduced-motion (see
 * globals.css .orbit-* rules). Sits on the cool silver-slate theme.
 */
const OUTER: IconName[] = ["heart-pulse", "cpu", "home", "code"];
const INNER: IconName[] = ["briefcase", "users", "megaphone"];

function OrbitNode({ icon, index, count }: { icon: IconName; index: number; count: number }) {
  // Even angular spacing around the ring; each node counter-spins so the glyph
  // stays upright while the ring rotates (handled by the CSS pairing).
  const angle = (360 / count) * index;
  return (
    <span
      className="orbit-node absolute left-1/2 top-1/2"
      style={{ ["--orbit-angle" as string]: `${angle}deg` }}
    >
      <span className="orbit-node-inner grid h-12 w-12 place-items-center rounded-2xl border border-line bg-paper text-fg-muted shadow-card sm:h-14 sm:w-14">
        <Icon name={icon} className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
    </span>
  );
}

export function ServiceOrbit() {
  return (
    <div className="glow-warm relative isolate grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-[2rem] border border-line">
      {/* Soft concentric guide rings */}
      <svg
        className="absolute inset-0 h-full w-full text-gold/25"
        viewBox="0 0 400 300"
        fill="none"
        aria-hidden
      >
        <ellipse cx="200" cy="150" rx="150" ry="118" stroke="currentColor" strokeDasharray="3 7" />
        <ellipse cx="200" cy="150" rx="92" ry="70" stroke="currentColor" strokeDasharray="3 7" />
      </svg>

      {/* Outer ring (slow, clockwise) — --orbit-r sets the node push-out radius */}
      <div
        className="orbit-ring orbit-ring-outer absolute h-[78%] w-[78%]"
        style={{ ["--orbit-r" as string]: "clamp(112px, 34vw, 150px)" }}
      >
        {OUTER.map((icon, i) => (
          <OrbitNode key={icon} icon={icon} index={i} count={OUTER.length} />
        ))}
      </div>

      {/* Inner ring (slower, counter-clockwise) */}
      <div
        className="orbit-ring orbit-ring-inner absolute h-[48%] w-[48%]"
        style={{ ["--orbit-r" as string]: "clamp(68px, 21vw, 92px)" }}
      >
        {INNER.map((icon, i) => (
          <OrbitNode key={icon} icon={icon} index={i} count={INNER.length} />
        ))}
      </div>

      {/* Central hub */}
      <div className="relative z-10 grid h-20 w-20 place-items-center rounded-full bg-ink text-fg-inverse shadow-lift sm:h-24 sm:w-24">
        <span className="font-display text-3xl font-extrabold sm:text-4xl">M</span>
        <span className="orbit-pulse absolute inset-0 rounded-full ring-2 ring-gold/50" aria-hidden />
      </div>

      {/* Proof badge — folds the "4.9 rating" in without a photo */}
      <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-line bg-paper/95 p-3 pr-5 shadow-card backdrop-blur">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-bright text-ink">
          <Icon name="star" className="h-5 w-5" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-display text-lg font-bold text-fg">4.9 rating</span>
          <span className="text-xs text-fg-subtle">Across every service</span>
        </span>
      </div>
    </div>
  );
}

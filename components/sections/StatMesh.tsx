import { IMPACT_STATS } from "@/lib/constants";

/**
 * Animated brand visual for the home "Why choose us" block — a LIGHT teal-tinted
 * panel with a drifting aurora-mesh background (reusing the hero blob keyframes)
 * and the three impact stats laid over it. Matches the light, teal-accented hero.
 * Pure SVG/CSS, no photos; motion is GPU-composited and off under reduced motion.
 */
export function StatMesh() {
  return (
    <div className="glow-teal relative isolate aspect-[5/4] w-full overflow-hidden rounded-[2rem] text-ink">
      {/* Drifting mesh blobs (shares the hero .hb-blob keyframes) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 500 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="sm-a" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#35e0d0" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#35e0d0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sm-b" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0e8f86" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0e8f86" stopOpacity="0" />
          </radialGradient>
          <filter id="sm-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="46" />
          </filter>
        </defs>
        <g filter="url(#sm-blur)">
          <circle className="hb-blob hb-blob-1" cx="140" cy="120" r="130" fill="url(#sm-a)" />
          <circle className="hb-blob hb-blob-2" cx="380" cy="280" r="150" fill="url(#sm-b)" />
          <circle className="hb-blob hb-blob-3" cx="330" cy="90" r="110" fill="url(#sm-a)" />
        </g>
      </svg>

      {/* Stats laid over the mesh */}
      <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-deep/25 bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          By the numbers
        </span>

        <dl className="flex flex-col gap-6">
          {IMPACT_STATS.map((s) => (
            <div key={s.label} className="border-t border-line pt-4">
              <dt className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-fg-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

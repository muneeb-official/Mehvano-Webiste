import { IMPACT_STATS } from "@/lib/constants";

/**
 * Animated brand visual for the home "Why choose us" block — a cool dark panel
 * with a drifting aurora-mesh background (reusing the hero blob keyframes) and
 * the three impact stats laid over it. Pure SVG/CSS, no photos; motion is
 * GPU-composited and off under prefers-reduced-motion.
 */
export function StatMesh() {
  return (
    <div className="glow-warm-dark relative isolate aspect-[5/4] w-full overflow-hidden rounded-[2rem] text-white">
      {/* Drifting mesh blobs (shares the hero .hb-blob keyframes) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 500 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="sm-a" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#aebccf" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#aebccf" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sm-b" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5a6a85" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#5a6a85" stopOpacity="0" />
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
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" aria-hidden />
          By the numbers
        </span>

        <dl className="flex flex-col gap-6">
          {IMPACT_STATS.map((s) => (
            <div key={s.label} className="border-t border-white/15 pt-4">
              <dt className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-white/70">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

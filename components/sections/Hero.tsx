import { HeroCanvas } from "@/components/sections/HeroCanvas";

/**
 * Homepage hero — full-screen "droplet" scene (RESADEX-style). A levitating
 * chrome sphere bobs over concentric ripples on a cool silver surface
 * (HeroCanvas); the .hero-silver gradient underneath is the instant, finished
 * fallback. The brand wordmark spans the lower third and a "scroll down" cue
 * anchors the very bottom. Minimal by design — no blurb, CTAs, or eyebrow.
 */
export function Hero() {
  return (
    <section className="hero-silver relative isolate flex min-h-screen w-full flex-col overflow-hidden">
      {/* Animated background (client-only work; static gradient shows first) */}
      <HeroCanvas />

      {/* Bottom content: giant wordmark + scroll cue */}
      <div className="relative mt-auto flex w-full flex-col items-center gap-10 px-6 pb-10">
        <h1 className="w-full text-center font-display font-semibold leading-none text-slate-900/85">
          <span className="block text-[13vw] tracking-[0.28em] sm:text-[12vw] lg:text-[10.5vw]">
            <span className="pl-[0.28em]">MEHVANO</span>
          </span>
        </h1>

        <a
          href="#services"
          className="flex flex-col items-center gap-2 text-slate-700/70 transition-colors hover:text-slate-900"
        >
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.42em]">
            Scroll down
          </span>
        </a>
      </div>
    </section>
  );
}

import { HeroParticles } from "@/components/sections/HeroParticles";
import { HeroContent } from "@/components/sections/HeroContent";

/**
 * Homepage hero — light, immersive "liftoff" scene (Antigravity-inspired) built
 * with Mehvano's own content and a teal accent. A faintly-grained light surface
 * (.hero-light) behind a radiating burst of teal/slate/gray dashes fanning out
 * from centre (HeroParticles); the CSS gradient is the instant, finished
 * fallback (no-JS / reduced motion → static burst).
 *
 * HeroContent (client) adds the centered eyebrow → headline → subheadline →
 * CTAs → scroll-cue choreography and the gentle scroll-exit. This server shell
 * renders a complete, readable hero on its own.
 */
export function Hero() {
  return (
    <section className="hero-light relative isolate flex min-h-screen w-full flex-col overflow-hidden">
      {/* Radiating dash-particle burst (client-only; static gradient shows first) */}
      <HeroParticles />

      {/* Centered foreground content (client motion) */}
      <HeroContent />
    </section>
  );
}

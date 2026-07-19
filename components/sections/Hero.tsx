import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICE_AREA } from "@/lib/constants";

/**
 * Homepage hero — full-bleed dark scene with headline, CTAs, and a stat chip.
 * The agent's portfolio is reachable from the floating agent button
 * (components/layout/PortfolioFab.tsx), which floats on every page.
 */
export function Hero() {
  return (
    <section className="relative isolate flex w-full items-center overflow-hidden rounded-b-[2rem] bg-ink sm:rounded-b-[3rem]">
      <Image
        src="/hero/Hero.jpg"
        alt="Modern home at dusk in Maryland"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="hero-veil absolute inset-0 -z-10" />

      <Container size="wide" className="pb-16 pt-28 sm:pt-32 lg:py-24">
        <div className="max-w-3xl">
          <Reveal variant="up" delay={0}>
            <Eyebrow tone="inverse">
              {SERVICE_AREA.counties.join(" · ")}, {SERVICE_AREA.state}
            </Eyebrow>
          </Reveal>

          <Reveal
            as="h1"
            variant="up"
            delay={90}
            className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]"
          >
            Find your next
            <br />
            home in <span className="text-gradient-gold">Maryland</span>
          </Reveal>

          <Reveal
            as="p"
            variant="up"
            delay={180}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Buy with confidence, sell for more, and get straight answers about
            Severn, Pasadena, and Ellicott City — from a local REALTOR® who
            knows these neighborhoods block by block.
          </Reveal>

          <Reveal variant="up" delay={270} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/home-value" variant="light" size="lg" icon="arrow-up-right" iconCircle>
              What&rsquo;s My Home Worth?
            </Button>
            <Button href="/neighborhoods" variant="glass" size="lg">
              Explore Neighborhoods
            </Button>
          </Reveal>

          {/* Stat chip */}
          <Reveal variant="up" delay={360} className="glass mt-10 inline-flex items-center gap-4 rounded-2xl p-3 pr-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gold-bright text-ink">
              <Icon name="map-pin" className="h-6 w-6" />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-2xl font-extrabold text-white">4 ZIP codes</span>
              <span className="text-sm text-white/70">Hyperlocal expertise you can search</span>
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

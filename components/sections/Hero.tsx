import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { AGENT, SERVICE_AREA } from "@/lib/constants";

/**
 * Homepage hero — full-bleed dark scene with a frosted "featured guide" card
 * and a stat chip, echoing the reference design.
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
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left — headline + CTAs + stat */}
          <div className="max-w-xl">
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
              className="mt-6 max-w-md text-base leading-relaxed text-white/75 sm:text-lg"
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

            {/* Stat chip (mirrors the "12.8K+" card) */}
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

          {/* Right — featured guide card */}
          <Reveal variant="right" delay={240} className="relative lg:justify-self-end">
            <div className="glass w-full max-w-md rounded-3xl p-3 shadow-glass">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/s-3.jpg"
                  alt="Ellicott City neighborhood"
                  width={520}
                  height={380}
                  sizes="(max-width: 1024px) 90vw, 30vw"
                  className="h-56 w-full object-cover sm:h-64"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  Featured guide
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={AGENT.name} size={40} />
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">{AGENT.name}</p>
                    <p className="text-xs text-white/65">{AGENT.role} · MD #{AGENT.licenseNumber}</p>
                  </div>
                </div>

                <h2 className="mt-4 font-display text-xl font-bold uppercase tracking-tight text-white">
                  Ellicott City, decoded
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  21042 vs. 21043 — a buyer&rsquo;s guide to the two sides of town.
                </p>

                <Link
                  href="/neighborhoods/ellicott-city-21042-vs-21043"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  Read the guide
                  <Icon name="arrow-up-right" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

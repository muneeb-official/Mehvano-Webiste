import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollSlide } from "@/components/ui/ScrollSlide";
import { AGENT } from "@/lib/constants";

type CTABandProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Horizontal scroll-slide. Off when it's a panel in the homepage deck. */
  slide?: boolean;
};

/** Reusable dark call-to-action band. */
export function CTABand({
  eyebrow = "Let's talk",
  title = "Ready to make your move?",
  text = "Whether you're buying, selling, or just exploring, get honest local guidance with zero pressure. I respond fast — usually within minutes.",
  primary = { label: "Book a Call", href: "/contact" },
  secondary = { label: "What's My Home Worth?", href: "/home-value" },
  slide = true,
}: CTABandProps) {
  const inner = (
    <>
      <div className="max-w-2xl">
        <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-white/75">{text}</p>
        <p className="mt-3 text-sm text-white/55">
          {AGENT.name}, {AGENT.role} · {AGENT.phone}
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
        <Button href={primary.href} variant="light" size="lg" icon="arrow-up-right" iconCircle>
          {primary.label}
        </Button>
        <Button href={secondary.href} variant="glass" size="lg">
          {secondary.label}
        </Button>
      </div>
    </>
  );

  const layout = "flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between";

  return (
    <section className="relative overflow-hidden bg-ink py-16 sm:py-20">
      <Image src="/images/s-2.jpg" alt="" fill sizes="100vw" className="object-cover opacity-20" aria-hidden />
      <div className="hero-veil absolute inset-0" aria-hidden />
      <Container className="relative">
        {slide ? (
          <ScrollSlide as="div" className={layout}>
            {inner}
          </ScrollSlide>
        ) : (
          <div className={layout}>{inner}</div>
        )}
      </Container>
    </section>
  );
}

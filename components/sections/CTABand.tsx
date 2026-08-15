import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollSlide } from "@/components/ui/ScrollSlide";
import { MagneticButton } from "@/components/animation";
import { COMPANY } from "@/lib/constants";

type CTABandProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Small line under the copy; defaults to the company name + email. */
  footnote?: string;
  /** Horizontal scroll-slide. Off when it's a panel in the homepage deck. */
  slide?: boolean;
};

/** Reusable dark call-to-action band. */
export function CTABand({
  eyebrow = "Let's talk",
  title = "Ready to get started?",
  text = "One conversation is all it takes. Tell us what you need — care, technology, or business support — and we'll point you to the right team. We respond fast, usually within minutes.",
  primary = { label: "Talk to Us", href: "/contact" },
  secondary = { label: "Explore Services", href: "/services" },
  footnote = `${COMPANY.legalName} · ${COMPANY.email}`,
  slide = true,
}: CTABandProps) {
  const inner = (
    <>
      <div className="max-w-2xl">
        <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-[2.75rem]">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-white/75">{text}</p>
        {footnote ? <p className="mt-3 text-sm text-white/55">{footnote}</p> : null}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
        <MagneticButton cursor="open">
          <Button href={primary.href} variant="light" size="lg" icon="arrow-up-right" iconCircle>
            {primary.label}
          </Button>
        </MagneticButton>
        <Button href={secondary.href} variant="glass" size="lg">
          {secondary.label}
        </Button>
      </div>
    </>
  );

  const layout = "flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between";

  return (
    <section className="section-dark relative overflow-hidden py-16 sm:py-20">
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

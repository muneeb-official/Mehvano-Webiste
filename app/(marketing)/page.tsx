import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { ServiceOrbit } from "@/components/sections/ServiceOrbit";
import { StatMesh } from "@/components/sections/StatMesh";
import { StatTrio } from "@/components/sections/StatTrio";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Testimonials, type Testimonial } from "@/components/sections/Testimonials";
import { CTABand } from "@/components/sections/CTABand";
// NOTE: the "Insights & updates" blog section is temporarily hidden — all
// current articles are real-estate buyer/seller guides. Restore the
// InsightsGrid + getAllArticles imports and the section below when the
// real-estate division (and general blog content) returns.

// NOTE: placeholder testimonials — replace with real, verifiable reviews before launch.
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We needed nursing coverage fast and a new website in the same month. Mehvano handled both — one call, two teams, zero stress.",
    name: "Sarah L.",
    detail: "Clinic administrator · Anne Arundel County, MD",
  },
  {
    quote: "Their AI chatbot now answers 70% of our customer questions automatically. It paid for itself in the first quarter.",
    name: "Daniel & Priya",
    detail: "Small business owners · Ellicott City, MD",
  },
  {
    quote: "They helped us form our LLC, set up the books, and get our first hires in the door. A genuine one-stop shop.",
    name: "Marcus T.",
    detail: "Founder · Pasadena, MD",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About — Driven by Innovation. Powered by People. + stat trio */}
      <Section tone="paper" spacing="md" slide={false}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal variant="left" className="flex flex-col gap-5">
            <Eyebrow>About us</Eyebrow>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
              Driven by service.
              <br />
              Powered by people.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
              Mehvano LLC brings healthcare, technology, and business services
              together under one trusted, Maryland-registered roof. With licensed
              specialists in every field, we help families and businesses adapt,
              scale, and thrive — without juggling a dozen vendors.
            </p>
            <div>
              <Button href="/about" variant="outline">Learn more</Button>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120} className="relative">
            <ServiceOrbit />
          </Reveal>
        </div>

        {/* Stat trio */}
        <div className="mt-16 border-t border-line pt-12">
          <StatTrio />
        </div>
      </Section>

      {/* Services — Solutions Built to Accelerate Your Growth */}
      <Section id="services" tone="cream" spacing="md" slide={false}>
        <Reveal variant="up" className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Services"
            title="Solutions built to accelerate your growth"
            description="From bedside care to code, from your books to your next hire — expert teams that work the way you need them to."
            className="max-w-2xl"
          />
          <Button href="/services" variant="primary">See all services</Button>
        </Reveal>
        <div className="mt-12">
          <ServiceGrid columns={3} />
        </div>
      </Section>

      {/* Why choose us — accordion + image */}
      <Section tone="paper" spacing="md" slide={false}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal variant="left" className="order-2 lg:order-1">
            <StatMesh />
          </Reveal>
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <SectionHeading
              eyebrow="Why choose us"
              title="Built on trust, driven by results"
              className="max-w-xl"
            />
            <WhyChoose />
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="paper" spacing="md" slide={false}>
        <Reveal variant="up">
          <SectionHeading
            eyebrow="Testimonials"
            title="Reviews that speak volumes"
            description="Hear how our services have transformed operations, improved outcomes, and driven growth."
          />
        </Reveal>
        <div className="mt-12">
          <Testimonials items={TESTIMONIALS} />
        </div>
      </Section>

      {/* Insights & Updates — temporarily hidden (real-estate blog content). */}

      {/* CTA showcase band */}
      <Container size="wide" className="pb-16 pt-4 sm:pb-24">
        <div className="overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
          <CTABand
            slide={false}
            eyebrow="Work with us"
            title="Ready to take your business or family to the next level?"
            text="With licensed specialists across healthcare, AI, technology, and business services, we help you adapt, scale, and thrive. Tell us what you need — we'll point you to the right team."
            primary={{ label: "Get a Free Consultation", href: "/contact" }}
            secondary={{ label: "Explore Services", href: "/services" }}
          />
        </div>
      </Container>
    </>
  );
}

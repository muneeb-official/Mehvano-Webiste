import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ZipGrid } from "@/components/sections/ZipGrid";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { Steps, type Step } from "@/components/sections/Steps";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { Testimonials, type Testimonial } from "@/components/sections/Testimonials";
import { CTABand } from "@/components/sections/CTABand";
import { getAllArticles } from "@/lib/cms";

const FEATURES: Feature[] = [
  {
    icon: "map-pin",
    title: "Genuinely hyperlocal",
    text: "Not a generic 'two-county agent.' I know Severn, Pasadena, and Ellicott City block by block — schools, commutes, and what actually sells.",
  },
  {
    icon: "clock",
    title: "Fast, human responses",
    text: "You hear back in minutes, not days. Speed matters in a low-inventory market, and you'll always talk to me — not a call center.",
  },
  {
    icon: "chart",
    title: "Priced with real data",
    text: "Every valuation is built from current, comparable sales and reviewed by a human — no automated guesswork that misses your home's story.",
  },
  {
    icon: "shield",
    title: "Clear from day one",
    text: "A written plan and value proposition up front, so you always know the strategy, the timeline, and exactly how I'm compensated.",
  },
];

const STEPS: Step[] = [
  { title: "Talk it through", text: "A no-pressure call to understand your goals, timeline, and budget — buying, selling, or both." },
  { title: "Build the plan", text: "A clear, written strategy: pricing, prep, search criteria, and how we'll move faster than the market." },
  { title: "Make the move", text: "Tour, offer, negotiate, and manage inspections and closing — I handle the details and keep you informed." },
  { title: "Stay in touch", text: "After closing you get ongoing market check-ins and a home-value watch, so your biggest asset is never a mystery." },
];

// NOTE: placeholder testimonials — replace with real, verifiable Google reviews (report §9.3).
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "She knew Severn inside out and got us into the right neighborhood for our Fort Meade commute. Every question got a same-day answer.",
    name: "The R. Family",
    detail: "Buyers · Severn, MD",
  },
  {
    quote: "We listed in Ellicott City and had strong offers within the first week. The pricing strategy was spot on.",
    name: "Daniel & Priya",
    detail: "Sellers · Ellicott City, MD",
  },
  {
    quote: "First-time buyers and honestly nervous — she made the whole process feel simple and never once pushed us.",
    name: "Marcus T.",
    detail: "First-time buyer · Pasadena, MD",
  },
];

export default function HomePage() {
  const featured = getAllArticles().slice(0, 3);

  return (
    <>
      <Hero />
      <TrustBar />

      {/* Buyers / Sellers split */}
      <Section tone="cream" spacing="md">
        <SectionHeading
          eyebrow="Two ways I help"
          title="Whether you're buying or selling, you get a real plan"
          description="Post-2024, the agents who win are the ones who can explain their value clearly. Here's exactly what you get on each side of the deal."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Card tone="paper" padding="lg" className="flex flex-col gap-5">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-fg-inverse">
              <Icon name="home" className="h-6 w-6" />
            </span>
            <h3 className="font-display text-2xl font-bold text-fg">Buying a home</h3>
            <ul className="flex flex-col gap-3 text-sm text-fg-muted">
              {[
                "New listings matched to your search the moment they hit the market",
                "In-person or video tours — ideal if you're relocating on a timeline",
                "Offers priced to the comps and structured to compete, not overpay",
                "Inspection, appraisal, and closing handled end to end",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/guides/first-time-home-buyer-severn-md" variant="outline" className="mt-auto self-start">
              First-time buyer guide
            </Button>
          </Card>

          <Card tone="ink" padding="lg" className="flex flex-col gap-5">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-bright text-ink">
              <Icon name="chart" className="h-6 w-6" />
            </span>
            <h3 className="font-display text-2xl font-bold text-white">Selling a home</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/75">
              {[
                "A real valuation from current comps — reviewed by a human, not a bot",
                "A pricing and prep plan that captures the crucial first-two-weeks surge",
                "Modern marketing that gets your home found by real, ready buyers",
                "Monthly value updates long before you're ready to list",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-bright" />
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/home-value" variant="light" className="mt-auto self-start" icon="arrow-up-right">
              What&rsquo;s my home worth?
            </Button>
          </Card>
        </div>
      </Section>

      {/* Seller funnel — zip grid */}
      <Section tone="paper" spacing="md">
        <SectionHeading
          eyebrow="Free home valuation"
          title="What's your home worth in 2026?"
          description="Get a real, human-reviewed estimate for your neighborhood — not a generic online guess. Pick your area to start."
        />
        <div className="mt-12">
          <ZipGrid />
        </div>
        <p className="mt-6 text-sm text-fg-muted">
          Not one of these zips?{" "}
          <Link href="/home-value" className="font-medium text-gold-deep underline underline-offset-4">
            Request a valuation anywhere in Anne Arundel or Howard County →
          </Link>
        </p>
      </Section>

      {/* Why Mehvano */}
      <Section tone="cream" spacing="md">
        <SectionHeading
          eyebrow="Why work with me"
          title="Local expertise, modern marketing, zero pressure"
          description="The middle of the market is crowded. Here's what makes working together different."
        />
        <div className="mt-12">
          <FeatureGrid items={FEATURES} columns={4} />
        </div>
      </Section>

      {/* Process */}
      <Section tone="paper" spacing="md">
        <SectionHeading
          eyebrow="How it works"
          title="A simple path from hello to keys"
          description="No jargon, no surprises — just a clear process that keeps you informed at every step."
        />
        <div className="mt-12">
          <Steps steps={STEPS} />
        </div>
      </Section>

      {/* Featured content */}
      <Section tone="cream" spacing="md">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Local intel"
            title="Answers to what buyers & sellers actually ask"
            description="Real, hyperlocal guides and market reads for the neighborhoods I serve."
            className="max-w-2xl"
          />
          <Button href="/guides" variant="outline">
            Browse all guides
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="paper" spacing="md">
        <SectionHeading
          eyebrow="Client stories"
          title="What it's like to work together"
          align="center"
        />
        <div className="mt-12">
          <Testimonials items={TESTIMONIALS} />
        </div>
      </Section>

      <CTABand />
    </>
  );
}

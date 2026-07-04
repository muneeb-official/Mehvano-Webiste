import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ZipGrid } from "@/components/sections/ZipGrid";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { FaqList } from "@/components/sections/ArticleBody";
import { HomeValueForm } from "@/components/forms/HomeValueForm";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "What's My Home Worth? Free Maryland Home Valuation",
  description:
    "Get a free, human-reviewed home valuation for Severn, Pasadena, Ellicott City, and anywhere in Anne Arundel or Howard County — not an automated online guess.",
  path: "/home-value",
});

const WHY: Feature[] = [
  {
    icon: "chart",
    title: "Based on real comps",
    text: "I use current, comparable sales in your immediate area — not a national algorithm that can't see your street.",
  },
  {
    icon: "home",
    title: "Reviewed by a human",
    text: "Your home's condition, updates, and quirks matter. I adjust for the things an automated estimate misses entirely.",
  },
  {
    icon: "clock",
    title: "Fast and pressure-free",
    text: "You'll get your report quickly, with zero obligation. Planning 6–18 months out? Even better — that's the right time to start.",
  },
];

const FAQS = [
  {
    question: "How accurate are online home value estimates?",
    answer:
      "Automated estimates (like the ones on big portals) are a rough starting point, but they can be off significantly because they can't see your home's condition, updates, or micro-location. A human-reviewed valuation based on recent comparable sales is far more reliable.",
  },
  {
    question: "Does requesting a valuation obligate me to sell or list with you?",
    answer:
      "Not at all. There's zero obligation. Many homeowners request a valuation simply to understand their equity or plan ahead — often 6 to 18 months before they'd ever list.",
  },
  {
    question: "How quickly will I get my home value?",
    answer:
      "I prepare each valuation personally, so you'll typically hear back within a business day — often much sooner.",
  },
];

export default function HomeValuePage() {
  return (
    <>
      <PageHeader
        eyebrow="Free home valuation"
        title="What's my home worth?"
        description="Skip the automated guesswork. Get a real, human-reviewed estimate built from current sales in your neighborhood — with no obligation to list."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Home Value", href: "/home-value" },
        ]}
      />

      {/* Form + reasons */}
      <Section tone="paper" spacing="md">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Start here"
              title="Request your valuation"
              description="Tell me a little about your home and I'll get to work on a real estimate."
            />
            <div className="mt-6 flex flex-col gap-2 text-sm text-fg-muted">
              {["No cost, no obligation", "Human-reviewed, not a bot estimate", "Your info is never sold"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-gold-deep" />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-cream p-6 sm:p-8">
            <HomeValueForm />
          </div>
        </div>
      </Section>

      {/* Per-zip */}
      <Section tone="cream" spacing="md">
        <SectionHeading
          eyebrow="By neighborhood"
          title="Popular areas I serve"
          description="Get a valuation tuned to your specific market."
        />
        <div className="mt-10">
          <ZipGrid />
        </div>
      </Section>

      {/* Why */}
      <Section tone="paper" spacing="md">
        <SectionHeading eyebrow="Why it's better" title="A real number, not a wild guess" />
        <div className="mt-10">
          <FeatureGrid items={WHY} columns={3} />
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="cream" spacing="md" container="prose">
        <SectionHeading eyebrow="Good to know" title="Home valuation FAQs" align="center" className="mb-10" />
        <FaqList items={FAQS} />
      </Section>

      <Container className="pb-4">
        <JsonLd
          data={[
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Home Value", href: "/home-value" },
            ]),
            faqSchema(FAQS),
          ]}
        />
      </Container>
    </>
  );
}

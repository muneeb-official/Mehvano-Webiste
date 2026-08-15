import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { StatTrio } from "@/components/sections/StatTrio";
import { Steps, type Step } from "@/components/sections/Steps";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Our Services — Medical, AI, Real Estate, IT & Business Support",
  description:
    "Explore everything Mehvano LLC offers businesses and families across the United States: medical & nursing care, AI services, IT & software, business consulting, staffing, and digital marketing.",
  path: "/services",
});

const STEPS: Step[] = [
  { title: "Reach out", text: "Call, email, or send a message describing what you need — big or small." },
  { title: "Get matched", text: "We connect you with the right specialist team and a clear, transparent plan." },
  { title: "Work together", text: "Your team executes and keeps you updated at every step." },
  { title: "Grow with us", text: "Add services as your needs change — you already know and trust the team." },
];

export default function ServicesPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="One company. Every service you need."
        description={`Mehvano LLC brings ${SERVICES.length} specialist teams together under one trusted roof, serving clients across the United States — so you get expert help without managing a dozen vendors.`}
        crumbs={crumbs}
      />

      <Section tone="paper" spacing="md">
        <ServiceGrid columns={3} />
        <div className="mt-16 border-t border-line pt-12">
          <StatTrio />
        </div>
      </Section>

      <Section tone="cream" spacing="md">
        <SectionHeading
          eyebrow="How it works"
          title="Getting started is simple"
          description="No matter which service you need, the path to working with us is the same."
        />
        <div className="mt-12">
          <Steps steps={STEPS} />
        </div>
      </Section>

      <CTABand
        eyebrow="Not sure where to start?"
        title="Tell us what you need — we'll point you the right way"
        text="One conversation is all it takes. We'll help you figure out which of our teams (or which combination) fits your situation best."
      />

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${SITE.brand} Services`,
            itemListElement: SERVICES.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: `${SITE.url}/services/${s.slug}`,
            })),
          },
        ]}
      />
    </>
  );
}

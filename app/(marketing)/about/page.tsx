import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { AGENT, COMPANY, SITE } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: `About ${SITE.brand} — One trusted partner across the United States`,
  description: COMPANY.description,
  path: "/about",
});

const VALUES: Feature[] = [
  {
    icon: "users",
    title: "People first",
    text: "Whether it's a patient, a homebuyer, or a small business, we treat every client like the only one — with honesty and zero pressure.",
  },
  {
    icon: "shield",
    title: "Accountable",
    text: "Licensed, insured, and background-checked professionals in every field, backed by a registered US LLC that stands behind its work.",
  },
  {
    icon: "layers",
    title: "Genuinely full-service",
    text: "We'd rather be your one trusted call than your fifth vendor. As your needs grow, so does what we can do for you.",
  },
  {
    icon: "sparkles",
    title: "Modern & practical",
    text: "We use today's tools — including AI — to deliver better results faster, without the enterprise price tag or the buzzwords.",
  },
];

export default function AboutPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={SITE.brand}
        description={COMPANY.description}
        crumbs={crumbs}
      />

      {/* Story + snapshot card */}
      <Section tone="paper" spacing="md">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <Reveal variant="left" className="flex flex-col gap-5">
            <SectionHeading title="One team, built to handle whatever you need" as="h2" />
            <p className="text-lg leading-relaxed text-fg-muted">
              Mehvano started with a simple problem: getting good help usually
              means hiring, vetting, and managing a different vendor for every need.
              We built a single company that brings trusted specialists together —
              healthcare, technology, real estate, and business services — so our
              clients get expert results from people they already know and trust.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-fg-muted">
              Today, Mehvano LLC serves families and businesses across the United States.
              Every service is delivered by licensed, insured professionals, and
              every client gets one point of contact who owns the outcome. No
              runaround, no finger-pointing — just help that works.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button href="/services" icon="arrow-up-right">Explore our services</Button>
              <Button href="/contact" variant="outline">Talk to us</Button>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120} className="h-full">
            <Card tone="cream" padding="lg" className="flex h-full flex-col gap-5">
              <p className="font-display text-xl font-bold text-fg">Company snapshot</p>
              <dl className="flex flex-col gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Icon name="building" className="mt-0.5 h-4 w-4 text-gold-deep" />
                  <div>
                    <dt className="text-fg-subtle">Entity</dt>
                    <dd className="font-medium text-fg">{COMPANY.legalName}, a registered US LLC</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="map-pin" className="mt-0.5 h-4 w-4 text-gold-deep" />
                  <div>
                    <dt className="text-fg-subtle">Serving</dt>
                    <dd className="font-medium text-fg">Clients nationwide across the United States</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="home" className="mt-0.5 h-4 w-4 text-gold-deep" />
                  <div>
                    <dt className="text-fg-subtle">Real estate division</dt>
                    <dd className="font-medium text-fg">
                      {AGENT.name}, {AGENT.role} — MD #{AGENT.licenseNumber}
                    </dd>
                  </div>
                </div>
              </dl>
              <div className="mt-auto flex w-full flex-col gap-2 border-t border-line pt-5">
                <Button href={COMPANY.emailHref} className="w-full" icon="mail">{COMPANY.email}</Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section tone="cream" spacing="md">
        <SectionHeading
          eyebrow="What we stand for"
          title="The values behind every service"
          description="Different work, same principles — this is what stays constant no matter which of our teams you work with."
        />
        <div className="mt-10">
          <FeatureGrid items={VALUES} columns={4} />
        </div>
      </Section>

      {/* Services recap */}
      <Section tone="paper" spacing="md">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What we do"
            title="Everything under one roof"
            className="max-w-2xl"
          />
          <Button href="/services" variant="outline">See all services</Button>
        </div>
        <div className="mt-12">
          <ServiceGrid columns={3} showBullets={false} />
        </div>
      </Section>

      <CTABand
        eyebrow="Say hello"
        title="Let's find the right team for you"
        text="A phone call, an email, or a quick message — however you like to start, we're easy to reach and quick to respond."
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}

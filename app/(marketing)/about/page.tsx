import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { AGENT, SERVICE_AREA, ZIPS } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: `About ${AGENT.name} — ${AGENT.role} in Anne Arundel & Howard County`,
  description: AGENT.bio,
  path: "/about",
});

const NICHE: Feature[] = [
  {
    icon: "shield",
    title: "Fort Meade & relocation",
    text: "Moving on a military or government timeline? I coordinate video tours and house-hunting trips around PCS and clearance schedules.",
  },
  {
    icon: "home",
    title: "First-time buyers",
    text: "Nervous first-timers are my favorite clients. I explain every step in plain English and never rush a decision.",
  },
  {
    icon: "chart",
    title: "Move-up sellers",
    text: "Ready for more space in Ellicott City or on the water in Pasadena? I handle the sell-and-buy dance so it isn't stressful.",
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
        eyebrow="Meet your agent"
        title={AGENT.name}
        description={`${AGENT.role} serving ${SERVICE_AREA.counties.join(" & ")}, Maryland.`}
        crumbs={crumbs}
      />

      {/* Bio + card */}
      <Section tone="paper" spacing="md">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div className="flex flex-col gap-5">
            <SectionHeading title="Local expertise you can actually search for" as="h2" />
            <p className="text-lg leading-relaxed text-fg-muted">{AGENT.bio}</p>
            <p className="text-[1.05rem] leading-relaxed text-fg-muted">
              I built this site to be genuinely useful — real answers about Severn, Pasadena, and
              Ellicott City that you (and even AI assistants) can find and trust. No fluff, no
              pressure, just honest guidance and modern marketing that gets results.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {ZIPS.map((z) => (
                <Badge key={z.slug} tone="outline">
                  {z.city} {z.zip}
                </Badge>
              ))}
              {SERVICE_AREA.extendedCities.map((c) => (
                <Badge key={c} tone="outline">
                  {c}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button href="/contact" icon="arrow-up-right">Book a call</Button>
              <Button href="/home-value" variant="outline">What&rsquo;s my home worth?</Button>
            </div>
          </div>

          <Card tone="cream" padding="lg" className="flex flex-col items-center gap-5 text-center">
            <Avatar name={AGENT.name} size={120} src={undefined} />
            <div>
              <p className="font-display text-xl font-bold text-fg">{AGENT.name}</p>
              <p className="text-sm text-fg-muted">{AGENT.role}</p>
            </div>
            <div className="w-full border-t border-line pt-5 text-left text-sm">
              <dl className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <Icon name="shield" className="mt-0.5 h-4 w-4 text-gold-deep" />
                  <div>
                    <dt className="text-fg-subtle">License</dt>
                    <dd className="font-medium text-fg">MD #{AGENT.licenseNumber}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="home" className="mt-0.5 h-4 w-4 text-gold-deep" />
                  <div>
                    <dt className="text-fg-subtle">Brokerage</dt>
                    <dd className="font-medium text-fg">{AGENT.brokerage}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="map-pin" className="mt-0.5 h-4 w-4 text-gold-deep" />
                  <div>
                    <dt className="text-fg-subtle">Service area</dt>
                    <dd className="font-medium text-fg">{SERVICE_AREA.counties.join(" & ")}, MD</dd>
                  </div>
                </div>
              </dl>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Button href={AGENT.phoneHref} className="w-full" icon="phone">{AGENT.phone}</Button>
              <Button href={AGENT.emailHref} variant="outline" className="w-full" icon="mail">Email me</Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* Niche */}
      <Section tone="cream" spacing="md">
        <SectionHeading
          eyebrow="Who I help most"
          title="Specialties that make me the obvious choice"
          description="A generalist is easy to forget. Here's where I go deep."
        />
        <div className="mt-10">
          <FeatureGrid items={NICHE} columns={3} />
        </div>
      </Section>

      <CTABand
        eyebrow="Say hello"
        title="Let's find your place in Maryland"
        text="Coffee, a phone call, or a quick text — however you like to start, I'm easy to reach and quick to respond."
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}

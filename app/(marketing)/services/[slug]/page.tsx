import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SERVICE_AREA, SITE } from "@/lib/constants";
import { SERVICES, getServiceBySlug, serviceHref } from "@/lib/services";
import { stagger } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // Real Estate routes into the existing funnel, but we still generate its
  // detail page as a landing/overview for that service.
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title} — ${SITE.brand}`,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.name, href: `/services/${service.slug}` },
  ];

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  // Real Estate's primary CTA links into the funnel; others go to contact.
  const primaryHref = service.externalHref ?? "/contact";

  return (
    <>
      {/* Header — dark, with the service image */}
      <section className="relative isolate overflow-hidden bg-ink pt-28 sm:pt-32">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-25"
          aria-hidden
        />
        <div className="hero-veil absolute inset-0 -z-10" aria-hidden />
        <Container className="pb-16 sm:pb-20">
          <Breadcrumbs items={crumbs} tone="inverse" className="mb-6" />
          <Reveal variant="up" className="max-w-3xl">
            <span className="mb-5 inline-grid h-14 w-14 place-items-center rounded-2xl bg-gold-bright text-ink">
              <Icon name={service.icon} className="h-7 w-7" />
            </span>
            <Eyebrow tone="inverse">Mehvano Services</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {service.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primaryHref} variant="light" size="lg" icon="arrow-up-right" iconCircle>
                {service.ctaLabel ?? "Get started"}
              </Button>
              <Button href="/services" variant="glass" size="lg">
                All services
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Overview + offerings */}
      <Section tone="paper" spacing="md">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <Reveal variant="left">
            <SectionHeading eyebrow="Overview" title={`What our ${service.name} team does`} as="h2" />
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">{service.overview}</p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {service.offerings.map((o, i) => (
              <Reveal key={o.title} variant="up" delay={stagger(i)} className="h-full">
                <Card tone="cream" className="flex h-full flex-col gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-fg-inverse">
                    <Icon name="check" className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-fg">{o.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{o.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Why us */}
      <Section tone="cream" spacing="md">
        <SectionHeading
          eyebrow="Why choose us"
          title={`Why clients trust our ${service.name} team`}
        />
        <div className="mt-12">
          <FeatureGrid
            items={service.highlights.map((h) => ({ icon: service.icon, title: h.title, text: h.text }))}
            columns={3}
          />
        </div>
      </Section>

      {/* Explore other services */}
      <Section tone="paper" spacing="md">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="More from Mehvano"
            title="Explore our other services"
            className="max-w-2xl"
          />
          <Button href="/services" variant="outline">
            See all services
          </Button>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s, i) => (
            <Reveal key={s.slug} variant="up" delay={stagger(i)} className="h-full">
              <Card href={serviceHref(s)} className="group flex h-full flex-col gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-sand text-gold-deep transition-colors group-hover:bg-ink group-hover:text-fg-inverse">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg font-bold text-fg">{s.name}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{s.tagline}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-fg transition-colors group-hover:text-gold-deep">
                  Learn more
                  <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand
        eyebrow="Ready when you are"
        title={`Let's talk about ${service.name}`}
        text={service.summary}
        primary={{ label: service.ctaLabel ?? "Get started", href: primaryHref }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.summary,
            serviceType: service.name,
            url: `${SITE.url}/services/${service.slug}`,
            areaServed: { "@type": "Country", name: SERVICE_AREA.country },
            provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
          },
        ]}
      />
    </>
  );
}

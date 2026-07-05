import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { HomeValueForm } from "@/components/forms/HomeValueForm";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { ZIPS, getZipBySlug } from "@/lib/constants";
import { getArticlesForZip } from "@/lib/cms";

type Params = { params: Promise<{ zip: string }> };

export function generateStaticParams() {
  return ZIPS.map((z) => ({ zip: z.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { zip: slug } = await params;
  const zip = getZipBySlug(slug);
  if (!zip) return {};
  return buildMetadata({
    title: `What's My Home Worth in ${zip.city} ${zip.zip}?`,
    description: `Free, human-reviewed home valuation for ${zip.city}, MD ${zip.zip} (${zip.county}). Get a real estimate based on current comparable sales — no automated guesswork.`,
    path: `/home-value/${zip.slug}`,
  });
}

export default async function ZipHomeValuePage({ params }: Params) {
  const { zip: slug } = await params;
  const zip = getZipBySlug(slug);
  if (!zip) notFound();

  const local = getArticlesForZip(zip.slug, 3);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Home Value", href: "/home-value" },
    { name: `${zip.city} ${zip.zip}`, href: `/home-value/${zip.slug}` },
  ];

  return (
    <>
      <PageHeader
        eyebrow={`${zip.city}, ${zip.county}`}
        title={`What's your ${zip.city} home worth?`}
        description={`A free, human-reviewed valuation for ${zip.city}, MD ${zip.zip} — built from current comparable sales in your neighborhood, not a national algorithm.`}
        crumbs={crumbs}
      />

      <Section tone="paper" spacing="md">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal variant="left">
            <SectionHeading
              eyebrow="Start here"
              title={`Get your ${zip.zip} valuation`}
              description={`Tell me about your ${zip.city} home and I'll prepare a real estimate — no cost, no obligation.`}
            />
            <ul className="mt-6 flex flex-col gap-3 text-sm text-fg-muted">
              {[
                `Priced to ${zip.city}'s current market, not last year's peak`,
                "Reviewed by a human who knows this area",
                "Perfect even if you're 6–18 months from selling",
              ].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-gold-deep" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="right" delay={120} className="rounded-3xl border border-line bg-cream p-6 sm:p-8">
            <HomeValueForm context={zip.slug} />
          </Reveal>
        </div>
      </Section>

      {local.length > 0 ? (
        <Section tone="cream" spacing="md">
          <SectionHeading
            eyebrow={`${zip.city} intel`}
            title={`Get to know ${zip.city}`}
            description="Local guides and reports to help you make a confident decision."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {local.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="paper" spacing="sm">
        <Reveal variant="scale" className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-line bg-cream p-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-fg">Thinking about buying in {zip.city} instead?</h2>
            <p className="mt-2 text-fg-muted">I can help with that too — let&rsquo;s talk about your options.</p>
          </div>
          <div className="flex gap-3">
            <Button href="/contact" icon="arrow-up-right">Book a call</Button>
            <Button href="/neighborhoods" variant="outline">Browse neighborhoods</Button>
          </div>
        </Reveal>
      </Section>

      <Section tone="cream" spacing="sm">
        <Link href="/home-value" className="inline-flex items-center gap-2 font-medium text-gold-deep underline underline-offset-4">
          <Icon name="arrow-left" className="h-4 w-4" />
          All home-value areas
        </Link>
      </Section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}

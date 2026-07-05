import Link from "next/link";
import type { Article } from "@/content/types";
import { COLLECTIONS, getRelated, hrefFor } from "@/lib/cms";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleBody, FaqList } from "@/components/sections/ArticleBody";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { AGENT } from "@/lib/constants";
import { formatMonthYear } from "@/lib/utils";

export function ArticlePage({ article }: { article: Article }) {
  const collection = COLLECTIONS[article.type];
  const path = hrefFor(article);
  const related = getRelated(article, 3);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: collection.title, href: collection.base },
    { name: article.title, href: path },
  ];

  return (
    <>
      {/* Header band */}
      <section className="border-b border-line bg-cream pt-28 sm:pt-32">
        <Container className="pb-10">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <Reveal variant="up">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="gold">{article.category}</Badge>
              {article.area ? <span className="text-sm text-fg-subtle">{article.area}</span> : null}
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-black uppercase leading-[1.05] tracking-tight text-fg sm:text-4xl lg:text-[2.9rem]">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{article.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-subtle">
              <span className="inline-flex items-center gap-2">
                <Avatar name={AGENT.name} size={28} /> {AGENT.name}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" className="h-4 w-4" /> {article.readMinutes} min read
              </span>
              <span>Updated {formatMonthYear(article.updated)}</span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Body + sidebar */}
      <Section tone="paper" spacing="md" slide={false}>
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <article className="max-w-2xl">
            <ArticleBody blocks={article.blocks} />

            {article.faqs && article.faqs.length > 0 ? (
              <div className="mt-14">
                <h2 className="mb-5 font-display text-2xl font-bold text-fg">Frequently asked questions</h2>
                <FaqList items={article.faqs} />
              </div>
            ) : null}
          </article>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal variant="up" className="rounded-2xl border border-line bg-cream p-6">
              <div className="flex items-center gap-3">
                <Avatar name={AGENT.name} size={48} />
                <div className="leading-tight">
                  <p className="font-display font-bold text-fg">{AGENT.name}</p>
                  <p className="text-xs text-fg-subtle">{AGENT.role} · MD #{AGENT.licenseNumber}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                Questions about {article.area ?? "your move"}? I&rsquo;m happy to help — no pressure, ever.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <Button href="/contact" className="w-full" icon="arrow-up-right">
                  Book a call
                </Button>
                <Button href={AGENT.phoneHref} variant="outline" className="w-full">
                  Call {AGENT.phone}
                </Button>
              </div>
            </Reveal>

            <Reveal variant="up" delay={110} className="rounded-2xl border border-line bg-ink p-6 text-fg-inverse">
              <h3 className="font-display text-lg font-bold text-white">Curious what your home is worth?</h3>
              <p className="mt-2 text-sm text-white/70">Get a real, human-reviewed valuation — not a bot estimate.</p>
              <Button href="/home-value" variant="light" className="mt-4 w-full" icon="arrow-up-right">
                Get my value
              </Button>
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 ? (
        <Section tone="cream" spacing="md">
          <SectionHeading eyebrow="Keep reading" title="Related local reads" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
          <div className="mt-8">
            <Link href={collection.base} className="inline-flex items-center gap-2 font-medium text-gold-deep underline underline-offset-4">
              All {collection.title.toLowerCase()}
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      ) : null}

      <JsonLd
        data={[
          articleSchema(article, path),
          breadcrumbSchema(crumbs),
          ...(article.faqs && article.faqs.length > 0 ? [faqSchema(article.faqs)] : []),
        ]}
      />
    </>
  );
}

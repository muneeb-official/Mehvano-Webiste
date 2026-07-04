import type { ContentType } from "@/content/types";
import { COLLECTIONS, getArticlesByType } from "@/lib/cms";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export function ContentIndexPage({ type }: { type: ContentType }) {
  const collection = COLLECTIONS[type];
  const articles = getArticlesByType(type);

  return (
    <>
      <PageHeader
        eyebrow="Local intel"
        title={collection.title}
        description={collection.blurb}
        crumbs={[
          { name: "Home", href: "/" },
          { name: collection.title, href: collection.base },
        ]}
      />

      <Section tone="cream" spacing="md">
        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-fg-muted">New content is on the way — check back soon.</p>
        )}
      </Section>

      <CTABand />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: collection.title, href: collection.base },
        ])}
      />
    </>
  );
}

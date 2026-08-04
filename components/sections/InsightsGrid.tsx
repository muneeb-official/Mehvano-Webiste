import Link from "next/link";
import type { Article, ContentType } from "@/content/types";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/cms";
import { formatDate, stagger } from "@/lib/utils";

type InsightsGridProps = {
  articles: Article[];
};

/** Category → on-brand icon for the photo-free article tile. */
const TYPE_ICON: Record<ContentType, IconName> = {
  neighborhood: "map-pin",
  "market-report": "chart",
  guide: "layers",
};

/**
 * "Insights & Updates" blog grid (reference §Blog). Each item shows a dated
 * headline + excerpt above an image with a floating "Read more" pill.
 */
export function InsightsGrid({ articles }: InsightsGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {articles.map((article, i) => (
        <Reveal key={article.slug} variant="up" delay={stagger(i)} className="h-full">
          <Link href={hrefFor(article)} data-cursor="view" className="group flex h-full flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 text-xs text-fg-subtle">
                <Icon name="clock" className="h-3.5 w-3.5" />
                {formatDate(article.updated)}
              </span>
              <h3 className="font-display text-lg font-semibold leading-snug text-fg transition-colors group-hover:text-gold-deep">
                {article.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-fg-muted">
                {article.description}
              </p>
            </div>
            <div className="relative mt-auto overflow-hidden rounded-2xl">
              <ImagePlaceholder
                alt={article.title}
                label={article.area ?? article.category}
                icon={TYPE_ICON[article.type]}
                variant={(i % 4) as 0 | 1 | 2 | 3}
                rounded="rounded-2xl"
                className="h-44 transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink shadow-card transition-transform duration-300 group-hover:-translate-y-[calc(50%+0.25rem)]">
                Read more
                <Icon name="arrow-up-right" className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

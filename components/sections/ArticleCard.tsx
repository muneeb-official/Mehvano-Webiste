import type { Article } from "@/content/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Icon, type IconName } from "@/components/ui/Icon";
import { hrefFor } from "@/lib/cms";
import { formatMonthYear } from "@/lib/utils";

const typeIcon: Record<Article["type"], IconName> = {
  neighborhood: "map-pin",
  "market-report": "chart",
  guide: "home",
};

type ArticleCardProps = {
  article: Article;
  index?: number;
  /** Compact variant drops the image. */
  compact?: boolean;
};

export function ArticleCard({ article, index = 0, compact }: ArticleCardProps) {
  return (
    <Card href={hrefFor(article)} padding="none" className="group flex h-full flex-col overflow-hidden">
      {!compact ? (
        <ImagePlaceholder
          alt={article.title}
          label={article.area ?? article.category}
          icon={typeIcon[article.type]}
          variant={(index % 4) as 0 | 1 | 2 | 3}
          rounded="rounded-none"
          className="h-44"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2">
          <Badge tone="gold">{article.category}</Badge>
          {article.area ? <span className="text-xs text-fg-subtle">{article.area}</span> : null}
        </div>
        <h3 className="font-display text-lg font-bold leading-snug text-fg transition-colors group-hover:text-gold-deep">
          {article.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-fg-muted">
          {article.description}
        </p>
        <div className="flex items-center gap-4 pt-1 text-xs text-fg-subtle">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" className="h-3.5 w-3.5" />
            {article.readMinutes} min read
          </span>
          <span>Updated {formatMonthYear(article.updated)}</span>
        </div>
      </div>
    </Card>
  );
}

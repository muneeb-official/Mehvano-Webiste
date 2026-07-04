/**
 * CONTENT LAYER — the single API the app uses to read hyperlocal content.
 *
 * Today it reads from typed files in /content. To move to a headless CMS later,
 * swap the imports/implementations here; page components never change because
 * they only call these functions.
 */
import type { Article, ContentType } from "@/content/types";
import { neighborhoods } from "@/content/neighborhoods";
import { marketReports } from "@/content/market-reports";
import { guides } from "@/content/guides";

const ALL: Article[] = [...neighborhoods, ...marketReports, ...guides];

const byNewest = (a: Article, b: Article) =>
  b.updated.localeCompare(a.updated);

/** Metadata about each content section, used to render index pages + nav. */
export const COLLECTIONS: Record<
  ContentType,
  { type: ContentType; base: string; title: string; blurb: string }
> = {
  neighborhood: {
    type: "neighborhood",
    base: "/neighborhoods",
    title: "Neighborhood Guides",
    blurb:
      "Honest, local guides to the places I serve — so you can picture life there before you ever tour a home.",
  },
  "market-report": {
    type: "market-report",
    base: "/market-reports",
    title: "Market Reports",
    blurb:
      "Monthly reads on prices, pace, and inventory across Anne Arundel and Howard County.",
  },
  guide: {
    type: "guide",
    base: "/guides",
    title: "Buyer & Seller Guides",
    blurb:
      "Plain-English answers to the questions buyers and sellers ask most in Maryland.",
  },
};

export const getAllArticles = (): Article[] => [...ALL].sort(byNewest);

export const getArticlesByType = (type: ContentType): Article[] =>
  ALL.filter((a) => a.type === type).sort(byNewest);

export const getArticle = (
  type: ContentType,
  slug: string
): Article | undefined => ALL.find((a) => a.type === type && a.slug === slug);

export const getArticleSlugs = (type: ContentType): string[] =>
  getArticlesByType(type).map((a) => a.slug);

/** Base path for a given content type, e.g. "/guides". */
export const basePathFor = (type: ContentType): string =>
  COLLECTIONS[type].base;

export const hrefFor = (article: Pick<Article, "type" | "slug">): string =>
  `${basePathFor(article.type)}/${article.slug}`;

/** Related content: same zip first, then same type, capped. */
export const getRelated = (article: Article, limit = 3): Article[] => {
  const pool = ALL.filter((a) => !(a.type === article.type && a.slug === article.slug));
  const scored = pool
    .map((a) => {
      let score = 0;
      if (article.zipSlug && a.zipSlug === article.zipSlug) score += 3;
      if (a.type === article.type) score += 1;
      return { a, score };
    })
    .sort((x, y) => y.score - x.score || byNewest(x.a, y.a));
  return scored.slice(0, limit).map((s) => s.a);
};

/** Content tied to a specific target zip (used on /home-value/[zip]). */
export const getArticlesForZip = (zipSlug: string, limit = 3): Article[] =>
  ALL.filter((a) => a.zipSlug === zipSlug)
    .sort(byNewest)
    .slice(0, limit);

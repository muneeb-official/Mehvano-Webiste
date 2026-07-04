import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/content/ArticlePage";
import { getArticle, getArticleSlugs, hrefFor } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticleSlugs("neighborhood").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("neighborhood", slug);
  if (!article) return {};
  return buildMetadata({
    title: article.seoTitle ?? article.title,
    description: article.description,
    path: hrefFor(article),
    type: "article",
    publishedTime: article.updated,
  });
}

export default async function NeighborhoodArticle({ params }: Params) {
  const { slug } = await params;
  const article = getArticle("neighborhood", slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}

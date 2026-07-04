/**
 * SEO helpers — consistent <head> metadata across every page.
 * Uses Next.js Metadata API; pages call buildMetadata() with page specifics.
 */
import type { Metadata } from "next";
import { SITE } from "./constants";

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Path only, e.g. "/neighborhoods". Becomes the canonical URL. */
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

// OG/Twitter images come from the file-based convention (app/opengraph-image.tsx),
// so pages don't set images here — Next merges them in automatically.
export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
  noIndex,
}: BuildMetadataArgs): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.brand,
      locale: SITE.locale,
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

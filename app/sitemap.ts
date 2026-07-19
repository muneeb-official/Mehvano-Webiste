import type { MetadataRoute } from "next";
import { SITE, ZIPS } from "@/lib/constants";
import { getAllArticles, hrefFor } from "@/lib/cms";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/home-value`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/neighborhoods`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/market-reports`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/guides`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];

  const zipRoutes: MetadataRoute.Sitemap = ZIPS.map((z) => ({
    url: `${base}/home-value/${z.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${base}${hrefFor(a)}`,
    lastModified: new Date(a.updated),
    changeFrequency: a.type === "market-report" ? "weekly" : "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...zipRoutes, ...articleRoutes];
}

import type { Metadata } from "next";
import { ContentIndexPage } from "@/components/content/ContentIndexPage";
import { COLLECTIONS } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Neighborhood Guides — Severn, Pasadena & Ellicott City",
  description: COLLECTIONS.neighborhood.blurb,
  path: "/neighborhoods",
});

export default function NeighborhoodsPage() {
  return <ContentIndexPage type="neighborhood" />;
}

import type { Metadata } from "next";
import { ContentIndexPage } from "@/components/content/ContentIndexPage";
import { COLLECTIONS } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buyer & Seller Guides — Maryland Real Estate",
  description: COLLECTIONS.guide.blurb,
  path: "/guides",
});

export default function GuidesPage() {
  return <ContentIndexPage type="guide" />;
}

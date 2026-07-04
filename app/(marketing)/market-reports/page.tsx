import type { Metadata } from "next";
import { ContentIndexPage } from "@/components/content/ContentIndexPage";
import { COLLECTIONS } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Market Reports — Anne Arundel & Howard County, MD",
  description: COLLECTIONS["market-report"].blurb,
  path: "/market-reports",
});

export default function MarketReportsPage() {
  return <ContentIndexPage type="market-report" />;
}

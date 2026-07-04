import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { buildMetadata } from "@/lib/seo";

// Phase 2: live IDX search requires a Bright MLS-approved vendor + broker
// sign-off (report §8). Kept out of the index until it's real.
export const metadata: Metadata = buildMetadata({
  title: "Property Search",
  description: "Search homes for sale across Anne Arundel and Howard County, MD.",
  path: "/listings",
  noIndex: true,
});

export default function ListingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Property search"
        title="Home search is on the way"
        description="A full, MLS-connected home search is coming soon. In the meantime, tell me what you're looking for and I'll send matching listings the moment they hit the market — often before they're everywhere else."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Listings", href: "/listings" },
        ]}
      />

      <Section tone="paper" spacing="md">
        <div className="mx-auto max-w-2xl">
          <Card tone="cream" padding="lg" className="flex flex-col items-center gap-5 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-fg-inverse">
              <Icon name="home" className="h-7 w-7" />
            </span>
            <h2 className="font-display text-2xl font-bold text-fg">Get first access to new listings</h2>
            <p className="max-w-md text-fg-muted">
              I&rsquo;ll set up a personalized search for your criteria and send new homes straight to
              your inbox as they list — no portal spam, just the homes that fit.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/contact" icon="arrow-up-right">Set up my search</Button>
              <Button href="/neighborhoods" variant="outline">Explore neighborhoods</Button>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}

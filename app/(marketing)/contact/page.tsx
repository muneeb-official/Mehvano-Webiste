import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { AGENT, SERVICE_AREA, SOCIALS } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: `Contact ${AGENT.name} — ${AGENT.role}`,
  description:
    "Get in touch with Mehvish Aslam for buying, selling, or a free home valuation in Anne Arundel and Howard County, MD. Fast, friendly, no pressure.",
  path: "/contact",
});

const socialIcon: Record<string, IconName> = {
  Instagram: "instagram",
  Facebook: "facebook",
  LinkedIn: "linkedin",
};

export default function ContactPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Let's talk"
        title="Get in touch"
        description="Have a question, ready to tour, or just exploring? Send a note and I'll reply personally — usually within minutes during the day."
        crumbs={crumbs}
      />

      <Section tone="paper" spacing="md">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Contact details */}
          <Reveal variant="left" className="flex flex-col gap-8">
            <SectionHeading eyebrow="Reach me directly" title="A real person, quick to respond" as="h2" />
            <div className="flex flex-col gap-4">
              <a href={AGENT.phoneHref} className="group flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-sand text-gold-deep transition-colors group-hover:bg-ink group-hover:text-fg-inverse">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-fg-subtle">Call or text</span>
                  <span className="font-display text-lg font-bold text-fg">{AGENT.phone}</span>
                </span>
              </a>
              <a href={AGENT.emailHref} className="group flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-sand text-gold-deep transition-colors group-hover:bg-ink group-hover:text-fg-inverse">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-fg-subtle">Email</span>
                  <span className="font-display text-lg font-bold text-fg">{AGENT.email}</span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-sand text-gold-deep">
                  <Icon name="map-pin" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-fg-subtle">Service area</span>
                  <span className="font-display text-lg font-bold text-fg">
                    {SERVICE_AREA.counties.join(" & ")}, MD
                  </span>
                </span>
              </div>
            </div>

            <div className="border-t border-line pt-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-fg-subtle">Follow along</p>
              <div className="flex gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-ink hover:text-fg"
                  >
                    <Icon name={socialIcon[s.label] ?? "arrow-up-right"} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal variant="right" delay={120} className="rounded-3xl border border-line bg-cream p-6 sm:p-8">
            <h2 className="mb-6 font-display text-2xl font-bold text-fg">Send a message</h2>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}

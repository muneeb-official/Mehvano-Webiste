/**
 * JSON-LD SCHEMA BUILDERS (report §9.1 — entity clarity for AI/answer engines).
 *
 * These produce schema.org objects rendered as <script type="application/ld+json">
 * via the <JsonLd> component. Keeping them here means the agent's identity is
 * defined once and stays consistent everywhere (name, license, service area).
 */
import type { Article, Faq } from "@/content/types";
import { AGENT, SERVICE_AREA, SITE, ZIPS } from "./constants";

const absolute = (path = "/"): string =>
  path.startsWith("http") ? path : `${SITE.url}${path.startsWith("/") ? "" : "/"}${path}`;

/** Stable @id for the agent entity so other nodes can reference it. */
export const AGENT_ID = `${SITE.url}/#agent`;
export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

const areaServed = [
  ...ZIPS.map((z) => ({
    "@type": "City",
    name: `${z.city}, ${SERVICE_AREA.state}`,
    postalCode: z.zip,
  })),
  ...SERVICE_AREA.counties.map((c) => ({ "@type": "AdministrativeArea", name: c })),
];

/** RealEstateAgent — the core entity AI needs to recommend her. */
export function realEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": AGENT_ID,
    name: AGENT.name,
    jobTitle: AGENT.role,
    url: SITE.url,
    image: absolute(AGENT.headshot),
    telephone: AGENT.phone,
    email: AGENT.email,
    description: AGENT.bio,
    areaServed,
    knowsAbout: [
      "Residential real estate",
      "Home buying",
      "Home selling",
      "Relocation to Fort Meade",
      "First-time home buyers",
    ],
    memberOf: { "@type": "Organization", name: AGENT.brokerage },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: AGENT.licenseLabel,
      identifier: AGENT.licenseNumber,
    },
    worksFor: { "@id": ORG_ID },
  };
}

/** The marketing brand / LLC (report §14 — the media brand owns the site). */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": ORG_ID,
    name: SITE.brand,
    url: SITE.url,
    image: absolute("/og/mehvano-og.jpg"),
    logo: absolute("/logo.png"),
    description: SITE.description,
    areaServed,
    employee: { "@id": AGENT_ID },
    telephone: AGENT.phone,
    email: AGENT.email,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.brand,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.href),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(article: Article, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.updated,
    dateModified: article.updated,
    inLanguage: "en-US",
    mainEntityOfPage: absolute(path),
    author: { "@id": AGENT_ID },
    publisher: { "@id": ORG_ID },
    about: article.area,
  };
}

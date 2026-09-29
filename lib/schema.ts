/**
 * JSON-LD SCHEMA BUILDERS (report §9.1 — entity clarity for AI/answer engines).
 *
 * These produce schema.org objects rendered as <script type="application/ld+json">
 * via the <JsonLd> component. Keeping them here means the agent's identity is
 * defined once and stays consistent everywhere (name, license, service area).
 */
import type { Article, Faq } from "@/content/types";
import { AGENT, COMPANY, SERVICE_AREA, SITE } from "./constants";
import { SERVICES } from "./services";

const absolute = (path = "/"): string =>
  path.startsWith("http") ? path : `${SITE.url}${path.startsWith("/") ? "" : "/"}${path}`;

/** Stable @id for the agent entity so other nodes can reference it. */
export const AGENT_ID = `${SITE.url}/#agent`;
export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

/** Person — the founder, referenced as author / employee by other schemas. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": AGENT_ID,
    name: AGENT.name,
    jobTitle: AGENT.role,
    url: SITE.url,
    image: absolute(AGENT.headshot),
    email: AGENT.email,
    description: AGENT.bio,
    worksFor: { "@id": ORG_ID },
  };
}

/** The multi-service LLC — the parent entity that owns the site. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: COMPANY.legalName,
    legalName: COMPANY.legalName,
    url: SITE.url,
    image: absolute("/og/mehvano-og.jpg"),
    logo: absolute("/logo.png"),
    description: COMPANY.description,
    foundingDate: COMPANY.founded,
    areaServed: { "@type": "Country", name: SERVICE_AREA.country },
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.addressLocality,
      addressRegion: COMPANY.addressRegion,
      postalCode: COMPANY.postalCode,
      addressCountry: "US",
    },
    email: COMPANY.email,
    employee: { "@id": AGENT_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${SITE.brand} Services`,
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.summary,
          url: `${SITE.url}/services/${s.slug}`,
        },
      })),
    },
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

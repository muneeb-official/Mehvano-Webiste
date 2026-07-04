/**
 * Content model for the hyperlocal engine (report §9.2).
 * Articles are authored as structured blocks so they render consistently and
 * can be marked up with Article + FAQPage JSON-LD for AI/answer-engine search.
 */

export type ContentType = "neighborhood" | "market-report" | "guide";

export type Faq = { question: string; answer: string };

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stats"; items: { label: string; value: string }[] }
  | { type: "callout"; tone?: "info" | "note"; title?: string; text: string }
  | { type: "faq"; items: Faq[] };

export type Article = {
  slug: string;
  type: ContentType;
  /** Human category label, e.g. "Neighborhood Guide". */
  category: string;
  /** H1 / card title. */
  title: string;
  /** Optional override for <title>; falls back to title. */
  seoTitle?: string;
  /** Meta description + list-card excerpt. */
  description: string;
  /** Short eyebrow above the H1. */
  eyebrow?: string;
  /** e.g. "Severn, MD (21144)". */
  area?: string;
  /** Links a piece to a target zip slug (constants.ZIPS). */
  zipSlug?: string;
  /** ISO date (YYYY-MM-DD). */
  updated: string;
  readMinutes: number;
  /** True for reports with illustrative figures that must be refreshed. */
  sampleData?: boolean;
  blocks: ContentBlock[];
  /** Surfaced as a dedicated FAQ section + FAQPage schema. */
  faqs?: Faq[];
};

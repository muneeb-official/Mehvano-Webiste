/**
 * PORTFOLIO DATA — Mehvish Aslam's showcase figures, recent sales, and credentials.
 *
 * ============================================================================
 *  ⚠️  PLACEHOLDER / sampleData — REPLACE BEFORE LAUNCH
 * ============================================================================
 *  Every number, sold listing, and rating below is illustrative sample data
 *  (same discipline as the market-report figures in content/market-reports.ts
 *  and the placeholder testimonials on the homepage). Swap in real, verifiable
 *  figures, and confirm ANYTHING that touches the MLS, commissions, production
 *  claims, or awards with the broker + Bright MLS + Maryland REC first
 *  (report §8 compliance; "AI drafts, human approves, then it sends").
 *
 *  This is the single source of truth for the /portfolio page AND the detailed
 *  portfolio card on the homepage hero — edit once, both update.
 * ============================================================================
 */
import type { IconName } from "@/components/ui/Icon";

export type PortfolioStat = {
  icon: IconName;
  /** Headline figure, e.g. "$48M+". */
  value: string;
  /** Short label under the figure. */
  label: string;
  /** Optional one-line context. */
  sub?: string;
};

/** Signature "by the numbers" band — the four headline production stats. */
export const PORTFOLIO_STATS: PortfolioStat[] = [
  { icon: "chart", value: "$48M+", label: "Career sales volume", sub: "Closed across Anne Arundel & Howard County" },
  { icon: "home", value: "120+", label: "Homes closed", sub: "Buyers and sellers represented" },
  { icon: "spark", value: "99.2%", label: "List-to-sold price", sub: "Average across recent listings" },
  { icon: "clock", value: "9 days", label: "Median days to offer", sub: "Well under the local market average" },
];

/** Compact stat trio reused on the homepage hero card. */
export const HERO_CARD_STATS: { value: string; label: string }[] = [
  { value: "120+", label: "Homes closed" },
  { value: "$48M+", label: "Volume sold" },
  { value: "4.9★", label: "Client rating" },
];

export type Sale = {
  /** Short marketable project name, e.g. "The Severn Colonial". */
  name: string;
  neighborhood: string;
  zip: string;
  /** Displayed sale price, e.g. "$565,000". */
  price: string;
  beds: number;
  baths: number;
  /** Living area, e.g. "2,340". */
  sqft: string;
  status: "Sold" | "Under contract" | "Just listed";
  /** Category tag pill, e.g. "Sellers", "Buyers", "Waterfront". */
  tag: string;
  /** Which side of the deal, e.g. "Listed & sold". */
  side: string;
  /** Optional standout detail, e.g. "6 days on market". */
  highlight?: string;
};

/** Recent-work gallery — the heart of the portfolio (all placeholder listings). */
export const FEATURED_SALES: Sale[] = [
  { name: "The Severn Colonial", neighborhood: "Severn", zip: "21144", price: "$565,000", beds: 4, baths: 3, sqft: "2,340", status: "Sold", tag: "Sellers", side: "Listed & sold", highlight: "6 days on market" },
  { name: "Waterside Retreat", neighborhood: "Pasadena", zip: "21122", price: "$720,000", beds: 5, baths: 4, sqft: "3,120", status: "Sold", tag: "Waterfront", side: "Represented seller", highlight: "Multiple offers" },
  { name: "Ridgeline Modern", neighborhood: "Ellicott City", zip: "21042", price: "$815,000", beds: 5, baths: 4, sqft: "3,480", status: "Sold", tag: "Buyers", side: "Represented buyer", highlight: "Won a competitive bid" },
  { name: "The Ellicott Craftsman", neighborhood: "Ellicott City", zip: "21043", price: "$642,000", beds: 4, baths: 3, sqft: "2,610", status: "Sold", tag: "Sellers", side: "Sold above list", highlight: "+$27K over asking" },
  { name: "First-Key Bungalow", neighborhood: "Odenton", zip: "21113", price: "$498,000", beds: 3, baths: 3, sqft: "2,010", status: "Sold", tag: "First home", side: "First-time buyer", highlight: "Closed in 28 days" },
  { name: "The Oaks at Severn", neighborhood: "Severn", zip: "21144", price: "$610,000", beds: 4, baths: 3, sqft: "2,480", status: "Sold", tag: "Sellers", side: "Listed & sold", highlight: "9 days on market" },
];

export type Specialty = {
  icon: IconName;
  title: string;
  text: string;
};

/** What Mehvish goes deep on (report §6.8 — a niche beats a generalist). */
export const SPECIALTIES: Specialty[] = [
  {
    icon: "shield",
    title: "Fort Meade & relocation",
    text: "Moving on a military, NSA, or government timeline? I run video tours and house-hunting trips around PCS and clearance schedules so nothing slips.",
  },
  {
    icon: "home",
    title: "First-time buyers",
    text: "Nervous first-timers are my favorite clients. Every step in plain English, every number explained, and never a decision rushed.",
  },
  {
    icon: "chart",
    title: "Move-up sellers",
    text: "Ready for more space in Ellicott City or the water in Pasadena? I choreograph the sell-and-buy so you're never caught between two homes.",
  },
  {
    icon: "spark",
    title: "The seller machine",
    text: "A real, human-reviewed valuation, a first-two-weeks pricing plan, and modern marketing that gets your home found by ready buyers.",
  },
];

export type Credential = {
  icon: IconName;
  title: string;
  sub: string;
};

/** Verifiable trust signals (report §9 — entity clarity). Keep these factual. */
export const CREDENTIALS: Credential[] = [
  { icon: "shield", title: "Licensed Maryland REALTOR®", sub: "MD Lic. #5012582" },
  { icon: "home", title: "Bright MLS member", sub: "IDX-approved local access" },
  { icon: "map-pin", title: "Hyperlocal specialist", sub: "Severn · Pasadena · Ellicott City" },
  { icon: "star", title: "Equal Housing Opportunity", sub: "Fair, transparent representation" },
];

export type ProcessStep = { title: string; text: string };

/** How she works — a clear, written value proposition (report §2, post-2024). */
export const PORTFOLIO_PROCESS: ProcessStep[] = [
  { title: "Discovery call", text: "A no-pressure conversation about your goals, timeline, and budget — buying, selling, or both." },
  { title: "Written game plan", text: "Pricing, prep, and a search or marketing strategy on paper, plus exactly how I'm compensated." },
  { title: "Make the move", text: "Tour, offer, negotiate, and manage inspections and closing — I own the details and keep you posted." },
  { title: "Lifetime check-ins", text: "After closing you get ongoing market reads and a home-value watch, so your biggest asset is never a mystery." },
];

export type PortfolioTestimonial = { quote: string; name: string; detail: string };

/** NOTE: placeholder reviews — replace with real, verifiable Google reviews. */
export const PORTFOLIO_TESTIMONIALS: PortfolioTestimonial[] = [
  {
    quote: "Mehvish knew Severn inside out and got us into the right neighborhood for our Fort Meade commute. Every question got a same-day answer.",
    name: "The R. Family",
    detail: "Buyers · Severn, MD",
  },
  {
    quote: "We listed in Ellicott City and had strong offers within the first week. Her pricing strategy was spot on — we closed above asking.",
    name: "Daniel & Priya",
    detail: "Sellers · Ellicott City, MD",
  },
  {
    quote: "First-time buyers and honestly nervous — she made the whole thing feel simple and never once pushed us into anything.",
    name: "Marcus T.",
    detail: "First-time buyer · Pasadena, MD",
  },
];

export type Service = {
  icon: IconName;
  title: string;
  text: string;
  /** Where "Read more" points. */
  href: string;
};

/** The four ways she works — the "Services" layered-card section. */
export const PORTFOLIO_SERVICES: Service[] = [
  {
    icon: "home",
    title: "Buyer representation",
    text: "From the first tour to the final signature — listings matched to your search, offers structured to compete, and every inspection and closing detail handled.",
    href: "/guides/first-time-home-buyer-severn-md",
  },
  {
    icon: "chart",
    title: "Seller strategy",
    text: "A real, human-reviewed valuation, a pricing plan built for the crucial first two weeks, and modern marketing that gets your home found by ready buyers.",
    href: "/home-value",
  },
  {
    icon: "shield",
    title: "Relocation & Fort Meade",
    text: "Moving on a military or government timeline? Video tours and house-hunting trips choreographed around PCS and clearance schedules so nothing slips.",
    href: "/about",
  },
  {
    icon: "spark",
    title: "Home valuation",
    text: "A data-backed read on what your home is really worth in 2026 — built from current comparable sales, not an automated online guess.",
    href: "/home-value",
  },
];

export type PortfolioFaq = {
  /** Filter category, e.g. "Buying". */
  category: string;
  question: string;
  answer: string;
};

/** FAQ accordion (report §9.2 — direct Q&A is what AI answer engines cite). */
export const PORTFOLIO_FAQ_CATEGORIES = ["Buying", "Selling", "Working together"] as const;

export const PORTFOLIO_FAQ: PortfolioFaq[] = [
  {
    category: "Buying",
    question: "Do I have to sign anything before we tour homes?",
    answer:
      "Yes. Since August 2024, buyers sign a written buyer-representation agreement before touring — it simply spells out the services I provide and exactly how I'm paid. I walk you through every line first; there are no surprises.",
  },
  {
    category: "Buying",
    question: "How fast do you respond when a new listing hits?",
    answer:
      "You're matched to new listings the moment they hit the market, and I aim to respond in minutes, not days. In a low-inventory market, speed is one of the biggest advantages I can give you.",
  },
  {
    category: "Buying",
    question: "Do you work with first-time buyers?",
    answer:
      "They're my favorite clients. I explain every step in plain English, break down every number, and never rush a decision. You'll always understand exactly where we are in the process.",
  },
  {
    category: "Selling",
    question: "How do you decide what my home is worth?",
    answer:
      "Every valuation is built from current, comparable sales and reviewed by a human — never a purely automated estimate that misses your home's story. You get a real number and the reasoning behind it.",
  },
  {
    category: "Selling",
    question: "How long are homes taking to sell right now?",
    answer:
      "It varies by neighborhood and price point, but well-priced, well-prepped homes in Severn, Pasadena, and Ellicott City are still moving quickly — often with an offer inside the first two weeks. I'll show you the live numbers for your street.",
  },
  {
    category: "Working together",
    question: "What areas do you cover?",
    answer:
      "I go deep in Anne Arundel and Howard County — especially Severn (21144), Pasadena (21122), and Ellicott City (21042 / 21043), plus Odenton, Annapolis, and Severna Park. Hyperlocal by design.",
  },
  {
    category: "Working together",
    question: "How exactly do you get paid?",
    answer:
      "You get a clear, written value proposition up front, so you always know the strategy, the timeline, and precisely how I'm compensated before you commit to anything. (Commission details are confirmed through my broker.)",
  },
];

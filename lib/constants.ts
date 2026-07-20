/**
 * BUSINESS CONSTANTS — single source of truth for NAP (Name/Address/Phone),
 * service area, navigation, and social profiles.
 *
 * Entity clarity (report §9.1) depends on this data being identical everywhere,
 * so every component + JSON-LD schema reads from here. Update once, propagates
 * across the whole site.
 *
 * NOTE: values marked `TODO` are placeholders that must be confirmed before
 * launch (broker legally holds the license and must approve public details).
 */

export const SITE = {
  /** Public brand shown in the logo / titles. */
  brand: "Mehvano LLC",
  brandShort: "Mehvano",
  /** Canonical production URL. */
  url: "https://mehvano.com",
  tagline: "Multi-service solutions for Maryland businesses & families",
  description:
    "Mehvano LLC — one trusted Maryland partner for medical & nursing care, AI services, real estate, IT & software, business consulting, staffing, and digital marketing.",
  locale: "en_US",
} as const;

/**
 * The LLC entity itself — NAP (Name / Address / Phone) for the whole company.
 * This is the single source of truth for company-wide contact details.
 */
export const COMPANY = {
  legalName: "Mehvano LLC",
  founded: "2024",
  phone: "(410) 555-0142",
  phoneHref: "tel:+14105550142",
  email: "hello@mehvano.com",
  emailHref: "mailto:hello@mehvano.com",
  addressLocality: "Severn",
  addressRegion: "MD",
  postalCode: "21144",
  streetAddress: "",
  // TODO: confirm registered LLC address before launch.
  description:
    "Mehvano LLC is a Maryland-registered, multi-service company delivering healthcare staffing, AI solutions, real estate, technology, and business services to clients across the state.",
} as const;

export const AGENT = {
  name: "Mehvish Aslam",
  role: "REALTOR®",
  licenseLabel: "Maryland Real Estate License",
  licenseNumber: "5012582",
  // TODO: confirm with broker before launch — the broker legally holds the license.
  brokerage: "Brokerage Name, LLC",
  brokeragePhone: "(410) 000-0000",
  // TODO: replace placeholders with real published contact details.
  phone: "(410) 555-0142",
  phoneHref: "tel:+14105550142",
  email: "hello@homesbymehvish.com",
  emailHref: "mailto:hello@homesbymehvish.com",
  headshot: "/agent/mehvish-aslam.jpg",
  bio: "Mehvish Aslam is a Maryland REALTOR® serving buyers and sellers across Anne Arundel and Howard County — with deep local knowledge of Severn, Pasadena, and Ellicott City. She pairs hometown expertise with modern, data-driven marketing so clients move with clarity and confidence.",
} as const;

export const SERVICE_AREA = {
  /** Real-estate division still specializes in these two counties. */
  counties: ["Anne Arundel County", "Howard County"],
  state: "MD",
  stateName: "Maryland",
  /** Cities beyond the core zips, used in schema areaServed + copy. */
  extendedCities: ["Odenton", "Annapolis", "Severna Park"],
  /** Company-wide coverage line for the multi-service LLC. */
  coverage: "Serving clients statewide across Maryland",
} as const;

export type Zip = {
  zip: string;
  city: string;
  county: string;
  /** URL slug used for /home-value/[zip] and content pages. */
  slug: string;
  label: string;
};

/** Core target zip codes (report §12 seller funnel). */
export const ZIPS: Zip[] = [
  { zip: "21144", city: "Severn", county: "Anne Arundel County", slug: "severn-21144", label: "Severn 21144" },
  { zip: "21122", city: "Pasadena", county: "Anne Arundel County", slug: "pasadena-21122", label: "Pasadena 21122" },
  { zip: "21042", city: "Ellicott City", county: "Howard County", slug: "ellicott-city-21042", label: "Ellicott City 21042" },
  { zip: "21043", city: "Ellicott City", county: "Howard County", slug: "ellicott-city-21043", label: "Ellicott City 21043" },
];

export const getZipBySlug = (slug: string): Zip | undefined =>
  ZIPS.find((z) => z.slug === slug);

/** Primary navigation. Services is the hub; the rest are company pages. */
export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Real Estate", href: "/home-value" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_NAV = [
  {
    title: "Services",
    links: [
      { label: "Medical & Nursing", href: "/services/medical-nursing" },
      { label: "AI Services", href: "/services/ai-services" },
      { label: "Real Estate", href: "/services/real-estate" },
      { label: "IT & Software", href: "/services/it-software" },
      { label: "Business Consulting", href: "/services/business-consulting" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Real Estate",
    links: [
      { label: "What's My Home Worth?", href: "/home-value" },
      { label: "Neighborhood Guides", href: "/neighborhoods" },
      { label: "Market Reports", href: "/market-reports" },
      { label: "Buyer & Seller Guides", href: "/guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Mehvano", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/", handle: "@mehvano" },
  { label: "Facebook", href: "https://facebook.com/", handle: "Mehvano LLC" },
  { label: "LinkedIn", href: "https://linkedin.com/", handle: "Mehvano LLC" },
] as const;

/** Social-proof stats shown in the hero + about page. */
export const STATS = [
  { value: "7", suffix: " services", label: "One trusted partner" },
  { value: "MD", suffix: "", label: "Serving all of Maryland" },
  { value: "<5", suffix: " min", label: "Median response time" },
] as const;

/** Trust/credibility strip. */
export const PARTNERS = ["Maryland LLC", "Licensed & Insured", "Bright MLS", "Equal Opportunity", "24/7 Support"] as const;

/**
 * Partner / client wordmarks shown in the hero logo strip (reference layout).
 * These are styled TEXT wordmarks, not real corporate logos — replace with your
 * own actual client/partner names (and real logo images) before launch.
 */
export const PARTNER_LOGOS = [
  "Northpoint",
  "Vantage",
  "Meridian",
  "Cedarwood",
  "Brightline",
  "Harborview",
] as const;

/**
 * Big "impact" numbers for the stat-trio band (reference §"90% / 180+ / 10K+").
 * Placeholder figures — replace with verified numbers before launch.
 */
export const IMPACT_STATS = [
  { value: "98%", label: "Client satisfaction" },
  { value: "500+", label: "Projects & placements delivered" },
  { value: "7", label: "Services under one roof" },
] as const;

/**
 * "Why choose us" accordion items (reference §"Built on Trust, Driven by
 * Results"). The first item is expanded by default.
 */
export const WHY_CHOOSE = [
  {
    title: "Tailored solutions",
    text: "We don't believe in one-size-fits-all. Every engagement is scoped to your specific goals, workflows, and budget — whether it's a care plan, a build, or a business plan.",
  },
  {
    title: "One point of contact",
    text: "No runaround and no finger-pointing. One dedicated person coordinates across every Mehvano team you work with and owns the outcome end to end.",
  },
  {
    title: "Client-centric approach",
    text: "You always talk to a real person who responds in minutes, not days. We measure ourselves on your results, not our billable hours.",
  },
  {
    title: "Licensed & compliant",
    text: "A Maryland-registered LLC staffed by licensed, insured, background-checked professionals — with the compliance and documentation to back it up.",
  },
] as const;

/**
 * Team members for the "Meet the People" grid (reference §"Meet the People
 * Behind the Innovation"). Photos are optional; the Avatar falls back to
 * initials. Replace with real team members before launch.
 */
export type TeamMember = {
  name: string;
  role: string;
  /** Optional headshot in /public; falls back to initials. */
  photo?: string;
};

export const TEAM: TeamMember[] = [
  { name: "Mehvish Aslam", role: "Founder & Real Estate Lead" },
  { name: "A. Rahman", role: "Director, Medical & Nursing" },
  { name: "S. Malik", role: "Head of AI & Technology" },
  { name: "J. Carter", role: "Business Services Lead" },
];

/**
 * Property/lifestyle photography used across cards and media frames. Cycled by
 * index where a component renders several (ZIP cards, article cards). Swap these
 * for real, licensed listing photos before launch.
 */
export const STOCK_IMAGES = [
  "/images/s-1.jpg",
  "/images/s-2.jpg",
  "/images/s-3.jpg",
  "/images/s-4.jpg",
  "/images/s-5.jpg",
] as const;

/** Deterministic image for an item at `index` (wraps around the pool). */
export const stockImage = (index: number) => STOCK_IMAGES[index % STOCK_IMAGES.length];

/** Legal / compliance strings surfaced in the footer. */
export const LEGAL = {
  /** Company-wide line shown site-wide in the footer. */
  companyLine: `${COMPANY.legalName} is a Maryland-registered limited liability company. Services are provided by licensed and insured professionals in their respective fields.`,
  equalHousing: "Equal Housing Opportunity.",
  idxDisclaimer:
    "Real estate listing data, where shown, is provided through a Bright MLS-approved IDX feed and is deemed reliable but not guaranteed.",
  brokerageLine: `Real Estate: ${AGENT.name}, ${AGENT.role} — ${AGENT.licenseLabel} #${AGENT.licenseNumber}. Brokerage: ${AGENT.brokerage}.`,
  disclaimer:
    "Information on this site is for general marketing purposes and is not legal, tax, medical, or financial advice.",
} as const;

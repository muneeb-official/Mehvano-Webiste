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
  brand: "Mehvano Realty",
  brandShort: "Mehvano",
  /** Canonical production URL (report recommends the owned domain). */
  url: "https://homesbymehvish.com",
  tagline: "The AI-searchable local expert for Anne Arundel & Howard County",
  description:
    "Mehvano Realty — homes for sale, free home valuations, and hyperlocal market intel for Severn, Pasadena, and Ellicott City, MD. Led by REALTOR® Mehvish Aslam.",
  locale: "en_US",
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
  counties: ["Anne Arundel County", "Howard County"],
  state: "MD",
  stateName: "Maryland",
  /** Cities beyond the core zips, used in schema areaServed + copy. */
  extendedCities: ["Odenton", "Annapolis", "Severna Park"],
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

/** Primary navigation (report route map). */
export const NAV_LINKS = [
  { label: "Home Value", href: "/home-value" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Market Reports", href: "/market-reports" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
] as const;

export const FOOTER_NAV = [
  {
    title: "Sell",
    links: [
      { label: "What's My Home Worth?", href: "/home-value" },
      ...ZIPS.map((z) => ({ label: `Home value in ${z.city} ${z.zip}`, href: `/home-value/${z.slug}` })),
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Neighborhood Guides", href: "/neighborhoods" },
      { label: "Market Reports", href: "/market-reports" },
      { label: "Buyer & Seller Guides", href: "/guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Mehvish", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/", handle: "@homesbymehvish" },
  { label: "Facebook", href: "https://facebook.com/", handle: "Homes by Mehvish" },
  { label: "LinkedIn", href: "https://linkedin.com/", handle: "Mehvish Aslam" },
] as const;

/** Social-proof stats shown in the hero + about page. */
export const STATS = [
  { value: "4", suffix: " zips", label: "Hyperlocal specialty areas" },
  { value: "2", suffix: " counties", label: "Anne Arundel & Howard" },
  { value: "<5", suffix: " min", label: "Median lead response time" },
] as const;

/** Trust/partner logos strip (placeholder labels, mirrors the reference design). */
export const PARTNERS = ["Bright MLS", "REALTOR®", "MD REC", "Equal Housing", "IDX"] as const;

/** Legal / compliance strings surfaced in the footer (report §8 compliance). */
export const LEGAL = {
  equalHousing: "Equal Housing Opportunity.",
  idxDisclaimer:
    "Listing data, where shown, is provided through a Bright MLS-approved IDX feed and is deemed reliable but not guaranteed.",
  brokerageLine: `${AGENT.name}, ${AGENT.role} — ${AGENT.licenseLabel} #${AGENT.licenseNumber}. Brokerage: ${AGENT.brokerage}.`,
  disclaimer:
    "Information on this site is for general marketing purposes and is not legal, tax, or financial advice.",
} as const;

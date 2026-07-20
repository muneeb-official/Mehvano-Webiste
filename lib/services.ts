/**
 * SERVICES — single source of truth for every service Mehvano LLC offers.
 *
 * Consumed by the home page (services grid), the /services overview, the
 * per-service /services/[slug] detail pages, the nav/footer, and JSON-LD.
 * Update once here and it propagates everywhere.
 *
 * Real Estate points at the existing hyperlocal funnel (/home-value,
 * /neighborhoods, etc.) rather than a generic detail page — see `externalHref`.
 */
import type { IconName } from "@/components/ui/Icon";
import { stockImage } from "./constants";

export type ServiceOffering = {
  title: string;
  text: string;
};

export type Service = {
  /** URL slug: /services/[slug]. */
  slug: string;
  /** Short label used in nav, cards, and breadcrumbs. */
  name: string;
  /** Full H1 title for the detail page. */
  title: string;
  icon: IconName;
  /** One-liner for cards and the services grid. */
  tagline: string;
  /** Lead paragraph for the detail page + cards. */
  summary: string;
  /** Longer positioning paragraph shown on the detail page. */
  overview: string;
  /** Concrete things we do under this service. */
  offerings: ServiceOffering[];
  /** Reasons to choose us for this service (the "why us" grid). */
  highlights: ServiceOffering[];
  /** Hero/section image (from the shared stock pool). */
  image: string;
  /**
   * If set, the primary CTA / "Learn more" links here instead of the standard
   * /services/[slug] page. Used to route Real Estate into the existing funnel.
   */
  externalHref?: string;
  /** Label for the primary CTA on cards/detail. */
  ctaLabel?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "medical-nursing",
    name: "Medical & Nursing",
    title: "Medical & Nursing Services",
    icon: "heart-pulse",
    tagline: "Compassionate, licensed care and healthcare staffing across Maryland.",
    summary:
      "Reliable home health, private-duty nursing, and medical staffing that keeps patients safe and facilities fully covered — delivered by vetted, licensed professionals.",
    overview:
      "From in-home caregiving to per-diem nurse staffing for clinics and facilities, our medical division connects families and healthcare organizations across Maryland with dependable, compassionate, fully-credentialed talent. Every caregiver is background-checked, license-verified, and matched to the specific needs of the patient or facility.",
    offerings: [
      { title: "Home health & private-duty nursing", text: "Skilled and non-skilled care at home — from companionship and ADLs to RN/LPN clinical care." },
      { title: "Healthcare staffing", text: "Per-diem, contract, and travel placements of RNs, LPNs, CNAs, and allied professionals for facilities." },
      { title: "Elder & post-acute care", text: "Post-hospital recovery, chronic-condition support, and respite care that keeps loved ones at home." },
      { title: "Care coordination", text: "A single point of contact managing schedules, credentials, and continuity of care." },
    ],
    highlights: [
      { title: "Licensed & vetted", text: "Every professional is license-verified, background-checked, and continuously re-credentialed." },
      { title: "24/7 availability", text: "Coverage when you need it — including nights, weekends, and last-minute call-offs." },
      { title: "Person-centered", text: "Care plans built around the patient, not a template." },
    ],
    image: stockImage(0),
    ctaLabel: "Request care or staffing",
  },
  {
    slug: "ai-services",
    name: "AI Services",
    title: "AI Services & Automation",
    icon: "cpu",
    tagline: "Practical AI that automates the busywork and unlocks new revenue.",
    summary:
      "Custom AI solutions, chatbots, and workflow automation that cut costs, speed up operations, and give small businesses enterprise-grade capability.",
    overview:
      "We help Maryland businesses put AI to work — not as a buzzword, but as a tool that answers customers at 2 a.m., drafts the report nobody has time for, and removes hours of manual data entry. From strategy to a shipped, integrated solution, we handle the whole build and keep it running.",
    offerings: [
      { title: "AI chatbots & assistants", text: "Custom assistants for support, lead capture, and internal knowledge — trained on your data." },
      { title: "Workflow automation", text: "Automate repetitive tasks across your tools so your team focuses on higher-value work." },
      { title: "Custom AI solutions", text: "Document processing, data extraction, forecasting, and content generation built to your workflow." },
      { title: "AI strategy & consulting", text: "A clear, ROI-focused roadmap for where AI actually moves the needle in your business." },
    ],
    highlights: [
      { title: "ROI-first", text: "We start with the outcome and cost savings, then build only what earns its keep." },
      { title: "Your data stays yours", text: "Secure, private integrations — we don't train public models on your information." },
      { title: "Ship fast", text: "Working prototypes in weeks, not quarters, so you see value early." },
    ],
    image: stockImage(1),
    ctaLabel: "Explore AI solutions",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    title: "Real Estate Services",
    icon: "home",
    tagline: "Buy, sell, and invest with a hyperlocal Maryland expert.",
    summary:
      "Full-service residential real estate for Anne Arundel and Howard County — free home valuations, neighborhood intel, and end-to-end buying and selling support.",
    overview:
      "Our real estate division helps Maryland families buy with confidence and sell for more — backed by genuine, block-by-block knowledge of Severn, Pasadena, and Ellicott City. Get a free, human-reviewed home valuation, dig into hyperlocal market reports, and work with a REALTOR® who answers in minutes, not days.",
    offerings: [
      { title: "Buying a home", text: "New listings matched to your search, expert tours, and offers structured to compete — not overpay." },
      { title: "Selling a home", text: "A real valuation from current comps, a pricing plan, and modern marketing that gets you found." },
      { title: "Free home valuation", text: "A human-reviewed estimate for your exact neighborhood — not a generic online guess." },
      { title: "Neighborhood & market intel", text: "Hyperlocal guides and monthly market reports for the areas we serve." },
    ],
    highlights: [
      { title: "Genuinely hyperlocal", text: "We know Severn, Pasadena, and Ellicott City block by block." },
      { title: "Fast, human responses", text: "You hear back in minutes and always talk to a real person." },
      { title: "Priced with real data", text: "Every valuation is built from current comps and reviewed by a human." },
    ],
    image: stockImage(2),
    externalHref: "/home-value",
    ctaLabel: "What's my home worth?",
  },
  {
    slug: "it-software",
    name: "IT & Software",
    title: "IT & Software Development",
    icon: "code",
    tagline: "Websites, apps, and IT support that just work.",
    summary:
      "Custom websites, web & mobile apps, cloud setup, and managed IT support — the technical backbone your business runs on.",
    overview:
      "We design and build the software your business needs, then keep it running. From a fast, modern marketing site to a full custom web application and the IT support behind it, our team delivers reliable technology without the enterprise price tag.",
    offerings: [
      { title: "Web & mobile development", text: "Fast, modern, mobile-friendly websites and apps built to convert and scale." },
      { title: "Custom software", text: "Internal tools, dashboards, and integrations tailored to how your team actually works." },
      { title: "Cloud & hosting", text: "Setup, migration, and management on modern cloud infrastructure." },
      { title: "Managed IT support", text: "Ongoing maintenance, security, and help-desk support so tech never slows you down." },
    ],
    highlights: [
      { title: "Modern stack", text: "We build on proven, up-to-date technology that lasts." },
      { title: "Clear pricing", text: "Fixed scopes and transparent quotes — no surprise invoices." },
      { title: "We stick around", text: "Support and iteration after launch, not just a hand-off." },
    ],
    image: stockImage(3),
    ctaLabel: "Start a project",
  },
  {
    slug: "business-consulting",
    name: "Business Consulting",
    title: "Business Consulting & Formation",
    icon: "briefcase",
    tagline: "Launch, structure, and grow your business the right way.",
    summary:
      "LLC formation, bookkeeping, compliance, and growth strategy — the practical guidance new and growing Maryland businesses need.",
    overview:
      "Starting or scaling a business is easier with a partner who's done it before. We help you form your LLC, stay compliant, keep clean books, and build a realistic plan for growth — so you can focus on the work you actually want to do.",
    offerings: [
      { title: "LLC & business formation", text: "Entity setup, EIN, operating agreements, and registered-agent guidance done right." },
      { title: "Bookkeeping & compliance", text: "Clean books, filings, and deadlines handled so you stay in good standing." },
      { title: "Growth strategy", text: "Practical planning for pricing, operations, and getting more of the right customers." },
      { title: "Operations support", text: "Systems and processes that let your business run without you in every detail." },
    ],
    highlights: [
      { title: "Founder-friendly", text: "Plain-English guidance without the jargon or billable-hour anxiety." },
      { title: "End to end", text: "From formation to growth, one team through every stage." },
      { title: "Local knowledge", text: "We know Maryland's requirements and the local market." },
    ],
    image: stockImage(4),
    ctaLabel: "Book a consultation",
  },
  {
    slug: "staffing-hr",
    name: "Staffing & HR",
    title: "Staffing & HR Solutions",
    icon: "users",
    tagline: "The right people, placed fast — plus the HR support to keep them.",
    summary:
      "Recruiting, placement, and HR support across healthcare, tech, and administrative roles — so you hire faster and manage smarter.",
    overview:
      "Finding and keeping good people is hard. We source, screen, and place qualified candidates across industries, and give growing teams the HR support — onboarding, payroll guidance, and compliance — that usually only large companies can afford.",
    offerings: [
      { title: "Recruiting & placement", text: "Sourcing and vetting candidates for temp, contract, and permanent roles." },
      { title: "Healthcare & clinical staffing", text: "Credentialed RNs, LPNs, CNAs, and allied staff for facilities and agencies." },
      { title: "HR support", text: "Onboarding, policies, payroll guidance, and compliance for small teams." },
      { title: "Payroll coordination", text: "Accurate, on-time payroll support so your team is never left waiting." },
    ],
    highlights: [
      { title: "Pre-vetted talent", text: "Background checks and skills screening before anyone reaches you." },
      { title: "Fast turnaround", text: "Shortlists in days, coverage when you're in a pinch." },
      { title: "Full lifecycle", text: "From hire to retain — recruiting and HR under one roof." },
    ],
    image: stockImage(0),
    ctaLabel: "Find talent",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    title: "Digital Marketing & Branding",
    icon: "megaphone",
    tagline: "Get found, get leads, and look the part online.",
    summary:
      "SEO, social media, branding, and paid ads that turn attention into real, measurable leads for your business.",
    overview:
      "A great business no one can find doesn't grow. We build the brand, content, and campaigns that get you discovered by the right people — and we report on the numbers that matter, not vanity metrics.",
    offerings: [
      { title: "SEO & local search", text: "Rank for what your customers actually search — including Google and AI answer engines." },
      { title: "Social media management", text: "Consistent, on-brand content and community management that builds trust." },
      { title: "Paid advertising", text: "Google and social ad campaigns optimized for leads and return on spend." },
      { title: "Branding & design", text: "Logos, identity, and marketing collateral that make you look established." },
    ],
    highlights: [
      { title: "Lead-focused", text: "We optimize for calls, forms, and sales — not likes." },
      { title: "Transparent reporting", text: "Clear monthly reports on what's working and what's next." },
      { title: "AI-ready SEO", text: "Content structured to be found by search and AI assistants alike." },
    ],
    image: stockImage(1),
    ctaLabel: "Grow my business",
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

/** The href a service card / CTA should point to (external funnel or detail page). */
export const serviceHref = (s: Service): string =>
  s.externalHref ?? `/services/${s.slug}`;

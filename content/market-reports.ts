import type { Article } from "./types";

export const marketReports: Article[] = [
  {
    slug: "anne-arundel-county-home-prices",
    type: "market-report",
    category: "Market Report",
    title: "Anne Arundel County Home Prices: Monthly Market Update",
    description:
      "The latest read on Anne Arundel County's housing market — median prices, days on market, and inventory for Severn, Pasadena, and beyond.",
    eyebrow: "Anne Arundel County",
    area: "Anne Arundel County, MD",
    updated: "2026-06-01",
    readMinutes: 4,
    sampleData: true,
    blocks: [
      {
        type: "callout",
        tone: "note",
        title: "Refresh me monthly",
        text: "The figures below are illustrative placeholders shown to demonstrate the report layout. Replace them each month with current Bright MLS data (deemed reliable but not guaranteed) before publishing.",
      },
      {
        type: "paragraph",
        text: "Here's where the Anne Arundel County market stands this month, with a focus on the communities I serve most — Severn (21144) and Pasadena (21122). The headline: demand for well-priced, move-in-ready homes remains steady, and homes that are prepped and priced correctly continue to sell faster than the county average.",
      },
      {
        type: "stats",
        items: [
          { label: "Median sale price", value: "$465,000" },
          { label: "Median days on market", value: "18 days" },
          { label: "Months of inventory", value: "1.9" },
          { label: "Sale-to-list price", value: "99.6%" },
        ],
      },
      { type: "heading", text: "What the numbers mean for sellers" },
      {
        type: "paragraph",
        text: "With inventory still below the ~5–6 months that signals a balanced market, sellers of well-presented homes retain leverage. The catch is that today's buyers are rate-sensitive and selective — overpriced or poorly prepped listings sit while the rest move. Pricing to the current comps (not last year's peak) and investing in presentation is what separates a quick, strong sale from a stale one.",
      },
      { type: "heading", text: "What it means for buyers" },
      {
        type: "paragraph",
        text: "You have a little more room to negotiate than at the frenzied peak, but the best homes still draw competition. Get fully pre-approved, know your must-haves, and be ready to move on the right property. Working with an agent who tracks new inventory the moment it hits — and who can move fast — is the difference in a low-inventory market.",
      },
    ],
    faqs: [
      {
        question: "Is now a good time to sell a home in Anne Arundel County?",
        answer:
          "With inventory still below a balanced level, well-prepared and correctly priced homes continue to sell quickly and near list price. The key is pricing to current comps rather than last year's peak. Request a current valuation to see what your specific home would fetch today.",
      },
      {
        question: "Are home prices going up or down in Anne Arundel County?",
        answer:
          "Prices have largely held steady, supported by low inventory. Month-to-month movement varies by community and price band, which is why a hyperlocal, up-to-date report beats national headlines. Check the latest figures above or ask for a report on your specific neighborhood.",
      },
    ],
  },
  {
    slug: "howard-county-market-update",
    type: "market-report",
    category: "Market Report",
    title: "Howard County Market Update: Ellicott City & Beyond",
    description:
      "A current snapshot of the Howard County housing market, including Ellicott City (21042 & 21043) — prices, pace of sales, and what's driving demand.",
    eyebrow: "Howard County",
    area: "Howard County, MD",
    updated: "2026-06-01",
    readMinutes: 4,
    sampleData: true,
    blocks: [
      {
        type: "callout",
        tone: "note",
        title: "Refresh me monthly",
        text: "The figures below are illustrative placeholders shown to demonstrate the report layout. Replace them each month with current Bright MLS data (deemed reliable but not guaranteed) before publishing.",
      },
      {
        type: "paragraph",
        text: "Howard County — anchored by Ellicott City and Columbia — remains one of central Maryland's most competitive markets, driven above all by its schools and central location. Here's the current read, with an eye on Ellicott City's two main zips, 21042 and 21043.",
      },
      {
        type: "stats",
        items: [
          { label: "Median sale price", value: "$625,000" },
          { label: "Median days on market", value: "12 days" },
          { label: "Months of inventory", value: "1.6" },
          { label: "Sale-to-list price", value: "100.4%" },
        ],
      },
      { type: "heading", text: "Why Howard County stays competitive" },
      {
        type: "paragraph",
        text: "Demand for homes in strong school assignments consistently outpaces supply here. That keeps sale-to-list ratios at or above 100% for the most sought-after homes, and it keeps days on market short. Buyers who are pre-approved, decisive, and well-represented win; sellers who present well are rewarded.",
      },
      { type: "heading", text: "Ellicott City watch" },
      {
        type: "paragraph",
        text: "Within Ellicott City, the historic east side (21043) and the newer, larger-lot west side (21042) can move at slightly different paces depending on inventory and price band. If you're buying or selling in either, a home-specific analysis beats a countywide average — reach out for one.",
      },
    ],
    faqs: [
      {
        question: "Why are homes in Ellicott City so competitive?",
        answer:
          "Ellicott City sits in the Howard County Public School System — among the most sought-after in Maryland — and offers a central location between Baltimore and the D.C. corridor. Demand for homes in strong school assignments consistently exceeds supply, keeping prices firm and days on market short.",
      },
      {
        question: "How fast do homes sell in Howard County?",
        answer:
          "Well-priced, well-presented homes in desirable school assignments often sell within a couple of weeks, frequently at or above list price. Pace varies by price band and neighborhood, so ask for a report specific to your home or target area.",
      },
    ],
  },
];

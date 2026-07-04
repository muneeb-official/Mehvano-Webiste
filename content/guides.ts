import type { Article } from "./types";

export const guides: Article[] = [
  {
    slug: "closing-costs-for-buyers-in-maryland",
    type: "guide",
    category: "Buyer Guide",
    title: "Closing Costs for Buyers in Maryland: What to Actually Expect",
    description:
      "A plain-English breakdown of what buyers pay at closing in Maryland — transfer and recordation taxes, lender fees, and how much to budget.",
    eyebrow: "Buying",
    updated: "2026-06-01",
    readMinutes: 6,
    blocks: [
      {
        type: "paragraph",
        text: "Closing costs are the fees — beyond your down payment — that you pay to finalize a home purchase. In Maryland they typically land somewhere around 2%–5% of the purchase price for buyers, though the exact figure depends on your price, lender, and how costs are negotiated. Here's what's actually in that number.",
      },
      { type: "heading", text: "The main buckets" },
      {
        type: "list",
        items: [
          "Lender fees: loan origination, underwriting, and related charges from your mortgage company.",
          "Prepaids & escrow: upfront homeowners insurance, property taxes, and prepaid interest set aside at closing.",
          "Title & settlement: title search, title insurance (lender's and optional owner's), and the settlement/attorney fee.",
          "Maryland transfer & recordation taxes: state and county charges to record the deed and any mortgage.",
          "Appraisal & inspections: usually paid during the process rather than at the table.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Maryland transfer & recordation taxes",
        text: "Maryland levies a state transfer tax plus county transfer and recordation taxes, and rates vary by county (Anne Arundel and Howard differ). First-time Maryland homebuyers often qualify for a reduced state transfer tax rate, and how transfer taxes are split between buyer and seller is negotiable. Confirm current rates with your title company and lender.",
      },
      { type: "heading", text: "How to keep them manageable" },
      {
        type: "paragraph",
        text: "Two levers matter most. First, ask your lender for a Loan Estimate early so you can shop and compare — closing costs aren't fixed across lenders. Second, in the right market conditions, a seller credit toward closing costs can be negotiated as part of your offer. Post-2024, your buyer representation agreement will also spell out how my compensation is handled — we'll walk through it up front so there are no surprises.",
      },
      {
        type: "callout",
        tone: "note",
        text: "This is general information, not legal, tax, or lending advice. Your title company, lender, and a tax professional can confirm the exact figures for your purchase.",
      },
    ],
    faqs: [
      {
        question: "How much are closing costs for buyers in Maryland?",
        answer:
          "Buyer closing costs in Maryland typically run about 2%–5% of the purchase price, covering lender fees, prepaids/escrow, title and settlement charges, and Maryland transfer and recordation taxes. The exact amount depends on your price, lender, county, and what's negotiated. Ask your lender for a Loan Estimate to see your specific numbers.",
      },
      {
        question: "Do first-time buyers get a break on Maryland transfer taxes?",
        answer:
          "Maryland offers first-time homebuyers a reduced state transfer tax rate, and first-time buyers are often exempt from paying part of the transfer tax that would otherwise be shared. Rules and rates change, so confirm eligibility with your title company and lender before closing.",
      },
      {
        question: "Can the seller pay my closing costs?",
        answer:
          "Sometimes. Depending on market conditions and your loan type, a seller credit toward closing costs can be negotiated as part of your offer, subject to lender limits. It's one of several strategies we can use to reduce your cash to close.",
      },
    ],
  },
  {
    slug: "first-time-home-buyer-severn-md",
    type: "guide",
    category: "Buyer Guide",
    title: "First-Time Home Buyer Guide: Buying in Severn & Anne Arundel County",
    description:
      "A step-by-step roadmap for first-time buyers in Severn and Anne Arundel County — from pre-approval to keys, including Maryland first-time buyer programs.",
    eyebrow: "Buying",
    area: "Severn / Anne Arundel County, MD",
    zipSlug: "severn-21144",
    updated: "2026-06-01",
    readMinutes: 8,
    blocks: [
      {
        type: "paragraph",
        text: "Buying your first home in Severn or anywhere in Anne Arundel County is very doable with a clear plan. Here's the same roadmap I walk first-time buyers through, so you know what's coming at every step.",
      },
      { type: "heading", text: "The step-by-step roadmap" },
      {
        type: "list",
        items: [
          "1. Get pre-approved. Talk to a lender first — it tells you your budget and makes your offers credible. It's the single most important first step.",
          "2. Map your must-haves. Commute (Fort Meade? MARC?), space, and target neighborhoods. We'll define your search together.",
          "3. Sign a buyer representation agreement. Post-2024 this is standard; it spells out my services and exactly how I'm paid, up front.",
          "4. Tour and compare. I send new listings the moment they hit and we tour the contenders — in person or by video if you're relocating.",
          "5. Make a strong offer. We price it to the comps and structure terms to compete without overpaying.",
          "6. Inspection & appraisal. We protect you with the right contingencies and negotiate repairs or credits.",
          "7. Close and get your keys. Final walkthrough, settlement, done.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Maryland first-time buyer programs",
        text: "Maryland offers programs (such as Maryland Mortgage Program loans and down payment assistance) plus a reduced state transfer tax for first-time buyers. Availability and terms change, so pair a knowledgeable local lender with your search to see what you qualify for.",
      },
      { type: "heading", text: "Why Severn is first-time-buyer friendly" },
      {
        type: "paragraph",
        text: "Severn tends to offer more square footage per dollar than nearby Annapolis or Howard County, with a healthy supply of townhomes and newer single-family homes. Combined with commute access to Fort Meade and the MARC train, it's one of the most practical entry points into Anne Arundel County homeownership.",
      },
    ],
    faqs: [
      {
        question: "What's the first step to buying a home in Maryland?",
        answer:
          "Get pre-approved with a lender before you shop. Pre-approval tells you your realistic budget and makes your offers credible to sellers — it's the foundation everything else builds on. From there, define your must-haves and start touring with an agent.",
      },
      {
        question: "Are there first-time home buyer programs in Maryland?",
        answer:
          "Yes. Maryland offers options such as the Maryland Mortgage Program and down payment assistance, plus a reduced state transfer tax rate for first-time buyers. Terms change over time, so work with a local lender to confirm what you qualify for.",
      },
      {
        question: "Is Severn, MD good for first-time buyers?",
        answer:
          "Severn is one of Anne Arundel County's most first-time-buyer-friendly markets, offering newer townhomes and single-family homes with more space per dollar than nearby areas, plus strong commute access to Fort Meade and the MARC train.",
      },
    ],
  },
  {
    slug: "how-to-price-your-home-to-sell",
    type: "guide",
    category: "Seller Guide",
    title: "How to Price Your Home to Sell in 2026 (Without Leaving Money on the Table)",
    description:
      "Why pricing to current comps beats chasing last year's peak — a seller's guide to pricing strategy in the Anne Arundel and Howard County markets.",
    eyebrow: "Selling",
    updated: "2026-06-01",
    readMinutes: 5,
    blocks: [
      {
        type: "paragraph",
        text: "Pricing is the highest-leverage decision you make as a seller. Get it right and you create competition and sell quickly near — or above — asking. Get it wrong and your home lingers, buyers wonder what's wrong with it, and you often net less than if you'd priced it correctly from day one. Here's how to think about it.",
      },
      { type: "heading", text: "Price to today's comps, not last year's peak" },
      {
        type: "paragraph",
        text: "Buyers and their agents shop by comparison. A price anchored to recent, comparable sales in your neighborhood — adjusted for your home's condition and features — is what draws showings and offers. Aspirational pricing based on what a neighbor got at the market's peak tends to backfire: the listing sits, then requires cuts that signal weakness.",
      },
      { type: "heading", text: "The first two weeks matter most" },
      {
        type: "paragraph",
        text: "Your listing gets its biggest burst of attention right after it goes live. Pricing correctly out of the gate captures that surge while buyer interest is highest. Overpricing 'to leave room to negotiate' usually just means missing that window and negotiating from a weaker position later.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Start with a real valuation",
        text: "A comparative market analysis (CMA) looks at what similar homes near you have actually sold for recently, then adjusts for your home's specifics. It's the honest starting point for a pricing strategy — and it's free.",
      },
    ],
    faqs: [
      {
        question: "Should I price my home high to leave room to negotiate?",
        answer:
          "Usually no. Overpricing tends to cost sellers the crucial first-two-weeks surge of buyer attention, leading to a stale listing and price cuts that weaken your position. Pricing to current comparable sales typically drives more showings, competition, and a stronger final number.",
      },
      {
        question: "How do I know what my home is worth?",
        answer:
          "Start with a comparative market analysis (CMA), which compares recent sales of similar nearby homes and adjusts for your home's condition and features. It's more accurate than an automated online estimate. Request a free, home-specific valuation to get started.",
      },
    ],
  },
];

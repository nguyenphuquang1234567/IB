export type DiagramType = "moat-grid" | "five-forces" | "revenue-drivers" | "valuation-methods" | "thesis-flow";

export interface ERConcept {
  id: string;
  title: string;
  explanation: string;
  example: string;
  diagram?: DiagramType;
  mistakes: string[];
}

export const ER_CONCEPTS: ERConcept[] = [
  {
    id: "business-model",
    title: "Business Model Analysis",
    explanation:
      "A business model describes how a company creates, delivers, and captures value. Analysts assess revenue streams, cost structure, unit economics, and scalability to understand sustainability and growth potential.",
    example:
      "Apple: Hardware sales (iPhone, Mac) + Services (App Store, iCloud, Apple Music). High-margin services growing faster than hardware, improving mix.",
    mistakes: [
      "Focusing only on revenue without understanding unit economics",
      "Ignoring capital intensity and cash conversion",
      "Assuming current model is permanent (disruption risk)",
    ],
  },
  {
    id: "revenue-drivers",
    title: "Revenue Drivers",
    diagram: "revenue-drivers",
    explanation:
      "Revenue drivers are the key factors that determine top-line growth: volume, price, mix, geographic expansion, new products, and market share. Analysts model each driver to forecast revenue.",
    example:
      "Nvidia: Data center GPU demand (AI training), gaming GPU cycles, automotive chips. AI drove 3x data center revenue growth in FY24.",
    mistakes: [
      "Extrapolating recent growth without understanding saturation",
      "Ignoring competitive dynamics and pricing power",
      "Over-relying on management guidance",
    ],
  },
  {
    id: "cost-structure",
    title: "Cost Structure",
    explanation:
      "Cost structure analysis breaks down fixed vs variable costs, operating leverage, and margin drivers. Understanding cost behavior helps forecast profitability as revenue scales.",
    example:
      "Amazon: Low-margin retail, high-margin AWS. Retail benefits from scale and logistics efficiency; AWS drives operating income.",
    mistakes: [
      "Treating all costs as variable when some are fixed",
      "Ignoring inflation and wage pressure",
      "Missing one-time or non-recurring items",
    ],
  },
  {
    id: "competitive-advantage",
    title: "Competitive Advantage (Moat)",
    explanation:
      "A moat allows a company to maintain profitability and defend market share.",
    example:
      "Costco: Membership model creates switching costs; scale enables low prices; high employee pay reduces turnover. Members renew at 90%+.",
    diagram: "moat-grid",
    mistakes: [
      "Confusing temporary advantages with durable moats",
      "Overstating brand strength without pricing power evidence",
      "Ignoring new entrants and technology disruption",
    ],
  },
  {
    id: "industry-analysis",
    title: "Industry Analysis",
    diagram: "five-forces",
    explanation:
      "Industry analysis evaluates competitive dynamics using frameworks like Porter's Five Forces: rivalry, threat of new entrants, substitutes, buyer power, supplier power. TAM/SAM/SOM sizing frames opportunity.",
    example:
      "EV market: High rivalry (Tesla, BYD, legacy OEMs); capital-intensive; regulatory tailwinds; battery supply constraints. TAM growing but margins under pressure.",
    mistakes: [
      "Using static analysis in fast-changing industries",
      "Overestimating TAM without realistic penetration",
      "Ignoring regulatory and geopolitical risks",
    ],
  },
  {
    id: "valuation-frameworks",
    title: "Valuation Frameworks",
    diagram: "valuation-methods",
    explanation:
      "Common frameworks: DCF (intrinsic value from cash flows), Comparable Companies (relative value), Precedent Transactions (M&A benchmarks). Each has strengths; triangulate for conviction.",
    example:
      "DCF for growth companies with visible FCF; Comps for mature peers; EV/EBITDA for capital-intensive; P/E for profitable, stable earnings.",
    mistakes: [
      "Using a single method without cross-checking",
      "Over-optimistic terminal growth or multiples",
      "Ignoring balance sheet (net debt) in EV calculations",
    ],
  },
  {
    id: "investment-thesis",
    title: "Investment Thesis Construction",
    diagram: "thesis-flow",
    explanation:
      "An investment thesis is a structured argument for Buy/Hold/Sell. It includes: catalyst, valuation support, risk factors, and time horizon. The thesis should be falsifiable and specific.",
    example:
      "Buy NVDA: AI infrastructure build-out drives multi-year data center growth; valuation justified by FCF growth; risk: competition from AMD, custom chips.",
    mistakes: [
      "Vague thesis without clear catalyst or timeline",
      "Ignoring or downplaying key risks",
      "Recommendation inconsistent with valuation",
    ],
  },
];

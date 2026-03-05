export interface AcumenConcept {
  id: string;
  title: string;
  explanation: string;
  example: string;
  diagram?: string;
  mistakes: string[];
}

export const ACUMEN_CONCEPTS: AcumenConcept[] = [
  {
    id: "revenue-drivers",
    title: "Revenue Drivers",
    explanation:
      "Revenue drivers are the key factors that directly influence top-line growth. Common drivers include: volume (units sold), price, product mix, new customer acquisition, expansion revenue, and geographic penetration.",
    example:
      "A SaaS company grows revenue by 30% through: +15% from new customers, +10% from upsells, +5% from price increase.",
    diagram: "Revenue = Volume × Price × Mix",
    mistakes: [
      "Confusing correlation with causation when analyzing drivers",
      "Ignoring seasonality or one-time events",
      "Assuming linear scaling without capacity constraints",
    ],
  },
  {
    id: "cost-structure",
    title: "Cost Structure",
    explanation:
      "Cost structure breaks down fixed vs variable costs. Fixed costs (rent, salaries) don't change with volume; variable costs (COGS, commissions) scale with output. Understanding the mix drives break-even and margin analysis.",
    example:
      "A manufacturer has 60% variable costs (materials, labor) and 40% fixed (plant, admin). At 80% capacity, gross margin compresses because fixed costs are spread over fewer units.",
    diagram: "Total Cost = Fixed + (Variable × Volume)",
    mistakes: [
      "Treating all costs as variable when some are step-fixed",
      "Ignoring cost behavior when forecasting at different volumes",
      "Overlooking hidden fixed costs in 'variable' categories",
    ],
  },
  {
    id: "unit-economics",
    title: "Unit Economics",
    explanation:
      "Unit economics measures profitability at the individual product or customer level. Key metrics: CAC (Customer Acquisition Cost), LTV (Lifetime Value), Contribution Margin per unit.",
    example:
      "CAC = $50, LTV = $200. LTV/CAC = 4x. A ratio above 3x usually indicates a healthy, scalable business model.",
    diagram: "LTV/CAC > 3x = Healthy | Contribution Margin = Price − Variable Cost",
    mistakes: [
      "Using blended CAC when channel economics differ significantly",
      "Overstating LTV by ignoring churn or discount rate",
      "Ignoring payback period (CAC / Monthly Contribution)",
    ],
  },
  {
    id: "market-sizing",
    title: "Market Sizing",
    explanation:
      "Market sizing estimates total addressable market (TAM), serviceable addressable market (SAM), and serviceable obtainable market (SOM). Top-down uses industry data; bottom-up uses unit economics × segments.",
    example:
      "TAM: $10B (all US coffee). SAM: $2B (premium coffee shops). SOM: $200M (realistic 3-year share at 10%).",
    diagram: "TAM → SAM → SOM (narrowing focus)",
    mistakes: [
      "Confusing TAM with realistic revenue opportunity",
      "Using outdated or biased industry reports",
      "Bottom-up without validating assumptions",
    ],
  },
  {
    id: "competitive-strategy",
    title: "Competitive Strategy",
    explanation:
      "Competitive strategy defines how a company wins vs rivals. Porter's generic strategies: cost leadership, differentiation, focus. Sustainable advantage requires defensible moats (network effects, brand, switching costs).",
    example:
      "A commodity producer competes on cost; a luxury brand on differentiation. Competing on both (stuck in the middle) often fails.",
    diagram: "Cost Leadership | Differentiation | Focus (Niche)",
    mistakes: [
      "Trying to be everything to everyone",
      "Underestimating competitor response",
      "Confusing tactics (temporary) with strategy (sustainable)",
    ],
  },
  {
    id: "pricing-strategy",
    title: "Pricing Strategy",
    explanation:
      "Pricing strategy balances value capture vs volume. Methods: cost-plus, value-based, competitive, penetration, skimming. Price elasticity determines how volume responds to price changes.",
    example:
      "Value-based pricing: charge based on customer willingness to pay. A productivity tool saving 10 hrs/week might justify $100/month even if COGS is $5.",
    diagram: "Price ↑ → Volume ↓ (elastic) | Price ↑ → Volume ~ (inelastic)",
    mistakes: [
      "Defaulting to cost-plus without testing willingness to pay",
      "Ignoring price sensitivity by segment",
      "Leaving money on the table with uniform pricing",
    ],
  },
  {
    id: "growth-vs-profitability",
    title: "Growth vs Profitability Tradeoffs",
    explanation:
      "Companies often face a tradeoff: invest in growth (marketing, R&D, expansion) at the expense of short-term profit, or optimize for margins and sacrifice growth. The right balance depends on stage, capital, and market.",
    example:
      "A startup may run at -20% margin to capture market share; a mature company may prioritize 15% margins and 5% growth.",
    diagram: "Growth Investment ↔ Margin Sacrifice | Stage-dependent",
    mistakes: [
      "Pursuing growth at any cost without path to profitability",
      "Over-optimizing margins and ceding market to competitors",
      "Not aligning growth strategy with available capital",
    ],
  },
  {
    id: "working-capital",
    title: "Working Capital Management",
    explanation:
      "Working capital = Current Assets − Current Liabilities. Key components: inventory, receivables, payables. CCC (Cash Conversion Cycle) = DSO + DIO − DPO measures how fast cash cycles. Negative WC can be a strength (collect before pay) or risk (liquidity).",
    example:
      "A retailer with DSO 30, DIO 45, DPO 60 has CCC = 15 days. Extending DPO or reducing DIO improves cash flow.",
    diagram: "CCC = DSO + DIO − DPO | Lower = Better cash efficiency",
    mistakes: [
      "Ignoring seasonality in WC requirements",
      "Optimizing one component at the expense of others",
      "Treating negative WC as always positive",
    ],
  },
  {
    id: "break-even-analysis",
    title: "Break-Even Analysis",
    explanation:
      "Break-even = Fixed Costs / (Price − Variable Cost per unit). At break-even, profit = 0. Contribution margin per unit drives how many units needed to cover fixed costs. Useful for pricing, capacity, and investment decisions.",
    example:
      "Fixed costs $100k, CM $20/unit → break-even = 5,000 units. Above that, each unit adds $20 to profit.",
    diagram: "Break-Even Units = Fixed Costs / Contribution Margin",
    mistakes: [
      "Assuming linear cost behavior at scale",
      "Ignoring opportunity cost of capital",
      "Using break-even as sole decision criterion",
    ],
  },
  {
    id: "customer-segmentation",
    title: "Customer Segmentation",
    explanation:
      "Segment customers by value, behavior, or needs. Pareto (80/20) often applies: few customers drive most revenue. High-value segments justify premium service; low-value may need self-serve or exit. LTV by segment informs acquisition spend.",
    example:
      "Enterprise (20% of customers, 70% of revenue) gets dedicated support; SMB gets scaled solutions.",
    diagram: "Segment → LTV, CAC, Churn → Strategy",
    mistakes: [
      "Over-segmenting without actionable differences",
      "Treating all segments equally",
      "Ignoring segment migration over time",
    ],
  },
  {
    id: "product-lifecycle",
    title: "Product Lifecycle",
    explanation:
      "Products move through introduction, growth, maturity, decline. Strategy differs by stage: invest in growth products; harvest mature; divest or reinvent declining. Portfolio balance matters for sustainable revenue.",
    example:
      "A mature cash cow funds R&D for new products. Killing a declining product too early loses profit; too late wastes resources.",
    diagram: "Intro → Growth → Maturity → Decline",
    mistakes: [
      "Over-investing in declining products",
      "Under-investing in growth opportunities",
      "Ignoring competitive dynamics by stage",
    ],
  },
  {
    id: "competitive-moats",
    title: "Competitive Moats",
    explanation:
      "Moats protect profits from competition: network effects, switching costs, brand, cost advantage, regulatory. Sustainable advantage requires defensibility. Weak moats get competed away.",
    example:
      "A SaaS with deep integrations has switching costs. A commodity with no moat competes on price alone.",
    diagram: "Moat Strength → Pricing Power → Margin Sustainability",
    mistakes: [
      "Confusing temporary advantage with moat",
      "Overestimating brand loyalty",
      "Ignoring disruptive threats",
    ],
  },
  {
    id: "scenario-analysis",
    title: "Scenario Analysis",
    explanation:
      "Build base, bull, bear cases for key drivers. Stress-test assumptions. Identify sensitivities. Used for planning, valuation, and risk management. Avoid single-point forecasts.",
    example:
      "Revenue: base 10% growth, bull 15%, bear 5%. Model impact on cash, margins, and funding needs.",
    diagram: "Base | Bull ↑ | Bear ↓ → Range of outcomes",
    mistakes: [
      "Making scenarios too similar (false precision)",
      "Ignoring correlation between drivers",
      "Anchoring on base case",
    ],
  },
  {
    id: "kpi-dashboards",
    title: "KPIs and Dashboards",
    explanation:
      "Leading vs lagging indicators. Revenue: ARR, MRR, churn, NRR. Efficiency: CAC, LTV, payback. Operational: DSO, DIO, inventory turns. Choose metrics that drive action and align with strategy.",
    example:
      "A subscription business tracks MRR, churn, NRR. A manufacturer tracks inventory turns, DSO.",
    diagram: "Strategy → KPIs → Targets → Action",
    mistakes: [
      "Too many KPIs (noise)",
      "Lagging-only (reactive)",
      "Vanity metrics over actionable ones",
    ],
  },
];

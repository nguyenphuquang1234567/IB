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
];

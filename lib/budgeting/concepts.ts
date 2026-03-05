export interface BudgetConcept {
  id: string;
  title: string;
  explanation: string;
  formula: string;
  example: string;
  mistakes: string[];
}

export const BUDGETING_CONCEPTS: BudgetConcept[] = [
  {
    id: "revenue",
    title: "Revenue Forecasting",
    explanation:
      "Revenue can be forecast using growth assumptions, sales pipeline analysis, or market demand projections. Top-down approaches use market size and share; bottom-up uses unit economics and volume.",
    formula: "Forecast Revenue = Last Year Revenue × (1 + Growth Rate)",
    example:
      "A company with $10M revenue and 8% expected growth: $10M × 1.08 = $10.8M next year.",
    mistakes: [
      "Using a single point estimate without sensitivity analysis",
      "Ignoring seasonality or cyclical trends",
      "Over-relying on historical growth without market validation",
    ],
  },
  {
    id: "cogs",
    title: "Cost of Goods Sold (COGS) Budgeting",
    explanation:
      "COGS represents direct costs of producing goods or services. It typically scales with revenue. COGS % helps maintain margin discipline.",
    formula: "COGS = Revenue × COGS %",
    example:
      "At 40% COGS and $10M revenue: COGS = $10M × 0.40 = $4M. Gross margin = 60%.",
    mistakes: [
      "Assuming COGS % stays flat when mix or input costs change",
      "Not accounting for volume discounts or supply chain risks",
      "Mixing fixed and variable cost behavior incorrectly",
    ],
  },
  {
    id: "opex",
    title: "Operating Expense Planning",
    explanation:
      "OpEx includes SG&A, R&D, and other non-production costs. Some are fixed (rent), others variable (sales commissions). Plan for step-changes when scaling.",
    formula: "OpEx Growth = Base OpEx × (1 + OpEx Growth Rate)",
    example:
      "OpEx of $2M growing 5%: $2M × 1.05 = $2.1M. Ensure it doesn't outpace revenue growth.",
    mistakes: [
      "OpEx growing faster than revenue (margin compression)",
      "Underestimating hiring and onboarding costs",
      "Ignoring inflation in salary and benefits",
    ],
  },
  {
    id: "capex",
    title: "CapEx Planning",
    explanation:
      "Capital expenditures fund long-term assets (PP&E, equipment). Unlike OpEx, CapEx is capitalized and depreciated over time. Plan for maintenance vs. growth CapEx.",
    formula: "Depreciation = Prior PP&E + CapEx − Disposals",
    example:
      "$5M PP&E, $1M CapEx, $0.5M depreciation: Net PP&E = $5M + $1M − $0.5M = $5.5M.",
    mistakes: [
      "Treating all CapEx as discretionary; maintenance CapEx is required",
      "Not aligning CapEx with strategic initiatives",
      "Underestimating lead times for equipment and construction",
    ],
  },
  {
    id: "wc",
    title: "Working Capital Forecasting",
    explanation:
      "Working capital = Current Assets − Current Liabilities. Forecast changes in AR, inventory, and AP. Revenue growth often drives WC needs (more AR, more inventory).",
    formula: "Δ Working Capital = Δ AR + Δ Inventory − Δ AP",
    example:
      "Revenue up 10% may require 10% more AR ($100K → $110K). If AP also grows, net WC increase is lower.",
    mistakes: [
      "Assuming WC scales linearly without efficiency gains",
      "Ignoring DSO, DIO, DPO improvements from process changes",
      "Not modeling cash conversion cycle explicitly",
    ],
  },
];

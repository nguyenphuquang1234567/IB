import type { LearningModule } from "./types";

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "revenue",
    title: "Revenue Projection",
    formula: "Revenue_n = Revenue_(n-1) × (1 + g)",
    explanation:
      "Revenue projection is the foundation of any DCF model. Analysts typically project revenue for 5-10 years based on historical growth rates, industry trends, and company-specific factors. The growth rate (g) should decline over time as companies mature and growth becomes harder to sustain.",
    example: {
      description: "Project Year 1 revenue from a $1,000 base with 10% growth",
      inputs: [
        { label: "Base Revenue (Year 0)", value: "$1,000" },
        { label: "Growth Rate (g)", value: "10%" },
      ],
      calculation: "Revenue_1 = $1,000 × (1 + 0.10) = $1,000 × 1.10",
      result: "$1,100",
    },
    commonMistakes: [
      "Using historical growth rates without considering industry saturation",
      "Projecting high growth indefinitely — mature companies grow at GDP rates (2-3%)",
      "Ignoring competitive dynamics that may compress future growth",
    ],
    quiz: [
      {
        question: "Revenue_n = Revenue_(n-1) × (1 + ___)",
        answer: "g",
        hint: "The growth rate",
      },
      {
        question: "If revenue is $500 and growth is 8%, Year 1 revenue = $___",
        answer: "540",
        hint: "$500 × 1.08",
      },
      {
        question: "Mature companies typically grow at ___-3% long-term",
        answer: "2",
        hint: "Approximately GDP growth",
      },
    ],
  },
  {
    id: "operating-profit",
    title: "Operating Profit",
    formula: "EBITDA = Revenue × EBITDA Margin\nEBIT = EBITDA − D&A",
    explanation:
      "Operating profit measures the profit from core business operations. EBITDA (Earnings Before Interest, Taxes, Depreciation & Amortization) shows operating cash profitability, while EBIT (Earnings Before Interest & Taxes) accounts for asset depreciation. Margins vary widely by industry — software (30-40%), retail (5-10%).",
    example: {
      description: "Calculate EBITDA and EBIT from revenue",
      inputs: [
        { label: "Revenue", value: "$1,100" },
        { label: "EBITDA Margin", value: "30%" },
        { label: "D&A as % of Revenue", value: "5%" },
      ],
      calculation:
        "EBITDA = $1,100 × 30% = $330\nD&A = $1,100 × 5% = $55\nEBIT = $330 − $55 = $275",
      result: "EBITDA = $330, EBIT = $275",
    },
    commonMistakes: [
      "Assuming margins stay constant — they often compress with competition",
      "Confusing EBITDA with EBIT (D&A is a real economic cost)",
      "Using industry averages without adjusting for company-specific factors",
    ],
    quiz: [
      {
        question: "EBITDA = Revenue × ___",
        answer: "EBITDA Margin",
        hint: "Operating margin percentage",
      },
      {
        question: "EBIT = EBITDA − ___",
        answer: "D&A",
        hint: "Non-cash charges",
      },
      {
        question: "Software companies typically have EBITDA margins of ___-40%",
        answer: "30",
        hint: "High-margin businesses",
      },
    ],
  },
  {
    id: "nopat",
    title: "NOPAT",
    formula: "NOPAT = EBIT × (1 − Tax Rate)",
    explanation:
      "NOPAT (Net Operating Profit After Tax) represents the profit available to all capital providers (debt + equity) after accounting for taxes. It's calculated by applying the tax rate to EBIT. NOPAT is crucial because it isolates operating performance from financing decisions.",
    example: {
      description: "Calculate NOPAT from EBIT",
      inputs: [
        { label: "EBIT", value: "$275" },
        { label: "Tax Rate", value: "25%" },
      ],
      calculation: "NOPAT = $275 × (1 − 0.25) = $275 × 0.75",
      result: "$206.25",
    },
    commonMistakes: [
      "Using the statutory tax rate instead of the effective tax rate",
      "Forgetting that NOPAT excludes interest tax shields (those are in WACC)",
      "Confusing NOPAT with Net Income (which includes interest expense)",
    ],
    quiz: [
      {
        question: "NOPAT = EBIT × (1 − ___)",
        answer: "Tax Rate",
        hint: "The government's cut",
      },
      {
        question: "If EBIT = $100 and tax rate = 20%, NOPAT = $___",
        answer: "80",
        hint: "$100 × 0.80",
      },
      {
        question: "NOPAT represents profit available to ___ capital providers",
        answer: "all",
        hint: "Both debt and equity",
      },
    ],
  },
  {
    id: "reinvestment",
    title: "Reinvestment",
    formula: "Reinvestment = CapEx − D&A + ΔNWC",
    explanation:
      "Reinvestment represents the cash a company must invest back into the business to maintain and grow operations. CapEx (Capital Expenditures) funds long-term assets, D&A is subtracted because it's a non-cash charge representing past CapEx, and ΔNWC (Change in Net Working Capital) captures cash tied up in operations.",
    example: {
      description: "Calculate reinvestment",
      inputs: [
        { label: "CapEx (8% of Revenue)", value: "$88" },
        { label: "D&A", value: "$55" },
        { label: "ΔNWC (10% of ΔRevenue)", value: "$10" },
      ],
      calculation: "Reinvestment = $88 − $55 + $10",
      result: "$43",
    },
    commonMistakes: [
      "Forgetting to add back D&A (it's a non-cash charge)",
      "Ignoring working capital changes for fast-growing companies",
      "Assuming CapEx equals D&A (only true for steady-state businesses)",
    ],
    quiz: [
      {
        question: "Reinvestment = ___ − D&A + ΔNWC",
        answer: "CapEx",
        hint: "Capital expenditures",
      },
      {
        question: "ΔNWC is positive when a company is ___ (growing/shrinking)",
        answer: "growing",
        hint: "Growth ties up cash in AR/inventory",
      },
      {
        question: "For a steady-state company, CapEx ≈ ___",
        answer: "D&A",
        hint: "Just replacing depreciated assets",
      },
    ],
  },
  {
    id: "fcf",
    title: "Free Cash Flow",
    formula: "FCF = NOPAT + D&A − CapEx − ΔNWC",
    explanation:
      "Unlevered Free Cash Flow (UFCF or FCF) is the cash generated by operations after all reinvestment, available to ALL capital providers. It starts with NOPAT, adds back D&A (non-cash), then subtracts CapEx and working capital increases. This is the core metric we discount in a DCF.",
    example: {
      description: "Calculate Free Cash Flow",
      inputs: [
        { label: "NOPAT", value: "$206.25" },
        { label: "D&A", value: "$55" },
        { label: "CapEx", value: "$88" },
        { label: "ΔNWC", value: "$10" },
      ],
      calculation: "FCF = $206.25 + $55 − $88 − $10",
      result: "$163.25",
    },
    commonMistakes: [
      "Using levered FCF (after interest) instead of unlevered FCF",
      "Forgetting to add back D&A — it's non-cash",
      "Not linking CapEx and D&A logically (CapEx eventually becomes D&A)",
    ],
    quiz: [
      {
        question: "FCF = ___ + D&A − CapEx − ΔNWC",
        answer: "NOPAT",
        hint: "After-tax operating profit",
      },
      {
        question: "D&A is ___ back because it's non-cash",
        answer: "added",
        hint: "Increases FCF",
      },
      {
        question: "Unlevered FCF is available to ___ capital providers",
        answer: "all",
        hint: "Debt + equity",
      },
    ],
  },
  {
    id: "wacc",
    title: "WACC",
    formula: "WACC = (E/V) × Rₑ + (D/V) × Rᵈ × (1 − t)",
    explanation:
      "WACC (Weighted Average Cost of Capital) is the blended rate of return required by all capital providers. It weights the cost of equity (Rₑ) and after-tax cost of debt (Rᵈ × (1−t)) by their proportions in the capital structure. Debt gets a tax shield because interest is tax-deductible.",
    example: {
      description: "Calculate WACC",
      inputs: [
        { label: "Equity Weight (E/V)", value: "70%" },
        { label: "Cost of Equity (Rₑ)", value: "12%" },
        { label: "Debt Weight (D/V)", value: "30%" },
        { label: "Cost of Debt (Rᵈ)", value: "5%" },
        { label: "Tax Rate", value: "25%" },
      ],
      calculation:
        "WACC = 70% × 12% + 30% × 5% × (1 − 25%)\nWACC = 8.4% + 1.125%",
      result: "9.525%",
    },
    commonMistakes: [
      "Using book value instead of market value for weights",
      "Forgetting the tax shield on debt: (1 − t)",
      "Using the company's historical cost of debt instead of current market rates",
    ],
    quiz: [
      {
        question: "WACC = (E/V) × Rₑ + (D/V) × Rᵈ × (1 − ___)",
        answer: "t",
        hint: "Tax rate",
      },
      {
        question: "Debt gets a tax ___ because interest is deductible",
        answer: "shield",
        hint: "Reduces the effective cost",
      },
      {
        question: "Capital structure weights should use ___ values",
        answer: "market",
        hint: "Not book values",
      },
    ],
  },
  {
    id: "terminal-value",
    title: "Terminal Value",
    formula:
      "TV (Gordon) = FCF₅ × (1 + g) / (WACC − g)\nTV (Exit) = EBITDA₅ × Multiple",
    explanation:
      "Terminal Value captures all cash flows beyond the projection period. Gordon Growth assumes perpetual growth at rate g (must be < WACC and typically 2-3%). Exit Multiple assumes the business is sold at a market multiple of EBITDA. TV often represents 60-80% of total DCF value — small assumption changes have big impacts.",
    example: {
      description: "Calculate Terminal Value (both methods)",
      inputs: [
        { label: "Year 5 FCF", value: "$200" },
        { label: "Terminal Growth (g)", value: "3%" },
        { label: "WACC", value: "10%" },
        { label: "Year 5 EBITDA", value: "$400" },
        { label: "Exit Multiple", value: "10x" },
      ],
      calculation:
        "TV (Gordon) = $200 × 1.03 / (0.10 − 0.03) = $206 / 0.07 = $2,943\nTV (Exit) = $400 × 10 = $4,000",
      result: "Gordon: $2,943 | Exit Multiple: $4,000",
    },
    commonMistakes: [
      "Setting terminal growth > WACC (formula breaks)",
      "Using terminal growth above long-term GDP (2-3%)",
      "Not sanity-checking that TV % of EV is reasonable (60-80%)",
    ],
    quiz: [
      {
        question: "TV (Gordon) = FCF₅ × (1 + g) / (___ − g)",
        answer: "WACC",
        hint: "Discount rate",
      },
      {
        question: "Terminal growth must be ___ than WACC",
        answer: "less",
        hint: "Otherwise formula is invalid",
      },
      {
        question: "Terminal value typically accounts for ___-80% of DCF value",
        answer: "60",
        hint: "A large portion",
      },
    ],
  },
  {
    id: "enterprise-value",
    title: "Enterprise Value",
    formula: "EV = Σ PV(FCF₁₋₅) + PV(Terminal Value)",
    explanation:
      "Enterprise Value is the sum of the present values of all projected free cash flows plus the present value of the terminal value. Each FCF is discounted by (1 + WACC)ⁿ where n is the year. EV represents the value of the entire business to all capital providers.",
    example: {
      description: "Calculate Enterprise Value",
      inputs: [
        { label: "Sum of PV(FCF Years 1-5)", value: "$600" },
        { label: "Terminal Value", value: "$2,943" },
        { label: "WACC", value: "10%" },
        { label: "Year 5 Discount Factor", value: "0.621" },
      ],
      calculation:
        "PV of TV = $2,943 × 0.621 = $1,828\nEV = $600 + $1,828",
      result: "$2,428",
    },
    commonMistakes: [
      "Forgetting to discount the terminal value back to Year 0",
      "Using different discount rates for FCF vs terminal value",
      "Adding non-operating assets to EV without proper adjustments",
    ],
    quiz: [
      {
        question: "EV = Σ PV(FCF) + PV(___)",
        answer: "Terminal Value",
        hint: "Value beyond projection period",
      },
      {
        question: "The discount factor for Year 3 at 10% WACC = 1/(1.10)^___",
        answer: "3",
        hint: "The year number",
      },
      {
        question: "A ___ WACC results in a lower Enterprise Value",
        answer: "higher",
        hint: "Inverse relationship",
      },
    ],
  },
  {
    id: "equity-value",
    title: "Equity Value",
    formula: "Equity Value = EV − Net Debt + Non-Operating Assets",
    explanation:
      "Equity Value is what shareholders own after paying off debt holders. Start with Enterprise Value, subtract Net Debt (Total Debt − Cash), and add any non-operating assets (investments, excess cash). This is the intrinsic value that should be compared to market capitalization.",
    example: {
      description: "Calculate Equity Value from Enterprise Value",
      inputs: [
        { label: "Enterprise Value", value: "$2,428" },
        { label: "Total Debt", value: "$500" },
        { label: "Cash", value: "$200" },
        { label: "Non-Operating Assets", value: "$50" },
      ],
      calculation:
        "Net Debt = $500 − $200 = $300\nEquity Value = $2,428 − $300 + $50",
      result: "$2,178",
    },
    commonMistakes: [
      "Forgetting to subtract debt (EV is for all capital providers)",
      "Not adding back excess cash / non-operating assets",
      "Confusing EV and Equity Value in comparable analysis",
    ],
    quiz: [
      {
        question: "Equity Value = EV − ___ + Non-Operating Assets",
        answer: "Net Debt",
        hint: "What you owe minus what you have",
      },
      {
        question: "Net Debt = Total Debt − ___",
        answer: "Cash",
        hint: "Liquid assets",
      },
      {
        question: "Equity Value should be compared to market ___",
        answer: "capitalization",
        hint: "Share price × shares outstanding",
      },
    ],
  },
];

export interface CapitalStructureConcept {
  id: string;
  title: string;
  explanation: string;
  formula: string;
  example: string;
  mistakes: string[];
}

export const CAPITAL_STRUCTURE_CONCEPTS: CapitalStructureConcept[] = [
  {
    id: "cost-of-debt",
    title: "Cost of Debt",
    explanation:
      "Cost of debt is the effective interest rate a company pays on its borrowings. It is typically lower than cost of equity because debt holders have priority in bankruptcy. After-tax cost of debt = Pre-tax rate × (1 − Tax Rate).",
    formula: "After-Tax Cost of Debt = rd × (1 − Tax Rate)",
    example: "A company borrows at 6% with a 25% tax rate: 6% × (1 − 0.25) = 4.5% after-tax.",
    mistakes: [
      "Using book value of debt instead of market value",
      "Ignoring the tax shield benefit",
      "Not accounting for different debt tranches (senior, subordinated)",
    ],
  },
  {
    id: "cost-of-equity",
    title: "Cost of Equity",
    explanation:
      "Cost of equity is the return required by shareholders. It is typically estimated using CAPM: Re = Rf + β(Rm − Rf). Higher beta means higher cost of equity.",
    formula: "Re = Rf + β × (Rm − Rf)",
    example: "Rf = 4%, β = 1.2, Rm − Rf = 6%: Re = 4% + 1.2 × 6% = 11.2%",
    mistakes: [
      "Using historical beta without adjusting for leverage",
      "Assuming risk-free rate is static",
      "Ignoring country or size premiums",
    ],
  },
  {
    id: "wacc",
    title: "Weighted Average Cost of Capital (WACC)",
    explanation:
      "WACC is the blended cost of all capital sources—debt and equity—weighted by their proportion in the capital structure. It is used to discount future cash flows in DCF valuation.",
    formula: "WACC = (E/V) × Re + (D/V) × Rd × (1 − Tc)",
    example: "E/V = 60%, D/V = 40%, Re = 12%, Rd = 5%, Tc = 25%: WACC = 0.6×12% + 0.4×5%×0.75 = 9.9%",
    mistakes: [
      "Using book values instead of market values for weights",
      "Mixing pre-tax and after-tax rates incorrectly",
      "Applying WACC to wrong cash flow type (FCFF vs FCFE)",
    ],
  },
  {
    id: "optimal-structure",
    title: "Optimal Capital Structure",
    explanation:
      "The optimal mix of debt and equity balances tax benefits of debt against financial distress costs. Trade-off theory: more debt lowers WACC (tax shield) but increases bankruptcy risk.",
    formula: "Value = Unlevered Value + PV(Tax Shield) − PV(Financial Distress)",
    example: "A firm may target 40% debt to capture tax benefits while staying within covenant limits.",
    mistakes: [
      "Ignoring industry norms and peer benchmarks",
      "Over-leveraging in cyclical industries",
      "Not stress-testing interest coverage",
    ],
  },
  {
    id: "leverage",
    title: "Financial Leverage",
    explanation:
      "Leverage amplifies returns: when ROA > cost of debt, adding debt increases ROE. But it also amplifies losses. Debt/EBITDA and Interest Coverage are key metrics.",
    formula: "ROE = ROA + (ROA − rd) × (D/E)",
    example: "ROA = 10%, rd = 5%, D/E = 1: ROE = 10% + (10%−5%)×1 = 15%",
    mistakes: [
      "Ignoring covenant headroom and refinancing risk",
      "Assuming leverage is always value-creating",
      "Not modeling downside scenarios",
    ],
  },
  {
    id: "interest-coverage",
    title: "Interest Coverage Ratio",
    explanation:
      "Interest Coverage = EBIT / Interest Expense. Measures ability to service debt. Lenders typically require 2–3x minimum. Below 1x means the company cannot cover interest from operating profit.",
    formula: "Interest Coverage = EBIT / Interest Expense",
    example: "EBIT $50M, Interest $15M: Coverage = 50/15 = 3.3x",
    mistakes: [
      "Using EBITDA instead of EBIT (excludes D&A)",
      "Ignoring upcoming debt maturities",
      "Not stress-testing in a downturn",
    ],
  },
  {
    id: "pecking-order",
    title: "Pecking Order Theory",
    explanation:
      "Companies prefer internal financing (retained earnings), then debt, then equity. Asymmetric information: equity issuance may signal overvaluation. Explains why profitable firms use less debt.",
    formula: "Financing Order: Retained Earnings → Debt → Equity",
    example: "A cash-rich company may avoid debt even if WACC could be lower.",
    mistakes: [
      "Assuming all firms target optimal structure",
      "Ignoring management's risk tolerance",
      "Not considering market timing",
    ],
  },
];

export function computeWACC(
  equityValue: number,
  debtValue: number,
  costOfEquity: number,
  costOfDebt: number,
  taxRate: number
): number {
  const total = equityValue + debtValue;
  if (total === 0) return 0;
  const we = equityValue / total;
  const wd = debtValue / total;
  return we * costOfEquity + wd * costOfDebt * (1 - taxRate / 100);
}

export function firmValueFromFCFF(fcff: number, wacc: number, growth: number): number {
  if (wacc <= growth) return 0;
  return fcff / ((wacc - growth) / 100);
}

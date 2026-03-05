export interface PerformanceConcept {
  id: string;
  title: string;
  explanation: string;
  formula: string;
  example: string;
  mistakes: string[];
}

export const PERFORMANCE_CONCEPTS: PerformanceConcept[] = [
  {
    id: "gross-margin",
    title: "Gross Margin",
    explanation:
      "Gross margin = (Revenue − COGS) / Revenue. It measures profitability at the product level before operating expenses. Higher margins indicate pricing power or cost efficiency.",
    formula: "Gross Margin % = (Revenue − COGS) / Revenue × 100",
    example: "Revenue $10M, COGS $4M: Gross Margin = (10−4)/10 = 60%",
    mistakes: [
      "Comparing margins across different industries",
      "Ignoring mix shift effects",
      "Not adjusting for one-time items",
    ],
  },
  {
    id: "operating-margin",
    title: "Operating Margin",
    explanation:
      "Operating margin = EBIT / Revenue. It reflects profitability after all operating costs. Useful for comparing operational efficiency across companies.",
    formula: "Operating Margin % = EBIT / Revenue × 100",
    example: "Revenue $10M, EBIT $1.5M: Operating Margin = 15%",
    mistakes: [
      "Including non-recurring items in EBIT",
      "Ignoring depreciation policy differences",
      "Not normalizing for different business models",
    ],
  },
  {
    id: "roa",
    title: "Return on Assets (ROA)",
    explanation:
      "ROA = Net Income / Total Assets. Measures how efficiently a company uses its assets to generate profit. Higher ROA indicates better asset utilization.",
    formula: "ROA = Net Income / Average Total Assets × 100",
    example: "NI $2M, Assets $20M: ROA = 10%",
    mistakes: [
      "Using end-of-period assets instead of average",
      "Ignoring off-balance-sheet assets",
      "Comparing ROA across different capital structures",
    ],
  },
  {
    id: "roic",
    title: "Return on Invested Capital (ROIC)",
    explanation:
      "ROIC = NOPAT / Invested Capital. Invested Capital = Equity + Debt − Cash. ROIC measures return on all capital employed, independent of financing mix.",
    formula: "ROIC = NOPAT / (Equity + Debt − Cash) × 100",
    example: "NOPAT $3M, IC $25M: ROIC = 12%",
    mistakes: [
      "Using GAAP earnings instead of NOPAT",
      "Including excess cash in invested capital",
      "Not adjusting for operating leases",
    ],
  },
  {
    id: "roe",
    title: "Return on Equity (ROE)",
    explanation:
      "ROE = Net Income / Shareholders' Equity. Measures profitability from shareholders' perspective. DuPont analysis: ROE = Net Margin × Asset Turnover × Equity Multiplier.",
    formula: "ROE = Net Income / Average Equity × 100",
    example: "NI $2M, Equity $20M: ROE = 10%",
    mistakes: [
      "Using end-of-period equity instead of average",
      "Ignoring one-time items in net income",
      "Not decomposing ROE for drivers",
    ],
  },
  {
    id: "ebitda-margin",
    title: "EBITDA Margin",
    explanation:
      "EBITDA Margin = EBITDA / Revenue. Measures operating profitability before interest, taxes, D&A. Useful for comparing companies with different depreciation and leverage.",
    formula: "EBITDA Margin % = EBITDA / Revenue × 100",
    example: "Revenue $100M, EBITDA $25M: Margin = 25%",
    mistakes: [
      "Comparing EBITDA margin across different industries",
      "Ignoring that EBITDA is not cash flow",
      "Not adjusting for one-time items",
    ],
  },
];

export interface CompanyData {
  id: string;
  name: string;
  revenue: number;
  cogs: number;
  opex: number;
  ebit: number;
  netIncome: number;
  totalAssets: number;
  equity: number;
  debt: number;
  cash: number;
}

export function computeGrossMargin(revenue: number, cogs: number): number {
  return revenue > 0 ? ((revenue - cogs) / revenue) * 100 : 0;
}

export function computeOperatingMargin(revenue: number, ebit: number): number {
  return revenue > 0 ? (ebit / revenue) * 100 : 0;
}

export function computeROA(netIncome: number, totalAssets: number): number {
  return totalAssets > 0 ? (netIncome / totalAssets) * 100 : 0;
}

export function computeROIC(nopat: number, investedCapital: number): number {
  return investedCapital > 0 ? (nopat / investedCapital) * 100 : 0;
}

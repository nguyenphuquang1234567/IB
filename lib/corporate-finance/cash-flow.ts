export interface CashFlowConcept {
  id: string;
  title: string;
  explanation: string;
  formula: string;
  example: string;
  mistakes: string[];
}

export const CASH_FLOW_CONCEPTS: CashFlowConcept[] = [
  {
    id: "ocf",
    title: "Operating Cash Flow",
    explanation:
      "Operating cash flow (OCF) is cash generated from core business operations. OCF = EBIT + D&A − ΔNWC − CapEx (simplified). It reflects the company's ability to fund operations without external financing.",
    formula: "OCF = EBIT + D&A − Taxes − ΔNWC",
    example: "EBIT $100, D&A $20, Taxes $25, ΔNWC −$5: OCF = 100 + 20 − 25 − (−5) = $100",
    mistakes: [
      "Confusing EBITDA with operating cash flow",
      "Ignoring working capital changes",
      "Not adjusting for non-cash items",
    ],
  },
  {
    id: "working-capital",
    title: "Working Capital Management",
    explanation:
      "Working capital = Current Assets − Current Liabilities. Key components: receivables, inventory, payables. Reducing CCC (cash conversion cycle) improves liquidity.",
    formula: "ΔNWC = ΔReceivables + ΔInventory − ΔPayables",
    example: "Receivables +$10, Inventory +$5, Payables +$8: ΔNWC = 10 + 5 − 8 = $7 (cash use)",
    mistakes: [
      "Growing receivables faster than revenue",
      "Overstocking inventory",
      "Stretching payables too far (supplier risk)",
    ],
  },
  {
    id: "ccc",
    title: "Cash Conversion Cycle",
    explanation:
      "CCC measures days from paying suppliers to collecting from customers. CCC = DSO + DIO − DPO. Shorter CCC means faster cash generation.",
    formula: "CCC = DSO + DIO − DPO",
    example: "DSO=45, DIO=60, DPO=30: CCC = 45 + 60 − 30 = 75 days",
    mistakes: [
      "Ignoring seasonality in CCC",
      "Optimizing one component at the expense of others",
      "Not benchmarking against industry",
    ],
  },
  {
    id: "liquidity-risk",
    title: "Liquidity Risk",
    explanation:
      "Liquidity risk is the inability to meet short-term obligations. Key ratios: Current Ratio, Quick Ratio, Cash Ratio. Stress-test with revenue decline or delayed collections.",
    formula: "Current Ratio = Current Assets / Current Liabilities",
    example: "CA=$200, CL=$100: Current Ratio = 2.0. Quick = (200−80)/100 = 1.2 excluding inventory.",
    mistakes: [
      "Relying only on current ratio (inventory may be illiquid)",
      "Ignoring off-balance-sheet commitments",
      "Not modeling covenant breaches",
    ],
  },
  {
    id: "free-cash-flow",
    title: "Free Cash Flow (FCF)",
    explanation:
      "FCF = OCF − CapEx. Represents cash available to debt and equity holders. Used in DCF valuation. Unlevered FCF (UFCF) is before interest; Levered FCF (LFCF) is after interest.",
    formula: "FCF = OCF − CapEx = EBIT(1−T) + D&A − ΔNWC − CapEx",
    example: "OCF $120, CapEx $40: FCF = $80. This can pay dividends or debt.",
    mistakes: [
      "Confusing FCF with net income",
      "Including growth CapEx in maintenance CapEx",
      "Using wrong FCF type for valuation (UFCF vs LFCF)",
    ],
  },
  {
    id: "cash-burn",
    title: "Cash Burn and Runway",
    explanation:
      "Cash burn = negative operating cash flow. Runway = Cash / Monthly Burn. Startups and distressed firms track this closely. Reducing burn extends runway.",
    formula: "Runway (months) = Cash Balance / Monthly Cash Burn",
    example: "Cash $24M, monthly burn $2M: Runway = 12 months.",
    mistakes: [
      "Ignoring one-time vs recurring burn",
      "Not modeling revenue ramp or cost cuts",
      "Assuming burn is constant",
    ],
  },
];

export function computeOCF(
  ebit: number,
  da: number,
  taxes: number,
  deltaNWC: number
): number {
  return ebit + da - taxes - deltaNWC;
}

export function computeCCC(dso: number, dio: number, dpo: number): number {
  return dso + dio - dpo;
}

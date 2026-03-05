export interface PracticeQuestion {
  id: string;
  lab: "capital-structure" | "investment" | "cash-flow" | "performance";
  question: string;
  answer: number;
  unit: string;
  explanation: string;
  formula: string;
}

export const CAPITAL_STRUCTURE_PRACTICE: PracticeQuestion[] = [
  {
    id: "cs1",
    lab: "capital-structure",
    question: "Debt costs 6% pre-tax, tax rate 25%. What is the after-tax cost of debt?",
    answer: 4.5,
    unit: "%",
    explanation: "After-tax rd = 6% × (1 − 0.25) = 4.5%",
    formula: "rd × (1 − Tc)",
  },
  {
    id: "cs2",
    lab: "capital-structure",
    question: "E/V = 60%, D/V = 40%, Re = 12%, Rd = 5% after-tax. What is WACC?",
    answer: 9.2,
    unit: "%",
    explanation: "WACC = 0.6×12% + 0.4×5% = 7.2% + 2% = 9.2%",
    formula: "We×Re + Wd×Rd",
  },
  {
    id: "cs3",
    lab: "capital-structure",
    question: "Equity $600M, Debt $400M. What is the debt-to-equity ratio?",
    answer: 0.67,
    unit: "x",
    explanation: "D/E = 400/600 = 0.67x (round to 2 decimals)",
    formula: "Debt / Equity",
  },
];

export const INVESTMENT_PRACTICE: PracticeQuestion[] = [
  {
    id: "inv1",
    lab: "investment",
    question: "Initial investment $100, CF1=$40, CF2=$50, r=10%. What is NPV?",
    answer: -22,
    unit: "$",
    explanation: "NPV = 40/1.1 + 50/1.21 − 100 = 36.4 + 41.3 − 100 = −22.3 ≈ −22",
    formula: "Σ CFt/(1+r)^t − Initial",
  },
  {
    id: "inv2",
    lab: "investment",
    question: "Initial $200, annual CF $60 for 4 years. What is payback in years?",
    answer: 3.33,
    unit: "yrs",
    explanation: "Cumulative: 60, 120, 180, 240. Payback = 3 + (200−180)/60 = 3.33 years",
    formula: "Years to recover initial",
  },
  {
    id: "inv3",
    lab: "investment",
    question: "Project NPV = $50, WACC = 10%. Should the company invest? (1=Yes, 0=No)",
    answer: 1,
    unit: "",
    explanation: "NPV > 0 means the project creates value. Invest.",
    formula: "Accept if NPV > 0",
  },
];

export const CASH_FLOW_PRACTICE: PracticeQuestion[] = [
  {
    id: "cf1",
    lab: "cash-flow",
    question: "EBIT $80, D&A $15, Taxes $20, ΔNWC $10. What is OCF?",
    answer: 65,
    unit: "$",
    explanation: "OCF = 80 + 15 − 20 − 10 = $65",
    formula: "EBIT + D&A − Taxes − ΔNWC",
  },
  {
    id: "cf2",
    lab: "cash-flow",
    question: "DSO=40, DIO=50, DPO=25. What is Cash Conversion Cycle (days)?",
    answer: 65,
    unit: "days",
    explanation: "CCC = 40 + 50 − 25 = 65 days",
    formula: "DSO + DIO − DPO",
  },
  {
    id: "cf3",
    lab: "cash-flow",
    question: "Current Assets $150, Current Liabilities $100. What is Current Ratio?",
    answer: 1.5,
    unit: "x",
    explanation: "Current Ratio = 150/100 = 1.5x",
    formula: "CA / CL",
  },
];

export const PERFORMANCE_PRACTICE: PracticeQuestion[] = [
  {
    id: "perf1",
    lab: "performance",
    question: "Revenue $8M, COGS $3.2M. What is Gross Margin %?",
    answer: 60,
    unit: "%",
    explanation: "Gross Margin = (8−3.2)/8 = 60%",
    formula: "(Revenue − COGS) / Revenue × 100",
  },
  {
    id: "perf2",
    lab: "performance",
    question: "Net Income $2M, Total Assets $25M. What is ROA %?",
    answer: 8,
    unit: "%",
    explanation: "ROA = 2/25 × 100 = 8%",
    formula: "NI / Assets × 100",
  },
  {
    id: "perf3",
    lab: "performance",
    question: "Revenue $10M, EBIT $1.2M. What is Operating Margin %?",
    answer: 12,
    unit: "%",
    explanation: "Operating Margin = 1.2/10 × 100 = 12%",
    formula: "EBIT / Revenue × 100",
  },
];

export const ALL_PRACTICE: PracticeQuestion[] = [
  ...CAPITAL_STRUCTURE_PRACTICE,
  ...INVESTMENT_PRACTICE,
  ...CASH_FLOW_PRACTICE,
  ...PERFORMANCE_PRACTICE,
];

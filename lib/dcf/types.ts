export interface Assumptions {
  baseRevenue: number;
  revenueGrowth: number;
  ebitdaMargin: number;
  daPercent: number;
  taxRate: number;
  capexPercent: number;
  nwcPercent: number;
  wacc: number;
  terminalGrowth: number;
  exitMultiple: number;
}

export interface YearProjection {
  year: number;
  revenue: number;
  ebitda: number;
  da: number;
  ebit: number;
  taxes: number;
  nopat: number;
  capex: number;
  nwcChange: number;
  ufcf: number;
}

export interface DCFOutput {
  years: YearProjection[];
  tvGordon: number;
  tvExit: number;
  pvFactors: number[];
  pvFCFs: number[];
  sumPvFCF: number;
  pvTvGordon: number;
  pvTvExit: number;
  evGordon: number;
  evExit: number;
  evAverage: number;
  tvPercentGordon: number;
  tvPercentExit: number;
}

export interface Warning {
  id: string;
  type: "info" | "warning" | "error";
  message: string;
}

export interface Feedback {
  id: string;
  type: "positive" | "neutral" | "negative";
  message: string;
}

export interface SensitivityCell {
  wacc: number;
  terminalGrowth: number;
  ev: number;
  isCurrent: boolean;
}

export interface SensitivityGrid {
  waccRange: number[];
  growthRange: number[];
  cells: SensitivityCell[][];
  minEV: number;
  maxEV: number;
}

export interface LearningModule {
  id: string;
  title: string;
  formula: string;
  explanation: string;
  example: {
    description: string;
    inputs: { label: string; value: number | string }[];
    calculation: string;
    result: string;
  };
  commonMistakes: string[];
  quiz: {
    question: string;
    answer: string;
    hint: string;
  }[];
}

export interface HistoricalYear {
  year: number;
  revenue: number;
  ebit: number;
  da: number;
  capex: number;
  nwc: number;
}

export interface CompanyCase {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  description: string;
  historicalData: HistoricalYear[];
  sectorAvgWacc: number;
  analystConsensusGrowth: number;
  referenceEVRange: [number, number];
}

export interface BuildStep {
  id: number;
  title: string;
  description: string;
  fields: (keyof Assumptions)[];
  thinkingPrompt?: {
    question: string;
    context: string;
  };
}

export const DEFAULT_ASSUMPTIONS: Assumptions = {
  baseRevenue: 1000,
  revenueGrowth: 10,
  ebitdaMargin: 30,
  daPercent: 5,
  taxRate: 25,
  capexPercent: 8,
  nwcPercent: 10,
  wacc: 10,
  terminalGrowth: 3,
  exitMultiple: 10,
};

export const ASSUMPTION_FIELDS: {
  key: keyof Assumptions;
  label: string;
  suffix: string;
  min?: number;
  max?: number;
  step?: number;
}[] = [
  { key: "baseRevenue", label: "Base Revenue (Year 0)", suffix: "$", min: 0, step: 100 },
  { key: "revenueGrowth", label: "Revenue Growth Rate", suffix: "%", min: -20, max: 50, step: 0.5 },
  { key: "ebitdaMargin", label: "EBITDA Margin", suffix: "%", min: 0, max: 60, step: 0.5 },
  { key: "daPercent", label: "D&A as % of Revenue", suffix: "%", min: 0, max: 20, step: 0.5 },
  { key: "taxRate", label: "Tax Rate", suffix: "%", min: 0, max: 50, step: 1 },
  { key: "capexPercent", label: "CapEx as % of Revenue", suffix: "%", min: 0, max: 30, step: 0.5 },
  { key: "nwcPercent", label: "ΔNWC as % of Rev Change", suffix: "%", min: 0, max: 30, step: 0.5 },
  { key: "wacc", label: "WACC", suffix: "%", min: 4, max: 20, step: 0.5 },
  { key: "terminalGrowth", label: "Terminal Growth Rate", suffix: "%", min: 0, max: 5, step: 0.25 },
  { key: "exitMultiple", label: "Exit Multiple (EV/EBITDA)", suffix: "x", min: 4, max: 20, step: 0.5 },
];

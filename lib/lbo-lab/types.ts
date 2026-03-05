export interface LBOAssumptions {
  purchasePrice: number;
  entryEbitda: number;
  exitEbitda: number;
  debtAmount: number;
  equityAmount: number;
  holdPeriod: number;
  exitMultiple: number;
}

export interface LBOOutput {
  entryEv: number;
  entryMultiple: number;
  exitEv: number;
  exitMultiple: number;
  moic: number;
  irr: number;
  debtPaydown: number;
}

/** Advanced LBO model inputs */
export interface AdvancedLBOInputs {
  purchasePrice: number;
  entryEbitda: number;
  entryRevenue: number; // $M, for FCF projections
  revenueGrowth: number; // % per year
  ebitdaMarginExpansion: number; // pp per year (e.g. 0.5 = +0.5pp)
  seniorDebt: number;
  subordinatedDebt: number;
  equityAmount: number;
  holdPeriod: number;
  exitMultiple: number;
  interestRateSenior: number; // %
  interestRateSub: number; // %
  capexPercentRevenue: number; // %
  dAPercentRevenue: number; // %
}

/** Year-by-year projection */
export interface YearProjection {
  year: number;
  revenue: number;
  ebitda: number;
  ebitdaMargin: number;
  interest: number;
  fcf: number;
  debtBalance: number;
  debtPaydown: number;
}

/** Cash flow waterfall item */
export interface WaterfallItem {
  label: string;
  value: number;
  type: "inflow" | "outflow" | "net";
}

/** Value creation driver */
export type ValueCreationDriver =
  | "operational-efficiency"
  | "pricing-power"
  | "cost-reduction"
  | "strategic-acquisitions"
  | "market-expansion";

export interface ValueCreationInputs {
  revenueGrowth: number; // % annual
  marginExpansion: number; // pp annual
  driver: ValueCreationDriver;
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
  quiz: { question: string; answer: string; hint: string }[];
}

export const DEFAULT_LBO_ASSUMPTIONS: LBOAssumptions = {
  purchasePrice: 1000,
  entryEbitda: 100,
  exitEbitda: 120,
  debtAmount: 600,
  equityAmount: 400,
  holdPeriod: 5,
  exitMultiple: 10,
};

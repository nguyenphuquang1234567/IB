export interface CompCompany {
  id: string;
  name: string;
  ticker: string;
  ev: number;
  revenue: number;
  ebitda: number;
  netIncome: number;
  shares: number;
}

export interface CompsAssumptions {
  targetRevenue: number;
  targetEbitda: number;
  targetNetIncome: number;
  evEbitdaMultiple: number;
  evRevenueMultiple: number;
  peMultiple: number;
}

export interface CompsOutput {
  evFromEbitda: number;
  evFromRevenue: number;
  equityFromPe: number;
  evRange: [number, number];
  impliedMultiple: number;
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

export const DEFAULT_COMPASSUMPTIONS: CompsAssumptions = {
  targetRevenue: 1000,
  targetEbitda: 150,
  targetNetIncome: 80,
  evEbitdaMultiple: 10,
  evRevenueMultiple: 3,
  peMultiple: 15,
};

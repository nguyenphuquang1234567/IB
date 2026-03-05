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

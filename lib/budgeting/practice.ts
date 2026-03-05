export interface PracticeQuestion {
  id: string;
  question: string;
  answer: number;
  unit: string;
  explanation: string;
  formula: string;
}

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: "p1",
    question: "A company has revenue of $1,000 this year and expects 8% growth. What is next year's revenue forecast?",
    answer: 1080,
    unit: "$",
    explanation: "Forecast Revenue = Last Year × (1 + Growth Rate) = $1,000 × 1.08 = $1,080",
    formula: "Revenue × (1 + Growth %)",
  },
  {
    id: "p2",
    question: "Revenue is $5M and COGS is 45%. What is Gross Profit?",
    answer: 2750000,
    unit: "$",
    explanation: "COGS = $5M × 0.45 = $2.25M. Gross Profit = $5M − $2.25M = $2.75M",
    formula: "Revenue × (1 − COGS %)",
  },
  {
    id: "p3",
    question: "Budget was $800K, Actual was $750K. What is the variance (Actual − Budget)?",
    answer: -50000,
    unit: "$",
    explanation: "Variance = Actual − Budget = $750K − $800K = −$50K (unfavorable for revenue)",
    formula: "Actual − Budget",
  },
  {
    id: "p4",
    question: "Budget was $200K, Actual was $230K. What is the variance %?",
    answer: 15,
    unit: "%",
    explanation: "Variance = $230K − $200K = $30K. Variance % = ($30K / $200K) × 100 = 15%",
    formula: "(Variance / Budget) × 100",
  },
  {
    id: "p5",
    question: "Revenue $10M, COGS 40%, OpEx $2.5M. What is EBITDA?",
    answer: 3500000,
    unit: "$",
    explanation: "Gross Profit = $10M × 0.60 = $6M. EBITDA = $6M − $2.5M = $3.5M",
    formula: "Revenue × (1 − COGS %) − OpEx",
  },
];

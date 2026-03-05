export interface DataExercise {
  id: string;
  title: string;
  data: { quarter: string; revenue: number; marketingSpend: number; profit: number }[];
  question: string;
  choices: string[];
  correct: string;
  reasoning: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export const DATA_EXERCISES: DataExercise[] = [
  {
    id: "profit-decline",
    title: "Profit Decline Analysis",
    data: [
      { quarter: "Q1", revenue: 100, marketingSpend: 20, profit: 10 },
      { quarter: "Q2", revenue: 120, marketingSpend: 30, profit: 12 },
      { quarter: "Q3", revenue: 130, marketingSpend: 45, profit: 8 },
    ],
    question: "Why did profit decline in Q3?",
    choices: [
      "Revenue declined",
      "Marketing spend increased faster than revenue; margin compression",
      "Fixed costs rose",
      "One-time restructuring charge",
    ],
    correct: "Marketing spend increased faster than revenue; margin compression",
    reasoning:
      "Revenue grew 8% (120→130) but marketing grew 50% (30→45). Profit margin fell as marketing consumed a larger share of revenue. Revenue/Profit ratio: Q2 = 10:1, Q3 = 16:1.",
    difficulty: "Intermediate",
  },
  {
    id: "revenue-driver",
    title: "Revenue Growth Driver",
    data: [
      { quarter: "Q1", revenue: 50, marketingSpend: 10, profit: 5 },
      { quarter: "Q2", revenue: 55, marketingSpend: 10, profit: 6 },
      { quarter: "Q3", revenue: 70, marketingSpend: 25, profit: 7 },
    ],
    question: "What likely drove the Q3 revenue jump?",
    choices: [
      "Price increase",
      "Marketing investment — spend 2.5x, revenue +27%",
      "Acquisition",
      "Seasonality only",
    ],
    correct: "Marketing investment — spend 2.5x, revenue +27%",
    reasoning:
      "Marketing spend increased 150% (10→25) while revenue grew 27% (55→70). The correlation suggests marketing drove the uplift, though ROI is declining (marginal revenue per $ spend dropped).",
    difficulty: "Beginner",
  },
  {
    id: "margin-trend",
    title: "Margin Trend",
    data: [
      { quarter: "Q1", revenue: 200, marketingSpend: 40, profit: 30 },
      { quarter: "Q2", revenue: 220, marketingSpend: 50, profit: 28 },
      { quarter: "Q3", revenue: 250, marketingSpend: 70, profit: 25 },
    ],
    question: "What is the key insight from this trend?",
    choices: [
      "Revenue growth is healthy",
      "Profit margin is eroding despite revenue growth — cost structure worsening",
      "Marketing is efficient",
      "Company is profitable",
    ],
    correct: "Profit margin is eroding despite revenue growth — cost structure worsening",
    reasoning:
      "Revenue up 25% (200→250) but profit down 17% (30→25). Profit margin: Q1 15%, Q3 10%. Marketing and other costs are growing faster than revenue.",
    difficulty: "Advanced",
  },
];

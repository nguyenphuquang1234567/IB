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
  {
    id: "unit-economics-deterioration",
    title: "Unit Economics Deterioration",
    data: [
      { quarter: "Q1", revenue: 80, marketingSpend: 20, profit: 12 },
      { quarter: "Q2", revenue: 100, marketingSpend: 35, profit: 10 },
      { quarter: "Q3", revenue: 120, marketingSpend: 55, profit: 8 },
    ],
    question: "What is the main concern?",
    choices: [
      "Revenue is growing",
      "CAC is rising — marketing spend per dollar of new revenue is increasing",
      "Profit is positive",
      "Marketing ROI is improving",
    ],
    correct: "CAC is rising — marketing spend per dollar of new revenue is increasing",
    reasoning:
      "Revenue +50% (80→120) but marketing +175% (20→55). Incremental revenue per incremental marketing dollar is falling. Unit economics worsening.",
    difficulty: "Advanced",
  },
  {
    id: "seasonality-pattern",
    title: "Seasonality Pattern",
    data: [
      { quarter: "Q1", revenue: 150, marketingSpend: 30, profit: 20 },
      { quarter: "Q2", revenue: 180, marketingSpend: 35, profit: 28 },
      { quarter: "Q3", revenue: 140, marketingSpend: 32, profit: 15 },
    ],
    question: "What pattern do you see?",
    choices: [
      "Linear growth",
      "Q2 peak suggests seasonality — plan for Q3 slowdown",
      "Marketing is ineffective",
      "Profit always follows revenue",
    ],
    correct: "Q2 peak suggests seasonality — plan for Q3 slowdown",
    reasoning:
      "Q2 is highest revenue and profit; Q3 drops despite similar marketing. Likely seasonal business (e.g., retail, travel). Plan cash and staffing accordingly.",
    difficulty: "Intermediate",
  },
  {
    id: "efficiency-improvement",
    title: "Efficiency Improvement",
    data: [
      { quarter: "Q1", revenue: 100, marketingSpend: 40, profit: 15 },
      { quarter: "Q2", revenue: 110, marketingSpend: 38, profit: 20 },
      { quarter: "Q3", revenue: 125, marketingSpend: 40, profit: 28 },
    ],
    question: "What drove the profit improvement?",
    choices: [
      "Revenue declined",
      "Marketing efficiency — same spend, more revenue; margin expanded",
      "One-time gain",
      "Lower quality customers",
    ],
    correct: "Marketing efficiency — same spend, more revenue; margin expanded",
    reasoning:
      "Marketing flat (40→38→40) while revenue +25%. Profit margin: Q1 15%, Q3 22.4%. Company is getting more from same marketing spend.",
    difficulty: "Beginner",
  },
  {
    id: "breakeven-pressure",
    title: "Breakeven Pressure",
    data: [
      { quarter: "Q1", revenue: 50, marketingSpend: 15, profit: 2 },
      { quarter: "Q2", revenue: 55, marketingSpend: 20, profit: 0 },
      { quarter: "Q3", revenue: 52, marketingSpend: 22, profit: -3 },
    ],
    question: "What is the critical issue?",
    choices: [
      "Revenue is stable",
      "Company crossed breakeven — now loss-making; cost structure unsustainable",
      "Marketing is well controlled",
      "Profit will recover",
    ],
    correct: "Company crossed breakeven — now loss-making; cost structure unsustainable",
    reasoning:
      "Profit went from +2 to 0 to -3. Revenue flat/declining while costs rise. Company is burning cash and needs to cut costs or grow revenue.",
    difficulty: "Intermediate",
  },
];

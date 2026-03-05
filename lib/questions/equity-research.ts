import { Question } from "@/types/question";

export const equityResearchQuestions: Question[] = [
  {
    id: "er-1",
    section: "Equity Research",
    difficulty: "Beginner",
    type: "mcq",
    question: "A company's revenue is growing 20% but operating margins are declining. What could explain this trend?",
    choices: [
      "Rising marketing costs",
      "Increased competition",
      "Expansion investments",
      "All of the above",
    ],
    correctAnswer: "All of the above",
    explanation:
      "Revenue growth with margin compression can stem from multiple factors: higher marketing spend to fuel growth, competitive pressure forcing price cuts, or capex/opex for expansion. Analysts should investigate which driver dominates.",
  },
  {
    id: "er-2",
    section: "Equity Research",
    difficulty: "Intermediate",
    type: "mcq",
    question: "When building a DCF, the terminal value typically represents what share of total enterprise value?",
    choices: [
      "Less than 30%",
      "30-50%",
      "50-70%",
      "More than 70%",
    ],
    correctAnswer: "50-70%",
    explanation:
      "For many companies, the terminal value (TV) often accounts for 50-70% of enterprise value because it captures all cash flows beyond the explicit forecast period. Small changes in terminal growth or WACC can materially affect the valuation.",
  },
  {
    id: "er-3",
    section: "Equity Research",
    difficulty: "Beginner",
    type: "mcq",
    question: "A sell-side analyst initiates coverage with a Buy rating. What should the report include?",
    choices: [
      "Only the recommendation",
      "Investment thesis, valuation, risks, and price target",
      "Only historical financials",
      "Competitor names only",
    ],
    correctAnswer: "Investment thesis, valuation, risks, and price target",
    explanation:
      "A proper initiation includes: investment thesis (why Buy), valuation support (DCF/Comps), key risks, and a price target. This gives investors a complete picture to make their own decision.",
  },
  {
    id: "er-4",
    section: "Equity Research",
    difficulty: "Intermediate",
    type: "mcq",
    question: "EV/EBITDA is preferred over P/E when:",
    choices: [
      "The company has no debt",
      "Earnings are negative or distorted by one-time items",
      "The company is a pure software business",
      "Revenue is flat",
    ],
    correctAnswer: "Earnings are negative or distorted by one-time items",
    explanation:
      "EV/EBITDA is useful when net income is negative, distorted by restructuring, or affected by different capital structures. EBITDA normalizes for interest, taxes, depreciation, and amortization.",
  },
  {
    id: "er-5",
    section: "Equity Research",
    difficulty: "Beginner",
    type: "mcq",
    question: "What is a key difference between sell-side and buy-side equity research?",
    choices: [
      "Sell-side publishes reports; buy-side uses research internally for investment decisions",
      "Buy-side only covers small caps",
      "Sell-side never uses DCF",
      "Buy-side has no price targets",
    ],
    correctAnswer: "Sell-side publishes reports; buy-side uses research internally for investment decisions",
    explanation:
      "Sell-side analysts publish research for clients (institutional investors) and may have banking relationships. Buy-side analysts conduct research for their own fund's portfolio decisions and typically do not publish.",
  },
  {
    id: "er-6",
    section: "Equity Research",
    difficulty: "Intermediate",
    type: "mcq",
    question: "Free cash flow is defined as:",
    choices: [
      "Net income + depreciation",
      "Operating cash flow minus capital expenditures",
      "Revenue minus all expenses",
      "EBITDA minus interest",
    ],
    correctAnswer: "Operating cash flow minus capital expenditures",
    explanation:
      "FCF = Operating Cash Flow - CapEx. It represents cash available to shareholders and debt holders after maintaining the business. It is a key input for DCF valuation.",
  },
  {
    id: "er-7",
    section: "Equity Research",
    difficulty: "Beginner",
    type: "mcq",
    question: "A company's gross margin improves from 40% to 45%. What could drive this?",
    choices: [
      "Higher input costs",
      "Product mix shift to higher-margin products",
      "Increased competition",
      "Currency headwinds",
    ],
    correctAnswer: "Product mix shift to higher-margin products",
    explanation:
      "Gross margin improvement typically comes from: mix shift (more high-margin products), pricing power, or cost efficiencies. Higher input costs and competition usually compress margins.",
  },
];

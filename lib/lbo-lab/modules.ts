import type { LearningModule } from "./types";

export const LBO_LEARNING_MODULES: LearningModule[] = [
  {
    id: "lbo-basics",
    title: "LBO Structure",
    formula: "Purchase Price = Debt + Equity\nSources = Uses",
    explanation:
      "In an LBO, the PE sponsor acquires a company using a mix of debt (typically 50-70%) and equity (30-50%). The target's assets and cash flows serve as collateral for the debt. The Sources and Uses table must balance: all sources of funds (debt + equity) must equal all uses (purchase price + fees).",
    example: {
      description: "Structure a $100M LBO",
      inputs: [
        { label: "Purchase Price", value: "$100M" },
        { label: "Debt", value: "60%" },
        { label: "Equity", value: "40%" },
      ],
      calculation: "Debt = $60M, Equity = $40M\nSources = Uses = $100M",
      result: "$60M debt, $40M equity",
    },
    commonMistakes: [
      "Forgetting transaction fees and financing fees in the uses table",
      "Using book value instead of market value for the purchase price",
      "Not ensuring sources equal uses in the S&U table",
    ],
    quiz: [
      {
        question: "LBO typically uses ___% debt",
        answer: "50-70",
        hint: "Majority debt",
      },
      {
        question: "Sources must ___ Uses",
        answer: "equal",
        hint: "Balance",
      },
      {
        question: "Target's ___ serve as collateral for debt",
        answer: "assets",
        hint: "And cash flows",
      },
    ],
  },
  {
    id: "moic",
    title: "MOIC (Multiple of Invested Capital)",
    formula: "MOIC = Exit Equity Value / Initial Equity Investment",
    explanation:
      "MOIC measures how many times the PE sponsor gets back its initial equity check. A 2.5x MOIC means the sponsor received 2.5x its investment. MOIC does not account for time — a 2x in 2 years is better than 2x in 10 years. MOIC is often used alongside IRR.",
    example: {
      description: "Calculate MOIC",
      inputs: [
        { label: "Initial Equity", value: "$40M" },
        { label: "Exit Equity Value", value: "$100M" },
      ],
      calculation: "MOIC = $100M / $40M",
      result: "2.5x MOIC",
    },
    commonMistakes: [
      "Using total enterprise value instead of equity value at exit",
      "Forgetting to subtract debt at exit",
      "Confusing MOIC with IRR (MOIC is a multiple, IRR is a rate)",
    ],
    quiz: [
      {
        question: "MOIC = Exit Equity Value / ___",
        answer: "Initial Equity",
        hint: "What you put in",
      },
      {
        question: "2.5x MOIC means the sponsor received ___x its investment",
        answer: "2.5",
        hint: "The multiple",
      },
      {
        question: "MOIC does not account for ___",
        answer: "time",
        hint: "Unlike IRR",
      },
    ],
  },
  {
    id: "irr",
    title: "IRR (Internal Rate of Return)",
    formula: "IRR = (Exit Value / Entry Value)^(1/n) - 1",
    explanation:
      "IRR is the annualized return that makes the NPV of the investment zero. It accounts for the time value of money — a 2x in 2 years has a much higher IRR than 2x in 10 years. PE sponsors typically target 20-25%+ IRR for LBOs. IRR is sensitive to exit timing and exit value.",
    example: {
      description: "Calculate IRR for a 5-year hold",
      inputs: [
        { label: "Initial Equity", value: "$40M" },
        { label: "Exit Equity Value", value: "$100M" },
        { label: "Hold Period", value: "5 years" },
      ],
      calculation: "IRR = (100/40)^(1/5) - 1 = 2.5^0.2 - 1",
      result: "~20.1% IRR",
    },
    commonMistakes: [
      "Using simple return instead of annualized (divide by years)",
      "Ignoring interim cash flows (dividends) in the IRR calculation",
      "Expecting linear relationship between MOIC and IRR",
    ],
    quiz: [
      {
        question: "IRR accounts for ___ value of money",
        answer: "time",
        hint: "TVM",
      },
      {
        question: "PE sponsors typically target ___%+ IRR",
        answer: "20",
        hint: "Or 25%",
      },
      {
        question: "IRR = (Exit/Entry)^(1/n) - ___",
        answer: "1",
        hint: "The formula",
      },
    ],
  },
];

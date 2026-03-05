import type { LearningModule } from "./types";

export const COMPS_LEARNING_MODULES: LearningModule[] = [
  {
    id: "ev-ebitda",
    title: "EV/EBITDA Multiple",
    formula: "EV = EBITDA × EV/EBITDA Multiple",
    explanation:
      "EV/EBITDA is the most common trading multiple in M&A. Enterprise Value (EV) = Market Cap + Net Debt. EBITDA is used because it's capital-structure neutral and reflects operating cash profitability. Higher-growth or higher-margin companies typically trade at higher multiples.",
    example: {
      description: "Value a company using EV/EBITDA",
      inputs: [
        { label: "Target EBITDA", value: "$150M" },
        { label: "Peer EV/EBITDA", value: "10x" },
      ],
      calculation: "EV = $150M × 10 = $1,500M",
      result: "$1,500M Enterprise Value",
    },
    commonMistakes: [
      "Using equity value instead of enterprise value",
      "Mixing LTM (last twelve months) vs NTM (next twelve months) EBITDA",
      "Comparing companies with different capital structures without adjusting",
    ],
    quiz: [
      {
        question: "EV = ___ × EV/EBITDA Multiple",
        answer: "EBITDA",
        hint: "The denominator of the multiple",
      },
      {
        question: "EV = Market Cap + ___",
        answer: "Net Debt",
        hint: "Debt minus cash",
      },
      {
        question: "EV/EBITDA is capital-structure ___ (neutral/dependent)",
        answer: "neutral",
        hint: "Ignores debt vs equity mix",
      },
    ],
  },
  {
    id: "ev-revenue",
    title: "EV/Revenue Multiple",
    formula: "EV = Revenue × EV/Revenue Multiple",
    explanation:
      "EV/Revenue is used when companies are unprofitable or have inconsistent margins (e.g., early-stage SaaS). Revenue multiples are more volatile than EBITDA multiples. Use for growth companies where profitability is not yet meaningful.",
    example: {
      description: "Value a company using EV/Revenue",
      inputs: [
        { label: "Target Revenue", value: "$500M" },
        { label: "Peer EV/Revenue", value: "4x" },
      ],
      calculation: "EV = $500M × 4 = $2,000M",
      result: "$2,000M Enterprise Value",
    },
    commonMistakes: [
      "Using EV/Revenue for mature, profitable companies (use EV/EBITDA instead)",
      "Comparing companies with vastly different revenue quality (recurring vs one-time)",
      "Ignoring gross margin differences when using revenue multiples",
    ],
    quiz: [
      {
        question: "EV/Revenue is used when companies are ___ or have inconsistent margins",
        answer: "unprofitable",
        hint: "No EBITDA yet",
      },
      {
        question: "EV = Revenue × ___",
        answer: "EV/Revenue Multiple",
        hint: "The multiple",
      },
      {
        question: "Revenue multiples are more ___ than EBITDA multiples",
        answer: "volatile",
        hint: "More sensitive to growth",
      },
    ],
  },
  {
    id: "peer-selection",
    title: "Peer Selection",
    formula: "Select peers with similar business model, growth, margins, and size",
    explanation:
      "Selecting the right comparable companies is critical. Peers should have: (1) similar business model and end markets, (2) comparable growth rates and margins, (3) similar size (market cap). Avoid including outliers that skew the range. Typically use 5-15 comps.",
    example: {
      description: "Select peers for a mid-cap SaaS company",
      inputs: [
        { label: "Target", value: "Mid-cap SaaS, 20% growth" },
        { label: "Good peers", value: "Similar size, growth, margin" },
      ],
      calculation: "Exclude: large-cap (different scale), low-growth (different profile)",
      result: "5-10 comps with similar profile",
    },
    commonMistakes: [
      "Including companies with different business models (e.g., hardware vs software)",
      "Using too few comps (less than 5) or too many (dilutes the analysis)",
      "Ignoring outliers that skew the median or mean",
    ],
    quiz: [
      {
        question: "Peers should have similar size, growth, and ___",
        answer: "margins",
        hint: "Profitability",
      },
      {
        question: "Typically use ___ to 15 comps",
        answer: "5",
        hint: "Minimum number",
      },
      {
        question: "Avoid ___ that skew the range",
        answer: "outliers",
        hint: "Extreme values",
      },
    ],
  },
];

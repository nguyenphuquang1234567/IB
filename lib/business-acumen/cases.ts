export type CaseDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface BusinessCase {
  id: string;
  title: string;
  scenario: string;
  data?: string[];
  question: string;
  choices: string[];
  correct: string;
  reasoning: string;
  difficulty: CaseDifficulty;
}

export const BUSINESS_CASES: BusinessCase[] = [
  {
    id: "sub-slowdown",
    title: "Subscription Revenue Slowdown",
    scenario: "A subscription software company is experiencing slower revenue growth.",
    data: [
      "Revenue growth last year: 20%",
      "Revenue growth this year: 8%",
      "Customer churn increased from 5% to 10%",
    ],
    question: "What could be the most likely cause?",
    choices: [
      "Increased competition",
      "Pricing problems",
      "Customer satisfaction issues",
      "Market saturation",
    ],
    correct: "Customer satisfaction issues",
    reasoning:
      "Rising churn (5% → 10%) directly explains slower revenue growth. Churn often stems from satisfaction issues, product gaps, or poor onboarding. While competition and pricing can contribute, the churn metric points most directly to customer experience.",
    difficulty: "Intermediate",
  },
  {
    id: "gross-margin",
    title: "Gross Margin Improvement",
    scenario: "A company's gross margin improves from 40% to 45%.",
    question: "What could explain this?",
    choices: [
      "Higher fixed costs",
      "Lower COGS as % of revenue (e.g., pricing power, mix shift)",
      "Increased SG&A",
      "Higher interest expense",
    ],
    correct: "Lower COGS as % of revenue (e.g., pricing power, mix shift)",
    reasoning:
      "Gross margin = (Revenue − COGS) / Revenue. Improvement means COGS as % of revenue decreased. This can come from pricing power, favorable product mix, or cost efficiencies.",
    difficulty: "Beginner",
  },
  {
    id: "ebitda-fcf",
    title: "EBITDA Up, FCF Down",
    scenario: "A company has strong EBITDA growth but declining free cash flow.",
    question: "Why might this happen?",
    choices: [
      "Higher depreciation",
      "Increase in working capital (e.g., inventory, receivables) or capex",
      "Lower interest expense",
      "One-time gains",
    ],
    correct: "Increase in working capital (e.g., inventory, receivables) or capex",
    reasoning:
      "FCF = CFO − CapEx. CFO starts with EBITDA but subtracts changes in working capital and adds back non-cash items. Growth often requires more inventory and AR, consuming cash. CapEx also reduces FCF.",
    difficulty: "Intermediate",
  },
  {
    id: "dso-rise",
    title: "Rising DSO",
    scenario: "Days Sales Outstanding (DSO) has increased from 45 to 60 days.",
    question: "What does this typically indicate?",
    choices: [
      "Faster collections",
      "Slower customer payments or looser credit terms",
      "Lower revenue",
      "Higher gross margin",
    ],
    correct: "Slower customer payments or looser credit terms",
    reasoning:
      "DSO = (Accounts Receivable / Revenue) × 365. Higher DSO means more receivables relative to revenue — customers are taking longer to pay, or the company extended more credit.",
    difficulty: "Beginner",
  },
  {
    id: "adjusted-ebitda",
    title: "Adjusted EBITDA Skepticism",
    scenario: "A company reports 'adjusted EBITDA' that excludes restructuring charges. Analysts are skeptical.",
    question: "Why?",
    choices: [
      "Restructuring is always one-time",
      "Recurring restructuring suggests ongoing issues; 'adjusted' may overstate sustainable earnings",
      "EBITDA doesn't include D&A",
      "Restructuring improves margins",
    ],
    correct: "Recurring restructuring suggests ongoing issues; 'adjusted' may overstate sustainable earnings",
    reasoning:
      "If a company repeatedly excludes 'one-time' restructuring, it may be masking structural problems. Adjusted metrics can overstate sustainable earnings when exclusions become recurring.",
    difficulty: "Advanced",
  },
  {
    id: "negative-wc",
    title: "Negative Working Capital",
    scenario: "A company has negative working capital (current liabilities exceed current assets).",
    question: "What is the main risk?",
    choices: [
      "Too much cash",
      "Liquidity crunch if customers delay payment or suppliers tighten terms",
      "Low inventory",
      "High gross margin",
    ],
    correct: "Liquidity crunch if customers delay payment or suppliers tighten terms",
    reasoning:
      "Negative WC means the company funds operations by collecting from customers before paying suppliers. If customers pay late or suppliers demand faster payment, the company can face a cash crunch.",
    difficulty: "Intermediate",
  },
];

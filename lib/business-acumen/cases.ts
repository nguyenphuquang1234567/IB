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
  {
    id: "cac-increase",
    title: "CAC Increasing",
    scenario: "A SaaS company's Customer Acquisition Cost (CAC) has risen 40% over the past year while LTV stayed flat.",
    question: "What is the most likely cause?",
    choices: [
      "Higher product quality",
      "Channel saturation — easy customers acquired; now targeting harder segments",
      "Lower churn",
      "Price increase",
    ],
    correct: "Channel saturation — easy customers acquired; now targeting harder segments",
    reasoning:
      "CAC typically rises as the company exhausts low-hanging fruit. Remaining prospects are harder to convert. LTV/CAC ratio deteriorates, threatening unit economics.",
    difficulty: "Intermediate",
  },
  {
    id: "mix-shift",
    title: "Revenue Mix Shift",
    scenario: "A company's revenue grows 10% but gross margin falls from 55% to 50%.",
    question: "What could explain this?",
    choices: [
      "Higher prices",
      "Mix shift toward lower-margin products or segments",
      "Reduced fixed costs",
      "Better inventory management",
    ],
    correct: "Mix shift toward lower-margin products or segments",
    reasoning:
      "Gross margin = (Revenue − COGS) / Revenue. A decline despite revenue growth suggests COGS is rising faster — often from selling more low-margin products.",
    difficulty: "Beginner",
  },
  {
    id: "opex-spike",
    title: "OpEx Spike",
    scenario: "A company's SG&A as % of revenue jumped from 25% to 35% in one year. Revenue was flat.",
    question: "What is the most plausible explanation?",
    choices: [
      "One-time legal settlement",
      "Investing ahead of growth — hiring, marketing, new offices",
      "Lower depreciation",
      "Reduced headcount",
    ],
    correct: "Investing ahead of growth — hiring, marketing, new offices",
    reasoning:
      "When revenue is flat but SG&A rises, fixed costs (salaries, rent, marketing) are being added before revenue catches up. Common in growth-stage companies.",
    difficulty: "Intermediate",
  },
  {
    id: "inventory-build",
    title: "Inventory Build-Up",
    scenario: "Inventory days increased from 45 to 75. Revenue grew 5%.",
    question: "What does this suggest?",
    choices: [
      "Faster fulfillment",
      "Overstocking or demand slowdown — risk of obsolescence or write-downs",
      "Lower COGS",
      "Just-in-time success",
    ],
    correct: "Overstocking or demand slowdown — risk of obsolescence or write-downs",
    reasoning:
      "Inventory days = (Inventory / COGS) × 365. Higher days with modest revenue growth suggests inventory is growing faster than sales — potential overstock or demand miss.",
    difficulty: "Intermediate",
  },
  {
    id: "nrr-decline",
    title: "Net Revenue Retention Decline",
    scenario: "A B2B SaaS company's Net Revenue Retention (NRR) fell from 110% to 95%.",
    question: "What does this indicate?",
    choices: [
      "Strong expansion revenue",
      "Churn and downgrades outweighing upsells — existing customer base shrinking",
      "New customer acquisition improving",
      "Price increase success",
    ],
    correct: "Churn and downgrades outweighing upsells — existing customer base shrinking",
    reasoning:
      "NRR measures revenue from existing customers (retention + expansion − churn). Below 100% means the installed base is contracting in revenue terms.",
    difficulty: "Advanced",
  },
  {
    id: "capex-deferral",
    title: "CapEx Deferral",
    scenario: "A manufacturing company has deferred maintenance CapEx for two years. EBITDA is strong.",
    question: "What is the risk?",
    choices: [
      "Higher depreciation",
      "Future catch-up spend and operational disruption when assets fail",
      "Lower interest expense",
      "Better cash flow",
    ],
    correct: "Future catch-up spend and operational disruption when assets fail",
    reasoning:
      "Deferring CapEx boosts short-term cash and EBITDA but creates a liability. When maintenance can't be delayed, costs spike and operations may suffer.",
    difficulty: "Advanced",
  },
  {
    id: "pricing-power-test",
    title: "Pricing Power Test",
    scenario: "A company raised prices 8% and volume dropped 2%.",
    question: "What does this imply?",
    choices: [
      "Elastic demand — price increase backfired",
      "Inelastic demand — revenue and margin improved despite small volume loss",
      "Perfect competition",
      "Market share loss",
    ],
    correct: "Inelastic demand — revenue and margin improved despite small volume loss",
    reasoning:
      "Volume drop of 2% vs price increase of 8% means revenue increased ~6%. Low elasticity indicates strong pricing power.",
    difficulty: "Beginner",
  },
];

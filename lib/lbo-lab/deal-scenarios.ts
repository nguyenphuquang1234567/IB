export interface DealScenario {
  id: string;
  name: string;
  industry: string;
  description: string;
  revenue: number; // $M
  ebitdaMargin: number; // %
  revenueGrowth: number; // % CAGR
  competitivePosition: "strong" | "moderate" | "weak";
  cashFlowStability: "high" | "medium" | "low";
  operationalImprovementPotential: "high" | "medium" | "low";
  keyRisks: string[];
  keyStrengths: string[];
  suggestedPursue: boolean; // for feedback
  feedbackPursue: string;
  feedbackPass: string;
}

export const DEAL_SCENARIOS: DealScenario[] = [
  {
    id: "software-saas",
    name: "CloudSync Inc.",
    industry: "Software / SaaS",
    description:
      "Enterprise software company with 85% recurring revenue. Strong retention (95% net), but faces competition from larger players. Management team is solid; some operational inefficiencies in sales and support.",
    revenue: 120,
    ebitdaMargin: 22,
    revenueGrowth: 18,
    competitivePosition: "moderate",
    cashFlowStability: "high",
    operationalImprovementPotential: "medium",
    keyRisks: ["Competitive pressure from hyperscalers", "Customer concentration (top 10 = 35% revenue)"],
    keyStrengths: ["High recurring revenue", "Strong unit economics", "Predictable cash flow"],
    suggestedPursue: true,
    feedbackPursue:
      "Strong LBO candidate. Recurring revenue supports leverage; predictable cash flows enable debt paydown. Focus on cost optimization in G&A and potential add-on acquisitions.",
    feedbackPass:
      "Passing may be conservative—recurring revenue and high retention make this an attractive LBO target. Consider revisiting if valuation becomes more attractive.",
  },
  {
    id: "consumer-brand",
    name: "Heritage Foods Co.",
    industry: "Consumer / Branded Foods",
    description:
      "Legacy consumer brand with strong recognition but flat revenue. Distribution through grocery and e-commerce. Margins have eroded due to commodity inflation; limited pricing power in core segments.",
    revenue: 450,
    ebitdaMargin: 12,
    revenueGrowth: 2,
    competitivePosition: "moderate",
    cashFlowStability: "medium",
    operationalImprovementPotential: "high",
    keyRisks: ["Commodity cost volatility", "Shift to private label", "Aging demographic"],
    keyStrengths: ["Brand recognition", "Diversified distribution", "Asset-light model"],
    suggestedPursue: true,
    feedbackPursue:
      "Good candidate if priced correctly. High improvement potential through procurement, SKU rationalization, and digital growth. Use moderate leverage given margin volatility.",
    feedbackPass:
      "Reasonable to pass if entry multiple is rich. Margin pressure and slow growth require significant operational improvements to hit return targets.",
  },
  {
    id: "industrial-manufacturing",
    name: "Precision Parts Ltd.",
    industry: "Industrial / Manufacturing",
    description:
      "Mid-market manufacturer serving automotive and aerospace. Underinvested in automation; labor costs have risen. Customer relationships are strong but contracts are short-term. Cyclical exposure to auto cycle.",
    revenue: 280,
    ebitdaMargin: 14,
    revenueGrowth: 4,
    competitivePosition: "weak",
    cashFlowStability: "low",
    operationalImprovementPotential: "high",
    keyRisks: ["Auto cycle downturn", "Labor inflation", "Customer concentration", "CapEx requirements"],
    keyStrengths: ["Defensible niche", "Operational improvement runway", "Add-on acquisition potential"],
    suggestedPursue: false,
    feedbackPursue:
      "Aggressive. Cyclicality and low cash flow stability make high leverage risky. Could work with conservative structure and long hold period.",
    feedbackPass:
      "Sensible pass. Volatile cash flows and cyclical exposure make this a challenging LBO. Better suited for strategic buyers or lower-leverage structures.",
  },
  {
    id: "healthcare-services",
    name: "CareFirst Medical",
    industry: "Healthcare Services",
    description:
      "Outpatient clinic network with 40 locations. Reimbursement pressure from payors but volume growth from aging population. Fragmented industry with roll-up potential. Regulatory exposure to healthcare policy.",
    revenue: 180,
    ebitdaMargin: 18,
    revenueGrowth: 8,
    competitivePosition: "strong",
    cashFlowStability: "high",
    operationalImprovementPotential: "high",
    keyRisks: ["Reimbursement cuts", "Regulatory changes", "Physician retention"],
    keyStrengths: ["Demographic tailwind", "Recurring revenue", "Consolidation opportunity"],
    suggestedPursue: true,
    feedbackPursue:
      "Excellent LBO candidate. Stable cash flows, growth, and roll-up potential. Healthcare requires regulatory diligence but structure supports leverage.",
    feedbackPass:
      "Passing may miss a strong opportunity. Healthcare services often support leverage well. Ensure regulatory and reimbursement risks are fully understood.",
  },
  {
    id: "retail-distressed",
    name: "Urban Retail Group",
    industry: "Retail",
    description:
      "Regional retailer with 80 stores. Declining foot traffic, e-commerce pressure. Real estate owned; some locations have appreciated. Management has struggled with omnichannel transition.",
    revenue: 320,
    ebitdaMargin: 6,
    revenueGrowth: -3,
    competitivePosition: "weak",
    cashFlowStability: "low",
    operationalImprovementPotential: "medium",
    keyRisks: ["Continued traffic decline", "Lease obligations", "Inventory risk"],
    keyStrengths: ["Real estate value", "Loyal customer base in some markets"],
    suggestedPursue: false,
    feedbackPursue:
      "High risk. Declining revenue and thin margins make debt service difficult. Would require asset sales or significant restructuring—more of a turnaround than traditional LBO.",
    feedbackPass:
      "Correct pass. Declining business with weak margins is not a standard LBO candidate. Real estate could attract different buyers (e.g., real estate funds).",
  },
];

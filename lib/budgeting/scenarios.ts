export interface Scenario {
  id: string;
  name: string;
  description: string;
  adjustments: {
    revenueGrowthDelta?: number;
    cogsDelta?: number;
    opexDelta?: number;
    capexDelta?: number;
  };
}

export const SCENARIOS: Scenario[] = [
  {
    id: "demand-slowdown",
    name: "Demand Slowdown",
    description: "Market softens; customers delay purchases. Revenue growth slows.",
    adjustments: { revenueGrowthDelta: -5, cogsDelta: 0, opexDelta: 0, capexDelta: -1 },
  },
  {
    id: "raw-materials",
    name: "Rising Raw Material Costs",
    description: "Commodity prices increase. COGS % rises; gross margin compresses.",
    adjustments: { revenueGrowthDelta: 0, cogsDelta: 5, opexDelta: 0, capexDelta: 0 },
  },
  {
    id: "marketing-investment",
    name: "Marketing Investment Increase",
    description: "Company invests in brand and demand gen. OpEx grows faster.",
    adjustments: { revenueGrowthDelta: 2, cogsDelta: 0, opexDelta: 8, capexDelta: 0 },
  },
  {
    id: "expansion",
    name: "Expansion into New Market",
    description: "Enter new geography. Higher CapEx and OpEx; revenue accelerates.",
    adjustments: { revenueGrowthDelta: 5, cogsDelta: 2, opexDelta: 6, capexDelta: 3 },
  },
];

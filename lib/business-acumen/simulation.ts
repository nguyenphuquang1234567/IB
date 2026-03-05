export interface DecisionOption {
  id: string;
  label: string;
  description: string;
  impact: {
    revenueDelta: number;
    marginDelta: number;
    cashFlowDelta: number;
  };
}

export const DECISION_OPTIONS: DecisionOption[] = [
  {
    id: "marketing",
    label: "Increase marketing spend",
    description: "Invest 20% more in customer acquisition. Higher top line, but margin pressure.",
    impact: { revenueDelta: 15, marginDelta: -3, cashFlowDelta: -10 },
  },
  {
    id: "reduce-price",
    label: "Reduce product prices",
    description: "Cut prices 10% to gain share. Volume up, margin down.",
    impact: { revenueDelta: 5, marginDelta: -8, cashFlowDelta: -5 },
  },
  {
    id: "expand",
    label: "Expand to a new market",
    description: "Enter new geography. Capex and OpEx upfront; revenue delayed.",
    impact: { revenueDelta: 8, marginDelta: -5, cashFlowDelta: -25 },
  },
  {
    id: "cut-costs",
    label: "Cut operating costs",
    description: "Reduce OpEx by 15%. Margin improves; risk of growth slowdown.",
    impact: { revenueDelta: -5, marginDelta: 6, cashFlowDelta: 12 },
  },
];

export const BASE_METRICS = {
  revenue: 100,
  margin: 15,
  cashFlow: 10,
};

export type EventType =
  | "interest_rate_increase"
  | "market_downturn"
  | "sector_rotation"
  | "commodity_spike";

export interface MarketEvent {
  id: EventType;
  title: string;
  description: string;
  impact: {
    equities: number;
    bonds: number;
    etfs: number;
    commodities: number;
    realestate: number;
    cash: number;
  };
}

export const MARKET_EVENTS: MarketEvent[] = [
  {
    id: "interest_rate_increase",
    title: "Interest Rate Increase",
    description: "Central bank raises rates. Bonds typically fall; cash and short-duration assets benefit.",
    impact: { equities: -5, bonds: -8, etfs: -4, commodities: -2, realestate: -6, cash: 2 },
  },
  {
    id: "market_downturn",
    title: "Market Downturn",
    description: "Broad equity sell-off. Risk assets decline; bonds and cash may hold value.",
    impact: { equities: -15, bonds: 2, etfs: -12, commodities: -8, realestate: -10, cash: 0 },
  },
  {
    id: "sector_rotation",
    title: "Sector Rotation",
    description: "Investors rotate from growth to value. ETFs and diversified equities may lag.",
    impact: { equities: -3, bonds: 1, etfs: -5, commodities: 2, realestate: 3, cash: 0 },
  },
  {
    id: "commodity_spike",
    title: "Commodity Price Spike",
    description: "Oil and metals surge. Commodities rally; equities face margin pressure.",
    impact: { equities: -4, bonds: -1, etfs: -3, commodities: 15, realestate: 1, cash: 0 },
  },
];

export type UserAction = "rebalance" | "increase_exposure" | "reduce_risk" | "hold";

export interface SimulationState {
  weights: Record<string, number>;
  portfolioValue: number;
  history: { period: number; value: number; event?: string }[];
}

export function applyEventImpact(
  weights: Record<string, number>,
  event: MarketEvent,
  action: UserAction
): { newValue: number; newWeights: Record<string, number> } {
  let value = 100;
  const ids = ["equities", "bonds", "etfs", "commodities", "realestate", "cash"];

  for (const id of ids) {
    const w = (weights[id] ?? 0) / 100;
    const impact = event.impact[id as keyof typeof event.impact] ?? 0;
    value += w * impact;
  }

  let newWeights = { ...weights };

  if (action === "rebalance") {
    newWeights = { equities: 40, bonds: 30, etfs: 5, commodities: 5, realestate: 10, cash: 10 };
  } else if (action === "increase_exposure") {
    const eq = (weights.equities ?? 0) + 10;
    const cash = Math.max(0, (weights.cash ?? 0) - 10);
    newWeights = { ...weights, equities: Math.min(100, eq), cash };
  } else if (action === "reduce_risk") {
    const cash = (weights.cash ?? 0) + 15;
    const eq = Math.max(0, (weights.equities ?? 0) - 15);
    newWeights = { ...weights, equities: eq, cash: Math.min(100, cash) };
  }

  return { newValue: Math.max(50, Math.min(150, value)), newWeights };
}

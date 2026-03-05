export interface AssetClass {
  id: string;
  name: string;
  expectedReturn: number;
  volatility: number;
  color: string;
}

export const ASSET_CLASSES: AssetClass[] = [
  { id: "equities", name: "Equities", expectedReturn: 10, volatility: 18, color: "#3b82f6" },
  { id: "bonds", name: "Bonds", expectedReturn: 4, volatility: 6, color: "#22c55e" },
  { id: "etfs", name: "ETFs", expectedReturn: 8, volatility: 14, color: "#8b5cf6" },
  { id: "commodities", name: "Commodities", expectedReturn: 6, volatility: 20, color: "#f59e0b" },
  { id: "realestate", name: "Real Estate", expectedReturn: 7, volatility: 12, color: "#ec4899" },
  { id: "cash", name: "Cash", expectedReturn: 2, volatility: 1, color: "#6b7280" },
];

// Simplified correlation matrix (equities-bonds negative, others low)
const CORR: Record<string, Record<string, number>> = {
  equities: { equities: 1, bonds: -0.2, etfs: 0.9, commodities: 0.3, realestate: 0.5, cash: 0 },
  bonds: { equities: -0.2, bonds: 1, etfs: -0.1, commodities: 0, realestate: 0.2, cash: 0.5 },
  etfs: { equities: 0.9, bonds: -0.1, etfs: 1, commodities: 0.25, realestate: 0.45, cash: 0 },
  commodities: { equities: 0.3, bonds: 0, etfs: 0.25, commodities: 1, realestate: 0.1, cash: 0 },
  realestate: { equities: 0.5, bonds: 0.2, etfs: 0.45, commodities: 0.1, realestate: 1, cash: 0 },
  cash: { equities: 0, bonds: 0.5, etfs: 0, commodities: 0, realestate: 0, cash: 1 },
};

const RISK_FREE = 4;

export function getCorr(a: string, b: string): number {
  return CORR[a]?.[b] ?? CORR[b]?.[a] ?? 0;
}

export function calculatePortfolio(
  weights: Record<string, number>
): { expectedReturn: number; volatility: number; sharpeRatio: number } {
  let expReturn = 0;
  let variance = 0;

  const ids = ASSET_CLASSES.map((a) => a.id);

  for (const i of ids) {
    const w = weights[i] ?? 0;
    const asset = ASSET_CLASSES.find((a) => a.id === i)!;
    expReturn += (w / 100) * asset.expectedReturn;
  }

  for (const i of ids) {
    for (const j of ids) {
      const wi = (weights[i] ?? 0) / 100;
      const wj = (weights[j] ?? 0) / 100;
      const assetI = ASSET_CLASSES.find((a) => a.id === i)!;
      const assetJ = ASSET_CLASSES.find((a) => a.id === j)!;
      const corr = getCorr(i, j);
      variance += wi * wj * assetI.volatility * assetJ.volatility * corr;
    }
  }

  const volatility = Math.sqrt(variance);
  const sharpeRatio = volatility > 0 ? (expReturn - RISK_FREE) / volatility : 0;

  return {
    expectedReturn: expReturn,
    volatility,
    sharpeRatio,
  };
}

export function getPortfolioFeedback(
  weights: Record<string, number>,
  volatility: number,
  sharpeRatio: number
): string[] {
  const feedback: string[] = [];
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  if (Math.abs(totalWeight - 100) > 1) {
    feedback.push("Weights must sum to 100%.");
  }

  const equitiesWeight = weights.equities ?? 0;
  if (equitiesWeight > 80) {
    feedback.push("Portfolio risk too concentrated in equities. Consider diversifying.");
  }

  if (volatility > 15 && (weights.bonds ?? 0) < 10) {
    feedback.push("Portfolio volatility is high. Adding bonds could reduce risk.");
  }

  if (sharpeRatio < 0.3 && sharpeRatio > 0) {
    feedback.push("Sharpe ratio is low. Diversification could improve risk-adjusted returns.");
  }

  const cashWeight = weights.cash ?? 0;
  if (cashWeight > 30) {
    feedback.push("High cash allocation may drag long-term returns.");
  }

  if (feedback.length === 0) {
    feedback.push("Portfolio looks well-balanced. Consider stress-testing in the Simulation.");
  }

  return feedback;
}

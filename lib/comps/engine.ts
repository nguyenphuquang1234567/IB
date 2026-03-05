import type { CompsAssumptions, CompsOutput } from "./types";

export function computeComps(a: CompsAssumptions): CompsOutput {
  const evFromEbitda = a.targetEbitda * a.evEbitdaMultiple;
  const evFromRevenue = a.targetRevenue * a.evRevenueMultiple;
  const equityFromPe = a.targetNetIncome * a.peMultiple;

  const evs = [evFromEbitda, evFromRevenue].filter((v) => v > 0 && isFinite(v));
  const evMin = evs.length > 0 ? Math.min(...evs) : 0;
  const evMax = evs.length > 0 ? Math.max(...evs) : 0;

  const impliedMultiple = a.targetEbitda > 0 ? evFromEbitda / a.targetEbitda : 0;

  return {
    evFromEbitda,
    evFromRevenue,
    equityFromPe,
    evRange: [evMin, evMax],
    impliedMultiple,
  };
}

export function fmt(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

export function fmtCompact(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toFixed(0);
}

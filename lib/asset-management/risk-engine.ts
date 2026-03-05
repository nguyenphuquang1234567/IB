export interface TimePoint {
  date: string;
  portfolio: number;
  benchmark: number;
}

const SEED = 42;
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateTimeSeries(
  months: number = 36,
  portfolioReturn: number = 8,
  portfolioVol: number = 12,
  benchmarkReturn: number = 10,
  benchmarkVol: number = 16,
  correlation: number = 0.7
): TimePoint[] {
  const data: TimePoint[] = [];
  let pVal = 100;
  let bVal = 100;
  let s = SEED;

  for (let i = 0; i < months; i++) {
    const u1 = seededRandom(s++);
    const u2 = seededRandom(s++);
    const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

    const pRet = (portfolioReturn / 12) + (portfolioVol / Math.sqrt(12)) * z1;
    const bRet = (benchmarkReturn / 12) + (benchmarkVol / Math.sqrt(12)) * (correlation * z1 + Math.sqrt(1 - correlation * correlation) * z2);

    pVal *= 1 + pRet / 100;
    bVal *= 1 + bRet / 100;

    const date = new Date();
    date.setMonth(date.getMonth() - (months - 1 - i));
    data.push({
      date: date.toISOString().slice(0, 7),
      portfolio: Math.round(pVal * 100) / 100,
      benchmark: Math.round(bVal * 100) / 100,
    });
  }

  return data;
}

export function computeMetrics(data: TimePoint[]): {
  portfolioReturn: number;
  benchmarkReturn: number;
  portfolioVolatility: number;
  benchmarkVolatility: number;
  sharpeRatio: number;
  beta: number;
  maxDrawdown: number;
} {
  if (data.length < 2) {
    return {
      portfolioReturn: 0,
      benchmarkReturn: 0,
      portfolioVolatility: 0,
      benchmarkVolatility: 0,
      sharpeRatio: 0,
      beta: 0,
      maxDrawdown: 0,
    };
  }

  const pReturns: number[] = [];
  const bReturns: number[] = [];

  for (let i = 1; i < data.length; i++) {
    pReturns.push((data[i].portfolio - data[i - 1].portfolio) / data[i - 1].portfolio);
    bReturns.push((data[i].benchmark - data[i - 1].benchmark) / data[i - 1].benchmark);
  }

  const pMean = pReturns.reduce((a, b) => a + b, 0) / pReturns.length;
  const bMean = bReturns.reduce((a, b) => a + b, 0) / bReturns.length;

  const pVar = pReturns.reduce((a, r) => a + (r - pMean) ** 2, 0) / (pReturns.length - 1);
  const bVar = bReturns.reduce((a, r) => a + (r - bMean) ** 2, 0) / (bReturns.length - 1);
  const cov = pReturns.reduce((a, r, i) => a + (r - pMean) * (bReturns[i] - bMean), 0) / (pReturns.length - 1);

  const pVol = Math.sqrt(pVar) * Math.sqrt(12) * 100;
  const bVol = Math.sqrt(bVar) * Math.sqrt(12) * 100;

  const totalPReturn = ((data[data.length - 1].portfolio - data[0].portfolio) / data[0].portfolio) * 100;
  const totalBReturn = ((data[data.length - 1].benchmark - data[0].benchmark) / data[0].benchmark) * 100;

  const annualizedP = (Math.pow(1 + totalPReturn / 100, 12 / data.length) - 1) * 100;
  const annualizedB = (Math.pow(1 + totalBReturn / 100, 12 / data.length) - 1) * 100;

  const riskFree = 4 / 12 / 100;
  const sharpe = pVol > 0 ? ((pMean - riskFree) / Math.sqrt(pVar)) * Math.sqrt(12) : 0;

  const beta = bVar > 0 ? cov / bVar : 0;

  let peak = data[0].portfolio;
  let maxDD = 0;
  for (const d of data) {
    if (d.portfolio > peak) peak = d.portfolio;
    const dd = ((peak - d.portfolio) / peak) * 100;
    if (dd > maxDD) maxDD = dd;
  }

  return {
    portfolioReturn: annualizedP,
    benchmarkReturn: annualizedB,
    portfolioVolatility: pVol,
    benchmarkVolatility: bVol,
    sharpeRatio: sharpe,
    beta,
    maxDrawdown: maxDD,
  };
}

export interface ScatterPoint {
  name: string;
  return: number;
  volatility: number;
  sharpe: number;
}

export function generateScatterPortfolios(): ScatterPoint[] {
  const points: ScatterPoint[] = [];
  const allocations = [
    { eq: 90, b: 5, c: 5, name: "Aggressive" },
    { eq: 70, b: 20, c: 10, name: "Growth" },
    { eq: 60, b: 30, c: 10, name: "Balanced" },
    { eq: 50, b: 40, c: 10, name: "Moderate" },
    { eq: 40, b: 50, c: 10, name: "Conservative" },
    { eq: 20, b: 70, c: 10, name: "Income" },
    { eq: 0, b: 90, c: 10, name: "Bonds" },
    { eq: 0, b: 0, c: 100, name: "Cash" },
  ];

  const eqRet = 10;
  const eqVol = 18;
  const bRet = 4;
  const bVol = 6;
  const cRet = 2;
  const cVol = 1;
  const corrEB = -0.2;

  for (const a of allocations) {
    const wEq = a.eq / 100;
    const wB = a.b / 100;
    const wC = a.c / 100;
    const ret = wEq * eqRet + wB * bRet + wC * cRet;
    const var_ =
      wEq * wEq * eqVol * eqVol +
      wB * wB * bVol * bVol +
      wC * wC * cVol * cVol +
      2 * wEq * wB * eqVol * bVol * corrEB;
    const vol = Math.sqrt(var_);
    const sharpe = vol > 0 ? (ret - 4) / vol : 0;
    points.push({ name: a.name, return: ret, volatility: vol, sharpe });
  }
  return points;
}

export const CORRELATION_MATRIX: { assets: string[]; matrix: number[][] } = {
  assets: ["Equities", "Bonds", "ETFs", "Commodities", "Real Estate", "Cash"],
  matrix: [
    [1, -0.2, 0.9, 0.3, 0.5, 0],
    [-0.2, 1, -0.1, 0, 0.2, 0.5],
    [0.9, -0.1, 1, 0.25, 0.45, 0],
    [0.3, 0, 0.25, 1, 0.1, 0],
    [0.5, 0.2, 0.45, 0.1, 1, 0],
    [0, 0.5, 0, 0, 0, 1],
  ],
};

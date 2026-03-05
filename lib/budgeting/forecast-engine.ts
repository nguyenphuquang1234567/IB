export interface ForecastAssumptions {
  baseRevenue: number;
  revenueGrowthPct: number;
  cogsPct: number;
  opexBase: number;
  opexGrowthPct: number;
  capexPctOfRevenue: number;
  depreciationPctOfCapex: number;
  years: 3 | 5;
}

export interface ForecastYear {
  year: number;
  revenue: number;
  cogs: number;
  grossProfit: number;
  grossMarginPct: number;
  opex: number;
  ebitda: number;
  depreciation: number;
  ebit: number;
  ebitMarginPct: number;
  capex: number;
  operatingCashFlow: number;
}

export function buildForecast(assumptions: ForecastAssumptions): ForecastYear[] {
  const results: ForecastYear[] = [];
  let revenue = assumptions.baseRevenue;
  let opex = assumptions.opexBase;
  const capexPct = assumptions.capexPctOfRevenue / 100;
  const deprAsPctOfRevenue = (assumptions.capexPctOfRevenue * assumptions.depreciationPctOfCapex) / 10000;

  for (let y = 1; y <= assumptions.years; y++) {
    const growth = 1 + assumptions.revenueGrowthPct / 100;
    revenue = revenue * growth;
    opex = opex * (1 + assumptions.opexGrowthPct / 100);

    const cogs = revenue * (assumptions.cogsPct / 100);
    const grossProfit = revenue - cogs;
    const grossMarginPct = revenue > 0 ? (grossProfit / revenue) * 100 : 0;

    const capex = revenue * capexPct;
    const depreciation = revenue * deprAsPctOfRevenue;

    const ebitda = grossProfit - opex;
    const ebit = ebitda - depreciation;
    const ebitMarginPct = revenue > 0 ? (ebit / revenue) * 100 : 0;

    const operatingCashFlow = ebitda - capex;

    results.push({
      year: new Date().getFullYear() + y,
      revenue,
      cogs,
      grossProfit,
      grossMarginPct,
      opex,
      ebitda,
      depreciation,
      ebit,
      ebitMarginPct,
      capex,
      operatingCashFlow,
    });
  }

  return results;
}

export function getForecastFeedback(assumptions: ForecastAssumptions, results: ForecastYear[]): string[] {
  const feedback: string[] = [];
  const lastYear = results[results.length - 1];
  const firstYear = results[0];

  if (assumptions.revenueGrowthPct > 25) {
    feedback.push("Revenue growth assumption may be too aggressive. Consider sensitivity analysis.");
  }
  if (assumptions.opexGrowthPct > assumptions.revenueGrowthPct + 5) {
    feedback.push("Operating expenses growing faster than revenue — margin compression risk.");
  }
  if (lastYear.operatingCashFlow < 0) {
    feedback.push("Cash flow risk detected: forecast shows negative operating cash flow.");
  }
  if (lastYear.ebitMarginPct < firstYear.ebitMarginPct - 5) {
    feedback.push("EBIT margin declining over forecast period. Review cost structure.");
  }
  if (assumptions.cogsPct > 70) {
    feedback.push("High COGS % — gross margin may be thin. Validate pricing and mix.");
  }

  if (feedback.length === 0) {
    feedback.push("Forecast looks reasonable. Consider stress-testing with scenario simulator.");
  }

  return feedback;
}

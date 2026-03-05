import type {
  Assumptions,
  YearProjection,
  DCFOutput,
  Warning,
  Feedback,
  SensitivityGrid,
  SensitivityCell,
  CompanyCase,
} from "./types";

export function computeProjections(a: Assumptions, projectionYears = 5): DCFOutput {
  const years: YearProjection[] = [];
  let prevRevenue = a.baseRevenue;

  for (let i = 0; i < projectionYears; i++) {
    const revenue = prevRevenue * (1 + a.revenueGrowth / 100);
    const ebitda = revenue * (a.ebitdaMargin / 100);
    const da = revenue * (a.daPercent / 100);
    const ebit = ebitda - da;
    const taxes = Math.max(0, ebit * (a.taxRate / 100));
    const nopat = ebit - taxes;
    const capex = revenue * (a.capexPercent / 100);
    const nwcChange = (revenue - prevRevenue) * (a.nwcPercent / 100);
    const ufcf = nopat + da - capex - nwcChange;

    years.push({
      year: i + 1,
      revenue,
      ebitda,
      da,
      ebit,
      taxes,
      nopat,
      capex,
      nwcChange,
      ufcf,
    });

    prevRevenue = revenue;
  }

  const lastYear = years[projectionYears - 1];
  const waccDecimal = a.wacc / 100;
  const gDecimal = a.terminalGrowth / 100;

  const tvGordon =
    waccDecimal > gDecimal
      ? (lastYear.ufcf * (1 + gDecimal)) / (waccDecimal - gDecimal)
      : 0;
  const tvExit = lastYear.ebitda * a.exitMultiple;

  const pvFactors = years.map((_, i) => 1 / Math.pow(1 + waccDecimal, i + 1));
  const pvFCFs = years.map((y, i) => y.ufcf * pvFactors[i]);
  const sumPvFCF = pvFCFs.reduce((s, v) => s + v, 0);

  const pvTvGordon = tvGordon * pvFactors[projectionYears - 1];
  const pvTvExit = tvExit * pvFactors[projectionYears - 1];

  const evGordon = sumPvFCF + pvTvGordon;
  const evExit = sumPvFCF + pvTvExit;
  const evAverage = (evGordon + evExit) / 2;

  const tvPercentGordon = evGordon > 0 ? (pvTvGordon / evGordon) * 100 : 0;
  const tvPercentExit = evExit > 0 ? (pvTvExit / evExit) * 100 : 0;

  return {
    years,
    tvGordon,
    tvExit,
    pvFactors,
    pvFCFs,
    sumPvFCF,
    pvTvGordon,
    pvTvExit,
    evGordon,
    evExit,
    evAverage,
    tvPercentGordon,
    tvPercentExit,
  };
}

export function generateWarnings(a: Assumptions, output: DCFOutput): Warning[] {
  const warnings: Warning[] = [];

  if (a.revenueGrowth > 15) {
    warnings.push({
      id: "high-growth",
      type: "warning",
      message: `Revenue growth of ${a.revenueGrowth}% is high for a mature company. Most companies grow slower than GDP (2-4%) long-term.`,
    });
  }

  if (a.revenueGrowth < 0) {
    warnings.push({
      id: "negative-growth",
      type: "info",
      message: `Negative revenue growth (${a.revenueGrowth}%) implies a declining business. Ensure this reflects your thesis.`,
    });
  }

  if (a.terminalGrowth > 3) {
    warnings.push({
      id: "high-terminal",
      type: "warning",
      message: `Terminal growth of ${a.terminalGrowth}% exceeds long-term GDP (2-3%). No company can grow faster than the economy forever.`,
    });
  }

  if (a.terminalGrowth >= a.wacc) {
    warnings.push({
      id: "terminal-exceeds-wacc",
      type: "error",
      message: `Terminal growth (${a.terminalGrowth}%) must be less than WACC (${a.wacc}%). Otherwise the Gordon Growth formula is invalid.`,
    });
  }

  if (a.wacc < 6) {
    warnings.push({
      id: "low-wacc",
      type: "warning",
      message: `WACC of ${a.wacc}% is unusually low. Most companies have WACC between 8-12%.`,
    });
  }

  if (a.wacc > 15) {
    warnings.push({
      id: "high-wacc",
      type: "warning",
      message: `WACC of ${a.wacc}% is high, indicating significant risk. Verify your cost of equity and debt assumptions.`,
    });
  }

  if (output.tvPercentGordon > 85) {
    warnings.push({
      id: "tv-heavy",
      type: "warning",
      message: `Terminal value accounts for ${output.tvPercentGordon.toFixed(0)}% of your valuation. Typical range is 60-80%. Your DCF is highly sensitive to terminal assumptions.`,
    });
  }

  if (a.ebitdaMargin > 40) {
    warnings.push({
      id: "high-margin",
      type: "info",
      message: `EBITDA margin of ${a.ebitdaMargin}% is very high. Only software/tech companies typically achieve this.`,
    });
  }

  if (a.ebitdaMargin < 10) {
    warnings.push({
      id: "low-margin",
      type: "info",
      message: `EBITDA margin of ${a.ebitdaMargin}% is low, typical for retail/commodity businesses.`,
    });
  }

  return warnings;
}

export function generateFeedback(
  a: Assumptions,
  output: DCFOutput,
  companyCase?: CompanyCase
): Feedback[] {
  const feedback: Feedback[] = [];

  if (companyCase) {
    const historicalGrowth = calculateHistoricalGrowth(companyCase);
    const growthDiff = a.revenueGrowth - historicalGrowth;

    if (growthDiff > 5) {
      feedback.push({
        id: "growth-above-historical",
        type: "negative",
        message: `Your revenue growth of ${a.revenueGrowth}% is ${growthDiff.toFixed(1)}pp above ${companyCase.name}'s historical average of ${historicalGrowth.toFixed(1)}%. Consider if there's a catalyst justifying this.`,
      });
    } else if (growthDiff < -5) {
      feedback.push({
        id: "growth-below-historical",
        type: "neutral",
        message: `Your revenue growth of ${a.revenueGrowth}% is conservative vs ${companyCase.name}'s historical ${historicalGrowth.toFixed(1)}%. This may be prudent for a maturing company.`,
      });
    } else {
      feedback.push({
        id: "growth-reasonable",
        type: "positive",
        message: `Your revenue growth of ${a.revenueGrowth}% is in line with ${companyCase.name}'s historical trend of ${historicalGrowth.toFixed(1)}%.`,
      });
    }

    const waccDiff = a.wacc - companyCase.sectorAvgWacc;
    if (Math.abs(waccDiff) > 2) {
      feedback.push({
        id: "wacc-vs-sector",
        type: waccDiff < 0 ? "negative" : "neutral",
        message: `Your WACC of ${a.wacc}% is ${Math.abs(waccDiff).toFixed(1)}pp ${waccDiff < 0 ? "below" : "above"} the sector average of ${companyCase.sectorAvgWacc}%.`,
      });
    }

    if (
      output.evAverage < companyCase.referenceEVRange[0] ||
      output.evAverage > companyCase.referenceEVRange[1]
    ) {
      const rangeStr = `$${formatNumber(companyCase.referenceEVRange[0])} - $${formatNumber(companyCase.referenceEVRange[1])}`;
      feedback.push({
        id: "ev-vs-reference",
        type: "neutral",
        message: `Your EV estimate of $${formatNumber(output.evAverage)} is outside the reference range of ${rangeStr}. Review your key assumptions.`,
      });
    }
  }

  const tvPercent = (output.tvPercentGordon + output.tvPercentExit) / 2;
  if (tvPercent >= 60 && tvPercent <= 80) {
    feedback.push({
      id: "tv-composition-good",
      type: "positive",
      message: `Terminal value accounts for ${tvPercent.toFixed(0)}% of your valuation, which is within the typical 60-80% range.`,
    });
  } else if (tvPercent > 80) {
    feedback.push({
      id: "tv-composition-high",
      type: "negative",
      message: `Terminal value accounts for ${tvPercent.toFixed(0)}% of your valuation. This makes your DCF very sensitive to terminal assumptions.`,
    });
  }

  if (output.evGordon > 0 && output.evExit > 0) {
    const methodDiff = Math.abs(output.evGordon - output.evExit) / output.evAverage;
    if (methodDiff > 0.3) {
      feedback.push({
        id: "method-divergence",
        type: "neutral",
        message: `Your Gordon Growth EV ($${formatNumber(output.evGordon)}) and Exit Multiple EV ($${formatNumber(output.evExit)}) differ by ${(methodDiff * 100).toFixed(0)}%. Consider which method is more appropriate.`,
      });
    }
  }

  return feedback;
}

export function computeSensitivity(
  a: Assumptions,
  waccRange: number[],
  growthRange: number[]
): SensitivityGrid {
  const cells: SensitivityCell[][] = [];
  let minEV = Infinity;
  let maxEV = -Infinity;

  for (const wacc of waccRange) {
    const row: SensitivityCell[] = [];
    for (const g of growthRange) {
      if (g >= wacc) {
        row.push({ wacc, terminalGrowth: g, ev: NaN, isCurrent: false });
        continue;
      }

      const modifiedAssumptions = { ...a, wacc, terminalGrowth: g };
      const output = computeProjections(modifiedAssumptions);
      const ev = output.evGordon;

      if (ev > 0 && isFinite(ev)) {
        minEV = Math.min(minEV, ev);
        maxEV = Math.max(maxEV, ev);
      }

      row.push({
        wacc,
        terminalGrowth: g,
        ev,
        isCurrent: wacc === a.wacc && g === a.terminalGrowth,
      });
    }
    cells.push(row);
  }

  return { waccRange, growthRange, cells, minEV, maxEV };
}

function calculateHistoricalGrowth(company: CompanyCase): number {
  const data = company.historicalData;
  if (data.length < 2) return 0;

  const startRevenue = data[0].revenue;
  const endRevenue = data[data.length - 1].revenue;
  const years = data.length - 1;

  return (Math.pow(endRevenue / startRevenue, 1 / years) - 1) * 100;
}

function formatNumber(n: number): string {
  if (n >= 1e12) return (n / 1e12).toFixed(1) + "T";
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toFixed(0);
}

export function fmt(n: number, decimals = 1): string {
  if (!isFinite(n)) return "N/A";
  const abs = Math.abs(n);
  const formatted =
    abs >= 1000
      ? abs.toLocaleString(undefined, { maximumFractionDigits: decimals })
      : abs.toFixed(decimals);
  return n < 0 ? `(${formatted})` : formatted;
}

export function fmtCompact(n: number): string {
  if (!isFinite(n)) return "N/A";
  return formatNumber(n);
}

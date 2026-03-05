import type {
  LBOAssumptions,
  LBOOutput,
  AdvancedLBOInputs,
  YearProjection,
  WaterfallItem,
} from "./types";

export function computeLBO(a: LBOAssumptions): LBOOutput {
  const entryEv = a.purchasePrice;
  const entryMultiple = a.entryEbitda > 0 ? entryEv / a.entryEbitda : 0;
  const exitEv = a.exitEbitda * a.exitMultiple;

  const debtPaydown = Math.min(a.debtAmount, a.debtAmount * 0.2 * a.holdPeriod);
  const exitEquityValue = exitEv - (a.debtAmount - debtPaydown);
  const moic = a.equityAmount > 0 ? exitEquityValue / a.equityAmount : 0;

  let irr = 0;
  if (a.equityAmount > 0 && exitEquityValue > 0 && a.holdPeriod > 0) {
    irr = Math.pow(exitEquityValue / a.equityAmount, 1 / a.holdPeriod) - 1;
    irr = irr * 100;
  }

  return {
    entryEv,
    entryMultiple,
    exitEv,
    exitMultiple: a.exitMultiple,
    moic,
    irr,
    debtPaydown,
  };
}

/** Compute advanced LBO with FCF projections and debt schedule */
export function computeAdvancedLBO(inputs: AdvancedLBOInputs): {
  projections: YearProjection[];
  exitEv: number;
  exitEquityValue: number;
  moic: number;
  irr: number;
  totalDebtPaydown: number;
} {
  const totalDebt = inputs.seniorDebt + inputs.subordinatedDebt;
  let revenue = inputs.entryRevenue;
  let ebitda = inputs.entryEbitda;
  let ebitdaMargin = revenue > 0 ? (ebitda / revenue) * 100 : 0;
  let debtBalance = totalDebt;
  const projections: YearProjection[] = [];
  const blendedRate =
    totalDebt > 0
      ? (inputs.seniorDebt * inputs.interestRateSenior +
          inputs.subordinatedDebt * inputs.interestRateSub) /
        100 /
        totalDebt
      : 0;

  for (let y = 1; y <= inputs.holdPeriod; y++) {
    revenue *= 1 + inputs.revenueGrowth / 100;
    ebitdaMargin += inputs.ebitdaMarginExpansion;
    ebitda = (revenue * ebitdaMargin) / 100;
    const capex = (revenue * inputs.capexPercentRevenue) / 100;
    const da = (revenue * inputs.dAPercentRevenue) / 100;
    const interest = debtBalance * blendedRate;
    const fcf = ebitda - interest - capex - da;
    const debtPaydown = Math.min(debtBalance, Math.max(0, fcf));
    debtBalance -= debtPaydown;

    projections.push({
      year: y,
      revenue,
      ebitda,
      ebitdaMargin,
      interest,
      fcf,
      debtBalance,
      debtPaydown,
    });
  }

  const exitEbitda = projections[projections.length - 1]!.ebitda;
  const exitEv = exitEbitda * inputs.exitMultiple;
  const exitEquityValue = exitEv - debtBalance;
  const moic =
    inputs.equityAmount > 0 ? exitEquityValue / inputs.equityAmount : 0;
  const irr =
    inputs.equityAmount > 0 && exitEquityValue > 0 && inputs.holdPeriod > 0
      ? (Math.pow(exitEquityValue / inputs.equityAmount, 1 / inputs.holdPeriod) -
          1) *
        100
      : 0;
  const totalDebtPaydown = totalDebt - debtBalance;

  return {
    projections,
    exitEv,
    exitEquityValue,
    moic,
    irr,
    totalDebtPaydown,
  };
}

/** Build cash flow waterfall for display */
export function buildCashFlowWaterfall(
  projections: YearProjection[],
  equityAmount: number,
  exitEquityValue: number
): WaterfallItem[] {
  if (projections.length === 0) return [];
  const totalInterest = projections.reduce((s, p) => s + p.interest, 0);
  const totalPaydown = projections.reduce((s, p) => s + p.debtPaydown, 0);
  const totalFcf = projections.reduce((s, p) => s + p.fcf, 0);

  return [
    { label: "Total FCF Generated", value: totalFcf, type: "inflow" },
    { label: "Interest Payments", value: -totalInterest, type: "outflow" },
    { label: "Debt Amortization", value: -totalPaydown, type: "outflow" },
    {
      label: "Equity Value Creation",
      value: exitEquityValue - equityAmount,
      type: "net",
    },
  ];
}

/** Generate deal feedback based on assumptions */
export function generateDealFeedback(assumptions: LBOAssumptions): string[] {
  const insights: string[] = [];
  const output = computeLBO(assumptions);

  const leverageRatio =
    assumptions.entryEbitda > 0
      ? assumptions.debtAmount / assumptions.entryEbitda
      : 0;
  const equityMultiple =
    assumptions.entryEbitda > 0
      ? assumptions.equityAmount / assumptions.entryEbitda
      : 0;

  if (output.irr > 25 && leverageRatio > 5) {
    insights.push(
      "Debt levels may be too aggressive relative to cash flow. Consider stress-testing interest coverage in a downturn."
    );
  }
  if (
    assumptions.exitMultiple > assumptions.purchasePrice / assumptions.entryEbitda + 2
  ) {
    insights.push(
      "The deal relies heavily on exit multiple expansion. Ensure operational improvements justify a higher exit multiple."
    );
  }
  if (
    assumptions.exitEbitda / assumptions.entryEbitda > 1.5 &&
    assumptions.exitMultiple < assumptions.purchasePrice / assumptions.entryEbitda
  ) {
    insights.push(
      "Operational improvements are the main driver of value creation. Strong EBITDA growth reduces reliance on multiple expansion."
    );
  }
  if (output.moic < 2 && assumptions.holdPeriod >= 5) {
    insights.push(
      "Returns may be below typical PE targets (2–2.5x MOIC). Consider whether the deal meets fund return hurdles."
    );
  }
  if (leverageRatio < 3 && equityMultiple > 4) {
    insights.push(
      "Conservative capital structure. Lower leverage reduces risk but also limits equity return amplification."
    );
  }
  if (insights.length === 0) {
    insights.push(
      "Deal structure appears balanced. Consider sensitivity analysis on exit multiple and EBITDA growth."
    );
  }
  return insights;
}

export function fmt(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

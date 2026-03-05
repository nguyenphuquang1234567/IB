export interface ValuationInputs {
  revenue: number;
  ebitda: number;
  netIncome: number;
  fcf: number;
  shares: number;
  netDebt: number;
  revenueGrowth: number;
  fcfGrowth: number;
  terminalGrowth: number;
  wacc: number;
  evEbitdaMultiple: number;
  peMultiple: number;
  marketPrice: number;
}

export interface ValuationOutput {
  dcfValue: number;
  evEbitdaValue: number;
  peValue: number;
  intrinsicValue: number;
  marketPrice: number;
  upside: number;
  interpretation: string;
}

export function computeValuation(inputs: ValuationInputs): ValuationOutput {
  const { fcf, shares, netDebt, fcfGrowth, terminalGrowth, wacc, ebitda, netIncome, evEbitdaMultiple, peMultiple, marketPrice } = inputs;

  // DCF: 5-year explicit + terminal value
  const years = 5;
  let pvFcf = 0;
  let fcfProjected = fcf;
  for (let i = 1; i <= years; i++) {
    fcfProjected *= 1 + fcfGrowth / 100;
    pvFcf += fcfProjected / Math.pow(1 + wacc / 100, i);
  }
  const terminalFcf = fcfProjected * (1 + terminalGrowth / 100);
  const terminalValue = terminalFcf / ((wacc - terminalGrowth) / 100);
  const pvTerminal = terminalValue / Math.pow(1 + wacc / 100, years);
  const evDcf = pvFcf + pvTerminal;
  const equityDcf = evDcf - netDebt;
  const dcfValue = equityDcf / shares;

  // EV/EBITDA (multiple is e.g. 15 for 15x)
  const evFromEbitda = ebitda * evEbitdaMultiple;
  const equityFromEbitda = evFromEbitda - netDebt;
  const evEbitdaValue = equityFromEbitda / shares;

  // P/E (multiple is e.g. 25 for 25x)
  const peValue = netIncome > 0 ? (netIncome * peMultiple) / shares : 0;

  // Blended intrinsic (equal weight for simplicity)
  const intrinsicValue = (dcfValue + evEbitdaValue + (peValue || dcfValue)) / (peValue ? 3 : 2);
  const upside = marketPrice > 0 ? ((intrinsicValue - marketPrice) / marketPrice) * 100 : 0;

  let interpretation = "";
  if (intrinsicValue > marketPrice * 1.1) {
    interpretation = "Stock may be undervalued under current assumptions. Consider Buy if thesis holds.";
  } else if (intrinsicValue < marketPrice * 0.9) {
    interpretation = "Stock may be overvalued under current assumptions. Consider Hold or Sell.";
  } else {
    interpretation = "Valuation roughly in line with intrinsic value. Monitor for catalyst or risk changes.";
  }

  return {
    dcfValue,
    evEbitdaValue,
    peValue,
    intrinsicValue,
    marketPrice,
    upside,
    interpretation,
  };
}

export function getAnalysisFeedback(
  identifiedDrivers: string[],
  missedRisks: string[],
  valuationOptimistic: boolean
): string[] {
  const feedback: string[] = [];

  if (identifiedDrivers.length > 0) {
    feedback.push("Your analysis correctly identified revenue growth drivers.");
  }

  if (missedRisks.length > 0) {
    feedback.push(`You overlooked cost structure risks: ${missedRisks.join("; ")}`);
  }

  if (valuationOptimistic) {
    feedback.push("Your valuation assumptions may be too optimistic. Consider stress-testing growth and multiples.");
  }

  if (feedback.length === 0) {
    feedback.push("Strong analysis. Consider adding sensitivity analysis and peer comparison.");
  }

  // Always add improvement suggestions
  feedback.push("Suggestion: Cross-check your thesis with the Valuation Lab and stress-test key assumptions.");
  return feedback;
}

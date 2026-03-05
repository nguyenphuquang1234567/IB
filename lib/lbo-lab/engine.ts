import type { LBOAssumptions, LBOOutput } from "./types";

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

export function fmt(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

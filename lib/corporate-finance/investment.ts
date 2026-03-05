export interface InvestmentConcept {
  id: string;
  title: string;
  explanation: string;
  formula: string;
  example: string;
  mistakes: string[];
}

export const INVESTMENT_CONCEPTS: InvestmentConcept[] = [
  {
    id: "npv",
    title: "Net Present Value (NPV)",
    explanation:
      "NPV is the present value of all future cash flows minus the initial investment. NPV > 0 means the project creates value. Use the cost of capital as the discount rate.",
    formula: "NPV = Σ [CFt / (1 + r)^t] − Initial Investment",
    example: "Initial $100, CF1=$40, CF2=$50, CF3=$60, r=10%: NPV = 40/1.1 + 50/1.21 + 60/1.331 − 100 ≈ $17.5",
    mistakes: [
      "Using wrong discount rate (WACC vs project-specific)",
      "Including sunk costs in the analysis",
      "Ignoring working capital requirements",
    ],
  },
  {
    id: "irr",
    title: "Internal Rate of Return (IRR)",
    explanation:
      "IRR is the discount rate that makes NPV = 0. It represents the project's expected return. Accept if IRR > cost of capital. Watch for multiple IRRs with non-conventional cash flows.",
    formula: "NPV = 0 when r = IRR",
    example: "Project with $100 initial, $50/year for 3 years: IRR ≈ 23.4%",
    mistakes: [
      "Comparing IRR across projects with different scales",
      "IRR assumes reinvestment at IRR (use MIRR for realism)",
      "Multiple IRRs with sign changes in cash flows",
    ],
  },
  {
    id: "payback",
    title: "Payback Period",
    explanation:
      "Payback is the time to recover the initial investment. Simple but ignores time value of money. Discounted payback addresses this. Used as a liquidity screen.",
    formula: "Payback = Years until Cumulative CF ≥ Initial Investment",
    example: "Initial $200, CFs $60, $80, $90: Payback = 2 + (200−140)/90 ≈ 2.67 years",
    mistakes: [
      "Ignoring cash flows after payback",
      "Using undiscounted payback for long projects",
      "Setting arbitrary payback hurdles without rationale",
    ],
  },
  {
    id: "capital-budgeting",
    title: "Capital Budgeting Decisions",
    explanation:
      "Capital budgeting evaluates long-term investments. Key steps: estimate cash flows, determine discount rate, compute NPV/IRR, consider strategic and qualitative factors.",
    formula: "Accept if NPV > 0 and IRR > WACC",
    example: "A factory with positive NPV and 18% IRR should be approved if WACC is 10%.",
    mistakes: [
      "Ignoring opportunity cost of capital",
      "Not adjusting for inflation consistently",
      "Overlooking real options (expand, abandon)",
    ],
  },
  {
    id: "discounted-payback",
    title: "Discounted Payback Period",
    explanation:
      "Unlike simple payback, discounted payback uses present values. It accounts for time value of money. Still ignores cash flows after payback but is a better liquidity screen for long projects.",
    formula: "Discounted Payback = Years until Σ PV(CF) ≥ Initial Investment",
    example: "At 10% discount, $100 initial, PV of CFs: $36, $41, $45. Payback ≈ 2.5 years.",
    mistakes: [
      "Using undiscounted payback for projects > 2 years",
      "Ignoring post-payback value",
      "Setting same hurdle as simple payback",
    ],
  },
  {
    id: "mutually-exclusive",
    title: "Mutually Exclusive Projects",
    explanation:
      "When choosing between projects (only one can be done), NPV is the correct criterion. IRR can rank incorrectly due to scale and timing. Always compare NPV at the same discount rate.",
    formula: "Choose project with higher NPV",
    example: "Project A: NPV $50, IRR 25%. Project B: NPV $80, IRR 18%. Choose B.",
    mistakes: [
      "Choosing based on IRR when projects differ in scale",
      "Using different discount rates for comparison",
      "Ignoring reinvestment assumptions",
    ],
  },
];

export interface FactoryScenario {
  id: string;
  name: string;
  initialInvestment: number;
  cashFlows: number[];
  discountRate: number;
  suggestedInvest: boolean;
  explanation: string;
}

export const FACTORY_SCENARIOS: FactoryScenario[] = [
  {
    id: "factory-a",
    name: "New Factory - Region A",
    initialInvestment: 500,
    cashFlows: [80, 120, 150, 140, 130],
    discountRate: 10,
    suggestedInvest: true,
    explanation: "NPV is positive. The project creates value with strong cash flows in years 2-3.",
  },
  {
    id: "factory-b",
    name: "Expansion - Region B",
    initialInvestment: 800,
    cashFlows: [100, 150, 180, 200, 220],
    discountRate: 12,
    suggestedInvest: true,
    explanation: "NPV > 0 and IRR exceeds WACC. Expansion is value-accretive.",
  },
  {
    id: "factory-c",
    name: "Automation Upgrade",
    initialInvestment: 300,
    cashFlows: [40, 50, 55, 50, 45],
    discountRate: 10,
    suggestedInvest: false,
    explanation: "NPV is negative. The automation does not generate sufficient savings to justify the investment.",
  },
];

export function computeNPV(initial: number, cashFlows: number[], rate: number): number {
  let npv = -initial;
  for (let t = 0; t < cashFlows.length; t++) {
    npv += cashFlows[t]! / Math.pow(1 + rate / 100, t + 1);
  }
  return npv;
}

export function computeIRR(initial: number, cashFlows: number[]): number {
  const fn = (r: number) => {
    let npv = -initial;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t]! / Math.pow(1 + r, t + 1);
    }
    return npv;
  };
  let low = 0, high = 1;
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    if (fn(mid) > 0) low = mid;
    else high = mid;
  }
  return (low + high) / 2 * 100;
}

export function computePayback(initial: number, cashFlows: number[]): number {
  let cum = 0;
  for (let t = 0; t < cashFlows.length; t++) {
    cum += cashFlows[t]!;
    if (cum >= initial) return t + (initial - (cum - cashFlows[t]!)) / cashFlows[t]!;
  }
  return cashFlows.length + 1;
}

export interface StrategyScenario {
  id: string;
  title: string;
  description: string;
  options: { id: string; label: string; impact: string }[];
  correctOption: string;
  explanation: string;
}

export const STRATEGY_SCENARIOS: StrategyScenario[] = [
  {
    id: "new-market",
    title: "Expand into New Market",
    description:
      "The company is considering entering a new geographic market. Initial investment would be $50M with expected payback in 4 years. The market is competitive but growing 12% annually.",
    options: [
      { id: "a", label: "Proceed with full investment", impact: "High growth potential, significant upfront cash outflow" },
      { id: "b", label: "Pilot with 20% investment first", impact: "Lower risk, validate before scaling" },
      { id: "c", label: "Acquire a local player instead", impact: "Faster entry, integration risk" },
      { id: "d", label: "Defer expansion", impact: "Preserve cash, may lose first-mover advantage" },
    ],
    correctOption: "b",
    explanation:
      "A pilot approach balances growth ambition with risk. It allows validation of assumptions before committing full capital. Full investment or acquisition may be appropriate later based on pilot results.",
  },
  {
    id: "raise-debt",
    title: "Raise Debt to Fund Growth",
    description:
      "The company needs $100M to fund a new product line. Current debt/EBITDA is 2.5x. The board is debating between debt and equity financing.",
    options: [
      { id: "a", label: "Raise $100M debt", impact: "Increases leverage, tax shield, covenant pressure" },
      { id: "b", label: "Raise $100M equity", impact: "Dilution, no interest burden" },
      { id: "c", label: "50% debt, 50% equity", impact: "Balanced approach" },
      { id: "d", label: "Delay the product line", impact: "No financing needed, growth delayed" },
    ],
    correctOption: "c",
    explanation:
      "A mix of debt and equity balances cost of capital with financial flexibility. Pure debt may strain covenants; pure equity may be dilutive. The 50/50 split depends on current leverage and growth visibility.",
  },
  {
    id: "cut-costs",
    title: "Cut Operating Costs",
    description:
      "EBITDA margin has declined from 18% to 12% over two years. Management is considering a cost reduction program targeting $20M in annual savings.",
    options: [
      { id: "a", label: "Cut SG&A by 15%", impact: "Quick savings, may hurt sales and support" },
      { id: "b", label: "Optimize supply chain", impact: "COGS reduction, longer implementation" },
      { id: "c", label: "Reduce R&D spend", impact: "Short-term margin gain, long-term product risk" },
      { id: "d", label: "Combination of targeted cuts", impact: "Balanced, requires careful prioritization" },
    ],
    correctOption: "d",
    explanation:
      "Targeted cuts across multiple areas typically preserve capability while achieving savings. Aggressive single-area cuts (e.g., R&D) can damage long-term competitiveness. Supply chain and SG&A optimization are often sustainable.",
  },
  {
    id: "new-product",
    title: "Launch New Product Line",
    description:
      "R&D has developed a new product with $30M development cost already sunk. Launch requires $15M in marketing and $10M in working capital. Projected Year 1 revenue: $25M, Year 2: $45M.",
    options: [
      { id: "a", label: "Launch immediately", impact: "Capture market, full investment" },
      { id: "b", label: "Soft launch in one region", impact: "Test demand, lower upfront cost" },
      { id: "c", label: "License to a partner", impact: "Lower risk, shared upside" },
      { id: "d", label: "Shelve the product", impact: "Avoid further investment, write off sunk cost" },
    ],
    correctOption: "b",
    explanation:
      "A soft launch validates demand before full commitment. Sunk costs are irrelevant to the go-forward decision. Licensing or shelving may be appropriate if soft launch underperforms.",
  },
];

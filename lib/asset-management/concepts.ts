export interface AMConcept {
  id: string;
  title: string;
  explanation: string;
  formula: string;
  example: string;
  mistakes: string[];
}

export const AM_CONCEPTS: AMConcept[] = [
  {
    id: "asset-allocation",
    title: "Asset Allocation",
    explanation:
      "Asset allocation is the process of dividing investments across asset classes (equities, bonds, cash, alternatives) to balance risk and return. It is often the primary driver of portfolio performance.",
    formula: "Portfolio Return = Σ (Weight_i × Return_i)",
    example:
      "A 60/40 portfolio (60% stocks, 40% bonds) historically offers a balance of growth and stability. During downturns, bonds often provide cushion.",
    mistakes: [
      "Chasing past performance instead of sticking to a strategic allocation",
      "Ignoring correlation between assets when diversifying",
      "Over-concentrating in a single asset class",
    ],
  },
  {
    id: "risk-return",
    title: "Risk vs Return",
    explanation:
      "Higher expected returns typically come with higher risk (volatility). The risk-return tradeoff is fundamental: investors demand compensation for bearing uncertainty.",
    formula: "Expected Return ≈ Risk-Free Rate + (Risk Premium × Risk Level)",
    example:
      "Treasury bonds offer ~4% with low risk; equities historically ~10% with higher volatility. High-yield bonds sit between.",
    mistakes: [
      "Ignoring downside risk when chasing returns",
      "Assuming historical returns will repeat",
      "Not matching risk tolerance to time horizon",
    ],
  },
  {
    id: "diversification",
    title: "Diversification",
    explanation:
      "Diversification reduces portfolio risk by investing in assets that do not move perfectly together. Uncorrelated assets smooth returns and lower volatility.",
    formula: "Portfolio Volatility < Weighted Avg of Individual Volatilities (when correlation < 1)",
    example:
      "A portfolio combining stocks, bonds, and commodities tends to have lower volatility than a portfolio of only stocks.",
    mistakes: [
      "Over-diversifying (diminishing benefits, higher costs)",
      "Assuming diversification during crises (correlations can spike)",
      "Diversifying within the same factor (e.g., only tech stocks)",
    ],
  },
  {
    id: "portfolio-optimization",
    title: "Portfolio Optimization",
    explanation:
      "Modern Portfolio Theory (MPT) seeks the efficient frontier: the set of portfolios offering maximum return for a given level of risk. Mean-variance optimization uses expected returns and covariances.",
    formula: "Sharpe Ratio = (Return − Risk-Free Rate) / Volatility",
    example:
      "An efficient portfolio maximizes Sharpe ratio. Adding a low-correlation asset can improve risk-adjusted returns even if its standalone return is modest.",
    mistakes: [
      "Over-relying on historical inputs (Garbage In, Garbage Out)",
      "Ignoring transaction costs and taxes",
      "Optimizing for short-term when horizon is long",
    ],
  },
  {
    id: "beta",
    title: "Beta and Market Exposure",
    explanation:
      "Beta measures an asset's sensitivity to market moves. Beta = 1 means the asset moves with the market; Beta > 1 means more volatile; Beta < 1 means less volatile.",
    formula: "Beta = Covariance(Asset, Market) / Variance(Market)",
    example:
      "A stock with Beta 1.2 typically rises 12% when the market rises 10%, and falls 12% when the market falls 10%.",
    mistakes: [
      "Assuming Beta is stable (it can change over time)",
      "Using Beta as the only risk measure",
      "Ignoring idiosyncratic (firm-specific) risk",
    ],
  },
  {
    id: "alpha",
    title: "Alpha Generation",
    explanation:
      "Alpha is excess return above a benchmark, adjusted for risk. It represents skill or edge. Beta is market exposure; alpha is what active managers add.",
    formula: "Alpha = Actual Return − (Risk-Free Rate + Beta × (Market Return − Risk-Free Rate))",
    example:
      "A fund returning 12% when the market returns 10% and Beta is 1.0 has positive alpha if the excess is not explained by luck.",
    mistakes: [
      "Confusing luck with skill (need long track record)",
      "Ignoring fees when evaluating alpha",
      "Chasing alpha in efficient markets",
    ],
  },
  {
    id: "benchmark",
    title: "Benchmark Comparison",
    explanation:
      "Benchmarks (S&P 500, MSCI World, Bloomberg Agg) provide a reference for performance. Beating the benchmark after fees is the goal of active management.",
    formula: "Excess Return = Portfolio Return − Benchmark Return",
    example:
      "A US equity fund might use S&P 500 as benchmark. Beating it by 2% annually after fees indicates value added.",
    mistakes: [
      "Using an inappropriate benchmark (wrong asset class or geography)",
      "Ignoring benchmark composition when comparing",
      "Not adjusting for risk (comparing high-beta fund to index)",
    ],
  },
];

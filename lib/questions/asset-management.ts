import { Question } from "@/types/question";

export const assetManagementQuestions: Question[] = [
  {
    id: "am-1",
    section: "Portfolio Theory",
    difficulty: "Beginner",
    type: "mcq",
    question: "What does the Capital Asset Pricing Model (CAPM) assume about investors?",
    choices: [
      "Investors are risk-seeking",
      "Investors are risk-averse and hold diversified portfolios",
      "Investors only care about dividends",
      "Investors ignore transaction costs",
    ],
    correctAnswer: "Investors are risk-averse and hold diversified portfolios",
    explanation:
      "CAPM assumes investors are risk-averse and hold the market portfolio (fully diversified). Systematic risk is priced; idiosyncratic risk is diversified away.",
  },
  {
    id: "am-2",
    section: "Portfolio Theory",
    difficulty: "Intermediate",
    type: "mcq",
    question: "What is the Sharpe ratio formula?",
    choices: [
      "(Return - Risk-free rate) / Standard deviation",
      "Return / Beta",
      "Alpha / Tracking error",
      "Information ratio × Beta",
    ],
    correctAnswer: "(Return - Risk-free rate) / Standard deviation",
    explanation:
      "Sharpe ratio = (Rp - Rf) / σp. It measures excess return per unit of total risk (volatility).",
  },
  {
    id: "am-3",
    section: "Asset Allocation",
    difficulty: "Beginner",
    type: "mcq",
    question: "What is the main benefit of diversification?",
    choices: [
      "Higher expected returns",
      "Reduction of unsystematic (idiosyncratic) risk",
      "Elimination of all risk",
      "Lower transaction costs",
    ],
    correctAnswer: "Reduction of unsystematic (idiosyncratic) risk",
    explanation:
      "Diversification reduces firm-specific risk. Systematic (market) risk cannot be diversified away.",
  },
  {
    id: "am-4",
    section: "Asset Allocation",
    difficulty: "Intermediate",
    type: "mcq",
    question: "A 60/40 portfolio typically refers to:",
    choices: [
      "60% bonds, 40% cash",
      "60% equities, 40% bonds",
      "60% alternatives, 40% equities",
      "60% domestic, 40% international",
    ],
    correctAnswer: "60% equities, 40% bonds",
    explanation:
      "60/40 is a classic balanced allocation: 60% stocks for growth, 40% bonds for stability and income.",
  },
  {
    id: "am-5",
    section: "Risk Management",
    difficulty: "Intermediate",
    type: "mcq",
    question: "What does Value at Risk (VaR) measure?",
    choices: [
      "Maximum expected return over a period",
      "Maximum potential loss at a given confidence level",
      "Average volatility of a portfolio",
      "Correlation between assets",
    ],
    correctAnswer: "Maximum potential loss at a given confidence level",
    explanation:
      "VaR estimates the maximum loss (in $ or %) over a time horizon at a specified confidence level (e.g., 95% or 99%).",
  },
  {
    id: "am-6",
    section: "Risk Management",
    difficulty: "Beginner",
    type: "mcq",
    question: "Beta of 1.2 means the asset:",
    choices: [
      "Moves 20% less than the market",
      "Moves 20% more than the market",
      "Is uncorrelated with the market",
      "Has zero systematic risk",
    ],
    correctAnswer: "Moves 20% more than the market",
    explanation:
      "Beta > 1 means the asset is more volatile than the market. Beta = 1.2 implies ~20% more sensitivity to market moves.",
  },
  {
    id: "am-7",
    section: "Investment Strategies",
    difficulty: "Intermediate",
    type: "mcq",
    question: "What is the primary goal of a passive investment strategy?",
    choices: [
      "Beat the benchmark through stock picking",
      "Match benchmark returns at low cost",
      "Maximize alpha through timing",
      "Concentrate in high-conviction names",
    ],
    correctAnswer: "Match benchmark returns at low cost",
    explanation:
      "Passive investing (e.g., index funds) aims to replicate benchmark performance with minimal fees and turnover.",
  },
  {
    id: "am-8",
    section: "Investment Strategies",
    difficulty: "Intermediate",
    type: "mcq",
    question: "Active management seeks to generate:",
    choices: [
      "Only beta",
      "Alpha (excess return over benchmark)",
      "Zero tracking error",
      "Minimum volatility",
    ],
    correctAnswer: "Alpha (excess return over benchmark)",
    explanation:
      "Active managers aim to outperform the benchmark through security selection, timing, or sector allocation.",
  },
  {
    id: "am-9",
    section: "Fixed Income",
    difficulty: "Beginner",
    type: "mcq",
    question: "When interest rates rise, bond prices typically:",
    choices: [
      "Rise",
      "Fall",
      "Stay unchanged",
      "Rise for short-term only",
    ],
    correctAnswer: "Fall",
    explanation:
      "Bond prices and yields move inversely. When rates rise, existing bonds with lower coupons become less attractive.",
  },
  {
    id: "am-10",
    section: "Fixed Income",
    difficulty: "Intermediate",
    type: "mcq",
    question: "Duration measures a bond's sensitivity to:",
    choices: [
      "Credit spread changes",
      "Interest rate changes",
      "Liquidity changes",
      "Currency moves",
    ],
    correctAnswer: "Interest rate changes",
    explanation:
      "Duration approximates the % change in bond price for a 1% change in yield. Higher duration = higher rate sensitivity.",
  },
  // Investment Decision Exercises
  {
    id: "am-11",
    section: "Asset Allocation",
    difficulty: "Beginner",
    type: "mcq",
    question: "An investor wants moderate risk with long-term growth. Which portfolio allocation is most appropriate?",
    choices: [
      "90% equities, 10% cash",
      "50% equities, 40% bonds, 10% cash",
      "20% equities, 80% bonds",
      "100% cash",
    ],
    correctAnswer: "50% equities, 40% bonds, 10% cash",
    explanation:
      "A balanced 50/40/10 allocation provides growth from equities, stability from bonds, and liquidity from cash. It balances risk and return for moderate-risk investors.",
  },
  {
    id: "am-12",
    section: "Asset Allocation",
    difficulty: "Intermediate",
    type: "mcq",
    question: "A retiree needs income and capital preservation. Which allocation best fits their goals?",
    choices: [
      "70% equities, 30% bonds",
      "30% equities, 60% bonds, 10% cash",
      "50% commodities, 50% real estate",
      "100% growth stocks",
    ],
    correctAnswer: "30% equities, 60% bonds, 10% cash",
    explanation:
      "Retirees typically prioritize income and stability. Higher bond allocation provides yield and lower volatility; modest equity exposure maintains some growth.",
  },
  {
    id: "am-13",
    section: "Risk Management",
    difficulty: "Intermediate",
    type: "mcq",
    question: "During a market downturn, a portfolio with 80% equities experiences a -15% drawdown. What action is most prudent?",
    choices: [
      "Sell all equities and move to cash",
      "Rebalance toward target allocation if it has drifted significantly",
      "Double down on equities to buy the dip",
      "Ignore the drawdown; no action needed",
    ],
    correctAnswer: "Rebalance toward target allocation if it has drifted significantly",
    explanation:
      "Panic selling locks in losses. Rebalancing buys assets when they are cheap and maintains discipline. Avoid emotional decisions during volatility.",
  },
  {
    id: "am-14",
    section: "Portfolio Theory",
    difficulty: "Intermediate",
    type: "mcq",
    question: "A portfolio has a Sharpe ratio of 0.4 and the benchmark has 0.6. What does this suggest?",
    choices: [
      "The portfolio has higher risk-adjusted returns than the benchmark",
      "The portfolio has lower risk-adjusted returns than the benchmark",
      "The portfolio has zero risk",
      "The benchmark is poorly constructed",
    ],
    correctAnswer: "The portfolio has lower risk-adjusted returns than the benchmark",
    explanation:
      "Sharpe ratio measures excess return per unit of risk. A lower Sharpe means the portfolio delivers less return for the risk taken compared to the benchmark.",
  },
  {
    id: "am-15",
    section: "Asset Allocation",
    difficulty: "Beginner",
    type: "mcq",
    question: "An investor has a 10-year time horizon and high risk tolerance. Which allocation is most suitable?",
    choices: [
      "20% equities, 80% bonds",
      "80% equities, 15% bonds, 5% cash",
      "50% cash, 50% money market",
      "100% commodities",
    ],
    correctAnswer: "80% equities, 15% bonds, 5% cash",
    explanation:
      "Long horizon and high risk tolerance support higher equity allocation. Equities offer growth potential; bonds and cash provide some diversification and liquidity.",
  },
];

import type { LucideIcon } from "lucide-react";
import {
  FlaskConical,
  TrendingUp,
  Lightbulb,
  Layers,
  Target,
  Droplets,
  LineChart,
  Gamepad2,
} from "lucide-react";

export interface LearningStep {
  id: string;
  order: number;
  href: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  color: string;
  description: string;
  estimatedMinutes: number;
}

/** Recommended learning path - follow this timeline for best results */
export const CF_LEARNING_PATH: LearningStep[] = [
  {
    id: "simulation",
    order: 1,
    href: "/simulation",
    label: "3-Statement Sim",
    shortLabel: "3-Statement",
    icon: FlaskConical,
    color: "from-blue-500 to-cyan-500",
    description: "Foundation: Income statement, balance sheet, cash flow linkages",
    estimatedMinutes: 30,
  },
  {
    id: "budgeting",
    order: 2,
    href: "/budgeting-forecasting",
    label: "Budgeting & Forecasting",
    shortLabel: "Budgeting",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
    description: "Revenue, COGS, OpEx, variance analysis, scenarios",
    estimatedMinutes: 60,
  },
  {
    id: "capital-structure",
    order: 3,
    href: "/corporate-finance/capital-structure",
    label: "Capital Structure Lab",
    shortLabel: "Capital Structure",
    icon: Layers,
    color: "from-amber-500 to-orange-500",
    description: "Cost of debt, equity, WACC, optimal structure",
    estimatedMinutes: 45,
  },
  {
    id: "investment",
    order: 4,
    href: "/corporate-finance/investment",
    label: "Corporate Investment Lab",
    shortLabel: "Investment",
    icon: Target,
    color: "from-violet-500 to-purple-500",
    description: "NPV, IRR, payback, capital budgeting",
    estimatedMinutes: 45,
  },
  {
    id: "cash-flow",
    order: 5,
    href: "/corporate-finance/cash-flow",
    label: "Cash Flow & Liquidity Lab",
    shortLabel: "Cash Flow",
    icon: Droplets,
    color: "from-cyan-500 to-blue-500",
    description: "OCF, working capital, CCC, liquidity",
    estimatedMinutes: 60,
  },
  {
    id: "performance",
    order: 6,
    href: "/corporate-finance/performance",
    label: "Financial Performance Lab",
    shortLabel: "Performance",
    icon: LineChart,
    color: "from-rose-500 to-pink-500",
    description: "Margins, ROA, ROIC, cost structure",
    estimatedMinutes: 45,
  },
  {
    id: "strategy",
    order: 7,
    href: "/corporate-finance/strategy",
    label: "Corporate Strategy Simulator",
    shortLabel: "Strategy",
    icon: Gamepad2,
    color: "from-amber-500 to-orange-500",
    description: "Strategic decisions, expansion, financing",
    estimatedMinutes: 30,
  },
  {
    id: "business-acumen",
    order: 8,
    href: "/business-acumen",
    label: "Business Acumen Testing",
    shortLabel: "Business Acumen",
    icon: Lightbulb,
    color: "from-indigo-500 to-purple-500",
    description: "Apply knowledge in real scenarios",
    estimatedMinutes: 45,
  },
];

export const CF_LAB_IDS = CF_LEARNING_PATH.map((s) => s.id);

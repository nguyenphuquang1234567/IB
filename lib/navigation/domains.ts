import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  FileSpreadsheet,
  FileText,
  GripVertical,
  FlaskConical,
  BarChart3,
  Landmark,
  Briefcase,
  PieChart,
  Search,
  ListChecks,
  PenLine,
  TrendingUp,
  Lightbulb,
  Target,
  BookOpen,
  Zap,
} from "lucide-react";

export interface DomainItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

export interface Domain {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
  landingHref: string;
  items: DomainItem[];
}

export const DOMAINS: Domain[] = [
  {
    id: "corporate-finance",
    label: "Corporate Finance",
    icon: FlaskConical,
    color: "from-blue-500 to-cyan-500",
    description: "3-statement modeling, budgeting, and business acumen",
    landingHref: "/corporate-finance",
    items: [
      { href: "/simulation", label: "3-Statement Sim", icon: FlaskConical },
      { href: "/budgeting-forecasting", label: "Budgeting & Forecasting", icon: TrendingUp },
      { href: "/business-acumen", label: "Business Acumen Testing", icon: Lightbulb },
    ],
  },
  {
    id: "accounting",
    label: "Accounting",
    icon: FileSpreadsheet,
    color: "from-amber-500 to-orange-500",
    description: "Financial statements, line items, and linkages",
    landingHref: "/accounting-hub",
    items: [
      { href: "/accounting", label: "Statement Builder", icon: FileSpreadsheet },
      { href: "/accounting-drag", label: "Drag & Drop", icon: GripVertical },
    ],
  },
  {
    id: "ib",
    label: "Investment Banking",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-500",
    description: "Technical questions, M&A, LBO, DCF, Comps, and fit interviews",
    landingHref: "/ib",
    items: [
      { href: "/quiz", label: "400 IB Book", icon: ListChecks, description: "MCQ & behavioral practice" },
      { href: "/quiz/essay", label: "Essay Mode", icon: PenLine },
      { href: "/valuation", label: "Valuation Labs", icon: Calculator },
      { href: "/dcf", label: "DCF Lab", icon: Calculator },
      { href: "/valuation/comps", label: "Comps Lab", icon: BarChart3 },
      { href: "/valuation/lbo", label: "LBO Lab", icon: Landmark },
    ],
  },
  {
    id: "asset-management",
    label: "Asset Management",
    icon: PieChart,
    color: "from-violet-500 to-purple-500",
    description: "Portfolio management and investment strategies",
    landingHref: "/asset-management",
    items: [
      { href: "/asset-management/learning", label: "Investment Fundamentals", icon: BookOpen },
      { href: "/asset-management/construction", label: "Portfolio Construction", icon: PieChart },
      { href: "/asset-management/risk", label: "Risk & Performance", icon: BarChart3 },
      { href: "/asset-management/simulation", label: "Portfolio Simulation", icon: Zap },
      { href: "/asset-management/quiz", label: "AM Practice", icon: Target },
    ],
  },
  {
    id: "equity-research",
    label: "Equity Research",
    icon: Search,
    color: "from-rose-500 to-pink-500",
    description: "Company analysis and research reports",
    landingHref: "/equity-research",
    items: [
      { href: "/equity-research/learning", label: "Fundamentals", icon: BookOpen },
      { href: "/equity-research/companies", label: "Company Analysis Lab", icon: Search },
      { href: "/equity-research/valuation", label: "Valuation Lab", icon: Calculator },
      { href: "/equity-research/thesis", label: "Thesis Builder", icon: FileText },
      { href: "/equity-research/quiz", label: "ER Practice", icon: Target },
    ],
  },
];

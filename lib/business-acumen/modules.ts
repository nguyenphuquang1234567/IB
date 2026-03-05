import { ACUMEN_CONCEPTS } from "./concepts";

export interface BAModule {
  id: string;
  order: number;
  title: string;
  description: string;
  conceptIds: string[];
  estimatedMinutes: number;
}

/** Các module bài học - timeline cụ thể */
export const BA_LEARNING_MODULES: BAModule[] = [
  {
    id: "revenue-profit",
    order: 1,
    title: "Revenue & Profit Drivers",
    description: "Hiểu các yếu tố thúc đẩy doanh thu và lợi nhuận",
    conceptIds: ["revenue-drivers", "cost-structure", "unit-economics"],
    estimatedMinutes: 20,
  },
  {
    id: "market-strategy",
    order: 2,
    title: "Market & Strategy",
    description: "Market sizing, chiến lược cạnh tranh, định giá",
    conceptIds: ["market-sizing", "competitive-strategy", "pricing-strategy"],
    estimatedMinutes: 25,
  },
  {
    id: "tradeoffs-operations",
    order: 3,
    title: "Tradeoffs & Operations",
    description: "Growth vs profitability, working capital, break-even",
    conceptIds: ["growth-vs-profitability", "working-capital", "break-even-analysis"],
    estimatedMinutes: 20,
  },
  {
    id: "advanced-topics",
    order: 4,
    title: "Advanced Topics",
    description: "Segmentation, lifecycle, moats, scenario, KPIs",
    conceptIds: [
      "customer-segmentation",
      "product-lifecycle",
      "competitive-moats",
      "scenario-analysis",
      "kpi-dashboards",
    ],
    estimatedMinutes: 35,
  },
];

/** Lấy concept theo ID */
export function getConceptById(id: string) {
  return ACUMEN_CONCEPTS.find((c) => c.id === id);
}

/** Tổng số bài học (concepts) */
export const TOTAL_BA_LESSONS = ACUMEN_CONCEPTS.length;

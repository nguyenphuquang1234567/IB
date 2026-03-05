"use client";

import type { DiagramType } from "@/lib/equity-research/concepts";
import { Shield, TrendingUp, DollarSign, BarChart3 } from "lucide-react";

const MOAT_ITEMS = [
  { label: "Strong Brand", desc: "Pricing power, loyalty", icon: Shield },
  { label: "Network Effects", desc: "Value grows with users", icon: TrendingUp },
  { label: "Cost Advantages", desc: "Scale, efficiency", icon: DollarSign },
  { label: "Switching Costs", desc: "Lock-in, integration", icon: BarChart3 },
];

const FIVE_FORCES = [
  "Rivalry",
  "New Entrants",
  "Substitutes",
  "Buyer Power",
  "Supplier Power",
];

const REVENUE_DRIVERS = [
  "Volume",
  "Price",
  "Mix",
  "Geography",
  "New Products",
  "Market Share",
];

const VALUATION_METHODS = [
  { name: "DCF", desc: "Intrinsic value" },
  { name: "Comps", desc: "Relative value" },
  { name: "Precedent Tx", desc: "M&A benchmarks" },
];

const THESIS_STEPS = [
  "Overview",
  "Industry",
  "Growth",
  "Risks",
  "Valuation",
  "Recommendation",
];

interface ConceptDiagramProps {
  type: DiagramType;
}

export function ConceptDiagram({ type }: ConceptDiagramProps) {
  if (type === "moat-grid") {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Types of Competitive Advantage
        </p>
        <div className="grid grid-cols-2 gap-3">
          {MOAT_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-md bg-background p-3 border shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-finstep-orange/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-finstep-orange" />
              </div>
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "five-forces") {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Porter&apos;s Five Forces
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {FIVE_FORCES.map((f, i) => (
            <div
              key={i}
              className="rounded-md bg-background border p-2 text-center"
            >
              <span className="text-xs font-medium">{f}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "revenue-drivers") {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Key Revenue Drivers
        </p>
        <div className="flex flex-wrap gap-2">
          {REVENUE_DRIVERS.map((d, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-md bg-background border text-sm"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (type === "valuation-methods") {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Valuation Frameworks
        </p>
        <div className="space-y-2">
          {VALUATION_METHODS.map((m, i) => (
            <div
              key={i}
              className="flex justify-between items-center rounded-md bg-background px-3 py-2 border"
            >
              <span className="text-sm font-medium">{m.name}</span>
              <span className="text-xs text-muted-foreground">{m.desc}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "thesis-flow") {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Thesis Structure
        </p>
        <div className="flex flex-wrap gap-2">
          {THESIS_STEPS.map((s, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="px-2.5 py-1 rounded bg-finstep-orange/10 text-xs font-medium">
                {s}
              </span>
              {i < THESIS_STEPS.length - 1 && (
                <span className="text-muted-foreground">→</span>
              )}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

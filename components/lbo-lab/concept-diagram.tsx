"use client";

import type { PEConcept } from "@/lib/lbo-lab/concepts";
import {
  ArrowRight,
  Layers,
  Target,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const LIFECYCLE_STEPS = [
  "Source",
  "Due Diligence",
  "Acquire",
  "Value Create",
  "Exit",
];

const CAPITAL_LAYERS = [
  { label: "Equity", pct: "30-50%", color: "bg-emerald-500" },
  { label: "Subordinated Debt", pct: "10-20%", color: "bg-amber-500" },
  { label: "Senior Debt", pct: "40-60%", color: "bg-blue-500" },
];

const VALUE_DRIVERS = [
  { label: "Revenue Growth", icon: TrendingUp },
  { label: "Margin Expansion", icon: Target },
  { label: "Multiple Expansion", icon: Layers },
  { label: "Debt Paydown", icon: DollarSign },
];

const EXIT_OPTIONS = [
  "Strategic Sale",
  "Secondary Buyout",
  "IPO",
  "Dividend Recap",
];

interface ConceptDiagramProps {
  concept: PEConcept;
}

export function LBOConceptDiagram({ concept }: ConceptDiagramProps) {
  const type = concept.diagramType;

  if (type === "lbo-lifecycle") {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          PE Investment Lifecycle
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {LIFECYCLE_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                {step}
              </div>
              {i < LIFECYCLE_STEPS.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "capital-structure") {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Capital Structure (Typical LBO)
        </p>
        <div className="space-y-2">
          {CAPITAL_LAYERS.map((layer) => (
            <div key={layer.label} className="flex items-center gap-3">
              <div
                className={`w-3 h-8 rounded ${layer.color} shrink-0`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{layer.label}</p>
                <p className="text-xs text-muted-foreground">{layer.pct}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "value-drivers") {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Value Creation Drivers
        </p>
        <div className="grid grid-cols-2 gap-3">
          {VALUE_DRIVERS.map((d) => (
            <div
              key={d.label}
              className="flex items-center gap-3 rounded-md bg-background p-3 border"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <d.icon className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-sm font-medium">{d.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "exit-strategies") {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Exit Strategies
        </p>
        <div className="flex flex-wrap gap-2">
          {EXIT_OPTIONS.map((opt) => (
            <div
              key={opt}
              className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium"
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

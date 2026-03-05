"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VarianceRow {
  category: string;
  budget: number;
  actual: number;
  variance: number;
  variancePct: number;
}

const SAMPLE_BUDGET_ACTUAL: VarianceRow[] = [
  { category: "Revenue", budget: 1200000, actual: 1150000, variance: -50000, variancePct: -4.2 },
  { category: "COGS", budget: 600000, actual: 620000, variance: 20000, variancePct: 3.3 },
  { category: "Gross Profit", budget: 600000, actual: 530000, variance: -70000, variancePct: -11.7 },
  { category: "Operating Expense", budget: 300000, actual: 280000, variance: -20000, variancePct: -6.7 },
  { category: "EBIT", budget: 300000, actual: 250000, variance: -50000, variancePct: -16.7 },
];

function computeVariance(budget: number, actual: number): { variance: number; variancePct: number } {
  const variance = actual - budget;
  const variancePct = budget !== 0 ? (variance / budget) * 100 : 0;
  return { variance, variancePct };
}

export default function VarianceAnalysisPage() {
  const [rows, setRows] = useState<VarianceRow[]>(SAMPLE_BUDGET_ACTUAL);

  const updateRow = (index: number, field: "budget" | "actual", value: number) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      const { variance, variancePct } = computeVariance(next[index].budget, next[index].actual);
      next[index].variance = variance;
      next[index].variancePct = variancePct;
      return next;
    });
  };

  const chartData = rows.map((r) => ({
    name: r.category,
    budget: r.budget / 1000,
    actual: r.actual / 1000,
  }));

  const revenueRow = rows.find((r) => r.category === "Revenue");
  const cogsRow = rows.find((r) => r.category === "COGS");
  const explanations: string[] = [];
  if (revenueRow && revenueRow.variance < 0) {
    explanations.push("Revenue below budget: possible demand shortfall, pricing pressure, or timing of recognition.");
  }
  if (cogsRow && cogsRow.variance > 0) {
    explanations.push("COGS above budget: raw material costs, mix shift to lower-margin products, or inefficiencies.");
  }
  if (explanations.length === 0) {
    explanations.push("Variance = Actual − Budget. Positive variance on revenue is favorable; on costs, unfavorable.");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
          Budget vs Actual Analysis
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Compare budgeted numbers to actual results. Variance = Actual − Budget.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Variance Table</CardTitle>
              <p className="text-xs text-muted-foreground">
                Edit budget and actual to see variance update. Favorable variance on revenue ↑; on costs ↓.
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">Category</th>
                      <th className="text-right py-2 px-2">Budget ($)</th>
                      <th className="text-right py-2 px-2">Actual ($)</th>
                      <th className="text-right py-2 px-2">Variance ($)</th>
                      <th className="text-right py-2 px-2">Variance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={r.category} className="border-b">
                        <td className="py-2 pr-4 font-medium">{r.category}</td>
                        <td className="py-1 px-2">
                          <Input
                            type="number"
                            value={r.budget}
                            onChange={(e) => updateRow(i, "budget", Number(e.target.value) || 0)}
                            className="h-8 text-right"
                          />
                        </td>
                        <td className="py-1 px-2">
                          <Input
                            type="number"
                            value={r.actual}
                            onChange={(e) => updateRow(i, "actual", Number(e.target.value) || 0)}
                            className="h-8 text-right"
                          />
                        </td>
                        <td
                          className={cn(
                            "py-2 px-2 text-right tabular-nums font-medium",
                            r.variance > 0 && r.category !== "Revenue" && r.category !== "Gross Profit" && r.category !== "EBIT"
                              ? "text-red-600"
                              : r.variance < 0 && (r.category === "Revenue" || r.category === "Gross Profit" || r.category === "EBIT")
                                ? "text-red-600"
                                : r.variance > 0
                                  ? "text-emerald-600"
                                  : "text-muted-foreground"
                          )}
                        >
                          {r.variance >= 0 ? "" : "−"}${Math.abs(r.variance).toLocaleString()}
                        </td>
                        <td
                          className={cn(
                            "py-2 px-2 text-right tabular-nums",
                            r.variancePct > 0 && ["COGS", "Operating Expense"].includes(r.category)
                              ? "text-red-600"
                              : r.variancePct < 0 && ["Revenue", "Gross Profit", "EBIT"].includes(r.category)
                                ? "text-red-600"
                                : ""
                          )}
                        >
                          {r.variancePct >= 0 ? "+" : ""}{r.variancePct.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Budget vs Actual Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}K`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={75} />
                    <Tooltip formatter={(v: number | undefined) => [v != null ? `$${(v * 1000).toLocaleString()}` : "—", ""]} />
                    <Legend />
                    <Bar dataKey="budget" fill="hsl(var(--muted-foreground) / 0.5)" name="Budget" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="actual" fill="hsl(var(--finstep-orange))" name="Actual" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-amber-200 dark:border-amber-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                What the Variance Means
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {explanations.map((e, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-amber-500">•</span>
                    {e}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Formula</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="font-mono bg-muted/50 p-2 rounded">Variance = Actual − Budget</p>
              <p className="font-mono bg-muted/50 p-2 rounded">Variance % = (Variance / Budget) × 100</p>
              <p className="text-muted-foreground pt-2">
                For revenue & profit: positive variance = favorable. For costs: negative variance = favorable.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

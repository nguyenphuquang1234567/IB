"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { DECISION_OPTIONS, BASE_METRICS } from "@/lib/business-acumen/simulation";
import { Zap, Lightbulb } from "lucide-react";
import { useBusinessAcumenStore } from "@/store/useBusinessAcumenStore";
import { cn } from "@/lib/utils";

export default function DecisionSimulationPage() {
  const recordVisit = useBusinessAcumenStore((s) => s.recordVisit);
  const completeScenario = useBusinessAcumenStore((s) => s.completeScenario);
  useEffect(() => {
    recordVisit("simulation");
  }, [recordVisit]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelectOption = (id: string) => {
    const wasSelected = selectedId === id;
    setSelectedId(wasSelected ? null : id);
    if (!wasSelected && id) completeScenario("simulation");
  };

  const option = selectedId ? DECISION_OPTIONS.find((o) => o.id === selectedId) : null;

  const chartData = useMemo(() => {
    const base = {
      name: "Base",
      revenue: BASE_METRICS.revenue,
      margin: BASE_METRICS.margin,
      cashFlow: BASE_METRICS.cashFlow,
    };
    const after = option
      ? {
          name: "After Decision",
          revenue: BASE_METRICS.revenue * (1 + option.impact.revenueDelta / 100),
          margin: BASE_METRICS.margin + option.impact.marginDelta,
          cashFlow: BASE_METRICS.cashFlow + option.impact.cashFlowDelta,
        }
      : null;
    return after ? [base, after] : [base];
  }, [option]);

  const feedback = useMemo(() => {
    if (!option) return null;
    const { revenueDelta, marginDelta, cashFlowDelta } = option.impact;
    const parts: string[] = [];
    if (revenueDelta > 0) parts.push("Revenue growth focus.");
    if (marginDelta < 0) parts.push("Margin compression risk.");
    if (cashFlowDelta < 0) parts.push("Cash flow pressure — ensure adequate runway.");
    if (marginDelta > 0 && cashFlowDelta > 0) parts.push("Strong margin and cash improvement.");
    if (revenueDelta < 0) parts.push("Revenue tradeoff — growth may slow.");
    return parts.join(" ");
  }, [option]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground flex items-center gap-2">
          <Zap className="w-5 h-5 text-finstep-orange" />
          Decision Simulation
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          You are the CFO of a growing e-commerce company. Choose a strategic decision and see the impact.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {DECISION_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => handleSelectOption(o.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-all",
                    selectedId === o.id
                      ? "border-finstep-orange bg-finstep-orange/10"
                      : "border-border/40 hover:border-finstep-orange/50"
                  )}
                >
                  <p className="font-semibold text-sm">{o.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{o.description}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          {option && feedback && (
            <Card className="border-amber-200 dark:border-amber-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feedback}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Impact on Key Metrics</CardTitle>
              <p className="text-xs text-muted-foreground">
                {option ? "Base vs after your decision" : "Select a decision to see impact"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(v: number | undefined) => [v != null ? v.toFixed(1) : "—", ""]}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="hsl(var(--finstep-orange))" name="Revenue (indexed)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="margin" fill="#3b82f6" name="Margin %" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="cashFlow" fill="#22c55e" name="Cash Flow (indexed)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {option && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Impact Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p
                      className={cn(
                        "text-lg font-bold",
                        option.impact.revenueDelta >= 0 ? "text-emerald-600" : "text-red-600"
                      )}
                    >
                      {option.impact.revenueDelta >= 0 ? "+" : ""}
                      {option.impact.revenueDelta}%
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Margin</p>
                    <p
                      className={cn(
                        "text-lg font-bold",
                        option.impact.marginDelta >= 0 ? "text-emerald-600" : "text-red-600"
                      )}
                    >
                      {option.impact.marginDelta >= 0 ? "+" : ""}
                      {option.impact.marginDelta}pp
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Cash Flow</p>
                    <p
                      className={cn(
                        "text-lg font-bold",
                        option.impact.cashFlowDelta >= 0 ? "text-emerald-600" : "text-red-600"
                      )}
                    >
                      {option.impact.cashFlowDelta >= 0 ? "+" : ""}
                      {option.impact.cashFlowDelta}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

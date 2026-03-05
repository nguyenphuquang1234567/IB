"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildForecast, type ForecastAssumptions } from "@/lib/budgeting/forecast-engine";
import { SCENARIOS } from "@/lib/budgeting/scenarios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const BASE_ASSUMPTIONS: ForecastAssumptions = {
  baseRevenue: 10000000,
  revenueGrowthPct: 8,
  cogsPct: 40,
  opexBase: 2500000,
  opexGrowthPct: 4,
  capexPctOfRevenue: 5,
  depreciationPctOfCapex: 20,
  years: 5,
};

export default function ScenarioSimulatorPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId);

  const adjustedAssumptions = useMemo((): ForecastAssumptions | null => {
    if (!scenario) return null;
    const adj = scenario.adjustments;
    return {
      ...BASE_ASSUMPTIONS,
      revenueGrowthPct: BASE_ASSUMPTIONS.revenueGrowthPct + (adj.revenueGrowthDelta ?? 0),
      cogsPct: BASE_ASSUMPTIONS.cogsPct + (adj.cogsDelta ?? 0),
      opexGrowthPct: BASE_ASSUMPTIONS.opexGrowthPct + (adj.opexDelta ?? 0),
      capexPctOfRevenue: BASE_ASSUMPTIONS.capexPctOfRevenue + (adj.capexDelta ?? 0),
    };
  }, [scenario]);

  const baseForecast = useMemo(() => buildForecast(BASE_ASSUMPTIONS), []);
  const scenarioForecast = useMemo(
    () => (adjustedAssumptions ? buildForecast(adjustedAssumptions) : []),
    [adjustedAssumptions]
  );

  const comparisonData = useMemo(() => {
    return baseForecast.map((b, i) => {
      const s = scenarioForecast[i];
      return {
        year: `Y${b.year.toString().slice(-2)}`,
        baseRevenue: b.revenue / 1e6,
        scenarioRevenue: s ? s.revenue / 1e6 : null,
        baseEBIT: b.ebit / 1e6,
        scenarioEBIT: s ? s.ebit / 1e6 : null,
        baseOCF: b.operatingCashFlow / 1e6,
        scenarioOCF: s ? s.operatingCashFlow / 1e6 : null,
      };
    });
  }, [baseForecast, scenarioForecast]);

  const lastBase = baseForecast[baseForecast.length - 1];
  const lastScenario = scenarioForecast[scenarioForecast.length - 1];
  const revenueImpact = lastScenario ? ((lastScenario.revenue - lastBase.revenue) / lastBase.revenue) * 100 : 0;
  const ebitImpact = lastScenario ? ((lastScenario.ebit - lastBase.ebit) / lastBase.ebit) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
          Business Scenario Simulator
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Adjust assumptions and observe impact on revenue, margins, and cash flow
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-finstep-orange" />
                Select Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedScenarioId(selectedScenarioId === s.id ? null : s.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-all",
                    selectedScenarioId === s.id
                      ? "border-finstep-orange bg-finstep-orange/10"
                      : "border-border/40 hover:border-finstep-orange/50"
                  )}
                >
                  <p className="font-semibold text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          {scenario && adjustedAssumptions && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Adjusted Assumptions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>Revenue growth: {BASE_ASSUMPTIONS.revenueGrowthPct}% → {adjustedAssumptions.revenueGrowthPct}%</p>
                <p>COGS %: {BASE_ASSUMPTIONS.cogsPct}% → {adjustedAssumptions.cogsPct}%</p>
                <p>OpEx growth: {BASE_ASSUMPTIONS.opexGrowthPct}% → {adjustedAssumptions.opexGrowthPct}%</p>
                <p>CapEx % rev: {BASE_ASSUMPTIONS.capexPctOfRevenue}% → {adjustedAssumptions.capexPctOfRevenue}%</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          {scenario ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Impact Summary (Year 5)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Revenue Impact</p>
                      <p className={cn("text-lg font-bold", revenueImpact >= 0 ? "text-emerald-600" : "text-red-600")}>
                        {revenueImpact >= 0 ? "+" : ""}{revenueImpact.toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">EBIT Impact</p>
                      <p className={cn("text-lg font-bold", ebitImpact >= 0 ? "text-emerald-600" : "text-red-600")}>
                        {ebitImpact >= 0 ? "+" : ""}{ebitImpact.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Revenue: Base vs Scenario</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
                        <Tooltip formatter={(v: number | undefined) => [v != null ? `$${v.toFixed(2)}M` : "—", ""]} />
                        <Legend />
                        <Line type="monotone" dataKey="baseRevenue" stroke="hsl(var(--muted-foreground))" strokeWidth={2} name="Base Case" strokeDasharray="4 4" />
                        <Line type="monotone" dataKey="scenarioRevenue" stroke="hsl(var(--finstep-orange))" strokeWidth={2} name={scenario.name} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Operating Cash Flow: Base vs Scenario</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
                        <Tooltip formatter={(v: number | undefined) => [v != null ? `$${v.toFixed(2)}M` : "—", ""]} />
                        <Legend />
                        <Line type="monotone" dataKey="baseOCF" stroke="hsl(var(--muted-foreground))" strokeWidth={2} name="Base OCF" strokeDasharray="4 4" />
                        <Line type="monotone" dataKey="scenarioOCF" stroke="#22c55e" strokeWidth={2} name={`${scenario.name} OCF`} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <Zap className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Select a scenario to see financial impact</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

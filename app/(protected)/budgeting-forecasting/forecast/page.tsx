"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  buildForecast,
  getForecastFeedback,
  type ForecastAssumptions,
} from "@/lib/budgeting/forecast-engine";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const fmt = (n: number) =>
  n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(0)}K` : n.toFixed(0);

const DEFAULT_ASSUMPTIONS: ForecastAssumptions = {
  baseRevenue: 10000000,
  revenueGrowthPct: 8,
  cogsPct: 40,
  opexBase: 2500000,
  opexGrowthPct: 4,
  capexPctOfRevenue: 5,
  depreciationPctOfCapex: 20,
  years: 5,
};

export default function ForecastBuilderPage() {
  const [assumptions, setAssumptions] = useState<ForecastAssumptions>(DEFAULT_ASSUMPTIONS);

  const forecast = useMemo(() => buildForecast(assumptions), [assumptions]);
  const feedback = useMemo(() => getForecastFeedback(assumptions, forecast), [assumptions, forecast]);

  const chartData = forecast.map((y) => ({
    year: `Y${y.year.toString().slice(-2)}`,
    revenue: y.revenue,
    grossProfit: y.grossProfit,
    ebit: y.ebit,
    ocf: y.operatingCashFlow,
  }));

  const marginData = forecast.map((y) => ({
    year: `Y${y.year.toString().slice(-2)}`,
    grossMargin: y.grossMarginPct,
    ebitMargin: y.ebitMarginPct,
  }));

  const update = (k: keyof ForecastAssumptions, v: number) => {
    setAssumptions((prev) => ({ ...prev, [k]: v }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
          Forecast Builder
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Input assumptions and generate a financial forecast
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Assumptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Base Revenue ($)</Label>
                <Input
                  type="number"
                  value={assumptions.baseRevenue}
                  onChange={(e) => update("baseRevenue", Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Revenue Growth (%)</Label>
                <Input
                  type="number"
                  value={assumptions.revenueGrowthPct}
                  onChange={(e) => update("revenueGrowthPct", Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>COGS %</Label>
                <Input
                  type="number"
                  value={assumptions.cogsPct}
                  onChange={(e) => update("cogsPct", Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>OpEx Base ($)</Label>
                <Input
                  type="number"
                  value={assumptions.opexBase}
                  onChange={(e) => update("opexBase", Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>OpEx Growth (%)</Label>
                <Input
                  type="number"
                  value={assumptions.opexGrowthPct}
                  onChange={(e) => update("opexGrowthPct", Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>CapEx % of Revenue</Label>
                <Input
                  type="number"
                  value={assumptions.capexPctOfRevenue}
                  onChange={(e) => update("capexPctOfRevenue", Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Depreciation % of CapEx</Label>
                <Input
                  type="number"
                  value={assumptions.depreciationPctOfCapex}
                  onChange={(e) => update("depreciationPctOfCapex", Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Forecast Period</Label>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant={assumptions.years === 3 ? "default" : "outline"}
                    size="sm"
                    onClick={() => update("years", 3)}
                  >
                    3 Years
                  </Button>
                  <Button
                    variant={assumptions.years === 5 ? "default" : "outline"}
                    size="sm"
                    onClick={() => update("years", 5)}
                  >
                    5 Years
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {feedback.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Forecast Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">Line Item</th>
                      {forecast.map((y) => (
                        <th key={y.year} className="text-right py-2 px-2 min-w-[80px]">
                          {y.year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium">Revenue</td>
                      {forecast.map((y) => (
                        <td key={y.year} className="text-right py-2 px-2 tabular-nums">
                          ${(y.revenue / 1e6).toFixed(2)}M
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">COGS</td>
                      {forecast.map((y) => (
                        <td key={y.year} className="text-right py-2 px-2 tabular-nums">
                          ${(y.cogs / 1e6).toFixed(2)}M
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium">Gross Profit</td>
                      {forecast.map((y) => (
                        <td key={y.year} className="text-right py-2 px-2 tabular-nums">
                          ${(y.grossProfit / 1e6).toFixed(2)}M
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">OpEx</td>
                      {forecast.map((y) => (
                        <td key={y.year} className="text-right py-2 px-2 tabular-nums">
                          ${(y.opex / 1e6).toFixed(2)}M
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">EBITDA</td>
                      {forecast.map((y) => (
                        <td key={y.year} className="text-right py-2 px-2 tabular-nums">
                          ${(y.ebitda / 1e6).toFixed(2)}M
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">CapEx</td>
                      {forecast.map((y) => (
                        <td key={y.year} className="text-right py-2 px-2 tabular-nums">
                          ${(y.capex / 1e6).toFixed(2)}M
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Operating Cash Flow</td>
                      {forecast.map((y) => (
                        <td
                          key={y.year}
                          className={cn(
                            "text-right py-2 px-2 tabular-nums font-medium",
                            y.operatingCashFlow < 0 && "text-red-600"
                          )}
                        >
                          ${(y.operatingCashFlow / 1e6).toFixed(2)}M
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue & Profit Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => fmt(v)} />
                    <Tooltip formatter={(v: number | undefined) => [v != null ? `$${(v / 1e6).toFixed(2)}M` : "—", ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(var(--finstep-orange))" strokeWidth={2} name="Revenue" />
                    <Line type="monotone" dataKey="grossProfit" stroke="#22c55e" strokeWidth={2} name="Gross Profit" />
                    <Line type="monotone" dataKey="ebit" stroke="#3b82f6" strokeWidth={2} name="EBIT" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Margin Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marginData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(v: number | undefined) => [v != null ? `${v.toFixed(1)}%` : "—", ""]} />
                    <Legend />
                    <Bar dataKey="grossMargin" fill="hsl(var(--finstep-orange))" name="Gross Margin %" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ebitMargin" fill="#3b82f6" name="EBIT Margin %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

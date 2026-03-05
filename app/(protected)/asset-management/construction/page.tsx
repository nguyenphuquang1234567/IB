"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ASSET_CLASSES,
  calculatePortfolio,
  getPortfolioFeedback,
} from "@/lib/asset-management/portfolio-engine";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Lightbulb, AlertTriangle } from "lucide-react";

const DEFAULT_WEIGHTS: Record<string, number> = {
  equities: 50,
  bonds: 25,
  etfs: 0,
  commodities: 0,
  realestate: 15,
  cash: 10,
};

export default function PortfolioConstructionPage() {
  const [weights, setWeights] = useState<Record<string, number>>(DEFAULT_WEIGHTS);

  const { expectedReturn, volatility, sharpeRatio } = useMemo(
    () => calculatePortfolio(weights),
    [weights]
  );

  const feedback = useMemo(
    () => getPortfolioFeedback(weights, volatility, sharpeRatio),
    [weights, volatility, sharpeRatio]
  );

  const totalWeight = useMemo(
    () => Object.values(weights).reduce((a, b) => a + b, 0),
    [weights]
  );

  const pieData = ASSET_CLASSES.filter((a) => (weights[a.id] ?? 0) > 0).map((a) => ({
    name: a.name,
    value: weights[a.id] ?? 0,
    color: a.color,
  }));

  const updateWeight = (id: string, v: number) => {
    setWeights((prev) => ({ ...prev, [id]: Math.max(0, Math.min(100, v)) }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
          Portfolio Construction Lab
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Allocate capital across asset classes. Weights should sum to 100%.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Allocation</CardTitle>
              <p className="text-xs text-muted-foreground">
                Total: <span className={totalWeight === 100 ? "text-emerald-600 font-bold" : "text-amber-600"}>
                  {totalWeight.toFixed(0)}%
                </span>
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {ASSET_CLASSES.map((a) => (
                <div key={a.id}>
                  <Label className="flex justify-between">
                    <span>{a.name}</span>
                    <span className="text-muted-foreground text-xs">
                      Exp: {a.expectedReturn}% | Vol: {a.volatility}%
                    </span>
                  </Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={weights[a.id] ?? 0}
                      onChange={(e) => updateWeight(a.id, Number(e.target.value))}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      className="w-16"
                      value={weights[a.id] ?? 0}
                      onChange={(e) => updateWeight(a.id, Number(e.target.value) || 0)}
                    />
                  </div>
                </div>
              ))}
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
              <CardTitle className="text-base">Portfolio Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Expected Return</p>
                  <p className="text-2xl font-bold text-finstep-orange">
                    {expectedReturn.toFixed(1)}%
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Volatility</p>
                  <p className="text-2xl font-bold">{volatility.toFixed(1)}%</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                  <p className="text-2xl font-bold">{sharpeRatio.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Portfolio Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number | undefined) => [v != null ? `${v}%` : "0%", "Weight"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import {
  computeGrossMargin,
  computeOperatingMargin,
  computeROA,
  computeROIC,
} from "@/lib/corporate-finance/performance";

export default function PerformanceAnalyzerPage() {
  const [revenue, setRevenue] = useState(1000);
  const [cogs, setCogs] = useState(400);
  const [opex, setOpex] = useState(350);
  const [netIncome, setNetIncome] = useState(150);
  const [totalAssets, setTotalAssets] = useState(1200);
  const [equity, setEquity] = useState(600);
  const [debt, setDebt] = useState(400);
  const [cash, setCash] = useState(100);

  const ebit = revenue - cogs - opex;
  const grossMargin = useMemo(
    () => computeGrossMargin(revenue, cogs),
    [revenue, cogs]
  );
  const operatingMargin = useMemo(
    () => computeOperatingMargin(revenue, ebit),
    [revenue, ebit]
  );
  const roa = useMemo(
    () => computeROA(netIncome, totalAssets),
    [netIncome, totalAssets]
  );
  const investedCapital = equity + debt - cash;
  const nopat = ebit * 0.75;
  const roic = useMemo(
    () => computeROIC(nopat, investedCapital),
    [nopat, investedCapital]
  );

  const costStructure = useMemo(
    () => [
      { label: "COGS", value: cogs, pct: (cogs / revenue) * 100, color: "bg-amber-500" },
      { label: "OpEx", value: opex, pct: (opex / revenue) * 100, color: "bg-blue-500" },
      { label: "Profit", value: revenue - cogs - opex, pct: (ebit / revenue) * 100, color: "bg-emerald-500" },
    ],
    [revenue, cogs, opex, ebit]
  );

  const handleReset = () => {
    setRevenue(1000);
    setCogs(400);
    setOpex(350);
    setNetIncome(150);
    setTotalAssets(1200);
    setEquity(600);
    setDebt(400);
    setCash(100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
            Performance Analyzer
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze financial data. Profitability trends, cost structure, and efficiency metrics.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-3">
              <h3 className="text-sm font-bold">Financial Data ($)</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Revenue", value: revenue, set: setRevenue },
                { label: "COGS", value: cogs, set: setCogs },
                { label: "OpEx", value: opex, set: setOpex },
                { label: "Net Income", value: netIncome, set: setNetIncome },
                { label: "Total Assets", value: totalAssets, set: setTotalAssets },
                { label: "Equity", value: equity, set: setEquity },
                { label: "Debt", value: debt, set: setDebt },
                { label: "Cash", value: cash, set: setCash },
              ].map(({ label, value, set }) => (
                <div key={label} className="space-y-1">
                  <Label className="text-xs">{label}</Label>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => set(parseFloat(e.target.value) || 0)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold">Key Metrics</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">Gross Margin</p>
                  <p className="text-lg font-bold tabular-nums">{grossMargin.toFixed(1)}%</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">Operating Margin</p>
                  <p className="text-lg font-bold tabular-nums">{operatingMargin.toFixed(1)}%</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">ROA</p>
                  <p className="text-lg font-bold tabular-nums">{roa.toFixed(1)}%</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">ROIC</p>
                  <p className="text-lg font-bold tabular-nums">{roic.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold">Cost Structure Breakdown</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {costStructure.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{item.label}</span>
                      <span className="font-bold">
                        ${item.value} ({item.pct.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-4 rounded bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded transition-all ${item.color}`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

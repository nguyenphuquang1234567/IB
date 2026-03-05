"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { computeValuation } from "@/lib/equity-research/valuation-engine";
import { COMPANIES } from "@/lib/equity-research/companies";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Lightbulb } from "lucide-react";

const DEFAULT_INPUTS = {
  revenue: 100,
  ebitda: 25,
  netIncome: 18,
  fcf: 15,
  shares: 1,
  netDebt: 10,
  revenueGrowth: 10,
  fcfGrowth: 12,
  terminalGrowth: 3,
  wacc: 10,
  evEbitdaMultiple: 15,
  peMultiple: 25,
  marketPrice: 200,
};

export default function ValuationLabPage() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);

  const output = useMemo(() => computeValuation({
    ...inputs,
    evEbitdaMultiple: inputs.evEbitdaMultiple,
    peMultiple: inputs.peMultiple,
  }), [inputs]);

  const comparisonData = [
    { name: "DCF", value: output.dcfValue },
    { name: "EV/EBITDA", value: output.evEbitdaValue },
    { name: "P/E", value: output.peValue || output.dcfValue },
    { name: "Blended", value: output.intrinsicValue },
    { name: "Market", value: output.marketPrice },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
          Valuation Lab
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          DCF, EV/EBITDA, P/E. Input assumptions and compare intrinsic value to market price.
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
                <label className="text-xs text-muted-foreground">Revenue ($B)</label>
                <input
                  type="number"
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.revenue}
                  onChange={(e) => setInputs((i) => ({ ...i, revenue: Number(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">EBITDA ($B)</label>
                <input
                  type="number"
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.ebitda}
                  onChange={(e) => setInputs((i) => ({ ...i, ebitda: Number(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Net Income ($B)</label>
                <input
                  type="number"
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.netIncome}
                  onChange={(e) => setInputs((i) => ({ ...i, netIncome: Number(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">FCF ($B)</label>
                <input
                  type="number"
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.fcf}
                  onChange={(e) => setInputs((i) => ({ ...i, fcf: Number(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Shares (B)</label>
                <input
                  type="number"
                  step={0.1}
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.shares}
                  onChange={(e) => setInputs((i) => ({ ...i, shares: Number(e.target.value) || 1 }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Net Debt ($B)</label>
                <input
                  type="number"
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.netDebt}
                  onChange={(e) => setInputs((i) => ({ ...i, netDebt: Number(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">FCF Growth (%)</label>
                <input
                  type="number"
                  step={0.5}
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.fcfGrowth}
                  onChange={(e) => setInputs((i) => ({ ...i, fcfGrowth: Number(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Terminal Growth (%)</label>
                <input
                  type="number"
                  step={0.1}
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.terminalGrowth}
                  onChange={(e) => setInputs((i) => ({ ...i, terminalGrowth: Number(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">WACC (%)</label>
                <input
                  type="number"
                  step={0.1}
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.wacc}
                  onChange={(e) => setInputs((i) => ({ ...i, wacc: Number(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">EV/EBITDA Multiple (x)</label>
                <input
                  type="number"
                  step={0.5}
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.evEbitdaMultiple}
                  onChange={(e) => setInputs((i) => ({ ...i, evEbitdaMultiple: Number(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">P/E Multiple (x)</label>
                <input
                  type="number"
                  step={0.5}
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.peMultiple}
                  onChange={(e) => setInputs((i) => ({ ...i, peMultiple: Number(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Market Price ($)</label>
                <input
                  type="number"
                  className="w-full mt-1 rounded border px-2 py-1.5 text-sm"
                  value={inputs.marketPrice}
                  onChange={(e) => setInputs((i) => ({ ...i, marketPrice: Number(e.target.value) || 0 }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Valuation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">DCF Value</p>
                  <p className="text-xl font-bold">${output.dcfValue.toFixed(0)}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">EV/EBITDA</p>
                  <p className="text-xl font-bold">${output.evEbitdaValue.toFixed(0)}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">P/E</p>
                  <p className="text-xl font-bold">${(output.peValue || 0).toFixed(0)}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Upside</p>
                  <p className={`text-xl font-bold ${output.upside >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {output.upside >= 0 ? "+" : ""}{output.upside.toFixed(0)}%
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground p-3 rounded-lg bg-muted/30">
                {output.interpretation}
              </p>
              {(inputs.fcfGrowth > 15 || inputs.terminalGrowth > 4) && output.upside > 10 && (
                <div className="mt-4 flex gap-2 p-3 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Your valuation assumptions may be too optimistic. Consider stress-testing with lower FCF growth ({inputs.fcfGrowth}%) or terminal growth ({inputs.terminalGrowth}%).
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Valuation Comparison</CardTitle>
              <p className="text-xs text-muted-foreground">
                Intrinsic value vs market price across methods.
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v}`} />
                    <Tooltip
                      formatter={(v: number | undefined) => [`$${(v ?? 0).toFixed(0)}`, "Value"]}
                      contentStyle={{ fontSize: 11 }}
                    />
                    <Bar dataKey="value" name="Value">
                      {comparisonData.map((entry, i) => (
                        <Cell
                          key={i}
                          fill={entry.name === "Market" ? "hsl(var(--muted-foreground))" : "hsl(var(--finstep-orange))"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Company Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {COMPANIES.filter((c) => c.marketPrice).map((c) => {
                  const latest = c.financials[c.financials.length - 1];
                  return (
                    <button
                      key={c.id}
                      className="px-3 py-1.5 rounded-md border text-sm hover:bg-muted/50"
                      onClick={() =>
                        setInputs({
                          revenue: latest.revenue,
                          ebitda: latest.operatingIncome * 1.2,
                          netIncome: latest.netIncome,
                          fcf: latest.freeCashFlow,
                          shares: 1,
                          netDebt: 0,
                          revenueGrowth: 8,
                          fcfGrowth: 10,
                          terminalGrowth: 3,
                          wacc: 10,
                          evEbitdaMultiple: 15,
                          peMultiple: 25,
                          marketPrice: c.marketPrice ?? 100,
                        })
                      }
                    >
                      {c.ticker}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

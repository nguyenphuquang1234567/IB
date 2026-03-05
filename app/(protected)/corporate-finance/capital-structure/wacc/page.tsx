"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  computeWACC,
  firmValueFromFCFF,
} from "@/lib/corporate-finance/capital-structure";

export default function WACCCalculatorPage() {
  const [equityValue, setEquityValue] = useState(600);
  const [debtValue, setDebtValue] = useState(400);
  const [costOfEquity, setCostOfEquity] = useState(12);
  const [costOfDebt, setCostOfDebt] = useState(6);
  const [taxRate, setTaxRate] = useState(25);
  const [fcff, setFcff] = useState(100);
  const [growth, setGrowth] = useState(3);

  const wacc = useMemo(
    () =>
      computeWACC(
        equityValue,
        debtValue,
        costOfEquity,
        costOfDebt,
        taxRate
      ),
    [equityValue, debtValue, costOfEquity, costOfDebt, taxRate]
  );

  const firmValue = useMemo(
    () => firmValueFromFCFF(fcff, wacc, growth),
    [fcff, wacc, growth]
  );

  const debtRatio = equityValue + debtValue > 0
    ? (debtValue / (equityValue + debtValue)) * 100
    : 0;

  const handleReset = () => {
    setEquityValue(600);
    setDebtValue(400);
    setCostOfEquity(12);
    setCostOfDebt(6);
    setTaxRate(25);
    setFcff(100);
    setGrowth(3);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
            WACC Calculator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Adjust debt levels, interest rates, and equity financing. See impact on WACC, firm valuation, and financial risk.
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
              <h3 className="text-sm font-bold">Capital Structure</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Equity Value ($M)", value: equityValue, set: setEquityValue },
                { label: "Debt Value ($M)", value: debtValue, set: setDebtValue },
                { label: "Cost of Equity (%)", value: costOfEquity, set: setCostOfEquity },
                { label: "Cost of Debt (pre-tax %)", value: costOfDebt, set: setCostOfDebt },
                { label: "Tax Rate (%)", value: taxRate, set: setTaxRate },
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

          <Card className="shadow-sm border-border/40 mt-4">
            <CardHeader className="pb-3">
              <h3 className="text-sm font-bold">Valuation Inputs</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "FCFF ($M)", value: fcff, set: setFcff },
                { label: "Terminal Growth (%)", value: growth, set: setGrowth },
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
              <h3 className="text-sm font-bold">Results</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">WACC</p>
                  <p className="text-lg font-bold tabular-nums">{wacc.toFixed(1)}%</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">Debt Ratio</p>
                  <p className="text-lg font-bold tabular-nums">{debtRatio.toFixed(0)}%</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">Firm Value</p>
                  <p className="text-lg font-bold tabular-nums">${(firmValue / 1e6).toFixed(0)}M</p>
                </div>
                <div className="rounded-lg bg-finstep-orange p-3 text-white">
                  <p className="text-[10px] text-white/80">Financial Risk</p>
                  <p className="text-sm font-bold">
                    {debtRatio > 60 ? "High" : debtRatio > 40 ? "Moderate" : "Low"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Higher debt lowers WACC (tax shield) but increases financial risk. Firm value uses perpetuity growth: FCFF / (WACC − g).
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold">Capital Structure Visualization</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { label: "Equity", value: equityValue, color: "bg-emerald-500" },
                  { label: "Debt", value: debtValue, color: "bg-amber-500" },
                ].map((item) => {
                  const pct =
                    equityValue + debtValue > 0
                      ? (item.value / (equityValue + debtValue)) * 100
                      : 0;
                  return (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{item.label}</span>
                        <span className="font-bold">
                          ${item.value}M ({pct.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-4 rounded bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded transition-all ${item.color}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
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

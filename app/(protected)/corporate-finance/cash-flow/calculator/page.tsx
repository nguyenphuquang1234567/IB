"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { computeOCF, computeCCC } from "@/lib/corporate-finance/cash-flow";

export default function CashFlowCalculatorPage() {
  const [ebit, setEbit] = useState(100);
  const [da, setDa] = useState(20);
  const [taxes, setTaxes] = useState(25);
  const [deltaReceivables, setDeltaReceivables] = useState(10);
  const [deltaInventory, setDeltaInventory] = useState(5);
  const [deltaPayables, setDeltaPayables] = useState(8);
  const [dso, setDso] = useState(45);
  const [dio, setDio] = useState(60);
  const [dpo, setDpo] = useState(30);
  const [currentAssets, setCurrentAssets] = useState(200);
  const [currentLiabilities, setCurrentLiabilities] = useState(120);

  const deltaNWC = deltaReceivables + deltaInventory - deltaPayables;
  const ocf = useMemo(
    () => computeOCF(ebit, da, taxes, deltaNWC),
    [ebit, da, taxes, deltaNWC]
  );
  const ccc = useMemo(() => computeCCC(dso, dio, dpo), [dso, dio, dpo]);
  const currentRatio =
    currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
  const quickRatio =
    currentLiabilities > 0
      ? (currentAssets - 80) / currentLiabilities
      : 0;

  const handleReset = () => {
    setEbit(100);
    setDa(20);
    setTaxes(25);
    setDeltaReceivables(10);
    setDeltaInventory(5);
    setDeltaPayables(8);
    setDso(45);
    setDio(60);
    setDpo(30);
    setCurrentAssets(200);
    setCurrentLiabilities(120);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
            Cash Flow Calculator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            See how operational changes affect cash flow and liquidity
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 space-y-4">
          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-3">
              <h3 className="text-sm font-bold">Operating Cash Flow</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "EBIT ($)", value: ebit, set: setEbit },
                { label: "D&A ($)", value: da, set: setDa },
                { label: "Taxes ($)", value: taxes, set: setTaxes },
                { label: "Δ Receivables ($)", value: deltaReceivables, set: setDeltaReceivables },
                { label: "Δ Inventory ($)", value: deltaInventory, set: setDeltaInventory },
                { label: "Δ Payables ($)", value: deltaPayables, set: setDeltaPayables },
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

          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-3">
              <h3 className="text-sm font-bold">Cash Conversion Cycle</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "DSO (days)", value: dso, set: setDso },
                { label: "DIO (days)", value: dio, set: setDio },
                { label: "DPO (days)", value: dpo, set: setDpo },
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

          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-3">
              <h3 className="text-sm font-bold">Liquidity Ratios</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Current Assets ($)", value: currentAssets, set: setCurrentAssets },
                { label: "Current Liabilities ($)", value: currentLiabilities, set: setCurrentLiabilities },
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
                  <p className="text-[10px] text-muted-foreground">Δ NWC</p>
                  <p className="text-lg font-bold tabular-nums">${deltaNWC}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">Operating CF</p>
                  <p className="text-lg font-bold tabular-nums">${ocf}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">CCC</p>
                  <p className="text-lg font-bold tabular-nums">{ccc} days</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">Current Ratio</p>
                  <p className="text-lg font-bold tabular-nums">{currentRatio.toFixed(2)}x</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">Quick Ratio</p>
                  <p className="text-lg font-bold tabular-nums">{quickRatio.toFixed(2)}x</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Higher Δ NWC uses cash. Shorter CCC improves liquidity. Current ratio &gt; 1 indicates ability to cover short-term obligations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

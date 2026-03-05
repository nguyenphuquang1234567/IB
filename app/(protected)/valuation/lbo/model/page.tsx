"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Hammer,
  RotateCcw,
  TrendingUp,
  Grid3X3,
  Layers,
  Droplets,
  MessageSquare,
} from "lucide-react";
import {
  computeLBO,
  computeAdvancedLBO,
  buildCashFlowWaterfall,
  generateDealFeedback,
  fmt,
} from "@/lib/lbo-lab/engine";
import {
  LBOAssumptions,
  DEFAULT_LBO_ASSUMPTIONS,
  type AdvancedLBOInputs,
} from "@/lib/lbo-lab/types";
import { useLBOStore } from "@/store/useLBOStore";
import { cn } from "@/lib/utils";

const ASSUMPTION_FIELDS: {
  key: keyof LBOAssumptions;
  label: string;
  suffix: string;
  min?: number;
  max?: number;
  step?: number;
}[] = [
  { key: "purchasePrice", label: "Purchase Price", suffix: "$M", min: 0, step: 100 },
  { key: "entryEbitda", label: "Entry EBITDA", suffix: "$M", min: 0, step: 10 },
  { key: "exitEbitda", label: "Exit EBITDA", suffix: "$M", min: 0, step: 10 },
  { key: "debtAmount", label: "Debt", suffix: "$M", min: 0, step: 50 },
  { key: "equityAmount", label: "Equity", suffix: "$M", min: 0, step: 50 },
  { key: "holdPeriod", label: "Hold Period", suffix: "yrs", min: 1, max: 10, step: 1 },
  { key: "exitMultiple", label: "Exit Multiple (EV/EBITDA)", suffix: "x", min: 4, max: 20, step: 0.5 },
];

const DEFAULT_ADVANCED: AdvancedLBOInputs = {
  purchasePrice: 1000,
  entryEbitda: 100,
  entryRevenue: 500,
  revenueGrowth: 5,
  ebitdaMarginExpansion: 0.5,
  seniorDebt: 450,
  subordinatedDebt: 150,
  equityAmount: 400,
  holdPeriod: 5,
  exitMultiple: 10,
  interestRateSenior: 6,
  interestRateSub: 10,
  capexPercentRevenue: 3,
  dAPercentRevenue: 2,
};

export default function LBOModelPage() {
  const recordVisit = useLBOStore((s) => s.recordVisit);
  useEffect(() => {
    recordVisit("model");
  }, [recordVisit]);

  const [assumptions, setAssumptions] = useState<LBOAssumptions>(DEFAULT_LBO_ASSUMPTIONS);
  const [advancedInputs, setAdvancedInputs] = useState<AdvancedLBOInputs>(DEFAULT_ADVANCED);
  const [useAdvanced, setUseAdvanced] = useState(false);

  const output = useMemo(() => computeLBO(assumptions), [assumptions]);
  const advancedResult = useMemo(
    () => (useAdvanced ? computeAdvancedLBO(advancedInputs) : null),
    [useAdvanced, advancedInputs]
  );
  const waterfall = useMemo(() => {
    if (!advancedResult) return [];
    return buildCashFlowWaterfall(
      advancedResult.projections,
      advancedInputs.equityAmount,
      advancedResult.exitEquityValue
    );
  }, [advancedResult, advancedInputs.equityAmount]);

  const feedback = useMemo(() => generateDealFeedback(assumptions), [assumptions]);

  const updateAssumption = useCallback((key: keyof LBOAssumptions, value: string) => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) setAssumptions((p) => ({ ...p, [key]: parsed }));
  }, []);

  const updateAdvanced = useCallback((key: keyof AdvancedLBOInputs, value: string) => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) setAdvancedInputs((p) => ({ ...p, [key]: parsed }));
  }, []);

  const handleReset = useCallback(() => {
    setAssumptions(DEFAULT_LBO_ASSUMPTIONS);
    setAdvancedInputs(DEFAULT_ADVANCED);
  }, []);

  const sensitivityData = useMemo(() => {
    const multiples = [6, 8, 10, 12, 14];
    return multiples.map((m) => {
      const exitEv = assumptions.exitEbitda * m;
      const debtPaydown = Math.min(assumptions.debtAmount, assumptions.debtAmount * 0.2 * assumptions.holdPeriod);
      const exitEquity = exitEv - (assumptions.debtAmount - debtPaydown);
      const moic = assumptions.equityAmount > 0 ? exitEquity / assumptions.equityAmount : 0;
      const irr =
        assumptions.equityAmount > 0 && exitEquity > 0
          ? (Math.pow(exitEquity / assumptions.equityAmount, 1 / assumptions.holdPeriod) - 1) * 100
          : 0;
      return { multiple: m, exitEv, moic, irr };
    });
  }, [assumptions]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-varela font-bold tracking-tight flex items-center gap-2 text-finstep-brown dark:text-foreground">
            <Hammer className="w-6 h-6 text-emerald-500" />
            Advanced LBO Model Lab
          </h1>
          <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1">
            Build a leveraged buyout model. Adjust purchase price, capital structure, FCF assumptions, and see impact on returns.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset} className="h-8">
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          Reset
        </Button>
      </motion.div>

      <div className="flex gap-2 mb-4">
        <Button
          variant={!useAdvanced ? "default" : "outline"}
          size="sm"
          onClick={() => setUseAdvanced(false)}
          className={!useAdvanced ? "bg-emerald-500" : ""}
        >
          Simple Model
        </Button>
        <Button
          variant={useAdvanced ? "default" : "outline"}
          size="sm"
          onClick={() => setUseAdvanced(true)}
          className={useAdvanced ? "bg-emerald-500" : ""}
        >
          Full Model (FCF + Debt Schedule)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 space-y-4">
          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-3">
              <h3 className="text-sm flex items-center gap-2 text-finstep-brown dark:text-foreground">
                <Layers className="w-4 h-4 text-emerald-500" />
                Capital Structure
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {!useAdvanced ? (
                <>
                  <p className="text-xs text-muted-foreground">
                    Enter purchase price, EBITDA, debt/equity split, hold period, and exit multiple.
                  </p>
                  <div className="space-y-3">
                    {ASSUMPTION_FIELDS.map((f) => (
                      <div key={f.key} className="space-y-1">
                        <Label className="text-xs">{f.label}</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={assumptions[f.key]}
                            onChange={(e) => updateAssumption(f.key, e.target.value)}
                            className="pr-8"
                            step={f.step}
                            min={f.min}
                            max={f.max}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                            {f.suffix}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    {[
                      { key: "purchasePrice", label: "Purchase Price", suffix: "$M" },
                      { key: "entryEbitda", label: "Entry EBITDA", suffix: "$M" },
                      { key: "entryRevenue", label: "Entry Revenue", suffix: "$M" },
                      { key: "revenueGrowth", label: "Revenue Growth", suffix: "%" },
                      { key: "ebitdaMarginExpansion", label: "EBITDA Margin Expansion", suffix: "pp/yr" },
                      { key: "seniorDebt", label: "Senior Debt", suffix: "$M" },
                      { key: "subordinatedDebt", label: "Subordinated Debt", suffix: "$M" },
                      { key: "equityAmount", label: "Equity", suffix: "$M" },
                      { key: "holdPeriod", label: "Hold Period", suffix: "yrs" },
                      { key: "exitMultiple", label: "Exit Multiple", suffix: "x" },
                      { key: "interestRateSenior", label: "Senior Interest", suffix: "%" },
                      { key: "interestRateSub", label: "Sub Interest", suffix: "%" },
                      { key: "capexPercentRevenue", label: "CapEx % Revenue", suffix: "%" },
                      { key: "dAPercentRevenue", label: "D&A % Revenue", suffix: "%" },
                    ].map(({ key, label, suffix }) => (
                      <div key={key} className="space-y-1">
                        <Label className="text-xs">{label}</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={advancedInputs[key as keyof AdvancedLBOInputs]}
                            onChange={(e) => updateAdvanced(key as keyof AdvancedLBOInputs, e.target.value)}
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                            {suffix}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {!useAdvanced && (
            <Card className="shadow-sm border-border/40">
              <CardHeader className="pb-2">
                <h3 className="text-sm flex items-center gap-2 text-finstep-brown dark:text-foreground">
                  <Layers className="w-4 h-4 text-emerald-500" />
                  Capital Structure Visualization
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { label: "Equity", value: assumptions.equityAmount, color: "bg-emerald-500" },
                    { label: "Debt", value: assumptions.debtAmount, color: "bg-amber-500" },
                  ].map((item) => {
                    const pct =
                      assumptions.purchasePrice > 0
                        ? (item.value / assumptions.purchasePrice) * 100
                        : 0;
                    return (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{item.label}</span>
                          <span className="font-bold">{fmt(item.value)} ({pct.toFixed(0)}%)</span>
                        </div>
                        <div className="h-4 rounded bg-muted overflow-hidden">
                          <div
                            className={cn("h-full rounded transition-all", item.color)}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {useAdvanced && advancedResult && (
            <Card className="shadow-sm border-border/40">
              <CardHeader className="pb-2">
                <h3 className="text-sm flex items-center gap-2 text-finstep-brown dark:text-foreground">
                  <Layers className="w-4 h-4 text-emerald-500" />
                  Capital Structure
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { label: "Equity", value: advancedInputs.equityAmount, color: "bg-emerald-500" },
                    { label: "Subordinated Debt", value: advancedInputs.subordinatedDebt, color: "bg-amber-500" },
                    { label: "Senior Debt", value: advancedInputs.seniorDebt, color: "bg-blue-500" },
                  ].map((item) => {
                    const total =
                      advancedInputs.equityAmount +
                      advancedInputs.seniorDebt +
                      advancedInputs.subordinatedDebt;
                    const pct = total > 0 ? (item.value / total) * 100 : 0;
                    return (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{item.label}</span>
                          <span className="font-bold">{fmt(item.value)} ({pct.toFixed(0)}%)</span>
                        </div>
                        <div className="h-4 rounded bg-muted overflow-hidden">
                          <div
                            className={cn("h-full rounded transition-all", item.color)}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-8 space-y-4">
          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-2">
              <h3 className="text-sm flex items-center gap-2 text-finstep-brown dark:text-foreground">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Returns
              </h3>
            </CardHeader>
            <CardContent>
              {!useAdvanced ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] text-muted-foreground">Entry Multiple</p>
                    <p className="text-lg font-bold tabular-nums">{output.entryMultiple.toFixed(1)}x</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] text-muted-foreground">Exit EV</p>
                    <p className="text-lg font-bold tabular-nums">{fmt(output.exitEv)}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] text-muted-foreground">MOIC</p>
                    <p className="text-lg font-bold tabular-nums">{output.moic.toFixed(2)}x</p>
                  </div>
                  <div className="rounded-lg bg-emerald-500 p-3 text-white">
                    <p className="text-[10px] text-white/80">IRR</p>
                    <p className="text-lg font-bold tabular-nums">{output.irr.toFixed(1)}%</p>
                  </div>
                </div>
              ) : (
                advancedResult && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-lg border p-3">
                      <p className="text-[10px] text-muted-foreground">Exit EV</p>
                      <p className="text-lg font-bold tabular-nums">{fmt(advancedResult.exitEv)}</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-[10px] text-muted-foreground">Debt Paydown</p>
                      <p className="text-lg font-bold tabular-nums">{fmt(advancedResult.totalDebtPaydown)}</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-[10px] text-muted-foreground">MOIC</p>
                      <p className="text-lg font-bold tabular-nums">{advancedResult.moic.toFixed(2)}x</p>
                    </div>
                    <div className="rounded-lg bg-emerald-500 p-3 text-white">
                      <p className="text-[10px] text-white/80">IRR</p>
                      <p className="text-lg font-bold tabular-nums">{advancedResult.irr.toFixed(1)}%</p>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>

          {useAdvanced && advancedResult && (
            <>
              <Card className="shadow-sm border-border/40">
                <CardHeader className="pb-2">
                  <h3 className="text-sm flex items-center gap-2 text-finstep-brown dark:text-foreground">
                    <Grid3X3 className="w-4 h-4 text-emerald-500" />
                    FCF & Debt Schedule
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-2 text-left">Year</th>
                          <th className="py-2 px-2 text-right">Revenue</th>
                          <th className="py-2 px-2 text-right">EBITDA</th>
                          <th className="py-2 px-2 text-right">Interest</th>
                          <th className="py-2 px-2 text-right">FCF</th>
                          <th className="py-2 px-2 text-right">Debt Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {advancedResult.projections.map((p) => (
                          <tr key={p.year} className="border-b border-border/20">
                            <td className="py-2 px-2 font-medium">{p.year}</td>
                            <td className="py-2 px-2 text-right tabular-nums">{fmt(p.revenue)}</td>
                            <td className="py-2 px-2 text-right tabular-nums">{fmt(p.ebitda)}</td>
                            <td className="py-2 px-2 text-right tabular-nums">{fmt(p.interest)}</td>
                            <td className="py-2 px-2 text-right tabular-nums">{fmt(p.fcf)}</td>
                            <td className="py-2 px-2 text-right tabular-nums">{fmt(p.debtBalance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {waterfall.length > 0 && (
                <Card className="shadow-sm border-border/40">
                  <CardHeader className="pb-2">
                    <h3 className="text-sm flex items-center gap-2 text-finstep-brown dark:text-foreground">
                      <Droplets className="w-4 h-4 text-emerald-500" />
                      Cash Flow Waterfall
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {waterfall.map((w) => (
                        <div key={w.label} className="flex justify-between text-sm">
                          <span>{w.label}</span>
                          <span
                            className={cn(
                              "font-bold tabular-nums",
                              w.value >= 0 ? "text-emerald-600" : "text-red-600"
                            )}
                          >
                            {w.value >= 0 ? "+" : ""}{fmt(w.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          <Card className="shadow-sm border-border/40 border-amber-500/30 bg-amber-500/5">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold text-finstep-brown dark:text-foreground">
                Strategic Decision Challenge
              </h3>
              <p className="text-xs text-muted-foreground">
                Should the PE firm increase leverage to improve returns? Higher debt amplifies equity returns (MOIC, IRR) but increases financial risk—interest coverage, covenant headroom, and refinancing risk.
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Try increasing debt in the model and observe: MOIC and IRR rise, but the deal becomes more sensitive to EBITDA shortfalls. Stress-test by lowering exit multiple or EBITDA growth.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-2">
              <h3 className="text-sm flex items-center gap-2 text-finstep-brown dark:text-foreground">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                Performance Feedback
              </h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feedback.map((insight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-emerald-500 shrink-0">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-2">
              <h3 className="text-sm flex items-center gap-2 text-finstep-brown dark:text-foreground">
                <Grid3X3 className="w-4 h-4 text-emerald-500" />
                Exit Multiple Sensitivity
              </h3>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-3 text-left">Exit EV/EBITDA</th>
                      <th className="py-2 px-3 text-right">Exit EV</th>
                      <th className="py-2 px-3 text-right">MOIC</th>
                      <th className="py-2 px-3 text-right">IRR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensitivityData.map((row) => (
                      <tr
                        key={row.multiple}
                        className={cn(
                          "border-b border-border/20",
                          row.multiple === assumptions.exitMultiple && "bg-emerald-500/10"
                        )}
                      >
                        <td className="py-2 px-3 font-medium">{row.multiple}x</td>
                        <td className="py-2 px-3 text-right tabular-nums">{fmt(row.exitEv)}</td>
                        <td className="py-2 px-3 text-right tabular-nums font-medium">{row.moic.toFixed(2)}x</td>
                        <td className="py-2 px-3 text-right tabular-nums font-medium">{row.irr.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

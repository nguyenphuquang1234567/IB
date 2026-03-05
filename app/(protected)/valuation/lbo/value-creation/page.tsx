"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TrendingUp, Zap, DollarSign, Building2, Globe } from "lucide-react";
import type { ValueCreationDriver } from "@/lib/lbo-lab/types";
import { fmt } from "@/lib/lbo-lab/engine";
import { useLBOStore } from "@/store/useLBOStore";
import { cn } from "@/lib/utils";

const DRIVERS: { id: ValueCreationDriver; label: string; icon: typeof Zap; desc: string }[] = [
  { id: "operational-efficiency", label: "Operational Efficiency", icon: Zap, desc: "Streamline processes, reduce waste, improve throughput" },
  { id: "pricing-power", label: "Pricing Power", icon: DollarSign, desc: "Raise prices without losing volume" },
  { id: "cost-reduction", label: "Cost Reduction", icon: DollarSign, desc: "G&A cuts, procurement, headcount optimization" },
  { id: "strategic-acquisitions", label: "Strategic Acquisitions", icon: Building2, desc: "Add-on acquisitions, roll-up strategy" },
  { id: "market-expansion", label: "Market Expansion", icon: Globe, desc: "New geographies, channels, or product lines" },
];

export default function ValueCreationPage() {
  const recordVisit = useLBOStore((s) => s.recordVisit);
  useEffect(() => {
    recordVisit("value-creation");
  }, [recordVisit]);

  const [entryEbitda, setEntryEbitda] = useState(100);
  const [entryRevenue, setEntryRevenue] = useState(500);
  const [entryMultiple, setEntryMultiple] = useState(10);
  const [revenueGrowth, setRevenueGrowth] = useState(5);
  const [marginExpansion, setMarginExpansion] = useState(0.5);
  const [holdPeriod, setHoldPeriod] = useState(5);
  const [exitMultiple, setExitMultiple] = useState(10);
  const [driver, setDriver] = useState<ValueCreationDriver>("operational-efficiency");

  const result = useMemo(() => {
    let revenue = entryRevenue;
    let ebitda = entryEbitda;
    let ebitdaMargin = revenue > 0 ? (ebitda / revenue) * 100 : 0;

    for (let y = 1; y <= holdPeriod; y++) {
      revenue *= 1 + revenueGrowth / 100;
      ebitdaMargin += marginExpansion;
      ebitda = (revenue * ebitdaMargin) / 100;
    }

    const entryEv = entryEbitda * entryMultiple;
    const exitEv = ebitda * exitMultiple;
    const moic = entryEv > 0 ? exitEv / entryEv : 0;
    const irr =
      entryEv > 0 && exitEv > 0 && holdPeriod > 0
        ? (Math.pow(exitEv / entryEv, 1 / holdPeriod) - 1) * 100
        : 0;

    return {
      exitEbitda: ebitda,
      exitEv,
      moic,
      irr,
      revenue,
      ebitdaMargin,
    };
  }, [
    entryEbitda,
    entryRevenue,
    entryMultiple,
    revenueGrowth,
    marginExpansion,
    holdPeriod,
    exitMultiple,
  ]);

  const currentDriver = DRIVERS.find((d) => d.id === driver);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-varela font-bold tracking-tight flex items-center gap-2 text-finstep-brown dark:text-foreground">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
          Value Creation Simulator
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1">
          Simulate how PE firms create value. Adjust operational assumptions and observe impact on EBITDA growth, cash flow, and enterprise value.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 space-y-4">
          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-3">
              <h3 className="text-sm font-bold text-finstep-brown dark:text-foreground">
                Value Creation Driver
              </h3>
            </CardHeader>
            <CardContent className="space-y-2">
              {DRIVERS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDriver(d.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all",
                    driver === d.id
                      ? "bg-emerald-500 text-white"
                      : "bg-muted/30 hover:bg-muted/50 text-muted-foreground"
                  )}
                >
                  <d.icon className="w-4 h-4 shrink-0" />
                  <span className="font-medium">{d.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-3">
              <h3 className="text-sm font-bold text-finstep-brown dark:text-foreground">
                Operational Assumptions
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { key: "entryEbitda", label: "Entry EBITDA", suffix: "$M", set: setEntryEbitda, val: entryEbitda },
                { key: "entryRevenue", label: "Entry Revenue", suffix: "$M", set: setEntryRevenue, val: entryRevenue },
                { key: "entryMultiple", label: "Entry Multiple", suffix: "x", set: setEntryMultiple, val: entryMultiple },
                { key: "revenueGrowth", label: "Revenue Growth", suffix: "%/yr", set: setRevenueGrowth, val: revenueGrowth },
                { key: "marginExpansion", label: "Margin Expansion", suffix: "pp/yr", set: setMarginExpansion, val: marginExpansion },
                { key: "holdPeriod", label: "Hold Period", suffix: "yrs", set: setHoldPeriod, val: holdPeriod },
                { key: "exitMultiple", label: "Exit Multiple", suffix: "x", set: setExitMultiple, val: exitMultiple },
              ].map(({ key, label, suffix, set, val }) => (
                <div key={key} className="space-y-1">
                  <Label className="text-xs">{label}</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={val}
                      onChange={(e) => set(parseFloat(e.target.value) || 0)}
                      className="pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      {suffix}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-4">
          {currentDriver && (
            <Card className="shadow-sm border-border/40">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <currentDriver.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">{currentDriver.label}</h3>
                    <p className="text-xs text-muted-foreground">{currentDriver.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold text-finstep-brown dark:text-foreground">
                Impact on Enterprise Value
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">Exit EBITDA</p>
                  <p className="text-lg font-bold tabular-nums">{fmt(result.exitEbitda)}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">Exit EV</p>
                  <p className="text-lg font-bold tabular-nums">{fmt(result.exitEv)}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">MOIC</p>
                  <p className="text-lg font-bold tabular-nums">{result.moic.toFixed(2)}x</p>
                </div>
                <div className="rounded-lg bg-emerald-500 p-3 text-white">
                  <p className="text-[10px] text-white/80">IRR</p>
                  <p className="text-lg font-bold tabular-nums">{result.irr.toFixed(1)}%</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Exit margin: {result.ebitdaMargin.toFixed(1)}%. Revenue at exit: {fmt(result.revenue)}.
                Value creation comes from revenue growth, margin expansion, and multiple.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

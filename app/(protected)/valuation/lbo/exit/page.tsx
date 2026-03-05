"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Target, Building2, RefreshCw, TrendingUp } from "lucide-react";
import { fmt } from "@/lib/lbo-lab/engine";
import { useLBOStore } from "@/store/useLBOStore";
import { cn } from "@/lib/utils";

const EXIT_SCENARIOS = [
  { id: "strategic", label: "Strategic Sale", desc: "Sell to corporate buyer. Often premium multiple for synergies.", icon: Building2 },
  { id: "secondary", label: "Secondary Buyout", desc: "Sell to another PE firm. Common when more time needed.", icon: RefreshCw },
  { id: "ipo", label: "IPO", desc: "Take company public. Works for large, high-growth companies.", icon: TrendingUp },
];

export default function ExitReturnsPage() {
  const recordVisit = useLBOStore((s) => s.recordVisit);
  useEffect(() => {
    recordVisit("exit");
  }, [recordVisit]);

  const [equityAmount, setEquityAmount] = useState(400);
  const [exitEv, setExitEv] = useState(1200);
  const [debtAtExit, setDebtAtExit] = useState(400);
  const [holdPeriod, setHoldPeriod] = useState(5);
  const [selectedExit, setSelectedExit] = useState("strategic");

  const exitEquityValue = exitEv - debtAtExit;
  const moic = equityAmount > 0 ? exitEquityValue / equityAmount : 0;
  const irr =
    equityAmount > 0 && exitEquityValue > 0 && holdPeriod > 0
      ? (Math.pow(exitEquityValue / equityAmount, 1 / holdPeriod) - 1) * 100
      : 0;

  const sensitivityData = useMemo(() => {
    const multiples = [0.5, 0.75, 1, 1.25, 1.5, 2];
    return multiples.map((m) => {
      const ev = exitEv * m;
      const eq = ev - debtAtExit;
      const mo = equityAmount > 0 ? eq / equityAmount : 0;
      const ir =
        equityAmount > 0 && eq > 0 && holdPeriod > 0
          ? (Math.pow(eq / equityAmount, 1 / holdPeriod) - 1) * 100
          : 0;
      return { multiple: m, exitEv: ev, moic: mo, irr: ir };
    });
  }, [exitEv, debtAtExit, equityAmount, holdPeriod]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-varela font-bold tracking-tight flex items-center gap-2 text-finstep-brown dark:text-foreground">
          <Target className="w-6 h-6 text-emerald-500" />
          Exit & Investor Returns Lab
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1">
          Evaluate exit scenarios. Analyze how strategic sale, secondary buyout, or IPO affect IRR and MOIC. See how leverage amplifies equity returns.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 space-y-4">
          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-3">
              <h3 className="text-sm font-bold text-finstep-brown dark:text-foreground">
                Exit Scenario
              </h3>
            </CardHeader>
            <CardContent className="space-y-2">
              {EXIT_SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedExit(s.id)}
                  className={cn(
                    "w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all",
                    selectedExit === s.id
                      ? "bg-emerald-500 text-white"
                      : "bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  <s.icon className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{s.label}</p>
                    <p className={cn("text-xs mt-0.5", selectedExit === s.id ? "text-white/80" : "text-muted-foreground")}>
                      {s.desc}
                    </p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-3">
              <h3 className="text-sm font-bold text-finstep-brown dark:text-foreground">
                Assumptions
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { key: "equityAmount", label: "Initial Equity", suffix: "$M", set: setEquityAmount, val: equityAmount },
                { key: "exitEv", label: "Exit EV", suffix: "$M", set: setExitEv, val: exitEv },
                { key: "debtAtExit", label: "Debt at Exit", suffix: "$M", set: setDebtAtExit, val: debtAtExit },
                { key: "holdPeriod", label: "Hold Period", suffix: "yrs", set: setHoldPeriod, val: holdPeriod },
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
          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold text-finstep-brown dark:text-foreground">
                Investor Returns
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">Exit Equity Value</p>
                  <p className="text-lg font-bold tabular-nums">{fmt(exitEquityValue)}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">MOIC</p>
                  <p className="text-lg font-bold tabular-nums">{moic.toFixed(2)}x</p>
                </div>
                <div className="rounded-lg bg-emerald-500 p-3 text-white">
                  <p className="text-[10px] text-white/80">IRR</p>
                  <p className="text-lg font-bold tabular-nums">{irr.toFixed(1)}%</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] text-muted-foreground">Leverage Effect</p>
                  <p className="text-sm font-bold">
                    {debtAtExit > 0 ? "Debt amplifies equity returns" : "No debt at exit"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Higher leverage (more debt at entry, less paydown) increases MOIC and IRR because the sponsor owns 100% of the upside with less equity at risk.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold text-finstep-brown dark:text-foreground">
                Exit Value Sensitivity
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">
                How do different exit valuations affect returns? (1x = base case)
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-3 text-left">Exit Value Multiple</th>
                      <th className="py-2 px-3 text-right">Exit EV</th>
                      <th className="py-2 px-3 text-right">MOIC</th>
                      <th className="py-2 px-3 text-right">IRR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensitivityData.map((row) => (
                      <tr key={row.multiple} className="border-b border-border/20">
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

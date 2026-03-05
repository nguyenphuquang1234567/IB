"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MARKET_EVENTS,
  applyEventImpact,
  type UserAction,
  type MarketEvent,
} from "@/lib/asset-management/simulation-engine";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Zap, RotateCcw } from "lucide-react";

const INITIAL_WEIGHTS: Record<string, number> = {
  equities: 50,
  bonds: 25,
  etfs: 0,
  commodities: 0,
  realestate: 15,
  cash: 10,
};

const ACTIONS: { id: UserAction; label: string; desc: string }[] = [
  { id: "hold", label: "Hold", desc: "No change to allocation" },
  { id: "rebalance", label: "Rebalance", desc: "Reset to 40/30/5/5/10/10" },
  { id: "increase_exposure", label: "Increase Exposure", desc: "+10% equities, -10% cash" },
  { id: "reduce_risk", label: "Reduce Risk", desc: "+15% cash, -15% equities" },
];

export default function PortfolioSimulationPage() {
  const [weights, setWeights] = useState<Record<string, number>>(INITIAL_WEIGHTS);
  const [portfolioValue, setPortfolioValue] = useState(100);
  const [history, setHistory] = useState<{ period: number; value: number; event?: string }[]>([
    { period: 0, value: 100 },
  ]);
  const [currentEvent, setCurrentEvent] = useState<MarketEvent | null>(null);
  const [period, setPeriod] = useState(0);

  const triggerEvent = (event: MarketEvent) => {
    setCurrentEvent(event);
  };

  const handleAction = (action: UserAction) => {
    if (!currentEvent) return;

    const { newValue, newWeights } = applyEventImpact(weights, currentEvent, action);

    setWeights(newWeights);
    setPortfolioValue(newValue);
    setHistory((h) => [
      ...h,
      { period: period + 1, value: newValue, event: currentEvent.title },
    ]);
    setPeriod((p) => p + 1);
    setCurrentEvent(null);
  };

  const resetSimulation = () => {
    setWeights(INITIAL_WEIGHTS);
    setPortfolioValue(100);
    setHistory([{ period: 0, value: 100 }]);
    setCurrentEvent(null);
    setPeriod(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
          Portfolio Simulation
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          React to market events by rebalancing, increasing exposure, or reducing risk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Market Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {MARKET_EVENTS.map((ev) => (
                <Button
                  key={ev.id}
                  variant={currentEvent?.id === ev.id ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => triggerEvent(ev)}
                  disabled={!!currentEvent && currentEvent.id !== ev.id}
                >
                  <span className="font-medium">{ev.title}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Current Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                {Object.entries(weights).map(([k, v]) =>
                  v > 0 ? (
                    <li key={k} className="flex justify-between">
                      <span className="capitalize">{k.replace(/([A-Z])/g, " $1").trim()}</span>
                      <span>{v}%</span>
                    </li>
                  ) : null
                )}
              </ul>
            </CardContent>
          </Card>

          <Button variant="outline" onClick={resetSimulation} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Simulation
          </Button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Portfolio Value</CardTitle>
              <span className="text-2xl font-bold text-finstep-orange">
                ${portfolioValue.toFixed(1)}
              </span>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} domain={[80, 120]} />
                    <Tooltip
                      formatter={(v) => [`$${((v as number) ?? 0).toFixed(1)}`, "Value"]}
                      contentStyle={{ fontSize: 12 }}
                    />
                    <ReferenceLine y={100} stroke="var(--muted-foreground)" strokeDasharray="2 2" />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Portfolio"
                      stroke="var(--finstep-orange)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {currentEvent && (
            <Card className="border-finstep-orange/50">
              <CardHeader>
                <CardTitle className="text-base">{currentEvent.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{currentEvent.description}</p>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">Choose your response:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ACTIONS.map((a) => (
                    <Button
                      key={a.id}
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-start"
                      onClick={() => handleAction(a.id)}
                    >
                      <span className="font-medium">{a.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">{a.desc}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {!currentEvent && period === 0 && (
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  Select a market event above to simulate its impact on your portfolio. Your allocation
                  and portfolio value will update based on your chosen response.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

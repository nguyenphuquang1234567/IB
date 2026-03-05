"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import {
  FACTORY_SCENARIOS,
  computeNPV,
  computeIRR,
  computePayback,
} from "@/lib/corporate-finance/investment";
import { cn } from "@/lib/utils";

export default function FactoryScenarioPage() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [decision, setDecision] = useState<"invest" | "pass" | null>(null);

  const scenario = FACTORY_SCENARIOS[scenarioIndex]!;
  const npv = computeNPV(
    scenario.initialInvestment,
    scenario.cashFlows,
    scenario.discountRate
  );
  const irr = computeIRR(scenario.initialInvestment, scenario.cashFlows);
  const payback = computePayback(scenario.initialInvestment, scenario.cashFlows);

  const handleDecide = (d: "invest" | "pass") => {
    setDecision(d);
  };

  const handleNext = () => {
    setScenarioIndex((i) => (i + 1) % FACTORY_SCENARIOS.length);
    setDecision(null);
  };

  const correct = decision === (scenario.suggestedInvest ? "invest" : "pass");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
            Factory Investment Scenario
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Evaluate projected cash flows and determine if the project creates value
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleNext}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Next Scenario
        </Button>
      </div>

      <Card className="shadow-sm border-border/40">
        <CardHeader className="pb-2">
          <Badge variant="outline" className="w-fit text-[10px]">
            Scenario {scenarioIndex + 1} of {FACTORY_SCENARIOS.length}
          </Badge>
          <h2 className="text-lg font-varela font-bold mt-2">{scenario.name}</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">{scenario.name} — evaluate the investment.</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border p-3">
              <p className="text-[10px] text-muted-foreground">Initial Investment</p>
              <p className="text-lg font-bold">${scenario.initialInvestment}M</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-[10px] text-muted-foreground">Discount Rate</p>
              <p className="text-lg font-bold">{scenario.discountRate}%</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-[10px] text-muted-foreground">NPV</p>
              <p className={cn("text-lg font-bold", npv >= 0 ? "text-emerald-600" : "text-red-600")}>
                ${npv.toFixed(0)}M
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-[10px] text-muted-foreground">IRR</p>
              <p className="text-lg font-bold">{irr.toFixed(1)}%</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-2">Cash Flows ($M)</h3>
            <div className="flex flex-wrap gap-2">
              {scenario.cashFlows.map((cf, i) => (
                <span key={i} className="px-2 py-1 rounded bg-muted text-sm">
                  Y{i + 1}: ${cf}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Payback: {payback.toFixed(1)} years
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-bold mb-3">Your Decision</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Should the company invest in this project?
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => handleDecide("invest")}
                className={cn(
                  decision === "invest" && "bg-emerald-500"
                )}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Invest
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDecide("pass")}
                className={cn(
                  decision === "pass" && "border-red-500 bg-red-500/10"
                )}
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                Pass
              </Button>
            </div>
          </div>

          {decision && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-muted/50 border"
            >
              <h3 className="text-sm font-bold mb-2">
                {correct ? "Correct!" : "Review"}
              </h3>
              <p className="text-sm text-muted-foreground">{scenario.explanation}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ThumbsUp, ThumbsDown, ChevronRight, RefreshCw } from "lucide-react";
import { DEAL_SCENARIOS } from "@/lib/lbo-lab/deal-scenarios";
import { useLBOStore } from "@/store/useLBOStore";
import { cn } from "@/lib/utils";

function StabilityBadge({ v }: { v: "high" | "medium" | "low" }) {
  const colors =
    v === "high"
      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
      : v === "medium"
        ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
        : "bg-red-500/10 text-red-600 border-red-500/30";
  return (
    <Badge variant="outline" className={cn("text-[10px]", colors)}>
      {v}
    </Badge>
  );
}

export default function DealSourcingPage() {
  const recordVisit = useLBOStore((s) => s.recordVisit);
  const completeScenario = useLBOStore((s) => s.completeScenario);
  useEffect(() => {
    recordVisit("deal-sourcing");
  }, [recordVisit]);

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [decision, setDecision] = useState<"pursue" | "pass" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = DEAL_SCENARIOS[scenarioIndex]!;

  const handleDecide = (d: "pursue" | "pass") => {
    setDecision(d);
    setShowFeedback(true);
    completeScenario("deal-sourcing");
  };

  const handleNext = () => {
    setScenarioIndex((i) => (i + 1) % DEAL_SCENARIOS.length);
    setDecision(null);
    setShowFeedback(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-varela font-bold tracking-tight flex items-center gap-2 text-finstep-brown dark:text-foreground">
          <Search className="w-6 h-6 text-emerald-500" />
          Deal Sourcing Simulator
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1">
          Evaluate acquisition targets. Determine whether each company is a good LBO candidate based on stability, cash flow, and improvement potential.
        </p>
      </motion.div>

      <Card className="shadow-sm border-border/40">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
              Scenario {scenarioIndex + 1} of {DEAL_SCENARIOS.length}
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleNext} className="h-8">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Next Scenario
            </Button>
          </div>
          <h2 className="text-lg font-varela font-bold text-finstep-brown dark:text-foreground mt-2">
            {scenario.name}
          </h2>
          <p className="text-sm text-muted-foreground">{scenario.industry}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-finstep-brown/80 dark:text-muted-foreground leading-relaxed">
            {scenario.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border border-border/40 p-3">
              <p className="text-[10px] text-muted-foreground uppercase">Revenue</p>
              <p className="text-lg font-bold tabular-nums">${scenario.revenue}M</p>
            </div>
            <div className="rounded-lg border border-border/40 p-3">
              <p className="text-[10px] text-muted-foreground uppercase">EBITDA Margin</p>
              <p className="text-lg font-bold tabular-nums">{scenario.ebitdaMargin}%</p>
            </div>
            <div className="rounded-lg border border-border/40 p-3">
              <p className="text-[10px] text-muted-foreground uppercase">Revenue Growth</p>
              <p className="text-lg font-bold tabular-nums">{scenario.revenueGrowth}%</p>
            </div>
            <div className="rounded-lg border border-border/40 p-3">
              <p className="text-[10px] text-muted-foreground uppercase">Competitive Position</p>
              <p className="text-sm font-bold capitalize">{scenario.competitivePosition}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Cash Flow Stability:</span>
            <StabilityBadge v={scenario.cashFlowStability} />
            <span className="text-xs font-semibold text-muted-foreground ml-2">Improvement Potential:</span>
            <StabilityBadge v={scenario.operationalImprovementPotential} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                Key Strengths
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {scenario.keyStrengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500">+</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                Key Risks
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {scenario.keyRisks.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500">!</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-4">
            <h3 className="text-sm font-bold text-finstep-brown dark:text-foreground mb-3">
              Your Decision
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Is this company stable enough to support leverage? Does it generate strong free cash flow? Is there potential for operational improvement?
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => handleDecide("pursue")}
                className={cn(
                  "flex-1",
                  decision === "pursue"
                    ? "bg-emerald-500 text-white"
                    : "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                )}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Pursue Deal
              </Button>
              <Button
                onClick={() => handleDecide("pass")}
                variant="outline"
                className={cn(
                  "flex-1",
                  decision === "pass" && "border-red-500 bg-red-500/10 text-red-600"
                )}
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                Pass
              </Button>
            </div>
          </div>

          {showFeedback && decision && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-muted/50 border border-border/40"
            >
              <h3 className="text-sm font-bold text-finstep-brown dark:text-foreground mb-2 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-emerald-500" />
                Professional Feedback
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {decision === "pursue" ? scenario.feedbackPursue : scenario.feedbackPass}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

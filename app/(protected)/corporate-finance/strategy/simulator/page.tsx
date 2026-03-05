"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, ChevronRight } from "lucide-react";
import { STRATEGY_SCENARIOS } from "@/lib/corporate-finance/strategy";
import { useCorporateFinanceStore } from "@/store/useCorporateFinanceStore";
import { cn } from "@/lib/utils";

export default function StrategySimulatorPage() {
  const recordVisit = useCorporateFinanceStore((s) => s.recordVisit);
  useEffect(() => {
    recordVisit("strategy");
  }, [recordVisit]);

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const scenario = STRATEGY_SCENARIOS[scenarioIndex]!;
  const correct = selectedOption === scenario.correctOption;

  const handleNext = () => {
    setScenarioIndex((i) => (i + 1) % STRATEGY_SCENARIOS.length);
    setSelectedOption(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
            Strategy Simulator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Make corporate financial decisions and see the impact
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
            Scenario {scenarioIndex + 1} of {STRATEGY_SCENARIOS.length}
          </Badge>
          <h2 className="text-lg font-varela font-bold mt-2">{scenario.title}</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {scenario.description}
          </p>

          <div>
            <h3 className="text-sm font-bold mb-3">Your Decision</h3>
            <div className="space-y-2">
              {scenario.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  disabled={selectedOption !== null}
                  className={cn(
                    "w-full flex flex-col items-start gap-1 p-4 rounded-lg border text-left transition-all",
                    selectedOption === opt.id
                      ? opt.id === scenario.correctOption
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-red-500 bg-red-500/10"
                      : selectedOption === null
                        ? "hover:border-finstep-orange/50 hover:bg-muted/30"
                        : "opacity-60"
                  )}
                >
                  <span className="font-semibold">{opt.label}</span>
                  <span className="text-xs text-muted-foreground">{opt.impact}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-muted/50 border"
            >
              <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-finstep-orange" />
                {correct ? "Well done!" : "Review"}
              </h3>
              <p className="text-sm text-muted-foreground">{scenario.explanation}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

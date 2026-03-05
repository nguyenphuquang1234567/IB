"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const STRATEGY_QUESTIONS = [
  {
    id: "s1",
    question: "A company has excess cash and is considering a dividend vs. share buyback. What factors should influence the decision?",
    answer: "Tax treatment (dividends vs. capital gains), shareholder preference, signaling (buyback may signal undervaluation), flexibility (buyback can be paused).",
  },
  {
    id: "s2",
    question: "When should a company consider raising equity instead of debt?",
    answer: "When leverage is high, covenant headroom is tight, or the business is cyclical. Equity also makes sense when the cost of capital is favorable (high stock price) or when preserving flexibility is important.",
  },
  {
    id: "s3",
    question: "What is the trade-off between revenue growth and profitability?",
    answer: "Aggressive growth often requires investment (marketing, capex, hiring) that depresses profitability short-term. Companies must balance growth rate with margin targets and cash flow sustainability.",
  },
];

export default function StrategyPracticePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-finstep-orange" />
          Practice Exercises
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Business decision questions and scenarios
        </p>
      </div>

      <div className="space-y-4">
        {STRATEGY_QUESTIONS.map((q) => (
          <motion.div key={q.id} layout>
            <Card
              className="shadow-sm border-border/40 overflow-hidden cursor-pointer"
              onClick={() =>
                setExpandedId(expandedId === q.id ? null : q.id)
              }
            >
              <CardContent className="pt-6 pb-6">
                <p className="font-semibold mb-2">{q.question}</p>
                {expandedId === q.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-lg bg-muted/50 p-3 text-sm mt-3"
                  >
                    <p className="font-semibold mb-1">Explanation</p>
                    <p className="text-muted-foreground">{q.answer}</p>
                  </motion.div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {expandedId === q.id ? "Click to collapse" : "Click to reveal explanation"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

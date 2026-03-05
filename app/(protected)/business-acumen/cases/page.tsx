"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Briefcase,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BUSINESS_CASES } from "@/lib/business-acumen/cases";
import { useBusinessAcumenStore } from "@/store/useBusinessAcumenStore";

function getFeedback(correct: number, total: number): string {
  const pct = total > 0 ? (correct / total) * 100 : 0;
  if (pct >= 85) return "Strong analysis. You correctly identified key drivers and tradeoffs.";
  if (pct >= 70) return "Good progress. Focus on linking metrics to root causes.";
  if (pct >= 50) return "Keep practicing. Pay attention to how financial metrics connect to business outcomes.";
  return "Review the concepts. Business acumen improves with pattern recognition across cases.";
}

export default function BusinessCasesPage() {
  const recordVisit = useBusinessAcumenStore((s) => s.recordVisit);
  const completePractice = useBusinessAcumenStore((s) => s.completePractice);
  const hasReportedPractice = useRef(false);
  useEffect(() => {
    recordVisit("cases");
  }, [recordVisit]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const c = BUSINESS_CASES[currentIndex];
  const userAnswer = c ? answers[c.id] : undefined;
  const isRevealed = c ? !!revealed[c.id] : undefined;

  const stats = useMemo(() => {
    const answered = Object.keys(answers).length;
    const correct = BUSINESS_CASES.filter((x) => answers[x.id] === x.correct).length;
    return {
      correct,
      answered,
      total: BUSINESS_CASES.length,
      accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    };
  }, [answers]);

  useEffect(() => {
    if (finished && !hasReportedPractice.current) {
      hasReportedPractice.current = true;
      completePractice("cases", stats.accuracy);
    }
  }, [finished, stats.accuracy, completePractice]);

  const handleSelect = useCallback(
    (choice: string) => {
      if (isRevealed || !c) return;
      setAnswers((prev) => ({ ...prev, [c.id]: choice }));
      setRevealed((prev) => ({ ...prev, [c.id]: true }));
    },
    [isRevealed, c]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < BUSINESS_CASES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  }, [currentIndex]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setRevealed({});
    setFinished(false);
    hasReportedPractice.current = false;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-finstep-orange" />
            Business Case Practice
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze scenarios and select the best explanation
          </p>
        </div>
        <div className="text-right text-sm">
          <span className="font-bold tabular-nums">{stats.answered}/{stats.total}</span>
          <span className="text-muted-foreground ml-1">•</span>
          <span className="font-bold tabular-nums ml-1">{stats.accuracy}%</span>
        </div>
      </div>

      <Progress value={(stats.answered / stats.total) * 100} className="h-2" />

      <AnimatePresence mode="wait">
        {finished ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="pt-8 pb-8 text-center space-y-6">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <div>
                  <h2 className="text-xl font-varela font-bold mb-2">Session Complete</h2>
                  <p className="text-sm text-muted-foreground">
                    {stats.correct}/{stats.total} correct ({stats.accuracy}% accuracy)
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-left max-w-md mx-auto">
                  <p className="text-sm font-semibold flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-finstep-orange" />
                    Performance Feedback
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getFeedback(stats.correct, stats.total)}
                  </p>
                </div>
                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key={c?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6 pb-6 space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Case {currentIndex + 1} of {BUSINESS_CASES.length}
                    <Badge variant="outline" className="ml-2 text-[10px]">
                      {c?.difficulty}
                    </Badge>
                  </p>
                  <h3 className="font-semibold text-finstep-brown dark:text-foreground">{c?.title}</h3>
                </div>
                <p className="text-sm">{c?.scenario}</p>
                {c?.data && c.data.length > 0 && (
                  <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1">
                    {c.data.map((d, i) => (
                      <p key={i}>• {d}</p>
                    ))}
                  </div>
                )}
                <p className="font-semibold">{c?.question}</p>
                <div className="space-y-2">
                  {c?.choices.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => handleSelect(choice)}
                      disabled={!!isRevealed}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all",
                        !isRevealed && "hover:border-finstep-orange hover:bg-finstep-orange/5",
                        answers[c.id] === choice && !isRevealed && "border-finstep-orange bg-finstep-orange/10",
                        isRevealed && choice === c.correct && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                        isRevealed && choice === userAnswer && choice !== c.correct && "border-red-500 bg-red-50 dark:bg-red-950/30",
                        isRevealed && choice !== userAnswer && choice !== c.correct && "opacity-50"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {isRevealed && choice === c.correct && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                        {isRevealed && choice === userAnswer && choice !== c.correct && (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                        )}
                        {choice}
                      </span>
                    </button>
                  ))}
                </div>
                {isRevealed && (
                  <div className="rounded-lg border border-finstep-orange/30 bg-finstep-orange/5 p-4">
                    <p className="text-xs font-semibold text-finstep-orange uppercase tracking-wider mb-2">
                      Reasoning
                    </p>
                    <p className="text-sm">{c?.reasoning}</p>
                  </div>
                )}
                {isRevealed && (
                  <Button className="w-full" onClick={handleNext}>
                    {currentIndex < BUSINESS_CASES.length - 1 ? (
                      <>
                        Next Case <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      "View Feedback"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

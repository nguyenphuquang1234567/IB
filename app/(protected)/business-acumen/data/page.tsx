"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DATA_EXERCISES } from "@/lib/business-acumen/data-interpretation";
import { useBusinessAcumenStore } from "@/store/useBusinessAcumenStore";

export default function DataInterpretationPage() {
  const recordVisit = useBusinessAcumenStore((s) => s.recordVisit);
  const completePractice = useBusinessAcumenStore((s) => s.completePractice);
  const hasReportedPractice = useRef(false);
  useEffect(() => {
    recordVisit("data");
  }, [recordVisit]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const ex = DATA_EXERCISES[currentIndex];
  const userAnswer = ex ? answers[ex.id] : undefined;
  const isRevealed = ex ? !!revealed[ex.id] : false;

  function getFeedback(correct: number, total: number): string {
    const pct = total > 0 ? (correct / total) * 100 : 0;
    if (pct >= 85) return "Strong data interpretation. You correctly linked metrics to business drivers.";
    if (pct >= 70) return "Good progress. Focus on calculating ratios and trends before answering.";
    if (pct >= 50) return "Keep practicing. Look for cause-effect relationships in the data.";
    return "Review the concepts. Data interpretation improves with pattern recognition.";
  }

  const stats = useMemo(() => {
    const answered = Object.keys(answers).length;
    const correct = DATA_EXERCISES.filter((x) => answers[x.id] === x.correct).length;
    return {
      correct,
      answered,
      total: DATA_EXERCISES.length,
      accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    };
  }, [answers]);

  useEffect(() => {
    if (finished && !hasReportedPractice.current) {
      hasReportedPractice.current = true;
      completePractice("data", stats.accuracy);
    }
  }, [finished, stats.accuracy, completePractice]);

  const handleSelect = useCallback(
    (choice: string) => {
      if (isRevealed || !ex) return;
      setAnswers((prev) => ({ ...prev, [ex.id]: choice }));
      setRevealed((prev) => ({ ...prev, [ex.id]: true }));
    },
    [isRevealed, ex]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < DATA_EXERCISES.length - 1) {
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

  const chartData = ex?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-finstep-orange" />
            Data Interpretation
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze business data and identify key insights
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
                    {stats.correct}/{stats.total} correct ({stats.accuracy}%)
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
            key={ex?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6 pb-6 space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Exercise {currentIndex + 1} of {DATA_EXERCISES.length}
                    <Badge variant="outline" className="ml-2 text-[10px]">
                      {ex?.difficulty}
                    </Badge>
                  </p>
                  <h3 className="font-semibold text-finstep-brown dark:text-foreground">{ex?.title}</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4">Quarter</th>
                        <th className="text-right py-2 px-2">Revenue</th>
                        <th className="text-right py-2 px-2">Marketing Spend</th>
                        <th className="text-right py-2 px-2">Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ex?.data.map((row) => (
                        <tr key={row.quarter} className="border-b">
                          <td className="py-2 pr-4 font-medium">{row.quarter}</td>
                          <td className="text-right py-2 px-2 tabular-nums">{row.revenue}</td>
                          <td className="text-right py-2 px-2 tabular-nums">{row.marketingSpend}</td>
                          <td className="text-right py-2 px-2 tabular-nums">{row.profit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v: number | undefined) => [v != null ? v : "—", ""]} />
                      <Legend />
                      <Bar dataKey="revenue" fill="hsl(var(--finstep-orange))" name="Revenue" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="marketingSpend" fill="#3b82f6" name="Marketing" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="profit" fill="#22c55e" name="Profit" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <p className="font-semibold">{ex?.question}</p>
                <div className="space-y-2">
                  {ex?.choices.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => handleSelect(choice)}
                      disabled={isRevealed}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all",
                        !isRevealed && "hover:border-finstep-orange hover:bg-finstep-orange/5",
                        answers[ex.id] === choice && !isRevealed && "border-finstep-orange bg-finstep-orange/10",
                        isRevealed && choice === ex.correct && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                        isRevealed && choice === userAnswer && choice !== ex.correct && "border-red-500 bg-red-50 dark:bg-red-950/30",
                        isRevealed && choice !== userAnswer && choice !== ex.correct && "opacity-50"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {isRevealed && choice === ex.correct && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                        {isRevealed && choice === userAnswer && choice !== ex.correct && (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                        )}
                        {choice}
                      </span>
                    </button>
                  ))}
                </div>
                {isRevealed && (
                  <div className="rounded-lg border border-finstep-orange/30 bg-finstep-orange/5 p-4">
                    <p className="text-xs font-semibold text-finstep-orange uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" />
                      Reasoning
                    </p>
                    <p className="text-sm">{ex?.reasoning}</p>
                  </div>
                )}
                {isRevealed && (
                  <Button className="w-full" onClick={handleNext}>
                    {currentIndex < DATA_EXERCISES.length - 1 ? (
                      <>
                        Next Exercise <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      "View Results"
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

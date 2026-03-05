"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LBO_LEARNING_MODULES } from "@/lib/lbo-lab/modules";
import { useLBOStore } from "@/store/useLBOStore";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_QUIZ_ITEMS = LBO_LEARNING_MODULES.flatMap((m) =>
  m.quiz.map((q) => ({ ...q, moduleId: m.id, moduleTitle: m.title }))
);

function isCorrect(userAnswer: string, correctAnswer: string): boolean {
  return userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
}

export default function LBOPracticePage() {
  const recordVisit = useLBOStore((s) => s.recordVisit);
  const completePractice = useLBOStore((s) => s.completePractice);
  useEffect(() => {
    recordVisit("model");
  }, [recordVisit]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);

  const q = ALL_QUIZ_ITEMS[currentIndex];
  const userAnswer = q ? answers[currentIndex] ?? "" : "";
  const isRevealed = q ? !!revealed[currentIndex] : false;
  const correct = q && isRevealed && isCorrect(userAnswer, q.answer);

  const stats = useMemo(() => {
    const answered = Object.keys(answers).length;
    const correctCount = ALL_QUIZ_ITEMS.filter(
      (_, i) => answers[i] !== undefined && isCorrect(answers[i] ?? "", ALL_QUIZ_ITEMS[i]!.answer)
    ).length;
    return {
      answered,
      correct: correctCount,
      total: ALL_QUIZ_ITEMS.length,
      accuracy: answered > 0 ? Math.round((correctCount / answered) * 100) : 0,
    };
  }, [answers]);

  const handleSubmit = useCallback(() => {
    if (!q || !userAnswer) return;
    setRevealed((prev) => ({ ...prev, [currentIndex]: true }));
  }, [q, userAnswer, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < ALL_QUIZ_ITEMS.length - 1) {
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
  }, []);

  useEffect(() => {
    if (finished && stats.answered > 0) {
      completePractice("model", stats.accuracy);
    }
  }, [finished, stats.answered, stats.accuracy, completePractice]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-emerald-500" />
          LBO Practice
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Test your LBO knowledge: structure, MOIC, IRR, sources & uses
        </p>
      </div>

      <Progress value={(stats.answered / stats.total) * 100} className="h-2" />

      <AnimatePresence mode="wait">
        {finished ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-xl font-varela font-bold mb-2">Session Complete</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {stats.correct}/{stats.total} correct ({stats.accuracy}%)
            </p>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key={q?.moduleId + currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardContent className="pt-6 pb-6">
                <p className="text-xs text-muted-foreground mb-2">
                  Question {currentIndex + 1} of {ALL_QUIZ_ITEMS.length} • {q?.moduleTitle}
                </p>
                <p className="font-semibold mb-6">{q?.question}</p>
                <Input
                  value={userAnswer}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [currentIndex]: e.target.value }))
                  }
                  placeholder={q?.hint}
                  disabled={isRevealed}
                  className={cn(
                    "max-w-md",
                    isRevealed && correct && "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20",
                    isRevealed && !correct && "border-red-400 bg-red-50 dark:bg-red-950/20"
                  )}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isRevealed) handleSubmit();
                  }}
                />
                {!isRevealed ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim()}
                    className="mt-4"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Check Answer
                  </Button>
                ) : (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      {correct ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className={cn("text-sm font-medium", correct ? "text-emerald-600" : "text-red-600")}>
                        {correct ? "Correct!" : `Answer: ${q?.answer}`}
                      </span>
                    </div>
                    <Button onClick={handleNext}>
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

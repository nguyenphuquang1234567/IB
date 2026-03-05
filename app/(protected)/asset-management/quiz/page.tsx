"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Trophy,
  RotateCcw,
  ChevronRight,
  Shuffle,
  PieChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { assetManagementQuestions } from "@/lib/questions/asset-management";
import { Question } from "@/types/question";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRankColor(accuracy: number) {
  if (accuracy >= 85) return "text-emerald-600 dark:text-emerald-400";
  if (accuracy >= 75) return "text-blue-600 dark:text-blue-400";
  if (accuracy >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

function getRankLabel(accuracy: number) {
  if (accuracy >= 85) return "Portfolio Manager Ready";
  if (accuracy >= 75) return "Analyst Ready";
  if (accuracy >= 60) return "On Track";
  return "Keep Practicing";
}

export default function AssetManagementQuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(assetManagementQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  const userAnswer = question ? answers[question.id] : undefined;
  const isRevealed = question ? !!revealed[question.id] : false;

  const stats = useMemo(() => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correct++;
      }
    });
    return {
      correct,
      answered: Object.keys(answers).length,
      total: questions.length,
      accuracy: Object.keys(answers).length > 0 ? Math.round((correct / Object.keys(answers).length) * 100) : 0,
    };
  }, [answers, questions]);

  const handleSelect = useCallback(
    (choice: string) => {
      if (isRevealed || !question) return;
      setAnswers((prev) => ({ ...prev, [question.id]: choice }));
      setRevealed((prev) => ({ ...prev, [question.id]: true }));
    },
    [isRevealed, question]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  }, [currentIndex, questions.length]);

  const handleReset = useCallback(() => {
    setQuestions(shuffleArray(assetManagementQuestions));
    setCurrentIndex(0);
    setAnswers({});
    setRevealed({});
    setFinished(false);
  }, []);

  const handleBack = useCallback(() => {
    router.push("/asset-management");
  }, [router]);

  // === FINISHED SCREEN ===
  if (finished) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="shadow-sm border-border/40">
            <CardContent className="pt-8 pb-8 text-center space-y-6">
              <Trophy className={cn("w-16 h-16 sm:w-20 sm:h-20 mx-auto", getRankColor(stats.accuracy))} />
              <div>
                <p className={cn("text-xl sm:text-2xl font-bold", getRankColor(stats.accuracy))}>
                  {getRankLabel(stats.accuracy)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stats.correct} / {stats.total} correct — {stats.accuracy}%
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to AM
                </Button>
                <Button onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <Shuffle className="w-4 h-4 mr-2" />
                  Shuffle & Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // === QUIZ ===
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Asset Management
        </Button>
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-violet-500" />
          <h1 className="text-lg font-varela font-bold text-finstep-brown dark:text-foreground">
            AM Practice
          </h1>
        </div>
        <Badge variant="secondary" className="tabular-nums">
          {stats.correct}/{stats.answered} • {stats.accuracy}%
        </Badge>
      </div>

      <Progress value={(stats.answered / stats.total) * 100} className="h-2" />

      <AnimatePresence mode="wait">
        {question && (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-sm border-border/40">
              <CardContent className="pt-6 pb-6">
                <p className="text-xs text-muted-foreground mb-2">
                  Question {currentIndex + 1} of {questions.length}
                  {question.section && (
                    <Badge variant="outline" className="ml-2 text-[10px]">
                      {question.section}
                    </Badge>
                  )}
                </p>
                <p className="font-semibold text-finstep-brown dark:text-foreground mb-6">{question.question}</p>
                <div className="space-y-2">
                  {question.choices?.map((choice) => {
                    const isThisCorrect = choice.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
                    const isThisSelected = userAnswer === choice;
                    return (
                      <button
                        key={choice}
                        onClick={() => handleSelect(choice)}
                        disabled={isRevealed}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all",
                          !isRevealed && "hover:border-finstep-orange hover:bg-finstep-orange/5",
                          isThisSelected && !isRevealed && "border-finstep-orange bg-finstep-orange/10",
                          isRevealed && isThisCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                          isRevealed && isThisSelected && !isThisCorrect && "border-red-500 bg-red-50 dark:bg-red-950/30",
                          isRevealed && !isThisSelected && !isThisCorrect && "opacity-50"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {isRevealed && isThisCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                          {isRevealed && isThisSelected && !isThisCorrect && (
                            <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                          )}
                          {choice}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {isRevealed && question.explanation && (
                  <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                    {question.explanation}
                  </div>
                )}
                {isRevealed && (
                  <Button className="mt-6 w-full bg-finstep-orange hover:bg-finstep-orange/90" onClick={handleNext}>
                    {currentIndex < questions.length - 1 ? (
                      <>
                        Next <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      "Finish"
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

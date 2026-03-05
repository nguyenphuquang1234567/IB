"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { PE_FUNDAMENTALS } from "@/lib/lbo-lab/concepts";
import { useLBOStore } from "@/store/useLBOStore";
import { LBOConceptDiagram } from "@/components/lbo-lab/concept-diagram";
import { cn } from "@/lib/utils";

export default function PEFundamentalsPage() {
  const recordVisit = useLBOStore((s) => s.recordVisit);
  const markLessonViewed = useLBOStore((s) => s.markLessonViewed);
  useEffect(() => {
    recordVisit("fundamentals");
  }, [recordVisit]);

  const [index, setIndex] = useState(0);
  const concept = PE_FUNDAMENTALS[index]!;

  const handleTopicChange = (i: number) => {
    setIndex(i);
    markLessonViewed("fundamentals", PE_FUNDAMENTALS[i]!.id);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-varela font-bold tracking-tight flex items-center gap-2 text-finstep-brown dark:text-foreground">
          <BookOpen className="w-6 h-6 text-emerald-500" />
          Private Equity Fundamentals
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1">
          Key ideas behind private equity investing: LBOs, lifecycle, capital structure, exit strategies, and value creation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-3 space-y-3">
          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-finstep-brown/60 dark:text-muted-foreground">
                Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-3">
              <div className="space-y-1">
                {PE_FUNDAMENTALS.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => handleTopicChange(i)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm font-nunito transition-all",
                      i === index
                        ? "bg-emerald-500 text-white"
                        : "text-finstep-brown/80 dark:text-muted-foreground hover:bg-finstep-beige/50 dark:hover:bg-muted/30"
                    )}
                  >
                    <span className="truncate font-medium">{c.title}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-9">
          <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
                  Topic {index + 1} of {PE_FUNDAMENTALS.length}
                </Badge>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTopicChange(Math.max(0, index - 1))}
                    disabled={index === 0}
                    className="h-8 px-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleTopicChange(Math.min(PE_FUNDAMENTALS.length - 1, index + 1))
                    }
                    disabled={index === PE_FUNDAMENTALS.length - 1}
                    className="h-8 px-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h2 className="text-lg font-varela font-bold text-finstep-brown dark:text-foreground mt-2">
                {concept.title}
              </h2>
            </CardHeader>
            <CardContent className="pt-5 space-y-5">
              <p className="text-sm text-finstep-brown/80 dark:text-muted-foreground leading-relaxed font-nunito">
                {concept.explanation}
              </p>

              {concept.diagramType && (
                <LBOConceptDiagram concept={concept} />
              )}

              <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  Real-World Example
                </h3>
                <p className="text-sm text-finstep-brown/80 dark:text-muted-foreground">
                  {concept.realWorldExample}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold flex items-center gap-1.5 text-finstep-brown dark:text-foreground">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Common Mistakes
                </h3>
                <ul className="space-y-2">
                  {concept.mistakes.map((m, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-finstep-brown/80 dark:text-muted-foreground"
                    >
                      <span className="text-red-400 shrink-0">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


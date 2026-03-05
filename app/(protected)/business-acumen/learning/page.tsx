"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ACUMEN_CONCEPTS } from "@/lib/business-acumen/concepts";
import { BA_LEARNING_MODULES } from "@/lib/business-acumen/modules";
import { ChevronRight, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";
import { useBusinessAcumenStore } from "@/store/useBusinessAcumenStore";
import { cn } from "@/lib/utils";

export default function AcumenLearningPage() {
  const recordVisit = useBusinessAcumenStore((s) => s.recordVisit);
  const markLessonViewed = useBusinessAcumenStore((s) => s.markLessonViewed);
  useEffect(() => {
    recordVisit("learning");
  }, [recordVisit]);

  const [expandedId, setExpandedId] = useState<string | null>("revenue-drivers");
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const conceptsToShow = activeModuleId
    ? BA_LEARNING_MODULES.find((m) => m.id === activeModuleId)?.conceptIds ?? ACUMEN_CONCEPTS.map((c) => c.id)
    : ACUMEN_CONCEPTS.map((c) => c.id);

  const handleExpand = (conceptId: string) => {
    setExpandedId(expandedId === conceptId ? null : conceptId);
    if (conceptId) markLessonViewed("learning", conceptId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-500" />
          Business Acumen Concepts
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          15 concepts chia 4 module — Core concepts for consulting and business strategy
        </p>
      </div>

      {/* Module tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveModuleId(null)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
            !activeModuleId
              ? "bg-amber-500 text-white"
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
          )}
        >
          Tất cả
        </button>
        {BA_LEARNING_MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveModuleId(m.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              activeModuleId === m.id
                ? "bg-amber-500 text-white"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            {m.title} ({m.conceptIds.length})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {ACUMEN_CONCEPTS.filter((c) => conceptsToShow.includes(c.id)).map((concept) => (
          <motion.div
            key={concept.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card
              className={cn(
                "shadow-sm border-border/40 overflow-hidden transition-all",
                expandedId === concept.id && "ring-2 ring-amber-500/30"
              )}
            >
              <button
                onClick={() => handleExpand(concept.id)}
                className="w-full text-left"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-varela font-bold text-finstep-brown dark:text-foreground flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      {concept.title}
                    </h3>
                    <ChevronRight
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform",
                        expandedId === concept.id && "rotate-90"
                      )}
                    />
                  </div>
                </CardHeader>
              </button>
              <AnimatePresence>
                {expandedId === concept.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardContent className="pt-0 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {concept.explanation}
                      </p>
                      {concept.diagram && (
                        <div className="rounded-lg bg-muted/50 p-3 font-mono text-sm">
                          {concept.diagram}
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          Example
                        </p>
                        <p className="text-sm">{concept.example}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Common Mistakes
                        </p>
                        <ul className="space-y-1">
                          {concept.mistakes.map((m, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex gap-2">
                              <span className="text-amber-500">•</span>
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

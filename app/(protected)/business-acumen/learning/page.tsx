"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ACUMEN_CONCEPTS } from "@/lib/business-acumen/concepts";
import { ChevronRight, AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AcumenLearningPage() {
  const [expandedId, setExpandedId] = useState<string | null>("revenue-drivers");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
          Business Acumen Concepts
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Core concepts for consulting and business strategy
        </p>
      </div>

      <div className="space-y-4">
        {ACUMEN_CONCEPTS.map((concept) => (
          <motion.div
            key={concept.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card
              className={cn(
                "shadow-sm border-border/40 overflow-hidden transition-all",
                expandedId === concept.id && "ring-2 ring-finstep-orange/30"
              )}
            >
              <button
                onClick={() => setExpandedId(expandedId === concept.id ? null : concept.id)}
                className="w-full text-left"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-varela font-bold text-finstep-brown dark:text-foreground flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-finstep-orange" />
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

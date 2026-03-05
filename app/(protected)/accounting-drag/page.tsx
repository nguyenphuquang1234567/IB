"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  GripVertical,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  RotateCcw,
  Trophy,
  FileText,
  DollarSign,
  BarChart3,
  Shuffle,
  Lightbulb,
  Undo2,
  Zap,
  Timer,
  Hand,
  MousePointer,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DragQuestion, type Difficulty } from "@/types/question";
import { dragQuestions } from "@/lib/questions/drag-questions";

const DROP_ZONES = [
  "Income Statement",
  "Balance Sheet",
  "CFO",
  "CFI",
  "CFF",
] as const;

type DropZoneType = (typeof DROP_ZONES)[number];

const ZONE_SHORTCUTS: Record<DropZoneType, number> = {
  "Income Statement": 1,
  "Balance Sheet": 2,
  CFO: 3,
  CFI: 4,
  CFF: 5,
};

const zoneIcons: Record<string, typeof FileText> = {
  "Income Statement": FileText,
  "Balance Sheet": BarChart3,
  "Cash Flow Statement": DollarSign,
  CFO: DollarSign,
  CFI: DollarSign,
  CFF: DollarSign,
};

const zoneLabels: Record<string, string> = {
  "Income Statement": "Income Stmt",
  "Balance Sheet": "Balance Sheet",
  CFO: "CFO (Operating)",
  CFI: "CFI (Investing)",
  CFF: "CFF (Financing)",
};

const zoneColors: Record<string, { border: string; bg: string; active: string; dot: string }> = {
  "Income Statement": {
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    active: "border-blue-500/60 bg-blue-500/10",
    dot: "bg-blue-500",
  },
  "Balance Sheet": {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    active: "border-amber-500/60 bg-amber-500/10",
    dot: "bg-amber-500",
  },
  "Cash Flow Statement": {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    active: "border-emerald-500/60 bg-emerald-500/10",
    dot: "bg-emerald-500",
  },
  CFO: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    active: "border-emerald-500/60 bg-emerald-500/10",
    dot: "bg-emerald-500",
  },
  CFI: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
    active: "border-cyan-500/60 bg-cyan-500/10",
    dot: "bg-cyan-500",
  },
  CFF: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    active: "border-violet-500/60 bg-violet-500/10",
    dot: "bg-violet-500",
  },
};

interface PlacedItem {
  id: string;
  lineItem: string;
  correct: boolean;
  explanation: string;
  correctAnswer: string;
  droppedZone: string;
}

const DIFFICULTY_OPTIONS: { value: Difficulty | "All"; label: string }[] = [
  { value: "All", label: "All Levels" },
  { value: "Beginner", label: "Beginner" },
  { value: "Advanced", label: "Advanced" },
  { value: "Elite", label: "Elite" },
];

const BATCH_SIZE = 20;
const STREAK_THRESHOLD = 3;
const TIMER_SECONDS = 120;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function filterByDifficulty(questions: DragQuestion[], diff: Difficulty | "All"): DragQuestion[] {
  if (diff === "All") return questions;
  return questions.filter((q) => q.difficulty === diff);
}

function DraggableItem({
  question,
  onShowHint,
  studyMode,
  tapMode,
  onTap,
}: {
  question: DragQuestion;
  onShowHint?: (q: DragQuestion) => void;
  studyMode: boolean;
  tapMode: boolean;
  onTap?: (q: DragQuestion) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: question.id,
    data: question,
  });

  const handleClick = () => {
    if (tapMode && onTap) {
      onTap(question);
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...(tapMode ? {} : { ...listeners, ...attributes })}
      onClick={tapMode ? handleClick : undefined}
      className={cn(
        "flex items-center justify-between gap-2 px-3 py-2.5 sm:py-2.5 rounded-lg border border-border/50 bg-card transition-all text-sm shadow-sm hover:shadow-md hover:border-primary/30 min-h-[44px] sm:min-h-0",
        tapMode ? "cursor-pointer active:bg-primary/5" : "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-30 scale-95"
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        {!tapMode && <GripVertical className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
        <span className="font-medium text-xs truncate">{question.lineItem}</span>
        {question.isTricky && (
          <span title="Tricky: appears in multiple places">
            <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
          </span>
        )}
      </div>
      {studyMode && question.hint && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onShowHint?.(question);
          }}
          className="shrink-0 p-1 rounded hover:bg-primary/10 text-primary"
          title="Show hint"
        >
          <Lightbulb className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

function DropColumn({
  zone,
  placedItems,
  isActive,
  score,
  showExplanation,
}: {
  zone: string;
  placedItems: PlacedItem[];
  isActive: boolean;
  score: { correct: number; wrong: number };
  showExplanation: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: zone });
  const Icon = zoneIcons[zone] || FileText;
  const colors = zoneColors[zone] || zoneColors["Cash Flow Statement"];
  const label = zoneLabels[zone] || zone;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-lg sm:rounded-xl border-2 border-dashed p-2 sm:p-3 min-h-[100px] sm:min-h-[180px] lg:min-h-[260px] transition-all flex flex-col",
        isOver ? colors.active : `${colors.border} ${colors.bg}`,
        isActive && !isOver && "border-dashed"
      )}
    >
      <div className="flex items-center justify-between mb-1.5 sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <div className={cn("w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0", colors.dot)} />
          <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
          <span className="text-[10px] sm:text-xs font-bold truncate">{label}</span>
        </div>
        <div className="flex gap-0.5 sm:gap-1 shrink-0">
          {score.correct > 0 && (
            <Badge className="bg-emerald-100 text-emerald-700 text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0 dark:bg-emerald-900/30 dark:text-emerald-400">
              +{score.correct}
            </Badge>
          )}
          {score.wrong > 0 && (
            <Badge className="bg-red-100 text-red-700 text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0 dark:bg-red-900/30 dark:text-red-400">
              -{score.wrong}
            </Badge>
          )}
        </div>
      </div>
      <div className="space-y-1 sm:space-y-1.5 flex-1 min-h-0 overflow-y-auto">
        <AnimatePresence>
          {placedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs border flex items-start gap-1.5 sm:gap-2",
                item.correct
                  ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800"
                  : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
              )}
            >
              {item.correct ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{item.lineItem}</p>
                {!item.correct && (
                  <p className="text-[10px] text-red-600 dark:text-red-400 mt-0.5">
                    Correct: {item.correctAnswer}
                  </p>
                )}
                {showExplanation && (
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{item.explanation}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {placedItems.length === 0 && (
          <div className="flex-1 flex items-center justify-center min-h-[60px] sm:min-h-[80px]">
            <p className="text-[9px] sm:text-[10px] text-muted-foreground text-center px-1">Drop or {ZONE_SHORTCUTS[zone as DropZoneType]}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AccountingDragPage() {
  const router = useRouter();

  const [allQuestions] = useState<DragQuestion[]>(dragQuestions);
  const [started, setStarted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedForTap, setSelectedForTap] = useState<DragQuestion | null>(null);
  const [hintShown, setHintShown] = useState<DragQuestion | null>(null);

  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [studyMode, setStudyMode] = useState(false);
  const [tapMode, setTapMode] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [progressiveDifficulty, setProgressiveDifficulty] = useState(false);

  const [placedItems, setPlacedItems] = useState<Record<string, PlacedItem[]>>(
    DROP_ZONES.reduce((acc, z) => ({ ...acc, [z]: [] }), {} as Record<string, PlacedItem[]>
  ));
  const [lastWrongItem, setLastWrongItem] = useState<PlacedItem | null>(null);
  const [remainingQuestions, setRemainingQuestions] = useState<DragQuestion[]>([]);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(TIMER_SECONDS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 8 } })
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setTapMode(true);
    }
  }, []);

  const filteredPool = filterByDifficulty(allQuestions, difficulty);
  const currentDifficulty = progressiveDifficulty && streak >= STREAK_THRESHOLD ? "Advanced" : difficulty;

  const initRound = useCallback(
    (shuffle = true) => {
      const pool = filterByDifficulty(allQuestions, currentDifficulty === "All" ? difficulty : currentDifficulty);
      const shuffled = shuffle ? shuffleArray(pool) : [...pool];
      const batch = shuffled.slice(0, BATCH_SIZE);
      setRemainingQuestions(batch);
      setPlacedItems(DROP_ZONES.reduce((acc, z) => ({ ...acc, [z]: [] }), {} as Record<string, PlacedItem[]>));
      setTotalCorrect(0);
      setTotalWrong(0);
      setStreak(0);
      setLastWrongItem(null);
      setIsComplete(false);
      setStarted(true);
      setSelectedForTap(null);
      setHintShown(null);
      setTimerSeconds(TIMER_SECONDS);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    },
    [allQuestions, difficulty, currentDifficulty]
  );

  useEffect(() => {
    if (started && remainingQuestions.length === 0 && totalCorrect + totalWrong > 0) {
      setIsComplete(true);
    }
  }, [started, remainingQuestions.length, totalCorrect, totalWrong]);

  useEffect(() => {
    if (started && timerEnabled && !isComplete && remainingQuestions.length > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((s) => {
          if (s <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsComplete(true);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [started, timerEnabled, isComplete, remainingQuestions.length]);

  const handleStart = useCallback(() => {
    initRound(true);
  }, [initRound]);

  const handleShuffleRestart = useCallback(() => {
    initRound(true);
  }, [initRound]);

  const placeItem = useCallback(
    (question: DragQuestion, zone: string) => {
      const isCorrect = question.correctAnswer === zone;

      const newItem: PlacedItem = {
        id: question.id,
        lineItem: question.lineItem,
        correct: isCorrect,
        explanation: question.explanation,
        correctAnswer: question.correctAnswer,
        droppedZone: zone,
      };

      setPlacedItems((prev) => ({
        ...prev,
        [zone]: [...prev[zone], newItem],
      }));

      if (isCorrect) {
        setTotalCorrect((c) => c + 1);
        setStreak((s) => s + 1);
      } else {
        setTotalWrong((w) => w + 1);
        setStreak(0);
        setLastWrongItem(newItem);
      }

      setRemainingQuestions((prev) => {
        const next = prev.filter((q) => q.id !== question.id);
        if (next.length === 0) setIsComplete(true);
        return next;
      });
      setSelectedForTap(null);
      setHintShown(null);
    },
    []
  );

  const handleUndo = useCallback(() => {
    if (!lastWrongItem || !studyMode) return;

    const zone = lastWrongItem.droppedZone;
    setPlacedItems((prev) => ({
      ...prev,
      [zone]: prev[zone].filter((i) => i.id !== lastWrongItem.id),
    }));
    setTotalWrong((w) => Math.max(0, w - 1));

    const q = allQuestions.find((x) => x.id === lastWrongItem.id);
    if (q) {
      setRemainingQuestions((prev) => [...prev, q]);
    }

    setLastWrongItem(null);
  }, [lastWrongItem, studyMode, allQuestions]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;
      if (!over) return;

      const questionId = active.id as string;
      const zone = over.id as string;

      if (!DROP_ZONES.includes(zone as DropZoneType)) return;

      const question = remainingQuestions.find((q) => q.id === questionId);
      if (!question) return;

      placeItem(question, zone);
    },
    [remainingQuestions, placeItem]
  );

  const handleTapZone = useCallback(
    (zone: DropZoneType) => {
      if (!selectedForTap) return;
      placeItem(selectedForTap, zone);
    },
    [selectedForTap, placeItem]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!started || isComplete) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 5 && (activeId || selectedForTap)) {
        const zone = DROP_ZONES[num - 1];
        const q = activeId
          ? remainingQuestions.find((r) => r.id === activeId)
          : selectedForTap;
        if (q) {
          e.preventDefault();
          placeItem(q, zone);
          setActiveId(null);
          setSelectedForTap(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started, isComplete, activeId, selectedForTap, remainingQuestions, placeItem]);

  const activeItem = remainingQuestions.find((q) => q.id === activeId);
  const totalQuestions = totalCorrect + totalWrong + remainingQuestions.length;
  const progressPercent = totalQuestions > 0 ? (totalCorrect + totalWrong) / totalQuestions : 0;

  const zoneScores = (zone: string) => ({
    correct: placedItems[zone]?.filter((i) => i.correct).length || 0,
    wrong: placedItems[zone]?.filter((i) => !i.correct).length || 0,
  });

  const canUndo = studyMode && lastWrongItem;

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16 sm:pb-0">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-sm border-border/40">
            <CardContent className="pt-4 sm:pt-6 pb-6 px-4 sm:px-6 space-y-4 sm:space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-finstep-orange flex items-center justify-center mx-auto shadow-lg shadow-finstep-orange/20">
                  <GripVertical className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground mt-4">
                  Accounting Drag & Drop
                </h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2">
                  Drag each line item into the correct financial statement. {filteredPool.length} items available — {BATCH_SIZE} per round.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-bold">Difficulty</Label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {DIFFICULTY_OPTIONS.map((opt) => (
                      <Button
                        key={opt.value}
                        variant={difficulty === opt.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficulty(opt.value as Difficulty | "All")}
                        className={difficulty === opt.value ? "bg-finstep-orange" : ""}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                    <Label className="text-xs sm:text-sm truncate">Progressive (3 correct)</Label>
                  </div>
                  <Switch checked={progressiveDifficulty} onCheckedChange={setProgressiveDifficulty} className="shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-finstep-orange shrink-0" />
                    <Label className="text-xs sm:text-sm truncate">Study mode</Label>
                  </div>
                  <Switch checked={studyMode} onCheckedChange={setStudyMode} className="shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    <Label className="text-xs sm:text-sm truncate">Timer ({TIMER_SECONDS}s)</Label>
                  </div>
                  <Switch checked={timerEnabled} onCheckedChange={setTimerEnabled} className="shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Hand className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    <Label className="text-xs sm:text-sm truncate">Tap mode (mobile)</Label>
                  </div>
                  <Switch checked={tapMode} onCheckedChange={setTapMode} className="shrink-0" />
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button onClick={handleStart} className="bg-finstep-orange text-white hover:brightness-110">
                  Start Challenge
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (isComplete) {
    const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const netScore = totalCorrect - totalWrong;

    return (
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6 pb-[max(5rem,env(safe-area-inset-bottom))] sm:pb-6 overflow-y-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="shadow-sm border-border/40">
            <CardHeader className="text-center">
              <Trophy className={cn("w-16 h-16 mx-auto mb-2", accuracy >= 75 ? "text-emerald-500" : "text-amber-500")} />
              <CardTitle className="text-2xl font-varela">Round Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{totalCorrect}</p>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-500">{totalWrong}</p>
                  <p className="text-xs text-muted-foreground">Wrong</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{netScore}</p>
                  <p className="text-xs text-muted-foreground">Net Score</p>
                </div>
                <div>
                  <p className={cn("text-2xl font-bold", accuracy >= 75 ? "text-emerald-600" : "text-amber-600")}>{accuracy}%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center flex-wrap">
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button onClick={handleShuffleRestart} className="bg-finstep-orange text-white hover:brightness-110">
                  <Shuffle className="w-4 h-4 mr-2" />
                  New Round
                </Button>
                <Button variant="outline" onClick={() => initRound(true)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-3">
          <h3 className="font-semibold">Review</h3>
          {DROP_ZONES.map((zone) =>
            (placedItems[zone] || []).map((item) => (
              <Card
                key={`${zone}-${item.id}`}
                className={cn(
                  "shadow-sm border-border/40",
                  item.correct ? "border-l-2 border-l-emerald-500" : "border-l-2 border-l-red-500"
                )}
              >
                <CardContent className="pt-3 pb-3 space-y-1">
                  <div className="flex items-start gap-2">
                    {item.correct ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{item.lineItem}</p>
                      {!item.correct && (
                        <p className="text-xs mt-0.5">
                          <span className="text-muted-foreground">Dropped in: </span>
                          <span className="text-red-500">{item.droppedZone}</span>
                          <span className="text-muted-foreground"> → Correct: </span>
                          <span className="text-emerald-600">{item.correctAnswer}</span>
                        </p>
                      )}
                      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{item.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-2 sm:space-y-4 px-2 sm:px-4 pb-[max(5rem,env(safe-area-inset-bottom))] xl:pb-4 h-[100dvh] xl:h-auto flex flex-col overflow-hidden xl:overflow-visible">
      <div className="flex-none flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-varela font-bold text-finstep-brown dark:text-foreground truncate">Classify Line Items</h2>
          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
            {tapMode ? "Tap item → tap zone" : "Drag to zone or 1-5"}
            {studyMode && " • Study mode"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Progress value={progressPercent * 100} className="w-16 sm:w-24 h-1.5 sm:h-2 [&>div]:bg-finstep-orange shrink-0" />
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] px-1.5 py-0">
            +{totalCorrect}
          </Badge>
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-[10px] px-1.5 py-0">
            -{totalWrong}
          </Badge>
          {streak >= 2 && (
            <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] px-1.5 py-0">
              <Zap className="w-2.5 h-2.5 mr-0.5" />
              {streak}
            </Badge>
          )}
          {timerEnabled && (
            <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", timerSeconds <= 30 && "text-red-500 border-red-500")}>
              <Timer className="w-2.5 h-2.5 mr-0.5" />
              {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, "0")}
            </Badge>
          )}
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{remainingQuestions.length} left</Badge>
          {canUndo && (
            <Button variant="outline" size="sm" onClick={handleUndo} className="h-7 sm:h-8 px-2 text-[10px] sm:text-xs">
              <Undo2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
              Undo
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8" onClick={handleShuffleRestart} title="Restart">
            <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>

      {hintShown && (
        <div className="flex-none p-2 sm:p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 flex items-start gap-2">
          <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 line-clamp-2 sm:line-clamp-none">{hintShown.hint || hintShown.explanation}</p>
          <Button variant="ghost" size="sm" onClick={() => setHintShown(null)} className="shrink-0 h-7 text-[10px] sm:text-xs">
            Dismiss
          </Button>
        </div>
      )}

      {selectedForTap && (
        <div className="flex-none flex items-center gap-2 p-2 sm:p-3 rounded-lg bg-primary/5 border border-primary/20 overflow-x-auto scrollbar-none">
          <span className="text-xs sm:text-sm font-medium shrink-0 truncate max-w-[100px] sm:max-w-none">Selected: {selectedForTap.lineItem}</span>
          <div className="flex gap-1.5 shrink-0">
            {DROP_ZONES.map((zone) => (
              <Button
                key={zone}
                variant="outline"
                size="sm"
                onClick={() => handleTapZone(zone)}
                className="h-7 sm:h-8 text-[10px] sm:text-xs px-2 shrink-0"
              >
                <span className="sm:hidden">{ZONE_SHORTCUTS[zone]}</span>
                <span className="hidden sm:inline">{ZONE_SHORTCUTS[zone]} {zoneLabels[zone]}</span>
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSelectedForTap(null)} className="shrink-0 h-7 text-[10px] sm:text-xs">
            Cancel
          </Button>
        </div>
      )}

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-6 gap-2 sm:gap-4 overflow-hidden">
          <Card className="shadow-sm border-border/40 lg:col-span-1 flex flex-col min-h-0 max-h-[38vh] sm:max-h-none sm:min-h-[280px]">
            <CardHeader className="pb-1 sm:pb-2 pt-2 sm:pt-3 px-3 sm:px-6">
              <CardTitle className="text-[10px] sm:text-xs flex items-center gap-2">
                {tapMode ? <Hand className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <MousePointer className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                Items ({remainingQuestions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 sm:space-y-1.5 flex-1 min-h-0 overflow-y-auto pb-2 sm:pb-3 px-3 sm:px-6">
              <AnimatePresence>
                {remainingQuestions.map((q) => (
                  <motion.div key={q.id} layout exit={{ opacity: 0, x: -20, height: 0 }}>
                    <DraggableItem
                      question={q}
                      onShowHint={(q) => setHintShown(q)}
                      studyMode={studyMode}
                      tapMode={tapMode}
                      onTap={setSelectedForTap}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              {remainingQuestions.length === 0 && (
                <p className="text-[10px] sm:text-xs text-muted-foreground text-center py-4 sm:py-6">All placed!</p>
              )}
            </CardContent>
          </Card>

          <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 overflow-y-auto lg:overflow-visible">
            {DROP_ZONES.map((zone) => (
              <DropColumn
                key={zone}
                zone={zone}
                placedItems={placedItems[zone] || []}
                isActive={activeId !== null || selectedForTap !== null}
                score={zoneScores(zone)}
                showExplanation={studyMode}
              />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeItem && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-finstep-orange/50 bg-card shadow-xl text-xs">
              <GripVertical className="w-3.5 h-3.5 text-finstep-orange" />
              <span className="font-medium">{activeItem.lineItem}</span>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

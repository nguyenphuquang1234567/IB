"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CF_LAB_IDS } from "@/lib/corporate-finance/learning-path";

export type MasteryLevel = "not-started" | "learning" | "practicing" | "mastered";

export interface LabProgress {
  labId: string;
  lessonsViewed: string[];
  practiceCompleted: boolean;
  practiceBestScore: number;
  practiceAttempts: number;
  lastVisitedAt: string | null;
  masteryLevel: MasteryLevel;
}

export interface CorporateFinanceState {
  labProgress: Record<string, LabProgress>;
  streakDays: number;
  lastActiveDate: string | null;
  totalLessonsViewed: number;
  totalPracticeAttempts: number;

  markLessonViewed: (labId: string, lessonId: string) => void;
  completePractice: (labId: string, score: number) => void;
  setMasteryLevel: (labId: string, level: MasteryLevel) => void;
  recordVisit: (labId: string) => void;
  getLabProgress: (labId: string) => LabProgress;
  getOverallProgress: () => number;
  getNextStep: () => string | null;
  getStreakDays: () => number;
}

const today = () => new Date().toISOString().slice(0, 10);

function getInitialLabProgress(labId: string): LabProgress {
  return {
    labId,
    lessonsViewed: [],
    practiceCompleted: false,
    practiceBestScore: 0,
    practiceAttempts: 0,
    lastVisitedAt: null,
    masteryLevel: "not-started",
  };
}

export const useCorporateFinanceStore = create<CorporateFinanceState>()(
  persist(
    (set, get) => ({
      labProgress: {},
      streakDays: 0,
      lastActiveDate: null,
      totalLessonsViewed: 0,
      totalPracticeAttempts: 0,

      markLessonViewed: (labId, lessonId) => {
        set((state) => {
          const lab = state.labProgress[labId] ?? getInitialLabProgress(labId);
          if (lab.lessonsViewed.includes(lessonId)) return state;
          const lessonsViewed = [...lab.lessonsViewed, lessonId];
          const masteryLevel: MasteryLevel =
            lab.masteryLevel === "not-started" ? "learning" : lab.masteryLevel;
          return {
            labProgress: {
              ...state.labProgress,
              [labId]: {
                ...lab,
                lessonsViewed,
                lastVisitedAt: today(),
                masteryLevel,
              },
            },
            totalLessonsViewed: state.totalLessonsViewed + 1,
          };
        });
        get().recordVisit(labId);
      },

      completePractice: (labId, score) => {
        set((state) => {
          const lab = state.labProgress[labId] ?? getInitialLabProgress(labId);
          const practiceAttempts = lab.practiceAttempts + 1;
          const practiceBestScore = Math.max(lab.practiceBestScore, score);
          const practiceCompleted = true;
          const masteryLevel: MasteryLevel =
            score >= 80 ? "mastered" : score >= 60 ? "practicing" : lab.masteryLevel;
          return {
            labProgress: {
              ...state.labProgress,
              [labId]: {
                ...lab,
                practiceCompleted,
                practiceBestScore,
                practiceAttempts,
                lastVisitedAt: today(),
                masteryLevel,
              },
            },
            totalPracticeAttempts: state.totalPracticeAttempts + 1,
          };
        });
        get().recordVisit(labId);
      },

      setMasteryLevel: (labId, level) => {
        set((state) => {
          const lab = state.labProgress[labId] ?? getInitialLabProgress(labId);
          return {
            labProgress: {
              ...state.labProgress,
              [labId]: { ...lab, masteryLevel: level },
            },
          };
        });
      },

      recordVisit: (labId) => {
        set((state) => {
          const lab = state.labProgress[labId] ?? getInitialLabProgress(labId);
          const lastActive = state.lastActiveDate;
          const todayStr = today();

          let streakDays = state.streakDays;
          if (lastActive) {
            const last = new Date(lastActive);
            const now = new Date(todayStr);
            const diffDays = Math.floor((now.getTime() - last.getTime()) / (24 * 60 * 60 * 1000));
            if (diffDays === 0) {
              streakDays = state.streakDays;
            } else if (diffDays === 1) {
              streakDays = state.streakDays + 1;
            } else {
              streakDays = 1;
            }
          } else {
            streakDays = 1;
          }

          return {
            labProgress: {
              ...state.labProgress,
              [labId]: { ...lab, lastVisitedAt: todayStr },
            },
            lastActiveDate: todayStr,
            streakDays,
          };
        });
      },

      getLabProgress: (labId) => {
        return get().labProgress[labId] ?? getInitialLabProgress(labId);
      },

      getOverallProgress: () => {
        const state = get();
        let total = 0;
        let completed = 0;
        for (const labId of CF_LAB_IDS) {
          const lab = state.labProgress[labId] ?? getInitialLabProgress(labId);
          total += 3;
          if (lab.lessonsViewed.length > 0) completed += 1;
          if (lab.practiceCompleted) completed += 1;
          if (lab.masteryLevel === "mastered") completed += 1;
        }
        return total > 0 ? Math.round((completed / total) * 100) : 0;
      },

      getNextStep: () => {
        const state = get();
        for (const labId of CF_LAB_IDS) {
          const lab = state.labProgress[labId] ?? getInitialLabProgress(labId);
          if (lab.masteryLevel !== "mastered") return labId;
        }
        return null;
      },

      getStreakDays: () => {
        const state = get();
        if (!state.lastActiveDate) return 0;
        const last = new Date(state.lastActiveDate);
        const now = new Date(today());
        const diffDays = Math.floor((now.getTime() - last.getTime()) / (24 * 60 * 60 * 1000));
        if (diffDays === 0) return state.streakDays;
        return 0;
      },
    }),
    { name: "corporate-finance-progress" }
  )
);

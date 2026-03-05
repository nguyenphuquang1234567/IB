export type QuestionType = "mcq" | "numeric" | "drag";

export type Section =
  | "Accounting"
  | "EV vs Equity Value"
  | "Valuation"
  | "M&A"
  | "LBO"
  | "Accretion/Dilution"
  | "Fit & Behavioral"
  | "Portfolio Theory"
  | "Asset Allocation"
  | "Risk Management"
  | "Investment Strategies"
  | "Fixed Income"
  | "Equity Research";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Elite";

export interface IbQuestion {
  category: string;
  question: string;
  answer: string;
}

export interface Question {
  id: string;
  section: Section;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  choices?: string[];
  correctAnswer: string;
  explanation: string;
}

export type DragDropZone =
  | "Income Statement"
  | "Balance Sheet"
  | "Cash Flow Statement"
  | "CFO"
  | "CFI"
  | "CFF";

export interface DragQuestion {
  id: string;
  lineItem: string;
  correctAnswer: DragDropZone;
  explanation: string;
  difficulty: Difficulty;
  hint?: string;
  isTricky?: boolean;
}

export type Rank = "Not Ready" | "Boutique Ready" | "MM Ready" | "EB/BB Ready";

export interface QuizResult {
  id: string;
  section: Section | "Mixed";
  difficulty: Difficulty;
  score: number;
  total: number;
  accuracy: number;
  rank: Rank;
  timestamp: number;
  sectionBreakdown: Record<string, { correct: number; total: number }>;
}

export interface UserProgress {
  totalCompleted: number;
  totalCorrect: number;
  sectionStats: Record<string, { correct: number; total: number }>;
  quizHistory: QuizResult[];
}

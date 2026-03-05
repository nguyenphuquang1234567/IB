"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Calculator,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Lightbulb,
  Eye,
  EyeOff,
  Trophy,
  ArrowRight,
  FileSpreadsheet,
  AlertTriangle,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */

interface LineItem {
  id: string;
  label: string;
  isBold?: boolean;
  isComputed?: boolean;
  isSeparatorBefore?: boolean;
}

type Difficulty = "Beginner" | "Advanced" | "Elite";

interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  taxRate: number;
  hint: string;
  solution: Record<string, number>;
  explanation: string[];
}

type CellStatus = "neutral" | "correct" | "incorrect";

/* ─── Line Item Definitions ──────────────────────────────────── */

const IS_ITEMS: LineItem[] = [
  { id: "revenue", label: "Revenue" },
  { id: "cogs", label: "COGS" },
  { id: "grossProfit", label: "Gross Profit", isBold: true, isComputed: true },
  { id: "sga", label: "SG&A" },
  { id: "da", label: "D&A" },
  { id: "impairment", label: "Impairment / Write-Down" },
  { id: "ebit", label: "EBIT", isBold: true, isComputed: true },
  { id: "interestExpense", label: "Interest Expense" },
  { id: "ebt", label: "EBT", isBold: true, isComputed: true },
  { id: "taxes", label: "Taxes" },
  { id: "netIncome", label: "Net Income", isBold: true, isComputed: true },
];

const BS_ITEMS: LineItem[] = [
  { id: "bsCash", label: "Cash" },
  { id: "bsAR", label: "Accounts Receivable" },
  { id: "bsInventory", label: "Inventory" },
  { id: "bsTotalCA", label: "Total Current Assets", isBold: true, isComputed: true },
  { id: "bsPPEGross", label: "PP&E (Gross)" },
  { id: "bsAccDepr", label: "Accum. Depreciation" },
  { id: "bsNetPPE", label: "Net PP&E", isBold: true, isComputed: true },
  { id: "bsGoodwill", label: "Goodwill" },
  { id: "bsTotalAssets", label: "Total Assets", isBold: true, isComputed: true },
  { id: "bsAP", label: "Accounts Payable", isSeparatorBefore: true },
  { id: "bsAccruedExp", label: "Accrued Expenses" },
  { id: "bsTotalCL", label: "Total Current Liab.", isBold: true, isComputed: true },
  { id: "bsLTDebt", label: "Long-Term Debt" },
  { id: "bsTotalLiab", label: "Total Liabilities", isBold: true, isComputed: true },
  { id: "bsCommonStock", label: "Common Stock / APIC" },
  { id: "bsRetainedEarnings", label: "Retained Earnings" },
  { id: "bsTotalEquity", label: "Total Equity", isBold: true, isComputed: true },
  { id: "bsTotalLE", label: "Total L & E", isBold: true, isComputed: true },
];

const CFS_ITEMS: LineItem[] = [
  { id: "cfsNI", label: "Net Income" },
  { id: "cfsDA", label: "D&A (add-back)" },
  { id: "cfsImpairment", label: "Non-Cash Charges" },
  { id: "cfsDeltaAR", label: "Δ Accounts Receivable" },
  { id: "cfsDeltaInv", label: "Δ Inventory" },
  { id: "cfsDeltaAP", label: "Δ Accounts Payable" },
  { id: "cfsCFO", label: "Cash from Operations", isBold: true, isComputed: true },
  { id: "cfsCapex", label: "Capital Expenditures", isSeparatorBefore: true },
  { id: "cfsCFI", label: "Cash from Investing", isBold: true, isComputed: true },
  { id: "cfsDebtIssue", label: "Debt Issue / (Repayment)", isSeparatorBefore: true },
  { id: "cfsEquityIssue", label: "Equity Issue / (Repurchase)" },
  { id: "cfsDividends", label: "Dividends Paid" },
  { id: "cfsCFF", label: "Cash from Financing", isBold: true, isComputed: true },
  { id: "cfsNetChange", label: "Net Change in Cash", isBold: true, isComputed: true, isSeparatorBefore: true },
];

const ALL_INPUT_IDS = [
  ...IS_ITEMS, ...BS_ITEMS, ...CFS_ITEMS,
].filter((i) => !i.isComputed).map((i) => i.id);

/* ─── Scenarios ──────────────────────────────────────────────── */

const SCENARIOS: Scenario[] = [
  {
    id: "depr-increase",
    title: "Depreciation Increase",
    description:
      "Depreciation increases by $10. Assume a 40% tax rate. Walk me through the three financial statements.",
    difficulty: "Beginner",
    taxRate: 40,
    hint: "Depreciation is a non-cash expense that creates a tax shield. Think about the after-tax impact on Net Income, then trace through to CFS and BS.",
    solution: {
      da: 10,
      taxes: -4,
      bsCash: 4,
      bsAccDepr: 10,
      bsRetainedEarnings: -6,
      cfsNI: -6,
      cfsDA: 10,
    },
    explanation: [
      "IS: D&A ↑$10 → EBIT ↓$10 → EBT ↓$10 → Tax savings $4 (40% × $10) → Net Income ↓$6",
      "CFS: NI ↓$6 + D&A add-back +$10 → CFO ↑$4 → Net Cash ↑$4",
      "BS: Cash ↑$4 | Accum. Depr. ↑$10 → Net PP&E ↓$10 | Retained Earnings ↓$6",
      "Balance Check: Assets Δ = +4 − 10 = −6 | L&E Δ = −6 ✓",
    ],
  },
  {
    id: "buy-ppe-cash",
    title: "Purchase PP&E with Cash",
    description:
      "A company purchases $100 of equipment using cash. Walk me through the three financial statements.",
    difficulty: "Beginner",
    taxRate: 0,
    hint: "Buying equipment is an investing activity. It does NOT affect the Income Statement at the time of purchase.",
    solution: {
      bsCash: -100,
      bsPPEGross: 100,
      cfsCapex: -100,
    },
    explanation: [
      "IS: No impact — purchasing PP&E is a balance sheet transaction, not an expense.",
      "CFS: CapEx −$100 in CFI → Net Cash ↓$100",
      "BS: Cash ↓$100 | PP&E (Gross) ↑$100 → Total Assets unchanged",
      "Balance Check: Assets Δ = −100 + 100 = 0 | L&E Δ = 0 ✓",
    ],
  },
  {
    id: "issue-debt",
    title: "Issue Long-Term Debt",
    description:
      "A company issues $200 of new long-term debt at par. Walk me through the three financial statements.",
    difficulty: "Beginner",
    taxRate: 0,
    hint: "Issuing debt is a financing activity. The company receives cash and records a liability. No P&L impact at issuance.",
    solution: {
      bsCash: 200,
      bsLTDebt: 200,
      cfsDebtIssue: 200,
    },
    explanation: [
      "IS: No impact — issuing debt does not create revenue or expense.",
      "CFS: Debt Issuance +$200 in CFF → Net Cash ↑$200",
      "BS: Cash ↑$200 | Long-Term Debt ↑$200",
      "Balance Check: Assets Δ = +200 | L&E Δ = +200 ✓",
    ],
  },
  {
    id: "pay-dividends",
    title: "Pay Dividends",
    description:
      "A company pays $75 in cash dividends to shareholders. Walk me through the three financial statements.",
    difficulty: "Beginner",
    taxRate: 0,
    hint: "Dividends are a return of capital, not an expense. They reduce Cash and Retained Earnings directly.",
    solution: {
      bsCash: -75,
      bsRetainedEarnings: -75,
      cfsDividends: -75,
    },
    explanation: [
      "IS: No impact — dividends are NOT an expense (they bypass the Income Statement).",
      "CFS: Dividends −$75 in CFF → Net Cash ↓$75",
      "BS: Cash ↓$75 | Retained Earnings ↓$75 → Equity ↓$75",
      "Balance Check: Assets Δ = −75 | L&E Δ = −75 ✓",
    ],
  },
  {
    id: "stock-repurchase",
    title: "Share Repurchase",
    description:
      "A company repurchases $150 of its own stock. Walk me through the three financial statements.",
    difficulty: "Advanced",
    taxRate: 0,
    hint: "Share buybacks reduce cash and shareholder equity. It's a financing activity with no P&L impact. Note: EPS increases because the share count decreases.",
    solution: {
      bsCash: -150,
      bsCommonStock: -150,
      cfsEquityIssue: -150,
    },
    explanation: [
      "IS: No impact — share repurchases do not affect the P&L.",
      "CFS: Equity Repurchase −$150 in CFF → Net Cash ↓$150",
      "BS: Cash ↓$150 | Common Stock/APIC ↓$150 (Treasury Stock) → Equity ↓$150",
      "Balance Check: Assets Δ = −150 | L&E Δ = −150 ✓",
    ],
  },
  {
    id: "credit-sale",
    title: "Credit Sale (AR Increase)",
    description:
      "Revenue increases by $50 from a credit sale with no associated cost of goods. Tax rate is 25%. Walk me through the impact.",
    difficulty: "Advanced",
    taxRate: 25,
    hint: "A credit sale means cash hasn't been collected yet — Accounts Receivable increases. Revenue is recognized but no cash inflow occurs. You still owe taxes though.",
    solution: {
      revenue: 50,
      taxes: 12.5,
      bsCash: -12.5,
      bsAR: 50,
      bsRetainedEarnings: 37.5,
      cfsNI: 37.5,
      cfsDeltaAR: -50,
    },
    explanation: [
      "IS: Revenue ↑$50 → EBT ↑$50 → Taxes ↑$12.50 (25%) → Net Income ↑$37.50",
      "CFS: NI ↑$37.50 | AR increased so subtract $50 → CFO = −$12.50 → Net Cash ↓$12.50",
      "BS: Cash ↓$12.50 (taxes paid, no cash collected) | AR ↑$50 | RE ↑$37.50",
      "Balance Check: Assets Δ = −12.50 + 50 = +37.50 | L&E Δ = +37.50 ✓",
    ],
  },
  {
    id: "cash-sale-inventory",
    title: "Cash Sale with Inventory",
    description:
      "A company makes a $200 cash sale. The inventory sold had a cost of $120. Tax rate is 40%. Walk me through the impact.",
    difficulty: "Advanced",
    taxRate: 40,
    hint: "Revenue and COGS both hit the IS. Cash comes in from the sale and inventory leaves the BS. On the CFS indirect method, a decrease in inventory is a source of cash.",
    solution: {
      revenue: 200,
      cogs: 120,
      taxes: 32,
      bsCash: 168,
      bsInventory: -120,
      bsRetainedEarnings: 48,
      cfsNI: 48,
      cfsDeltaInv: 120,
    },
    explanation: [
      "IS: Revenue ↑$200, COGS ↑$120 → Gross Profit ↑$80 → Taxes ↑$32 (40%) → NI ↑$48",
      "CFS: NI ↑$48 | Inventory ↓$120 (source of cash → +$120) → CFO = +$168",
      "BS: Cash ↑$168 | Inventory ↓$120 | Retained Earnings ↑$48",
      "Balance Check: Assets Δ = +168 − 120 = +48 | L&E Δ = +48 ✓",
    ],
  },
  {
    id: "goodwill-impairment",
    title: "Goodwill Impairment",
    description:
      "A company records an $80 goodwill impairment charge. Tax rate is 30%. Walk me through the three financial statements.",
    difficulty: "Elite",
    taxRate: 30,
    hint: "Goodwill impairment is a non-cash charge. It reduces Net Income and Goodwill on the BS. It's added back on the CFS because no cash left the company. Only the tax savings create a real cash impact.",
    solution: {
      impairment: 80,
      taxes: -24,
      bsCash: 24,
      bsGoodwill: -80,
      bsRetainedEarnings: -56,
      cfsNI: -56,
      cfsImpairment: 80,
    },
    explanation: [
      "IS: Impairment ↑$80 → EBIT ↓$80 → EBT ↓$80 → Tax savings $24 (30%) → NI ↓$56",
      "CFS: NI ↓$56 + Non-cash add-back +$80 → CFO ↑$24 → Net Cash ↑$24",
      "BS: Cash ↑$24 | Goodwill ↓$80 | Retained Earnings ↓$56",
      "Balance Check: Assets Δ = +24 − 80 = −56 | L&E Δ = −56 ✓",
    ],
  },
];

/* ─── Helpers ────────────────────────────────────────────────── */

function computeValues(inputs: Record<string, number>): Record<string, number> {
  const g = (id: string) => inputs[id] || 0;
  const v: Record<string, number> = {};

  v.grossProfit = g("revenue") - g("cogs");
  v.ebit = v.grossProfit - g("sga") - g("da") - g("impairment");
  v.ebt = v.ebit - g("interestExpense");
  v.netIncome = v.ebt - g("taxes");

  v.bsTotalCA = g("bsCash") + g("bsAR") + g("bsInventory");
  v.bsNetPPE = g("bsPPEGross") - g("bsAccDepr");
  v.bsTotalAssets = v.bsTotalCA + v.bsNetPPE + g("bsGoodwill");
  v.bsTotalCL = g("bsAP") + g("bsAccruedExp");
  v.bsTotalLiab = v.bsTotalCL + g("bsLTDebt");
  v.bsTotalEquity = g("bsCommonStock") + g("bsRetainedEarnings");
  v.bsTotalLE = v.bsTotalLiab + v.bsTotalEquity;

  v.cfsCFO =
    g("cfsNI") + g("cfsDA") + g("cfsImpairment") +
    g("cfsDeltaAR") + g("cfsDeltaInv") + g("cfsDeltaAP");
  v.cfsCFI = g("cfsCapex");
  v.cfsCFF = g("cfsDebtIssue") + g("cfsEquityIssue") + g("cfsDividends");
  v.cfsNetChange = v.cfsCFO + v.cfsCFI + v.cfsCFF;

  return v;
}

function validateInputs(
  inputs: Record<string, number>,
  solution: Record<string, number>
): Record<string, CellStatus> {
  const results: Record<string, CellStatus> = {};
  for (const id of ALL_INPUT_IDS) {
    const userVal = inputs[id] || 0;
    const expected = solution[id] || 0;
    if (userVal === 0 && expected === 0) {
      results[id] = "neutral";
    } else if (Math.abs(userVal - expected) < 0.01) {
      results[id] = "correct";
    } else {
      results[id] = "incorrect";
    }
  }
  return results;
}

const fmt = (n: number) => {
  if (n === 0) return "—";
  const s = Number.isInteger(n) ? Math.abs(n).toLocaleString() : Math.abs(n).toFixed(1);
  return n < 0 ? `(${s})` : s;
};

const DIFF_COLORS: Record<Difficulty, string> = {
  Beginner: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Advanced: "bg-amber-100 text-amber-700 border-amber-200",
  Elite: "bg-red-100 text-red-700 border-red-200",
};

/* ─── Sub-Components ─────────────────────────────────────────── */

function NumericCell({
  value,
  onChange,
  status,
  disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  status: CellStatus;
  disabled: boolean;
}) {
  return (
    <div className="relative">
      <input
        type="number"
        step="any"
        value={value === 0 ? "" : value}
        onChange={(e) =>
          onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))
        }
        placeholder="0"
        disabled={disabled}
        className={cn(
          "w-[80px] h-7 text-right text-[11px] font-mono tabular-nums px-2 rounded-md border bg-white dark:bg-background focus:outline-none focus:ring-2 focus:ring-finstep-orange/40 transition-colors",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          status === "correct" && "border-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-700",
          status === "incorrect" && "border-red-400 bg-red-50/80 dark:bg-red-950/30 text-red-600",
          status === "neutral" && "border-border/60",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      />
      {status === "correct" && (
        <CheckCircle2 className="absolute -right-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-500" />
      )}
      {status === "incorrect" && (
        <XCircle className="absolute -right-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-red-500" />
      )}
    </div>
  );
}

function ComputedCell({ value }: { value: number }) {
  return (
    <div
      className={cn(
        "w-[80px] h-7 text-right text-[11px] font-mono tabular-nums px-2 rounded-md flex items-center justify-end font-bold",
        "bg-finstep-beige/50 dark:bg-muted/40 text-finstep-brown dark:text-foreground"
      )}
    >
      {fmt(value)}
    </div>
  );
}

function StatementTable({
  title,
  color,
  items,
  inputs,
  computed,
  validation,
  checked,
  onInput,
  solution,
}: {
  title: string;
  color: string;
  items: LineItem[];
  inputs: Record<string, number>;
  computed: Record<string, number>;
  validation: Record<string, CellStatus> | null;
  checked: boolean;
  onInput: (id: string, v: number) => void;
  solution: Record<string, number>;
}) {
  return (
    <Card className="shadow-sm border-border/40 overflow-hidden">
      <CardHeader className="pb-1 pt-3 px-4">
        <div className="flex items-center gap-2">
          <div className={cn("w-2.5 h-2.5 rounded-full", color)} />
          <CardTitle className="text-xs font-varela font-bold text-finstep-brown dark:text-foreground">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <div className="text-[9px] text-finstep-brown/50 dark:text-muted-foreground flex justify-between px-2 py-1 uppercase tracking-wider font-bold">
          <span>Line Item</span>
          <span className="pr-6">Change (Δ)</span>
        </div>
        <Separator className="opacity-30 mb-1" />
        <div className="space-y-0">
          {items.map((item) => (
            <div key={item.id}>
              {item.isSeparatorBefore && (
                <Separator className="my-1 opacity-20" />
              )}
              <div
                className={cn(
                  "flex items-center justify-between px-2 py-[3px] rounded-md transition-colors",
                  item.isBold && "bg-finstep-beige/30 dark:bg-muted/20",
                  checked &&
                    validation?.[item.id] === "incorrect" &&
                    "bg-red-50/60 dark:bg-red-950/20",
                  checked &&
                    validation?.[item.id] === "correct" &&
                    "bg-emerald-50/40 dark:bg-emerald-950/10"
                )}
              >
                <span
                  className={cn(
                    "text-[11px] truncate pr-2",
                    item.isBold
                      ? "font-bold text-finstep-brown dark:text-foreground"
                      : "text-finstep-brown/80 dark:text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
                <div className="shrink-0">
                  {item.isComputed ? (
                    <ComputedCell value={computed[item.id] ?? 0} />
                  ) : (
                    <NumericCell
                      value={inputs[item.id] || 0}
                      onChange={(v) => onInput(item.id, v)}
                      status={
                        checked ? validation?.[item.id] ?? "neutral" : "neutral"
                      }
                      disabled={checked}
                    />
                  )}
                </div>
              </div>
              {checked &&
                validation?.[item.id] === "incorrect" &&
                !item.isComputed && (
                  <div className="text-[9px] text-red-500 px-2 pb-1 font-medium">
                    Expected: {fmt(solution[item.id] || 0)}
                  </div>
                )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */

export default function AccountingBuilderPage() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState<"IS" | "BS" | "CFS">("IS");

  const scenario = SCENARIOS[scenarioIndex];

  const computed = useMemo(() => computeValues(inputs), [inputs]);

  const validation = useMemo(() => {
    if (!checked) return null;
    return validateInputs(inputs, scenario.solution);
  }, [checked, inputs, scenario.solution]);

  const score = useMemo(() => {
    if (!validation) return null;
    const keys = Object.keys(scenario.solution).filter(
      (k) => scenario.solution[k] !== 0
    );
    const correct = keys.filter((k) => validation[k] === "correct").length;
    return { correct, total: keys.length };
  }, [validation, scenario.solution]);

  const isBalanced = useMemo(() => {
    return Math.abs(computed.bsTotalAssets - computed.bsTotalLE) < 0.01;
  }, [computed]);

  const cashMatches = useMemo(() => {
    const bsCash = inputs.bsCash || 0;
    return Math.abs(computed.cfsNetChange - bsCash) < 0.01;
  }, [computed, inputs]);

  const handleInput = useCallback((id: string, v: number) => {
    setInputs((prev) => ({ ...prev, [id]: v }));
  }, []);

  const handleCheck = useCallback(() => setChecked(true), []);

  const handleReset = useCallback(() => {
    setInputs({});
    setChecked(false);
    setShowHint(false);
  }, []);

  const handleNav = useCallback(
    (dir: -1 | 1) => {
      const next = scenarioIndex + dir;
      if (next >= 0 && next < SCENARIOS.length) {
        setScenarioIndex(next);
        setInputs({});
        setChecked(false);
        setShowHint(false);
        setActiveTab("IS");
      }
    },
    [scenarioIndex]
  );

  const hasInputs = Object.values(inputs).some((v) => v !== 0);

  return (
    <div className="max-w-[1500px] mx-auto flex flex-col h-[100dvh] xl:h-auto overflow-hidden xl:overflow-visible px-2 xl:px-0 xl:space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-none flex items-center justify-between gap-3 py-2 xl:py-0"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <FileSpreadsheet className="w-5 h-5 xl:w-6 xl:h-6 text-finstep-orange shrink-0" />
          <div className="min-w-0">
            <h1 className="text-base xl:text-2xl font-varela font-bold tracking-tight text-finstep-brown dark:text-foreground truncate">
              Financial Statement Builder
            </h1>
            <p className="hidden xl:block text-sm text-finstep-brown/60 dark:text-muted-foreground font-nunito">
              Practice the classic IB interview question: &quot;Walk me through
              the 3 statements&quot;
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNav(-1)}
            disabled={scenarioIndex === 0}
            className="h-8 px-2 text-xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>
          <span className="text-xs font-mono text-finstep-brown/60 dark:text-muted-foreground tabular-nums whitespace-nowrap">
            {scenarioIndex + 1} / {SCENARIOS.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNav(1)}
            disabled={scenarioIndex === SCENARIOS.length - 1}
            className="h-8 px-2 text-xs"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col xl:grid xl:grid-cols-12 gap-2 xl:gap-4 overflow-hidden xl:overflow-visible">
        {/* Left Panel */}
        <div className="flex-none xl:col-span-3 space-y-2 xl:space-y-3 order-first xl:order-first overflow-y-auto xl:overflow-visible pb-2 xl:pb-0">
          {/* Scenario Card */}
          <Card className="shadow-sm border-border/40">
            <CardContent className="pt-4 pb-3 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] px-2 py-0.5 font-bold",
                    DIFF_COLORS[scenario.difficulty]
                  )}
                >
                  {scenario.difficulty}
                </Badge>
                {scenario.taxRate > 0 && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-2 py-0.5 bg-finstep-beige text-finstep-brown border-none"
                  >
                    Tax: {scenario.taxRate}%
                  </Badge>
                )}
              </div>
              <h2 className="font-varela font-bold text-sm text-finstep-brown dark:text-foreground">
                {scenario.title}
              </h2>
              <p className="text-xs text-finstep-brown/80 dark:text-muted-foreground leading-relaxed font-nunito">
                {scenario.description}
              </p>

              <Separator className="opacity-30" />

              {/* Hint */}
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-finstep-orange hover:text-finstep-orange/80 transition-colors"
              >
                {showHint ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
                {showHint ? "Hide Hint" : "Show Hint"}
              </button>
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-2 p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-800/30">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-finstep-brown/70 dark:text-muted-foreground leading-relaxed">
                        {scenario.hint}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Separator className="opacity-30" />

              {/* Actions */}
              {!checked ? (
                <Button
                  onClick={handleCheck}
                  disabled={!hasInputs}
                  className="w-full bg-finstep-orange text-white hover:brightness-110 shadow-lg shadow-finstep-orange/20 h-9 text-xs font-bold"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
                  Check Answer
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="w-full h-8 text-xs"
                  >
                    <RotateCcw className="w-3 h-3 mr-2" />
                    Try Again
                  </Button>
                  {scenarioIndex < SCENARIOS.length - 1 && (
                    <Button
                      onClick={() => handleNav(1)}
                      className="w-full bg-finstep-orange text-white hover:brightness-110 h-9 text-xs font-bold"
                    >
                      Next Scenario
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Score */}
          <AnimatePresence>
            {checked && score && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card
                  className={cn(
                    "shadow-sm border-l-4",
                    score.correct === score.total
                      ? "border-l-emerald-500"
                      : "border-l-amber-500"
                  )}
                >
                  <CardContent className="pt-3 pb-3 space-y-2">
                    <div className="flex items-center gap-2">
                      {score.correct === score.total ? (
                        <Trophy className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                      )}
                      <span className="text-sm font-varela font-bold text-finstep-brown dark:text-foreground">
                        {score.correct} / {score.total} correct
                      </span>
                    </div>
                    <div className="flex gap-3 text-[10px] font-nunito">
                      <span
                        className={cn(
                          "font-bold",
                          isBalanced ? "text-emerald-600" : "text-red-500"
                        )}
                      >
                        BS {isBalanced ? "Balanced ✓" : "Unbalanced ✗"}
                      </span>
                      <span
                        className={cn(
                          "font-bold",
                          cashMatches ? "text-emerald-600" : "text-red-500"
                        )}
                      >
                        Cash {cashMatches ? "Matches ✓" : "Mismatch ✗"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explanation */}
          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Card className="shadow-sm border-l-4 border-l-finstep-orange border-border/40">
                  <CardContent className="pt-3 pb-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-3.5 h-3.5 text-finstep-orange" />
                      <h3 className="font-varela font-bold text-xs text-finstep-brown dark:text-foreground">
                        Solution Walkthrough
                      </h3>
                    </div>
                    <ol className="space-y-2">
                      {scenario.explanation.map((step, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex gap-2 text-[10px] leading-relaxed"
                        >
                          <span className="text-finstep-orange font-bold shrink-0">
                            {i + 1}.
                          </span>
                          <span className="text-finstep-brown/70 dark:text-muted-foreground">
                            {step}
                          </span>
                        </motion.li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel — Statement Tables */}
        <div className="flex-1 xl:col-span-9 flex flex-col overflow-hidden xl:overflow-visible min-h-0">
          {/* Live Balance Check */}
          {hasInputs && !checked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-none flex items-center gap-3 mb-1 px-1"
            >
              <div
                className={cn(
                  "flex items-center gap-1.5 text-[10px] font-bold rounded-full px-2.5 py-1",
                  isBalanced
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                    : "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                )}
              >
                {isBalanced ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <XCircle className="w-3 h-3" />
                )}
                BS {isBalanced ? "Balanced" : "Unbalanced"}
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 text-[10px] font-bold rounded-full px-2.5 py-1",
                  cashMatches
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                    : "bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                )}
              >
                {cashMatches ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <AlertTriangle className="w-3 h-3" />
                )}
                ΔCash = CFS
              </div>
            </motion.div>
          )}

          {/* Mobile Tabs */}
          <div className="flex xl:hidden mb-1.5 flex-none p-1 bg-finstep-beige/40 dark:bg-muted/30 rounded-lg border border-finstep-brown/10 dark:border-border/50 gap-1">
            {(["IS", "BS", "CFS"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-1.5 text-[10px] font-bold rounded-md transition-all uppercase tracking-tight font-nunito",
                  activeTab === tab
                    ? "bg-finstep-orange text-white shadow-sm"
                    : "text-finstep-brown/60 hover:text-finstep-brown"
                )}
              >
                {tab === "IS"
                  ? "Income Stmt"
                  : tab === "BS"
                    ? "Balance Sheet"
                    : "Cash Flow"}
              </button>
            ))}
          </div>

          {/* Statement Grid */}
          <div className="flex-1 overflow-y-auto xl:overflow-visible min-h-0">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 xl:gap-3">
              <div className={cn(activeTab !== "IS" && "hidden xl:block")}>
                <StatementTable
                  title="Income Statement"
                  color="bg-blue-500"
                  items={IS_ITEMS}
                  inputs={inputs}
                  computed={computed}
                  validation={validation}
                  checked={checked}
                  onInput={handleInput}
                  solution={scenario.solution}
                />
              </div>
              <div className={cn(activeTab !== "BS" && "hidden xl:block")}>
                <StatementTable
                  title="Balance Sheet"
                  color="bg-amber-500"
                  items={BS_ITEMS}
                  inputs={inputs}
                  computed={computed}
                  validation={validation}
                  checked={checked}
                  onInput={handleInput}
                  solution={scenario.solution}
                />
              </div>
              <div className={cn(activeTab !== "CFS" && "hidden xl:block")}>
                <StatementTable
                  title="Cash Flow Statement"
                  color="bg-emerald-500"
                  items={CFS_ITEMS}
                  inputs={inputs}
                  computed={computed}
                  validation={validation}
                  checked={checked}
                  onInput={handleInput}
                  solution={scenario.solution}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

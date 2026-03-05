"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Droplets, BookOpen, Calculator, Lightbulb, ChevronRight } from "lucide-react";
import { useCorporateFinanceStore } from "@/store/useCorporateFinanceStore";

const MODULES = [
  {
    href: "/corporate-finance/cash-flow/learning",
    title: "Learning",
    desc: "Operating cash flow, working capital management, cash conversion cycle, and liquidity risk.",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/corporate-finance/cash-flow/calculator",
    title: "Cash Flow Calculator",
    desc: "See how operational changes affect cash flow, short-term liquidity, and financial stability.",
    icon: Calculator,
    color: "from-emerald-500 to-teal-500",
  },
  {
    href: "/corporate-finance/cash-flow/practice",
    title: "Practice",
    desc: "Financial calculations, data interpretation, and liquidity decision questions.",
    icon: Lightbulb,
    color: "from-rose-500 to-pink-500",
  },
];

export default function CashFlowOverviewPage() {
  const recordVisit = useCorporateFinanceStore((s) => s.recordVisit);
  useEffect(() => {
    recordVisit("cash-flow");
  }, [recordVisit]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Droplets className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-varela font-bold tracking-tight text-finstep-brown dark:text-foreground">
          Cash Flow & Liquidity Lab
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1 max-w-xl mx-auto">
          Learn how companies manage liquidity and operating cash flow. Working capital, cash conversion cycle, and liquidity risk.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULES.map((m, i) => (
          <motion.div
            key={m.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={m.href}>
              <Card className="shadow-sm border-border/40 hover:shadow-lg hover:border-finstep-orange/30 transition-all cursor-pointer group h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <m.icon className="w-6 h-6 text-white" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-finstep-orange transition-colors" />
                  </div>
                  <h3 className="font-varela font-bold text-finstep-brown dark:text-foreground group-hover:text-finstep-orange transition-colors">
                    {m.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

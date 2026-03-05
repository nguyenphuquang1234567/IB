"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, BookOpen, BarChart3, Zap, Lightbulb, ChevronRight } from "lucide-react";

const MODULES = [
  {
    href: "/budgeting-forecasting/learning",
    title: "Budgeting Fundamentals",
    desc: "Learn revenue forecasting, COGS, OpEx, CapEx, and working capital concepts.",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/budgeting-forecasting/forecast",
    title: "Forecast Builder",
    desc: "Build 3–5 year forecasts with your assumptions. See revenue, profit, and cash flow.",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
  },
  {
    href: "/budgeting-forecasting/variance",
    title: "Variance Analysis",
    desc: "Compare budget vs. actual. Understand variance drivers and financial performance.",
    icon: BarChart3,
    color: "from-amber-500 to-orange-500",
  },
  {
    href: "/budgeting-forecasting/scenario",
    title: "Scenario Simulator",
    desc: "Test demand slowdown, cost increases, and expansion. See financial impact.",
    icon: Zap,
    color: "from-violet-500 to-purple-500",
  },
  {
    href: "/budgeting-forecasting/practice",
    title: "Practice Exercises",
    desc: "Test your knowledge with revenue, COGS, variance, and EBITDA calculations.",
    icon: Lightbulb,
    color: "from-rose-500 to-pink-500",
  },
];

export default function BudgetingOverviewPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-varela font-bold tracking-tight text-finstep-brown dark:text-foreground">
          Budgeting & Forecasting Lab
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1 max-w-xl mx-auto">
          Learn corporate budgeting, build forecasts, analyze variance, and simulate business scenarios.
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
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
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

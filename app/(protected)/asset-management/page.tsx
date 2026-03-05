"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, PieChart, BarChart3, Zap, Target, ChevronRight } from "lucide-react";

const MODULES = [
  {
    href: "/asset-management/learning",
    title: "Investment Fundamentals",
    desc: "Asset allocation, risk vs return, diversification, portfolio optimization, beta, alpha, benchmarks.",
    icon: BookOpen,
    color: "from-violet-500 to-purple-500",
  },
  {
    href: "/asset-management/construction",
    title: "Portfolio Construction Lab",
    desc: "Build a portfolio across equities, bonds, real estate, cash. See expected return, volatility, Sharpe ratio.",
    icon: PieChart,
    color: "from-indigo-500 to-blue-500",
  },
  {
    href: "/asset-management/risk",
    title: "Risk & Performance Analysis",
    desc: "Evaluate return, volatility, Sharpe, Beta, max drawdown. Compare vs S&P 500 benchmark.",
    icon: BarChart3,
    color: "from-cyan-500 to-teal-500",
  },
  {
    href: "/asset-management/simulation",
    title: "Portfolio Simulation",
    desc: "Manage a portfolio through market events. Rebalance, adjust exposure, see impact in real time.",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
  },
  {
    href: "/asset-management/quiz",
    title: "Practice",
    desc: "Investment decision exercises. Test your knowledge on allocation, risk, and portfolio management.",
    icon: Target,
    color: "from-rose-500 to-pink-500",
  },
];

export default function AssetManagementOverviewPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <PieChart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-varela font-bold tracking-tight text-finstep-brown dark:text-foreground">
          Asset Management Training
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1 max-w-xl mx-auto">
          Learn to analyze investments, build portfolios, allocate assets, and manage risk like professional asset managers.
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

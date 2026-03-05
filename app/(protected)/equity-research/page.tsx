"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Search, Calculator, FileText, Target, ChevronRight } from "lucide-react";

const MODULES = [
  {
    href: "/equity-research/learning",
    title: "Equity Research Fundamentals",
    desc: "Business models, revenue drivers, cost structure, competitive advantage, industry analysis, valuation frameworks, thesis construction.",
    icon: BookOpen,
    color: "from-rose-500 to-pink-500",
  },
  {
    href: "/equity-research/companies",
    title: "Company Analysis Lab",
    desc: "Analyze Apple, Microsoft, Nvidia, Tesla, Amazon, Costco. Revenue, margins, FCF. Answer questions on drivers and trends.",
    icon: Search,
    color: "from-violet-500 to-purple-500",
  },
  {
    href: "/equity-research/valuation",
    title: "Valuation Lab",
    desc: "DCF, EV/EBITDA, P/E. Input assumptions, estimate intrinsic value, compare to market price.",
    icon: Calculator,
    color: "from-indigo-500 to-blue-500",
  },
  {
    href: "/equity-research/thesis",
    title: "Investment Thesis Builder",
    desc: "Build a structured thesis: overview, industry, growth drivers, risks, valuation, Buy/Hold/Sell recommendation.",
    icon: FileText,
    color: "from-cyan-500 to-teal-500",
  },
  {
    href: "/equity-research/quiz",
    title: "Practice",
    desc: "Equity research exercises. Revenue vs margins, valuation interpretation, analyst workflow.",
    icon: Target,
    color: "from-amber-500 to-orange-500",
  },
];

export default function EquityResearchOverviewPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Search className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-varela font-bold tracking-tight text-finstep-brown dark:text-foreground">
          Equity Research Lab
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1 max-w-xl mx-auto">
          Learn to analyze companies, interpret financials, build theses, estimate value, and make Buy/Hold/Sell recommendations.
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

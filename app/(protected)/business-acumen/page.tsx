"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Briefcase, Zap, BarChart3, Lightbulb, ChevronRight } from "lucide-react";

const MODULES = [
  {
    href: "/business-acumen/learning",
    title: "Concept Learning",
    desc: "Revenue drivers, unit economics, market sizing, pricing strategy, and growth vs profitability.",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/business-acumen/cases",
    title: "Business Case Practice",
    desc: "Analyze real scenarios: subscription slowdown, margin compression, working capital, and more.",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-500",
  },
  {
    href: "/business-acumen/simulation",
    title: "Decision Simulation",
    desc: "Make strategic decisions as CFO. See impact on revenue, margin, and cash flow.",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
  },
  {
    href: "/business-acumen/data",
    title: "Data Interpretation",
    desc: "Interpret financial data. Identify why profit declined, what drove growth, and key insights.",
    icon: BarChart3,
    color: "from-violet-500 to-purple-500",
  },
];

export default function BusinessAcumenOverviewPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-varela font-bold tracking-tight text-finstep-brown dark:text-foreground">
          Business Acumen Training
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1 max-w-xl mx-auto">
          Think like consultants and strategists. Practice business reasoning, decision making, and data interpretation.
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

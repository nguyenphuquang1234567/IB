"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Gamepad2, Zap, Lightbulb, ChevronRight } from "lucide-react";
import { useCorporateFinanceStore } from "@/store/useCorporateFinanceStore";

const MODULES = [
  {
    href: "/corporate-finance/strategy/simulator",
    title: "Strategy Simulator",
    desc: "Make corporate financial decisions. Expand into new market, raise debt, cut costs, launch new product. See impact on revenue, profitability, and cash flow.",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
  },
  {
    href: "/corporate-finance/strategy/practice",
    title: "Practice",
    desc: "Business decision questions and scenarios with explanations.",
    icon: Lightbulb,
    color: "from-rose-500 to-pink-500",
  },
];

export default function StrategyOverviewPage() {
  const recordVisit = useCorporateFinanceStore((s) => s.recordVisit);
  useEffect(() => {
    recordVisit("strategy");
  }, [recordVisit]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Gamepad2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-varela font-bold tracking-tight text-finstep-brown dark:text-foreground">
          Corporate Strategy Simulator
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1 max-w-xl mx-auto">
          Make corporate financial decisions. See the impact on revenue growth, profitability, and cash flow.
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

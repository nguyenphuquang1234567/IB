"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, BarChart3, Landmark } from "lucide-react";

const labs = [
  {
    href: "/dcf",
    title: "DCF Lab",
    description: "Master DCF valuation through learning, building, and practice. Project cash flows, set WACC, and value companies.",
    icon: Calculator,
    color: "bg-finstep-orange",
  },
  {
    href: "/valuation/comps",
    title: "Comps Lab",
    description: "Learn comparable company analysis. Select peers, calculate EV/EBITDA and trading multiples, and derive valuation ranges.",
    icon: BarChart3,
    color: "bg-blue-500",
  },
  {
    href: "/valuation/lbo",
    title: "LBO Lab",
    description: "Advanced PE deal simulator. Fundamentals, deal sourcing, LBO modeling, value creation, and exit returns.",
    icon: Landmark,
    color: "bg-emerald-500",
  },
];

export default function ValuationPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl font-varela font-bold tracking-tight text-finstep-brown dark:text-foreground">
          Valuation Labs
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1">
          Master the three core valuation methodologies used in investment banking
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {labs.map((lab, i) => (
          <motion.div
            key={lab.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              className="shadow-sm border-border/40 hover:shadow-lg hover:border-finstep-orange/30 transition-all cursor-pointer group"
              onClick={() => router.push(lab.href)}
            >
              <CardContent className="pt-6 pb-6">
                <div
                  className={`w-12 h-12 rounded-xl ${lab.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <lab.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-varela font-bold text-finstep-brown dark:text-foreground group-hover:text-finstep-orange transition-colors">
                  {lab.title}
                </h3>
                <p className="text-xs text-finstep-brown/60 dark:text-muted-foreground mt-2 leading-relaxed">
                  {lab.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

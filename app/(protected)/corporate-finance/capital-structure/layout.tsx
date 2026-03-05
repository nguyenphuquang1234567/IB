"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Layers, BookOpen, Calculator, Lightbulb, ArrowLeft } from "lucide-react";

const NAV_ITEMS = [
  { href: "/corporate-finance/capital-structure", label: "Overview", icon: Layers },
  { href: "/corporate-finance/capital-structure/learning", label: "Learning", icon: BookOpen },
  { href: "/corporate-finance/capital-structure/wacc", label: "WACC Calculator", icon: Calculator },
  { href: "/corporate-finance/capital-structure/practice", label: "Practice", icon: Lightbulb },
];

export default function CapitalStructureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto">
      <aside className="lg:w-56 shrink-0">
        <div className="sticky top-24 space-y-1">
          <Link
            href="/corporate-finance"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Corporate Finance
          </Link>
          <nav className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/corporate-finance/capital-structure" &&
                  pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-finstep-orange text-white shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

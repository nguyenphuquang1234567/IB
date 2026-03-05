"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { Domain } from "@/lib/navigation/domains";

interface DomainLandingProps {
  domain: Domain;
}

export function DomainLanding({ domain }: DomainLandingProps) {
  const router = useRouter();
  const items = domain.items.filter((item) => item.label !== "Coming Soon");
  const hasItems = items.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${domain.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
          <domain.icon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-varela font-bold tracking-tight text-finstep-brown dark:text-foreground">
          {domain.label}
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1">
          {domain.description}
        </p>
      </motion.div>

      {hasItems ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              className="shadow-sm border-border/40 hover:shadow-lg hover:border-finstep-orange/30 transition-all cursor-pointer group"
              onClick={() => router.push(item.href)}
            >
              <CardContent className="pt-6 pb-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-varela font-bold text-finstep-brown dark:text-foreground group-hover:text-finstep-orange transition-colors">
                  {item.label}
                </h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground">
            More modules coming soon. Stay tuned!
          </p>
        </motion.div>
      )}
    </div>
  );
}

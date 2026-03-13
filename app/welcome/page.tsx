"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { DOMAINS } from "@/lib/navigation/domains";
import { ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WelcomePage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") return null;

    const firstName = session?.user?.name?.split(" ")[0] || "bạn";

    const handleNavigate = (href: string) => {
        router.push(href);
    };

    return (
        <div className="min-h-screen w-full bg-[#f5ede0] dark:bg-neutral-950 flex items-center justify-center">
            {/* Decorative background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-finstep-orange/5 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-finstep-orange/8 blur-3xl" />
                <div className="absolute top-1/3 left-1/2 w-[400px] h-[300px] rounded-full bg-amber-400/5 blur-3xl" />
            </div>

            <div className="relative w-full max-w-2xl mx-auto px-6 py-12 max-h-screen overflow-y-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-finstep-orange/10 border border-finstep-orange/20 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-finstep-orange" />
                        <span className="text-sm font-nunito font-bold text-finstep-orange">
                            Xin chào, {firstName}!
                        </span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-varela font-bold text-finstep-brown dark:text-white mb-4">
                        Welcome to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-finstep-orange to-amber-500">
                            FinApp
                        </span>
                    </h1>

                    <p className="text-lg text-finstep-brown/60 dark:text-neutral-400 font-nunito font-medium max-w-lg mx-auto">
                        Bạn muốn luyện tập phần nào? Chọn một lĩnh vực bên dưới để bắt đầu.
                    </p>
                </motion.div>

                {/* Domain options */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-3"
                >
                    {DOMAINS.map((domain, idx) => {
                        const isExpanded = expandedDomain === domain.id;

                        return (
                            <motion.div
                                key={domain.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + idx * 0.08 }}
                            >
                                <div
                                    className={cn(
                                        "rounded-2xl border transition-all duration-300 overflow-hidden",
                                        isExpanded
                                            ? "border-finstep-orange/30 bg-white dark:bg-neutral-800/80 shadow-lg shadow-finstep-orange/5"
                                            : "border-finstep-brown/10 bg-white/60 dark:bg-neutral-800/40 hover:bg-white dark:hover:bg-neutral-800/60 hover:border-finstep-orange/20 hover:shadow-md"
                                    )}
                                >
                                    {/* Domain header */}
                                    <button
                                        onClick={() =>
                                            setExpandedDomain(isExpanded ? null : domain.id)
                                        }
                                        className="flex items-center gap-4 w-full px-5 py-4 text-left"
                                    >
                                        <div
                                            className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm",
                                                `bg-gradient-to-br ${domain.color}`,
                                                isExpanded && "scale-110 shadow-md"
                                            )}
                                        >
                                            <domain.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-varela font-bold text-finstep-brown dark:text-white text-lg">
                                                {domain.label}
                                            </h3>
                                            <p className="text-sm text-finstep-brown/50 dark:text-neutral-400 font-nunito truncate">
                                                {domain.description}
                                            </p>
                                        </div>
                                        <ChevronRight
                                            className={cn(
                                                "w-5 h-5 text-finstep-brown/30 shrink-0 transition-transform duration-300",
                                                isExpanded && "rotate-90 text-finstep-orange"
                                            )}
                                        />
                                    </button>

                                    {/* Expandable sub-items */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 pb-4 pt-1">
                                                    <div className="border-t border-finstep-brown/5 dark:border-neutral-700 pt-3 space-y-1">
                                                        {domain.items.map((subItem) => (
                                                            <motion.button
                                                                key={subItem.href}
                                                                whileHover={{ x: 6 }}
                                                                onClick={() => handleNavigate(subItem.href)}
                                                                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left hover:bg-finstep-orange/5 dark:hover:bg-finstep-orange/10 transition-all group"
                                                            >
                                                                <div className="w-8 h-8 rounded-lg bg-finstep-beige/80 dark:bg-neutral-700 flex items-center justify-center group-hover:bg-finstep-orange/10 transition-colors">
                                                                    <subItem.icon className="w-4 h-4 text-finstep-brown/50 group-hover:text-finstep-orange transition-colors" />
                                                                </div>
                                                                <span className="font-nunito font-semibold text-sm text-finstep-brown/70 dark:text-neutral-300 group-hover:text-finstep-orange transition-colors">
                                                                    {subItem.label}
                                                                </span>
                                                                <ChevronRight className="w-4 h-4 ml-auto text-finstep-brown/20 group-hover:text-finstep-orange/50 transition-colors" />
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Skip to dashboard */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="text-center mt-8"
                >
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="text-sm font-nunito font-semibold text-finstep-brown/40 hover:text-finstep-orange transition-colors underline underline-offset-4 decoration-dashed decoration-finstep-brown/20 hover:decoration-finstep-orange/40"
                    >
                        Bỏ qua, đi thẳng đến Dashboard →
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

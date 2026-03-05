"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Target,
  TrendingUp,
  FlaskConical,
  FileSpreadsheet,
  Briefcase,
  PieChart,
  Search,
  Sparkles,
} from "lucide-react";
import { FinstepLogo } from "@/components/finstep-logo";

const DOMAIN_CARDS = [
  {
    id: "corporate-finance",
    label: "Corporate Finance",
    icon: FlaskConical,
    color: "from-blue-500 to-cyan-500",
    desc: "3-statement modeling & valuation",
  },
  {
    id: "accounting",
    label: "Accounting",
    icon: FileSpreadsheet,
    color: "from-amber-500 to-orange-500",
    desc: "Financial statements & linkages",
  },
  {
    id: "ib",
    label: "Investment Banking",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-500",
    desc: "Technical & fit interviews",
  },
  {
    id: "asset-management",
    label: "Asset Management",
    icon: PieChart,
    color: "from-violet-500 to-purple-500",
    desc: "Portfolio & strategies",
  },
  {
    id: "equity-research",
    label: "Equity Research",
    icon: Search,
    color: "from-rose-500 to-pink-500",
    desc: "Valuation & company analysis",
  },
];

export default function HomeClient() {
  return (
    <div className="min-h-screen w-full bg-finstep-beige text-finstep-brown font-nunito selection:bg-finstep-orange/30 flex flex-col items-center overflow-x-hidden relative">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-finstep-orange rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-finstep-brown/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-finstep-orange/30 rounded-full blur-[100px]"
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex justify-between items-center absolute top-0 left-1/2 -translate-x-1/2 z-50"
      >
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <FinstepLogo size="xl" showText={true} className="text-xl sm:text-2xl md:text-3xl" />
        </Link>

        <Link
          href="/login"
          className="font-varela font-semibold text-finstep-brown hover:text-finstep-orange transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-finstep-brown/5 shrink-0"
        >
          Log in
        </Link>
      </motion.nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 pt-32 pb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-finstep-brown/5 border border-finstep-brown/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-finstep-orange" />
          <span className="text-sm font-medium text-finstep-brown/80">
            finstep.app
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-varela font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-tight text-finstep-brown mb-6 max-w-5xl"
        >
          Turning finance knowledge into{" "}
          <span className="text-finstep-orange relative inline-block">
            real career progress
            <svg className="absolute w-full h-4 -bottom-1 left-0 text-finstep-lightbrown opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
              <motion.path
                d="M0 8 Q 50 12 100 8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-3xl text-finstep-brown/80 mb-4 max-w-3xl font-light font-varela"
        >
          One step at a time.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-finstep-brown/70 mb-12 max-w-2xl font-light"
        >
          Master technical concepts, practice interviews, and secure your dream role across Corporate Finance, IB, Asset Management, and Equity Research.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link href="/login" className="group w-full sm:w-auto">
            <motion.span
              className="inline-flex items-center justify-center gap-2 bg-finstep-orange text-white text-lg font-bold px-8 py-4 rounded-full hover:bg-finstep-brown transition-all duration-300 shadow-[0_8px_30px_rgb(180,120,65,0.35)] hover:shadow-[0_8px_30px_rgb(80,58,42,0.4)] w-full sm:w-auto block"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </Link>
          <a href="#features" className="group w-full sm:w-auto">
            <motion.span
              className="inline-flex items-center justify-center gap-2 bg-transparent text-finstep-brown border-2 border-finstep-brown/20 text-lg font-bold px-8 py-4 rounded-full hover:border-finstep-brown/40 hover:bg-finstep-brown/5 transition-all duration-300 w-full sm:w-auto block"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Domains
            </motion.span>
          </a>
        </motion.div>
      </main>

      {/* Features / Domains Section */}
      <section id="features" className="w-full py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-varela text-2xl sm:text-3xl md:text-4xl font-bold text-finstep-brown mb-4">
              Five Domains. One Platform.
            </h2>
            <p className="text-finstep-brown/70 max-w-2xl mx-auto">
              Structured learning across the full spectrum of finance careers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {DOMAIN_CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="h-full p-4 sm:p-6 rounded-2xl bg-card/80 backdrop-blur-sm border-2 border-finstep-brown/5 hover:border-finstep-orange/30 transition-all duration-300 shadow-sm hover:shadow-xl">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <card.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="font-varela text-lg sm:text-xl font-bold mb-2 text-finstep-brown group-hover:text-finstep-orange transition-colors">
                    {card.label}
                  </h3>
                  <p className="text-sm text-finstep-brown/60">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mt-24"
          >
            <div className="flex flex-col items-center text-center group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-finstep-beige flex items-center justify-center mb-6 group-hover:bg-finstep-orange/10 group-hover:text-finstep-orange text-finstep-brown/60 border border-finstep-brown/10"
              >
                <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300" />
              </motion.div>
              <h3 className="font-varela text-xl sm:text-2xl font-bold mb-3 text-finstep-brown">
                Structured Learning
              </h3>
              <p className="text-finstep-brown/70 leading-relaxed max-w-sm text-sm sm:text-base">
                Step-by-step curriculum covering accounting, valuation, and modeling. Built to match actual interview difficulty.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-finstep-beige flex items-center justify-center mb-6 group-hover:bg-finstep-orange/10 text-finstep-brown/60 border border-finstep-brown/10"
              >
                <Target className="w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300 group-hover:text-finstep-orange" />
              </motion.div>
              <h3 className="font-varela text-xl sm:text-2xl font-bold mb-3 text-finstep-brown">
                Targeted Practice
              </h3>
              <p className="text-finstep-brown/70 leading-relaxed max-w-sm text-sm sm:text-base">
                Test your knowledge with realistic technical questions and case studies. Identify and conquer your weak points.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-finstep-beige flex items-center justify-center mb-6 group-hover:bg-finstep-orange/10 text-finstep-brown/60 border border-finstep-brown/10"
              >
                <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300 group-hover:text-finstep-orange" />
              </motion.div>
              <h3 className="font-varela text-xl sm:text-2xl font-bold mb-3 text-finstep-brown">
                Track Progress
              </h3>
              <p className="text-finstep-brown/70 leading-relaxed max-w-sm text-sm sm:text-base">
                Watch your competence grow. Detailed analytics show exactly where you stand and what to focus on next.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full bg-finstep-brown text-finstep-beige py-12 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-varela text-xl sm:text-2xl font-bold tracking-tight text-white opacity-90">
              Fin<span className="text-finstep-orange">Step</span>
            </span>
          </div>
          <p className="text-finstep-beige/60 text-sm">
            © {new Date().getFullYear()} FinStep. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

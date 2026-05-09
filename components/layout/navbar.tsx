"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.04] bg-surface/85 backdrop-blur-2xl supports-[backdrop-filter]:bg-surface/75"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 min-h-[44px]">
          <div className="w-9 h-9 rounded-xl bg-champagne-500/10 flex items-center justify-center border border-champagne-500/10">
            <Sparkles className="w-4.5 h-4.5 text-champagne-400" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base text-white tracking-tight">
              BeautyBody
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-champagne-400/70 font-medium mt-0.5">
              AI Skin Expert
            </span>
          </div>
        </Link>

        <Link 
          href="/consent" 
          className="text-xs font-medium text-white/50 hover:text-white transition-colors min-h-[44px] flex items-center px-2"
        >
          Analyze
        </Link>
      </div>
    </motion.header>
  );
}

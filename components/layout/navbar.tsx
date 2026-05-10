"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

const LANGS = ["en", "ru", "es"] as const;

export function Navbar() {
  const { lang, setLang, t, mounted } = useLanguage();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-surface/90 backdrop-blur-2xl"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="max-w-lg mx-auto px-4 h-[52px] flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 min-h-[44px]">
          <div className="w-8 h-8 rounded-lg bg-champagne-500/10 flex items-center justify-center border border-champagne-500/10">
            <Sparkles className="w-4 h-4 text-champagne-400" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[15px] text-white tracking-tight">
              {t("common.brand")}
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-champagne-400/70 font-medium mt-0.5">
              {t("common.tagline")}
            </span>
          </div>
        </Link>

        {/* Language Switcher — ALWAYS VISIBLE */}
        <div className="flex items-center gap-1 bg-white/[0.03] rounded-xl p-1 border border-white/[0.06]">
          {LANGS.map((l) => {
            const isActive = lang === l;
            return (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "relative px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200",
                  "min-h-[36px] min-w-[36px] flex items-center justify-center",
                  isActive
                    ? "bg-champagne-500 text-stone-900 shadow-[0_0_12px_rgba(201,169,110,0.3)]"
                    : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                )}
                aria-label={`Switch to ${l}`}
                aria-pressed={isActive}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
}

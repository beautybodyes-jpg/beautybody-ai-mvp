"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkinParameter } from "@/types";
import { getSeverityColor, getSeverityLabel, cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { Sparkles, Palette, Sun, Shield, CircleDot, Eye, Heart, Droplets, ChevronDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" strokeWidth={1.5} />,
  Palette: <Palette className="w-5 h-5" strokeWidth={1.5} />,
  Sun: <Sun className="w-5 h-5" strokeWidth={1.5} />,
  Shield: <Shield className="w-5 h-5" strokeWidth={1.5} />,
  CircleDot: <CircleDot className="w-5 h-5" strokeWidth={1.5} />,
  Eye: <Eye className="w-5 h-5" strokeWidth={1.5} />,
  Heart: <Heart className="w-5 h-5" strokeWidth={1.5} />,
  Droplets: <Droplets className="w-5 h-5" strokeWidth={1.5} />,
};

interface ParameterCardProps {
  parameter: SkinParameter;
  index: number;
  isPriority?: boolean;
  isStrength?: boolean;
}

export function ParameterCard({ parameter, index, isPriority, isStrength }: ParameterCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { getParamTranslation, getSeverityTranslation } = useLanguage();
  const color = getSeverityColor(parameter.score);
  const label = getSeverityTranslation(getSeverityLabel(parameter.score).toLowerCase().replace(/\s+/g, ""));
  const barWidth = `${parameter.score}%`;
  const translated = getParamTranslation(parameter.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard
        className={cn(
          "p-5",
          isPriority && "border-score-priority/20 shadow-[0_0_20px_rgba(244,63,94,0.06)]",
          isStrength && "border-score-excellent/20 shadow-[0_0_20px_rgba(16,185,129,0.06)]"
        )}
        onClick={() => setExpanded(!expanded)}
        hover
      >
        {(isPriority || isStrength) && (
          <div className="flex items-center gap-2 mb-3">
            {isPriority && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-score-priority bg-score-priority/10 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                {useLanguage().t("results.priorityFocus")}
              </span>
            )}
            {isStrength && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-score-excellent bg-score-excellent/10 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                {useLanguage().t("results.topStrength")}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300" style={{ backgroundColor: `${color}12`, color }}>
            {ICON_MAP[parameter.icon] || <Sparkles className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium text-sm truncate">{translated.name}</h4>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm font-bold tabular-nums" style={{ color }}>{parameter.score}</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${color}15`, color }}>{label}</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ backgroundColor: color }} initial={{ width: 0 }} animate={{ width: barWidth }} transition={{ duration: 1.2, delay: index * 0.06 + 0.3, ease: [0.22, 1, 0.36, 1] }} />
            </div>
          </div>
          <ChevronDown className={cn("w-5 h-5 text-white/30 shrink-0 transition-transform duration-300", expanded && "rotate-180 text-white/50")} />
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
              <div className="pt-4 mt-4 border-t border-white/[0.06]">
                <p className="text-white/50 text-sm leading-relaxed">{translated.desc}</p>
                <div className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-white/40 text-xs leading-relaxed">
                    <span className="text-champagne-400/70 font-medium">{useLanguage().t("common.tagline") ? "Tip: " : "Tip: "}</span>
                    {translated.tip}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}

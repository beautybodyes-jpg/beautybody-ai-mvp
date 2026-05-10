"use client";

import { motion } from "framer-motion";
import { Treatment } from "@/types";
import { GlassCard } from "@/components/ui/glass-card";
import { Clock, Tag, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";

interface RecommendationCardProps {
  treatment: Treatment;
  index: number;
  selected: boolean;
  onSelect: () => void;
}

export function RecommendationCard({ treatment, index, selected, onSelect }: RecommendationCardProps) {
  const { getTreatmentTranslation } = useLanguage();
  const translated = getTreatmentTranslation(treatment.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard
        className={cn("p-5 transition-all duration-300", selected && "border-champagne-500/30 bg-champagne-500/[0.04]")}
        onClick={onSelect}
        hover
        glow={selected}
        active={selected}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-3">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-white font-medium text-base">{translated.name}</h4>
              {selected && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-champagne-400 bg-champagne-500/10 px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3" />
                  Selected
                </motion.span>
              )}
            </div>
            <p className="text-white/40 text-xs capitalize">{treatment.category}</p>
          </div>
          <div className={cn("w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300", selected ? "border-champagne-500 bg-champagne-500 text-stone-900" : "border-white/15")}>
            {selected ? <Check className="w-4 h-4" /> : <ArrowRight className="w-3.5 h-3.5 text-white/20" />}
          </div>
        </div>
        <p className="text-white/55 text-sm leading-relaxed mb-4">{translated.desc}</p>
        <div className="flex items-center gap-5 text-xs text-white/35">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{treatment.duration}</span>
          <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" />{treatment.priceRange}</span>
        </div>
      </GlassCard>
    </motion.div>
  );
}

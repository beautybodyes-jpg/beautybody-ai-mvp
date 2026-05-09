"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Calendar, TrendingUp, TrendingDown, Minus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { ScoreGauge } from "@/components/ui/score-gauge";
import { ParameterCard } from "@/components/analysis/parameter-card";
import { RecommendationCard } from "@/components/analysis/recommendation-card";
import { useAnalysis } from "@/context/analysis-context";
import { useLanguage } from "@/hooks/use-language";
import { getSeverityColor } from "@/lib/utils";

export default function ResultsPage() {
  const router = useRouter();
  const { analysis, setSelectedTreatments, selectedTreatments } = useAnalysis();
  const { t, getSeverityTranslation } = useLanguage();
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    if (!analysis) {
      router.replace("/");
      return;
    }
    const timer = setTimeout(() => setShowReveal(true), 100);
    return () => clearTimeout(timer);
  }, [analysis, router]);

  if (!analysis) return null;

  const toggleTreatment = (id: string) => {
    setSelectedTreatments(
      selectedTreatments.includes(id)
        ? selectedTreatments.filter((t) => t !== id)
        : [...selectedTreatments, id]
    );
  };

  const ageDiff = analysis.chronologicalAge - analysis.skinAge;
  const ageDiffIcon = ageDiff > 0 ? <TrendingUp className="w-3 h-3" /> : ageDiff < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />;
  const ageDiffColor = ageDiff > 0 ? "text-score-excellent" : ageDiff < 0 ? "text-score-attention" : "text-white/50";
  const ageDiffText = ageDiff > 0 ? `${ageDiff} ${t("results.yrsYounger")}` : ageDiff < 0 ? `${Math.abs(ageDiff)} ${t("results.yrsOlder")}` : t("results.matchesAge");

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-32 safe-area-x">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-2.5 rounded-xl bg-champagne-500/8 border border-champagne-500/15 text-center">
        <p className="text-champagne-400/70 text-[10px] font-semibold uppercase tracking-[0.2em]">{t("common.demoMode")}</p>
      </motion.div>

      <AnimatePresence>
        {showReveal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="text-center mb-8">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/30 text-xs uppercase tracking-[0.25em] mb-4">{t("results.yourSkinScore")}</motion.p>
            <ScoreGauge score={analysis.overallScore} size={200} strokeWidth={10} delay={0.3} />
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-5 grid grid-cols-2 gap-3">
              <GlassCard className="p-4 text-center">
                <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-1.5">{t("results.skinAge")}</p>
                <p className="font-display text-3xl text-white">{analysis.skinAge}</p>
                <p className={`text-[11px] mt-1 flex items-center justify-center gap-1 ${ageDiffColor}`}>{ageDiffIcon}{ageDiffText}</p>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-1.5">{t("results.focusArea")}</p>
                <p className="font-display text-lg text-white leading-tight">{analysis.priorityConcern.name}</p>
                <p className="text-[11px] mt-1.5" style={{ color: getSeverityColor(analysis.priorityConcern.score) }}>{t("results.overallScore")} {analysis.priorityConcern.score}</p>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-white">{t("results.detailedAnalysis")}</h2>
          <span className="text-white/25 text-[10px] uppercase tracking-wider">8 {t("results.parameters")}</span>
        </div>
        <div className="space-y-2.5">
          {analysis.parameters.map((param, i) => (
            <ParameterCard key={param.id} parameter={param} index={i} isPriority={param.id === analysis.priorityConcern.id} isStrength={param.id === analysis.topStrength.id} />
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-white">{t("results.recommendedForYou")}</h2>
          <span className="text-white/25 text-[10px] uppercase tracking-wider">{selectedTreatments.length} {t("results.selected")}</span>
        </div>
        <p className="text-white/45 text-sm mb-4">{t("results.recDesc")}</p>
        <div className="space-y-3">
          {analysis.recommendations.map((treatment, i) => (
            <RecommendationCard key={treatment.id} treatment={treatment} index={i} selected={selectedTreatments.includes(treatment.id)} onSelect={() => toggleTreatment(treatment.id)} />
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-surface via-surface/95 to-transparent pt-8 pb-6 px-4" style={{ paddingBottom: "max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))" }}>
        <div className="max-w-lg mx-auto space-y-2.5">
          <Link href="/book">
            <Button glow className="w-full" size="lg">
              <Calendar className="mr-2 h-5 w-5" />
              {t("results.bookConsultation")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/report">
            <Button variant="secondary" className="w-full">
              <Download className="mr-2 h-5 w-5" />
              {t("results.viewReport")}
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

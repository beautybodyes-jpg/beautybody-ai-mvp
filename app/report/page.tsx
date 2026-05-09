"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Printer, ArrowLeft, Sparkles, MapPin, Phone, Mail, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalysis } from "@/context/analysis-context";
import { useLanguage } from "@/hooks/use-language";
import { getSeverityColor, getSeverityLabel } from "@/lib/utils";

export default function ReportPage() {
  const router = useRouter();
  const { analysis } = useAnalysis();
  const { t, getSeverityTranslation, lang } = useLanguage();
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!analysis) router.replace("/");
  }, [analysis, router]);

  const handlePrint = () => window.print();
  if (!analysis) return null;

  const reportDate = new Date(analysis.createdAt).toLocaleDateString(lang === "es" ? "es-ES" : lang === "ru" ? "ru-RU" : "en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-24 safe-area-x">
      <div className="no-print flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back")}
        </Button>
        <Button variant="secondary" size="sm" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          {t("report.savePdf")}
        </Button>
      </div>

      <motion.div ref={reportRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white text-stone-900 rounded-2xl overflow-hidden shadow-2xl print:shadow-none print:rounded-none">
        <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white p-8 text-center print:bg-stone-900">
          <div className="flex items-center justify-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-champagne-400" strokeWidth={1.5} />
            <span className="font-display text-2xl tracking-tight">{t("common.brand")}</span>
          </div>
          <h1 className="font-display text-3xl mb-2">{t("report.yourSkinAnalysis")}</h1>
          <p className="text-white/50 text-sm">{t("report.visualAssessment")}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-champagne-500/15 text-champagne-400 text-xs border border-champagne-500/10">
            <Calendar className="w-3 h-3" />
            {reportDate}
          </div>
        </div>

        <div className="p-8 text-center border-b border-stone-100">
          <div className="relative w-36 h-36 mx-auto mb-5">
            <svg width="144" height="144" className="-rotate-90">
              <circle cx="72" cy="72" r="62" fill="none" stroke="#f5f5f4" strokeWidth="8" />
              <circle cx="72" cy="72" r="62" fill="none" stroke={getSeverityColor(analysis.overallScore)} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(analysis.overallScore / 100) * 389} 389`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-4xl font-bold text-stone-900">{analysis.overallScore}</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold mt-0.5" style={{ color: getSeverityColor(analysis.overallScore) }}>{getSeverityTranslation(getSeverityLabel(analysis.overallScore).toLowerCase().replace(/\s+/g, ""))}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
              <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-1">{t("results.skinAge")}</p>
              <p className="font-display text-xl text-stone-900">{analysis.skinAge}</p>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
              <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-1">{t("results.actualAge")}</p>
              <p className="font-display text-xl text-stone-900">{analysis.chronologicalAge}</p>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
              <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-1">{t("results.parameters")}</p>
              <p className="font-display text-xl text-stone-900">8</p>
            </div>
          </div>
        </div>

        <div className="p-8 border-b border-stone-100">
          <h2 className="font-display text-lg text-stone-900 mb-5">{t("report.detailedResults")}</h2>
          <div className="space-y-3.5">
            {analysis.parameters.map((param) => (
              <div key={param.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-stone-700 text-sm font-medium">{param.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold tabular-nums" style={{ color: getSeverityColor(param.score) }}>{param.score}</span>
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: `${getSeverityColor(param.score)}12`, color: getSeverityColor(param.score) }}>{getSeverityTranslation(getSeverityLabel(param.score).toLowerCase().replace(/\s+/g, ""))}</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${param.score}%`, backgroundColor: getSeverityColor(param.score) }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 border-b border-stone-100">
          <h2 className="font-display text-lg text-stone-900 mb-4">{t("report.recommendedTreatments")}</h2>
          <div className="space-y-3">
            {analysis.recommendations.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                <h3 className="font-medium text-stone-900 text-sm">{t.name}</h3>
                <p className="text-stone-500 text-sm mt-1 leading-relaxed">{t.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-stone-400">
                  <span>{t.duration}</span>
                  <span>{t.priceRange}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-stone-50">
          <div className="flex items-start gap-6">
            <div className="shrink-0">
              <div className="w-24 h-24 bg-white rounded-xl border border-stone-200 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-6 h-6 text-stone-300 mx-auto mb-1" />
                  <p className="text-[8px] text-stone-400 uppercase tracking-wider">{t("report.scanToBook")}</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-champagne-600" strokeWidth={1.5} />
                <span className="font-display text-lg text-stone-900">{t("common.brand")}</span>
              </div>
              <p className="text-stone-500 text-sm mb-4 leading-relaxed">{t("report.aboutDesc")}</p>
              <div className="space-y-2 text-sm text-stone-500">
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" /><span>Lloret de Mar / Barcelona</span></div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" /><span>+34 603 847 323</span></div>
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" /><span>beautybodyes@gmail.com</span></div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-stone-200">
            <p className="text-stone-400 text-[10px] leading-relaxed">{t("report.disclaimer")}</p>
          </div>
        </div>
      </motion.div>

      <div className="no-print mt-6 text-center">
        <Button onClick={handlePrint} glow className="w-full max-w-xs">
          <Printer className="mr-2 h-5 w-5" />
          {t("report.savePdf")}
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Check, AlertTriangle, Camera, FileText, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { useAnalysis } from "@/context/analysis-context";
import { useLanguage } from "@/hooks/use-language";

const AGE_RANGES = [
  { value: "18-24", label: "18 – 24" },
  { value: "25-34", label: "25 – 34" },
  { value: "35-44", label: "35 – 44" },
  { value: "45-54", label: "45 – 54" },
  { value: "55+", label: "55+" },
];

export default function ConsentPage() {
  const router = useRouter();
  const { setSession } = useAnalysis();
  const { t } = useLanguage();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ageRange, setAgeRange] = useState("25-34");

  const consentItems = [
    { id: "analysis", icon: <Camera className="w-4 h-4" />, required: true },
    { id: "notMedical", icon: <AlertTriangle className="w-4 h-4" />, required: true },
    { id: "privacy", icon: <FileText className="w-4 h-4" />, required: true },
    { id: "simulation", icon: <Shield className="w-4 h-4" />, required: true },
    { id: "marketing", icon: <Lock className="w-4 h-4" />, required: false },
  ];

  const allRequiredChecked = consentItems.filter((c) => c.required).every((c) => checked[c.id]);
  const checkedCount = consentItems.filter((c) => c.required).filter((c) => checked[c.id]).length;
  const requiredCount = consentItems.filter((c) => c.required).length;

  const handleToggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleContinue = () => {
    setSession({
      ageRange,
      skinType: "combination",
      consentGiven: true,
      consentVersion: "v1.0-demo",
    });
    router.push("/scan");
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 safe-area-x">
      <div className="flex items-center gap-2 mb-8">
        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-champagne-500 rounded-full"
            animate={{ width: `${(checkedCount / requiredCount) * 33}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-white/30 text-[10px] uppercase tracking-wider shrink-0">
          {t("consent.stepLabel")}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-champagne-500/10 flex items-center justify-center mx-auto mb-4 border border-champagne-500/10">
            <Shield className="w-7 h-7 text-champagne-400" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-2xl text-white mb-2">{t("consent.title")}</h1>
          <p className="text-white/45 text-sm max-w-xs mx-auto">
            {t("consent.desc")}
          </p>
        </div>

        <div className="mb-6">
          <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3 block">
            {t("consent.ageLabel")}
          </label>
          <div className="flex flex-wrap gap-2">
            {AGE_RANGES.map((age) => (
              <button
                key={age.value}
                onClick={() => setAgeRange(age.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px] ${
                  ageRange === age.value
                    ? "bg-champagne-500 text-stone-900 shadow-[0_0_16px_rgba(201,169,110,0.2)]"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/5"
                }`}
              >
                {age.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5 mb-8">
          {consentItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => handleToggle(item.id)}
              className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.04] bg-white/[0.015] cursor-pointer hover:bg-white/[0.03] active:bg-white/[0.05] transition-colors min-h-[44px]"
            >
              <div
                className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                  checked[item.id]
                    ? "bg-champagne-500 border-champagne-500 text-stone-900"
                    : "border-white/15"
                }`}
              >
                {checked[item.id] && <Check className="w-4 h-4" strokeWidth={2.5} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-champagne-400/60">{item.icon}</span>
                  {item.required ? (
                    <span className="text-[9px] uppercase tracking-wider text-white/25 font-medium">{t("consent.required")}</span>
                  ) : (
                    <span className="text-[9px] uppercase tracking-wider text-white/20 font-medium">{t("consent.optional")}</span>
                  )}
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  {t(`consent.consentItems.${i}`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!allRequiredChecked}
          glow
          className="w-full"
          size="lg"
        >
          {t("consent.cta")}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>

        <p className="text-center text-white/25 text-xs mt-4 leading-relaxed">
          {t("consent.footer")}
        </p>
      </motion.div>
    </div>
  );
}

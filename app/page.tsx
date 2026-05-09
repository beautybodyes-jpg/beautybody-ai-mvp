"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Shield, Zap, Award, ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { useLanguage } from "@/hooks/use-language";

export default function LandingPage() {
  const { t } = useLanguage();

  const features = [
    { icon: <Zap className="w-5 h-5" strokeWidth={1.5} />, title: t("landing.feature1Title"), desc: t("landing.feature1Desc") },
    { icon: <Shield className="w-5 h-5" strokeWidth={1.5} />, title: t("landing.feature2Title"), desc: t("landing.feature2Desc") },
    { icon: <Award className="w-5 h-5" strokeWidth={1.5} />, title: t("landing.feature3Title"), desc: t("landing.feature3Desc") },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-champagne-900/8 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-champagne-500/4 rounded-full blur-3xl pointer-events-none -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-champagne-500/3 rounded-full blur-3xl pointer-events-none translate-y-1/4" />

      <div className="max-w-lg mx-auto px-4 py-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-champagne-400/15 to-champagne-600/5 flex items-center justify-center mx-auto mb-6 border border-champagne-500/15 shadow-[0_0_40px_rgba(201,169,110,0.08)]"
          >
            <Sparkles className="w-10 h-10 text-champagne-400" strokeWidth={1.5} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-champagne-400/70 text-xs uppercase tracking-[0.25em] font-medium mb-3"
          >
            {t("landing.subtitle")}
          </motion.p>

          <h1 className="font-display text-[2.5rem] leading-[1.1] text-white mb-4">
            {t("landing.heroTitle1")}
            <br />
            <span className="text-champagne-400">{t("landing.heroTitle2")}</span>
          </h1>

          <p className="text-white/50 text-base leading-relaxed max-w-xs mx-auto mb-8">
            {t("landing.heroDesc")}
          </p>

          <div className="flex flex-col items-center gap-3">
            <Link href="/consent" className="w-full max-w-xs">
              <Button size="lg" glow className="w-full">
                {t("landing.ctaPrimary")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-white/25 text-[11px]">
              {t("common.demoMode")} — {t("common.notMedical")}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-champagne-200 to-champagne-600 border-2 border-surface flex items-center justify-center"
              >
                <span className="text-[10px] font-bold text-stone-900">
                  {["M", "A", "S", "L"][i - 1]}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3 h-3 text-champagne-400 fill-champagne-400" />
              ))}
            </div>
            <span className="text-white/45 text-xs">
              <span className="text-white font-medium">12,000+</span> {t("landing.socialProof")}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-10"
        >
          <GlassCard className="p-5">
            <p className="text-white/60 text-sm leading-relaxed italic mb-4">
              &ldquo;{t("landing.testimonialQuote")}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-champagne-500/15 flex items-center justify-center">
                <span className="text-champagne-400 text-xs font-bold">{t("landing.testimonialName")[0]}</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{t("landing.testimonialName")}</p>
                <p className="text-white/35 text-xs">{t("landing.testimonialDetail")}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3 mb-10"
        >
          <p className="text-white/30 text-xs uppercase tracking-[0.2em] font-medium text-center mb-4">
            {t("landing.whyTitle")}
          </p>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <GlassCard className="p-4 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-champagne-500/8 flex items-center justify-center shrink-0 text-champagne-400">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">{feature.title}</h3>
                  <p className="text-white/45 text-xs mt-1 leading-relaxed">{feature.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center pb-4"
        >
          <p className="text-white/40 text-sm mb-4">
            {t("landing.readyText")}
          </p>
          <Link href="/consent" className="w-full max-w-xs inline-block">
            <Button variant="outline" className="w-full">
              {t("landing.ctaSecondary")}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center pb-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/15" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

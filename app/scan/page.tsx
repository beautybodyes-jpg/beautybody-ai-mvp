"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, Sun, Sparkles, User } from "lucide-react";
import { CameraCapture } from "@/components/analysis/camera-capture";
import { useAnalysis } from "@/context/analysis-context";
import { useLanguage } from "@/hooks/use-language";

export default function ScanPage() {
  const router = useRouter();
  const { session, setCapturedImage } = useAnalysis();
  const { t } = useLanguage();

  useEffect(() => {
    if (!session) {
      router.replace("/consent");
    }
  }, [session, router]);

  const handleCapture = (imageUrl: string, _file: File) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
    setCapturedImage(imageUrl);
    router.push("/processing");
  };

  if (!session) return null;

  const tips = [
    { icon: <Sparkles className="w-4 h-4" />, text: t("scan.tip1") },
    { icon: <Sun className="w-4 h-4" />, text: t("scan.tip2") },
    { icon: <User className="w-4 h-4" />, text: t("scan.tip3") },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-6 safe-area-x">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-champagne-500 rounded-full w-[66%]" />
        </div>
        <span className="text-white/30 text-[10px] uppercase tracking-wider shrink-0">
          {t("scan.stepLabel")}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="w-12 h-12 rounded-xl bg-champagne-500/10 flex items-center justify-center mx-auto mb-3 border border-champagne-500/10">
          <Camera className="w-6 h-6 text-champagne-400" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-2xl text-white mb-1.5">{t("scan.title")}</h1>
        <p className="text-white/45 text-sm max-w-xs mx-auto">
          {t("scan.desc")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <CameraCapture onCapture={handleCapture} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 space-y-3"
      >
        <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium text-center mb-3">
          {t("scan.tipLabel")}
        </p>
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex items-center gap-3 text-white/40 text-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-champagne-400/60">
              {tip.icon}
            </div>
            <span>{tip.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

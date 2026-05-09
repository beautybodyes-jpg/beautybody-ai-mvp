"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ProcessingAnimation } from "@/components/analysis/processing-animation";
import { useAnalysis } from "@/context/analysis-context";
import { useLanguage } from "@/hooks/use-language";
import { hashImage, generateMockAnalysis } from "@/lib/mock-analysis";

export default function ProcessingPage() {
  const router = useRouter();
  const { capturedImage, session, setAnalysis } = useAnalysis();
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (!capturedImage || !session) {
      router.replace("/consent");
    }
  }, [capturedImage, session, router]);

  const handleComplete = useCallback(async () => {
    if (!capturedImage || !session) return;

    try {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      const imageHash = await hashImage(file);

      const ageMap: Record<string, number> = {
        "18-24": 22,
        "25-34": 30,
        "35-44": 40,
        "45-54": 50,
        "55+": 60,
      };
      const chronologicalAge = ageMap[session.ageRange] || 30;

      const result = generateMockAnalysis(imageHash, chronologicalAge);
      setAnalysis(result);
      router.push("/results");
    } catch {
      router.push("/scan");
    }
  }, [capturedImage, session, setAnalysis, router]);

  if (!capturedImage || !session) return null;

  const stepLabels = [
    t("processing.steps.0"),
    t("processing.steps.1"),
    t("processing.steps.2"),
    t("processing.steps.3"),
    t("processing.steps.4"),
    t("processing.steps.5"),
    t("processing.steps.6"),
    t("processing.steps.7"),
  ];

  const regionLabels = [
    t("processing.regions.0"),
    t("processing.regions.1"),
    t("processing.regions.2"),
    t("processing.regions.3"),
    t("processing.regions.4"),
    t("processing.regions.5"),
    t("processing.regions.6"),
    t("processing.regions.7"),
  ];

  const steps = stepLabels.map((label, i) => ({
    label,
    duration: [1800, 2200, 2000, 2400, 1900, 2100, 1700, 2000][i],
    region: regionLabels[i],
  }));

  return (
    <div className="max-w-lg mx-auto px-4 safe-area-x">
      <ProcessingAnimation
        onComplete={handleComplete}
        steps={steps}
        percentLabel={t("processing.percentLabel")}
        scanningLabel={t("processing.scanning")}
        demoLabel={t("processing.demoLabel")}
      />
    </div>
  );
}

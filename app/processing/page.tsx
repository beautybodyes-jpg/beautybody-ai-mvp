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
  const { t } = useLanguage();

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

  return (
    <div className="max-w-lg mx-auto px-4 safe-area-x">
      <ProcessingAnimation
        onComplete={handleComplete}
        percentLabel={t("processing.percentLabel")}
        scanningLabel={t("processing.scanning")}
        demoLabel={t("processing.demoLabel")}
      />
    </div>
  );
}

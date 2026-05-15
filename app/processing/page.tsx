"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ProcessingAnimation } from "@/components/analysis/processing-animation";
import { useAnalysis } from "@/context/analysis-context";
import { useLanguage } from "@/hooks/use-language";
import { hashImage, generateMockAnalysis } from "@/lib/mock-analysis";

function dataUrlToFile(dataUrl: string, filename: string): File | null {
  try {
    const arr = dataUrl.split(",");
    if (arr.length < 2) return null;
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  } catch {
    return null;
  }
}

export default function ProcessingPage() {
  const router = useRouter();
  const { capturedImage, capturedFile, session, setAnalysis } = useAnalysis();
  const { t } = useLanguage();

  useEffect(() => {
    if (!capturedImage || !session) {
      router.replace("/consent");
    }
  }, [capturedImage, session, router]);

  const handleComplete = useCallback(async () => {
    if (!capturedImage || !session) return;

    try {
      let file = capturedFile;

      if (!file && capturedImage.startsWith("data:")) {
        file = dataUrlToFile(capturedImage, "capture.jpg");
      }

      if (!file) {
        throw new Error("No image file available for analysis");
      }

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
    } catch (err) {
      if (typeof console !== "undefined") {
        // eslint-disable-next-line no-console
        console.error("Analysis processing error:", err);
      }
      router.push("/scan");
    }
  }, [capturedImage, capturedFile, session, setAnalysis, router]);

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

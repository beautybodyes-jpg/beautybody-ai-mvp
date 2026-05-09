"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnalysisResult, UserSession } from "@/types";

interface AnalysisContextType {
  session: UserSession | null;
  setSession: (s: UserSession) => void;
  capturedImage: string | null;
  setCapturedImage: (url: string | null) => void;
  analysis: AnalysisResult | null;
  setAnalysis: (a: AnalysisResult | null) => void;
  selectedTreatments: string[];
  setSelectedTreatments: (ids: string[]) => void;
  reset: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);

  const reset = useCallback(() => {
    setSession(null);
    setCapturedImage(null);
    setAnalysis(null);
    setSelectedTreatments([]);
  }, []);

  return (
    <AnalysisContext.Provider
      value={{
        session,
        setSession,
        capturedImage,
        setCapturedImage,
        analysis,
        setAnalysis,
        selectedTreatments,
        setSelectedTreatments,
        reset,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used within AnalysisProvider");
  return ctx;
}

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { type Lang, DEFAULT_LANG } from "@/lib/translations";

const STORAGE_KEY = "beautybody-lang";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ["en", "ru", "es"].includes(stored)) {
        setLangState(stored as Lang);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // localStorage not available
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguageContext must be used within LanguageProvider");
  return ctx;
}

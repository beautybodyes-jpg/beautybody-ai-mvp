"use client";

import { useState, useEffect, useCallback } from "react";
import { type Lang, DEFAULT_LANG, t, getParamTranslation, getTreatmentTranslation, getSeverityTranslation } from "@/lib/translations";

const STORAGE_KEY = "beautybody-lang";

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored && ["en", "ru", "es"].includes(stored)) {
      setLangState(stored as Lang);
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLang);
    }
  }, []);

  const translate = useCallback(
    (path: string) => t(lang, path),
    [lang]
  );

  return {
    lang,
    setLang,
    t: translate,
    getParamTranslation: (id: string) => getParamTranslation(lang, id),
    getTreatmentTranslation: (id: string) => getTreatmentTranslation(lang, id),
    getSeverityTranslation: (key: string) => getSeverityTranslation(lang, key),
    mounted,
  };
}

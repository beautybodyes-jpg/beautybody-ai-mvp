"use client";

import { useCallback } from "react";
import { useLanguageContext } from "@/context/language-context";
import { type Lang, t, getParamTranslation, getTreatmentTranslation, getSeverityTranslation } from "@/lib/translations";

export { type Lang } from "@/lib/translations";

export function useLanguage() {
  const { lang, setLang, mounted } = useLanguageContext();

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

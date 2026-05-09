"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Sparkles } from "lucide-react";
import { usePWA } from "@/hooks/use-pwa";

export function InstallPrompt() {
  const { installPrompt, isInstalled, promptInstall, dismissInstall } = usePWA();

  if (isInstalled || !installPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6"
        style={{ paddingBottom: "max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))" }}
      >
        <div className="max-w-lg mx-auto">
          <div className="relative bg-surface-light border border-champagne-500/20 rounded-2xl p-4 shadow-[0_0_40px_rgba(201,169,110,0.1)]">
            <button
              onClick={dismissInstall}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4 pr-8">
              <div className="w-12 h-12 rounded-xl bg-champagne-500/10 flex items-center justify-center shrink-0 border border-champagne-500/10">
                <Sparkles className="w-6 h-6 text-champagne-400" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium text-sm mb-1">
                  Install BeautyBody
                </h3>
                <p className="text-white/50 text-xs leading-relaxed mb-3">
                  Add to your home screen for instant access to skin analysis and booking.
                </p>
                <button
                  onClick={promptInstall}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-champagne-500 text-stone-900 rounded-xl text-sm font-medium hover:bg-champagne-400 active:scale-[0.97] transition-all min-h-[44px]"
                >
                  <Download className="w-4 h-4" />
                  Install App
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

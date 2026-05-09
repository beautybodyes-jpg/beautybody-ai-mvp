"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";
import { usePWA } from "@/hooks/use-pwa";

export function OfflineBanner() {
  const { isOffline } = usePWA();

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-xl"
          style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        >
          <div className="max-w-lg mx-auto px-4 py-2 flex items-center justify-center gap-2">
            <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-amber-400/80 text-xs font-medium">
              You're offline. Some features may be limited.
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

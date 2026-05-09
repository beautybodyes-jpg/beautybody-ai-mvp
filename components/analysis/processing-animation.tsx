"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProcessingStep {
  label: string;
  duration: number;
  region?: string;
}

const DEFAULT_STEPS: ProcessingStep[] = [
  { label: "Initializing scan protocol", duration: 1800, region: "Full face" },
  { label: "Mapping skin texture", duration: 2200, region: "T-zone & cheeks" },
  { label: "Analyzing hydration surface", duration: 2000, region: "Forehead" },
  { label: "Evaluating pigmentation", duration: 2400, region: "Cheekbones" },
  { label: "Measuring pore density", duration: 1900, region: "Nose area" },
  { label: "Assessing elasticity markers", duration: 2100, region: "Jawline" },
  { label: "Cross-referencing skin profile", duration: 1700, region: "Under-eye" },
  { label: "Generating personalized report", duration: 2000, region: "Complete" },
];

export interface ProcessingAnimationProps {
  onComplete?: () => void;
  steps?: ProcessingStep[];
  percentLabel?: string;
  scanningLabel?: string;
  demoLabel?: string;
}

export function ProcessingAnimation({
  onComplete,
  steps = DEFAULT_STEPS,
  percentLabel = "percent",
  scanningLabel = "Scanning",
  demoLabel = "Demo Simulation — Visual Assessment Only",
}: ProcessingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scanLineY, setScanLineY] = useState(0);

  const totalDuration = useMemo(() => steps.reduce((s, st) => s + st.duration, 0), [steps]);

  useEffect(() => {
    let stepIndex = 0;
    let totalElapsed = 0;
    const intervalMs = 50;

    const interval = setInterval(() => {
      totalElapsed += intervalMs;
      const pct = Math.min((totalElapsed / totalDuration) * 100, 100);
      setProgress(pct);
      setScanLineY(pct);

      const stepThreshold = steps.slice(0, stepIndex + 1).reduce((s, st) => s + st.duration, 0);
      if (totalElapsed >= stepThreshold && stepIndex < steps.length - 1) {
        stepIndex++;
        setCurrentStep(stepIndex);
      }

      if (totalElapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 600);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [totalDuration, onComplete, steps]);

  const currentRegion = steps[currentStep]?.region || "";

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-5 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-400/40 to-transparent pointer-events-none"
        style={{ top: `${scanLineY}%` }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Central scanner visualization */}
      <div className="relative w-56 h-56 mb-10">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-champagne-500/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          {[0, 90, 180, 270].map((deg) => (
            <div
              key={deg}
              className="absolute w-1.5 h-1.5 rounded-full bg-champagne-400/40"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${deg}deg) translateY(-108px) translateX(-50%)`,
              }}
            />
          ))}
        </motion.div>

        {/* Middle ring (counter-rotate) */}
        <motion.div
          className="absolute inset-4 rounded-full border border-white/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner pulse ring */}
        <motion.div
          className="absolute inset-8 rounded-full border border-champagne-500/20"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Face outline */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-24 h-32 rounded-full border-2 border-dashed border-champagne-400/20"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        {/* Progress percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-display text-5xl font-bold text-champagne-400 tabular-nums"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {Math.round(progress)}
          </motion.span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1">
            {percentLabel}
          </span>
        </div>
      </div>

      {/* Current region badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRegion}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mb-6 px-4 py-1.5 rounded-full border border-champagne-500/15 bg-champagne-500/5"
        >
          <span className="text-xs text-champagne-400/80 tracking-wide">
            {scanningLabel}: {currentRegion}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Steps list */}
      <div className="w-full max-w-xs space-y-2.5">
        {steps.map((step, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;
          const isPending = i > currentStep;

          return (
            <motion.div
              key={step.label}
              initial={false}
              animate={{
                opacity: isPending ? 0.25 : 1,
                x: 0,
              }}
              className="flex items-center gap-3"
            >
              <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                {isDone && (
                  <motion.svg
                    className="w-4 h-4 text-champagne-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
                {isActive && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-champagne-400"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
                {isPending && <div className="w-1.5 h-1.5 rounded-full bg-white/15" />}
              </div>
              <span
                className={`text-sm transition-colors duration-300 ${
                  isActive
                    ? "text-white font-medium"
                    : isDone
                    ? "text-white/60"
                    : "text-white/30"
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mt-6 h-0.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-champagne-600 to-champagne-400 rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ type: "tween", ease: "linear", duration: 0.05 }}
        />
      </div>

      {/* Demo label */}
      <motion.p
        className="mt-8 text-[10px] text-white/25 uppercase tracking-[0.2em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {demoLabel}
      </motion.p>
    </div>
  );
}

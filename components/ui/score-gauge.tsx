"use client";

import { motion } from "framer-motion";
import { getSeverityColor, getSeverityLabel } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  delay?: number;
}

const CIRCUMFERENCE = 440; // 2 * PI * 70

export function ScoreGauge({
  score,
  size = 220,
  strokeWidth = 12,
  showLabel = true,
  delay = 0,
}: ScoreGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const color = getSeverityColor(score);
  const label = getSeverityLabel(score);

  return (
    <div 
      className="relative inline-flex items-center justify-center" 
      style={{ width: size, height: size }}
    >
      {/* Glow ring behind */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          boxShadow: `0 0 60px ${color}15`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 1 }}
      />

      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ 
            duration: 1.8, 
            delay, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          style={{ filter: `drop-shadow(0 0 10px ${color}30)` }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-display text-5xl font-bold text-white tabular-nums"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.7, 
            delay: delay + 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {score}
        </motion.span>
        {showLabel && (
          <motion.span
            className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.15em]"
            style={{ color }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.8, duration: 0.5 }}
          >
            {label}
          </motion.span>
        )}
      </div>
    </div>
  );
}

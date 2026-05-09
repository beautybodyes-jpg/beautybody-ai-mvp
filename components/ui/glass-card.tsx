"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  active = false,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      whileHover={hover && !onClick ? { y: -3, transition: { duration: 0.25 } } : undefined}
      onClick={onClick}
      className={cn(
        "relative rounded-2xl border backdrop-blur-xl transition-colors duration-300",
        "border-white/[0.06] bg-white/[0.025]",
        hover && "hover:border-white/[0.12] hover:bg-white/[0.04]",
        active && "border-champagne-500/30 bg-champagne-500/[0.04]",
        glow && "shadow-[0_0_30px_rgba(201,169,110,0.06)]",
        glow && active && "shadow-[0_0_40px_rgba(201,169,110,0.12)]",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

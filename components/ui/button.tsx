"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary:
    "bg-champagne-500 text-black hover:bg-champagne-400",
  secondary:
    "bg-white/10 text-white border border-white/10 hover:bg-white/15",
  ghost:
    "bg-transparent text-white hover:bg-white/5",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  glow = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 min-h-[44px]",
        variants[variant],
        sizes[size],
        glow &&
          "shadow-[0_0_24px_rgba(201,169,110,0.25)] hover:shadow-[0_0_32px_rgba(201,169,110,0.35)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

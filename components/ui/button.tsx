"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  glow?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  glow = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400/50 disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation";

  const variants = {
    primary:
      "bg-champagne-500 text-stone-900 hover:bg-champagne-400 active:bg-champagne-600",
    secondary:
      "bg-white/10 text-white hover:bg-white/15 active:bg-white/20 backdrop-blur-sm border border-white/10",
    ghost: "text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10",
    outline:
      "border border-white/20 text-white hover:bg-white/5 hover:border-white/30 active:bg-white/10",
  };

  const sizes = {
    sm: "px-5 py-3 text-sm min-h-[44px]",
    md: "px-6 py-3.5 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[52px]",
  };

  return (
    <motion.button
      type={props.type || "button"}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        glow &&
          "shadow-[0_0_24px_rgba(201,169,110,0.2)] hover:shadow-[0_0_36px_rgba(201,169,110,0.3)]",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />
      ) : null}
      {children}
    </motion.button>
  );
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ─── Severity Helpers ─── */

const SEVERITY_THRESHOLDS = [
  { min: 90, label: "Excellent", color: "#10b981", className: "text-score-excellent" },
  { min: 75, label: "Good", color: "#14b8a6", className: "text-score-good" },
  { min: 60, label: "Fair", color: "#f59e0b", className: "text-score-fair" },
  { min: 40, label: "Needs Attention", color: "#f97316", className: "text-score-attention" },
  { min: 0, label: "Priority", color: "#f43f5e", className: "text-score-priority" },
] as const;

function getSeverityEntry(score: number) {
  return SEVERITY_THRESHOLDS.find((t) => score >= t.min) ?? SEVERITY_THRESHOLDS[SEVERITY_THRESHOLDS.length - 1];
}

export function getSeverityLabel(score: number): string {
  return getSeverityEntry(score).label;
}

export function getSeverityColor(score: number): string {
  return getSeverityEntry(score).color;
}

export function getSeverityClass(score: number): string {
  return getSeverityEntry(score).className;
}

/* ─── ID Generator ─── */

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

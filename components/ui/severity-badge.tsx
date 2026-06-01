"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — SeverityBadge
 *
 * Drop this file into your project at components/ui/severity-badge.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

type Severity = "low" | "critical" | "high" | "medium" | "info";

export interface SeverityBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  severity: Severity;
  score?:   number;
}

type SeverityConfig = {
  label:  string;
  bg:     string;
  accent: string;
  text:   string;
};

const SEVERITY: Record<Severity, SeverityConfig> = {
  low: {
    label:  "Low",
    bg:     "bg-s4e-scale-green-50",
    accent: "border-l-[3px] border-s4e-scale-green-500",
    text:   "text-s4e-scale-green-600",
  },
  critical: {
    label:  "Critical",
    bg:     "bg-s4e-scale-purple-50",
    accent: "border-l-[3px] border-s4e-scale-purple-500",
    text:   "text-s4e-scale-purple-600",
  },
  high: {
    label:  "High",
    bg:     "bg-s4e-scale-red-50",
    accent: "border-l-[3px] border-s4e-scale-red-500",
    text:   "text-s4e-scale-red-600",
  },
  medium: {
    label:  "Medium",
    bg:     "bg-s4e-scale-yellow-50",
    accent: "border-l-[3px] border-s4e-scale-yellow-500",
    text:   "text-s4e-scale-yellow-700",
  },
  info: {
    label:  "Info",
    bg:     "bg-s4e-scale-blue-50",
    accent: "border-l-[3px] border-s4e-scale-blue-500",
    text:   "text-s4e-scale-blue-600",
  },
};

const BASE = "flex items-center rounded-md px-3 py-1.5 w-40";

export const SeverityBadge = React.forwardRef<HTMLDivElement, SeverityBadgeProps>(
  ({ severity, score, className, ...props }, ref) => {
    const cfg = SEVERITY[severity];
    return (
      <div
        ref={ref}
        className={cn(
          BASE,
          score !== undefined ? "justify-between" : "",
          cfg.bg,
          cfg.accent,
          className,
        )}
        {...props}
      >
        <span className={cn("text-sm font-medium", cfg.text)}>{cfg.label}</span>
        {score !== undefined && (
          <span className={cn("text-sm font-normal opacity-80", cfg.text)}>{score}</span>
        )}
      </div>
    );
  },
);
SeverityBadge.displayName = "SeverityBadge";

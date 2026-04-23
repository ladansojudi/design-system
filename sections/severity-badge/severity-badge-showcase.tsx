"use client";

import type React from "react";
import { cn } from "@/lib/utils";

// ── Types & config ─────────────────────────────────────────────────────────

type Severity = "low" | "critical" | "high" | "medium" | "info";

type SeverityConfig = {
  label: string;
  bg: string;
  accent: string;
  text: string;
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

const SEVERITIES: Severity[] = ["low", "critical", "high", "medium", "info"];

// ── Badge component ────────────────────────────────────────────────────────

function SeverityBadge({
  severity,
  score,
}: {
  severity: Severity;
  score?: number;
}) {
  const cfg = SEVERITY[severity];
  return (
    <div
      className={cn(
        "flex items-center rounded-md px-3 py-1.5 w-40",
        score !== undefined ? "justify-between" : "",
        cfg.bg,
        cfg.accent,
      )}
    >
      <span className={cn("text-sm font-medium", cfg.text)}>{cfg.label}</span>
      {score !== undefined && (
        <span className={cn("text-sm font-normal opacity-80", cfg.text)}>{score}</span>
      )}
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

export function SeverityBadgeShowcase() {
  return (
    <div className="space-y-10">
      {/* Variants */}
      <div>
        <SectionTitle>Variants</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Label only */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-3">
                Label
              </p>
              <div className="space-y-2">
                {SEVERITIES.map((s) => (
                  <SeverityBadge key={s} severity={s} />
                ))}
              </div>
            </div>

            {/* Label + score */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-3">
                Label + Score
              </p>
              <div className="space-y-2">
                {SEVERITIES.map((s) => (
                  <SeverityBadge key={s} severity={s} score={8.4} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

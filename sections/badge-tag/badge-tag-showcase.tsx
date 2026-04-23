"use client";

import type React from "react";
import { cn } from "@/lib/utils";

// ── Types & config ─────────────────────────────────────────────────────────

type BadgeColor = "warning" | "error" | "success" | "neutral" | "info" | "primary";
type DotPosition = "left" | "right";

type BadgeConfig = {
  label: string;
  bg: string;
  text: string;
  dot: string;
  border: string;
};

const BADGE_COLORS: Record<BadgeColor, BadgeConfig> = {
  warning: {
    label:  "Warning",
    bg:     "bg-s4e-scale-yellow-50",
    text:   "text-s4e-scale-yellow-700",
    dot:    "bg-s4e-scale-yellow-500",
    border: "border-s4e-scale-yellow-300",
  },
  error: {
    label:  "Error",
    bg:     "bg-s4e-scale-red-50",
    text:   "text-s4e-scale-red-600",
    dot:    "bg-s4e-scale-red-500",
    border: "border-s4e-scale-red-300",
  },
  success: {
    label:  "Success",
    bg:     "bg-s4e-scale-green-50",
    text:   "text-s4e-scale-green-600",
    dot:    "bg-s4e-scale-green-500",
    border: "border-s4e-scale-green-300",
  },
  neutral: {
    label:  "Neutral",
    bg:     "bg-s4e-neutral-grey-100",
    text:   "text-s4e-text-secondary",
    dot:    "bg-s4e-neutral-grey-400",
    border: "border-s4e-neutral-divider-10",
  },
  info: {
    label:  "Info",
    bg:     "bg-s4e-scale-blue-50",
    text:   "text-s4e-scale-blue-600",
    dot:    "bg-s4e-scale-blue-500",
    border: "border-s4e-scale-blue-300",
  },
  primary: {
    label:  "Primary",
    bg:     "bg-s4e-btn-primary-50",
    text:   "text-s4e-btn-primary-600",
    dot:    "bg-s4e-btn-primary-600",
    border: "border-s4e-btn-primary-600",
  },
};

const ALL_COLORS: BadgeColor[] = ["warning", "error", "success", "neutral", "info", "primary"];

// ── Badge component ────────────────────────────────────────────────────────

function Badge({
  color,
  showDot = true,
  dotPosition = "left",
  outlined = false,
}: {
  color: BadgeColor;
  showDot?: boolean;
  dotPosition?: DotPosition;
  outlined?: boolean;
}) {
  const cfg = BADGE_COLORS[color];
  const dot = (
    <span className={cn("inline-block w-[7px] h-[7px] rounded-full shrink-0", cfg.dot)} />
  );

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium",
        outlined
          ? cn("border bg-transparent", cfg.border, cfg.text)
          : cn(cfg.bg, cfg.text),
      )}
    >
      {showDot && dotPosition === "left" && dot}
      <span>{cfg.label}</span>
      {showDot && dotPosition === "right" && dot}
    </div>
  );
}

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

export function BadgeTagShowcase() {
  return (
    <div className="space-y-10">

      {/* With dot */}
      <div>
        <SectionTitle>With Dot</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Dot left */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-3">
                Dot Left
              </p>
              <div className="space-y-2">
                {ALL_COLORS.map((c) => (
                  <div key={c}>
                    <Badge color={c} showDot dotPosition="left" />
                  </div>
                ))}
              </div>
            </div>

            {/* Dot right */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-3">
                Dot Right
              </p>
              <div className="space-y-2">
                {ALL_COLORS.map((c) => (
                  <div key={c}>
                    <Badge color={c} showDot dotPosition="right" outlined />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Without dot */}
      <div>
        <SectionTitle>Without Dot</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Filled */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-3">
                Filled
              </p>
              <div className="space-y-2">
                {ALL_COLORS.map((c) => (
                  <div key={c}>
                    <Badge color={c} showDot={false} />
                  </div>
                ))}
              </div>
            </div>

            {/* Outlined */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-3">
                Outlined
              </p>
              <div className="space-y-2">
                {ALL_COLORS.map((c) => (
                  <div key={c}>
                    <Badge color={c} showDot={false} outlined />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

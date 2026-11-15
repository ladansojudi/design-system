"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Gauge
 *
 * Drop this file into your project at components/ui/gauge.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

type GaugeColor = "blue" | "green" | "yellow" | "red" | "brand";

export interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value:  number;
  max?:   number;
  color?: GaugeColor;
}

const TRACK_STROKE: Record<GaugeColor, string> = {
  blue:   "stroke-snt-scale-blue-100",
  green:  "stroke-snt-scale-green-100",
  yellow: "stroke-snt-scale-yellow-100",
  red:    "stroke-snt-scale-red-100",
  brand:  "stroke-snt-brand-primary-100",
};

const FILL_STROKE: Record<GaugeColor, string> = {
  blue:   "stroke-snt-scale-blue-500",
  green:  "stroke-snt-scale-green-500",
  yellow: "stroke-snt-scale-yellow-500",
  red:    "stroke-snt-scale-red-500",
  brand:  "stroke-snt-brand-primary-500",
};

export const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
  ({ value, max = 100, color = "blue", className, ...props }, ref) => {
    const clamped = Math.max(0, Math.min(value, max));
    const pct     = max > 0 ? clamped / max : 0;

    const W  = 170;
    const H  = 96;
    const cx = W / 2;
    const cy = H - 10;
    const r  = 70;
    const sw = 12;

    const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
    const pathLen = Math.PI * r;
    const drawn   = pct * pathLen;

    return (
      <div
        ref={ref}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={clamped}
        aria-valuetext={`${value} out of ${max}`}
        aria-label={props["aria-label"] ?? "Score"}
        className={cn("relative flex w-[170px] flex-col items-center", className)}
        {...props}
      >
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} overflow="visible" aria-hidden>
          <path d={arcPath} fill="none" strokeWidth={sw} strokeLinecap="round" className={TRACK_STROKE[color]} />
          {pct > 0 && (
            <path
              d={arcPath}
              fill="none"
              strokeWidth={sw}
              strokeLinecap="round"
              strokeDasharray={`${drawn} ${pathLen * 2}`}
              strokeDashoffset={drawn}
              className={cn(FILL_STROKE[color], "[animation:snt-gauge-draw_1.1s_ease-out_forwards] motion-reduce:[animation:none] motion-reduce:[stroke-dashoffset:0]")}
            />
          )}
        </svg>

        <div className="absolute inset-x-0 bottom-0 text-center leading-none">
          <span className="text-snt-24 font-semibold tracking-tight tabular-nums text-snt-text-primary">{value}</span>
          <span className="ml-1 text-snt-12 text-snt-text-secondary">/ {max}</span>
        </div>
      </div>
    );
  },
);
Gauge.displayName = "Gauge";

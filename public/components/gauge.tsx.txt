"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Gauge
 *
 * Drop this file into your project at components/ui/gauge.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

type GaugeColor = "blue" | "green" | "yellow" | "red" | "purple";

export interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value:  number;
  max?:   number;
  color?: GaugeColor;
}

const TRACK_STROKE: Record<GaugeColor, string> = {
  blue:   "stroke-s4e-scale-blue-100",
  green:  "stroke-s4e-scale-green-100",
  yellow: "stroke-s4e-scale-yellow-100",
  red:    "stroke-s4e-scale-red-100",
  purple: "stroke-s4e-scale-purple-100",
};

const FILL_STROKE: Record<GaugeColor, string> = {
  blue:   "stroke-s4e-scale-blue-500",
  green:  "stroke-s4e-scale-green-500",
  yellow: "stroke-s4e-scale-yellow-500",
  red:    "stroke-s4e-scale-red-500",
  purple: "stroke-s4e-scale-purple-500",
};

const TICK_LIGHT_STROKE: Record<GaugeColor, string> = {
  blue:   "stroke-s4e-scale-blue-200",
  green:  "stroke-s4e-scale-green-200",
  yellow: "stroke-s4e-scale-yellow-200",
  red:    "stroke-s4e-scale-red-200",
  purple: "stroke-s4e-scale-purple-200",
};

const TICK_DARK_STROKE: Record<GaugeColor, string> = {
  blue:   "stroke-s4e-scale-blue-600",
  green:  "stroke-s4e-scale-green-600",
  yellow: "stroke-s4e-scale-yellow-600",
  red:    "stroke-s4e-scale-red-600",
  purple: "stroke-s4e-scale-purple-600",
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcSegment(cx: number, cy: number, r: number, centerDeg: number, spanDeg: number) {
  const p0 = polar(cx, cy, r, centerDeg - spanDeg / 2);
  const p1 = polar(cx, cy, r, centerDeg + spanDeg / 2);
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 0 1 ${p1.x} ${p1.y}`;
}

export const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
  ({ value, max = 100, color = "blue", className, ...props }, ref) => {
    const clamped = Math.max(0, Math.min(value, max));
    const pct     = clamped / max;

    const W  = 170;
    const H  = 104;
    const cx = W / 2;
    const cy = H - 8;
    const r  = 68;
    const sw = 11;

    const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
    const needleAngle = -90 + pct * 180;

    const endAngle = -180 + pct * 180;
    const tickR    = r + sw * 1;
    const numDash  = 5;
    const gapDeg   = 6;
    const dashDeg  = (180 - (numDash - 1) * gapDeg) / numDash;
    const tickAngles = Array.from({ length: numDash }, (_, i) =>
      -180 + dashDeg / 2 + i * (dashDeg + gapDeg),
    );
    const ticks       = tickAngles.map((a) => arcSegment(cx, cy, tickR, a, dashDeg));
    const activeIndex = tickAngles.reduce(
      (best, a, i, arr) => (Math.abs(a - endAngle) < Math.abs(arr[best] - endAngle) ? i : best),
      0,
    );

    const pathLen = Math.PI * r;
    const drawn   = pct * pathLen;

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center w-[170px]", className)}
        {...props}
      >
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          overflow="visible"
          role="img"
          aria-label={`${value} out of ${max}`}
        >
          <path
            d={arcPath}
            fill="none"
            strokeWidth={sw}
            strokeLinecap="round"
            className={cn(TRACK_STROKE[color])}
          />

          <path
            d={arcPath}
            fill="none"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={`${drawn} ${pathLen * 2}`}
            strokeDashoffset={drawn}
            className={cn(
              FILL_STROKE[color],
              "[animation:s4e-gauge-draw_1.1s_ease-out_forwards]",
            )}
          />

          <g>
            {ticks.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                strokeWidth={3.5}
                strokeLinecap="round"
                className={cn(i === activeIndex ? TICK_DARK_STROKE[color] : TICK_LIGHT_STROKE[color])}
              />
            ))}
            <animate
              attributeName="opacity"
              from="0"
              to="1"
              dur="0.45s"
              begin="0.55s"
              fill="freeze"
            />
          </g>

          <g transform={`rotate(${needleAngle} ${cx} ${cy})`}>
            <path
              d={`M ${cx} ${cy - r * 0.72} L ${cx - 3} ${cy + 2} L ${cx + 3} ${cy + 2} Z`}
              className="fill-s4e-neutral-grey-500"
            />
            <circle cx={cx} cy={cy} r={3.5} className="fill-s4e-neutral-grey-600" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`-90 ${cx} ${cy}`}
              to={`${needleAngle} ${cx} ${cy}`}
              dur="1.1s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.25 0.1 0.25 1"
            />
          </g>
        </svg>

        <div className="text-center -mt-2">
          <span className="font-bold text-s4e-text-primary text-[14px]">{value}</span>
          <span className="text-s4e-text-disabled text-[12px]"> / {max}</span>
        </div>
      </div>
    );
  },
);
Gauge.displayName = "Gauge";

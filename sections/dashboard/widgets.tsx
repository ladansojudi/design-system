"use client";

import type React from "react";
import { cn } from "@/lib/utils";

// ── Severity ───────────────────────────────────────────────────────────────

export type Severity = "info" | "low" | "medium" | "high" | "critical";

const SEV: Record<Severity, { label: string; bg: string; text: string; dot: string }> = {
  info:     { label: "Info",     bg: "bg-s4e-scale-blue-50",   text: "text-s4e-scale-blue-600",   dot: "bg-s4e-severity-info"     },
  low:      { label: "Low",      bg: "bg-s4e-scale-green-50",  text: "text-s4e-scale-green-600",  dot: "bg-s4e-severity-low"      },
  medium:   { label: "Medium",   bg: "bg-s4e-scale-yellow-50", text: "text-s4e-scale-yellow-700", dot: "bg-s4e-severity-medium"   },
  high:     { label: "High",     bg: "bg-s4e-scale-red-50",    text: "text-s4e-scale-red-600",    dot: "bg-s4e-severity-high"     },
  critical: { label: "Critical", bg: "bg-s4e-scale-purple-50", text: "text-s4e-scale-purple-600", dot: "bg-s4e-severity-critical" },
};

export function SeverityPill({ severity }: { severity: Severity }) {
  const c = SEV[severity];
  return (
    <span className={cn("inline-flex items-center justify-center rounded-md px-3 py-1 w-20 text-[12px] font-medium", c.bg, c.text)}>
      {c.label}
    </span>
  );
}

export function SeverityDot({ severity }: { severity: Severity }) {
  return <span className={cn("inline-block w-[8px] h-[8px] rounded-full shrink-0", SEV[severity].dot)} />;
}

// ── Donut chart ────────────────────────────────────────────────────────────

export type DonutSlice = { label: string; value: number; color: string };

export function Donut({ data, size = 150, stroke = 26, centerLabel, centerValue }: {
  data: DonutSlice[];
  size?: number;
  stroke?: number;
  centerLabel?: string;
  centerValue?: React.ReactNode;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const R = 70;
  const LEN = 100;
  const segs = data.map((d, i) => {
    const dash   = (d.value / total) * LEN;
    const offset = data.slice(0, i).reduce((s, x) => s + (x.value / total) * LEN, 0);
    return { ...d, dash, offset };
  });
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="-90 -90 180 180">
        <circle r={R} fill="none" stroke="var(--s4e-neutral-grey-100)" strokeWidth={stroke} />
        {segs.map((s) => (
          <circle
            key={s.label}
            r={R} fill="none" stroke={s.color} strokeWidth={stroke}
            pathLength={LEN}
            strokeDasharray={`${s.dash} ${LEN - s.dash}`}
            strokeDashoffset={-s.offset}
            transform="rotate(-90)"
          />
        ))}
      </svg>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <span className="text-[20px] font-bold text-s4e-text-primary leading-none">{centerValue}</span>}
          {centerLabel && <span className="text-[10px] text-s4e-text-disabled mt-1">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}

export function DonutLegend({ data, suffix }: { data: DonutSlice[]; suffix?: (d: DonutSlice) => React.ReactNode }) {
  return (
    <div className="flex-1 min-w-0 divide-y divide-s4e-neutral-divider-10">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3 py-2">
          <span className="w-[10px] h-[10px] rounded-full shrink-0" style={{ background: d.color }} />
          <span className="text-[14px] text-s4e-text-primary flex-1 min-w-0 truncate">{d.label}</span>
          <span className="text-[14px] font-semibold text-s4e-text-primary tabular-nums">{d.value.toLocaleString()}</span>
          {suffix && <span className="shrink-0">{suffix(d)}</span>}
        </div>
      ))}
    </div>
  );
}

// ── Data colors (theme-aware via CSS vars) ─────────────────────────────────

export const DATA = {
  blue:   "var(--s4e-data-1)",
  orange: "var(--s4e-data-2)",
  blue2:  "var(--s4e-data-3)",
  grey:   "var(--s4e-data-4)",
  navy:   "var(--s4e-data-5)",
  rust:   "var(--s4e-data-6)",
  deep:   "var(--s4e-data-7)",
  slate:  "var(--s4e-data-8)",
};

export const SEV_COLOR: Record<Severity, string> = {
  info:     "var(--s4e-severity-info)",
  low:      "var(--s4e-severity-low)",
  medium:   "var(--s4e-severity-medium)",
  high:     "var(--s4e-severity-high)",
  critical: "var(--s4e-severity-critical)",
};

// ── Trend delta ─────────────────────────────────────────────────────────────

export function Delta({ value }: { value: number }) {
  if (value === 0) return null;
  const up = value > 0;
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-[11px] font-medium tabular-nums", up ? "text-s4e-scale-red-600" : "text-s4e-scale-green-600")}>
      {up ? "↑" : "↓"} {Math.abs(value)}
    </span>
  );
}

"use client";

import type React from "react";
import { cn } from "@/lib/utils";

// ── Area / line chart ──────────────────────────────────────────────────────

export function AreaChart({ points, height = 180 }: { points: number[]; height?: number }) {
  const W = 600, H = height;
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const step = W / (points.length - 1);
  const coords = points.map((p, i) => ({ x: i * step, y: H - ((p - min) / range) * (H - 20) - 10 }));
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="var(--s4e-brand-primary-500)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--s4e-brand-primary-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="var(--s4e-neutral-grey-200)" strokeWidth="1" strokeDasharray="3 3" />
      ))}
      <path d={area} fill="url(#area-grad)" />
      <path d={line} fill="none" stroke="var(--s4e-brand-primary-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Bar chart ────────────────────────────────────────────────────────────────

export function BarChart({ data, height = 180 }: { data: { label: string; value: number }[]; height?: number }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-4" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <div
            className="w-full max-w-[56px] rounded-t-md bg-s4e-data-1"
            style={{ height: `${(d.value / max) * 100}%` }}
          />
          <span className="text-[11px] text-s4e-text-secondary whitespace-nowrap">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Treemap ──────────────────────────────────────────────────────────────────

export type TreeCell = { value: number; tone: 1 | 2 | 3 | 4 };

const TREE_FILL: Record<number, string> = {
  1: "bg-s4e-scale-blue-200",
  2: "bg-s4e-scale-blue-500",
  3: "bg-s4e-brand-primary-500",
  4: "bg-s4e-brand-primary-600",
};

/** Simple fixed-layout treemap matching the mockup's blocky grid. */
export function Treemap() {
  return (
    <div className="grid grid-cols-4 gap-1 h-44">
      <div className={cn("rounded-md flex items-center justify-center text-s4e-text-on-accent text-[13px] font-semibold row-span-2", TREE_FILL[3])}>6</div>
      <div className={cn("rounded-md flex items-center justify-center text-s4e-text-on-accent text-[13px] font-semibold row-span-1", TREE_FILL[2])}>5</div>
      <div className={cn("rounded-md flex items-center justify-center text-s4e-text-on-accent text-[13px] font-semibold col-span-2 row-span-3", TREE_FILL[4])}>14</div>
      <div className={cn("rounded-md flex items-center justify-center text-s4e-text-on-accent text-[12px] font-semibold", TREE_FILL[1])}>2</div>
      <div className={cn("rounded-md flex items-center justify-center text-s4e-text-on-accent text-[12px] font-semibold", TREE_FILL[2])}>4</div>
      <div className={cn("rounded-md flex items-center justify-center text-s4e-text-on-accent text-[12px] font-semibold", TREE_FILL[1])}>2</div>
      <div className={cn("rounded-md flex items-center justify-center text-s4e-text-on-accent text-[12px] font-semibold", TREE_FILL[3])}>3</div>
      <div className={cn("rounded-md flex items-center justify-center text-s4e-text-on-accent text-[12px] font-semibold", TREE_FILL[2])}>4</div>
      <div className={cn("rounded-md flex items-center justify-center text-s4e-text-on-accent text-[12px] font-semibold", TREE_FILL[1])}>2</div>
    </div>
  );
}

// ── Mini gauge (for asset risk rows) ──────────────────────────────────────────

export function MiniGauge({ value, color = "green" }: { value: number; color?: "green" | "yellow" | "red" }) {
  const stroke = color === "red" ? "stroke-s4e-scale-red-500" : color === "yellow" ? "stroke-s4e-scale-yellow-500" : "stroke-s4e-scale-green-500";
  const R = 18, CX = 24, CY = 24;
  const pct = value / 100;
  const a = (deg: number) => ({ x: CX + R * Math.cos((deg * Math.PI) / 180), y: CY + R * Math.sin((deg * Math.PI) / 180) });
  const arc = (from: number, to: number) => {
    const p0 = a(from), p1 = a(to);
    return `M ${p0.x} ${p0.y} A ${R} ${R} 0 0 1 ${p1.x} ${p1.y}`;
  };
  return (
    <svg viewBox="0 4 48 26" className="w-12 shrink-0">
      <path d={arc(180, 360)} fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-s4e-neutral-grey-200" />
      <path d={arc(180, 180 + 180 * pct)} fill="none" strokeWidth="5" strokeLinecap="round" className={stroke} />
      <text x={CX} y={CY - 2} textAnchor="middle" fontSize="9" className="fill-s4e-text-disabled">Low</text>
    </svg>
  );
}

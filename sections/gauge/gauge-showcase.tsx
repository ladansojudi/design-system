"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ExampleCard } from "@/components/styleguide/example-card";

// ── Types ──────────────────────────────────────────────────────────────────

type GaugeColor = "blue" | "green" | "yellow" | "red" | "purple";

type GaugeProps = {
  value: number;
  max?:  number;
  color?: GaugeColor;
};

// ── Token maps (Tailwind stroke / fill classes for s4e tokens) ─────────────

const trackStroke: Record<GaugeColor, string> = {
  blue:   "stroke-s4e-scale-blue-100",
  green:  "stroke-s4e-scale-green-100",
  yellow: "stroke-s4e-scale-yellow-100",
  red:    "stroke-s4e-scale-red-100",
  purple: "stroke-s4e-scale-purple-100",
};

const fillStroke: Record<GaugeColor, string> = {
  blue:   "stroke-s4e-scale-blue-500",
  green:  "stroke-s4e-scale-green-500",
  yellow: "stroke-s4e-scale-yellow-500",
  red:    "stroke-s4e-scale-red-500",
  purple: "stroke-s4e-scale-purple-500",
};

const tickLightStroke: Record<GaugeColor, string> = {
  blue:   "stroke-s4e-scale-blue-200",
  green:  "stroke-s4e-scale-green-200",
  yellow: "stroke-s4e-scale-yellow-200",
  red:    "stroke-s4e-scale-red-200",
  purple: "stroke-s4e-scale-purple-200",
};

const tickDarkStroke: Record<GaugeColor, string> = {
  blue:   "stroke-s4e-scale-blue-600",
  green:  "stroke-s4e-scale-green-600",
  yellow: "stroke-s4e-scale-yellow-600",
  red:    "stroke-s4e-scale-red-600",
  purple: "stroke-s4e-scale-purple-600",
};

// ── Geometry helpers ───────────────────────────────────────────────────────

// SVG angle convention: 0° = right, -90° = top, -180° = left.
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcSegment(cx: number, cy: number, r: number, centerDeg: number, spanDeg: number) {
  const p0 = polar(cx, cy, r, centerDeg - spanDeg / 2);
  const p1 = polar(cx, cy, r, centerDeg + spanDeg / 2);
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 0 1 ${p1.x} ${p1.y}`;
}

// ── Gauge ──────────────────────────────────────────────────────────────────

function Gauge({ value, max = 100, color = "blue" }: GaugeProps) {
  const clamped = Math.max(0, Math.min(value, max));
  const pct     = clamped / max;

  // SVG canvas — wide enough for the half-arc plus top room for the
  // severity dash rim.
  const W  = 170;
  const H  = 104;
  const cx = W / 2;
  const cy = H - 8;   // baseline: 8px above bottom
  const r  = 68;      // arc radius
  const sw = 11;      // stroke width

  // Half-arc path: 180° (left) → 0° (right), sweeping clockwise through -90° (top).
  const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  // Needle angle: -90° (left) … +90° (right). Rotates around (cx, cy).
  const needleAngle = -90 + pct * 180;

  // Severity markers — five evenly-spaced dashes forming a decorative
  // outer rim that spans the entire half-arc (180°), with small gaps
  // between each segment. The dash the needle points at is rendered in the
  // dark shade; the rest in the light shade.
  const endAngle = -180 + pct * 180;                              // SVG angle at needle
  const tickR    = r + sw * 1;                                  // small gap above main arc
  const numDash  = 5;
  const gapDeg   = 6;                                             // gap between dashes
  const dashDeg  = (180 - (numDash - 1) * gapDeg) / numDash;      // 30.8° each
  const tickAngles = Array.from({ length: numDash }, (_, i) =>
    -180 + dashDeg / 2 + i * (dashDeg + gapDeg),
  );
  const ticks       = tickAngles.map((a) => arcSegment(cx, cy, tickR, a, dashDeg));
  const activeIndex = tickAngles.reduce(
    (best, a, i, arr) => (Math.abs(a - endAngle) < Math.abs(arr[best] - endAngle) ? i : best),
    0,
  );

  return (
    <div className="flex flex-col items-center w-[170px]">
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        overflow="visible"
        role="img"
        aria-label={`${value} out of ${max}`}
      >
        {/* Track — faint background arc, full half-circle */}
        <path
          d={arcPath}
          fill="none"
          strokeWidth={sw}
          strokeLinecap="round"
          className={cn(trackStroke[color])}
        />

        {/* Progress arc — strokeDasharray draws the first pct of the path.
            A CSS keyframe (s4e-gauge-draw) sweeps stroke-dashoffset from
            `drawn` → 0 on mount, giving the "arc draws in" effect. */}
        {(() => {
          const pathLen = Math.PI * r;
          const drawn   = pct * pathLen;
          return (
            <path
              d={arcPath}
              fill="none"
              strokeWidth={sw}
              strokeLinecap="round"
              strokeDasharray={`${drawn} ${pathLen * 2}`}
              strokeDashoffset={drawn}
              className={cn(
                fillStroke[color],
                "[animation:s4e-gauge-draw_1.1s_ease-out_forwards]",
              )}
            />
          );
        })()}

        {/* Severity markers — five dashes around the rim; the one under the
            needle is rendered dark, the rest are light */}
        <g>
          {ticks.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              strokeWidth={3.5}
              strokeLinecap="round"
              className={cn(i === activeIndex ? tickDarkStroke[color] : tickLightStroke[color])}
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

        {/* Needle — static at target angle, animates from -90° on mount */}
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

      {/* Value label */}
      <div className="text-center -mt-2">
        <span className="font-bold text-s4e-text-primary text-[13px]">{value}</span>
        <span className="text-s4e-text-disabled text-[12px]"> / {max}</span>
      </div>
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

const colors: GaugeColor[] = ["blue", "green", "yellow", "red", "purple"];

export function GaugeShowcase() {
  return (
    <div className="space-y-10">
      {/* Default — 5 severity colors × 2 values */}
      <div>
        <SectionTitle>Default</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 justify-items-center">
            {colors.map((c) => (
              <React.Fragment key={c}>
                <Gauge color={c} value={27} />
                <Gauge color={c} value={70} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function GaugeExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Blue"
        density="tall"
        code={`<Gauge value={42} color="blue" />`}
        preview={<Gauge color="blue" value={42} />}
      />
      <ExampleCard
        title="Green"
        density="tall"
        code={`<Gauge value={78} color="green" />`}
        preview={<Gauge color="green" value={78} />}
      />
      <ExampleCard
        title="Yellow"
        density="tall"
        code={`<Gauge value={55} color="yellow" />`}
        preview={<Gauge color="yellow" value={55} />}
      />
      <ExampleCard
        title="Red"
        density="tall"
        code={`<Gauge value={88} color="red" />`}
        preview={<Gauge color="red" value={88} />}
      />
      <ExampleCard
        title="Purple"
        density="tall"
        code={`<Gauge value={33} color="purple" />`}
        preview={<Gauge color="purple" value={33} />}
      />
    </div>
  );
}

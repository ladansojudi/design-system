"use client";

import type React from "react";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Shared section title ───────────────────────────────────────────────────

function DocSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <span className="text-[15px] font-semibold text-snt-text-primary">{children}</span>
    </div>
  );
}

// ── Anatomy ────────────────────────────────────────────────────────────────

export type AnatomyPart = {
  label:        string;
  description:  string;
  /** Optional short label rendered on the annotation chip when full label is too long. */
  shortLabel?:  string;
  /** Chip position in percentages of the component bounding box (negative or >100 = outside). */
  x?:           number;
  y?:           number;
  /** Chip anchor — which corner of the chip sits at (x,y). Default "center". */
  anchor?:      "tl" | "tr" | "bl" | "br" | "center";
  /** Optional pin position inside the component (the dot the leader line points to). */
  pinX?:        number;
  pinY?:        number;
};

function AnnotationChip({
  label,
  active,
  dimmed,
  onHover,
  onLeave,
  style,
}: {
  label:    string;
  active:   boolean;
  dimmed:   boolean;
  onHover?: () => void;
  onLeave?: () => void;
  style?:   React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={style}
      className={cn(
        "shrink-0 inline-flex items-center gap-1 h-[18px] px-1.5 rounded-[3px] text-[10px] font-medium font-mono leading-none whitespace-nowrap transition-all cursor-default",
        active
          ? "bg-snt-brand-primary-500 text-white shadow-snt-sm"
          : "bg-snt-brand-primary-500/10 text-snt-brand-primary-500 ring-1 ring-inset ring-snt-brand-primary-500/20",
        dimmed && !active && "opacity-25",
      )}
    >
      {label}
    </button>
  );
}

function LegendDot({ active, dimmed }: { active: boolean; dimmed: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "shrink-0 inline-block w-1.5 h-1.5 rounded-full mt-[7px] transition-colors",
        active   ? "bg-snt-brand-primary-500"           : "bg-snt-brand-primary-500/40",
        dimmed && !active && "opacity-30",
      )}
    />
  );
}

function anchorOffset(anchor: AnatomyPart["anchor"]): React.CSSProperties {
  switch (anchor) {
    case "tl":     return { transform: "translate(0, 0)" };
    case "tr":     return { transform: "translate(-100%, 0)" };
    case "bl":     return { transform: "translate(0, -100%)" };
    case "br":     return { transform: "translate(-100%, -100%)" };
    case "center":
    default:       return { transform: "translate(-50%, -50%)" };
  }
}

export function Anatomy({
  parts,
  preview,
  children,
  previewBg = "checker",
}: {
  parts:       AnatomyPart[];
  /** The component to display. Use `preview` for clarity; `children` works for backwards compat. */
  preview?:    React.ReactNode;
  children?:   React.ReactNode;
  /** Background style of the preview canvas. */
  previewBg?:  "plain" | "checker";
}) {
  const node = preview ?? children;
  const [hover, setHover] = useState<number | null>(null);
  const hasMarkers = parts.some((p) => p.x !== undefined && p.y !== undefined);

  return (
    <div>
      <DocSectionTitle>Anatomy</DocSectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl overflow-hidden">
        <div className={cn("grid", node && "lg:grid-cols-[1fr_minmax(0,1fr)]")}>
          {node && (
            <div
              className={cn(
                "relative flex items-center justify-center min-h-[260px] p-16 border-b lg:border-b-0 lg:border-r border-snt-neutral-divider-10",
                previewBg === "checker"
                  ? "bg-[repeating-conic-gradient(var(--snt-neutral-grey-100)_0_25%,transparent_0_50%)] bg-[length:14px_14px]"
                  : "bg-snt-neutral-grey-100",
              )}
            >
              <div className="relative inline-block">
                {/* SVG layer for leader lines — coordinates in % of the component box */}
                {hasMarkers && (
                  <svg
                    aria-hidden
                    className="absolute inset-0 overflow-visible pointer-events-none"
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {parts.map((p, i) => {
                      if (p.x === undefined || p.y === undefined) return null;
                      const px = p.pinX ?? p.x;
                      const py = p.pinY ?? p.y;
                      return (
                        <line
                          key={p.label}
                          x1={px}
                          y1={py}
                          x2={p.x}
                          y2={p.y}
                          vectorEffect="non-scaling-stroke"
                          stroke={hover === i ? "var(--snt-brand-primary-500)" : "var(--snt-neutral-divider-20)"}
                          strokeWidth={hover === i ? 1.25 : 1}
                          style={{
                            opacity: hover !== null && hover !== i ? 0.2 : 1,
                            transition: "stroke 150ms, opacity 150ms",
                          }}
                        />
                      );
                    })}
                  </svg>
                )}

                {node}

                {/* Pin dots inside the component */}
                {hasMarkers && parts.map((p, i) => {
                  if (p.pinX === undefined || p.pinY === undefined) return null;
                  return (
                    <span
                      key={"pin-" + p.label}
                      aria-hidden
                      className={cn(
                        "absolute z-10 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all",
                        hover === i
                          ? "bg-snt-brand-primary-500 ring-2 ring-snt-brand-primary-500/30"
                          : "bg-snt-brand-primary-500/70 ring-1 ring-snt-brand-primary-500/30",
                        hover !== null && hover !== i && "opacity-20",
                      )}
                      style={{ left: `${p.pinX}%`, top: `${p.pinY}%` }}
                    />
                  );
                })}

                {/* Chips, positioned outside the component */}
                {hasMarkers && parts.map((p, i) => {
                  if (p.x === undefined || p.y === undefined) return null;
                  return (
                    <span
                      key={p.label}
                      className="absolute z-20 pointer-events-auto"
                      style={{
                        left: `${p.x}%`,
                        top:  `${p.y}%`,
                        ...anchorOffset(p.anchor),
                      }}
                    >
                      <AnnotationChip
                        label={p.shortLabel ?? p.label}
                        active={hover === i}
                        dimmed={hover !== null}
                        onHover={() => setHover(i)}
                        onLeave={() => setHover(null)}
                      />
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <ul className="divide-y divide-snt-neutral-divider-10">
            {parts.map((p, i) => (
              <li
                key={p.label}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={cn(
                  "flex items-start gap-3 px-6 py-3 transition-opacity",
                  hover !== null && hover !== i && "opacity-50",
                )}
              >
                <LegendDot active={hover === i} dimmed={false} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[14px] font-medium transition-colors",
                      hover === i ? "text-snt-brand-primary-500" : "text-snt-text-primary",
                    )}>
                      {p.label}
                    </span>
                    {p.shortLabel && p.shortLabel !== p.label && (
                      <span className="font-mono text-[10px] text-snt-text-disabled">
                        {p.shortLabel}
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-snt-text-disabled mt-0.5">{p.description}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Use Cases ──────────────────────────────────────────────────────────────

export function UseCases({ items }: { items: string[] }) {
  return (
    <div>
      <DocSectionTitle>Use Cases</DocSectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-5">
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14px] text-snt-text-secondary leading-relaxed">
              <span className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-snt-brand-primary-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Guidelines (Do & Don't) ────────────────────────────────────────────────

export type Guideline = { type: "do" | "dont"; text: string };

export function Guidelines({ items }: { items: Guideline[] }) {
  return (
    <div>
      <DocSectionTitle>Guidelines</DocSectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((g, i) => {
          const isDo = g.type === "do";
          return (
            <div
              key={i}
              className={cn(
                "border rounded-xl px-4 py-3 flex items-start gap-3",
                isDo ? "border-snt-scale-green-200 bg-snt-scale-green-50" : "border-snt-scale-red-200 bg-snt-scale-red-50",
              )}
            >
              <div className={cn(
                "shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                isDo ? "bg-snt-scale-green-500 text-white" : "bg-snt-scale-red-500 text-white",
              )}>
                {isDo ? <Check size={12} /> : <X size={12} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "text-[11px] font-semibold uppercase tracking-widest mb-0.5",
                  isDo ? "text-snt-scale-green-600" : "text-snt-scale-red-600",
                )}>
                  {isDo ? "Do" : "Don't"}
                </div>
                <p className="text-[12px] text-snt-text-primary leading-relaxed">{g.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

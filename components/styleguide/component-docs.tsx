"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Shared section title ───────────────────────────────────────────────────

function DocSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
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
  /**
   * CSS selector of the element this part is, inside the preview. A numbered
   * marker is placed on it and it is outlined on hover. Add "|N" to take the
   * Nth match instead of the first (e.g. `[role="row"]|1`).
   */
  target?:      string;
  /** Which edge of the element the marker sits on. Default "top". */
  side?:        "top" | "bottom" | "left" | "right";
};

type Box = { l: number; t: number; w: number; h: number };

function splitTarget(target: string): [string, number] {
  const m = target.match(/^(.*)\|(\d+)$/);
  return m ? [m[1], Number(m[2])] : [target, 0];
}

function NumberBadge({ n, active, dimmed }: { n: number; active: boolean; dimmed: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full text-snt-11 font-semibold tabular-nums transition-all",
        active ? "bg-snt-brand-primary-600 text-snt-text-on-accent ring-4 ring-snt-brand-primary-500/25" : "bg-snt-brand-primary-600 text-snt-text-on-accent shadow-snt-sm",
        dimmed && !active && "opacity-30",
      )}
    >
      {n}
    </span>
  );
}

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
  layout = "side",
}: {
  parts:       AnatomyPart[];
  /** The component to display. Use `preview` for clarity; `children` works for backwards compat. */
  preview?:    React.ReactNode;
  children?:   React.ReactNode;
  /** Background style of the preview canvas. */
  previewBg?:  "plain" | "checker";
  /** "stacked" puts the legend under a full-width preview — for wide components like tables. */
  layout?:     "side" | "stacked";
}) {
  const node = preview ?? children;
  const [hover, setHover] = useState<number | null>(null);
  const [boxes, setBoxes] = useState<(Box | null)[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const hasMarkers = parts.some((p) => p.x !== undefined && p.y !== undefined);
  const hasTargets = parts.some((p) => p.target);

  // Measure each part's element, relative to the canvas, and keep it in sync
  // with resizes and re-renders. Measuring happens in observer callbacks, not
  // synchronously in the effect.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el || !hasTargets) return;
    const measure = () => {
      const base = el.getBoundingClientRect();
      setBoxes(
        parts.map((p) => {
          if (!p.target) return null;
          const [sel, idx] = splitTarget(p.target);
          let t: Element | undefined;
          try {
            t = el.querySelectorAll(sel)[idx];
          } catch {
            return null; // invalid selector: no marker rather than a crash
          }
          if (!t) return null;
          const r = t.getBoundingClientRect();
          return { l: r.left - base.left, t: r.top - base.top, w: r.width, h: r.height };
        }),
      );
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const mo = new MutationObserver(measure);
    mo.observe(el, { childList: true, subtree: true, attributes: true });
    window.addEventListener("resize", measure);
    const raf = requestAnimationFrame(measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [parts, hasTargets]);

  const stacked = layout === "stacked";

  return (
    <div>
      <DocSectionTitle>Anatomy</DocSectionTitle>
      <div className="border border-snt-border-default rounded-xl overflow-hidden">
        <div className={cn("grid grid-cols-[minmax(0,1fr)]", node && !stacked && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]")}>
          {node && (
            <div
              className={cn(
                "relative flex min-h-[260px] min-w-0 items-center justify-center overflow-x-auto border-b border-snt-border-default",
                stacked ? "px-6 py-14 sm:px-14" : "p-16 lg:border-b-0 lg:border-r",
                previewBg === "checker"
                  ? "bg-[repeating-conic-gradient(var(--snt-neutral-grey-100)_0_25%,transparent_0_50%)] bg-[length:14px_14px]"
                  : "bg-snt-neutral-grey-100",
              )}
            >
              <div ref={canvasRef} className={cn("relative", stacked ? "w-full max-w-3xl" : "inline-block")}>
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

                {/* Numbered markers sitting on the real elements, with an outline on hover */}
                {parts.map((p, i) => {
                  const b = boxes[i];
                  if (!b) return null;
                  const side = p.side ?? "top";
                  // The marker sits just outside the element's edge, so it never covers its content.
                  const GAP = 14;
                  const cx = side === "left" ? b.l - GAP : side === "right" ? b.l + b.w + GAP : b.l + b.w / 2;
                  const cy = side === "top" ? b.t - GAP : side === "bottom" ? b.t + b.h + GAP : b.t + b.h / 2;
                  return (
                    <span key={"t-" + p.label}>
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute z-10 rounded-md ring-2 ring-snt-brand-primary-500 transition-opacity duration-150",
                          hover === i ? "opacity-100" : "opacity-0",
                        )}
                        style={{ left: b.l - 3, top: b.t - 3, width: b.w + 6, height: b.h + 6 }}
                      />
                      <span
                        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: cx, top: cy }}
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(null)}
                      >
                        <NumberBadge n={i + 1} active={hover === i} dimmed={hover !== null} />
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <ol className={cn("divide-y divide-snt-border-default", stacked && "sm:grid sm:grid-cols-2 sm:divide-y-0")}>
            {parts.map((p, i) => (
              <li
                key={p.label}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={cn(
                  "flex items-start gap-3 px-6 py-3 transition-opacity",
                  stacked && "sm:border-b sm:border-snt-border-default",
                  hover !== null && hover !== i && "opacity-50",
                )}
              >
                {p.target || hasTargets ? (
                  <span className="mt-0.5"><NumberBadge n={i + 1} active={hover === i} dimmed={false} /></span>
                ) : (
                  <LegendDot active={hover === i} dimmed={false} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-snt-14 font-medium transition-colors",
                      hover === i ? "text-snt-text-brand" : "text-snt-text-primary",
                    )}>
                      {p.label}
                    </span>
                    {p.shortLabel && p.shortLabel !== p.label && (
                      <span className="font-mono text-snt-11 text-snt-text-secondary">
                        {p.shortLabel}
                      </span>
                    )}
                  </div>
                  <div className="text-snt-12 text-snt-text-secondary mt-0.5">{p.description}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

// ── Use Cases ──────────────────────────────────────────────────────────────

export function UseCases({ items }: { items: string[] }) {
  return (
    <div>
      <DocSectionTitle>When to use</DocSectionTitle>
      <div className="border border-snt-border-default rounded-xl px-6 py-5">
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-snt-14 text-snt-text-primary leading-relaxed">
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
      <DocSectionTitle>Do&apos;s and don&apos;ts</DocSectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((g, i) => {
          const isDo = g.type === "do";
          return (
            <div
              key={i}
              className={cn(
                "rounded-xl border border-snt-border-default border-t-2 bg-snt-surface-app px-4 pb-4 pt-3",
                isDo ? "border-t-snt-scale-green-500" : "border-t-snt-scale-red-500",
              )}
            >
              <div
                className={cn(
                  "mb-1.5 flex items-center gap-1.5 text-snt-12 font-semibold",
                  isDo ? "text-snt-scale-green-600" : "text-snt-scale-red-600",
                )}
              >
                {isDo ? <Check size={14} aria-hidden /> : <X size={14} aria-hidden />}
                {isDo ? "Do" : "Don\u2019t"}
              </div>
              <p className="text-snt-14 leading-relaxed text-snt-text-primary">{g.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

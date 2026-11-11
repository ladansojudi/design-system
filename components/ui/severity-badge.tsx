import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — SeverityBadge
 *
 * Drop this file into your project at components/ui/severity-badge.tsx.
 *
 * A finding's severity as signal bars: Critical fills four bars, High three,
 * Medium two, Low one; Info shows an empty ring. The bar count carries the
 * level as well as the colour, so it never relies on colour alone, and the
 * label is always written out. No "use client".
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export interface SeverityBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  severity: Severity;
  /** Optional numeric score (e.g. CVSS), shown after the label. */
  score?:   number;
  /** sm 24px for dense tables, md 28px. */
  size?:    "sm" | "md";
}

const CONFIG: Record<Severity, { label: string; level: number; fill: string }> = {
  critical: { label: "Critical", level: 4, fill: "bg-snt-severity-critical" },
  high:     { label: "High",     level: 3, fill: "bg-snt-severity-high" },
  medium:   { label: "Medium",   level: 2, fill: "bg-snt-severity-medium" },
  low:      { label: "Low",      level: 1, fill: "bg-snt-severity-low" },
  info:     { label: "Info",     level: 0, fill: "bg-snt-severity-info" },
};

// Bar heights grow left to right, like a signal meter.
const BAR_HEIGHT = ["h-1.5", "h-2", "h-2.5", "h-3"];

function Bars({ severity }: { severity: Severity }) {
  const { level, fill } = CONFIG[severity];
  if (level === 0) {
    return <span aria-hidden className="size-3 shrink-0 rounded-full border-2 border-snt-severity-info" />;
  }
  return (
    <span aria-hidden className="flex h-3 shrink-0 items-end gap-0.5">
      {BAR_HEIGHT.map((h, i) => (
        <span key={h} className={cn("w-[3px] rounded-[1px]", h, i < level ? fill : "bg-snt-border-default")} />
      ))}
    </span>
  );
}

export const SeverityBadge = React.forwardRef<HTMLDivElement, SeverityBadgeProps>(
  ({ severity, score, size = "md", className, ...props }, ref) => {
    const cfg = CONFIG[severity];
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-md bg-snt-surface-app ring-1 ring-inset ring-snt-border-default",
          size === "sm" ? "h-6 px-2 text-snt-12" : "h-7 px-2.5 text-snt-14",
          className,
        )}
        {...props}
      >
        <Bars severity={severity} />
        <span className="font-medium text-snt-text-primary">{cfg.label}</span>
        {score !== undefined && (
          <span className="font-mono tabular-nums text-snt-text-secondary">{score.toFixed(1)}</span>
        )}
      </div>
    );
  },
);
SeverityBadge.displayName = "SeverityBadge";

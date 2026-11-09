import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — SeverityBar
 *
 * Drop this file into your project at components/ui/severity-bar.tsx.
 *
 * One horizontal bar that splits a set of findings by severity, with an
 * optional legend. No "use client": it renders in Server Components.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export const SEVERITY_ORDER: Severity[] = ["critical", "high", "medium", "low", "info"];

const LABEL: Record<Severity, string> = {
  critical: "Critical",
  high:     "High",
  medium:   "Medium",
  low:      "Low",
  info:     "Info",
};

// Severity fills are the hue-as-meaning tokens, never decorative.
const FILL: Record<Severity, string> = {
  critical: "bg-snt-severity-critical",
  high:     "bg-snt-severity-high",
  medium:   "bg-snt-severity-medium",
  low:      "bg-snt-severity-low",
  info:     "bg-snt-severity-info",
};

export interface SeverityBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of findings per severity. Missing or 0 severities are left out. */
  counts: Partial<Record<Severity, number>>;
  /** Show the legend with counts under the bar. */
  showLegend?: boolean;
  /** Bar thickness: sm 6px, md 10px. */
  size?: "sm" | "md";
  /** What is being counted, for the accessible summary. */
  noun?: string;
}

export function SeverityBar({
  counts,
  showLegend = true,
  size = "md",
  noun = "findings",
  className,
  ...props
}: SeverityBarProps) {
  const parts = SEVERITY_ORDER.filter((s) => (counts[s] ?? 0) > 0).map((s) => ({ s, n: counts[s]! }));
  const total = parts.reduce((sum, p) => sum + p.n, 0);
  const summary =
    total === 0
      ? `No ${noun}`
      : `${total} ${noun}: ` + parts.map((p) => `${p.n} ${LABEL[p.s].toLowerCase()}`).join(", ");

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* The bar is one image with a text summary; the legend repeats the numbers visibly. */}
      <div
        role="img"
        aria-label={summary}
        className={cn("flex w-full gap-0.5 overflow-hidden rounded-full", size === "sm" ? "h-1.5" : "h-2.5")}
      >
        {total === 0 ? (
          <span className="h-full w-full bg-snt-bg-subtle" />
        ) : (
          parts.map((p) => (
            <span key={p.s} className={cn("h-full min-w-1", FILL[p.s])} style={{ flexGrow: p.n, flexBasis: 0 }} />
          ))
        )}
      </div>

      {showLegend && (
        <ul aria-hidden className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
          {total === 0 ? (
            <li className="text-snt-12 text-snt-text-secondary">No {noun}</li>
          ) : (
            parts.map((p) => (
              <li key={p.s} className="flex items-center gap-1.5 text-snt-12 text-snt-text-secondary">
                <span className={cn("size-2 rounded-full", FILL[p.s])} />
                {LABEL[p.s]}
                <span className="font-medium tabular-nums text-snt-text-primary">{p.n}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

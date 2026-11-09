import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — CvssScore
 *
 * Drop this file into your project at components/ui/cvss-score.tsx.
 *
 * A CVSS base score with its qualitative rating, and — when you pass the
 * vector string — each metric spelled out in plain words. Understands CVSS
 * v3.0 / v3.1 vectors; metrics it doesn't know are shown as written.
 * No "use client".
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

export type CvssRating = "none" | "low" | "medium" | "high" | "critical";

/** CVSS v3.x qualitative rating for a base score (0.0 – 10.0). */
export function cvssRating(score: number): CvssRating {
  if (score === 0) return "none";
  if (score < 4) return "low";
  if (score < 7) return "medium";
  if (score < 9) return "high";
  return "critical";
}

const RATING: Record<CvssRating, { label: string; box: string }> = {
  none:     { label: "None",     box: "bg-snt-bg-subtle text-snt-text-primary" },
  low:      { label: "Low",      box: "bg-snt-scale-green-50 text-snt-scale-green-600 border-snt-scale-green-500" },
  medium:   { label: "Medium",   box: "bg-snt-scale-yellow-50 text-snt-scale-yellow-700 border-snt-scale-yellow-500" },
  high:     { label: "High",     box: "bg-snt-scale-red-50 text-snt-scale-red-600 border-snt-scale-red-500" },
  critical: { label: "Critical", box: "bg-snt-scale-purple-50 text-snt-scale-purple-600 border-snt-scale-purple-500" },
};

// CVSS v3.x base metrics → plain-language name and values.
const METRICS: Record<string, { name: string; values: Record<string, string> }> = {
  AV: { name: "Attack vector",       values: { N: "Network", A: "Adjacent", L: "Local", P: "Physical" } },
  AC: { name: "Attack complexity",   values: { L: "Low", H: "High" } },
  PR: { name: "Privileges required", values: { N: "None", L: "Low", H: "High" } },
  UI: { name: "User interaction",    values: { N: "None", R: "Required" } },
  S:  { name: "Scope",               values: { U: "Unchanged", C: "Changed" } },
  C:  { name: "Confidentiality",     values: { N: "None", L: "Low", H: "High" } },
  I:  { name: "Integrity",           values: { N: "None", L: "Low", H: "High" } },
  A:  { name: "Availability",        values: { N: "None", L: "Low", H: "High" } },
};

export type CvssMetric = { key: string; name: string; value: string };

/** Splits "CVSS:3.1/AV:N/AC:L/…" into readable metrics. */
export function parseCvssVector(vector: string): { version?: string; metrics: CvssMetric[] } {
  const parts = vector.trim().split("/");
  let version: string | undefined;
  const metrics: CvssMetric[] = [];
  for (const part of parts) {
    const [key, raw] = part.split(":");
    if (!key || raw === undefined) continue;
    if (key === "CVSS") { version = raw; continue; }
    const known = METRICS[key];
    metrics.push({ key, name: known?.name ?? key, value: known?.values[raw] ?? raw });
  }
  return { version, metrics };
}

export interface CvssScoreProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Base score, 0.0 – 10.0. */
  score: number;
  /** Optional vector string, e.g. "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H". */
  vector?: string;
  /** Show the metric breakdown when a vector is given. */
  showMetrics?: boolean;
}

export function CvssScore({ score, vector, showMetrics = true, className, ...props }: CvssScoreProps) {
  const rating = cvssRating(score);
  const cfg = RATING[rating];
  const parsed = vector ? parseCvssVector(vector) : undefined;
  const version = parsed?.version ? `CVSS ${parsed.version}` : "CVSS";

  return (
    <div className={cn("inline-flex flex-col gap-3", className)} {...props}>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-10 min-w-12 items-center justify-center rounded-md border-l-[3px] px-2.5 font-mono text-snt-18 font-semibold tabular-nums",
            cfg.box,
          )}
        >
          {score.toFixed(1)}
        </span>
        <span className="flex flex-col">
          <span className="text-snt-14 font-semibold text-snt-text-primary">{cfg.label}</span>
          <span className="text-snt-12 text-snt-text-secondary">{version} base score</span>
        </span>
      </div>

      {parsed && showMetrics && parsed.metrics.length > 0 && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-snt-12">
          {parsed.metrics.map((m) => (
            <React.Fragment key={m.key}>
              <dt className="text-snt-text-secondary">{m.name}</dt>
              <dd className="font-medium text-snt-text-primary">{m.value}</dd>
            </React.Fragment>
          ))}
        </dl>
      )}
      {vector && (
        <code className="max-w-full break-all font-mono text-snt-11 text-snt-text-secondary">{vector}</code>
      )}
    </div>
  );
}

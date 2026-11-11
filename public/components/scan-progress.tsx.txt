import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — ScanProgress
 *
 * Drop this file into your project at components/ui/scan-progress.tsx.
 *
 * The stages of a scan or job, e.g. Queued → Discovery → Scanning → Analysis
 * → Report, with where it is now. No "use client".
 *
 * Requires:
 *   • Tailwind CSS v4, lucide-react
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

export type ScanStepStatus = "pending" | "active" | "done" | "failed";
export type ScanStep = { label: string; status: ScanStepStatus; detail?: string };

const SR: Record<ScanStepStatus, string> = { pending: "not started", active: "in progress", done: "done", failed: "failed" };

export interface ScanProgressProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: ScanStep[];
  /** Accessible name, e.g. "Scan of api.example.com". */
  label?: string;
}

function Marker({ status }: { status: ScanStepStatus }) {
  const base = "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full [&_svg]:size-3.5";
  if (status === "done") return <span className={cn(base, "bg-snt-btn-primary-600 text-snt-text-on-accent")}><Check aria-hidden /></span>;
  if (status === "failed") return <span className={cn(base, "bg-snt-btn-error-600 text-snt-text-on-accent")}><X aria-hidden /></span>;
  if (status === "active")
    return (
      <span className={cn(base, "bg-snt-surface-app ring-2 ring-snt-focus-ring")}>
        <span className="size-3 animate-spin rounded-full border-2 border-snt-focus-ring/30 border-t-snt-focus-ring motion-reduce:animate-none" />
      </span>
    );
  return <span className={cn(base, "border-2 border-snt-border-strong bg-snt-surface-app")} />;
}

export function ScanProgress({ steps, label = "Scan progress", className, ...props }: ScanProgressProps) {
  return (
    <ol aria-label={label} className={cn("flex w-full items-start", className)} {...props}>
      {steps.map((s, i) => (
        <li
          key={s.label}
          aria-current={s.status === "active" ? "step" : undefined}
          className="relative flex min-w-0 flex-1 flex-col items-center text-center"
        >
          {i > 0 && (
            <span
              aria-hidden
              className={cn(
                "absolute right-1/2 top-3 h-0.5 w-full -translate-y-1/2",
                s.status === "pending" ? "bg-snt-border-default" : "bg-snt-btn-primary-600",
              )}
            />
          )}
          <Marker status={s.status} />
          <span
            className={cn(
              "mt-2 px-1 text-snt-12 font-medium",
              s.status === "pending" ? "text-snt-text-secondary" : s.status === "failed" ? "text-snt-text-error" : "text-snt-text-primary",
            )}
          >
            {s.label}
            <span className="sr-only">, {SR[s.status]}</span>
          </span>
          {s.detail && <span className="mt-0.5 px-1 text-snt-11 text-snt-text-secondary">{s.detail}</span>}
        </li>
      ))}
    </ol>
  );
}

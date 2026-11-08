"use client";

import type React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Shared dashboard card ──────────────────────────────────────────────────

export function Card({
  title,
  description,
  info,
  status,
  viewAll,
  trailing,
  bodyClassName,
  className,
  children,
}: {
  title?:       string;
  description?: string;
  info?:        boolean;
  status?:      { label: string; tone?: "live" | "neutral" };
  viewAll?:     string;
  trailing?:    React.ReactNode;
  bodyClassName?: string;
  className?:   string;
  children:     React.ReactNode;
}) {
  const hasHeader = title || description || status || viewAll || trailing;
  return (
    <div className={cn("border border-snt-neutral-divider-10 rounded-xl bg-snt-surface-app", className)}>
      {hasHeader && (
        <div className="flex items-center gap-2 px-5 py-3 border-b border-snt-neutral-divider-10">
          {title && (
            <span className="text-[14px] font-semibold text-snt-text-primary shrink-0 inline-flex items-center gap-1.5">
              {title}
              {info && <Info size={13} className="text-snt-text-disabled" />}
            </span>
          )}
          {description && (
            <span className="hidden sm:inline text-[12px] text-snt-text-disabled truncate min-w-0">
              {description}
            </span>
          )}
          {status && (
            <span className="inline-flex items-center gap-1.5 ml-1 shrink-0">
              <span className={cn(
                "w-[7px] h-[7px] rounded-full",
                status.tone === "live" ? "bg-snt-scale-green-500 snt-pulse-dot" : "bg-snt-text-disabled",
              )} />
              <span className="text-[11px] text-snt-text-secondary">{status.label}</span>
            </span>
          )}
          {trailing && <div className="ml-auto shrink-0">{trailing}</div>}
          {viewAll && (
            <button
              type="button"
              className={cn(
                "text-[12px] font-medium text-snt-brand-primary-500 hover:text-snt-brand-primary-600 transition-colors shrink-0 underline underline-offset-2",
                !trailing && "ml-auto",
              )}
            >
              {viewAll}
            </button>
          )}
        </div>
      )}
      <div className={cn("px-5 py-4", bodyClassName)}>{children}</div>
    </div>
  );
}

// ── Section title used inside the dashboard ────────────────────────────────

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?:  React.ReactNode;
}) {
  return (
    <div className="border border-snt-neutral-divider-10 rounded-xl bg-snt-surface-app px-5 py-4">
      <div className="text-[14px] font-semibold text-snt-text-primary">{label}</div>
      <div className="mt-2 text-[26px] font-bold leading-none text-snt-text-primary tabular-nums">{value}</div>
      {sub && <div className="mt-2 text-[12px] text-snt-text-secondary leading-snug">{sub}</div>}
    </div>
  );
}

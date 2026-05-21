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
    <div className={cn("border border-s4e-neutral-divider-10 rounded-xl bg-s4e-surface-app", className)}>
      {hasHeader && (
        <div className="flex items-center gap-2 px-5 py-3 border-b border-s4e-neutral-divider-10">
          {title && (
            <span className="text-[14px] font-semibold text-s4e-text-primary shrink-0 inline-flex items-center gap-1.5">
              {title}
              {info && <Info size={13} className="text-s4e-text-disabled" />}
            </span>
          )}
          {description && (
            <span className="hidden sm:inline text-[12px] text-s4e-text-disabled truncate min-w-0">
              {description}
            </span>
          )}
          {status && (
            <span className="inline-flex items-center gap-1.5 ml-1 shrink-0">
              <span className={cn(
                "w-[7px] h-[7px] rounded-full",
                status.tone === "live" ? "bg-s4e-scale-green-500 s4e-pulse-dot" : "bg-s4e-text-disabled",
              )} />
              <span className="text-[11px] text-s4e-text-secondary">{status.label}</span>
            </span>
          )}
          {trailing && <div className="ml-auto shrink-0">{trailing}</div>}
          {viewAll && (
            <button
              type="button"
              className={cn(
                "text-[12px] font-medium text-s4e-brand-primary-500 hover:text-s4e-brand-primary-600 transition-colors shrink-0 underline underline-offset-2",
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
    <div className="border border-s4e-neutral-divider-10 rounded-xl bg-s4e-surface-app px-5 py-4">
      <div className="text-[13px] font-semibold text-s4e-text-primary">{label}</div>
      <div className="mt-2 text-[26px] font-bold leading-none text-s4e-text-primary tabular-nums">{value}</div>
      {sub && <div className="mt-2 text-[12px] text-s4e-text-secondary leading-snug">{sub}</div>}
    </div>
  );
}

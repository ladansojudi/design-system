"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Cards
 *
 * Drop this file into your project at components/ui/cards.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

export type InsightRow = { label: string; value: string | number };

export interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title:           string;
  rows:            InsightRow[];
  actionLabel?:    string;
  onActionClick?:  () => void;
}

export const InsightCard = React.forwardRef<HTMLDivElement, InsightCardProps>(
  ({ title, rows, actionLabel = "View Details", onActionClick, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border border-s4e-border-default rounded-xl px-5 py-5 bg-s4e-surface-app flex flex-col gap-4",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="text-[14px] font-semibold text-s4e-text-primary">{title}</div>
          <button
            type="button"
            onClick={onActionClick}
            className="text-[12px] font-medium text-s4e-brand-primary-500 hover:text-s4e-brand-primary-600 transition-colors"
          >
            {actionLabel}
          </button>
        </div>

        <div className="space-y-0 divide-y divide-s4e-border-default">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2.5">
              <span className="text-[12px] text-s4e-text-secondary">{row.label}</span>
              <span className="text-[14px] font-semibold text-s4e-text-primary">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
InsightCard.displayName = "InsightCard";

export interface AlertCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title:         string;
  activeCount:   number;
  alertTitle:    string;
  alertBadge?:   string;
  description:   string;
  action:        string;
  onActionClick?: () => void;
}

export const AlertCard = React.forwardRef<HTMLDivElement, AlertCardProps>(
  (
    {
      title,
      activeCount,
      alertTitle,
      alertBadge,
      description,
      action,
      onActionClick,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden border border-s4e-border-default bg-s4e-surface-app",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between px-4 py-2 bg-s4e-bg-subtle border-b border-s4e-border-default">
          <span className="text-[12px] font-semibold text-s4e-text-primary">{title}</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-s4e-bg-error-subtle text-[11px] font-semibold text-s4e-text-error">
            <span className="s4e-pulse-dot w-[6px] h-[6px] rounded-full bg-s4e-scale-red-500 shrink-0" />
            {activeCount} Active
          </span>
        </div>

        <div className="px-4 py-4 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[14px] font-semibold text-s4e-text-primary">{alertTitle}</span>
              {alertBadge && (
                <span className="px-2 py-0.5 rounded-full bg-s4e-bg-subtle text-[10px] font-medium text-s4e-text-secondary">
                  {alertBadge}
                </span>
              )}
            </div>
            <p className="text-[12px] text-s4e-text-secondary leading-relaxed">{description}</p>
          </div>

          <button
            type="button"
            onClick={onActionClick}
            className="flex items-center gap-1 text-[12px] font-medium text-s4e-brand-primary-500 hover:text-s4e-brand-primary-600 transition-colors group"
          >
            {action}
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    );
  },
);
AlertCard.displayName = "AlertCard";

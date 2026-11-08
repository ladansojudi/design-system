"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — EmptyState
 *
 * Drop this file into your project at components/ui/empty-state.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

export type EmptyStateTone = "neutral" | "warning" | "alert";
export type EmptyStateSize = "sm" | "md";

export type EmptyStateAction = {
  label:    string;
  icon?:    React.ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
};

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon:              React.ComponentType<{ size?: number; className?: string }>;
  title:             string;
  description?:      string;
  tone?:             EmptyStateTone;
  size?:             EmptyStateSize;
  primaryAction?:    EmptyStateAction;
  secondaryAction?:  EmptyStateAction;
}

const TONE_ICON_WRAP: Record<EmptyStateTone, string> = {
  neutral: "bg-snt-bg-subtle text-snt-text-secondary",
  warning: "bg-snt-bg-warning-subtle text-snt-scale-yellow-600",
  alert:   "bg-snt-bg-error-subtle text-snt-text-error",
};

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon: Icon,
      title,
      description,
      tone = "neutral",
      size = "md",
      primaryAction,
      secondaryAction,
      className,
      ...props
    },
    ref,
  ) => {
    const iconBox   = size === "sm" ? "w-10 h-10"   : "w-14 h-14";
    const iconSize  = size === "sm" ? 18            : 24;
    const titleSize = size === "sm" ? "text-snt-14" : "text-snt-16";
    const descSize  = size === "sm" ? "text-snt-12" : "text-snt-14";
    const pad       = size === "sm" ? "px-6 py-8"   : "px-6 py-12";

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center",
          pad,
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "rounded-full flex items-center justify-center mb-4 shrink-0",
            iconBox,
            TONE_ICON_WRAP[tone],
          )}
        >
          <Icon size={iconSize} />
        </div>

        <div className={cn("font-semibold text-snt-text-primary", titleSize)}>
          {title}
        </div>

        {description && (
          <p
            className={cn(
              "mt-1.5 max-w-sm text-snt-text-secondary leading-relaxed",
              descSize,
            )}
          >
            {description}
          </p>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="mt-5 flex items-center gap-2">
            {primaryAction && (
              <button
                type="button"
                onClick={primaryAction.onClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-snt-brand-primary-500 text-snt-text-white text-snt-12 font-medium hover:bg-snt-brand-primary-600 transition-colors"
              >
                {primaryAction.icon && <primaryAction.icon size={13} />}
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-snt-border-default bg-snt-surface-app text-snt-text-primary text-snt-12 font-medium hover:bg-snt-bg-subtle transition-colors"
              >
                {secondaryAction.icon && <secondaryAction.icon size={13} />}
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);
EmptyState.displayName = "EmptyState";

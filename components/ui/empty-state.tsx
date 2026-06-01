"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — EmptyState
 *
 * Drop this file into your project at components/ui/empty-state.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
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
  neutral: "bg-s4e-neutral-grey-100 text-s4e-text-secondary",
  warning: "bg-s4e-scale-yellow-50 text-s4e-scale-yellow-600",
  alert:   "bg-s4e-scale-red-50 text-s4e-scale-red-600",
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
    const titleSize = size === "sm" ? "text-[13px]" : "text-[15px]";
    const descSize  = size === "sm" ? "text-[12px]" : "text-[13px]";
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

        <div className={cn("font-semibold text-s4e-text-primary", titleSize)}>
          {title}
        </div>

        {description && (
          <p
            className={cn(
              "mt-1.5 max-w-sm text-s4e-text-secondary leading-relaxed",
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-s4e-brand-primary-500 text-s4e-text-white text-[12px] font-medium hover:bg-s4e-brand-primary-600 transition-colors"
              >
                {primaryAction.icon && <primaryAction.icon size={13} />}
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-s4e-neutral-divider-10 bg-s4e-surface-app text-s4e-text-primary text-[12px] font-medium hover:bg-s4e-neutral-grey-100 transition-colors"
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

"use client";

import * as React from "react";
import { CircleCheck, CircleAlert, Lightbulb, Ban, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Toast & Tooltip
 *
 * Drop this file into your project at components/ui/toast-tooltip.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • lucide-react icons
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

// ── Toast ──────────────────────────────────────────────────────────────────

type ToastIntent = "success" | "alert" | "info" | "warning";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  intent?:      ToastIntent;
  title?:       string;
  description?: string;
  onDismiss?:   () => void;
}

const TOAST_ICON: Record<ToastIntent, React.ComponentType<{ size?: number; className?: string }>> = {
  success: CircleCheck,
  alert:   CircleAlert,
  info:    Lightbulb,
  warning: Ban,
};

const TOAST_COLOR: Record<ToastIntent, string> = {
  success: "text-s4e-feedback-success",
  alert:   "text-s4e-feedback-warning",
  info:    "text-s4e-feedback-info",
  warning: "text-s4e-feedback-alert",
};

const TOAST_BAR: Record<ToastIntent, string> = {
  success: "bg-s4e-feedback-success",
  alert:   "bg-s4e-feedback-warning",
  info:    "bg-s4e-feedback-info",
  warning: "bg-s4e-feedback-alert",
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      intent = "info",
      title,
      description,
      onDismiss,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Icon = TOAST_ICON[intent];

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden bg-s4e-surface-app border border-s4e-neutral-divider-10 rounded-xl shadow-sm",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <Icon size={20} className={cn("shrink-0", TOAST_COLOR[intent])} />
          <div className="flex-1 min-w-0">
            {title && (
              <div className="text-[13px] font-semibold text-s4e-text-primary">{title}</div>
            )}
            {description && (
              <div className="text-[12px] text-s4e-text-secondary">{description}</div>
            )}
            {!title && !description && children}
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="shrink-0 text-s4e-text-disabled hover:text-s4e-text-primary transition-colors"
              aria-label="Dismiss"
            >
              <X size={15} />
            </button>
          )}
        </div>
        <div className="h-[3px] w-full bg-s4e-neutral-grey-100">
          <div className={cn("h-full toast-timer-bar", TOAST_BAR[intent])} />
        </div>
      </div>
    );
  },
);
Toast.displayName = "Toast";

// ── Tooltip ────────────────────────────────────────────────────────────────

type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content:    string;
  position?:  TooltipPosition;
}

const BUBBLE_POS: Record<TooltipPosition, string> = {
  top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left:   "right-full top-1/2 -translate-y-1/2 mr-2",
  right:  "left-full top-1/2 -translate-y-1/2 ml-2",
};

const ARROW_POS: Record<TooltipPosition, string> = {
  top:    "top-full left-1/2 -translate-x-1/2",
  bottom: "bottom-full left-1/2 -translate-x-1/2",
  left:   "left-full top-1/2 -translate-y-1/2",
  right:  "right-full top-1/2 -translate-y-1/2",
};

const ARROW_BORDER: Record<TooltipPosition, string> = {
  top:    "border-t-s4e-neutral-grey-900 border-b-transparent border-x-transparent",
  bottom: "border-b-s4e-neutral-grey-900 border-t-transparent border-x-transparent",
  left:   "border-l-s4e-neutral-grey-900 border-r-transparent border-y-transparent",
  right:  "border-r-s4e-neutral-grey-900 border-l-transparent border-y-transparent",
};

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, position = "top", className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative inline-flex", className)} {...props}>
        {children}
        <div
          className={cn(
            "absolute z-50 w-56 px-3 py-2 rounded-xl text-[12px] text-s4e-text-inverse leading-relaxed pointer-events-none",
            "bg-s4e-neutral-grey-900",
            BUBBLE_POS[position],
          )}
        >
          {content}
          <div
            className={cn(
              "absolute border-4",
              ARROW_POS[position],
              ARROW_BORDER[position],
            )}
          />
        </div>
      </div>
    );
  },
);
Tooltip.displayName = "Tooltip";

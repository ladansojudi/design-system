"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Textarea
 *
 * Drop this file into your project at components/ui/textarea.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

type State = "default" | "focused" | "error" | "disabled";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "state"> {
  label?:       string;
  state?:       State;
  helperText?:  string;
  errorText?:   string;
  showCounter?: boolean;
}

const STATE_BORDER: Record<State, string> = {
  default:  "border-s4e-neutral-grey-300",
  focused:  "border-s4e-brand-primary-600 ring-2 ring-s4e-brand-primary-500/20",
  error:    "border-s4e-scale-red-600",
  disabled: "border-s4e-neutral-grey-200 opacity-40",
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      state = "default",
      helperText,
      errorText,
      showCounter = false,
      maxLength,
      rows = 4,
      disabled,
      value,
      className,
      ...props
    },
    ref,
  ) => {
    const resolvedState: State = disabled ? "disabled" : state;
    const isError    = resolvedState === "error";
    const isDisabled = resolvedState === "disabled";
    const len        = typeof value === "string" ? value.length : 0;

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label
            className={cn(
              "block text-[11px] font-medium mb-1.5",
              isError ? "text-s4e-scale-red-600" : "text-s4e-text-secondary",
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          value={value}
          disabled={isDisabled}
          maxLength={maxLength}
          className={cn(
            "block w-full rounded-md px-3 py-2 text-[13px] text-s4e-text-primary placeholder:text-s4e-text-disabled bg-s4e-surface-row",
            "border resize-y transition-colors",
            "focus:outline-none focus:border-s4e-brand-primary-600 focus:ring-2 focus:ring-s4e-brand-primary-500/20",
            STATE_BORDER[resolvedState],
            isDisabled && "cursor-not-allowed",
          )}
          {...props}
        />
        <div className="mt-1 flex items-start justify-between gap-2">
          <div
            className={cn(
              "text-[10.5px] leading-tight flex-1",
              isError ? "text-s4e-scale-red-600" : "text-s4e-text-disabled",
            )}
          >
            {isError ? errorText : helperText}
          </div>
          {(showCounter || maxLength) && (
            <div
              className={cn(
                "text-[10.5px] tabular-nums shrink-0",
                maxLength && len > maxLength * 0.9
                  ? "text-s4e-scale-yellow-700"
                  : "text-s4e-text-disabled",
              )}
            >
              {len}{maxLength ? `/${maxLength}` : ""}
            </div>
          )}
        </div>
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

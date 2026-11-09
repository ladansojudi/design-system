"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Textarea
 *
 * Drop this file into your project at components/ui/textarea.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
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
  default:  "border-snt-border-strong",
  focused:  "border-snt-border-focus ring-2 ring-snt-focus-ring/20",
  error:    "border-snt-border-error",
  disabled: "border-snt-neutral-grey-200 opacity-40",
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
      id,
      ...props
    },
    ref,
  ) => {
    const autoId     = React.useId();
    const fieldId    = id ?? autoId;
    const helperId   = `${fieldId}-helper`;
    const resolvedState: State = disabled ? "disabled" : state;
    const isError    = resolvedState === "error";
    const isDisabled = resolvedState === "disabled";
    const len        = typeof value === "string" ? value.length : 0;
    const message    = isError && errorText ? errorText : helperText;

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(
              "block text-snt-11 font-medium mb-1.5",
              isError ? "text-snt-text-error" : "text-snt-text-secondary",
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          value={value}
          disabled={isDisabled}
          maxLength={maxLength}
          aria-invalid={isError || undefined}
          aria-describedby={message ? helperId : undefined}
          className={cn(
            "block w-full rounded-md shadow-snt-control px-3 py-2 text-snt-14 text-snt-text-primary placeholder:text-snt-text-secondary bg-snt-surface-row",
            "border resize-y transition-colors",
            "focus:outline-none focus:border-snt-border-focus focus:ring-2 focus:ring-snt-focus-ring/20",
            STATE_BORDER[resolvedState],
            isDisabled && "cursor-not-allowed",
          )}
          {...props}
        />
        <div className="mt-1 flex items-start justify-between gap-2">
          <div
            id={message ? helperId : undefined}
            className={cn(
              "text-snt-11 leading-tight flex-1",
              isError ? "text-snt-text-error" : "text-snt-text-secondary",
            )}
          >
            {message}
          </div>
          {(showCounter || maxLength) && (
            <div
              className={cn(
                "text-snt-11 tabular-nums shrink-0",
                maxLength && len > maxLength * 0.9
                  ? "text-snt-scale-yellow-700"
                  : "text-snt-text-secondary",
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

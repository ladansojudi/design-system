"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — TextField
 *
 * Drop this file into your project at components/ui/text-field.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

type Variant = "filled" | "outlined";
type State   = "default" | "focused" | "error" | "disabled";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?:      string;
  variant?:    Variant;
  state?:      State;
  helperText?: string;
  errorText?:  string;
}

const LABEL_COLOR: Record<State, string> = {
  default:  "text-s4e-text-disabled",
  focused:  "text-s4e-brand-primary-600",
  error:    "text-s4e-scale-red-600",
  disabled: "text-s4e-text-disabled",
};

const FILLED_STYLE: Record<State, string> = {
  default:  "bg-s4e-neutral-grey-100 border-b-2 border-s4e-neutral-grey-300",
  focused:  "bg-s4e-neutral-grey-100 border-b-2 border-s4e-brand-primary-600",
  error:    "bg-s4e-scale-red-50 border-b-2 border-s4e-scale-red-600",
  disabled: "bg-s4e-neutral-grey-100 border-b-2 border-s4e-neutral-grey-200 opacity-40",
};

const OUTLINED_STYLE: Record<State, string> = {
  default:  "border border-s4e-neutral-grey-300",
  focused:  "border-2 border-s4e-brand-primary-600",
  error:    "border border-s4e-scale-red-600",
  disabled: "border border-s4e-neutral-grey-200 opacity-40",
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      variant    = "filled",
      state      = "default",
      helperText,
      errorText,
      disabled,
      className,
      value,
      ...props
    },
    ref,
  ) => {
    const resolvedState: State = disabled ? "disabled" : state;
    const isError    = resolvedState === "error";
    const isFocused  = resolvedState === "focused";
    const isDisabled = resolvedState === "disabled";
    const hasValue   = value !== undefined && value !== "";
    const isActive   = hasValue || isFocused;

    if (variant === "filled") {
      return (
        <div className={cn("w-full", className)}>
          <div className={cn("rounded-t-md px-3 py-1.5", FILLED_STYLE[resolvedState])}>
            {label && (
              <div className={cn("text-[11px] font-medium leading-none mb-1", LABEL_COLOR[resolvedState])}>
                {label}
              </div>
            )}
            <input
              ref={ref}
              disabled={isDisabled}
              value={value}
              className="block w-full bg-transparent border-0 p-0 text-[14px] text-s4e-text-primary placeholder:text-s4e-text-disabled focus:outline-none disabled:cursor-not-allowed"
              {...props}
            />
          </div>
          <div className="mt-1 min-h-[14px]">
            {isError && errorText ? (
              <span className="text-[11px] text-s4e-scale-red-600 px-3">{errorText}</span>
            ) : helperText ? (
              <span className="text-[11px] text-s4e-text-disabled px-3">{helperText}</span>
            ) : null}
          </div>
        </div>
      );
    }

    return (
      <div className={cn("w-full", className)}>
        <div className={cn("relative rounded-md px-3 pt-3 pb-1.5", OUTLINED_STYLE[resolvedState])}>
          {label && (
            <div
              className={cn(
                "absolute text-[11px] font-medium leading-none pointer-events-none transition-all",
                isActive
                  ? cn("-top-[6px] left-2 bg-s4e-surface-app px-1", LABEL_COLOR[resolvedState])
                  : "top-1/2 -translate-y-1/2 left-3 text-s4e-text-disabled",
              )}
            >
              {label}
            </div>
          )}
          <input
            ref={ref}
            disabled={isDisabled}
            value={value}
            className="block w-full bg-transparent border-0 p-0 text-[14px] text-s4e-text-primary placeholder:text-s4e-text-disabled focus:outline-none disabled:cursor-not-allowed"
            {...props}
          />
        </div>
        <div className="mt-1 min-h-[14px]">
          {isError && errorText ? (
            <span className="text-[11px] text-s4e-scale-red-600">{errorText}</span>
          ) : helperText ? (
            <span className="text-[11px] text-s4e-text-disabled">{helperText}</span>
          ) : null}
        </div>
      </div>
    );
  },
);
TextField.displayName = "TextField";

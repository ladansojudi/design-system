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
  default:  "text-s4e-text-secondary",
  focused:  "text-s4e-brand-primary-600",
  error:    "text-s4e-text-error",
  disabled: "text-s4e-text-disabled",
};

const FILLED_STYLE: Record<State, string> = {
  default:  "bg-s4e-bg-subtle border-b-2 border-s4e-border-strong",
  focused:  "bg-s4e-bg-subtle border-b-2 border-s4e-border-focus",
  error:    "bg-s4e-bg-error-subtle border-b-2 border-s4e-border-error",
  disabled: "bg-s4e-bg-subtle border-b-2 border-s4e-neutral-grey-200 opacity-40",
};

const OUTLINED_STYLE: Record<State, string> = {
  default:  "border border-s4e-border-strong",
  focused:  "border-2 border-s4e-border-focus",
  error:    "border border-s4e-border-error",
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
      defaultValue,
      id,
      onFocus,
      onBlur,
      onChange,
      ...props
    },
    ref,
  ) => {
    const autoId   = React.useId();
    const inputId  = id ?? autoId;
    const helperId = `${inputId}-helper`;

    // Real focus + uncontrolled value are tracked internally so the label,
    // border and floating behaviour react to the keyboard — the `state` prop
    // only forces a visual state (e.g. for docs / screenshots).
    const [hasFocus, setHasFocus]   = React.useState(false);
    const [innerFilled, setFilled]  = React.useState(
      defaultValue !== undefined && defaultValue !== "",
    );

    const forcedState: State = disabled ? "disabled" : state;
    const resolvedState: State =
      forcedState === "default" && hasFocus ? "focused" : forcedState;
    const isError    = resolvedState === "error";
    const isFocused  = resolvedState === "focused" || (hasFocus && !isError);
    const isDisabled = resolvedState === "disabled";
    const hasValue   = value !== undefined ? value !== "" : innerFilled;
    const isActive   = hasValue || isFocused;

    const message    = isError && errorText ? errorText : helperText;

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      id:                 inputId,
      disabled:           isDisabled,
      value,
      defaultValue,
      "aria-invalid":     isError || undefined,
      "aria-describedby": message ? helperId : undefined,
      onFocus: (e) => { setHasFocus(true);  onFocus?.(e); },
      onBlur:  (e) => { setHasFocus(false); onBlur?.(e); },
      onChange: (e) => { setFilled(e.target.value !== ""); onChange?.(e); },
      className:
        "block w-full bg-transparent border-0 p-0 text-[14px] text-s4e-text-primary placeholder:text-s4e-text-secondary focus:outline-none disabled:cursor-not-allowed",
      ...props,
    };

    const helper = (
      <div className="mt-1 min-h-[14px]">
        {message ? (
          <span
            id={helperId}
            className={cn(
              "text-[11px]",
              variant === "filled" && "px-3",
              isError && errorText ? "text-s4e-text-error" : "text-s4e-text-secondary",
            )}
          >
            {message}
          </span>
        ) : null}
      </div>
    );

    if (variant === "filled") {
      return (
        <div className={cn("w-full", className)}>
          <div className={cn("rounded-t-md px-3 py-1.5", FILLED_STYLE[resolvedState])}>
            {label && (
              <label
                htmlFor={inputId}
                className={cn("block text-[11px] font-medium leading-none mb-1", LABEL_COLOR[resolvedState])}
              >
                {label}
              </label>
            )}
            <input ref={ref} {...inputProps} />
          </div>
          {helper}
        </div>
      );
    }

    return (
      <div className={cn("w-full", className)}>
        <div className={cn("relative rounded-md px-3 pt-3 pb-1.5", OUTLINED_STYLE[resolvedState])}>
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute text-[11px] font-medium leading-none pointer-events-none transition-all",
                isActive
                  ? cn("-top-[6px] left-2 bg-s4e-surface-app px-1", LABEL_COLOR[resolvedState])
                  : "top-1/2 -translate-y-1/2 left-3 text-s4e-text-secondary",
              )}
            >
              {label}
            </label>
          )}
          <input ref={ref} {...inputProps} />
        </div>
        {helper}
      </div>
    );
  },
);
TextField.displayName = "TextField";

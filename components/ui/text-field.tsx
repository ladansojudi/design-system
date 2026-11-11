"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — TextField
 *
 * Drop this file into your project at components/ui/text-field.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
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
  default:  "text-snt-text-secondary",
  focused:  "text-snt-brand-primary-600",
  error:    "text-snt-text-error",
  disabled: "text-snt-text-disabled",
};

const FILLED_STYLE: Record<State, string> = {
  default:  "bg-snt-bg-subtle border-b-2 border-snt-border-strong",
  focused:  "bg-snt-bg-subtle border-b-2 border-snt-border-focus",
  error:    "bg-snt-bg-error-subtle border-b-2 border-snt-border-error",
  disabled: "bg-snt-bg-subtle border-b-2 border-snt-neutral-grey-200 opacity-40",
};

const OUTLINED_STYLE: Record<State, string> = {
  default:  "border border-snt-border-strong",
  focused:  "border-2 border-snt-border-focus",
  error:    "border border-snt-border-error",
  disabled: "border border-snt-neutral-grey-200 opacity-40",
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
        "block w-full bg-transparent border-0 p-0 text-snt-14 text-snt-text-primary placeholder:text-snt-text-secondary focus:outline-none disabled:cursor-not-allowed",
      ...props,
    };

    const helper = (
      <div className="mt-1 min-h-[14px]">
        {message ? (
          <span
            id={helperId}
            className={cn(
              "text-snt-11",
              variant === "filled" && "px-3",
              isError && errorText ? "text-snt-text-error" : "text-snt-text-secondary",
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
          <div className={cn("rounded-t-md px-3 py-1.5 compact:py-1", FILLED_STYLE[resolvedState])}>
            {label && (
              <label
                htmlFor={inputId}
                className={cn("block text-snt-11 font-medium leading-none mb-1", LABEL_COLOR[resolvedState])}
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
        <div className={cn("relative rounded-md px-3 pt-3 pb-1.5 shadow-snt-control", OUTLINED_STYLE[resolvedState])}>
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute text-snt-11 font-medium leading-none pointer-events-none transition-all",
                isActive
                  ? cn("-top-[6px] left-2 bg-snt-surface-app px-1", LABEL_COLOR[resolvedState])
                  : "top-1/2 -translate-y-1/2 left-3 text-snt-text-secondary",
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

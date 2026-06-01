"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Select
 *
 * Drop this file into your project at components/ui/select.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 *   • lucide-react for the Check / ChevronDown icons.
 */

export type SelectOption = {
  value:     string;
  label:     string;
  disabled?: boolean;
};

export type SelectState = "Default" | "Hover" | "Focused" | "Error" | "Disabled";

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?:       string;
  options:      SelectOption[];
  value?:       string;
  onChange?:    (v: string) => void;
  placeholder?: string;
  state?:       SelectState;
  helperText?:  string;
  errorText?:   string;
  disabled?:    boolean;
}

const BORDER_CLASS: Record<SelectState, string> = {
  Default:  "border-s4e-neutral-grey-300",
  Hover:    "border-s4e-neutral-grey-500",
  Focused:  "border-s4e-brand-primary-600",
  Error:    "border-s4e-scale-red-600",
  Disabled: "border-s4e-neutral-grey-300",
};

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      placeholder = "Select…",
      state = "Default",
      helperText,
      errorText,
      disabled = false,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const [open, setOpen] = React.useState(false);
    const innerRef        = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    const isError    = state === "Error";
    const isDisabled = disabled || state === "Disabled";
    const isFocused  = state === "Focused" || open;
    const selected   = options.find((o) => o.value === value);

    const borderClass = isError
      ? BORDER_CLASS.Error
      : isFocused
        ? BORDER_CLASS.Focused
        : BORDER_CLASS[state];

    return (
      <div ref={innerRef} className={cn("w-full", className)} {...props}>
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
        <div className="relative">
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className={cn(
              "w-full flex items-center justify-between gap-2 h-9 px-3 rounded-md text-[13px] text-left transition-colors",
              "border", borderClass, "bg-s4e-surface-row",
              isDisabled
                ? "opacity-40 cursor-not-allowed"
                : "cursor-pointer hover:border-s4e-neutral-grey-500 focus:outline-none focus:border-s4e-brand-primary-600",
              isFocused && !isError && "ring-2 ring-s4e-brand-primary-500/20",
            )}
          >
            <span
              className={cn(
                selected ? "text-s4e-text-primary" : "text-s4e-text-disabled",
                "truncate",
              )}
            >
              {selected?.label ?? placeholder}
            </span>
            <ChevronDown
              size={14}
              className={cn(
                "shrink-0 text-s4e-text-disabled transition-transform",
                open && "rotate-180",
              )}
            />
          </button>

          {open && !isDisabled && (
            <div
              role="listbox"
              className="absolute z-20 left-0 right-0 mt-1.5 max-h-60 overflow-auto rounded-md border border-s4e-neutral-divider-10 bg-s4e-surface-row shadow-s4e-lg"
            >
              {options.map((opt) => {
                const isSel = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    disabled={opt.disabled}
                    onClick={() => {
                      if (!opt.disabled) {
                        onChange?.(opt.value);
                        setOpen(false);
                      }
                    }}
                    className={cn(
                      "w-full flex items-center justify-between gap-2 px-3 py-2 text-[13px] text-left",
                      opt.disabled
                        ? "text-s4e-text-disabled cursor-not-allowed"
                        : "text-s4e-text-primary cursor-pointer hover:bg-s4e-surface-row-hover",
                      isSel && "bg-s4e-brand-primary-500/8",
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSel && (
                      <Check size={14} className="text-s4e-brand-primary-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {(errorText || helperText) && (
          <div
            className={cn(
              "mt-1 text-[10.5px] leading-tight",
              isError ? "text-s4e-scale-red-600" : "text-s4e-text-disabled",
            )}
          >
            {isError ? errorText : helperText}
          </div>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";

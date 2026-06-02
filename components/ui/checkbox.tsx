"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Checkbox
 *
 * Drop this file into your project at components/ui/checkbox.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 *   • lucide-react for the Check / Minus icons.
 */

type Tone = "primary" | "neutral";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  checked:        boolean;
  indeterminate?: boolean;
  onChange?:      (v: boolean) => void;
  tone?:          Tone;
  label?:         string;
  description?:   string;
}

const FILL_CLASS: Record<Tone, string> = {
  primary: "bg-s4e-btn-primary-600 border-s4e-btn-primary-600",
  neutral: "bg-s4e-btn-neutral-800 border-s4e-btn-neutral-800",
};

const EMPTY_CLASS = "border-s4e-neutral-grey-400 bg-s4e-surface-row";

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      indeterminate = false,
      onChange,
      disabled = false,
      tone = "primary",
      label,
      description,
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const filled    = checked || indeterminate;
    const fillClass = filled ? FILL_CLASS[tone] : EMPTY_CLASS;

    return (
      <label
        htmlFor={id}
        className={cn(
          "flex items-start gap-2.5 group",
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
          className,
        )}
      >
        <span className="relative inline-flex items-center justify-center mt-[1px]">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="peer sr-only"
            {...props}
          />
          <span
            aria-hidden
            className={cn(
              "w-[18px] h-[18px] rounded-[3px] border-2 flex items-center justify-center transition-colors",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-s4e-brand-primary-500",
              fillClass,
              !disabled && !filled && "group-hover:border-s4e-neutral-grey-600",
            )}
          >
            {indeterminate
              ? <Minus size={12} className="text-s4e-text-on-accent" />
              : checked && <Check size={12} className="text-s4e-text-on-accent" />
            }
          </span>
        </span>
        {(label || description) && (
          <span className="flex-1 min-w-0">
            {label && (
              <span className={cn(
                "block text-[14px] leading-tight",
                disabled ? "text-s4e-text-disabled" : "text-s4e-text-primary",
              )}>
                {label}
              </span>
            )}
            {description && (
              <span className="block text-[11px] text-s4e-text-disabled mt-0.5 leading-snug">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";

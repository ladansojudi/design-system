"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Checkbox
 *
 * Drop this file into your project at components/ui/checkbox.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
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
  primary: "bg-snt-btn-primary-600 border-snt-btn-primary-600",
  neutral: "bg-snt-btn-neutral-800 border-snt-btn-neutral-800",
};

const EMPTY_CLASS = "border-snt-neutral-grey-400 bg-snt-surface-row";

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
    const inputRef  = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // `indeterminate` only exists as a DOM property — without this, screen
    // readers announce "not checked" instead of "mixed".
    React.useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const autoId    = React.useId();
    const inputId   = id ?? autoId;
    const descId    = `${inputId}-description`;
    const filled    = checked || indeterminate;
    const fillClass = filled ? FILL_CLASS[tone] : EMPTY_CLASS;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-start gap-2.5 group",
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
          className,
        )}
      >
        <span className="relative inline-flex items-center justify-center mt-px">
          <input
            ref={inputRef}
            id={inputId}
            type="checkbox"
            aria-describedby={description ? descId : undefined}
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
              "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-snt-focus-ring",
              fillClass,
              !disabled && !filled && "group-hover:border-snt-neutral-grey-600",
            )}
          >
            {indeterminate
              ? <Minus size={12} aria-hidden className="text-snt-text-on-accent" />
              : checked && <Check size={12} aria-hidden className="text-snt-text-on-accent" />
            }
          </span>
        </span>
        {(label || description) && (
          <span className="flex-1 min-w-0">
            {label && (
              <span className={cn(
                "block text-snt-14 leading-tight",
                disabled ? "text-snt-text-disabled" : "text-snt-text-primary",
              )}>
                {label}
              </span>
            )}
            {description && (
              <span id={descId} className="block text-snt-11 text-snt-text-secondary mt-0.5 leading-snug">
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

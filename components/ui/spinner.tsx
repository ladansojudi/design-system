"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Spinner
 *
 * Drop this file into your project at components/ui/spinner.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

type Size = "xs" | "sm" | "md" | "lg";
type Tone = "primary" | "neutral" | "white";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?:  Size;
  tone?:  Tone;
  label?: string;
}

const SIZE_CLASS: Record<Size, string> = {
  xs: "w-3 h-3 border-2",
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-[2.5px]",
  lg: "w-9 h-9 border-[3px]",
};

const TONE_CLASS: Record<Tone, string> = {
  primary: "border-s4e-brand-primary-500/25 border-t-s4e-brand-primary-500",
  neutral: "border-s4e-text-disabled/25 border-t-s4e-text-secondary",
  white:   "border-s4e-text-white/30 border-t-s4e-text-white",
};

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      size  = "md",
      tone  = "primary",
      label = "Loading",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn("inline-block align-middle", className)}
        {...props}
      >
        <span
          className={cn(
            "block rounded-full animate-spin",
            SIZE_CLASS[size],
            TONE_CLASS[tone],
          )}
        />
        <span className="sr-only">{label}</span>
      </span>
    );
  },
);
Spinner.displayName = "Spinner";

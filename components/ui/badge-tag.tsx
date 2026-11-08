"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Badge & Tag
 *
 * Drop this file into your project at components/ui/badge-tag.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 *
 * Badge — status pill (defaults to a colored dot).
 * Tag   — label pill (same primitive, no dot by default).
 */

type Tone        = "warning" | "error" | "success" | "neutral" | "info" | "primary";
type DotPosition = "left" | "right";

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  tone?:        Tone;
  /** @deprecated Use `tone` (consistent with Banner, Checkbox, Spinner). */
  color?:       Tone;
  showDot?:     boolean;
  dotPosition?: DotPosition;
  outlined?:    boolean;
}

export type TagProps = BadgeProps;

type ColorConfig = {
  bg:     string;
  text:   string;
  dot:    string;
  border: string;
};

const TONE_CLASS: Record<Tone, ColorConfig> = {
  warning: {
    bg:     "bg-s4e-bg-warning-subtle",
    text:   "text-s4e-scale-yellow-700",
    dot:    "bg-s4e-scale-yellow-500",
    border: "border-s4e-scale-yellow-200",
  },
  error: {
    bg:     "bg-s4e-bg-error-subtle",
    text:   "text-s4e-text-error",
    dot:    "bg-s4e-scale-red-500",
    border: "border-s4e-scale-red-200",
  },
  success: {
    bg:     "bg-s4e-bg-success-subtle",
    text:   "text-s4e-scale-green-600",
    dot:    "bg-s4e-scale-green-500",
    border: "border-s4e-scale-green-200",
  },
  neutral: {
    bg:     "bg-s4e-bg-subtle",
    text:   "text-s4e-text-secondary",
    dot:    "bg-s4e-neutral-grey-400",
    border: "border-s4e-border-default",
  },
  info: {
    bg:     "bg-s4e-bg-info-subtle",
    text:   "text-s4e-scale-blue-600",
    dot:    "bg-s4e-scale-blue-500",
    border: "border-s4e-scale-blue-200",
  },
  primary: {
    bg:     "bg-s4e-bg-brand-subtle",
    text:   "text-s4e-brand-primary-600",
    dot:    "bg-s4e-brand-primary-500",
    border: "border-s4e-brand-primary-200",
  },
};

const BASE =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium";

function renderPill(
  {
    tone,
    color,
    showDot,
    dotPosition = "left",
    outlined    = false,
    className,
    children,
    ...props
  }: BadgeProps,
  ref: React.Ref<HTMLSpanElement>,
  defaultShowDot: boolean,
) {
  const cfg = TONE_CLASS[tone ?? color ?? "neutral"];
  const dotVisible = showDot ?? defaultShowDot;
  const dot = (
    <span
      aria-hidden
      className={cn("inline-block w-[7px] h-[7px] rounded-full shrink-0", cfg.dot)}
    />
  );

  return (
    <span
      ref={ref}
      className={cn(
        BASE,
        outlined
          ? cn("border bg-transparent", cfg.border, cfg.text)
          : cn(cfg.bg, cfg.text),
        className,
      )}
      {...props}
    >
      {dotVisible && dotPosition === "left" && dot}
      <span>{children}</span>
      {dotVisible && dotPosition === "right" && dot}
    </span>
  );
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => renderPill(props, ref, true),
);
Badge.displayName = "Badge";

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (props, ref) => renderPill(props, ref, false),
);
Tag.displayName = "Tag";

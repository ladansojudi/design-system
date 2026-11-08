"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Badge & Tag
 *
 * Drop this file into your project at components/ui/badge-tag.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
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
    bg:     "bg-snt-bg-warning-subtle",
    text:   "text-snt-scale-yellow-700",
    dot:    "bg-snt-scale-yellow-500",
    border: "border-snt-scale-yellow-200",
  },
  error: {
    bg:     "bg-snt-bg-error-subtle",
    text:   "text-snt-text-error",
    dot:    "bg-snt-scale-red-500",
    border: "border-snt-scale-red-200",
  },
  success: {
    bg:     "bg-snt-bg-success-subtle",
    text:   "text-snt-scale-green-600",
    dot:    "bg-snt-scale-green-500",
    border: "border-snt-scale-green-200",
  },
  neutral: {
    bg:     "bg-snt-bg-subtle",
    text:   "text-snt-text-secondary",
    dot:    "bg-snt-neutral-grey-400",
    border: "border-snt-border-default",
  },
  info: {
    bg:     "bg-snt-bg-info-subtle",
    text:   "text-snt-scale-blue-600",
    dot:    "bg-snt-scale-blue-500",
    border: "border-snt-scale-blue-200",
  },
  primary: {
    bg:     "bg-snt-bg-brand-subtle",
    text:   "text-snt-brand-primary-600",
    dot:    "bg-snt-brand-primary-500",
    border: "border-snt-brand-primary-200",
  },
};

const BASE =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-snt-12 font-medium";

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

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

type Color       = "warning" | "error" | "success" | "neutral" | "info" | "primary";
type DotPosition = "left" | "right";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?:       Color;
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

const COLOR_CLASS: Record<Color, ColorConfig> = {
  warning: {
    bg:     "bg-s4e-scale-yellow-50",
    text:   "text-s4e-scale-yellow-700",
    dot:    "bg-s4e-scale-yellow-500",
    border: "border-s4e-scale-yellow-300",
  },
  error: {
    bg:     "bg-s4e-scale-red-50",
    text:   "text-s4e-scale-red-600",
    dot:    "bg-s4e-scale-red-500",
    border: "border-s4e-scale-red-300",
  },
  success: {
    bg:     "bg-s4e-scale-green-50",
    text:   "text-s4e-scale-green-600",
    dot:    "bg-s4e-scale-green-500",
    border: "border-s4e-scale-green-300",
  },
  neutral: {
    bg:     "bg-s4e-neutral-grey-100",
    text:   "text-s4e-text-secondary",
    dot:    "bg-s4e-neutral-grey-400",
    border: "border-s4e-neutral-divider-10",
  },
  info: {
    bg:     "bg-s4e-scale-blue-50",
    text:   "text-s4e-scale-blue-600",
    dot:    "bg-s4e-scale-blue-500",
    border: "border-s4e-scale-blue-300",
  },
  primary: {
    bg:     "bg-s4e-brand-primary-50",
    text:   "text-s4e-brand-primary-600",
    dot:    "bg-s4e-brand-primary-500",
    border: "border-s4e-brand-primary-200",
  },
};

const BASE =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium";

function renderPill(
  {
    color       = "neutral",
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
  const cfg = COLOR_CLASS[color];
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

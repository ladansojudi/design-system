"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Skeleton
 *
 * Drop this file into your project at components/ui/skeleton.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 *   • The `snt-pulse-dot` keyframe utility from tokens.css.
 *
 * Usage:
 *   <Skeleton className="h-3 w-48" />            // line
 *   <Skeleton className="h-16 w-48" />           // block
 *   <Skeleton className="h-10 w-10 rounded-full" />  // avatar
 */

export const Skeleton = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden
      className={cn("block bg-snt-neutral-grey-200 rounded-md snt-pulse-dot", className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";

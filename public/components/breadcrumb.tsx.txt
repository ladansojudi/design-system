"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Breadcrumb
 *
 * Drop this file into your project at components/ui/breadcrumb.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {children}
      </nav>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isCurrent?: boolean;
  visited?:   boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  ({ className, isCurrent, visited, children, href, ...props }, ref) => {
    if (isCurrent) {
      return (
        <span
          aria-current="page"
          className={cn("text-[14px] text-s4e-text-disabled", className)}
        >
          {children}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "text-[14px] font-medium cursor-pointer transition-colors",
          visited
            ? "text-s4e-text-disabled"
            : "text-s4e-text-primary hover:text-s4e-brand-primary-500 hover:underline hover:underline-offset-2",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        aria-hidden
        className={cn("text-s4e-text-disabled text-[12px] select-none", className)}
        {...props}
      >
        {children ?? "•"}
      </span>
    );
  },
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Breadcrumb
 *
 * Drop this file into your project at components/ui/breadcrumb.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

export type BreadcrumbProps = React.HTMLAttributes<HTMLElement>;

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={className}
        {...props}
      >
        <ol className="flex flex-wrap items-center gap-2">
          {React.Children.map(children, (child) => (
            <li
              aria-hidden={React.isValidElement(child) && child.type === BreadcrumbSeparator ? true : undefined}
              className="flex items-center"
            >
              {child}
            </li>
          ))}
        </ol>
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
          className={cn("text-snt-14 text-snt-text-secondary", className)}
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
          "rounded-sm text-snt-14 font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-snt-surface-app",
          visited
            ? "text-snt-text-secondary"
            : "text-snt-text-primary hover:text-snt-brand-primary-500 hover:underline hover:underline-offset-2",
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

export type BreadcrumbSeparatorProps = React.HTMLAttributes<HTMLSpanElement>;

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        aria-hidden
        className={cn("text-snt-text-secondary text-snt-12 select-none", className)}
        {...props}
      >
        {children ?? "•"}
      </span>
    );
  },
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

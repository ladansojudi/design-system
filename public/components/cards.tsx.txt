"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Cards
 *
 * Drop this file into your project at components/ui/cards.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 *
 * Card is the generic container (Header / Title / Description / Content /
 * Footer); InsightCard and AlertCard are presets built on it.
 */

type HeadingLevel = "h2" | "h3" | "h4";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border border-snt-border-default bg-snt-surface-app text-snt-text-primary", className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-between gap-3 px-5 pt-5", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level for the document outline. Defaults to h3. */
  as?: HeadingLevel;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Heading = "h3", className, ...props }, ref) => (
    <Heading ref={ref} className={cn("text-snt-14 font-semibold text-snt-text-primary", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-snt-12 leading-relaxed text-snt-text-secondary", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("px-5 py-4", className)} {...props} />,
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 px-5 pb-5", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export type InsightRow = { label: string; value: string | number };

export interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title:           string;
  rows:            InsightRow[];
  actionLabel?:    string;
  onActionClick?:  () => void;
  headingLevel?:   HeadingLevel;
}

export const InsightCard = React.forwardRef<HTMLDivElement, InsightCardProps>(
  ({ title, rows, actionLabel = "View Details", onActionClick, headingLevel, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("px-5 py-5 flex flex-col gap-4", className)} {...props}>
        <div className="flex items-center justify-between">
          <CardTitle as={headingLevel}>{title}</CardTitle>
          <button
            type="button"
            onClick={onActionClick}
            className="text-snt-12 font-medium text-snt-brand-primary-500 hover:text-snt-brand-primary-600 transition-colors"
          >
            {actionLabel}
          </button>
        </div>

        <div className="space-y-0 divide-y divide-snt-border-default">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2.5">
              <span className="text-snt-12 text-snt-text-secondary">{row.label}</span>
              <span className="text-snt-14 font-semibold text-snt-text-primary">{row.value}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  },
);
InsightCard.displayName = "InsightCard";

export interface AlertCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title:         string;
  activeCount:   number;
  alertTitle:    string;
  alertBadge?:   string;
  description:   string;
  action:        string;
  onActionClick?: () => void;
  headingLevel?: HeadingLevel;
}

export const AlertCard = React.forwardRef<HTMLDivElement, AlertCardProps>(
  (
    {
      title,
      activeCount,
      alertTitle,
      alertBadge,
      description,
      action,
      onActionClick,
      headingLevel,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Card ref={ref} className={cn("overflow-hidden", className)} {...props}>
        <div className="flex items-center justify-between px-4 py-2 bg-snt-bg-subtle border-b border-snt-border-default">
          <CardTitle as={headingLevel} className="text-snt-12">{title}</CardTitle>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-snt-bg-error-subtle text-snt-11 font-semibold text-snt-text-error">
            <span aria-hidden className="snt-pulse-dot w-[6px] h-[6px] rounded-full bg-snt-scale-red-500 shrink-0" />
            {activeCount} Active
          </span>
        </div>

        <div className="px-4 py-4 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-snt-14 font-semibold text-snt-text-primary">{alertTitle}</span>
              {alertBadge && (
                <span className="px-2 py-0.5 rounded-full bg-snt-bg-subtle text-snt-10 font-medium text-snt-text-secondary">
                  {alertBadge}
                </span>
              )}
            </div>
            <p className="text-snt-12 text-snt-text-secondary leading-relaxed">{description}</p>
          </div>

          <button
            type="button"
            onClick={onActionClick}
            className="flex items-center gap-1 text-snt-12 font-medium text-snt-brand-primary-500 hover:text-snt-brand-primary-600 transition-colors group"
          >
            {action}
            <ArrowRight size={12} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </Card>
    );
  },
);
AlertCard.displayName = "AlertCard";

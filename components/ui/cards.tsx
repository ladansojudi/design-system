"use client";

import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
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
 * Footer); StatCard is a preset built on it.
 */

type HeadingLevel = "h2" | "h3" | "h4";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border border-snt-border-default bg-snt-surface-app text-snt-text-primary shadow-snt-control", className)}
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
    <Heading ref={ref} className={cn("text-snt-16 font-semibold tracking-tight text-snt-text-primary", className)} {...props} />
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

export type StatTrend = { direction: "up" | "down"; value: string; label?: string; /** Is this direction good news? Defaults to up = good. */ positive?: boolean };

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?:         React.ComponentType<{ size?: number; className?: string }>;
  title:         string;
  value:         string | number;
  /** Change versus the previous period. Pick this or `description`, not both. */
  trend?:        StatTrend;
  description?:  string;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ icon: Icon, title, value, trend, description, className, ...props }, ref) => {
    const good = trend ? (trend.positive ?? trend.direction === "up") : true;
    return (
      <Card ref={ref} className={cn("flex flex-col gap-3 px-5 py-4", className)} {...props}>
        <div className="flex items-center gap-2 text-snt-text-secondary">
          {Icon && <Icon size={14} aria-hidden className="shrink-0" />}
          <span className="text-snt-12 font-medium">{title}</span>
        </div>
        <div className="text-snt-32 font-semibold leading-none tracking-tight tabular-nums text-snt-text-primary">{value}</div>
        {trend ? (
          <div className="flex items-center gap-1.5 text-snt-12">
            <span className={cn("inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-medium", good ? "bg-snt-bg-success-subtle text-snt-text-success" : "bg-snt-bg-error-subtle text-snt-text-error")}>
              {trend.direction === "up" ? <TrendingUp size={12} aria-hidden /> : <TrendingDown size={12} aria-hidden />}
              <span className="tabular-nums">{trend.value}</span>
            </span>
            {trend.label && <span className="text-snt-text-secondary">{trend.label}</span>}
          </div>
        ) : description ? (
          <p className="text-snt-12 leading-relaxed text-snt-text-secondary">{description}</p>
        ) : null}
      </Card>
    );
  },
);
StatCard.displayName = "StatCard";

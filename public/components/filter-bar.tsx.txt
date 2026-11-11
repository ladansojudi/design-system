"use client";

import * as React from "react";
import { Search, ChevronDown, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — FilterBar
 *
 * Drop this file into your project at components/ui/filter-bar.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

export type FilterBarProps = React.HTMLAttributes<HTMLDivElement>;

export const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border border-snt-border-default rounded-xl bg-snt-surface-app shadow-snt-xs p-3 overflow-x-auto snt-scrollbar-hide",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 w-max md:w-auto">{children}</div>
      </div>
    );
  },
);
FilterBar.displayName = "FilterBar";

export interface FilterBarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  grow?: boolean;
}

export const FilterBarGroup = React.forwardRef<HTMLDivElement, FilterBarGroupProps>(
  ({ className, grow, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2",
          grow ? "md:flex-1 md:min-w-0" : "shrink-0",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FilterBarGroup.displayName = "FilterBarGroup";

export interface FilterPillProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClear"> {
  label:    string;
  icon?:    IconComponent;
  count?:   number;
  active?:  boolean;
  onClear?: () => void;
}

export const FilterPill = React.forwardRef<HTMLButtonElement, FilterPillProps>(
  ({ label, icon: Icon, count, active, onClear, className, ...props }, ref) => {
    const clearable = active && onClear;
    // The pill and its clear action are sibling buttons inside one visual
    // container — nesting a button inside a button is invalid and confuses AT.
    return (
      <span
        className={cn(
          "inline-flex items-center h-8 compact:h-7 rounded-lg border text-snt-12 font-medium select-none transition-colors shrink-0",
          active
            ? "border-snt-brand-primary-500 bg-snt-bg-brand-subtle text-snt-brand-primary-500"
            : "border-snt-border-default bg-snt-surface-app shadow-snt-control text-snt-text-secondary hover:border-snt-border-strong hover:text-snt-text-primary",
          className,
        )}
      >
        <button
          ref={ref}
          type="button"
          className={cn(
            "inline-flex items-center gap-1.5 h-full pl-2.5 rounded-lg cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring",
            clearable ? "pr-1" : "pr-2.5",
          )}
          {...props}
        >
          {Icon && <Icon size={12} aria-hidden className="opacity-70 shrink-0" />}
          <span>{label}</span>
          {count !== undefined && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-snt-brand-primary-500 text-snt-text-on-accent text-snt-10 font-bold">
              {count}
            </span>
          )}
          {!clearable && <ChevronDown size={11} aria-hidden className="opacity-50" />}
        </button>
        {clearable && (
          <button
            type="button"
            onClick={onClear}
            aria-label={`Clear ${label}`}
            className="inline-flex items-center h-full pl-0.5 pr-2.5 rounded-lg cursor-pointer hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
          >
            <X size={11} aria-hidden />
          </button>
        )}
      </span>
    );
  },
);
FilterPill.displayName = "FilterPill";

export interface FilterSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?:    string;
  onChange?: (value: string) => void;
}

export const FilterSearch = React.forwardRef<HTMLInputElement, FilterSearchProps>(
  ({ value, onChange, placeholder = "Search…", className, ...props }, ref) => {
    return (
      <div className="relative flex items-center shrink-0">
        <Search size={13} className="absolute left-3 text-snt-text-secondary pointer-events-none" />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "h-8 w-48 pl-8 pr-3 rounded-lg border border-snt-border-default bg-snt-surface-app shadow-snt-control text-snt-12 text-snt-text-primary placeholder:text-snt-text-secondary outline-none focus:border-snt-brand-primary-500 focus:ring-2 focus:ring-snt-focus-ring/20 transition-colors",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
FilterSearch.displayName = "FilterSearch";

export interface FilterActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon:      IconComponent;
  label:     string;
  iconOnly?: boolean;
  muted?:    boolean;
}

export const FilterAction = React.forwardRef<HTMLButtonElement, FilterActionProps>(
  ({ icon: Icon, label, iconOnly, muted, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        title={label}
        aria-label={iconOnly ? label : undefined}
        disabled={disabled || muted}
        className={cn(
          "inline-flex items-center gap-1.5 h-8 compact:h-7 rounded-lg border text-snt-12 font-medium transition-colors shrink-0",
          iconOnly ? "w-8 justify-center" : "px-3",
          muted
            ? "border-snt-border-default bg-snt-surface-app text-snt-text-disabled cursor-not-allowed"
            : "border-snt-border-default bg-snt-surface-app text-snt-text-secondary hover:text-snt-text-primary hover:border-snt-border-strong",
          className,
        )}
        {...props}
      >
        <Icon size={13} />
        {!iconOnly && label}
      </button>
    );
  },
);
FilterAction.displayName = "FilterAction";

export type FilterClearProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const FilterClear = React.forwardRef<HTMLButtonElement, FilterClearProps>(
  ({ className, children = "Clear", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center gap-1 h-8 compact:h-7 px-2.5 text-snt-12 font-medium text-snt-text-error hover:text-snt-scale-red-700 transition-colors shrink-0",
          className,
        )}
        {...props}
      >
        <X size={13} />
        {children}
      </button>
    );
  },
);
FilterClear.displayName = "FilterClear";

export interface FilterOverflowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
}

export const FilterOverflow = React.forwardRef<HTMLButtonElement, FilterOverflowProps>(
  ({ count, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center gap-1 h-8 compact:h-7 px-3 rounded-lg border border-dashed border-snt-border-default text-snt-12 font-medium text-snt-text-secondary hover:border-snt-brand-primary-500 hover:text-snt-brand-primary-500 transition-colors shrink-0",
          className,
        )}
        {...props}
      >
        <Plus size={12} />
        {count}
      </button>
    );
  },
);
FilterOverflow.displayName = "FilterOverflow";

export type FilterBarDividerProps = React.HTMLAttributes<HTMLDivElement>;

export const FilterBarDivider = React.forwardRef<HTMLDivElement, FilterBarDividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn("w-px h-5 bg-snt-border-default shrink-0", className)}
        {...props}
      />
    );
  },
);
FilterBarDivider.displayName = "FilterBarDivider";

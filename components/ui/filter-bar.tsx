"use client";

import * as React from "react";
import { Search, ChevronDown, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — FilterBar
 *
 * Drop this file into your project at components/ui/filter-bar.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

export type FilterBarProps = React.HTMLAttributes<HTMLDivElement>;

export const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border border-s4e-border-default rounded-xl p-3 overflow-x-auto s4e-scrollbar-hide",
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
          "inline-flex items-center h-8 rounded-lg border text-[12px] font-medium select-none transition-colors shrink-0",
          active
            ? "border-s4e-brand-primary-500 bg-s4e-bg-brand-subtle text-s4e-brand-primary-500"
            : "border-s4e-border-default bg-s4e-surface-app text-s4e-text-secondary hover:border-s4e-border-strong hover:text-s4e-text-primary",
          className,
        )}
      >
        <button
          ref={ref}
          type="button"
          className={cn(
            "inline-flex items-center gap-1.5 h-full pl-2.5 rounded-lg cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-s4e-focus-ring",
            clearable ? "pr-1" : "pr-2.5",
          )}
          {...props}
        >
          {Icon && <Icon size={12} aria-hidden className="opacity-70 shrink-0" />}
          <span>{label}</span>
          {count !== undefined && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-s4e-brand-primary-500 text-s4e-text-on-accent text-[10px] font-bold">
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
            className="inline-flex items-center h-full pl-0.5 pr-2.5 rounded-lg cursor-pointer hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-s4e-focus-ring"
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
        <Search size={13} className="absolute left-3 text-s4e-text-secondary pointer-events-none" />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "h-8 w-48 pl-8 pr-3 rounded-lg border border-s4e-border-default bg-s4e-surface-app text-[12px] text-s4e-text-primary placeholder:text-s4e-text-secondary outline-none focus:border-s4e-brand-primary-500 focus:ring-2 focus:ring-s4e-focus-ring/20 transition-colors",
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
          "inline-flex items-center gap-1.5 h-8 rounded-lg border text-[12px] font-medium transition-colors shrink-0",
          iconOnly ? "w-8 justify-center" : "px-3",
          muted
            ? "border-s4e-border-default bg-s4e-surface-app text-s4e-text-disabled cursor-not-allowed"
            : "border-s4e-border-default bg-s4e-surface-app text-s4e-text-secondary hover:text-s4e-text-primary hover:border-s4e-border-strong",
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
          "inline-flex items-center gap-1 h-8 px-2.5 text-[12px] font-medium text-s4e-text-error hover:text-s4e-scale-red-700 transition-colors shrink-0",
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
          "inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-dashed border-s4e-border-default text-[12px] font-medium text-s4e-text-secondary hover:border-s4e-brand-primary-500 hover:text-s4e-brand-primary-500 transition-colors shrink-0",
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
        className={cn("w-px h-5 bg-s4e-border-default shrink-0", className)}
        {...props}
      />
    );
  },
);
FilterBarDivider.displayName = "FilterBarDivider";

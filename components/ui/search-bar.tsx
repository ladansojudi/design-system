"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — SearchBar
 *
 * Drop this file into your project at components/ui/search-bar.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

type Variant = "default" | "ghost";

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  variant?:    Variant;
  value?:      string;
  onChange?:   (value: string) => void;
  onClear?:    () => void;
  clearable?:  boolean;
  className?:  string;
}

const CONTAINER_BASE =
  "flex items-center gap-2 rounded-lg px-3 h-9 w-full transition-colors";

const VARIANT_CONTAINER: Record<Variant, string> = {
  default:
    "border border-s4e-neutral-divider-10 bg-s4e-surface-app " +
    "focus-within:border-s4e-brand-primary-500 focus-within:ring-2 focus-within:ring-s4e-brand-primary-500/20",
  ghost:
    "bg-s4e-neutral-grey-100 border border-transparent " +
    "focus-within:border-s4e-brand-primary-500 focus-within:ring-2 focus-within:ring-s4e-brand-primary-500/20",
};

const INPUT_BASE =
  "flex-1 bg-transparent text-[14px] outline-none placeholder:text-s4e-text-disabled " +
  "text-s4e-text-primary disabled:cursor-not-allowed disabled:text-s4e-text-disabled";

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      variant     = "default",
      value,
      onChange,
      onClear,
      clearable   = true,
      placeholder = "Search…",
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const hasClear = clearable && !!value && !disabled;

    const handleClear = () => {
      onClear?.();
      onChange?.("");
    };

    return (
      <div
        className={cn(
          CONTAINER_BASE,
          VARIANT_CONTAINER[variant],
          disabled && "opacity-40 cursor-not-allowed",
          className,
        )}
      >
        <Search
          size={14}
          className="shrink-0 text-s4e-text-disabled group-focus-within:text-s4e-brand-primary-500"
        />
        <input
          ref={ref}
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className={INPUT_BASE}
          {...props}
        />
        {hasClear && (
          <button
            type="button"
            onClick={handleClear}
            className="shrink-0 text-s4e-text-disabled hover:text-s4e-text-primary transition-colors"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>
    );
  },
);
SearchBar.displayName = "SearchBar";

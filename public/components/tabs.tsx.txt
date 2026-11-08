"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Tabs
 *
 * Drop this file into your project at components/ui/tabs.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 *
 * Usage:
 *   <Tabs defaultValue="overview">
 *     <TabsList>
 *       <TabsTrigger value="overview">Overview</TabsTrigger>
 *       <TabsTrigger value="details">Details</TabsTrigger>
 *     </TabsList>
 *     <TabsContent value="overview">…</TabsContent>
 *     <TabsContent value="details">…</TabsContent>
 *   </Tabs>
 */

type TabsContextValue = {
  value:    string;
  setValue: (v: string) => void;
  baseId:   string;
};

const idFor = (baseId: string, part: "trigger" | "panel", value: string) =>
  `${baseId}-${part}-${value.replace(/[^A-Za-z0-9_-]/g, "_")}`;

const TabsContext = React.createContext<TabsContextValue | null>(null);

export type TabsVariant = "underline" | "pill";
const TabsVariantContext = React.createContext<TabsVariant>("underline");

function useTabs(): TabsContextValue {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* must be used inside <Tabs>");
  return ctx;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled active value. */
  value?:        string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  onValueChange?: (v: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, value, defaultValue, onValueChange, children, ...props }, ref) => {
    const baseId       = React.useId();
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue ?? "");
    const current = isControlled ? (value as string) : internal;
    const setValue = (v: string) => {
      if (!isControlled) setInternal(v);
      onValueChange?.(v);
    };
    return (
      <TabsContext.Provider value={{ value: current, setValue, baseId }}>
        <div ref={ref} data-slot="tabs" className={cn("flex flex-col gap-6", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

// Arrow / Home / End move focus between tabs and activate them (APG
// "automatic activation"). Only the active tab is in the Tab order.
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** underline (default): page-level sections. pill: compact segmented control. */
  variant?: TabsVariant;
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ variant = "underline", className, onKeyDown, ...props }, ref) => {
    const listRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => listRef.current as HTMLDivElement);
    const { value } = useTabs();

    const tabs = () =>
      Array.from(
        listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? [],
      );

    // With no matching active tab, keep the first tab reachable by Tab.
    React.useLayoutEffect(() => {
      const all = tabs();
      if (all.length && !all.some((t) => t.tabIndex === 0)) all[0].tabIndex = 0;
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      const all = tabs();
      const index = all.indexOf(document.activeElement as HTMLButtonElement);
      if (index < 0) return;
      let next: number | null = null;
      if (e.key === "ArrowRight") next = (index + 1) % all.length;
      if (e.key === "ArrowLeft")  next = (index - 1 + all.length) % all.length;
      if (e.key === "Home")       next = 0;
      if (e.key === "End")        next = all.length - 1;
      if (next === null) return;
      e.preventDefault();
      all[next].focus();
      all[next].click();
    };

    return (
      <TabsVariantContext.Provider value={variant}>
        <div
          ref={listRef}
          role="tablist"
          aria-orientation="horizontal"
          data-slot="tabs-list"
          data-variant={variant}
          onKeyDown={handleKeyDown}
          className={cn(
            variant === "pill"
              ? "inline-flex w-fit self-start items-center gap-1 rounded-lg bg-snt-bg-subtle p-1"
              : "flex items-end border-b border-snt-border-default overflow-x-auto snt-scrollbar-hide",
            className,
          )}
          {...props}
        />
      </TabsVariantContext.Provider>
    );
  },
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  /** Optional count chip after the label (e.g. open findings). */
  count?: number;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, count, children, ...props }, ref) => {
    const { value: current, setValue, baseId } = useTabs();
    const variant = React.useContext(TabsVariantContext);
    const isActive = current === value;
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={idFor(baseId, "trigger", value)}
        aria-selected={isActive}
        aria-controls={isActive ? idFor(baseId, "panel", value) : undefined}
        tabIndex={isActive ? 0 : -1}
        data-slot="tabs-trigger"
        onClick={() => setValue(value)}
        className={cn(
          "inline-flex items-center gap-1.5 text-snt-14 font-medium whitespace-nowrap tracking-tight shrink-0 transition-colors cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-snt-focus-ring/40",
          "disabled:opacity-50 disabled:pointer-events-none",
          variant === "pill"
            ? cn(
                "px-3.5 py-1.5 rounded-md",
                isActive ? "bg-snt-surface-row text-snt-text-primary shadow-snt-sm" : "text-snt-text-secondary hover:text-snt-text-primary",
              )
            : cn(
                "px-4 pt-2 pb-2.5 -mb-px border-b-[2px]",
                isActive
                  ? "text-snt-text-primary border-snt-brand-primary-500"
                  : "text-snt-text-secondary border-transparent hover:text-snt-text-primary",
              ),
          className,
        )}
        {...props}
      >
        {children}
        {count !== undefined && (
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-full px-1.5 min-w-[18px] h-[18px] text-snt-10 font-semibold tabular-nums",
              isActive ? "bg-snt-btn-primary-600 text-snt-text-on-accent" : "bg-snt-neutral-grey-200 text-snt-text-secondary",
            )}
          >
            {count}
          </span>
        )}
      </button>
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { value: current, baseId } = useTabs();
    if (current !== value) return null;
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={idFor(baseId, "panel", value)}
        aria-labelledby={idFor(baseId, "trigger", value)}
        tabIndex={0}
        data-slot="tabs-content"
        className={cn("outline-none", className)}
        {...props}
      />
    );
  },
);
TabsContent.displayName = "TabsContent";

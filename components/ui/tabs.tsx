"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Tabs
 *
 * Drop this file into your project at components/ui/tabs.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
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

type TabsContextValue = { value: string; setValue: (v: string) => void };

const TabsContext = React.createContext<TabsContextValue | null>(null);

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
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue ?? "");
    const current = isControlled ? (value as string) : internal;
    const setValue = (v: string) => {
      if (!isControlled) setInternal(v);
      onValueChange?.(v);
    };
    return (
      <TabsContext.Provider value={{ value: current, setValue }}>
        <div ref={ref} data-slot="tabs" className={cn("flex flex-col gap-6", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      data-slot="tabs-list"
      className={cn(
        "flex items-end border-b border-s4e-neutral-divider-10 overflow-x-auto s4e-scrollbar-hide",
        className,
      )}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { value: current, setValue } = useTabs();
    const isActive = current === value;
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-slot="tabs-trigger"
        onClick={() => setValue(value)}
        className={cn(
          "inline-flex items-center px-4 pt-2 pb-2.5 -mb-px text-[14px] font-medium whitespace-nowrap tracking-tight shrink-0",
          "border-b-[2px] transition-colors cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-s4e-brand-primary-500/40",
          "disabled:opacity-50 disabled:pointer-events-none",
          isActive
            ? "text-s4e-text-primary border-s4e-brand-primary-500"
            : "text-s4e-text-secondary border-transparent hover:text-s4e-text-primary",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { value: current } = useTabs();
    if (current !== value) return null;
    return (
      <div
        ref={ref}
        role="tabpanel"
        data-slot="tabs-content"
        className={cn("outline-none", className)}
        {...props}
      />
    );
  },
);
TabsContent.displayName = "TabsContent";

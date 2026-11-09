"use client";

import { useViewMode } from "@/components/styleguide/view-mode-provider";

/**
 * Picks the content for the active page tab. Keeps the page server-rendered:
 * the page provides every branch statically, this tiny client component picks
 * one at runtime. Pages without `specs` / `a11y` (the older two-tab pages)
 * fall back to `design` for those modes.
 */
export function ModeAware({
  design,
  dev,
  specs,
  a11y,
}: {
  design: React.ReactNode;
  dev:    React.ReactNode;
  specs?: React.ReactNode;
  a11y?:  React.ReactNode;
}) {
  const { mode } = useViewMode();
  if (mode === "dev") return <>{dev}</>;
  if (mode === "specs" && specs) return <>{specs}</>;
  if (mode === "a11y" && a11y) return <>{a11y}</>;
  return <>{design}</>;
}

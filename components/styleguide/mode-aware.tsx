"use client";

import { useViewMode } from "@/components/styleguide/view-mode-provider";

/**
 * Switch between two ReactNode trees based on the global view mode.
 * Keeps the parent page server-rendered: the page provides both branches
 * statically, this tiny client component picks one at runtime.
 */
export function ModeAware({
  design,
  dev,
}: {
  design: React.ReactNode;
  dev:    React.ReactNode;
}) {
  const { mode } = useViewMode();
  return mode === "design" ? <>{design}</> : <>{dev}</>;
}

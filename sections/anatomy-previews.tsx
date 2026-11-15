"use client";

import { FileSearch, Shield, Tag, Upload } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Toast } from "@/components/ui/toast-tooltip";
import { FilterAction, FilterBar, FilterBarDivider, FilterOverflow, FilterPill } from "@/components/ui/filter-bar";

// Real components for Anatomy previews that need function props (icon,
// onDismiss) — those can't be passed from a server-rendered page.

export function ToastAnatomyPreview() {
  return (
    <div className="w-80">
      <Toast intent="success" title="Scan started" description="Results in about 2 minutes." onDismiss={() => {}} paused />
    </div>
  );
}

export function EmptyStateAnatomyPreview() {
  return (
    <EmptyState
      icon={FileSearch}
      title="No scans yet"
      description="Run your first scan to see findings for this asset."
      primaryAction={{ label: "Start scan", onClick: () => {} }}
      secondaryAction={{ label: "Read the docs", onClick: () => {} }}
    />
  );
}

export function FilterBarAnatomyPreview() {
  return (
    <div className="mx-auto w-[640px] max-w-full">
      <FilterBar>
        <FilterPill label="Tags" icon={Tag} />
        <FilterPill label="Advanced Security" icon={Shield} count={1} active onClear={() => {}} />
        <FilterOverflow count={3} />
        <FilterBarDivider />
        <FilterAction icon={Upload} label="Export" />
      </FilterBar>
    </div>
  );
}

"use client";

import { useViewMode, type ViewMode } from "@/components/styleguide/view-mode-provider";
import { cn } from "@/lib/utils";

const LABEL: Record<ViewMode, string> = {
  design: "Design",
  dev:    "Dev",
};

export function ViewModeTabs() {
  const { mode, setMode } = useViewMode();
  return (
    <div
      role="tablist"
      aria-label="View mode"
      className="flex items-center gap-2 border-b border-s4e-neutral-divider-10"
    >
      {(["design", "dev"] as ViewMode[]).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setMode(m)}
            className={cn(
              "inline-flex items-center px-4 pt-2 pb-2.5 -mb-px text-[14px] font-medium whitespace-nowrap tracking-tight",
              "border-b-[2px] transition-colors cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-s4e-brand-primary-500/40",
              active
                ? "text-s4e-text-primary border-s4e-brand-primary-500"
                : "text-s4e-text-secondary border-transparent hover:text-s4e-text-primary",
            )}
          >
            {LABEL[m]}
          </button>
        );
      })}
    </div>
  );
}

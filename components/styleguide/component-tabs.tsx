"use client";

import { useRef } from "react";
import { useViewMode, type ViewMode } from "@/components/styleguide/view-mode-provider";
import { cn } from "@/lib/utils";

// Page tabs for component pages, modelled on Carbon: Usage · Specs · Code ·
// Accessibility. The active tab lives in the URL (?view=…) via ViewModeProvider,
// so every tab is linkable. Keyboard: ←/→ (and Home/End) move and activate,
// following the WAI-ARIA tabs pattern.

const TABS: { mode: ViewMode; label: string }[] = [
  { mode: "design", label: "Usage" },
  { mode: "specs",  label: "Specs" },
  { mode: "dev",    label: "Code" },
  { mode: "a11y",   label: "Accessibility" },
];

export const PANEL_ID = "component-tabpanel";

export function ComponentTabs() {
  const { mode, setMode } = useViewMode();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = Math.max(0, TABS.findIndex((t) => t.mode === mode));

  const move = (to: number) => {
    const i = (to + TABS.length) % TABS.length;
    setMode(TABS[i].mode);
    refs.current[i]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Component documentation"
      className="-mb-px flex items-center gap-1 overflow-x-auto snt-scrollbar-hide"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); move(activeIndex + 1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); move(activeIndex - 1); }
        else if (e.key === "Home") { e.preventDefault(); move(0); }
        else if (e.key === "End") { e.preventDefault(); move(TABS.length - 1); }
      }}
    >
      {TABS.map((t, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={t.mode}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`tab-${t.mode}`}
            aria-selected={active}
            aria-controls={PANEL_ID}
            tabIndex={active ? 0 : -1}
            onClick={() => setMode(t.mode)}
            className={cn(
              "relative inline-flex items-center whitespace-nowrap px-3 pb-3 pt-2 text-snt-14 font-medium transition-colors cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-snt-focus-ring rounded-t-md",
              active ? "text-snt-text-primary" : "text-snt-text-secondary hover:text-snt-text-primary",
            )}
          >
            {t.label}
            {active && <span aria-hidden className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-snt-text-primary" />}
          </button>
        );
      })}
    </div>
  );
}

/** Wraps the active tab's content with the tabpanel role. */
export function ComponentTabPanel({ children }: { children: React.ReactNode }) {
  const { mode } = useViewMode();
  return (
    <div role="tabpanel" id={PANEL_ID} aria-labelledby={`tab-${mode}`} tabIndex={-1} className="focus:outline-none">
      {children}
    </div>
  );
}

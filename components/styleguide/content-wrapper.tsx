"use client";

import { usePathname } from "next/navigation";

import { TopBar } from "@/components/styleguide/top-bar";
import { InstallationTabs } from "@/components/styleguide/installation-tabs";
import { DeveloperNotes } from "@/components/styleguide/developer-notes";
import { useViewMode } from "@/components/styleguide/view-mode-provider";

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  // key={pathname} forces these per-route panels to remount on every
  // navigation. Without it, browser back from another route can leave them
  // wedged in a stale "missing" / "loading" state because the layout never
  // unmounts. Cheap; the panels just re-fetch their tiny .tsx.txt source.
  const pathname = usePathname();
  const { mode } = useViewMode();
  return (
    <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-s4e-surface-app">
      <TopBar />
      {children}
      {mode === "dev" && (
        <div className="px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 max-w-5xl mx-auto">
          <InstallationTabs key={`install:${pathname}`} />
          <DeveloperNotes  key={`devnote:${pathname}`} />
        </div>
      )}
    </main>
  );
}

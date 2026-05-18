"use client";

import { TopBar } from "@/components/styleguide/top-bar";
import { TokenExportTabs } from "@/components/styleguide/token-export-tabs";

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-s4e-surface-app">
      <TopBar />
      {children}
      <div className="px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 max-w-5xl mx-auto">
        <TokenExportTabs />
      </div>
    </main>
  );
}

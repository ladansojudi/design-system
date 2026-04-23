"use client";

import { TopBar } from "@/components/styleguide/top-bar";

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-s4e-surface-app">
      <TopBar />
      {children}
    </main>
  );
}

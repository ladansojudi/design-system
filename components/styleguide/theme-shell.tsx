"use client";

import { usePreviewTheme } from "@/components/styleguide/preview-theme-provider";
import { cn } from "@/lib/utils";

export function ThemeShell({ children }: { children: React.ReactNode }) {
  const { theme } = usePreviewTheme();
  return (
    <div className={cn("relative flex h-screen flex-col overflow-hidden bg-snt-surface-app text-snt-text-primary", theme === "dark" && "dark")}>
      {children}
    </div>
  );
}

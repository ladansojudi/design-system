"use client";

import { usePreviewTheme } from "@/components/styleguide/preview-theme-provider";
import { cn } from "@/lib/utils";

export function ThemeShell({ children }: { children: React.ReactNode }) {
  const { theme } = usePreviewTheme();
  return (
    <div className={cn("flex h-screen overflow-hidden", theme === "dark" && "dark")}>
      {children}
    </div>
  );
}

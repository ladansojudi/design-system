"use client";

import { useEffect } from "react";
import { usePreviewTheme } from "@/components/styleguide/preview-theme-provider";
import { cn } from "@/lib/utils";

export function ThemeShell({ children }: { children: React.ReactNode }) {
  const { theme } = usePreviewTheme();

  // Portalled UI (Modal, Drawer, Menu, Select list, Toasts) mounts on <body>.
  // Mirror the theme on <html> — the usual `.dark` convention — so it follows.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    return () => root.classList.remove("dark");
  }, [theme]);

  return (
    <div className={cn("relative flex h-screen flex-col overflow-hidden bg-snt-surface-app text-snt-text-primary", theme === "dark" && "dark")}>
      {children}
    </div>
  );
}

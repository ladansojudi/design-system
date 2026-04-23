"use client";

import { usePreviewTheme } from "@/components/styleguide/preview-theme-provider";
import { cn } from "@/lib/utils";

export function ThemeTabs() {
  const { theme, setTheme } = usePreviewTheme();
  return (
    <div className="inline-flex items-center rounded-md border border-s4e-neutral-divider-10 bg-s4e-neutral-grey-100 p-0.5 gap-0.5">
      {(["light", "dark"] as const).map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTheme(t)}
          className={cn(
            "px-3 py-1 text-xs rounded font-medium transition-colors duration-100 capitalize",
            theme === t
              ? "bg-s4e-neutral-grey-00 text-s4e-text-primary shadow-sm"
              : "text-s4e-text-secondary hover:text-s4e-text-primary"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

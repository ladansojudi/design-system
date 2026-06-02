"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { usePreviewTheme } from "@/components/styleguide/preview-theme-provider";
import { buildPalettes } from "@/sections/colors/lib";
import { CopyToastProvider } from "@/sections/colors/use-copy";
import { ScalesPanel } from "@/sections/colors/scales-panel";
import { TokensPanel } from "@/sections/colors/tokens-panel";
import { WcagPanel } from "@/sections/colors/wcag-panel";
import { PreviewPanel } from "@/sections/colors/preview-panel";

type TabKey = "scales" | "tokens" | "wcag" | "preview";

const TABS: { key: TabKey; label: string }[] = [
  { key: "scales",  label: "Scales"  },
  { key: "tokens",  label: "Tokens"  },
  { key: "wcag",    label: "WCAG"    },
  { key: "preview", label: "Preview" },
];

export function ColorsSystem() {
  const { theme }       = usePreviewTheme();
  const [active, set] = useState<TabKey>("scales");
  const palettes      = useMemo(() => buildPalettes(theme), [theme]);

  return (
    <CopyToastProvider>
      <div className="mt-2">
        {/* Tabs */}
        <div role="tablist" aria-label="Color view" className="flex items-end border-b border-s4e-neutral-divider-10 mb-8 overflow-x-auto s4e-scrollbar-hide">
          {TABS.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => set(t.key)}
                className={cn(
                  "inline-flex items-center px-4 pt-2 pb-2.5 -mb-px text-[14px] font-medium whitespace-nowrap tracking-tight shrink-0",
                  "border-b-[2px] transition-colors cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-s4e-brand-primary-500/40",
                  isActive
                    ? "text-s4e-text-primary border-s4e-brand-primary-500"
                    : "text-s4e-text-secondary border-transparent hover:text-s4e-text-primary",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Panels */}
        {active === "scales"  && <ScalesPanel  palettes={palettes} />}
        {active === "tokens"  && <TokensPanel  palettes={palettes} />}
        {active === "wcag"    && <WcagPanel    palettes={palettes} />}
        {active === "preview" && <PreviewPanel palettes={palettes} />}
      </div>
    </CopyToastProvider>
  );
}

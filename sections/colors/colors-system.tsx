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
import { ExportPanel } from "@/sections/colors/export-panel";

type TabKey = "scales" | "tokens" | "wcag" | "preview" | "export";

const TABS: { key: TabKey; label: string }[] = [
  { key: "scales",  label: "Scales"  },
  { key: "tokens",  label: "Tokens"  },
  { key: "wcag",    label: "WCAG"    },
  { key: "preview", label: "Preview" },
  { key: "export",  label: "Export"  },
];

export function ColorsSystem() {
  const { theme }       = usePreviewTheme();
  const [active, set]   = useState<TabKey>("scales");
  const palettes        = useMemo(() => buildPalettes(theme), [theme]);
  const tokenCount      = palettes.reduce((a, p) => a + p.swatches.length, 0);

  return (
    <CopyToastProvider>
      <div className="mt-2">
        {/* Header strip */}
        <div className="flex flex-wrap items-end justify-between gap-3 pb-7 border-b border-s4e-neutral-divider-10 mb-7">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-s4e-text-primary leading-none">
              Color <span className="text-s4e-brand-primary-500">System</span>
            </h2>
            <div className="mt-2 text-[10px] uppercase tracking-widest text-s4e-text-disabled">
              {palettes.length} palet · {tokenCount} token · WCAG 2.1
            </div>
          </div>
          <div className="text-right text-[10px] uppercase tracking-widest text-s4e-text-disabled leading-relaxed">
            Brand · Scale · Severity<br />
            Surface · Neutral · Feedback<br />
            <span className="text-s4e-brand-primary-500">v2.0</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-9">
          {TABS.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => set(t.key)}
                className={cn(
                  "px-4 py-2 rounded-md border text-[10.5px] font-medium uppercase tracking-widest cursor-pointer transition-colors",
                  isActive
                    ? "bg-s4e-brand-primary-500 text-s4e-text-white border-s4e-brand-primary-500"
                    : "border-s4e-neutral-divider-10 text-s4e-text-secondary hover:text-s4e-text-primary hover:border-s4e-neutral-divider-20",
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
        {active === "export"  && <ExportPanel  palettes={palettes} />}
      </div>
    </CopyToastProvider>
  );
}

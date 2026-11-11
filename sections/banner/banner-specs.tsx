"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import { Sparkles, X } from "lucide-react";
import {
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
  
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────


export function BannerSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing a Banner. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropsFromCode slug="banner" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Full-bleed at the top of the app. Height is fixed; width follows the viewport. Diagram is shown at a representative width.
        </SpecLede>

        <SpacingDiagram width={460} height={40} padX={16} padY={12} radius={0}>
          <div className="w-full h-full flex items-center gap-3 px-4 py-2.5 bg-snt-btn-primary-600 text-snt-text-white">
            <Sparkles size={14} className="shrink-0" />
            <div className="flex-1 min-w-0 text-[12px] leading-tight">
              New: AI-assisted vulnerability triage is live.
            </div>
            <a href="#" className="text-[11px] font-semibold underline underline-offset-2 shrink-0">Try it</a>
            <button type="button" aria-label="Dismiss" className="shrink-0 p-1 -m-1 rounded">
              <X size={14} />
            </button>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["default", "with cta", "with dismiss"]}
            rows={[
              { label: "Height",                values: ["40px", "40px", "40px"], note: "Fixed; controls vertical centering." },
              { label: "Width",                 values: ["100%", "100%", "100%"], note: "Full-bleed across viewport." },
              { label: "Padding · horizontal",  values: ["16px", "16px", "16px"] },
              { label: "Padding · vertical",    values: ["12px", "12px", "12px"] },
              { label: "Border radius",         values: ["0",    "0",    "0"], note: "Edge-to-edge surface." },
              { label: "Icon size",             values: ["12px", "12px", "12px"] },
              { label: "Gap · between elements",values: ["12px", "12px", "12px"] },
              { label: "Message font size",     values: ["12px", "12px", "12px"] },
              { label: "CTA font size",         values: ["—",    "12px", "12px"], note: "Semibold + underline." },
              { label: "Dismiss icon size",     values: ["—",    "—",    "12px"] },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          One table per tone. Banner colors don&apos;t flip in dark mode — they always read the same.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "neutral",
              label: "Neutral",
              rows: [
                {
                  variant: "Surface",
                  bg:    { token: "btn-neutral-800", hex: "#1f2323" },
                  text:  { token: "text-white",      hex: "#ffffff" },
                  hover: { token: "text-white/10",   hex: "#ffffff1a" },
                },
              ],
            },
            {
              id: "promo",
              label: "Promo",
              rows: [
                {
                  variant: "Surface",
                  bg:    { token: "btn-primary-600", hex: "#0f69aa" },
                  text:  { token: "text-white",      hex: "#ffffff" },
                  hover: { token: "text-white/10",   hex: "#ffffff1a" },
                },
              ],
            },
            {
              id: "warning",
              label: "Warning",
              rows: [
                {
                  variant: "Surface",
                  bg:    { token: "scale-yellow-500", hex: "#f59e0b" },
                  text:  { token: "btn-neutral-800",  hex: "#1f2323" },
                  hover: { token: "btn-neutral-800/10", hex: "#1f23231a" },
                },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

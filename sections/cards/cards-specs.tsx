"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import { ArrowRight } from "lucide-react";
import {
  SpecSectionTitle,
  SpecLede,
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────



// ── CardsSpecs ────────────────────────────────────────────────────────────

export function CardsSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Designer-facing props for Insight Card and Alert Card. Stat Card has its own page and is documented separately.
        </SpecLede>
        <PropsFromCode slug="cards" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Cards share a 12px corner radius and a 320px recommended width. Insight has a single body block; Alert separates header and body with a hairline.
        </SpecLede>

        <SpacingDiagram width={320} height={160} padX={16} padY={16} radius={12}>
          <div className="w-full h-full rounded-xl overflow-hidden border border-snt-neutral-divider-10 bg-snt-surface-app flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-snt-neutral-grey-100 border-b border-snt-neutral-divider-10">
              <span className="text-[12px] font-semibold text-snt-text-primary">Attention Needed</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-snt-scale-red-50 text-[11px] font-semibold text-snt-scale-red-600">
                <span className="w-[6px] h-[6px] rounded-full bg-snt-scale-red-500" />
                2 Active
              </span>
            </div>
            <div className="px-4 py-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[14px] font-semibold text-snt-text-primary">Security Blind Spots</div>
                <p className="text-[12px] text-snt-text-disabled leading-relaxed">20 assets excluded from scans.</p>
              </div>
              <button type="button" className="flex items-center gap-1 text-[12px] font-medium text-snt-brand-primary-500">
                Review Assets
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["insight", "alert"]}
            rows={[
              { label: "Recommended width",     values: ["320px", "320px"], note: "Stretches in a grid; min 280px." },
              { label: "Border radius",         values: ["12px",  "12px"] },
              { label: "Border width",          values: ["1px",   "1px"] },
              { label: "Outer padding · X",     values: ["20px",  "—"],    note: "Alert uses inner blocks." },
              { label: "Outer padding · Y",     values: ["20px",  "—"] },
              { label: "Header padding · X",    values: ["—",     "16px"], note: "Alert grey strip." },
              { label: "Header padding · Y",    values: ["—",     "8px"] },
              { label: "Body padding · X",      values: ["—",     "16px"] },
              { label: "Body padding · Y",      values: ["—",     "16px"] },
              { label: "Title font size",       values: ["14px",  "12px"], note: "Alert header chip is 11px." },
              { label: "Row · row divider",     values: ["1px",   "—"],   note: "Hairline between metric rows." },
              { label: "Row padding · Y",       values: ["12px",  "—"] },
              { label: "Label font size",       values: ["12px",  "12px"] },
              { label: "Value font size",       values: ["14px",  "14px"] },
              { label: "Action gap · text/icon", values: ["4px",   "4px"] },
              { label: "Pulse dot size",        values: ["—",     "8px"],   note: "Animated; alert tone only." },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Card surfaces stay white; the alert variant draws attention through a grey-100 header strip and a red pulse pill.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "shared",
              label: "Shared",
              rows: [
                { variant: "Surface",  bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-primary",       hex: "#121f28" }, border: { token: "border-default", hex: "#e0e3e5" } },
                { variant: "Row divider", text: { token: "text-secondary",      hex: "#8a9199" }, border: { token: "border-default", hex: "#e0e3e5" } },
              ],
            },
            {
              id: "insight",
              label: "Insight",
              rows: [
                { variant: "Title",        text: { token: "text-primary",      hex: "#121f28" } },
                { variant: "Row label",    text: { token: "text-secondary",    hex: "#4d5862" } },
                { variant: "Row value",    text: { token: "text-primary",      hex: "#121f28" } },
                { variant: "View details", text: { token: "brand-primary-500", hex: "#0066cc" }, hover: { token: "brand-primary-600", hex: "#0254a3" } },
              ],
            },
            {
              id: "alert",
              label: "Alert",
              rows: [
                { variant: "Header strip",   bg: { token: "bg-subtle",   hex: "#f7f8f8" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "border-default", hex: "#e0e3e5" } },
                { variant: "Pulse pill",     bg: { token: "bg-error-subtle",       hex: "#fcf3f2" }, text: { token: "text-error",  hex: "#ae2700" } },
                { variant: "Pulse dot",      bg: { token: "scale-red-500" }, text: { token: "—", hex: "" } },
                { variant: "Alert title",    text: { token: "text-primary",      hex: "#121f28" } },
                { variant: "Alert badge",    bg: { token: "bg-subtle",   hex: "#f7f8f8" }, text: { token: "text-secondary", hex: "#4d5862" } },
                { variant: "Description",    text: { token: "text-secondary",     hex: "#8a9199" } },
                { variant: "Action link",    text: { token: "brand-primary-500", hex: "#0066cc" }, hover: { token: "brand-primary-600", hex: "#0254a3" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import {
  SpecSectionTitle,
  SpecLede,
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
  
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────



// ── TabsSpecs ─────────────────────────────────────────────────────────────

export function TabsSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer configures per Tab Bar and per Tab Item. Map these to Figma component properties.
        </SpecLede>
        <PropsFromCode slug="tabs" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Per-item measurements. The container height equals item height; the indicator (underline) overlaps the container bottom border.
        </SpecLede>

        <SpacingDiagram width={120} height={40} padX={16} padY={12} radius={4}>
          <div className="w-full h-full flex items-center justify-center border-b-2 border-snt-brand-primary-500 text-snt-brand-primary-500 text-[14px] font-medium">
            Findings
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["underline", "pill"]}
            rows={[
              { label: "Item height",            values: ["40px", "32px"], note: "Container matches item." },
              { label: "Padding · horizontal",   values: ["16px", "16px"] },
              { label: "Padding · vertical",     values: ["12px", "8px"],  note: "Pill keeps total height tight." },
              { label: "Indicator size",         values: ["2px",  "—"],   note: "Underline thickness." },
              { label: "Container radius",       values: ["0", "10px"], note: "Pill container border-radius." },
              { label: "Item radius",            values: ["0",    "8px"], note: "Active pill is rounded inside the track." },
              { label: "Container padding",      values: ["0",    "4px"], note: "Pill track inner gutter." },
              { label: "Inter-item gap",         values: ["0",    "4px"] },
              { label: "Label · badge gap",      values: ["8px",  "8px"] },
              { label: "Badge min-width",        values: ["20px", "20px"], note: "Pill-shaped chip, height 20px." },
              { label: "Badge padding · X",      values: ["8px",  "8px"] },
              { label: "Font size",              values: ["14px", "14px"], note: "Geist Medium." },
              { label: "Font weight",            values: ["500",  "500"] },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          The underline and pill variants share semantics but use different surfaces.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "underline",
              label: "Underline",
              rows: [
                { variant: "Active",   text: { token: "brand-primary-500",  hex: "#0066cc" }, border: { token: "brand-primary-500",  hex: "#0066cc" } },
                { variant: "Inactive", text: { token: "text-secondary",     hex: "#4d5862" }, hover:  { token: "text-primary",       hex: "#121f28" } },
                { variant: "Disabled", text: { token: "text-secondary",      hex: "#8a9199" } },
                { variant: "Track",    text: { token: "text-secondary",      hex: "#8a9199" }, border: { token: "border-default", hex: "#e0e3e5" } },
              ],
            },
            {
              id: "pill",
              label: "Pill",
              rows: [
                { variant: "Container", bg: { token: "bg-subtle",  hex: "#f7f8f8" }, text: { token: "text-secondary",     hex: "#4d5862" } },
                { variant: "Active",    bg: { token: "surface-row",       hex: "#ffffff" }, text: { token: "text-primary",       hex: "#121f28" } },
                { variant: "Inactive",  text: { token: "text-secondary",  hex: "#4d5862" }, hover: { token: "text-primary",      hex: "#121f28" } },
                { variant: "Disabled",  text: { token: "text-secondary",   hex: "#8a9199" } },
              ],
            },
            {
              id: "badge",
              label: "Badge",
              rows: [
                { variant: "Active",   bg: { token: "brand-primary-500",  hex: "#0066cc" }, text: { token: "text-on-accent",     hex: "#ffffff" } },
                { variant: "Inactive", bg: { token: "neutral-grey-200",   hex: "#eceeee" }, text: { token: "text-secondary",     hex: "#4d5862" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

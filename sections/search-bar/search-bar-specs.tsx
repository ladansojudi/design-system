"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import { Search } from "lucide-react";
import {
  SpecSectionTitle,
  SpecLede,
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
  
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────



// ── SearchBarSpecs ────────────────────────────────────────────────────────

export function SearchBarSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Designer-facing props for placing the Search Bar in Figma. Names map 1:1 with the React component.
        </SpecLede>
        <PropsFromCode slug="search-bar" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Single fixed height across variants. Recreate from these values alone — no token hunting required.
        </SpecLede>

        <SpacingDiagram width={240} height={36} padX={12} padY={8} radius={8}>
          <div className="w-full h-full flex items-center gap-2 rounded-lg px-3 border border-snt-neutral-divider-10 bg-snt-surface-app">
            <Search size={14} className="text-snt-text-disabled shrink-0" />
            <span className="text-[14px] text-snt-text-disabled">Search…</span>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["value"]}
            rows={[
              { label: "Height",                values: ["36px"], note: "Fixed; vertically centered content." },
              { label: "Min width",             values: ["160px"], note: "Recommended; expands to container." },
              { label: "Padding · horizontal",  values: ["12px"] },
              { label: "Padding · vertical",    values: ["8px"],  note: "Visual; auto-centered." },
              { label: "Icon · input gap",      values: ["8px"] },
              { label: "Input · clear gap",     values: ["8px"] },
              { label: "Border radius",         values: ["8px"] },
              { label: "Border width",          values: ["1px"] },
              { label: "Focus ring · width",    values: ["2px"],  note: "Inset 2px brand glow." },
              { label: "Search icon size",      values: ["14px"], note: "Lucide stroke 2px." },
              { label: "Clear icon size",       values: ["12px"] },
              { label: "Font size",             values: ["14px"], note: "Geist Regular." },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Token, hex, and the role each color plays. Reference the named token whenever possible.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "default",
              label: "Default",
              rows: [
                { variant: "Default",  bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-primary",       hex: "#121f28" }, border: { token: "border-default", hex: "#e0e3e5" } },
                { variant: "Focused",  bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-primary",       hex: "#121f28" }, border: { token: "brand-primary-500",  hex: "#0066cc" } },
                { variant: "Disabled", bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-disabled",      hex: "#8a9199" }, border: { token: "border-default", hex: "#e0e3e5" } },
              ],
            },
            {
              id: "ghost",
              label: "Ghost",
              rows: [
                { variant: "Default",  bg: { token: "bg-subtle",    hex: "#f7f8f8" }, text: { token: "text-primary",       hex: "#121f28" } },
                { variant: "Focused",  bg: { token: "bg-subtle",    hex: "#f7f8f8" }, text: { token: "text-primary",       hex: "#121f28" }, border: { token: "brand-primary-500",  hex: "#0066cc" } },
              ],
            },
            {
              id: "iconography",
              label: "Iconography",
              rows: [
                { variant: "Search · idle",    text: { token: "text-disabled",      hex: "#8a9199" } },
                { variant: "Search · focused", text: { token: "brand-primary-500",  hex: "#0066cc" } },
                { variant: "Clear (×)",        text: { token: "text-disabled",      hex: "#8a9199" }, hover: { token: "text-primary", hex: "#121f28" } },
                { variant: "Placeholder",      text: { token: "text-disabled",      hex: "#8a9199" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

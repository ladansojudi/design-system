"use client";

import { Tag, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SpecSectionTitle,
  SpecLede,
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  OptionPill,
  BoolSwatch,
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────

function PillStateSwatch({ state }: { state: "default" | "active" | "overflow" }) {
  if (state === "overflow") {
    return (
      <span
        className="inline-block w-4 h-3 rounded-[3px] border border-dashed border-s4e-neutral-divider-10"
        aria-hidden
      />
    );
  }
  return (
    <span
      className={cn(
        "inline-block w-4 h-3 rounded-[3px] border",
        state === "active"
          ? "border-s4e-brand-primary-500 bg-s4e-brand-primary-50"
          : "border-s4e-neutral-divider-10 bg-s4e-surface-app",
      )}
      aria-hidden
    />
  );
}

// ── FilterBarSpecs ────────────────────────────────────────────────────────

export function FilterBarSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Per-pill props plus bar-level toggles. Place pills left-to-right in the bar; pin actions (Export, Bulk) to the right.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "state",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<PillStateSwatch state="default"  />} label="default" />
                  <OptionPill swatch={<PillStateSwatch state="active"   />} label="active" />
                  <OptionPill swatch={<PillStateSwatch state="overflow" />} label="overflow" />
                </div>
              ),
              default:     "default",
              description: "Default is empty filter; active has applied values; overflow is the dashed (+ N) chip.",
            },
            {
              name:    "label",
              type:    "string",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">e.g. &quot;Tags&quot;</span>,
              default: "—",
              description: "Filter category name. Keep short — pills wrap horizontally only on overflow.",
            },
            {
              name:    "icon",
              type:    "Icon",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">Lucide</span>,
              default: "—",
              description: "Optional 12px glyph that reinforces the category at a glance.",
            },
            {
              name:    "count",
              type:    "number",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">e.g. 2</span>,
              default: "—",
              description: "Active value count rendered as a small circular badge inside the pill.",
            },
            {
              name:    "showSearch",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "true",
              description: "Bar-level — prepends a 192px search input followed by a vertical divider.",
            },
            {
              name:    "showClear",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "auto",
              description: "Trailing red Clear button. Auto-shown when at least one filter is active.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Pills and action buttons share a uniform 32px height so the row aligns visually. The bar itself is a 3px-padded container with a 1px border.
        </SpecLede>

        <SpacingDiagram width={120} height={32} padX={12} padY={4} radius={8}>
          <div className="w-full h-full inline-flex items-center gap-1.5 px-3 rounded-lg border border-s4e-brand-primary-500 bg-s4e-brand-primary-50 text-s4e-brand-primary-500 text-[12px] font-medium">
            <Tag size={12} className="opacity-70 shrink-0" />
            <span>Tags</span>
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-s4e-brand-primary-500 text-white text-[10px] font-bold">2</span>
            <ChevronDown size={11} className="opacity-50" />
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["pill", "action", "search"]}
            rows={[
              { label: "Height",                values: ["32px", "32px", "32px"], note: "Uniform across row." },
              { label: "Padding · horizontal",  values: ["12px", "12px", "12px"], note: "Action iconOnly uses 8px." },
              { label: "Padding · vertical",    values: ["4px",  "4px",  "4px"] },
              { label: "Border radius",         values: ["8px",  "8px",  "8px"] },
              { label: "Border width",          values: ["1px",  "1px",  "1px"], note: "Overflow pill is dashed." },
              { label: "Icon · label gap",      values: ["8px",  "8px",  "—"] },
              { label: "Icon size",             values: ["12px", "12px", "12px"] },
              { label: "Label font size",       values: ["12px", "12px", "12px"], note: "Inter Medium." },
              { label: "Count badge size",      values: ["16px", "—",    "—"],   note: "Circular, 10px bold text." },
              { label: "Width",                 values: ["auto", "auto", "192px"], note: "Search has fixed width." },
              { label: "Inter-pill gap",        values: ["8px",  "8px",  "—"],   note: "Bar-level flex gap." },
              { label: "Bar padding",           values: ["12px", "12px", "12px"] },
              { label: "Vertical divider",      values: ["1px",  "1px",  "—"],   note: "20px tall, separates groups." },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Filter pills shift to the brand accent when active; action buttons stay neutral throughout.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "pill",
              label: "Filter pill",
              rows: [
                { variant: "Default",   bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-secondary",     hex: "#4d5862" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" }, hover: { token: "neutral-grey-300", hex: "#dfe2e2" } },
                { variant: "Active",    bg: { token: "brand-primary-50",   hex: "#e8f4fd" }, text: { token: "brand-primary-500",  hex: "#0066cc" }, border: { token: "brand-primary-500",  hex: "#0066cc" } },
                { variant: "Overflow",  bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-secondary",     hex: "#4d5862" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" }, hover: { token: "brand-primary-500", hex: "#0066cc" } },
              ],
            },
            {
              id: "action",
              label: "Action",
              rows: [
                { variant: "Action · default",  bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-secondary",     hex: "#4d5862" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" }, hover: { token: "text-primary", hex: "#121f28" } },
                { variant: "Action · muted",    bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-disabled",      hex: "#8a9199" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" } },
                { variant: "Search input",      bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-primary",       hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" }, hover: { token: "brand-primary-500", hex: "#0066cc" } },
                { variant: "Vertical divider",  bg: { token: "neutral-divider-10", hex: "#e0e3e5" }, text: { token: "text-disabled",      hex: "#8a9199" } },
              ],
            },
            {
              id: "clear",
              label: "Clear",
              rows: [
                { variant: "Clear button",     text: { token: "scale-red-600",     hex: "#ae2700" }, hover: { token: "scale-red-700", hex: "#881f00" } },
                { variant: "Count badge",      bg: { token: "brand-primary-500",   hex: "#0066cc" }, text: { token: "text-on-accent", hex: "#ffffff" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

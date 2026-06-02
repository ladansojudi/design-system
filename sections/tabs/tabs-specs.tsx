"use client";

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

function VariantSwatch({ variant }: { variant: "underline" | "pill" }) {
  if (variant === "underline") {
    return (
      <span className="inline-flex items-end gap-0.5" aria-hidden>
        <span className="inline-block w-3 h-3 border-b-2 border-s4e-brand-primary-500" />
        <span className="inline-block w-3 h-3 border-b-2 border-transparent" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 bg-s4e-neutral-grey-100 rounded-[3px] p-0.5" aria-hidden>
      <span className="inline-block w-3 h-2 rounded-[2px] bg-s4e-surface-app shadow-sm" />
      <span className="inline-block w-3 h-2 rounded-[2px]" />
    </span>
  );
}

function StateSwatch({ state }: { state: "active" | "inactive" | "disabled" }) {
  const cls = {
    active:   "bg-s4e-brand-primary-500",
    inactive: "bg-s4e-neutral-grey-300",
    disabled: "bg-s4e-neutral-grey-200 opacity-60",
  }[state];
  return <span className={cn("inline-block w-4 h-2 rounded-[2px]", cls)} aria-hidden />;
}

// ── TabsSpecs ─────────────────────────────────────────────────────────────

export function TabsSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer configures per Tab Bar and per Tab Item. Map these to Figma component properties.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "variant",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<VariantSwatch variant="underline" />} label="underline" />
                  <OptionPill swatch={<VariantSwatch variant="pill"      />} label="pill" />
                </div>
              ),
              default:     "underline",
              description: "Underline for primary in-page nav; pill for secondary segmented controls inside cards.",
            },
            {
              name:    "state",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<StateSwatch state="active"   />} label="active" />
                  <OptionPill swatch={<StateSwatch state="inactive" />} label="inactive" />
                  <OptionPill swatch={<StateSwatch state="disabled" />} label="disabled" />
                </div>
              ),
              default:     "inactive",
              description: "Active gets the indicator; inactive is muted; disabled is non-interactive.",
            },
            {
              name:    "label",
              type:    "string",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">e.g. &quot;Findings&quot;</span>,
              default: "—",
              description: "Short tab name — keep to 1–2 words so all tabs fit one row.",
            },
            {
              name:    "badge",
              type:    "number",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">e.g. 12</span>,
              default: "—",
              description: "Optional count chip rendered to the right of the label.",
            },
            {
              name:    "disabled",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Renders tab as muted with not-allowed cursor; ignored by keyboard navigation.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Per-item measurements. The container height equals item height; the indicator (underline) overlaps the container bottom border.
        </SpecLede>

        <SpacingDiagram width={120} height={40} padX={16} padY={12} radius={4}>
          <div className="w-full h-full flex items-center justify-center border-b-2 border-s4e-brand-primary-500 text-s4e-brand-primary-500 text-[13px] font-medium">
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
              { label: "Container radius",       values: ["0",    "8px"], note: "Pill container border-radius." },
              { label: "Item radius",            values: ["0",    "8px"], note: "Active pill is rounded inside the track." },
              { label: "Container padding",      values: ["0",    "4px"], note: "Pill track inner gutter." },
              { label: "Inter-item gap",         values: ["0",    "4px"] },
              { label: "Label · badge gap",      values: ["8px",  "8px"] },
              { label: "Badge min-width",        values: ["20px", "20px"], note: "Pill-shaped chip, height 20px." },
              { label: "Badge padding · X",      values: ["8px",  "8px"] },
              { label: "Font size",              values: ["13px", "13px"], note: "Inter Medium." },
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
                { variant: "Disabled", text: { token: "text-disabled",      hex: "#8a9199" } },
                { variant: "Track",    text: { token: "text-disabled",      hex: "#8a9199" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" } },
              ],
            },
            {
              id: "pill",
              label: "Pill",
              rows: [
                { variant: "Container", bg: { token: "neutral-grey-100",  hex: "#f7f8f8" }, text: { token: "text-secondary",     hex: "#4d5862" } },
                { variant: "Active",    bg: { token: "surface-row",       hex: "#ffffff" }, text: { token: "text-primary",       hex: "#121f28" } },
                { variant: "Inactive",  text: { token: "text-secondary",  hex: "#4d5862" }, hover: { token: "text-primary",      hex: "#121f28" } },
                { variant: "Disabled",  text: { token: "text-disabled",   hex: "#8a9199" } },
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

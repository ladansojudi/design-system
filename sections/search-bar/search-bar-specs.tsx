"use client";

import { Search } from "lucide-react";
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

function VariantSwatch({ variant }: { variant: "default" | "ghost" }) {
  return (
    <span
      className={cn(
        "inline-block w-4 h-3 rounded-[3px]",
        variant === "default"
          ? "border border-s4e-text-primary bg-s4e-surface-app"
          : "bg-s4e-neutral-grey-200 border border-transparent",
      )}
      aria-hidden
    />
  );
}

function StateSwatch({ state }: { state: "default" | "focused" | "disabled" }) {
  const cls = {
    default:  "border border-s4e-neutral-divider-10 bg-s4e-surface-app",
    focused:  "border border-s4e-brand-primary-500 bg-s4e-surface-app",
    disabled: "border border-s4e-neutral-divider-10 bg-s4e-surface-app opacity-40",
  }[state];
  return <span className={cn("inline-block w-4 h-3 rounded-[3px]", cls)} aria-hidden />;
}

// ── SearchBarSpecs ────────────────────────────────────────────────────────

export function SearchBarSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Designer-facing props for placing the Search Bar in Figma. Names map 1:1 with the React component.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "variant",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<VariantSwatch variant="default" />} label="default" />
                  <OptionPill swatch={<VariantSwatch variant="ghost"   />} label="ghost" />
                </div>
              ),
              default:     "default",
              description: "Default sits on white; ghost recedes inside top bars and toolbars.",
            },
            {
              name:    "state",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<StateSwatch state="default"  />} label="default" />
                  <OptionPill swatch={<StateSwatch state="focused"  />} label="focused" />
                  <OptionPill swatch={<StateSwatch state="disabled" />} label="disabled" />
                </div>
              ),
              default:     "default",
              description: "Interaction state — focused adds a 2px brand ring; disabled fades to 40%.",
            },
            {
              name:    "placeholder",
              type:    "string",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">e.g. &quot;Search assets…&quot;</span>,
              default: "Search…",
              description: "Hint shown when the input is empty — name what can be searched.",
            },
            {
              name:    "value",
              type:    "string",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">controlled</span>,
              default: "—",
              description: "Current text value. Presence of a value reveals the clear (×) affordance.",
            },
            {
              name:    "hasClear",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "auto",
              description: "Trailing × button. Auto-shown when value is non-empty and not disabled.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Single fixed height across variants. Recreate from these values alone — no token hunting required.
        </SpecLede>

        <SpacingDiagram width={240} height={36} padX={12} padY={8} radius={8}>
          <div className="w-full h-full flex items-center gap-2 rounded-lg px-3 border border-s4e-neutral-divider-10 bg-s4e-surface-app">
            <Search size={14} className="text-s4e-text-disabled shrink-0" />
            <span className="text-[13px] text-s4e-text-disabled">Search…</span>
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
              { label: "Font size",             values: ["13px"], note: "Inter Regular." },
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
                { variant: "Default",  bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-primary",       hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" } },
                { variant: "Focused",  bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-primary",       hex: "#121f28" }, border: { token: "brand-primary-500",  hex: "#0066cc" } },
                { variant: "Disabled", bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-disabled",      hex: "#8a9199" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" } },
              ],
            },
            {
              id: "ghost",
              label: "Ghost",
              rows: [
                { variant: "Default",  bg: { token: "neutral-grey-100",    hex: "#f7f8f8" }, text: { token: "text-primary",       hex: "#121f28" } },
                { variant: "Focused",  bg: { token: "neutral-grey-100",    hex: "#f7f8f8" }, text: { token: "text-primary",       hex: "#121f28" }, border: { token: "brand-primary-500",  hex: "#0066cc" } },
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

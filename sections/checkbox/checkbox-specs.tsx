"use client";

import { Check } from "lucide-react";
import {
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  OptionPill,
  BoolSwatch,
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────

function ToneSwatch({ tone }: { tone: "primary" | "neutral" }) {
  const cls = tone === "primary" ? "bg-s4e-btn-primary-600" : "bg-s4e-btn-neutral-800";
  return <span className={`inline-block w-3 h-3 rounded-[3px] ${cls}`} aria-hidden />;
}

function StateSwatch({ state }: { state: "off" | "on" | "mixed" }) {
  if (state === "off") {
    return <span className="inline-block w-3 h-3 rounded-[2px] border-2 border-s4e-neutral-grey-400" aria-hidden />;
  }
  if (state === "on") {
    return (
      <span className="inline-flex items-center justify-center w-3 h-3 rounded-[2px] bg-s4e-btn-primary-600" aria-hidden>
        <span className="inline-block w-1.5 h-[1.5px] bg-white rotate-45 translate-x-[-1px] translate-y-[1px]" />
        <span className="inline-block w-[7px] h-[1.5px] bg-white -rotate-45 translate-x-[-3px] translate-y-[-1px]" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-3 h-3 rounded-[2px] bg-s4e-btn-primary-600" aria-hidden>
      <span className="inline-block w-1.5 h-[1.5px] bg-white" />
    </span>
  );
}

export function CheckboxSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing a Checkbox. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "checked",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<StateSwatch state="off" />} label="false" />
                  <OptionPill swatch={<StateSwatch state="on"  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Selected state. Pair with onChange for controlled use.",
            },
            {
              name:    "indeterminate",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<StateSwatch state="mixed" />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Partial parent state — shows a minus glyph. Trumps checked.",
            },
            {
              name:    "tone",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<ToneSwatch tone="primary" />} label="primary" />
                  <OptionPill swatch={<ToneSwatch tone="neutral" />} label="neutral" />
                </div>
              ),
              default:     "primary",
              description: "Fill color when checked. Use neutral inside dense data tables.",
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
              description: "Non-interactive state — 40% opacity, pointer-events disabled.",
            },
            {
              name:    "label",
              type:    "string",
              values:  <OptionPill label="optional" />,
              default: "—",
              description: "Inline label; click target extends to the whole label.",
            },
            {
              name:    "description",
              type:    "string",
              values:  <OptionPill label="optional" />,
              default: "—",
              description: "12px helper below the label, in disabled color.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Single size. Diagram shows the box alone — labels and descriptions wrap freely beside it.
        </SpecLede>

        <SpacingDiagram width={16} height={16} padX={4} padY={4} radius={4} scale={5}>
          <div className="w-full h-full inline-flex items-center justify-center rounded-[3px] bg-s4e-btn-primary-600">
            <Check size={10} className="text-white" strokeWidth={3} />
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["default"]}
            rows={[
              { label: "Box size",              values: ["16px"], note: "Square. Tick auto-centered." },
              { label: "Border width",          values: ["2px"], note: "Outline when unchecked." },
              { label: "Border radius",         values: ["4px"] },
              { label: "Tick icon size",        values: ["12px"], note: "Lucide Check / Minus." },
              { label: "Inner padding",         values: ["4px"], note: "Visual; via flex center." },
              { label: "Box · label gap",       values: ["8px"] },
              { label: "Label font size",       values: ["12px"] },
              { label: "Description font size", values: ["12px"], note: "Disabled color." },
              { label: "Label · description gap", values: ["4px"] },
              { label: "Focus ring · width",    values: ["2px"] },
              { label: "Focus ring · offset",   values: ["4px"] },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Per tone — fill (checked) and outline (unchecked) tokens. Reach for the named token whenever possible.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "primary",
              label: "Primary",
              rows: [
                {
                  variant: "Checked",
                  bg:     { token: "btn-primary-600",  hex: "#0f69aa" },
                  text:   { token: "text-on-accent",   hex: "#ffffff" },
                  border: { token: "btn-primary-600",  hex: "#0f69aa" },
                },
                {
                  variant: "Unchecked",
                  bg:     { token: "surface-row",      hex: "#ffffff" },
                  text:   { token: "text-primary",     hex: "#121f28" },
                  border: { token: "neutral-grey-400", hex: "#9ea4a4" },
                  hover:  { token: "neutral-grey-600", hex: "#5a6062" },
                },
              ],
            },
            {
              id: "neutral",
              label: "Neutral",
              rows: [
                {
                  variant: "Checked",
                  bg:     { token: "btn-neutral-800",  hex: "#1f2323" },
                  text:   { token: "text-on-accent",   hex: "#ffffff" },
                  border: { token: "btn-neutral-800",  hex: "#1f2323" },
                },
                {
                  variant: "Unchecked",
                  bg:     { token: "surface-row",      hex: "#ffffff" },
                  text:   { token: "text-primary",     hex: "#121f28" },
                  border: { token: "neutral-grey-400", hex: "#9ea4a4" },
                  hover:  { token: "neutral-grey-600", hex: "#5a6062" },
                },
              ],
            },
            {
              id: "label",
              label: "Label",
              rows: [
                {
                  variant: "Default",
                  text:   { token: "text-primary",   hex: "#121f28" },
                },
                {
                  variant: "Description",
                  text:   { token: "text-disabled",  hex: "#8a9097" },
                },
                {
                  variant: "Disabled",
                  text:   { token: "text-disabled",  hex: "#8a9097" },
                },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

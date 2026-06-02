"use client";

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

function VariantSwatch({ variant }: { variant: "dark" | "primary" }) {
  const cls = variant === "primary" ? "bg-s4e-btn-primary-600" : "bg-s4e-neutral-grey-800";
  return (
    <span className={`inline-flex items-center w-5 h-3 rounded-full ${cls}`} aria-hidden>
      <span className="inline-block w-2 h-2 rounded-full bg-white translate-x-2.5 shadow-sm" />
    </span>
  );
}

// ── Spec section ──────────────────────────────────────────────────────────

export function SwitchRadioSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Properties exposed on the Switch and Radio components. Mirror these names as Figma
          component properties so a Figma instance maps 1:1 to its code counterpart.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "variant",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<VariantSwatch variant="dark"    />} label="dark" />
                  <OptionPill swatch={<VariantSwatch variant="primary" />} label="primary" />
                </div>
              ),
              default:     "dark",
              description: "Switch only — checked track color. Use primary for brand-aligned settings.",
            },
            {
              name:    "checked",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Current on/off state. Drives track color and thumb position.",
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
              values:  <OptionPill label="external" />,
              default:     "—",
              description: "Descriptor placed next to the control. Always pair the control with a label for accessibility.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Switch is a 40×20 pill with a 16px circular thumb. Radio is a 16×16 ring with an 8px inner
          dot when selected. Recreate the control from these numbers alone.
        </SpecLede>

        <SpacingDiagram width={40} height={20} padX={4} padY={4} radius={16}>
          <div className="absolute inset-0 rounded-full bg-s4e-btn-primary-600 flex items-center">
            <span className="block w-[16px] h-[16px] rounded-full bg-white shadow-sm ml-auto mr-[2px]" />
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["Switch", "Radio"]}
            rows={[
              { label: "Track / ring width",   values: ["40px", "16px"], note: "Switch pill or radio circle." },
              { label: "Track / ring height",  values: ["20px", "16px"] },
              { label: "Thumb / dot size",     values: ["16px", "8px"],  note: "Inner indicator when checked." },
              { label: "Thumb inset",          values: ["4px",  "—"],    note: "Switch: gap from track edge to thumb." },
              { label: "Ring stroke",          values: ["—",    "2px"],  note: "Radio: outer ring border thickness." },
              { label: "Border radius",        values: ["full", "full"], note: "Both are fully rounded." },
              { label: "Control · label gap",  values: ["8px",  "8px"] },
              { label: "Label font size",      values: ["13px", "13px"] },
              { label: "Row gap (radio group)",values: ["—",    "12px"], note: "Vertical spacing between options." },
              { label: "Focus ring · width",   values: ["2px",  "2px"] },
              { label: "Focus ring · offset",  values: ["4px",  "4px"] },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Track, thumb and ring tokens. Switch swaps the track between two checked colorways;
          radio keeps a single neutral ring with a dark dot.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "switch-dark",
              label: "Switch · dark",
              rows: [
                { variant: "Checked",   bg: { token: "neutral-grey-800",  hex: "#1f2323" }, text: { token: "white",              hex: "#ffffff" }, hover: { token: "neutral-grey-900",  hex: "#121f28" } },
                { variant: "Unchecked", bg: { token: "neutral-grey-300",  hex: "#dfe2e2" }, text: { token: "white",              hex: "#ffffff" }, hover: { token: "neutral-grey-400",  hex: "#b7bcbe" } },
                { variant: "Disabled",  bg: { token: "neutral-grey-300",  hex: "#dfe2e2" }, text: { token: "white",              hex: "#ffffff" } },
              ],
            },
            {
              id: "switch-primary",
              label: "Switch · primary",
              rows: [
                { variant: "Checked",   bg: { token: "btn-primary-600",   hex: "#0f69aa" }, text: { token: "white",              hex: "#ffffff" }, hover: { token: "btn-primary-700",   hex: "#024a72" } },
                { variant: "Unchecked", bg: { token: "neutral-grey-300",  hex: "#dfe2e2" }, text: { token: "white",              hex: "#ffffff" }, hover: { token: "neutral-grey-400",  hex: "#b7bcbe" } },
              ],
            },
            {
              id: "radio",
              label: "Radio",
              rows: [
                { variant: "Selected",   text:   { token: "neutral-grey-800",  hex: "#1f2323" }, border: { token: "neutral-grey-800", hex: "#1f2323" } },
                { variant: "Unselected", text:   { token: "text-primary",      hex: "#121f28" }, border: { token: "neutral-grey-400", hex: "#b7bcbe" }, hover: { token: "neutral-grey-600", hex: "#7b8084" } },
                { variant: "Disabled",   text:   { token: "text-disabled",     hex: "#9ca3a4" }, border: { token: "neutral-grey-300", hex: "#dfe2e2" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

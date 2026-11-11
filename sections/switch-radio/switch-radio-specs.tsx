"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import {
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
  
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────


// ── Spec section ──────────────────────────────────────────────────────────

export function SwitchRadioSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Properties exposed on the Switch and Radio components. Mirror these names as Figma
          component properties so a Figma instance maps 1:1 to its code counterpart.
        </SpecLede>
        <PropsFromCode slug="switch-radio" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Switch is a 40×20 pill with a 16px circular thumb. Radio is a 16×16 ring with an 8px inner
          dot when selected. Recreate the control from these numbers alone.
        </SpecLede>

        <SpacingDiagram width={40} height={20} padX={4} padY={4} radius={16}>
          <div className="absolute inset-0 rounded-full bg-snt-btn-primary-600 flex items-center">
            <span className="block w-[16px] h-[16px] rounded-full bg-white shadow-sm ml-auto mr-[2px]" />
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["Switch", "Radio"]}
            rows={[
              { label: "Track / ring width",   values: ["36px", "16px"], note: "Switch pill or radio circle." },
              { label: "Track / ring height",  values: ["22px", "16px"] },
              { label: "Thumb / dot size",     values: ["16px", "8px"],  note: "Inner indicator when checked." },
              { label: "Thumb inset",          values: ["3px", "—"],    note: "Switch: gap from track edge to thumb." },
              { label: "Ring stroke",          values: ["—",    "2px"],  note: "Radio: outer ring border thickness." },
              { label: "Border radius",        values: ["full", "full"], note: "Both are fully rounded." },
              { label: "Control · label gap",  values: ["8px",  "8px"] },
              { label: "Label font size",      values: ["14px", "14px"] },
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

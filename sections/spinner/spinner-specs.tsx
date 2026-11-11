"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import {
  
  DimensionsTable,
  ColorTokenTabs,
  
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Swatches ──────────────────────────────────────────────────────────────



// ── Spec section ──────────────────────────────────────────────────────────

export function SpinnerSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Spinner is a pure indicator — no content slot, no padding. Only two designer-facing props
          and an optional accessible label.
        </SpecLede>
        <PropsFromCode slug="spinner" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Spinner has no padding — only diameter and stroke. The 3/4 ring spins through one full
          rotation per second at all sizes.
        </SpecLede>

        <DimensionsTable
          columns={["xs", "sm", "md", "lg"]}
          rows={[
            { label: "Diameter",        values: ["12px", "16px", "24px", "36px"], note: "Outer width × height (square)." },
            { label: "Stroke width",    values: ["2px",  "2px",  "2px",  "3px"],  note: "Ring thickness." },
            { label: "Arc length",      values: ["270°", "270°", "270°", "270°"], note: "Visible portion of the ring." },
            { label: "Rotation period", values: ["1s",   "1s",   "1s",   "1s"],   note: "One full turn per second." },
            { label: "Inline · text gap", values: ["4px", "8px", "8px",  "12px"], note: "Spinner ↔ adjacent label." },
          ]}
        />
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          The ring uses two colors — a faded track and a full-opacity arc. Match the tone to the
          surface the spinner lives on.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "primary",
              label: "Primary",
              rows: [
                { variant: "Arc",   text: { token: "brand-primary-500",     hex: "#0072b5" } },
                { variant: "Track", text: { token: "brand-primary-500 @25%", hex: "#0072b540" } },
              ],
            },
            {
              id: "neutral",
              label: "Neutral",
              rows: [
                { variant: "Arc",   text: { token: "text-secondary",         hex: "#697376" } },
                { variant: "Track", text: { token: "text-disabled @25%",     hex: "#9ca3a440" } },
              ],
            },
            {
              id: "white",
              label: "White",
              rows: [
                { variant: "Arc",   text: { token: "text-white",             hex: "#ffffff" } },
                { variant: "Track", text: { token: "text-white @30%",        hex: "#ffffff4d" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

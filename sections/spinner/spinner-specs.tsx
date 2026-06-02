"use client";

import {
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  OptionPill,
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Swatches ──────────────────────────────────────────────────────────────

function SizeSwatch({ size }: { size: "xs" | "sm" | "md" | "lg" }) {
  const d = { xs: 8, sm: 10, md: 12, lg: 14 }[size];
  return (
    <span
      className="inline-block rounded-full border-2 border-s4e-neutral-grey-300 border-t-s4e-text-primary"
      style={{ width: d, height: d }}
      aria-hidden
    />
  );
}

function ToneSwatch({ tone }: { tone: "primary" | "neutral" | "white" }) {
  const cls = {
    primary: "border-s4e-brand-primary-500/30 border-t-s4e-brand-primary-500",
    neutral: "border-s4e-text-disabled/25 border-t-s4e-text-secondary",
    white:   "border-white/40 border-t-white",
  }[tone];
  return (
    <span
      className={`inline-block w-3 h-3 rounded-full border-2 ${cls} ${tone === "white" ? "bg-s4e-neutral-grey-800" : ""}`}
      aria-hidden
    />
  );
}

// ── Spec section ──────────────────────────────────────────────────────────

export function SpinnerSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Spinner is a pure indicator — no content slot, no padding. Only two designer-facing props
          and an optional accessible label.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "size",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap items-end gap-1.5">
                  <OptionPill swatch={<SizeSwatch size="xs" />} label="xs" />
                  <OptionPill swatch={<SizeSwatch size="sm" />} label="sm" />
                  <OptionPill swatch={<SizeSwatch size="md" />} label="md" />
                  <OptionPill swatch={<SizeSwatch size="lg" />} label="lg" />
                </div>
              ),
              default:     "md",
              description: "Outer diameter — match the surrounding text or container.",
            },
            {
              name:    "tone",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<ToneSwatch tone="primary" />} label="primary" />
                  <OptionPill swatch={<ToneSwatch tone="neutral" />} label="neutral" />
                  <OptionPill swatch={<ToneSwatch tone="white"   />} label="white" />
                </div>
              ),
              default:     "primary",
              description: "Stroke colorway. White is intended for dark surfaces and primary buttons.",
            },
            {
              name:    "label",
              type:    "string",
              values:  <OptionPill label="aria-label" />,
              default:     "Loading",
              description: "Accessible label announced by screen readers via role=status.",
            },
          ]}
        />
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

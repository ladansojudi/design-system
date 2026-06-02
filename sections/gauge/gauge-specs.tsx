"use client";

import {
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  OptionPill,
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

function ColorSwatch({ hex }: { hex: string }) {
  return (
    <span
      className="inline-block w-3 h-3 rounded-full border border-s4e-neutral-divider-10"
      style={{ backgroundColor: hex }}
      aria-hidden
    />
  );
}

export function GaugeSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing this component. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:        "value",
              type:        "number",
              default:     "—",
              description: "Current reading; clamped to [0, max] before drawing.",
            },
            {
              name:        "max",
              type:        "number",
              default:     "100",
              description: "Upper bound of the scale; appears after the “/” in the label.",
            },
            {
              name:    "color",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<ColorSwatch hex="#3b82f6" />} label="blue" />
                  <OptionPill swatch={<ColorSwatch hex="#22c55e" />} label="green" />
                  <OptionPill swatch={<ColorSwatch hex="#e0a800" />} label="yellow" />
                  <OptionPill swatch={<ColorSwatch hex="#d33324" />} label="red" />
                  <OptionPill swatch={<ColorSwatch hex="#8a4dbf" />} label="purple" />
                </div>
              ),
              default:     "blue",
              description: "Severity tone — paints the track, fill arc and severity markers.",
            },
            {
              name:        "label",
              type:        "string",
              default:     "{value} / {max}",
              description: "Caption beneath the gauge; defaults to the numeric ratio.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          The Gauge is a fixed-geometry SVG — sizing is described by arc metrics rather than padding. All values are expressed in SVG units (1u = 1 CSS pixel at 1× scale).
        </SpecLede>

        <DimensionsTable
          columns={["value"]}
          rows={[
            { label: "Container · width",      values: ["168px"], note: "SVG canvas width." },
            { label: "Container · height",     values: ["104px"], note: "Half-arc plus baseline." },
            { label: "Arc · radius",           values: ["68px"], note: "From baseline center." },
            { label: "Arc · stroke width",     values: ["12px"], note: "Track and progress share." },
            { label: "Arc · sweep angle",      values: ["180°"], note: "Left edge → right edge." },
            { label: "Severity markers · radius",   values: ["80px"], note: "Outer rim, above main arc." },
            { label: "Severity markers · count",    values: ["5"] },
            { label: "Severity markers · stroke",   values: ["4px"] },
            { label: "Severity markers · gap",      values: ["8°"], note: "Angular gap between dashes." },
            { label: "Needle · length",        values: ["48px"], note: "From pivot to tip." },
            { label: "Needle · base width",    values: ["8px"] },
            { label: "Needle · pivot radius",  values: ["4px"] },
            { label: "Label · gap to arc",     values: ["8px"], note: "Below baseline." },
            { label: "Label · value size",     values: ["12px"], note: "Bold 700." },
            { label: "Label · max size",       values: ["12px"], note: "Muted." },
            { label: "Draw animation",         values: ["1.1s"], note: "Ease-out on mount." },
          ]}
        />
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Each color tone references the same four-step scale — 100 for the track, 500 for the fill arc, 200/600 for the rim markers (light vs active). Reach for the named token whenever possible.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "blue",
              label: "Blue",
              rows: [
                { variant: "Track",         bg: { token: "scale-blue-100", hex: "#dbeafe" }, text: { token: "—", hex: "#dbeafe" } },
                { variant: "Fill arc",      bg: { token: "scale-blue-500", hex: "#3b82f6" }, text: { token: "—", hex: "#3b82f6" } },
                { variant: "Marker · idle", bg: { token: "scale-blue-200", hex: "#bfdbfe" }, text: { token: "—", hex: "#bfdbfe" } },
                { variant: "Marker · active", bg: { token: "scale-blue-600", hex: "#2563eb" }, text: { token: "—", hex: "#2563eb" } },
              ],
            },
            {
              id: "green",
              label: "Green",
              rows: [
                { variant: "Track",         bg: { token: "scale-green-100", hex: "#dcfce7" }, text: { token: "—", hex: "#dcfce7" } },
                { variant: "Fill arc",      bg: { token: "scale-green-500", hex: "#22c55e" }, text: { token: "—", hex: "#22c55e" } },
                { variant: "Marker · idle", bg: { token: "scale-green-200", hex: "#bbf7d0" }, text: { token: "—", hex: "#bbf7d0" } },
                { variant: "Marker · active", bg: { token: "scale-green-600", hex: "#16a34a" }, text: { token: "—", hex: "#16a34a" } },
              ],
            },
            {
              id: "yellow",
              label: "Yellow",
              rows: [
                { variant: "Track",         bg: { token: "scale-yellow-100", hex: "#fef3c7" }, text: { token: "—", hex: "#fef3c7" } },
                { variant: "Fill arc",      bg: { token: "scale-yellow-500", hex: "#e0a800" }, text: { token: "—", hex: "#e0a800" } },
                { variant: "Marker · idle", bg: { token: "scale-yellow-200", hex: "#fde68a" }, text: { token: "—", hex: "#fde68a" } },
                { variant: "Marker · active", bg: { token: "scale-yellow-600", hex: "#b07700" }, text: { token: "—", hex: "#b07700" } },
              ],
            },
            {
              id: "red",
              label: "Red",
              rows: [
                { variant: "Track",         bg: { token: "scale-red-100", hex: "#fde2e0" }, text: { token: "—", hex: "#fde2e0" } },
                { variant: "Fill arc",      bg: { token: "scale-red-500", hex: "#d33324" }, text: { token: "—", hex: "#d33324" } },
                { variant: "Marker · idle", bg: { token: "scale-red-200", hex: "#fac0bc" }, text: { token: "—", hex: "#fac0bc" } },
                { variant: "Marker · active", bg: { token: "scale-red-600", hex: "#a01e16" }, text: { token: "—", hex: "#a01e16" } },
              ],
            },
            {
              id: "purple",
              label: "Purple",
              rows: [
                { variant: "Track",         bg: { token: "scale-purple-100", hex: "#ede1f6" }, text: { token: "—", hex: "#ede1f6" } },
                { variant: "Fill arc",      bg: { token: "scale-purple-500", hex: "#8a4dbf" }, text: { token: "—", hex: "#8a4dbf" } },
                { variant: "Marker · idle", bg: { token: "scale-purple-200", hex: "#dbc4ec" }, text: { token: "—", hex: "#dbc4ec" } },
                { variant: "Marker · active", bg: { token: "scale-purple-600", hex: "#6a3995" }, text: { token: "—", hex: "#6a3995" } },
              ],
            },
            {
              id: "needle",
              label: "Needle",
              rows: [
                { variant: "Needle · body",  bg: { token: "neutral-grey-500",  hex: "#8a9199" }, text: { token: "—", hex: "#8a9199" } },
                { variant: "Needle · pivot", bg: { token: "neutral-grey-600",  hex: "#5f6973" }, text: { token: "—", hex: "#5f6973" } },
                { variant: "Label · value",  text: { token: "text-primary",    hex: "#121f28" } },
                { variant: "Label · max",    text: { token: "text-disabled",   hex: "#8a9199" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

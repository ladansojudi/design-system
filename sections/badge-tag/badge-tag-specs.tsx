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

type Color = "warning" | "error" | "success" | "neutral" | "info" | "primary";

function ColorSwatch({ color }: { color: Color }) {
  const cls = {
    warning: "bg-s4e-scale-yellow-500",
    error:   "bg-s4e-scale-red-500",
    success: "bg-s4e-scale-green-500",
    neutral: "bg-s4e-neutral-grey-400",
    info:    "bg-s4e-scale-blue-500",
    primary: "bg-s4e-brand-primary-500",
  }[color];
  return <span className={`inline-block w-3 h-3 rounded-full ${cls}`} aria-hidden />;
}

function DotPositionSwatch({ side }: { side: "left" | "right" }) {
  return (
    <span className="inline-flex items-center gap-0.5 w-5 h-3 rounded-full border border-s4e-neutral-divider-10 bg-white px-0.5">
      {side === "left" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-s4e-brand-primary-500" />}
      <span className="flex-1" />
      {side === "right" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-s4e-brand-primary-500" />}
    </span>
  );
}

export function BadgeTagSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing a Badge. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "color",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<ColorSwatch color="warning" />} label="warning" />
                  <OptionPill swatch={<ColorSwatch color="error"   />} label="error" />
                  <OptionPill swatch={<ColorSwatch color="success" />} label="success" />
                  <OptionPill swatch={<ColorSwatch color="neutral" />} label="neutral" />
                  <OptionPill swatch={<ColorSwatch color="info"    />} label="info" />
                  <OptionPill swatch={<ColorSwatch color="primary" />} label="primary" />
                </div>
              ),
              default:     "neutral",
              description: "Semantic tone — drives surface tint, text, and dot color.",
            },
            {
              name:    "outlined",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Swap filled surface for a transparent body + 1px border.",
            },
            {
              name:    "showDot",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "true",
              description: "Adds a 7px dot — doubles as an accessibility cue beyond color.",
            },
            {
              name:    "dotPosition",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<DotPositionSwatch side="left"  />} label="left" />
                  <OptionPill swatch={<DotPositionSwatch side="right" />} label="right" />
                </div>
              ),
              default:     "left",
              description: "Side the dot sits on. Ignored when showDot is false.",
            },
            {
              name:    "children",
              type:    "string",
              values:  <OptionPill label="required" />,
              default: "—",
              description: "Label — one or two words, Title Case or lowercase consistently.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          One size — content-driven width, fixed height. Diagram shows a filled badge with a dot on the left.
        </SpecLede>

        <SpacingDiagram width={80} height={24} padX={8} padY={4} radius={12}>
          <div className="w-full h-full inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[12px] font-medium bg-s4e-scale-green-50 text-s4e-scale-green-600">
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-s4e-scale-green-500 shrink-0" />
            <span>Success</span>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["default"]}
            rows={[
              { label: "Height",                values: ["24px"], note: "Fixed; controls vertical centering." },
              { label: "Min width",             values: ["auto"], note: "Content-driven; never grows past label." },
              { label: "Padding · horizontal",  values: ["8px"] },
              { label: "Padding · vertical",    values: ["4px"], note: "Visual; auto-centered via fixed height." },
              { label: "Border radius",         values: ["12px"], note: "Full pill — half of height." },
              { label: "Border width",          values: ["1px"], note: "Outlined variant only." },
              { label: "Font size",             values: ["12px"] },
              { label: "Font weight",           values: ["500"], note: "Inter Medium." },
              { label: "Dot size",              values: ["8px"], note: "Rounded full circle." },
              { label: "Dot · label gap",       values: ["4px"] },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          One table per color — filled and outlined share text color but flip background. Reach for the named token whenever possible.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "warning",
              label: "Warning",
              rows: [
                { variant: "Filled",   bg: { token: "scale-yellow-50", hex: "#fffbeb" }, text: { token: "scale-yellow-700", hex: "#92400e" } },
                { variant: "Outlined", text: { token: "scale-yellow-700", hex: "#92400e" }, border: { token: "scale-yellow-300", hex: "#fcd34d" } },
              ],
            },
            {
              id: "error",
              label: "Error",
              rows: [
                { variant: "Filled",   bg: { token: "scale-red-50", hex: "#fef2f2" }, text: { token: "scale-red-600", hex: "#dc2626" } },
                { variant: "Outlined", text: { token: "scale-red-600", hex: "#dc2626" }, border: { token: "scale-red-300", hex: "#fca5a5" } },
              ],
            },
            {
              id: "success",
              label: "Success",
              rows: [
                { variant: "Filled",   bg: { token: "scale-green-50", hex: "#ecfdf5" }, text: { token: "scale-green-600", hex: "#16a34a" } },
                { variant: "Outlined", text: { token: "scale-green-600", hex: "#16a34a" }, border: { token: "scale-green-300", hex: "#86efac" } },
              ],
            },
            {
              id: "neutral",
              label: "Neutral",
              rows: [
                { variant: "Filled",   bg: { token: "neutral-grey-100", hex: "#f7f8f8" }, text: { token: "text-secondary",     hex: "#3a4d59" } },
                { variant: "Outlined", text: { token: "text-secondary",  hex: "#3a4d59" }, border: { token: "neutral-divider-10", hex: "#e3e6e6" } },
              ],
            },
            {
              id: "info",
              label: "Info",
              rows: [
                { variant: "Filled",   bg: { token: "scale-blue-50", hex: "#eff6ff" }, text: { token: "scale-blue-600", hex: "#2563eb" } },
                { variant: "Outlined", text: { token: "scale-blue-600", hex: "#2563eb" }, border: { token: "scale-blue-300", hex: "#93c5fd" } },
              ],
            },
            {
              id: "primary",
              label: "Primary",
              rows: [
                { variant: "Filled",   bg: { token: "brand-primary-50", hex: "#e8f4fd" }, text: { token: "brand-primary-600", hex: "#0f69aa" } },
                { variant: "Outlined", text: { token: "brand-primary-600", hex: "#0f69aa" }, border: { token: "brand-primary-200", hex: "#a8d6f4" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

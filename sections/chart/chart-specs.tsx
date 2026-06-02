"use client";

import {
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  OptionPill,
  BoolSwatch,
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

export function ChartSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Shared instance properties across all chart kinds. Per-chart props (segments, series, ticks) are passed via the `data` prop.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "kind",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill label="donut" />
                  <OptionPill label="bar" />
                  <OptionPill label="line" />
                  <OptionPill label="treemap" />
                </div>
              ),
              default:     "donut",
              description: "Which chart kind to render. Each kind has its own data shape.",
            },
            {
              name:        "title",
              type:        "string",
              default:     "—",
              description: "Card header title — short, 2–3 words.",
            },
            {
              name:        "description",
              type:        "string | null",
              default:     "null",
              description: "Single-line context shown next to the title.",
            },
            {
              name:    "viewAll",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Right-aligned link in the header that navigates to the full view.",
            },
            {
              name:    "layout",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill label="horizontal" />
                  <OptionPill label="vertical" />
                </div>
              ),
              default:     "horizontal",
              description: "Donut only — legend beside (horizontal) or below (vertical) the ring.",
            },
            {
              name:        "stats",
              type:        "StatBlock[]",
              default:     "[]",
              description: "Summary cards rendered above the chart (Bar, Line, Treemap).",
            },
            {
              name:        "data",
              type:        "ChartData",
              default:     "—",
              description: "Chart-specific data — segments, series or rows depending on kind.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Charts are composed pieces — there isn&apos;t one dominant geometry. The tables below cover the shared Chart Card shell first, then per-chart geometry for each kind.
        </SpecLede>

        <div className="space-y-6">
          <DimensionsTable
            columns={["value"]}
            rows={[
              { label: "Card · border radius",   values: ["12px"] },
              { label: "Card · border width",    values: ["1px"] },
              { label: "Card header · padding X",values: ["20px"] },
              { label: "Card header · padding Y",values: ["12px"] },
              { label: "Card header · title size",values: ["14px"], note: "Semibold 600." },
              { label: "Card body · padding X",  values: ["20px"] },
              { label: "Card body · padding Y",  values: ["20px"] },
              { label: "Stat block · padding X", values: ["16px"] },
              { label: "Stat block · padding Y", values: ["12px"] },
              { label: "Stat block · gap",       values: ["12px"], note: "Between stacked stat cards." },
              { label: "Stat block · radius",    values: ["8px"] },
              { label: "Stat block · value size",values: ["16px"], note: "Bold 700, tabular-nums." },
            ]}
          />

          <DimensionsTable
            columns={["donut"]}
            rows={[
              { label: "Ring · outer size",   values: ["180px"], note: "SVG viewport." },
              { label: "Ring · radius",       values: ["72px"] },
              { label: "Ring · stroke width", values: ["28px"] },
              { label: "Center label · size", values: ["20px"], note: "Bold 600, total count." },
              { label: "Legend · row height", values: ["40px"] },
              { label: "Legend · dot size",   values: ["12px"] },
              { label: "Legend · gap",        values: ["12px"], note: "Dot → label → value." },
              { label: "Donut → legend gap",  values: ["32px"], note: "Horizontal layout." },
            ]}
          />

          <DimensionsTable
            columns={["bar"]}
            rows={[
              { label: "Chart area · height", values: ["240px"] },
              { label: "Bar · max width",     values: ["56px"] },
              { label: "Bar · radius (top)",  values: ["4px"] },
              { label: "Bar · gap",           values: ["24px"], note: "Between adjacent bars." },
              { label: "Y axis · label size", values: ["12px"], note: "Muted, tabular-nums." },
              { label: "Y axis · gutter",     values: ["32px"], note: "Width reserved for tick labels." },
              { label: "Value label · size",  values: ["12px"], note: "Above each bar." },
              { label: "X axis · label size", values: ["12px"] },
            ]}
          />

          <DimensionsTable
            columns={["line"]}
            rows={[
              { label: "Chart area · height", values: ["160px"] },
              { label: "Line · stroke width", values: ["1px"], note: "SVG units; scales with width." },
              { label: "Area fill · opacity", values: ["28%"], note: "Top of vertical gradient." },
              { label: "Grid line · stroke",  values: ["1px"], note: "Dashed 4 / 4." },
              { label: "Y axis · gutter",     values: ["40px"] },
              { label: "Y axis · label size", values: ["12px"] },
              { label: "X axis · label size", values: ["12px"] },
              { label: "X axis · gap to chart", values: ["8px"] },
            ]}
          />

          <DimensionsTable
            columns={["treemap"]}
            rows={[
              { label: "Block area · height", values: ["256px"] },
              { label: "Block · radius",      values: ["8px"] },
              { label: "Block · gap",         values: ["4px"], note: "Between adjacent blocks." },
              { label: "Block label · size",  values: ["12px"], note: "Semibold 600." },
              { label: "Stat block · gap",    values: ["12px"], note: "Above the treemap." },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Charts pull from the categorical `data-*` ramp for segments and from the brand ramp for primary metrics. Reach for the named token whenever possible.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "card",
              label: "Card shell",
              rows: [
                { variant: "Card",          bg: { token: "surface-app",      hex: "#ffffff" }, text: { token: "text-primary",  hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Header",        bg: { token: "neutral-grey-100", hex: "#f7f8f8" }, text: { token: "text-primary",  hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Description",   text: { token: "text-disabled",  hex: "#8a9199" } },
                { variant: "View all link", text: { token: "brand-primary-500", hex: "#0066cc" }, hover: { token: "brand-primary-600", hex: "#0a5689" } },
                { variant: "Stat block",    bg: { token: "neutral-grey-100", hex: "#f7f8f8" }, text: { token: "text-primary",  hex: "#121f28" } },
                { variant: "Stat positive", text: { token: "scale-green-600",hex: "#16a34a" } },
              ],
            },
            {
              id: "categorical",
              label: "Categorical",
              rows: [
                { variant: "data-1", bg: { token: "data-1", hex: "#c7e4fb" }, text: { token: "text-primary",   hex: "#121f28" } },
                { variant: "data-2", bg: { token: "data-2", hex: "#fcd9b7" }, text: { token: "text-primary",   hex: "#121f28" } },
                { variant: "data-3", bg: { token: "data-3", hex: "#f5c2c0" }, text: { token: "text-primary",   hex: "#121f28" } },
                { variant: "data-4", bg: { token: "data-4", hex: "#d5c5ec" }, text: { token: "text-primary",   hex: "#121f28" } },
                { variant: "data-5", bg: { token: "data-5", hex: "#0f69aa" }, text: { token: "text-on-accent", hex: "#ffffff" } },
                { variant: "data-6", bg: { token: "data-6", hex: "#b07700" }, text: { token: "text-on-accent", hex: "#ffffff" } },
                { variant: "data-7", bg: { token: "data-7", hex: "#a01e16" }, text: { token: "text-on-accent", hex: "#ffffff" } },
                { variant: "data-8", bg: { token: "data-8", hex: "#6a3995" }, text: { token: "text-on-accent", hex: "#ffffff" } },
              ],
            },
            {
              id: "brand",
              label: "Brand",
              rows: [
                { variant: "Bar · primary",   bg: { token: "brand-primary-600", hex: "#0a5689" }, text: { token: "text-on-accent", hex: "#ffffff" } },
                { variant: "Bar · default",   bg: { token: "brand-primary-500", hex: "#0066cc" }, text: { token: "text-on-accent", hex: "#ffffff" } },
                { variant: "Line · stroke",   bg: { token: "brand-primary-500", hex: "#0066cc" }, text: { token: "—",              hex: "#0066cc" } },
                { variant: "Line · area top", bg: { token: "brand-primary-500/28", hex: "#0066cc47" }, text: { token: "—",          hex: "#0066cc" } },
                { variant: "Grid lines",      bg: { token: "neutral-grey-200",  hex: "#ebeded" }, text: { token: "—",              hex: "#ebeded" } },
                { variant: "Axis labels",     text: { token: "text-disabled",   hex: "#8a9199" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

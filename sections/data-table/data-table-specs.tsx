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

export function DataTableSpecs() {
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
              name:        "title",
              type:        "string",
              default:     "—",
              description: "Short widget label (2–3 words) in the grey header strip.",
            },
            {
              name:        "description",
              type:        "string",
              default:     "—",
              description: "Single-line context for what the list is filtered by — required.",
            },
            {
              name:        "badge",
              type:        "string | null",
              default:     "null",
              description: "Optional state pill (Live, New, Beta…) shown in the top header.",
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
              description: "Right-aligned link that navigates to the full list.",
            },
            {
              name:    "rowsPerPage",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill label="3" />
                  <OptionPill label="5" />
                  <OptionPill label="10" />
                  <OptionPill label="25" />
                </div>
              ),
              default:     "5",
              description: "Number of rows shown per page; controls footer paginator range.",
            },
            {
              name:        "columns",
              type:        "Column[]",
              default:     "—",
              description: "Column definitions — key, label, alignment and optional renderer.",
            },
            {
              name:        "rows",
              type:        "Row[]",
              default:     "—",
              description: "Data rows. Empty array shows the empty-state placeholder.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Exact measurements for the table container, header, row and footer. Recreate this component in any tool using only these values.
        </SpecLede>

        <SpacingDiagram width={480} height={48} padX={20} padY={12} radius={8}>
          <div className="w-full h-full border border-s4e-neutral-divider-10 bg-s4e-surface-app rounded-md grid grid-cols-[1fr_1fr_80px_72px] items-center gap-3 px-5">
            <span className="text-[12px] text-s4e-text-primary truncate">SQL Injection</span>
            <span className="text-[12px] text-s4e-text-primary truncate">api.s4e.io</span>
            <span className="text-[11px] text-s4e-text-secondary text-right tabular-nums">19.09.2024</span>
            <div className="flex justify-end">
              <span className="inline-flex items-center justify-center rounded-[3px] px-2 py-0.5 w-14 bg-s4e-scale-red-50 border-l-[3px] border-s4e-scale-red-500 text-[10px] font-medium text-s4e-scale-red-600">
                High
              </span>
            </div>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["value"]}
            rows={[
              { label: "Container · border radius",     values: ["8px"] },
              { label: "Container · border width",      values: ["1px"] },
              { label: "Top header · padding X",        values: ["20px"] },
              { label: "Top header · padding Y",        values: ["12px"] },
              { label: "Top header · title size",       values: ["14px"], note: "Semibold 600." },
              { label: "Top header · description size", values: ["12px"] },
              { label: "Column header · padding Y",     values: ["8px"], note: "Tight strip between header and rows." },
              { label: "Column header · font size",     values: ["11px"], note: "Uppercase tracking-wide." },
              { label: "Row · height",                  values: ["48px"], note: "Includes 12px vertical padding." },
              { label: "Row · padding X",               values: ["20px"] },
              { label: "Row · padding Y",               values: ["12px"] },
              { label: "Row · cell gap",                values: ["12px"] },
              { label: "Row · font size",               values: ["13px"] },
              { label: "Severity badge · padding X",    values: ["12px"] },
              { label: "Severity badge · padding Y",    values: ["4px"] },
              { label: "Severity badge · border radius",values: ["4px"] },
              { label: "Severity accent bar",           values: ["3px"], note: "Left border on the badge." },
              { label: "Footer · padding X",            values: ["20px"] },
              { label: "Footer · padding Y",            values: ["12px"] },
              { label: "Footer · control gap",          values: ["16px"] },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Token, hex value, and the role each color plays. Reach for the named token whenever possible — the hex is only a fallback for tools that can&apos;t reference CSS variables.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "container",
              label: "Container",
              rows: [
                { variant: "Container",      bg: { token: "surface-app",          hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Top header",     bg: { token: "neutral-grey-100",     hex: "#f7f8f8" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Description",    text: { token: "text-disabled",      hex: "#8a9199" } },
                { variant: "Column header",  text: { token: "text-disabled",      hex: "#8a9199" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Row · idle",     bg: { token: "surface-app",          hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, hover: { token: "neutral-grey-100",   hex: "#f7f8f8" } },
                { variant: "Row · separator",border: { token: "neutral-divider-10", hex: "#e6e8e8" }, text: { token: "text-primary", hex: "#121f28" } },
              ],
            },
            {
              id: "severity",
              label: "Severity",
              rows: [
                { variant: "High",     bg: { token: "scale-red-50",     hex: "#fcf3f2" }, text: { token: "scale-red-600",    hex: "#a01e16" }, border: { token: "scale-red-500",    hex: "#d33324" } },
                { variant: "Critical", bg: { token: "scale-purple-50",  hex: "#f6f0fa" }, text: { token: "scale-purple-600", hex: "#6a3995" }, border: { token: "scale-purple-500", hex: "#8a4dbf" } },
              ],
            },
            {
              id: "status",
              label: "Status",
              rows: [
                { variant: "Live",  bg: { token: "scale-yellow-50",  hex: "#fdf6e3" }, text: { token: "scale-yellow-700", hex: "#8a5a00" }, border: { token: "scale-yellow-500", hex: "#e0a800" } },
                { variant: "Beta",  bg: { token: "brand-primary-50", hex: "#e8f4fd" }, text: { token: "brand-primary-600",hex: "#0a5689" }, border: { token: "brand-primary-500",hex: "#0066cc" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import {
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
  
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";
import { SeverityBadge } from "@/components/ui/severity-badge";

export function DataTableSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing this component. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropsFromCode slug="data-table" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Exact measurements for the table container, header, row and footer. Recreate this component in any tool using only these values.
        </SpecLede>

        <SpacingDiagram width={480} height={48} padX={20} padY={12} radius={8}>
          <div className="w-full h-full border border-snt-neutral-divider-10 bg-snt-surface-app rounded-md grid grid-cols-[1fr_1fr_80px_72px] items-center gap-3 px-5">
            <span className="text-[12px] text-snt-text-primary truncate">SQL Injection</span>
            <span className="text-[12px] text-snt-text-primary truncate">api.example.com</span>
            <span className="text-[11px] text-snt-text-secondary text-right tabular-nums">19.09.2024</span>
            <div className="flex justify-end">
              <SeverityBadge severity="high" size="sm" />
            </div>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["value"]}
            rows={[
              { label: "Container · border radius",     values: ["14px"] },
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
              { label: "Row · font size",               values: ["14px"] },
              { label: "Severity",                      values: ["SeverityBadge sm"], note: "24px tall, right-aligned; see Severity badge for its specs." },
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
                { variant: "Container",      bg: { token: "surface-app",          hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "border-default", hex: "#e6e8e8" } },
                { variant: "Top header",     bg: { token: "bg-subtle",     hex: "#f7f8f8" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "border-default", hex: "#e6e8e8" } },
                { variant: "Description",    text: { token: "text-secondary",      hex: "#8a9199" } },
                { variant: "Column header",  text: { token: "text-secondary",      hex: "#8a9199" }, border: { token: "border-default", hex: "#e6e8e8" } },
                { variant: "Row · idle",     bg: { token: "surface-app",          hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, hover: { token: "bg-subtle",   hex: "#f7f8f8" } },
                { variant: "Row · separator",border: { token: "border-default", hex: "#e6e8e8" }, text: { token: "text-primary", hex: "#121f28" } },
              ],
            },
            
            {
              id: "status",
              label: "Status",
              rows: [
                { variant: "Live",  bg: { token: "bg-warning-subtle",  hex: "#fdf6e3" }, text: { token: "scale-yellow-700", hex: "#8a5a00" }, border: { token: "scale-yellow-500", hex: "#e0a800" } },
                { variant: "Badge", bg: { token: "bg-warning-subtle" }, text: { token: "scale-yellow-700" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

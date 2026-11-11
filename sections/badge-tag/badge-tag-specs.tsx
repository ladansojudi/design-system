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




export function BadgeTagSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing a Badge. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropsFromCode slug="badge-tag" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          One size — content-driven width, fixed height. Diagram shows a filled badge with a dot on the left.
        </SpecLede>

        <SpacingDiagram width={80} height={24} padX={8} padY={4} radius={12}>
          <div className="w-full h-full inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[12px] font-medium bg-snt-scale-green-50 text-snt-scale-green-600">
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-snt-scale-green-500 shrink-0" />
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
              { label: "Font weight",           values: ["500"], note: "Geist Medium." },
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
                { variant: "Filled",   bg: { token: "bg-warning-subtle", hex: "#fffbeb" }, text: { token: "scale-yellow-700", hex: "#92400e" } },
                { variant: "Outlined", text: { token: "scale-yellow-700", hex: "#92400e" }, border: { token: "scale-yellow-200", hex: "#fcd34d" } },
              ],
            },
            {
              id: "error",
              label: "Error",
              rows: [
                { variant: "Filled",   bg: { token: "bg-error-subtle", hex: "#fef2f2" }, text: { token: "text-error", hex: "#dc2626" } },
                { variant: "Outlined", text: { token: "text-error", hex: "#dc2626" }, border: { token: "scale-red-200", hex: "#fca5a5" } },
              ],
            },
            {
              id: "success",
              label: "Success",
              rows: [
                { variant: "Filled",   bg: { token: "bg-success-subtle", hex: "#ecfdf5" }, text: { token: "scale-green-600", hex: "#16a34a" } },
                { variant: "Outlined", text: { token: "scale-green-600", hex: "#16a34a" }, border: { token: "scale-green-200", hex: "#86efac" } },
              ],
            },
            {
              id: "neutral",
              label: "Neutral",
              rows: [
                { variant: "Filled",   bg: { token: "bg-subtle", hex: "#f7f8f8" }, text: { token: "text-secondary",     hex: "#3a4d59" } },
                { variant: "Outlined", text: { token: "text-secondary",  hex: "#3a4d59" }, border: { token: "border-default", hex: "#e3e6e6" } },
              ],
            },
            {
              id: "info",
              label: "Info",
              rows: [
                { variant: "Filled",   bg: { token: "bg-info-subtle", hex: "#eff6ff" }, text: { token: "scale-blue-600", hex: "#2563eb" } },
                { variant: "Outlined", text: { token: "scale-blue-600", hex: "#2563eb" }, border: { token: "scale-blue-200", hex: "#93c5fd" } },
              ],
            },
            {
              id: "primary",
              label: "Primary",
              rows: [
                { variant: "Filled",   bg: { token: "bg-brand-subtle", hex: "#e8f4fd" }, text: { token: "brand-primary-600", hex: "#0f69aa" } },
                { variant: "Outlined", text: { token: "brand-primary-600", hex: "#0f69aa" }, border: { token: "brand-primary-200", hex: "#a8d6f4" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import {
  SpecSectionTitle,
  SpecLede,
  
  DimensionsTable,
  ColorTokenTabs,
  
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────



// ── BreadcrumbSpecs ───────────────────────────────────────────────────────

export function BreadcrumbSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Per-item properties. A Breadcrumb is an ordered list of items — typically links plus one final &quot;current&quot; item.
        </SpecLede>
        <PropsFromCode slug="breadcrumb" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Breadcrumb is text-only — there is no fixed padding. Rhythm is set by the gap between items and the line-height of the text.
        </SpecLede>

        <DimensionsTable
          columns={["value"]}
          rows={[
            { label: "Line height",          values: ["20px"], note: "Sets effective row height." },
            { label: "Font size · link",     values: ["14px"], note: "Geist Medium (500)." },
            { label: "Font size · current",  values: ["14px"], note: "Geist Regular (400)." },
            { label: "Font size · separator",values: ["12px"], note: "Slightly smaller for visual balance." },
            { label: "Item · separator gap", values: ["8px"],  note: "Horizontal flex gap on both sides of the separator." },
            { label: "Hover underline offset", values: ["2px"] },
            { label: "Hover underline thickness", values: ["1px"] },
            { label: "Truncation max width", values: ["240px"], note: "Recommended; show full name in tooltip." },
          ]}
        />
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Breadcrumb relies entirely on text color — no backgrounds or borders.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "link",
              label: "Link",
              rows: [
                { variant: "Default", text: { token: "text-primary",       hex: "#121f28" }, hover: { token: "brand-primary-500", hex: "#0066cc" } },
                { variant: "Hover",   text: { token: "brand-primary-500",  hex: "#0066cc" }, border: { token: "brand-primary-500", hex: "#0066cc" } },
                { variant: "Visited", text: { token: "text-secondary",      hex: "#8a9199" } },
              ],
            },
            {
              id: "static",
              label: "Static",
              rows: [
                { variant: "Current",   text: { token: "text-secondary", hex: "#8a9199" } },
                { variant: "Separator", text: { token: "text-secondary", hex: "#8a9199" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import {
  
  DimensionsTable,
  ColorTokenTabs,
  
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";
import { SeverityBadge } from "@/components/ui/severity-badge";

// ── Visual swatches ───────────────────────────────────────────────────────



export function SeverityBadgeSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing a Severity Badge. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropsFromCode slug="severity-badge" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Fixed pill width (160px) so badges line up cleanly in tables. Diagram shows a high-severity badge with a score.
        </SpecLede>

        <div className="flex flex-wrap items-center gap-6 rounded-xl border border-snt-border-default px-6 py-8">
          <SeverityBadge severity="high" score={8.1} />
          <SeverityBadge severity="high" score={8.1} size="sm" />
        </div>

        <div className="mt-6">
          <DimensionsTable
            columns={["sm", "md"]}
            rows={[
              { label: "Height",                values: ["24px", "28px"] },
              { label: "Width",                 values: ["auto", "auto"], note: "Follows the label; right-align the column in tables." },
              { label: "Padding · horizontal",  values: ["8px", "10px"] },
              { label: "Bars",                  values: ["4 × 3px", "4 × 3px"], note: "6 / 8 / 10 / 12px tall, 2px apart; Info is a 12px ring" },
              { label: "Bars · label gap",      values: ["8px", "8px"] },
              { label: "Label",                 values: ["12 / 500", "14 / 500"], note: "size / weight" },
              { label: "Score",                 values: ["12 mono", "14 mono"], note: "One decimal" },
              { label: "Border radius",         values: ["8px", "8px"] },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          One table per severity. Accent bar, surface, and text use the same color family at three different scales.
        </SpecLede>

        <ColorTokenTabs
            groups={[{
              id: "levels",
              label: "Levels",
              rows: [
                { variant: "Critical · 4 bars", bg: { token: "severity-critical" }, text: { token: "text-primary" }, border: { token: "border-default" } },
                { variant: "High · 3 bars",     bg: { token: "severity-high" },     text: { token: "text-primary" }, border: { token: "border-default" } },
                { variant: "Medium · 2 bars",   bg: { token: "severity-medium" },   text: { token: "text-primary" }, border: { token: "border-default" } },
                { variant: "Low · 1 bar",       bg: { token: "severity-low" },      text: { token: "text-primary" }, border: { token: "border-default" } },
                { variant: "Info · ring",       bg: { token: "severity-info" },     text: { token: "text-primary" }, border: { token: "border-default" } },
                { variant: "Empty bar",         bg: { token: "border-default" },    text: { token: "text-secondary" } },
              ],
            }]}
          />
      </section>
    </div>
  );
}

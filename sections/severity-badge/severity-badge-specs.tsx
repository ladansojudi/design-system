"use client";

import {
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  OptionPill,
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────

type Severity = "low" | "info" | "medium" | "high" | "critical";

function SeveritySwatch({ severity }: { severity: Severity }) {
  const cls = {
    low:      "bg-s4e-scale-green-500",
    info:     "bg-s4e-scale-blue-500",
    medium:   "bg-s4e-scale-yellow-500",
    high:     "bg-s4e-scale-red-500",
    critical: "bg-s4e-scale-purple-500",
  }[severity];
  return <span className={`inline-block w-1 h-3 rounded-[1px] ${cls}`} aria-hidden />;
}

export function SeverityBadgeSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing a Severity Badge. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "severity",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<SeveritySwatch severity="low"      />} label="low" />
                  <OptionPill swatch={<SeveritySwatch severity="info"     />} label="info" />
                  <OptionPill swatch={<SeveritySwatch severity="medium"   />} label="medium" />
                  <OptionPill swatch={<SeveritySwatch severity="high"     />} label="high" />
                  <OptionPill swatch={<SeveritySwatch severity="critical" />} label="critical" />
                </div>
              ),
              default:     "info",
              description: "Risk level — drives accent bar, background, and label color.",
            },
            {
              name:    "score",
              type:    "number",
              values:  <OptionPill label="optional" />,
              default: "—",
              description: "CVSS or internal risk score, right-aligned next to the label.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Fixed pill width (160px) so badges line up cleanly in tables. Diagram shows a high-severity badge with a score.
        </SpecLede>

        <SpacingDiagram width={160} height={32} padX={12} padY={8} radius={8}>
          <div className="w-full h-full flex items-center justify-between rounded-md px-3 py-1.5 bg-s4e-scale-red-50 border-l-[3px] border-s4e-scale-red-500">
            <span className="text-[12px] font-medium text-s4e-scale-red-600">High</span>
            <span className="text-[12px] text-s4e-scale-red-600 opacity-80">8.4</span>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["label", "label + score"]}
            rows={[
              { label: "Width",                values: ["160px", "160px"], note: "Fixed; alignment-friendly in tables." },
              { label: "Height",               values: ["32px",  "32px"], note: "Visual; controlled by padding + line-height." },
              { label: "Padding · horizontal", values: ["12px",  "12px"] },
              { label: "Padding · vertical",   values: ["8px",   "8px"] },
              { label: "Border radius",        values: ["8px",   "8px"], note: "rounded-md token." },
              { label: "Accent bar · width",   values: ["4px",   "4px"], note: "Left edge only." },
              { label: "Font size",            values: ["12px",  "12px"] },
              { label: "Font weight",          values: ["500",   "500"], note: "Inter Medium." },
              { label: "Score font weight",    values: ["—",     "400"], note: "Regular; 80% opacity." },
              { label: "Label · score gap",    values: ["—",     "auto"], note: "Justify-between." },
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
          groups={[
            {
              id: "low",
              label: "Low",
              rows: [
                {
                  variant: "Surface",
                  bg:     { token: "scale-green-50",  hex: "#ecfdf5" },
                  text:   { token: "scale-green-600", hex: "#16a34a" },
                  border: { token: "scale-green-500", hex: "#22c55e" },
                },
              ],
            },
            {
              id: "info",
              label: "Info",
              rows: [
                {
                  variant: "Surface",
                  bg:     { token: "scale-blue-50",  hex: "#eff6ff" },
                  text:   { token: "scale-blue-600", hex: "#2563eb" },
                  border: { token: "scale-blue-500", hex: "#3b82f6" },
                },
              ],
            },
            {
              id: "medium",
              label: "Medium",
              rows: [
                {
                  variant: "Surface",
                  bg:     { token: "scale-yellow-50",  hex: "#fffbeb" },
                  text:   { token: "scale-yellow-700", hex: "#92400e" },
                  border: { token: "scale-yellow-500", hex: "#f59e0b" },
                },
              ],
            },
            {
              id: "high",
              label: "High",
              rows: [
                {
                  variant: "Surface",
                  bg:     { token: "scale-red-50",  hex: "#fef2f2" },
                  text:   { token: "scale-red-600", hex: "#dc2626" },
                  border: { token: "scale-red-500", hex: "#ef4444" },
                },
              ],
            },
            {
              id: "critical",
              label: "Critical",
              rows: [
                {
                  variant: "Surface",
                  bg:     { token: "scale-purple-50",  hex: "#faf5ff" },
                  text:   { token: "scale-purple-600", hex: "#9333ea" },
                  border: { token: "scale-purple-500", hex: "#a855f7" },
                },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

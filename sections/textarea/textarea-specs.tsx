"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import {
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
  
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Swatches ──────────────────────────────────────────────────────────────



// ── Spec section ──────────────────────────────────────────────────────────

export function TextareaSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Textarea extends TextField with multi-line behavior — rows count, optional counter, and a
          resize handle. Use it when responses span more than one short phrase.
        </SpecLede>
        <PropsFromCode slug="textarea" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Same horizontal rhythm as TextField — only the vertical footprint grows with rows and the
          resize handle anchors to the bottom-right corner.
        </SpecLede>

        <SpacingDiagram width={240} height={96} padX={12} padY={8} radius={8}>
          <div
            className="absolute inset-0 bg-snt-surface-app border border-snt-neutral-grey-300 px-3 py-2 text-[15px] text-snt-text-primary leading-relaxed"
            style={{ borderRadius: 8 * 1.8 }}
          >
            Multi-line value
            <span className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-snt-text-disabled rounded-br-[2px]" aria-hidden />
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["sm", "md", "lg"]}
            rows={[
              { label: "Min height",            values: ["80px", "96px", "120px"], note: "Drives rows-based default footprint." },
              { label: "Padding · horizontal",  values: ["12px", "12px", "16px"] },
              { label: "Padding · vertical",    values: ["8px",  "8px",  "12px"] },
              { label: "Border radius",         values: ["8px",  "8px",  "8px"] },
              { label: "Border width · default",values: ["1px",  "1px",  "1px"] },
              { label: "Border width · focused",values: ["2px",  "2px",  "2px"], note: "Doubles on focus for visibility." },
              { label: "Line height",           values: ["20px", "20px", "24px"], note: "Multi-line readability." },
              { label: "Label · field gap",     values: ["4px",  "4px",  "4px"] },
              { label: "Field · helper gap",    values: ["4px",  "4px",  "4px"] },
              { label: "Helper · counter gap",  values: ["8px",  "8px",  "8px"], note: "Horizontal gap on the row below." },
              { label: "Font size · value",     values: ["14px", "14px", "14px"] },
              { label: "Font size · label",     values: ["11px", "11px", "12px"] },
              { label: "Font size · helper",    values: ["11px", "11px", "12px"] },
              { label: "Resize handle size",    values: ["12px", "12px", "12px"], note: "Bottom-right grab area." },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Textarea uses the outlined TextField palette. Counter has its own amber accent at the
          soft-limit threshold.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "surface",
              label: "Surface",
              rows: [
                { variant: "Default",  bg: { token: "surface-row",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "border-strong", hex: "#dfe2e2" } },
                { variant: "Focused",  bg: { token: "surface-row",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "border-focus",hex: "#0f69aa" } },
                { variant: "Error",    bg: { token: "surface-row",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "text-error",    hex: "#b0291e" } },
                { variant: "Disabled", bg: { token: "surface-row",       hex: "#ffffff" }, text: { token: "text-secondary",  hex: "#9ca3a4" }, border: { token: "neutral-grey-200", hex: "#ebeded" } },
              ],
            },
            {
              id: "label",
              label: "Label",
              rows: [
                { variant: "Label · default",   text: { token: "text-secondary",     hex: "#697376" } },
                { variant: "Label · error",     text: { token: "text-error",      hex: "#b0291e" } },
                { variant: "Helper text",       text: { token: "text-secondary",      hex: "#9ca3a4" } },
                { variant: "Error text",        text: { token: "text-error",      hex: "#b0291e" } },
                { variant: "Counter · normal",  text: { token: "text-secondary",      hex: "#9ca3a4" } },
                { variant: "Counter · 90%",     text: { token: "scale-yellow-700",   hex: "#a96b00" } },
                { variant: "Placeholder",       text: { token: "text-secondary",      hex: "#9ca3a4" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

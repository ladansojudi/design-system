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

export function TextFieldSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Properties exposed on the TextField component. State is driven by interaction in code, but
          designers select it explicitly in Figma to show all variants in one mock.
        </SpecLede>
        <PropsFromCode slug="text-field" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Three height tiers built on a 4-grid. Padding scales with height; helper text and label
          gaps stay constant.
        </SpecLede>

        <SpacingDiagram width={240} height={40} padX={12} padY={8} radius={8}>
          <div
            className="absolute inset-0 bg-snt-surface-app border border-snt-neutral-grey-300 flex items-center px-3"
            style={{ borderRadius: 8 * 1.8 }}
          >
            <span className="text-[16px] text-snt-text-primary">Value</span>
            <span className="absolute -top-[8px] left-2 bg-snt-surface-app px-1 text-[11px] text-snt-text-secondary">
              Label
            </span>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["filled", "outlined"]}
            rows={[
              { label: "Height",                 values: ["41px", "41px"], note: "No size prop: one size, label included." },
              { label: "Padding · horizontal",   values: ["12px", "12px"] },
              { label: "Padding · vertical",     values: ["6px", "12px top · 6px bottom"], note: "Outlined leaves room for the floating label." },
              { label: "Corner radius",          values: ["8px top", "8px"] },
              { label: "Border",                 values: ["2px bottom", "1px · 2px focused"] },
              { label: "Font size · value",      values: ["14px", "14px"] },
              { label: "Font size · label",      values: ["11px", "11px"] },
              { label: "Field · helper gap",     values: ["4px", "4px"] },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Variants share a state palette but differ in surface: filled paints the background, while
          outlined keeps the surface clean and shifts the border.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "outlined",
              label: "Outlined",
              rows: [
                { variant: "Default",  bg: { token: "surface-app",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "border-strong", hex: "#dfe2e2" } },
                { variant: "Focused",  bg: { token: "surface-app",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "brand-primary-600",hex: "#0f69aa" } },
                { variant: "Error",    bg: { token: "surface-app",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "text-error",    hex: "#b0291e" } },
                { variant: "Disabled", bg: { token: "surface-app",       hex: "#ffffff" }, text: { token: "text-disabled",  hex: "#9ca3a4" }, border: { token: "neutral-grey-200", hex: "#ebeded" } },
              ],
            },
            {
              id: "filled",
              label: "Filled",
              rows: [
                { variant: "Default",  bg: { token: "bg-subtle",  hex: "#f7f8f8" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "border-strong", hex: "#dfe2e2" } },
                { variant: "Focused",  bg: { token: "bg-subtle",  hex: "#f7f8f8" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "brand-primary-600",hex: "#0f69aa" } },
                { variant: "Error",    bg: { token: "bg-error-subtle",      hex: "#fcf3f2" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "text-error",    hex: "#b0291e" } },
                { variant: "Disabled", bg: { token: "bg-subtle",  hex: "#f7f8f8" }, text: { token: "text-disabled",  hex: "#9ca3a4" }, border: { token: "neutral-grey-200", hex: "#ebeded" } },
              ],
            },
            {
              id: "label",
              label: "Label",
              rows: [
                { variant: "Label · default",  text: { token: "text-disabled",      hex: "#9ca3a4" } },
                { variant: "Label · focused",  text: { token: "brand-primary-600",  hex: "#0f69aa" } },
                { variant: "Label · error",    text: { token: "text-error",      hex: "#b0291e" } },
                { variant: "Helper text",      text: { token: "text-disabled",      hex: "#9ca3a4" } },
                { variant: "Error text",       text: { token: "text-error",      hex: "#b0291e" } },
                { variant: "Placeholder",      text: { token: "text-disabled",      hex: "#9ca3a4" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

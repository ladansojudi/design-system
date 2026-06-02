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

// ── Swatches ──────────────────────────────────────────────────────────────

function VariantSwatch({ variant }: { variant: "filled" | "outlined" }) {
  if (variant === "filled") {
    return (
      <span className="inline-block w-4 h-3 rounded-t-[2px] bg-s4e-neutral-grey-100 border-b border-s4e-neutral-grey-400" aria-hidden />
    );
  }
  return (
    <span className="inline-block w-4 h-3 rounded-[2px] border border-s4e-neutral-grey-400" aria-hidden />
  );
}

function StateSwatch({ state }: { state: "default" | "focused" | "error" | "disabled" }) {
  const cls = {
    default:  "border-s4e-neutral-grey-400",
    focused:  "border-s4e-brand-primary-600",
    error:    "border-s4e-scale-red-600",
    disabled: "border-s4e-neutral-grey-200 opacity-50",
  }[state];
  return <span className={`inline-block w-4 h-3 rounded-[2px] border-2 ${cls}`} aria-hidden />;
}

function SizeSwatch({ size }: { size: "sm" | "md" | "lg" }) {
  const h = { sm: 8, md: 11, lg: 14 }[size];
  return <span className="inline-block w-4 rounded-[2px] border border-s4e-neutral-grey-400" style={{ height: h }} aria-hidden />;
}

// ── Spec section ──────────────────────────────────────────────────────────

export function TextFieldSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Properties exposed on the TextField component. State is driven by interaction in code, but
          designers select it explicitly in Figma to show all variants in one mock.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "variant",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<VariantSwatch variant="filled"   />} label="filled" />
                  <OptionPill swatch={<VariantSwatch variant="outlined" />} label="outlined" />
                </div>
              ),
              default:     "outlined",
              description: "Outlined for standalone forms; filled for dense sidebars and softer surfaces.",
            },
            {
              name:    "size",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap items-end gap-1.5">
                  <OptionPill swatch={<SizeSwatch size="sm" />} label="sm" />
                  <OptionPill swatch={<SizeSwatch size="md" />} label="md" />
                  <OptionPill swatch={<SizeSwatch size="lg" />} label="lg" />
                </div>
              ),
              default:     "md",
              description: "Field height — matches surrounding form density.",
            },
            {
              name:    "state",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<StateSwatch state="default"  />} label="default" />
                  <OptionPill swatch={<StateSwatch state="focused"  />} label="focused" />
                  <OptionPill swatch={<StateSwatch state="error"    />} label="error" />
                  <OptionPill swatch={<StateSwatch state="disabled" />} label="disabled" />
                </div>
              ),
              default:     "default",
              description: "Visual state. Hover is derived from interaction; error and disabled are explicit.",
            },
            {
              name:    "label",
              type:    "string",
              values:  <OptionPill label="always shown" />,
              default:     "—",
              description: "Descriptor above (outlined) or floating inside (filled). Required for accessibility.",
            },
            {
              name:    "placeholder",
              type:    "string",
              values:  <OptionPill label="hint text" />,
              default:     "—",
              description: "In-field hint shown when empty. Never a substitute for the label.",
            },
            {
              name:    "helperText",
              type:    "string",
              values:  <OptionPill label="caption" />,
              default:     "—",
              description: "Small caption below the field. Replaced by errorText when state is error.",
            },
            {
              name:    "errorText",
              type:    "string",
              values:  <OptionPill label="rule + example" />,
              default:     "—",
              description: "Red message when state is error. Explain the rule, ideally with a valid example.",
            },
            {
              name:    "required",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Appends * to the label and flags missing values on submit.",
            },
          ]}
        />
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
            className="absolute inset-0 bg-s4e-surface-app border border-s4e-neutral-grey-300 flex items-center px-3"
            style={{ borderRadius: 8 * 1.8 }}
          >
            <span className="text-[16px] text-s4e-text-primary">Value</span>
            <span className="absolute -top-[8px] left-2 bg-s4e-surface-app px-1 text-[11px] text-s4e-text-secondary">
              Label
            </span>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["sm", "md", "lg"]}
            rows={[
              { label: "Height",                values: ["36px", "40px", "44px"], note: "Fixed; controls vertical centering." },
              { label: "Padding · horizontal",  values: ["12px", "12px", "16px"] },
              { label: "Padding · vertical",    values: ["8px",  "8px",  "12px"], note: "Visual; auto-centered via fixed height." },
              { label: "Border radius",         values: ["8px",  "8px",  "8px"] },
              { label: "Border width · default",values: ["1px",  "1px",  "1px"] },
              { label: "Border width · focused",values: ["2px",  "2px",  "2px"], note: "Doubles on focus for visibility." },
              { label: "Label · field gap",     values: ["4px",  "4px",  "4px"], note: "Outlined: floats; filled: stays in surface." },
              { label: "Field · helper gap",    values: ["4px",  "4px",  "4px"] },
              { label: "Font size · value",     values: ["14px", "14px", "14px"] },
              { label: "Font size · label",     values: ["11px", "11px", "12px"] },
              { label: "Font size · helper",    values: ["11px", "11px", "12px"] },
              { label: "Icon size",             values: ["16px", "16px", "20px"], note: "Leading or trailing slot." },
              { label: "Focus ring · offset",   values: ["0",    "0",    "0"],   note: "Border width carries the focus signal." },
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
                { variant: "Default",  bg: { token: "surface-app",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-grey-300", hex: "#dfe2e2" } },
                { variant: "Hover",    bg: { token: "surface-app",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-grey-500", hex: "#979d9f" } },
                { variant: "Focused",  bg: { token: "surface-app",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "brand-primary-600",hex: "#0f69aa" } },
                { variant: "Error",    bg: { token: "surface-app",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "scale-red-600",    hex: "#b0291e" } },
                { variant: "Disabled", bg: { token: "surface-app",       hex: "#ffffff" }, text: { token: "text-disabled",  hex: "#9ca3a4" }, border: { token: "neutral-grey-200", hex: "#ebeded" } },
              ],
            },
            {
              id: "filled",
              label: "Filled",
              rows: [
                { variant: "Default",  bg: { token: "neutral-grey-100",  hex: "#f7f8f8" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-grey-300", hex: "#dfe2e2" } },
                { variant: "Hover",    bg: { token: "neutral-grey-200",  hex: "#ebeded" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-grey-400", hex: "#b7bcbe" } },
                { variant: "Focused",  bg: { token: "neutral-grey-100",  hex: "#f7f8f8" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "brand-primary-600",hex: "#0f69aa" } },
                { variant: "Error",    bg: { token: "scale-red-50",      hex: "#fcf3f2" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "scale-red-600",    hex: "#b0291e" } },
                { variant: "Disabled", bg: { token: "neutral-grey-100",  hex: "#f7f8f8" }, text: { token: "text-disabled",  hex: "#9ca3a4" }, border: { token: "neutral-grey-200", hex: "#ebeded" } },
              ],
            },
            {
              id: "label",
              label: "Label",
              rows: [
                { variant: "Label · default",  text: { token: "text-disabled",      hex: "#9ca3a4" } },
                { variant: "Label · focused",  text: { token: "brand-primary-600",  hex: "#0f69aa" } },
                { variant: "Label · error",    text: { token: "scale-red-600",      hex: "#b0291e" } },
                { variant: "Helper text",      text: { token: "text-disabled",      hex: "#9ca3a4" } },
                { variant: "Error text",       text: { token: "scale-red-600",      hex: "#b0291e" } },
                { variant: "Placeholder",      text: { token: "text-disabled",      hex: "#9ca3a4" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

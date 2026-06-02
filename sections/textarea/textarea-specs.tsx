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

function StateSwatch({ state }: { state: "default" | "focused" | "error" | "disabled" }) {
  const cls = {
    default:  "border-s4e-neutral-grey-400",
    focused:  "border-s4e-brand-primary-600",
    error:    "border-s4e-scale-red-600",
    disabled: "border-s4e-neutral-grey-200 opacity-50",
  }[state];
  return <span className={`inline-block w-4 h-3 rounded-[2px] border-2 ${cls}`} aria-hidden />;
}

function ResizeSwatch({ axis }: { axis: "none" | "y" | "both" }) {
  if (axis === "none") {
    return <span className="inline-block w-3 h-3 rounded-[2px] border border-s4e-neutral-grey-400" aria-hidden />;
  }
  return (
    <span className="relative inline-block w-3 h-3 rounded-[2px] border border-s4e-neutral-grey-400" aria-hidden>
      <span className="absolute bottom-0 right-0 w-1 h-1 border-r-2 border-b-2 border-s4e-text-primary" />
    </span>
  );
}

// ── Spec section ──────────────────────────────────────────────────────────

export function TextareaSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Textarea extends TextField with multi-line behavior — rows count, optional counter, and a
          resize handle. Use it when responses span more than one short phrase.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "rows",
              type:    "number",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill label="3" />
                  <OptionPill label="4" />
                  <OptionPill label="6" />
                  <OptionPill label="8" />
                </div>
              ),
              default:     "4",
              description: "Initial visible row count. Drives min-height; users can resize taller.",
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
              name:    "resize",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<ResizeSwatch axis="y"    />} label="y" />
                  <OptionPill swatch={<ResizeSwatch axis="both" />} label="both" />
                  <OptionPill swatch={<ResizeSwatch axis="none" />} label="none" />
                </div>
              ),
              default:     "y",
              description: "Direction the user can drag to resize. Vertical is the safest default.",
            },
            {
              name:    "label",
              type:    "string",
              values:  <OptionPill label="always shown" />,
              default:     "—",
              description: "11px descriptor above the field. Required for accessibility.",
            },
            {
              name:    "placeholder",
              type:    "string",
              values:  <OptionPill label="hint or template" />,
              default:     "—",
              description: "In-field hint shown when empty. Useful for hinting at structure.",
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
              name:    "maxLength",
              type:    "number",
              values:  <OptionPill label="optional limit" />,
              default:     "—",
              description: "Adds a character counter. Counter turns amber past 90% of the limit.",
            },
            {
              name:    "showCounter",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Force-show the counter even without a maxLength.",
            },
          ]}
        />
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
            className="absolute inset-0 bg-s4e-surface-app border border-s4e-neutral-grey-300 px-3 py-2 text-[15px] text-s4e-text-primary leading-relaxed"
            style={{ borderRadius: 8 * 1.8 }}
          >
            Multi-line value
            <span className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-s4e-text-disabled rounded-br-[2px]" aria-hidden />
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
                { variant: "Default",  bg: { token: "surface-row",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-grey-300", hex: "#dfe2e2" } },
                { variant: "Hover",    bg: { token: "surface-row",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-grey-500", hex: "#979d9f" } },
                { variant: "Focused",  bg: { token: "surface-row",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "brand-primary-600",hex: "#0f69aa" } },
                { variant: "Error",    bg: { token: "surface-row",       hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "scale-red-600",    hex: "#b0291e" } },
                { variant: "Disabled", bg: { token: "surface-row",       hex: "#ffffff" }, text: { token: "text-disabled",  hex: "#9ca3a4" }, border: { token: "neutral-grey-200", hex: "#ebeded" } },
              ],
            },
            {
              id: "label",
              label: "Label",
              rows: [
                { variant: "Label · default",   text: { token: "text-secondary",     hex: "#697376" } },
                { variant: "Label · error",     text: { token: "scale-red-600",      hex: "#b0291e" } },
                { variant: "Helper text",       text: { token: "text-disabled",      hex: "#9ca3a4" } },
                { variant: "Error text",        text: { token: "scale-red-600",      hex: "#b0291e" } },
                { variant: "Counter · normal",  text: { token: "text-disabled",      hex: "#9ca3a4" } },
                { variant: "Counter · 90%",     text: { token: "scale-yellow-700",   hex: "#a96b00" } },
                { variant: "Placeholder",       text: { token: "text-disabled",      hex: "#9ca3a4" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

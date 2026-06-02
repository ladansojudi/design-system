"use client";

import { ChevronDown } from "lucide-react";
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

// ── Visual swatches ───────────────────────────────────────────────────────

function StateSwatch({ state }: { state: "Default" | "Hover" | "Focused" | "Error" | "Disabled" }) {
  const cls = {
    Default:  "border-s4e-neutral-grey-300",
    Hover:    "border-s4e-neutral-grey-500",
    Focused:  "border-s4e-brand-primary-600",
    Error:    "border-s4e-scale-red-600",
    Disabled: "border-s4e-neutral-grey-300 opacity-40",
  }[state];
  return <span className={`inline-block w-5 h-3 rounded-[2px] bg-white border ${cls}`} aria-hidden />;
}

export function SelectSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing a Select. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "state",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<StateSwatch state="Default"  />} label="Default" />
                  <OptionPill swatch={<StateSwatch state="Hover"    />} label="Hover" />
                  <OptionPill swatch={<StateSwatch state="Focused"  />} label="Focused" />
                  <OptionPill swatch={<StateSwatch state="Error"    />} label="Error" />
                  <OptionPill swatch={<StateSwatch state="Disabled" />} label="Disabled" />
                </div>
              ),
              default:     "Default",
              description: "Visual state — drives border, ring, and text color.",
            },
            {
              name:    "label",
              type:    "string",
              values:  <OptionPill label="optional" />,
              default: "—",
              description: "Sits above the trigger. Required unless context makes purpose obvious.",
            },
            {
              name:    "options",
              type:    "Option[]",
              values:  <OptionPill label="required" />,
              default: "—",
              description: "List of { value, label, disabled? } rows shown in the popover.",
            },
            {
              name:    "value",
              type:    "string",
              values:  <OptionPill label="controlled" />,
              default: "—",
              description: "Currently selected option value. Empty string renders the placeholder.",
            },
            {
              name:    "placeholder",
              type:    "string",
              values:  <OptionPill label='"Select…"' />,
              default: "Select…",
              description: "Trigger label when no value is selected.",
            },
            {
              name:    "helperText",
              type:    "string",
              values:  <OptionPill label="optional" />,
              default: "—",
              description: "Hint below the trigger. Replaced by errorText when state is Error.",
            },
            {
              name:    "errorText",
              type:    "string",
              values:  <OptionPill label="optional" />,
              default: "—",
              description: "Validation message shown when state is Error.",
            },
            {
              name:    "disabled",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Non-interactive — 40% opacity, pointer-events disabled.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Trigger is a fixed-height row. Width follows the parent container. Diagram shows the default state with a value selected.
        </SpecLede>

        <SpacingDiagram width={240} height={36} padX={12} padY={8} radius={8}>
          <div className="w-full h-full flex items-center justify-between gap-2 px-3 rounded-md border border-s4e-neutral-grey-300 bg-s4e-surface-row text-[13px]">
            <span className="text-s4e-text-primary truncate">Europe (Frankfurt)</span>
            <ChevronDown size={14} className="shrink-0 text-s4e-text-disabled" />
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["trigger", "popover", "option"]}
            rows={[
              { label: "Height",                values: ["36px", "auto", "36px"], note: "Popover grows with content up to 240px." },
              { label: "Min width",             values: ["100%", "trigger", "100%"], note: "Popover matches trigger width." },
              { label: "Padding · horizontal",  values: ["12px", "0",    "12px"] },
              { label: "Padding · vertical",    values: ["8px",  "4px",  "8px"] },
              { label: "Border radius",         values: ["8px",  "8px",  "0"], note: "Trigger + popover share rounded-md." },
              { label: "Border width",          values: ["1px",  "1px",  "0"] },
              { label: "Trigger · popover gap", values: ["—",    "4px",  "—"], note: "Vertical offset below trigger." },
              { label: "Font size",             values: ["12px", "—",    "12px"] },
              { label: "Chevron size",          values: ["12px", "—",    "—"] },
              { label: "Label font size",       values: ["12px", "—",    "—"], note: "Sits above trigger." },
              { label: "Helper font size",      values: ["12px", "—",    "—"], note: "Below trigger." },
              { label: "Focus ring · width",    values: ["2px",  "—",    "—"] },
              { label: "Focus ring · offset",   values: ["0",    "—",    "—"], note: "Inside ring, brand-primary 20% alpha." },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Tables split by part — trigger states, popover surface, and option states.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "trigger",
              label: "Trigger",
              rows: [
                {
                  variant: "Default",
                  bg:     { token: "surface-row",       hex: "#ffffff" },
                  text:   { token: "text-primary",      hex: "#121f28" },
                  border: { token: "neutral-grey-300",  hex: "#dfe2e2" },
                },
                {
                  variant: "Hover",
                  bg:     { token: "surface-row",       hex: "#ffffff" },
                  text:   { token: "text-primary",      hex: "#121f28" },
                  border: { token: "neutral-grey-500",  hex: "#737a7d" },
                },
                {
                  variant: "Focused",
                  bg:     { token: "surface-row",       hex: "#ffffff" },
                  text:   { token: "text-primary",      hex: "#121f28" },
                  border: { token: "brand-primary-600", hex: "#0f69aa" },
                  hover:  { token: "brand-primary-500/20", hex: "#1e88e533" },
                },
                {
                  variant: "Error",
                  bg:     { token: "surface-row",       hex: "#ffffff" },
                  text:   { token: "text-primary",      hex: "#121f28" },
                  border: { token: "scale-red-600",     hex: "#dc2626" },
                },
                {
                  variant: "Disabled",
                  bg:     { token: "surface-row",       hex: "#ffffff" },
                  text:   { token: "text-disabled",     hex: "#8a9097" },
                  border: { token: "neutral-grey-300",  hex: "#dfe2e2" },
                },
              ],
            },
            {
              id: "popover",
              label: "Popover",
              rows: [
                {
                  variant: "Surface",
                  bg:     { token: "surface-row",         hex: "#ffffff" },
                  text:   { token: "text-primary",        hex: "#121f28" },
                  border: { token: "neutral-divider-10",  hex: "#e3e6e6" },
                },
                {
                  variant: "Option · hover",
                  bg:     { token: "surface-row-hover",   hex: "#f7f8f8" },
                  text:   { token: "text-primary",        hex: "#121f28" },
                },
                {
                  variant: "Option · selected",
                  bg:     { token: "brand-primary-500/8", hex: "#1e88e514" },
                  text:   { token: "text-primary",        hex: "#121f28" },
                },
                {
                  variant: "Option · disabled",
                  text:   { token: "text-disabled",       hex: "#8a9097" },
                },
              ],
            },
            {
              id: "label",
              label: "Label",
              rows: [
                { variant: "Label",        text: { token: "text-secondary",  hex: "#3a4d59" } },
                { variant: "Helper",       text: { token: "text-disabled",   hex: "#8a9097" } },
                { variant: "Error · text", text: { token: "scale-red-600",   hex: "#dc2626" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

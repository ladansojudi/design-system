"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import { ChevronDown } from "lucide-react";
import {
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
  
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────


export function SelectSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing a Select. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropsFromCode slug="select" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Trigger is a fixed-height row. Width follows the parent container. Diagram shows the default state with a value selected.
        </SpecLede>

        <SpacingDiagram width={240} height={36} padX={12} padY={8} radius={8}>
          <div className="w-full h-full flex items-center justify-between gap-2 px-3 rounded-md border border-snt-neutral-grey-300 bg-snt-surface-row text-[14px]">
            <span className="text-snt-text-primary truncate">Europe (Frankfurt)</span>
            <ChevronDown size={14} className="shrink-0 text-snt-text-disabled" />
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
                  border: { token: "border-strong",  hex: "#dfe2e2" },
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
                  border: { token: "border-focus", hex: "#0f69aa" },
                  hover:  { token: "brand-primary-500/20", hex: "#1e88e533" },
                },
                {
                  variant: "Error",
                  bg:     { token: "surface-row",       hex: "#ffffff" },
                  text:   { token: "text-primary",      hex: "#121f28" },
                  border: { token: "text-error",     hex: "#dc2626" },
                },
                {
                  variant: "Disabled",
                  bg:     { token: "surface-row",       hex: "#ffffff" },
                  text:   { token: "text-disabled",     hex: "#8a9097" },
                  border: { token: "border-strong",  hex: "#dfe2e2" },
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
                  border: { token: "border-default",  hex: "#e3e6e6" },
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
                { variant: "Error · text", text: { token: "text-error",   hex: "#dc2626" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

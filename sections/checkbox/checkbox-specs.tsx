"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import { Check } from "lucide-react";
import {
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
  
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────



export function CheckboxSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing a Checkbox. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropsFromCode slug="checkbox" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Single size. Diagram shows the box alone — labels and descriptions wrap freely beside it.
        </SpecLede>

        <SpacingDiagram width={16} height={16} padX={4} padY={4} radius={4} scale={5}>
          <div className="w-full h-full inline-flex items-center justify-center rounded-[3px] bg-snt-btn-primary-600">
            <Check size={10} className="text-white" strokeWidth={3} />
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["default"]}
            rows={[
              { label: "Box size",              values: ["18px"], note: "Square. Tick auto-centered." },
              { label: "Border width",          values: ["2px"], note: "Outline when unchecked." },
              { label: "Border radius",         values: ["4px"] },
              { label: "Tick icon size",        values: ["12px"], note: "Lucide Check / Minus." },
              { label: "Inner padding",         values: ["4px"], note: "Visual; via flex center." },
              { label: "Box · label gap",       values: ["8px"] },
              { label: "Label font size",       values: ["12px"] },
              { label: "Description font size", values: ["12px"], note: "Disabled color." },
              { label: "Label · description gap", values: ["4px"] },
              { label: "Focus ring · width",    values: ["2px"] },
              { label: "Focus ring · offset",   values: ["4px"] },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Per tone — fill (checked) and outline (unchecked) tokens. Reach for the named token whenever possible.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "primary",
              label: "Primary",
              rows: [
                {
                  variant: "Checked",
                  bg:     { token: "btn-primary-600",  hex: "#0f69aa" },
                  text:   { token: "text-on-accent",   hex: "#ffffff" },
                  border: { token: "btn-primary-600",  hex: "#0f69aa" },
                },
                {
                  variant: "Unchecked",
                  bg:     { token: "surface-row",      hex: "#ffffff" },
                  text:   { token: "text-primary",     hex: "#121f28" },
                  border: { token: "neutral-grey-400", hex: "#9ea4a4" },
                  hover:  { token: "neutral-grey-600", hex: "#5a6062" },
                },
              ],
            },
            {
              id: "neutral",
              label: "Neutral",
              rows: [
                {
                  variant: "Checked",
                  bg:     { token: "btn-neutral-800",  hex: "#1f2323" },
                  text:   { token: "text-on-accent",   hex: "#ffffff" },
                  border: { token: "btn-neutral-800",  hex: "#1f2323" },
                },
                {
                  variant: "Unchecked",
                  bg:     { token: "surface-row",      hex: "#ffffff" },
                  text:   { token: "text-primary",     hex: "#121f28" },
                  border: { token: "neutral-grey-400", hex: "#9ea4a4" },
                  hover:  { token: "neutral-grey-600", hex: "#5a6062" },
                },
              ],
            },
            {
              id: "label",
              label: "Label",
              rows: [
                {
                  variant: "Default",
                  text:   { token: "text-primary",   hex: "#121f28" },
                },
                {
                  variant: "Description",
                  text:   { token: "text-disabled",  hex: "#8a9097" },
                },
                {
                  variant: "Disabled",
                  text:   { token: "text-disabled",  hex: "#8a9097" },
                },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

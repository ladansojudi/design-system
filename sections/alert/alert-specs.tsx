"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import { Info } from "lucide-react";
import {
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
  
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────


export function AlertSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing an Alert. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropsFromCode slug="alert" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Layout is fluid in width and content-driven in height. Diagram shows a typical info Alert with a title and one-line description.
        </SpecLede>

        <SpacingDiagram width={400} height={72} padX={16} padY={12}>
          <div className="w-full h-full flex items-start gap-3 rounded-md border border-snt-scale-blue-200 bg-snt-scale-blue-50 px-4 py-3">
            <Info size={16} className="text-snt-text-info shrink-0 mt-px" />
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold leading-tight text-snt-text-info">Info alert</div>
              <div className="text-[12px] leading-relaxed mt-1 text-snt-text-info">Title + description sample.</div>
            </div>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["title + body", "title only", "body only"]}
            rows={[
              { label: "Min height",            values: ["72px", "44px", "44px"], note: "Content-driven; grows with wrapping body." },
              { label: "Padding · horizontal",  values: ["16px", "16px", "16px"] },
              { label: "Padding · vertical",    values: ["12px", "12px", "12px"] },
              { label: "Border radius",         values: ["10px", "10px", "10px"], note: "rounded-md token." },
              { label: "Border width",          values: ["1px",  "1px",  "1px"] },
              { label: "Icon size",             values: ["16px", "16px", "16px"], note: "Lucide stroke 2px." },
              { label: "Icon · text gap",       values: ["12px", "12px", "12px"] },
              { label: "Title · body gap",      values: ["4px",  "—",    "—"] },
              { label: "Body · action gap",     values: ["8px",  "—",    "8px"], note: "Only when action is present." },
              { label: "Title font size",       values: ["14px", "14px", "—"], note: "Semibold." },
              { label: "Body font size",        values: ["12px", "—",    "12px"] },
              { label: "Dismiss icon size",     values: ["14px", "14px", "14px"] },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          One table per variant. Reach for the named token whenever possible — the hex is only a fallback for tools that can&apos;t reference CSS variables.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "info",
              label: "Info",
              rows: [
                {
                  variant: "Surface",
                  bg:     { token: "bg-info-subtle",  hex: "#eff6ff" },
                  text:   { token: "text-info",      hex: "#0066cc" },
                  border: { token: "scale-blue-200", hex: "#bfdbfe" },
                },
              ],
            },
            {
              id: "success",
              label: "Success",
              rows: [
                {
                  variant: "Surface",
                  bg:     { token: "bg-success-subtle",  hex: "#ecfdf5" },
                  text:   { token: "text-success",    hex: "#1f7a4c" },
                  border: { token: "scale-green-200", hex: "#a7f3d0" },
                },
              ],
            },
            {
              id: "warning",
              label: "Warning",
              rows: [
                {
                  variant: "Surface",
                  bg:     { token: "bg-warning-subtle",  hex: "#fffbeb" },
                  text:   { token: "text-warning",     hex: "#92400e" },
                  border: { token: "scale-yellow-200", hex: "#fde68a" },
                },
              ],
            },
            {
              id: "error",
              label: "Error",
              rows: [
                {
                  variant: "Surface",
                  bg:     { token: "bg-error-subtle",  hex: "#fef2f2" },
                  text:   { token: "text-error",    hex: "#b0291e" },
                  border: { token: "scale-red-200", hex: "#fecaca" },
                },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

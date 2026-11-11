"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import { Inbox } from "lucide-react";
import {
  SpecSectionTitle,
  SpecLede,
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────



// ── EmptyStateSpecs ───────────────────────────────────────────────────────

export function EmptyStateSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Configurable parts of an Empty State. Icon and title are required; everything else opts in.
        </SpecLede>
        <PropsFromCode slug="empty-state" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          A centred vertical stack: icon badge, title, description, then actions. Padding scales by size, not tone.
        </SpecLede>

        <SpacingDiagram width={320} height={220} padX={24} padY={32} radius={12}>
          <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 py-8 rounded-xl border border-snt-neutral-divider-10 bg-snt-surface-app">
            <div className="w-14 h-14 rounded-full bg-snt-neutral-grey-100 text-snt-text-secondary flex items-center justify-center mb-4">
              <Inbox size={24} />
            </div>
            <div className="text-[15px] font-semibold text-snt-text-primary">No scans yet</div>
            <p className="mt-1.5 text-[12px] text-snt-text-secondary">Run your first crawler.</p>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["sm", "md"]}
            rows={[
              { label: "Recommended width",   values: ["320px", "480px"], note: "Caps content width." },
              { label: "Outer padding · X",   values: ["24px",  "24px"] },
              { label: "Outer padding · Y",   values: ["32px",  "48px"], note: "Md adds breathing room." },
              { label: "Icon badge size",     values: ["40px",  "56px"], note: "Circular." },
              { label: "Icon glyph size",     values: ["20px",  "24px"], note: "Lucide stroke 2px." },
              { label: "Icon → title gap",    values: ["16px",  "16px"] },
              { label: "Title → desc gap",    values: ["4px",   "8px"] },
              { label: "Desc → actions gap",  values: ["20px",  "20px"] },
              { label: "Action button height",values: ["32px",  "32px"] },
              { label: "Action gap (primary/secondary)", values: ["8px", "8px"] },
              { label: "Title font size",     values: ["14px",  "16px"], note: "Geist Semibold." },
              { label: "Description font size", values: ["12px",  "14px"], note: "Max-width ≈ 384px." },
              { label: "Border radius (container)", values: ["8px", "12px"], note: "When wrapping a card surface." },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Tone changes only the icon badge — text and buttons remain consistent across tones.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "icon",
              label: "Icon badge",
              rows: [
                { variant: "Neutral", bg: { token: "bg-subtle",  hex: "#f7f8f8" }, text: { token: "text-secondary",    hex: "#4d5862" } },
                { variant: "Warning", bg: { token: "bg-warning-subtle",   hex: "#fdf8e8" }, text: { token: "scale-yellow-600",  hex: "#8a6212" } },
                { variant: "Alert",   bg: { token: "bg-error-subtle",      hex: "#fcf3f2" }, text: { token: "text-error",     hex: "#ae2700" } },
              ],
            },
            {
              id: "text",
              label: "Text",
              rows: [
                { variant: "Title",       text: { token: "text-primary",   hex: "#121f28" } },
                { variant: "Description", text: { token: "text-secondary", hex: "#4d5862" } },
              ],
            },
            {
              id: "actions",
              label: "Actions",
              rows: [
                { variant: "Primary",   bg: { token: "brand-primary-500",  hex: "#0066cc" }, text: { token: "text-white" }, hover: { token: "brand-primary-600", hex: "#0254a3" } },
                { variant: "Secondary", bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "border-default", hex: "#e0e3e5" }, hover: { token: "bg-subtle", hex: "#f7f8f8" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

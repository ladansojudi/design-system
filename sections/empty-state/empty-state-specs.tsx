"use client";

import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SpecSectionTitle,
  SpecLede,
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  OptionPill,
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────

function ToneSwatch({ tone }: { tone: "neutral" | "warning" | "alert" }) {
  const cls = {
    neutral: "bg-s4e-neutral-grey-100  text-s4e-text-secondary",
    warning: "bg-s4e-scale-yellow-50    text-s4e-scale-yellow-600",
    alert:   "bg-s4e-scale-red-50       text-s4e-scale-red-600",
  }[tone];
  return <span className={cn("inline-block w-3 h-3 rounded-full", cls)} aria-hidden />;
}

function SizeSwatch({ size }: { size: "sm" | "md" }) {
  const px = { sm: 10, md: 14 }[size];
  return (
    <span className="inline-flex items-center justify-center w-5" aria-hidden>
      <span className="rounded-full bg-s4e-neutral-grey-300" style={{ width: px, height: px }} />
    </span>
  );
}

// ── EmptyStateSpecs ───────────────────────────────────────────────────────

export function EmptyStateSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Configurable parts of an Empty State. Icon and title are required; everything else opts in.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "tone",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<ToneSwatch tone="neutral" />} label="neutral" />
                  <OptionPill swatch={<ToneSwatch tone="warning" />} label="warning" />
                  <OptionPill swatch={<ToneSwatch tone="alert"   />} label="alert" />
                </div>
              ),
              default:     "neutral",
              description: "Sets the icon badge color — neutral for zero-data, warning for permissions, alert for errors.",
            },
            {
              name:    "size",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap items-end gap-1.5">
                  <OptionPill swatch={<SizeSwatch size="sm" />} label="sm" />
                  <OptionPill swatch={<SizeSwatch size="md" />} label="md" />
                </div>
              ),
              default:     "md",
              description: "Small is inline (inside cards); medium is full-page.",
            },
            {
              name:    "icon",
              type:    "Icon",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">Lucide</span>,
              default: "—",
              description: "Required glyph rendered inside the circular badge.",
            },
            {
              name:    "title",
              type:    "string",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">e.g. &quot;No scans yet&quot;</span>,
              default: "—",
              description: "Short headline that names what is missing — be specific.",
            },
            {
              name:    "description",
              type:    "string",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">single line</span>,
              default: "—",
              description: "One-sentence explanation of why the view is empty and what to do next.",
            },
            {
              name:    "primaryAction",
              type:    "{ label, icon? }",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">brand button</span>,
              default: "—",
              description: "Filled brand button — main forward path (start scan, retry).",
            },
            {
              name:    "secondaryAction",
              type:    "{ label, icon? }",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">outline button</span>,
              default: "—",
              description: "Outline button for an alternate path — clear filters, read docs.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          A centred vertical stack: icon badge, title, description, then actions. Padding scales by size, not tone.
        </SpecLede>

        <SpacingDiagram width={320} height={220} padX={24} padY={32} radius={12}>
          <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 py-8 rounded-xl border border-s4e-neutral-divider-10 bg-s4e-surface-app">
            <div className="w-14 h-14 rounded-full bg-s4e-neutral-grey-100 text-s4e-text-secondary flex items-center justify-center mb-4">
              <Inbox size={24} />
            </div>
            <div className="text-[15px] font-semibold text-s4e-text-primary">No scans yet</div>
            <p className="mt-1.5 text-[12px] text-s4e-text-secondary">Run your first crawler.</p>
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
              { label: "Title font size",     values: ["14px",  "16px"], note: "Inter Semibold." },
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
                { variant: "Neutral", bg: { token: "neutral-grey-100",  hex: "#f7f8f8" }, text: { token: "text-secondary",    hex: "#4d5862" } },
                { variant: "Warning", bg: { token: "scale-yellow-50",   hex: "#fdf8e8" }, text: { token: "scale-yellow-600",  hex: "#8a6212" } },
                { variant: "Alert",   bg: { token: "scale-red-50",      hex: "#fcf3f2" }, text: { token: "scale-red-600",     hex: "#ae2700" } },
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
                { variant: "Primary",   bg: { token: "brand-primary-500",  hex: "#0066cc" }, text: { token: "text-on-accent", hex: "#ffffff" }, hover: { token: "brand-primary-600", hex: "#0254a3" } },
                { variant: "Secondary", bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" }, hover: { token: "neutral-grey-100", hex: "#f7f8f8" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

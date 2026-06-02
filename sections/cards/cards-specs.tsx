"use client";

import { ArrowRight } from "lucide-react";
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

function KindSwatch({ kind }: { kind: "insight" | "alert" }) {
  if (kind === "insight") {
    return (
      <span className="inline-flex flex-col gap-0.5 w-4" aria-hidden>
        <span className="block h-1 rounded-[1px] bg-s4e-text-primary" />
        <span className="block h-px bg-s4e-neutral-divider-10" />
        <span className="block h-px bg-s4e-neutral-divider-10" />
      </span>
    );
  }
  return (
    <span className="inline-flex flex-col w-4 rounded-[2px] overflow-hidden border border-s4e-neutral-divider-10" aria-hidden>
      <span className="block h-1 bg-s4e-neutral-grey-200" />
      <span className="block h-1 bg-s4e-surface-app" />
    </span>
  );
}

function ToneSwatch({ tone }: { tone: "neutral" | "alert" }) {
  const cls = {
    neutral: "bg-s4e-neutral-grey-200",
    alert:   "bg-s4e-scale-red-500",
  }[tone];
  return <span className={cn("inline-block w-2.5 h-2.5 rounded-full", cls)} aria-hidden />;
}

// ── CardsSpecs ────────────────────────────────────────────────────────────

export function CardsSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Designer-facing props for Insight Card and Alert Card. Stat Card has its own page and is documented separately.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "kind",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<KindSwatch kind="insight" />} label="insight" />
                  <OptionPill swatch={<KindSwatch kind="alert"   />} label="alert" />
                </div>
              ),
              default:     "insight",
              description: "Insight surfaces metric rows + view-details link; alert leads with a coloured header and a CTA.",
            },
            {
              name:    "title",
              type:    "string",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">e.g. &quot;Live Risk Score&quot;</span>,
              default: "—",
              description: "Card header text — short label that names the dataset or alert category.",
            },
            {
              name:    "rows",
              type:    "{ label, value }[]",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">insight only · ≤5</span>,
              default: "—",
              description: "Label/value pairs rendered with hairline dividers between rows.",
            },
            {
              name:    "activeCount",
              type:    "number",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">alert only</span>,
              default: "—",
              description: "Number shown in the red header pill alongside the pulse dot.",
            },
            {
              name:    "tone",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<ToneSwatch tone="neutral" />} label="neutral" />
                  <OptionPill swatch={<ToneSwatch tone="alert"   />} label="alert" />
                </div>
              ),
              default:     "alert",
              description: "Header chip color. Alert tone enables the animated pulse dot.",
            },
            {
              name:    "action",
              type:    "string",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">e.g. &quot;Review Assets&quot;</span>,
              default: "—",
              description: "Text-style link with arrow rendered at the bottom of the card body.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Cards share a 12px corner radius and a 320px recommended width. Insight has a single body block; Alert separates header and body with a hairline.
        </SpecLede>

        <SpacingDiagram width={320} height={160} padX={16} padY={16} radius={12}>
          <div className="w-full h-full rounded-xl overflow-hidden border border-s4e-neutral-divider-10 bg-s4e-surface-app flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-s4e-neutral-grey-100 border-b border-s4e-neutral-divider-10">
              <span className="text-[12px] font-semibold text-s4e-text-primary">Attention Needed</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-s4e-scale-red-50 text-[11px] font-semibold text-s4e-scale-red-600">
                <span className="w-[6px] h-[6px] rounded-full bg-s4e-scale-red-500" />
                2 Active
              </span>
            </div>
            <div className="px-4 py-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[13px] font-semibold text-s4e-text-primary">Security Blind Spots</div>
                <p className="text-[12px] text-s4e-text-disabled leading-relaxed">20 assets excluded from scans.</p>
              </div>
              <button type="button" className="flex items-center gap-1 text-[12px] font-medium text-s4e-brand-primary-500">
                Review Assets
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["insight", "alert"]}
            rows={[
              { label: "Recommended width",     values: ["320px", "320px"], note: "Stretches in a grid; min 280px." },
              { label: "Border radius",         values: ["12px",  "12px"] },
              { label: "Border width",          values: ["1px",   "1px"] },
              { label: "Outer padding · X",     values: ["20px",  "—"],    note: "Alert uses inner blocks." },
              { label: "Outer padding · Y",     values: ["20px",  "—"] },
              { label: "Header padding · X",    values: ["—",     "16px"], note: "Alert grey strip." },
              { label: "Header padding · Y",    values: ["—",     "8px"] },
              { label: "Body padding · X",      values: ["—",     "16px"] },
              { label: "Body padding · Y",      values: ["—",     "16px"] },
              { label: "Title font size",       values: ["14px",  "12px"], note: "Alert header chip is 11px." },
              { label: "Row · row divider",     values: ["1px",   "—"],   note: "Hairline between metric rows." },
              { label: "Row padding · Y",       values: ["12px",  "—"] },
              { label: "Label font size",       values: ["12px",  "12px"] },
              { label: "Value font size",       values: ["13px",  "13px"] },
              { label: "Action gap · text/icon", values: ["4px",   "4px"] },
              { label: "Pulse dot size",        values: ["—",     "8px"],   note: "Animated; alert tone only." },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Card surfaces stay white; the alert variant draws attention through a grey-100 header strip and a red pulse pill.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "shared",
              label: "Shared",
              rows: [
                { variant: "Surface",  bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-primary",       hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" } },
                { variant: "Row divider", text: { token: "text-disabled",      hex: "#8a9199" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" } },
              ],
            },
            {
              id: "insight",
              label: "Insight",
              rows: [
                { variant: "Title",        text: { token: "text-primary",      hex: "#121f28" } },
                { variant: "Row label",    text: { token: "text-secondary",    hex: "#4d5862" } },
                { variant: "Row value",    text: { token: "text-primary",      hex: "#121f28" } },
                { variant: "View details", text: { token: "brand-primary-500", hex: "#0066cc" }, hover: { token: "brand-primary-600", hex: "#0254a3" } },
              ],
            },
            {
              id: "alert",
              label: "Alert",
              rows: [
                { variant: "Header strip",   bg: { token: "neutral-grey-100",   hex: "#f7f8f8" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e0e3e5" } },
                { variant: "Pulse pill",     bg: { token: "scale-red-50",       hex: "#fcf3f2" }, text: { token: "scale-red-600",  hex: "#ae2700" } },
                { variant: "Pulse dot",      bg: { token: "scale-red-500",      hex: "#d93d2d" }, text: { token: "text-on-accent", hex: "#ffffff" } },
                { variant: "Alert title",    text: { token: "text-primary",      hex: "#121f28" } },
                { variant: "Alert badge",    bg: { token: "neutral-grey-100",   hex: "#f7f8f8" }, text: { token: "text-secondary", hex: "#4d5862" } },
                { variant: "Description",    text: { token: "text-disabled",     hex: "#8a9199" } },
                { variant: "Action link",    text: { token: "brand-primary-500", hex: "#0066cc" }, hover: { token: "brand-primary-600", hex: "#0254a3" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

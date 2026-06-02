"use client";

import { cn } from "@/lib/utils";
import {
  SpecSectionTitle,
  SpecLede,
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  OptionPill,
} from "@/components/styleguide/specs";

// ── Visual swatches ───────────────────────────────────────────────────────

function TypeSwatch({ type }: { type: "link" | "current" }) {
  return (
    <span
      className={cn(
        "inline-block w-4 h-2 rounded-[2px]",
        type === "link" ? "bg-s4e-text-primary" : "bg-s4e-text-disabled",
      )}
      aria-hidden
    />
  );
}

function StateSwatch({ state }: { state: "default" | "hover" | "visited" }) {
  const cls = {
    default: "bg-s4e-text-primary",
    hover:   "bg-s4e-brand-primary-500",
    visited: "bg-s4e-text-disabled",
  }[state];
  return <span className={cn("inline-block w-4 h-2 rounded-[2px]", cls)} aria-hidden />;
}

// ── BreadcrumbSpecs ───────────────────────────────────────────────────────

export function BreadcrumbSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Per-item properties. A Breadcrumb is an ordered list of items — typically links plus one final &quot;current&quot; item.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "type",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<TypeSwatch type="link"    />} label="link" />
                  <OptionPill swatch={<TypeSwatch type="current" />} label="current" />
                </div>
              ),
              default:     "link",
              description: "Links navigate to ancestor pages; current is the non-interactive final segment.",
            },
            {
              name:    "label",
              type:    "string",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">e.g. &quot;Asset Manager&quot;</span>,
              default: "—",
              description: "Segment text. Truncate with ellipsis if longer than the container allows.",
            },
            {
              name:    "state",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<StateSwatch state="default" />} label="default" />
                  <OptionPill swatch={<StateSwatch state="hover"   />} label="hover" />
                  <OptionPill swatch={<StateSwatch state="visited" />} label="visited" />
                </div>
              ),
              default:     "default",
              description: "Link interaction state. Hover adds an underline; visited mutes the text.",
            },
            {
              name:    "separator",
              type:    "string",
              values:  <span className="font-mono text-[11px] text-s4e-text-secondary">•</span>,
              default: "•",
              description: "Divider between items. Inherits muted text color and is non-selectable.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Breadcrumb is text-only — there is no fixed padding. Rhythm is set by the gap between items and the line-height of the text.
        </SpecLede>

        <DimensionsTable
          columns={["value"]}
          rows={[
            { label: "Line height",          values: ["20px"], note: "Sets effective row height." },
            { label: "Font size · link",     values: ["13px"], note: "Inter Medium (500)." },
            { label: "Font size · current",  values: ["13px"], note: "Inter Regular (400)." },
            { label: "Font size · separator",values: ["12px"], note: "Slightly smaller for visual balance." },
            { label: "Item · separator gap", values: ["8px"],  note: "Horizontal flex gap on both sides of the separator." },
            { label: "Hover underline offset", values: ["2px"] },
            { label: "Hover underline thickness", values: ["1px"] },
            { label: "Truncation max width", values: ["240px"], note: "Recommended; show full name in tooltip." },
          ]}
        />
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Breadcrumb relies entirely on text color — no backgrounds or borders.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "link",
              label: "Link",
              rows: [
                { variant: "Default", text: { token: "text-primary",       hex: "#121f28" }, hover: { token: "brand-primary-500", hex: "#0066cc" } },
                { variant: "Hover",   text: { token: "brand-primary-500",  hex: "#0066cc" }, border: { token: "brand-primary-500", hex: "#0066cc" } },
                { variant: "Visited", text: { token: "text-disabled",      hex: "#8a9199" } },
              ],
            },
            {
              id: "static",
              label: "Static",
              rows: [
                { variant: "Current",   text: { token: "text-disabled", hex: "#8a9199" } },
                { variant: "Separator", text: { token: "text-disabled", hex: "#8a9199" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

"use client";

import type React from "react";
import {
  BoolSwatch,
  ColorTokenTabs,
  DimensionsTable,
  OptionPill,
  PropertiesTable,
} from "@/components/styleguide/specs";

// Specs tab content (h2 sections, directly under the page h1). Values here
// mirror components/ui/button.tsx. Colours are token names only:
// the table reads each hex from the live CSS variable.

function SectionTitle({ children, lede }: { children: React.ReactNode; lede?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <span aria-hidden className="hidden">▶▶</span>
        <h2 className="text-snt-20 font-semibold tracking-tight text-snt-text-primary">{children}</h2>
      </div>
      {lede && <p className="mt-1 max-w-2xl text-snt-14 leading-relaxed text-snt-text-secondary">{lede}</p>}
    </div>
  );
}

function Swatch({ token, outline }: { token: string; outline?: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-block h-3 w-3 rounded-[3px]"
      style={outline ? { boxShadow: `inset 0 0 0 1px var(--snt-${token})` } : { backgroundColor: `var(--snt-${token})` }}
    />
  );
}

const bool = (
  <div className="flex items-center gap-1.5">
    <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
    <OptionPill swatch={<BoolSwatch on />} label="true" />
  </div>
);

export function ButtonSpecs() {
  return (
    <div className="space-y-14">
      <section>
        <SectionTitle lede="The same names are used for the Figma component properties and the React props.">
          Properties
        </SectionTitle>
        <PropertiesTable
          rows={[
            {
              name: "intent",
              type: "enum",
              values: (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<Swatch token="btn-primary-600" />} label="primary" />
                  <OptionPill swatch={<Swatch token="text-primary" />} label="neutral" />
                  <OptionPill swatch={<Swatch token="btn-error-600" />} label="destructive" />
                </div>
              ),
              default: "primary",
              description: "What the action means. Destructive is only for actions that can't be undone.",
            },
            {
              name: "variant",
              type: "enum",
              values: (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<Swatch token="text-primary" />} label="solid" />
                  <OptionPill swatch={<Swatch token="text-primary" outline />} label="outline" />
                  <OptionPill swatch={<Swatch token="border-default" outline />} label="ghost" />
                </div>
              ),
              default: "solid",
              description: "How much attention it gets. One solid button per area.",
            },
            {
              name: "size",
              type: "enum",
              values: (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill label="sm · 32" />
                  <OptionPill label="md · 36" />
                  <OptionPill label="lg · 44" />
                </div>
              ),
              default: "md",
              description: "Height in px. Match the inputs next to it.",
            },
            { name: "iconOnly", type: "boolean", values: bool, default: "false", description: "Square button with just an icon. Needs an accessible label." },
            { name: "loading",  type: "boolean", values: bool, default: "false", description: "Spinner over the label. The width stays the same and the button can't be pressed again." },
            { name: "disabled", type: "boolean", values: bool, default: "false", description: "40% opacity, not focusable. Prefer an enabled button plus a message." },
          ]}
        />
      </section>

      <section>
        <SectionTitle lede="Exact values for each size. Width follows the label.">Sizing &amp; spacing</SectionTitle>
        <DimensionsTable
          columns={["sm", "md", "lg"]}
          rows={[
            { label: "Height",            values: ["32px", "36px", "44px"] },
            { label: "Padding (left, right)", values: ["12px", "16px", "20px"] },
            { label: "Icon size",         values: ["14px", "14px", "16px"] },
            { label: "Icon to label gap", values: ["4px",  "8px",  "8px"] },
            { label: "Icon-only size",    values: ["32 × 32", "36 × 36", "44 × 44"], note: "Icon 14 / 16 / 20px" },
            { label: "Label",             values: ["14 / 500", "14 / 500", "14 / 500"], note: "Geist, size / weight" },
            { label: "Corner radius",     values: ["8px", "8px", "8px"] },
            { label: "Shadow",            values: ["raised", "raised", "raised"], note: "Solid: shadow-snt-raised · Outline: shadow-snt-control" },
            { label: "Focus ring",        values: ["2px", "2px", "2px"], note: "2px gap from the button" },
          ]}
        />
      </section>

      <section>
        <SectionTitle lede="Token names as used in code and Figma. Values follow the current theme.">Color tokens</SectionTitle>
        <ColorTokenTabs
          groups={[
            {
              id: "primary",
              label: "Primary",
              rows: [
                { variant: "Solid",   bg: { token: "btn-primary-600" }, text: { token: "text-on-accent" }, hover: { token: "btn-primary-700" } },
                { variant: "Outline", bg: { token: "surface-app" }, text: { token: "text-link" }, border: { token: "text-link" }, hover: { token: "bg-brand-subtle" } },
                { variant: "Ghost",   text: { token: "text-link" }, hover: { token: "bg-brand-subtle" } },
              ],
            },
            {
              id: "neutral",
              label: "Neutral",
              rows: [
                { variant: "Solid",   bg: { token: "text-primary" }, text: { token: "text-inverse" }, hover: { token: "neutral-grey-800" } },
                { variant: "Outline", bg: { token: "surface-app" }, text: { token: "text-primary" }, border: { token: "border-strong" }, hover: { token: "bg-subtle" } },
                { variant: "Ghost",   text: { token: "text-primary" }, hover: { token: "bg-subtle" } },
              ],
            },
            {
              id: "destructive",
              label: "Destructive",
              rows: [
                { variant: "Solid",   bg: { token: "btn-error-600" }, text: { token: "text-on-accent" }, hover: { token: "btn-error-700" } },
                { variant: "Outline", bg: { token: "surface-app" }, text: { token: "text-error" }, border: { token: "text-error" }, hover: { token: "bg-error-subtle" } },
                { variant: "Ghost",   text: { token: "text-error" }, hover: { token: "bg-error-subtle" } },
              ],
            },
          ]}
        />
        <p className="mt-3 text-snt-12 text-snt-text-secondary">
          Focus ring: <code className="font-mono">focus-ring</code> on Primary and Neutral,{" "}
          <code className="font-mono">focus-ring-error</code> on Destructive.
        </p>
      </section>
    </div>
  );
}

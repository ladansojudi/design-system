"use client";

import {
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  OptionPill,
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── TextSpaceSpecs ────────────────────────────────────────────────────────

export function TextSpaceSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Every prop a designer can configure when placing this component. Use these names in Figma component properties for a 1:1 map with code.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:   "toolbar",
              type:   "enum",
              values: (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill label="simple" />
                  <OptionPill label="full" />
                </div>
              ),
              default:     "simple",
              description: "Toolbar density — Simple is one row of formatting; Full adds type, size and style selectors.",
            },
            {
              name:   "state",
              type:   "enum",
              values: (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill label="enabled" />
                  <OptionPill label="disabled" />
                  <OptionPill label="error" />
                </div>
              ),
              default:     "enabled",
              description: "Interaction state — controls border color, text color and pointer events.",
            },
            {
              name:        "placeholder",
              type:        "string",
              values:      <span className="font-mono text-[11px] text-s4e-text-disabled">&ldquo;Write something awesome…&rdquo;</span>,
              default:     "—",
              description: "Muted prompt shown when the editor is empty.",
            },
            {
              name:        "value",
              type:        "string",
              default:     "—",
              description: "Rich-text HTML content of the editor.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Exact measurements for the Text Space container and its toolbar / editor stack. Recreate this component in any tool using only these values.
        </SpecLede>

        <SpacingDiagram width={320} height={160} padX={16} padY={12} radius={8}>
          <div className="w-full h-full rounded-lg border border-s4e-neutral-divider-10 bg-s4e-surface-app overflow-hidden flex flex-col">
            <div className="flex items-center gap-1.5 px-3 h-10 border-b border-s4e-neutral-divider-10 shrink-0">
              <span className="w-3 h-3 rounded-[2px] bg-s4e-neutral-grey-300" />
              <span className="w-3 h-3 rounded-[2px] bg-s4e-neutral-grey-300" />
              <span className="w-3 h-3 rounded-[2px] bg-s4e-neutral-grey-300" />
              <span className="w-px h-3 bg-s4e-neutral-divider-10 mx-1" />
              <span className="w-3 h-3 rounded-[2px] bg-s4e-neutral-grey-300" />
              <span className="w-3 h-3 rounded-[2px] bg-s4e-neutral-grey-300" />
            </div>
            <div className="flex-1 px-4 py-3 text-[12px] text-s4e-text-disabled">
              Write something awesome…
            </div>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["simple", "full"]}
            rows={[
              { label: "Container · min height",  values: ["240px", "240px"], note: "Editor area grows with content." },
              { label: "Container · border radius", values: ["8px", "8px"] },
              { label: "Container · border width",  values: ["1px", "1px"] },
              { label: "Toolbar · height",         values: ["40px", "48px"], note: "Full adds type / size dropdowns." },
              { label: "Toolbar · padding X",      values: ["12px", "12px"] },
              { label: "Toolbar · padding Y",      values: ["8px",  "8px"] },
              { label: "Toolbar · item gap",       values: ["4px",  "4px"] },
              { label: "Toolbar · icon size",      values: ["12px", "12px"], note: "Lucide stroke 1.5px." },
              { label: "Toolbar · separator",      values: ["1px × 16px", "1px × 16px"], note: "Vertical divider between groups." },
              { label: "Editor · padding X",       values: ["16px", "16px"] },
              { label: "Editor · padding Y",       values: ["12px", "12px"] },
              { label: "Editor · font size",       values: ["12px", "12px"] },
              { label: "Editor · line height",     values: ["20px", "20px"] },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Token, hex value, and the role each color plays. Reach for the named token whenever possible — the hex is only a fallback for tools that can&apos;t reference CSS variables.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "container",
              label: "Container",
              rows: [
                { variant: "Enabled",  bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-primary",  hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Disabled", bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-disabled", hex: "#8a9199" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" }, hover: { token: "—",                hex: "#ffffff" } },
                { variant: "Error",    bg: { token: "scale-red-50",       hex: "#fcf3f2" }, text: { token: "text-error",    hex: "#b0291e" }, border: { token: "text-error",         hex: "#b0291e" } },
                { variant: "Focus",    bg: { token: "surface-app",        hex: "#ffffff" }, text: { token: "text-primary",  hex: "#121f28" }, border: { token: "brand-primary-500",  hex: "#0066cc" } },
              ],
            },
            {
              id: "toolbar",
              label: "Toolbar",
              rows: [
                { variant: "Icon · idle",  text: { token: "text-secondary",     hex: "#4f5b66" }, hover: { token: "neutral-grey-100",  hex: "#f7f8f8" } },
                { variant: "Icon · active",bg:   { token: "neutral-grey-100",   hex: "#f7f8f8" }, text: { token: "text-primary",       hex: "#121f28" } },
                { variant: "Separator",    text: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Label",        text: { token: "text-secondary",     hex: "#4f5b66" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

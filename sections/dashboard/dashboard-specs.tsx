"use client";

import {
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  OptionPill,
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

export function DashboardSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Dashboard is a layout pattern — these props describe the slots it composes (sidebar, top bar, page header, tab navigation, grid). Use them in Figma as component slots.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:        "sidebar",
              type:        "Slot",
              default:     "—",
              description: "Persistent left navigation (logo, nav items, footer).",
            },
            {
              name:        "topbar",
              type:        "Slot",
              default:     "—",
              description: "Top bar above the main column (search, profile, notifications).",
            },
            {
              name:        "title",
              type:        "string",
              default:     "—",
              description: "Page title shown in the page header — 22px Bold.",
            },
            {
              name:        "actions",
              type:        "Slot[]",
              default:     "[]",
              description: "Right-aligned buttons next to the title (CTA, secondary actions).",
            },
            {
              name:    "tabs",
              type:    "Tab[]",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill label="overview" />
                  <OptionPill label="details" />
                  <OptionPill label="compliance" />
                </div>
              ),
              default:     "—",
              description: "Page-level tabs under the header. Each tab swaps the grid content.",
            },
            {
              name:    "density",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill label="comfortable" />
                  <OptionPill label="compact" />
                </div>
              ),
              default:     "comfortable",
              description: "Grid spacing — comfortable for executive views, compact for ops dashboards.",
            },
            {
              name:        "children",
              type:        "Slot",
              default:     "—",
              description: "Active tab content — the dashboard grid of widgets.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Layout metrics for the dashboard grid and its surrounding chrome. The pattern is a 12-column grid that collapses on narrower viewports.
        </SpecLede>

        <div className="space-y-6">
          <DimensionsTable
            columns={["value"]}
            rows={[
              { label: "Container · max width",     values: ["1280px"], note: "Centered above this width." },
              { label: "Container · padding X",     values: ["24px"],   note: "Tablet; 32px at lg breakpoint." },
              { label: "Container · padding Y",     values: ["24px"] },
              { label: "Sidebar · width",           values: ["240px"],  note: "Collapses to 64px icons on lg-." },
              { label: "Top bar · height",          values: ["56px"] },
              { label: "Page header · padding X",   values: ["28px"] },
              { label: "Page header · padding top", values: ["24px"] },
              { label: "Page header · title size",  values: ["20px"], note: "Bold 700." },
              { label: "Page header · action gap",  values: ["8px"] },
              { label: "Tabs · gap",                values: ["24px"], note: "Between tab labels." },
              { label: "Tabs · padding bottom",     values: ["12px"] },
              { label: "Tabs · underline height",   values: ["2px"] },
              { label: "Tab content · padding Y",   values: ["24px"] },
            ]}
          />

          <DimensionsTable
            columns={["value"]}
            rows={[
              { label: "Grid · columns",            values: ["12"],   note: "Standard 12-col grid." },
              { label: "Grid · column gap",         values: ["24px"] },
              { label: "Grid · row gap",            values: ["24px"] },
              { label: "Widget card · radius",      values: ["12px"] },
              { label: "Widget card · border",      values: ["1px"] },
              { label: "Widget card · padding",     values: ["20px"], note: "Inside chart / table bodies." },
              { label: "Section gap",               values: ["32px"], note: "Between major dashboard sections." },
              { label: "Stat strip · row height",   values: ["96px"], note: "Top KPI cards." },
              { label: "Mobile breakpoint",         values: ["768px"],note: "Stacks columns single-file below." },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          The dashboard frame uses two surfaces — a soft page background and a white card surface — so the grid reads as floating tiles.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "frame",
              label: "Frame",
              rows: [
                { variant: "Page background", bg: { token: "surface-page",        hex: "#f4f6f8" }, text: { token: "text-primary",   hex: "#121f28" } },
                { variant: "Card surface",    bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Sidebar",         bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Top bar",         bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Divider",         bg: { token: "neutral-divider-10",  hex: "#e6e8e8" }, text: { token: "—",              hex: "#e6e8e8" } },
              ],
            },
            {
              id: "header",
              label: "Page header",
              rows: [
                { variant: "Title",      text: { token: "text-primary",      hex: "#121f28" } },
                { variant: "Subtitle",   text: { token: "text-disabled",     hex: "#8a9199" } },
                { variant: "Primary CTA",bg: { token: "btn-primary-600",     hex: "#0f69aa" }, text: { token: "text-on-accent", hex: "#ffffff" }, hover: { token: "btn-primary-700", hex: "#024a72" } },
                { variant: "Secondary",  bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" }, hover: { token: "neutral-grey-100", hex: "#f7f8f8" } },
                { variant: "Action tag", text: { token: "brand-primary-500", hex: "#0066cc" } },
                { variant: "Meta tag",   text: { token: "text-disabled",     hex: "#8a9199" } },
              ],
            },
            {
              id: "tabs",
              label: "Tabs",
              rows: [
                { variant: "Active label",   text: { token: "text-primary",   hex: "#121f28" }, border: { token: "text-primary", hex: "#121f28" } },
                { variant: "Inactive label", text: { token: "text-secondary", hex: "#4f5b66" }, hover: { token: "text-primary",  hex: "#121f28" } },
                { variant: "Underline",      bg: { token: "text-primary",     hex: "#121f28" }, text: { token: "—",              hex: "#121f28" } },
                { variant: "Track divider",  bg: { token: "neutral-divider-10", hex: "#e6e8e8" }, text: { token: "—",            hex: "#e6e8e8" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

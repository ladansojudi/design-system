"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import { CircleCheck } from "lucide-react";
import {
  
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  
  
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Swatches ──────────────────────────────────────────────────────────────



// ── Spec section ──────────────────────────────────────────────────────────

export function ToastTooltipSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Designer-facing props for Toast and Tooltip. Toast carries semantic meaning through its
          type; Tooltip is a neutral overlay anchored to one of four sides.
        </SpecLede>
        <PropsFromCode slug="toast-tooltip" />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Toast is a 320×56 card with a 4px timer bar; Tooltip is a 240-wide bubble with an 8px
          arrow that anchors to the trigger.
        </SpecLede>

        <SpacingDiagram width={320} height={56} padX={16} padY={12} radius={8}>
          <div
            className="absolute inset-0 bg-snt-surface-app border border-snt-neutral-divider-10 shadow-sm overflow-hidden flex flex-col"
            style={{ borderRadius: 8 * 1.8 }}
          >
            <div className="flex-1 flex items-center gap-3 px-4">
              <CircleCheck size={20} className="text-snt-feedback-success shrink-0" />
              <span className="flex-1 text-[12px] font-semibold text-snt-text-primary">Toast message</span>
            </div>
            <div className="h-[3px] bg-snt-neutral-grey-100">
              <div className="h-full w-1/3 bg-snt-feedback-success" />
            </div>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["Toast", "Tooltip"]}
            rows={[
              { label: "Width",              values: ["320px",     "≤240px"], note: "Tooltip is content-sized up to max." },
              { label: "Height",             values: ["auto (50px with title + text)", "auto"],   note: "Both grow with content." },
              { label: "Padding · horizontal", values: ["16px",    "12px"] },
              { label: "Padding · vertical",   values: ["12px",    "8px"] },
              { label: "Border radius",      values: ["8px",       "8px"] },
              { label: "Border width",       values: ["1px",       "0"],     note: "Tooltip is solid fill, no border." },
              { label: "Icon size",          values: ["20px",      "—"] },
              { label: "Icon · text gap",    values: ["12px",      "—"] },
              { label: "Font size",          values: ["14px",      "12px"] },
              { label: "Font weight",        values: ["600",       "400"],   note: "Toast title bold; tooltip body regular." },
              { label: "Timer bar height",   values: ["4px",       "—"],     note: "Bottom progress bar." },
              { label: "Arrow size",         values: ["—",         "8px"],   note: "Triangle pointing at trigger." },
              { label: "Trigger offset",     values: ["—",         "8px"],   note: "Gap between trigger and bubble." },
              { label: "Stack gap (toasts)", values: ["8px",       "—"],     note: "Spacing between stacked toasts." },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          Toast uses a white surface with a semantic accent bar; tooltip flips contrast with a dark
          surface and inverse text for legibility on any background.
        </SpecLede>

        <ColorTokenTabs
          groups={[
            {
              id: "toast-surface",
              label: "Toast · surface",
              rows: [
                { variant: "Container", bg: { token: "surface-app",      hex: "#ffffff" }, text: { token: "text-primary",      hex: "#121f28" }, border: { token: "border-default", hex: "#e3e5e5" } },
                { variant: "Dismiss",   text:                                                  { token: "text-secondary",     hex: "#9ca3a4" },                                                            hover: { token: "text-primary",     hex: "#121f28" } },
                { variant: "Timer rail", bg: { token: "bg-subtle", hex: "#f7f8f8" }, text: { token: "text-secondary",    hex: "#697376" } },
              ],
            },
            {
              id: "toast-semantic",
              label: "Toast · semantic accent",
              rows: [
                { variant: "Success",   bg: { token: "feedback-success",  hex: "#1ba94c" }, text: { token: "feedback-success",  hex: "#1ba94c" } },
                { variant: "Alert",     bg: { token: "feedback-warning",  hex: "#f0a132" }, text: { token: "feedback-warning",  hex: "#f0a132" } },
                { variant: "Info",      bg: { token: "feedback-info",     hex: "#0066cc" }, text: { token: "feedback-info",     hex: "#0066cc" } },
                { variant: "Warning",   bg: { token: "feedback-alert",    hex: "#d92d20" }, text: { token: "feedback-alert",    hex: "#d92d20" } },
              ],
            },
            {
              id: "tooltip",
              label: "Tooltip",
              rows: [
                { variant: "Bubble",    bg: { token: "neutral-grey-900",  hex: "#121f28" }, text: { token: "text-inverse",      hex: "#ffffff" } },
                { variant: "Arrow",     bg: { token: "neutral-grey-900",  hex: "#121f28" }, text: { token: "text-inverse",      hex: "#ffffff" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

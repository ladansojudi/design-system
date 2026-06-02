"use client";

import { CircleCheck, CircleAlert, Lightbulb, Ban } from "lucide-react";
import {
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  SpacingDiagram,
  OptionPill,
  BoolSwatch,
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Swatches ──────────────────────────────────────────────────────────────

function ToastTypeSwatch({ tone }: { tone: "success" | "alert" | "info" | "warning" }) {
  const map = {
    success: { Icon: CircleCheck, cls: "text-s4e-feedback-success" },
    alert:   { Icon: CircleAlert, cls: "text-s4e-feedback-warning" },
    info:    { Icon: Lightbulb,   cls: "text-s4e-feedback-info" },
    warning: { Icon: Ban,         cls: "text-s4e-feedback-alert" },
  }[tone];
  const Icon = map.Icon;
  return <Icon size={12} className={map.cls} aria-hidden />;
}

function PositionSwatch({ pos }: { pos: "top" | "bottom" | "left" | "right" }) {
  const dot = {
    top:    "top-0 left-1/2 -translate-x-1/2",
    bottom: "bottom-0 left-1/2 -translate-x-1/2",
    left:   "left-0 top-1/2 -translate-y-1/2",
    right:  "right-0 top-1/2 -translate-y-1/2",
  }[pos];
  return (
    <span className="relative inline-block w-3 h-3 border border-s4e-neutral-grey-400 rounded-[2px]" aria-hidden>
      <span className={`absolute w-1 h-1 rounded-full bg-s4e-text-primary ${dot}`} />
    </span>
  );
}

// ── Spec section ──────────────────────────────────────────────────────────

export function ToastTooltipSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Designer-facing props for Toast and Tooltip. Toast carries semantic meaning through its
          type; Tooltip is a neutral overlay anchored to one of four sides.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "type",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<ToastTypeSwatch tone="success" />} label="success" />
                  <OptionPill swatch={<ToastTypeSwatch tone="alert"   />} label="alert" />
                  <OptionPill swatch={<ToastTypeSwatch tone="info"    />} label="info" />
                  <OptionPill swatch={<ToastTypeSwatch tone="warning" />} label="warning" />
                </div>
              ),
              default:     "info",
              description: "Toast only — feedback intent. Drives icon and timer-bar color.",
            },
            {
              name:    "message",
              type:    "string",
              values:  <OptionPill label="single sentence" />,
              default:     "—",
              description: "Toast body. One past-tense sentence; route detail to the notification center.",
            },
            {
              name:    "duration",
              type:    "number (ms)",
              values:  <OptionPill label="4000" />,
              default:     "4000",
              description: "Toast auto-dismiss timer. Set to 0 to keep until manually closed.",
            },
            {
              name:    "dismissible",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "true",
              description: "Toast only — show the × close button.",
            },
            {
              name:    "position",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<PositionSwatch pos="top"    />} label="top" />
                  <OptionPill swatch={<PositionSwatch pos="right"  />} label="right" />
                  <OptionPill swatch={<PositionSwatch pos="bottom" />} label="bottom" />
                  <OptionPill swatch={<PositionSwatch pos="left"   />} label="left" />
                </div>
              ),
              default:     "top",
              description: "Tooltip only — side the bubble anchors to relative to the trigger.",
            },
            {
              name:    "content",
              type:    "string",
              values:  <OptionPill label="short hint" />,
              default:     "—",
              description: "Tooltip text. Keep under ~80 characters; this is a hint, not a dialog.",
            },
          ]}
        />
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
            className="absolute inset-0 bg-s4e-surface-app border border-s4e-neutral-divider-10 shadow-sm overflow-hidden flex flex-col"
            style={{ borderRadius: 8 * 1.8 }}
          >
            <div className="flex-1 flex items-center gap-3 px-4">
              <CircleCheck size={20} className="text-s4e-feedback-success shrink-0" />
              <span className="flex-1 text-[12px] font-semibold text-s4e-text-primary">Toast message</span>
            </div>
            <div className="h-[3px] bg-s4e-neutral-grey-100">
              <div className="h-full w-1/3 bg-s4e-feedback-success" />
            </div>
          </div>
        </SpacingDiagram>

        <div className="mt-6">
          <DimensionsTable
            columns={["Toast", "Tooltip"]}
            rows={[
              { label: "Width",              values: ["320px",     "≤240px"], note: "Tooltip is content-sized up to max." },
              { label: "Height",             values: ["56px",      "auto"],   note: "Tooltip grows with content." },
              { label: "Padding · horizontal", values: ["16px",    "12px"] },
              { label: "Padding · vertical",   values: ["12px",    "8px"] },
              { label: "Border radius",      values: ["8px",       "8px"] },
              { label: "Border width",       values: ["1px",       "0"],     note: "Tooltip is solid fill, no border." },
              { label: "Icon size",          values: ["20px",      "—"] },
              { label: "Icon · text gap",    values: ["12px",      "—"] },
              { label: "Font size",          values: ["13px",      "12px"] },
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
                { variant: "Container", bg: { token: "surface-app",      hex: "#ffffff" }, text: { token: "text-primary",      hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e3e5e5" } },
                { variant: "Dismiss",   text:                                                  { token: "text-disabled",     hex: "#9ca3a4" },                                                            hover: { token: "text-primary",     hex: "#121f28" } },
                { variant: "Timer rail", bg: { token: "neutral-grey-100", hex: "#f7f8f8" }, text: { token: "text-secondary",    hex: "#697376" } },
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

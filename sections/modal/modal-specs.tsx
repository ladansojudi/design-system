"use client";

import {
  PropertiesTable,
  DimensionsTable,
  ColorTokenTabs,
  OptionPill,
  BoolSwatch,
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

export function ModalSpecs() {
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
              name:    "variant",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill label="alert" />
                  <OptionPill label="confirm" />
                  <OptionPill label="onboarding" />
                  <OptionPill label="detail" />
                </div>
              ),
              default:     "alert",
              description: "Body composition — controls header presence, icon badge and footer layout.",
            },
            {
              name:    "size",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill label="sm" />
                  <OptionPill label="md" />
                  <OptionPill label="lg" />
                </div>
              ),
              default:     "sm",
              description: "Container max-width — Alert/Confirm use sm, Onboarding md, Detail lg.",
            },
            {
              name:    "destructive",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Confirm only — turns the primary button red and swaps the warning icon for danger.",
            },
            {
              name:    "open",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Visibility — controlled by the parent. Mounts and unmounts the portal.",
            },
            {
              name:        "title",
              type:        "string",
              default:     "—",
              description: "Header / body title. Required for Detail and Onboarding, optional for Alert.",
            },
            {
              name:        "onClose",
              type:        "() => void",
              default:     "—",
              description: "Fires on Esc, backdrop click and × button.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          The Modal is composed of a backdrop, container, header, body and footer — each with its own metrics. The container width varies by size; the surrounding parts stay constant.
        </SpecLede>

        <DimensionsTable
          columns={["sm", "md", "lg"]}
          rows={[
            { label: "Container · max width",      values: ["400px", "520px", "680px"], note: "Centered; full-width minus 16px gutter on mobile." },
            { label: "Container · border radius",  values: ["12px",  "12px",  "12px"] },
            { label: "Container · border width",   values: ["1px",   "1px",   "1px"] },
            { label: "Container · shadow",         values: ["lg",    "lg",    "lg"], note: "Drop shadow level lg." },
            { label: "Backdrop · color",           values: ["black 50%", "black 50%", "black 50%"] },
            { label: "Backdrop · blur",            values: ["8px",   "8px",   "8px"], note: "Backdrop-filter blur." },
            { label: "Header · padding X",         values: ["24px",  "24px",  "24px"] },
            { label: "Header · padding Y",         values: ["16px",  "16px",  "16px"] },
            { label: "Header · title size",        values: ["14px",  "14px",  "14px"], note: "Semibold 600." },
            { label: "Close button · size",        values: ["28px",  "28px",  "28px"], note: "Square hit area, 16px icon." },
            { label: "Icon badge · size",          values: ["40px",  "40px",  "40px"], note: "Round tinted badge in Alert / Confirm." },
            { label: "Icon badge · icon size",     values: ["16px",  "16px",  "16px"] },
            { label: "Body · padding X",           values: ["24px",  "24px",  "24px"] },
            { label: "Body · padding Y",           values: ["20px",  "20px",  "20px"] },
            { label: "Body · max height",          values: ["—",     "—",     "60vh"], note: "Detail variant scrolls inside body." },
            { label: "Body · text size",           values: ["14px",  "14px",  "14px"] },
            { label: "Body · line height",         values: ["20px",  "20px",  "20px"] },
            { label: "Footer · padding X",         values: ["24px",  "24px",  "24px"] },
            { label: "Footer · padding Y",         values: ["16px",  "16px",  "16px"] },
            { label: "Footer · button gap",        values: ["8px",   "8px",   "8px"] },
            { label: "Footer · top border",        values: ["—",     "—",     "1px"], note: "Detail adds divider; Alert/Confirm omit it." },
          ]}
        />
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
                { variant: "Backdrop",  bg: { token: "black-alpha-50",      hex: "#00000080" }, text: { token: "—",            hex: "#000000" } },
                { variant: "Container", bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Header",    bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" } },
                { variant: "Body",      bg: { token: "surface-app",         hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" } },
                { variant: "Body · description", text: { token: "text-disabled", hex: "#8a9199" } },
                { variant: "Close btn", text: { token: "text-disabled",     hex: "#8a9199" }, hover: { token: "neutral-grey-100", hex: "#f7f8f8" } },
              ],
            },
            {
              id: "icon",
              label: "Icon badges",
              rows: [
                { variant: "Success",     bg: { token: "scale-green-50",   hex: "#dcfce7" }, text: { token: "scale-green-600",  hex: "#16a34a" } },
                { variant: "Warning",     bg: { token: "scale-yellow-50",  hex: "#fdf6e3" }, text: { token: "scale-yellow-600", hex: "#b07700" } },
                { variant: "Destructive", bg: { token: "scale-red-50",     hex: "#fcf3f2" }, text: { token: "scale-red-600",    hex: "#a01e16" } },
              ],
            },
            {
              id: "footer",
              label: "Footer",
              rows: [
                { variant: "Primary",     bg: { token: "btn-primary-600",  hex: "#0f69aa" }, text: { token: "text-on-accent", hex: "#ffffff" }, hover: { token: "btn-primary-700", hex: "#024a72" } },
                { variant: "Destructive", bg: { token: "scale-red-600",    hex: "#a01e16" }, text: { token: "text-on-accent", hex: "#ffffff" }, hover: { token: "scale-red-700",   hex: "#7e1810" } },
                { variant: "Cancel",      bg: { token: "surface-app",      hex: "#ffffff" }, text: { token: "text-primary",   hex: "#121f28" }, border: { token: "neutral-divider-10", hex: "#e6e8e8" }, hover: { token: "neutral-grey-100", hex: "#f7f8f8" } },
                { variant: "Disabled",    bg: { token: "neutral-grey-200", hex: "#ebeded" }, text: { token: "text-disabled",  hex: "#8a9199" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

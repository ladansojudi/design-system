"use client";

import {
  PropertiesTable,
  DimensionsTable,
  ColorTokenTable,
  OptionPill,
  BoolSwatch,
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Swatches ──────────────────────────────────────────────────────────────

function ShapeSwatch({ shape }: { shape: "line" | "block" | "circle" }) {
  if (shape === "circle") {
    return <span className="inline-block w-3 h-3 rounded-full bg-s4e-neutral-grey-200" aria-hidden />;
  }
  if (shape === "block") {
    return <span className="inline-block w-3 h-3 rounded-[3px] bg-s4e-neutral-grey-200" aria-hidden />;
  }
  return <span className="inline-block w-4 h-1.5 rounded-[2px] bg-s4e-neutral-grey-200" aria-hidden />;
}

// ── Spec section ──────────────────────────────────────────────────────────

export function SkeletonSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SpecSectionTitle>Instance properties</SpecSectionTitle>
        <SpecLede>
          Skeleton is a single primitive — pick a shape, set the dimensions, and compose them to
          match the real layout. The pulse animation is built in.
        </SpecLede>
        <PropertiesTable
          rows={[
            {
              name:    "shape",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap items-center gap-1.5">
                  <OptionPill swatch={<ShapeSwatch shape="line"   />} label="line" />
                  <OptionPill swatch={<ShapeSwatch shape="block"  />} label="block" />
                  <OptionPill swatch={<ShapeSwatch shape="circle" />} label="circle" />
                </div>
              ),
              default:     "block",
              description: "Bounding-box shape. Line for text, block for surfaces, circle for avatars.",
            },
            {
              name:    "width",
              type:    "number | %",
              values:  <OptionPill label="content-driven" />,
              default:     "auto",
              description: "Override per instance to mirror the real element width.",
            },
            {
              name:    "height",
              type:    "number",
              values:  <OptionPill label="12 / 64 / 40" />,
              default:     "shape-default",
              description: "Defaults derive from the shape; override for custom rows.",
            },
            {
              name:    "animated",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "true",
              description: "Toggle the 2-second pulse. Disable for prefers-reduced-motion users.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SpecSectionTitle>Sizing &amp; spacing</SpecSectionTitle>
        <SpecLede>
          Three default shapes cover most cases. There is no padding to label — width and height
          define the entire footprint.
        </SpecLede>

        <DimensionsTable
          columns={["Line", "Block", "Circle"]}
          rows={[
            { label: "Default height",   values: ["12px",   "64px",  "40px"],   note: "Line matches body text; circle is avatar." },
            { label: "Default width",    values: ["100%",   "100%",  "40px"],   note: "Line and block fill parent." },
            { label: "Border radius",    values: ["4px",    "8px",   "full"],   note: "Circle is fully round." },
            { label: "Pulse period",     values: ["2s",     "2s",    "2s"],     note: "One opacity cycle." },
            { label: "Stack gap (lines)",values: ["8px",    "—",     "—"],      note: "Vertical spacing between stacked lines." },
            { label: "Group gap (rows)", values: ["—",      "12px",  "12px"],   note: "Spacing inside a card or list row." },
          ]}
        />
      </section>

      {/* Color tokens */}
      <section>
        <SpecSectionTitle>Color tokens</SpecSectionTitle>
        <SpecLede>
          A single neutral grey, animated between two opacity stops. Never use brand or semantic
          colors — the skeleton should read as &quot;nothing yet&quot;.
        </SpecLede>

        <ColorTokenTable
          title="Neutral · grey"
          rows={[
            { variant: "Fill",        bg: { token: "neutral-grey-200",  hex: "#ebeded" }, text: { token: "text-disabled", hex: "#9ca3a4" } },
            { variant: "Pulse low",   bg: { token: "neutral-grey-200 @60%", hex: "#ebeded99" }, text: { token: "text-disabled", hex: "#9ca3a4" } },
            { variant: "Pulse high",  bg: { token: "neutral-grey-300",  hex: "#dfe2e2" }, text: { token: "text-disabled", hex: "#9ca3a4" } },
          ]}
        />
      </section>
    </div>
  );
}

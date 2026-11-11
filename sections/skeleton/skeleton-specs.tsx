"use client";

import { PropsFromCode } from "@/components/styleguide/props-from-code";
import {
  
  DimensionsTable,
  ColorTokenTable,
  
  
  SpecSectionTitle,
  SpecLede,
} from "@/components/styleguide/specs";

// ── Swatches ──────────────────────────────────────────────────────────────


// ── Spec section ──────────────────────────────────────────────────────────

export function SkeletonSpecs() {
  return (
    <div className="space-y-10">
      {/* Properties */}
      <section>
        <SpecSectionTitle>Properties</SpecSectionTitle>
        <SpecLede>
          Skeleton is a single primitive — pick a shape, set the dimensions, and compose them to
          match the real layout. The pulse animation is built in.
        </SpecLede>
        <PropsFromCode slug="skeleton" />
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
            { variant: "Fill",        bg: { token: "neutral-grey-200" }, text: { token: "—", hex: "" } },
            
            
          ]}
        />
      </section>
    </div>
  );
}

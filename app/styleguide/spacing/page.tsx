import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { SpacingScale } from "@/sections/spacing/spacing-scale";
import { UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Spacing & Grid — Design System",
};

export default function SpacingPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader
        category="Foundations"
        title="Spacing System"
        status="stable"
        description="8pt grid exclusively. Every padding, gap, and margin references a spacing token. Arbitrary values are a build error, not a style choice."
      />
      <SpacingScale />

      <UseCases
        items={[
          "Use 4px (1) for inline icon-to-text gaps and pill padding.",
          "Use 8px (2) for tight stacks — toolbar items, badge clusters, dense table cells.",
          "Use 12px (3) for form-field internal padding and card-inside-card gaps.",
          "Use 16px (4) for card padding and the default body line-stack.",
          "Use 24px (6) for section gaps within a card and form-field vertical rhythm.",
          "Use 32px (8) for the gap between distinct cards or page sections.",
          "Use 48–64px (12–16) for top-level page padding and hero margins.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Stack vertical rhythm in multiples of 8 — pages with mixed cadences feel jittery even when each value is on-scale." },
          { type: "dont", text: "Don't reach for 5px or 14px to nudge alignment — fix the underlying token instead." },
          { type: "do",   text: "Use the smallest spacing that still groups related items. Crowded UIs read faster than airy ones in dense products." },
          { type: "dont", text: "Don't combine two scales in the same surface (8pt outside, 5pt inside) — pick one and live with it." },
        ]}
      />
    </div>
  );
}

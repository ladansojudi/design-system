import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { TabsShowcase } from "@/sections/tabs/tabs-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Tabs — s4e Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto space-y-10">
      <PageHeader category="Molecules" title="Tabs" description="Horizontal navigation pattern for switching between related views." />

      <TabsShowcase />

      <Anatomy
        parts={[
          { label: "Tab item",   description: "Clickable segment holding the label and optional badge." },
          { label: "Indicator",  description: "Underline (2px bottom border) or filled pill that marks the active tab." },
          { label: "Badge (optional)", description: "Count chip used to surface activity (Findings · 12)." },
        ]}
      >
        <div className="flex items-end border-b border-s4e-neutral-divider-10">
          <span className="px-4 pb-2.5 pt-2 text-[13px] font-medium border-b-2 -mb-px border-s4e-brand-primary-500 text-s4e-brand-primary-500">Findings</span>
          <span className="px-4 pb-2.5 pt-2 text-[13px] font-medium border-b-2 -mb-px border-transparent text-s4e-text-secondary">Assets</span>
        </div>
      </Anatomy>

      <UseCases
        items={[
          "Use Underline for primary in-page navigation (Overview · Details · Scan Graph).",
          "Use Pill for secondary segmented control situations, especially inside cards.",
          "Add a badge when the user benefits from seeing counts without clicking.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Keep labels short (1–2 words) so all tabs fit on one row." },
          { type: "dont", text: "Don't exceed 5 tabs; collapse the rest into an overflow menu." },
          { type: "do",   text: "Default to the first tab — don't open on an empty state." },
          { type: "dont", text: "Don't mix tabs with filters; they serve different mental models." },
        ]}
      />
    </div>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { ComponentStatusShowcase } from "@/sections/component-status/component-status-showcase";
import { UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Component Status — Design System",
};

export default function ComponentStatusPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader
        category="Foundations"
        title="Component Status"
        status="stable"
        description="Every component carries an Alpha / Beta / Stable / Deprecated badge so consumers know how confidently they can depend on it. This page is the contract behind those badges."
      />

      <div className="mt-12 sm:mt-16 space-y-10">
        <ComponentStatusShowcase />

        <UseCases
          items={[
            "Check the status badge before adopting a new component — it tells you the risk profile.",
            "Filing a bug on a Beta component is expected; filing one on Alpha is for the maintainers, not consumers.",
            "When migrating off a Deprecated component, follow the replacement link on its page — there is always one.",
            "When proposing a new component, start in Alpha. Promotion follows the criteria below, not how confident you feel.",
          ]}
        />

        <Guidelines
          items={[
            { type: "do",   text: "Use Stable components by default for any new feature." },
            { type: "dont", text: "Don't ship Alpha components to customer-facing surfaces." },
            { type: "do",   text: "Pin a Beta component's version if you depend on it in production." },
            { type: "dont", text: "Don't downgrade a status to escape work — fix the component, or replace it." },
            { type: "do",   text: "Cite the status badge in your PR description when adopting a non-Stable component, so reviewers know the trade-off." },
            { type: "dont", text: "Don't revive a Deprecated component; the replacement exists for a reason." },
          ]}
        />
      </div>
    </div>
  );
}

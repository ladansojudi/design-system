import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { BreadcrumbShowcase } from "@/sections/breadcrumb/breadcrumb-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Breadcrumb — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader category="Molecules" title="Breadcrumb" status="stable" description="Hierarchical path indicator showing the user's location in the product." />

      <BreadcrumbShowcase />

      <Anatomy
        parts={[
          { label: "Link",       description: "Navigable ancestor page; primary text color with hover underline." },
          { label: "Separator",  description: "Bullet (•) divider in disabled text color, non-selectable." },
          { label: "Current",    description: "Final, non-interactive segment rendered in muted text." },
        ]}
      >
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-s4e-text-primary">Main</span>
          <span className="text-s4e-text-disabled text-[12px]">•</span>
          <span className="text-[13px] font-medium text-s4e-text-primary">Asset Manager</span>
          <span className="text-s4e-text-disabled text-[12px]">•</span>
          <span className="text-[13px] text-s4e-text-disabled">zero.webappsecurity.com</span>
        </div>
      </Anatomy>

      <UseCases
        items={[
          "Show the breadcrumb on detail pages that live at least two levels below a section root.",
          "Pair with a back arrow when mobile real estate is tight.",
          "Keep the current page visible as the last segment so users always know where they are.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Make every non-current segment a link that navigates to that level." },
          { type: "dont", text: "Don't use breadcrumbs as primary navigation; they complement, not replace, the sidebar." },
          { type: "do",   text: "Truncate very long segments with ellipsis and reveal full name on hover." },
          { type: "dont", text: "Don't show breadcrumbs on top-level pages that already have a clear title." },
        ]}
      />
    </div>
  );
}

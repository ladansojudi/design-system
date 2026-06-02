import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { BreadcrumbShowcase, BreadcrumbExamples } from "@/sections/breadcrumb/breadcrumb-showcase";
import { BreadcrumbSpecs } from "@/sections/breadcrumb/breadcrumb-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Breadcrumb — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader category="Molecules" title="Breadcrumb" status="stable" description="Hierarchical path indicator showing the user's location in the product." />

      <div className="mt-12 sm:mt-16">
        <ViewModeTabs />
      </div>

      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <BreadcrumbShowcase />

            <Anatomy
              parts={[
                { label: "Link",       description: "Navigable ancestor page; primary text color with hover underline." },
                { label: "Separator",  description: "Bullet (•) divider in disabled text color, non-selectable." },
                { label: "Current",    description: "Final, non-interactive segment rendered in muted text." },
              ]}
            >
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-s4e-text-primary">Main</span>
                <span className="text-s4e-text-disabled text-[12px]">•</span>
                <span className="text-[14px] font-medium text-s4e-text-primary">Asset Manager</span>
                <span className="text-s4e-text-disabled text-[12px]">•</span>
                <span className="text-[14px] text-s4e-text-disabled">zero.webappsecurity.com</span>
              </div>
            </Anatomy>

            <BreadcrumbSpecs />

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
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <BreadcrumbExamples />
          </div>
        }
      />
    </div>
  );
}

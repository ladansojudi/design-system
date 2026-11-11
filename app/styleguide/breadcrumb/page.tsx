import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { BreadcrumbShowcase, BreadcrumbExamples } from "@/sections/breadcrumb/breadcrumb-showcase";
import { BreadcrumbSpecs } from "@/sections/breadcrumb/breadcrumb-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";

export const metadata: Metadata = {
  title: "Breadcrumb — Sentinel Design System",
};

export default function Page() {
  return (
    <>
      <PageHero category="Components"
        categoryHref="/styleguide/components" title="Breadcrumb" status="stable" description="Hierarchical path indicator showing the user's location in the product."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Breadcrumb" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Link",       description: "Navigable ancestor page; primary text color with hover underline." },
                  { label: "Separator",  description: "Bullet (•) divider in disabled text color, non-selectable." },
                  { label: "Current",    description: "Final, non-interactive segment rendered in muted text." },
                ]}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-medium text-snt-text-primary">Main</span>
                  <span className="text-snt-text-disabled text-[12px]">•</span>
                  <span className="text-[14px] font-medium text-snt-text-primary">Asset Manager</span>
                  <span className="text-snt-text-disabled text-[12px]">•</span>
                  <span className="text-[14px] text-snt-text-disabled">zero.webappsecurity.com</span>
                </div>
              </Anatomy>
              <BreadcrumbSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="breadcrumb" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <BreadcrumbShowcase />
            </DocSection>
            <DocSection title="Usage">
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
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><BreadcrumbExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

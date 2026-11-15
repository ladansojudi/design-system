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
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Breadcrumb",
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
                  { label: "Link", target: "nav a|0", side: "bottom", description: "A parent page you can go back to." },
                  { label: "Separator", target: "nav [aria-hidden]|0", side: "top", description: "Divider between segments; not read out by screen readers." },
                  { label: "Current", target: "[aria-current=\"page\"]", side: "bottom", description: "The page you are on: last segment, not a link." },
                ]}
                preview={
                  <Breadcrumb>
                    <BreadcrumbItem href="#">Main</BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem href="#">Asset Manager</BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem isCurrent>zero.webappsecurity.com</BreadcrumbItem>
                  </Breadcrumb>
                }
              />
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

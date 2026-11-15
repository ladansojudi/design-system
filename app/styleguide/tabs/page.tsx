import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { TabsShowcase, TabsExamples } from "@/sections/tabs/tabs-showcase";
import { TabsSpecs } from "@/sections/tabs/tabs-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Tabs",
};

export default function Page() {
  return (
    <>
      <PageHero category="Components"
        categoryHref="/styleguide/components" title="Tabs" status="stable" description="Horizontal navigation pattern for switching between related views."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Tabs" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Tab item", target: "[role=\"tab\"]|1", side: "bottom", description: "One clickable segment: label plus optional badge." },
                  { label: "Indicator", target: "[role=\"tab\"][aria-selected=\"true\"]", side: "top", description: "The underline (or filled pill) marks the active tab." },
                  { label: "Badge (optional)", target: "[role=\"tab\"] > span", side: "top", description: "Count chip that surfaces activity, e.g. Findings \u00b7 12." },
                ]}
                preview={
                  <Tabs defaultValue="findings">
                    <TabsList aria-label="Anatomy example">
                      <TabsTrigger value="findings" count={12}>Findings</TabsTrigger>
                      <TabsTrigger value="assets">Assets</TabsTrigger>
                    </TabsList>
                  </Tabs>
                }
              />
              <TabsSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="tabs" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <TabsShowcase />
            </DocSection>
            <DocSection title="Usage">
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
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><TabsExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

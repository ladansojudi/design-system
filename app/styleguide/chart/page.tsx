import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ChartShowcase, ChartExamples } from "@/sections/chart/chart-showcase";
import { ChartSpecs } from "@/sections/chart/chart-specs";
import { Anatomy } from "@/components/styleguide/component-docs";
import { ChartCard, StatBlock } from "@/components/ui/chart";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";

export const metadata: Metadata = {
  title: "Chart",
};

export default function Page() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Chart"
        status="beta"
        description="Dashboard chart cards — Donut, Treemap, Bar and Line/Area. Each chart has its own examples and documentation in the tabs below."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Chart" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Header", target: '[class*="border-b"]', side: "left", description: "Title and description on the left, an optional View all button on the right." },
                  { label: "Title", target: 'span[class*="tracking-tight"]', side: "top", description: "Names the chart; 16px semibold." },
                  { label: "View all", target: "button", side: "top", description: "Ghost button with an arrow that opens the full report." },
                  { label: "Body", target: '[class*="py-5"]', side: "right", description: "The chart itself: donut, bar, line or treemap." },
                  { label: "Stat block", target: '[class*="flex-1"][class*="border"]|0', side: "bottom", description: "A bordered figure that sits beside or under a chart." },
                ]}
                preview={
                  <div className="w-96 max-w-full">
                    <ChartCard title="Findings by severity" description="Open findings, last 30 days" viewAll>
                      <div className="flex gap-3">
                        <StatBlock label="Open" value="312" />
                        <StatBlock label="Fixed" value="1,048" />
                      </div>
                    </ChartCard>
                  </div>
                }
              />
              <ChartSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="chart" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <ChartShowcase />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><ChartExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

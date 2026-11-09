import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ChartShowcase, ChartExamples } from "@/sections/chart/chart-showcase";
import { ChartSpecs } from "@/sections/chart/chart-specs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";

export const metadata: Metadata = {
  title: "Chart — Sentinel Design System",
};

export default function Page() {
  return (
    <>
      <PageHero
        category="Organisms"
        title="Chart"
        status="stable"
        description="Dashboard chart cards — Donut, Treemap, Bar and Line/Area. Each chart has its own examples and documentation in the tabs below."
        actions={<OpenInFigma />}
        tabs={<ViewModeTabs />}
      />

      <PageBody>


      <ModeAware
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <ChartShowcase />
            </DocSection>
            <DocSection title="Specs">
              <ChartSpecs />
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
    </>
  );
}

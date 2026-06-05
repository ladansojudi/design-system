import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ChartShowcase, ChartExamples } from "@/sections/chart/chart-showcase";
import { ChartSpecs } from "@/sections/chart/chart-specs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Chart — Design System",
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
          <div className="space-y-10 mt-8 sm:mt-10">
            <ChartShowcase />
            <ChartSpecs />
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <ChartExamples />
          </div>
        }
      />
      </PageBody>
    </>
  );
}

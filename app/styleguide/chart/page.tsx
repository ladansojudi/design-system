import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { ChartShowcase, ChartExamples } from "@/sections/chart/chart-showcase";
import { ChartSpecs } from "@/sections/chart/chart-specs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Chart — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader
        category="Organisms"
        title="Chart"
        status="stable"
        description="Dashboard chart cards — Donut, Treemap, Bar and Line/Area. Each chart has its own examples and documentation in the tabs below."
      />

      <div className="mt-12 sm:mt-16">
        <ViewModeTabs />
      </div>

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
    </div>
  );
}

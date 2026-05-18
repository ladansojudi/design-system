import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { ChartShowcase } from "@/sections/chart/chart-showcase";

export const metadata: Metadata = {
  title: "Chart — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader
        category="Organisms"
        title="Chart"
        status="stable"
        description="Dashboard chart cards — Donut, Treemap, Bar and Line/Area. Each chart has its own examples and documentation in the tabs below."
      />

      <ChartShowcase />
    </div>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { DashboardShowcase, DashboardExamples } from "@/sections/dashboard/dashboard-showcase";
import { DashboardSpecs } from "@/sections/dashboard/dashboard-specs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Dashboard — Design System",
};

export default function DashboardPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <PageHeader
        category="Patterns"
        title="Dashboard"
        status="beta"
        description="A real product screen composed entirely from design-system components and tokens — Overview, Details and Compliance tabs. Proof that the system holds together in a dense, data-heavy security UI."
      />

      <div className="mt-12 sm:mt-16">
        <ViewModeTabs />
      </div>

      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <DashboardShowcase />
            <DashboardSpecs />
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DashboardExamples />
          </div>
        }
      />
    </div>
  );
}

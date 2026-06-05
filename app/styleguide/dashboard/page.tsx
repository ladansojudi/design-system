import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { DashboardShowcase, DashboardExamples } from "@/sections/dashboard/dashboard-showcase";
import { DashboardSpecs } from "@/sections/dashboard/dashboard-specs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { InstallationTabs } from "@/components/styleguide/installation-tabs";
import { DeveloperNotes } from "@/components/styleguide/developer-notes";

export const metadata: Metadata = {
  title: "Dashboard — Design System",
};

export default function DashboardPage() {
  return (
    <>
      <PageHero
        fluid
        category="Patterns"
        title="Dashboard"
        status="beta"
        description="A real product screen composed entirely from design-system components and tokens — Overview, Details and Compliance tabs. Proof that the system holds together in a dense, data-heavy security UI."
        actions={<OpenInFigma />}
        tabs={<ViewModeTabs />}
      />

      {/* Dashboard stays full-width (no max-w / TOC) — it's a real product screen. */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <ModeAware
          design={
            <div className="space-y-10">
              <DashboardShowcase />
              <DashboardSpecs />
            </div>
          }
          dev={
            <div>
              <DashboardExamples />
              <InstallationTabs />
              <DeveloperNotes />
            </div>
          }
        />
      </div>
    </>
  );
}

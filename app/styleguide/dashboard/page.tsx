import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { DashboardShowcase } from "@/sections/dashboard/dashboard-showcase";

export const metadata: Metadata = {
  title: "Dashboard — Design System",
};

export default function DashboardPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      <PageHeader
        category="Patterns"
        title="Dashboard"
        status="beta"
        description="A real product screen composed entirely from design-system components and tokens — Overview, Details and Compliance tabs. Proof that the system holds together in a dense, data-heavy security UI."
      />
      <DashboardShowcase />
    </div>
  );
}

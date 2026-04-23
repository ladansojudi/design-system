import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { ComingSoon } from "@/components/styleguide/coming-soon";

export const metadata: Metadata = {
  title: "Scan Type Item — s4e Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto">
      <PageHeader category="Molecules" title="Scan Type Item" description="Selectable item representing a scan configuration type." />
      <ComingSoon title="Scan Type Item" />
    </div>
  );
}

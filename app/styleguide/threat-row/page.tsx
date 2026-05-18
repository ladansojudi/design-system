import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { ComingSoon } from "@/components/styleguide/coming-soon";

export const metadata: Metadata = {
  title: "Threat Row — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader category="Molecules" title="Threat Row" status="alpha" description="Single row representing a threat entry with severity, title, and actions." />
      <ComingSoon title="Threat Row" />
    </div>
  );
}

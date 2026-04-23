import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { SpacingScale } from "@/sections/spacing/spacing-scale";

export const metadata: Metadata = {
  title: "Spacing & Grid — Design System",
};

export default function SpacingPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto">
      <PageHeader
        category="Atoms"
        title="Spacing System"
        description="8pt grid exclusively. Every padding, gap, and margin references a spacing token. Arbitrary values are a build error, not a style choice."
      />
      <SpacingScale />
    </div>
  );
}

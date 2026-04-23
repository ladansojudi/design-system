import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { ShadowScale } from "@/sections/shadow/shadow-scale";

export const metadata: Metadata = {
  title: "Shadow — s4e Design System",
};

export default function ShadowPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto">
      <PageHeader
        category="Atoms"
        title="Shadow"
        description="Elevation scale for surfacing UI above the page. Each level has a fixed token — pick by purpose, not by look."
      />
      <ShadowScale />
    </div>
  );
}

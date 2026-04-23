import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { IconsGrid } from "@/sections/icons/icons-grid";

export const metadata: Metadata = {
  title: "Icons — Design System",
};

export default function IconsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto">
      <PageHeader
        category="Atoms"
        title="Icons"
        description="Lucide React icon set. Click any icon to copy its component name."
      />
      <IconsGrid />
    </div>
  );
}

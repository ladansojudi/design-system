import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { TypographyScale } from "@/sections/typography/typography-scale";

export const metadata: Metadata = {
  title: "Typography — s4e Design System",
};

export default function TypographyPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto">
      <PageHeader
        category="Atoms"
        title="Typography"
        description="Type scale for the s4e.io interface. All styles use the Inter variable font."
      />
      <TypographyScale />
    </div>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { ColorsSystem } from "@/sections/colors/colors-system";

export const metadata: Metadata = {
  title: "Design System",
};

export default function ColorsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader
        category="Foundations"
        title="Colors & Tokens"
        description="Every visual decision in the system references a named token. No component uses a hardcoded color value."
      />
      <ColorsSystem />
    </div>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { AccessibilityShowcase } from "@/sections/accessibility/accessibility-showcase";

export const metadata: Metadata = {
  title: "Accessibility — Design System",
};

export default function AccessibilityPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader
        category="Foundations"
        title="Accessibility"
        status="stable"
        description="Contrast, color independence and keyboard support are non-negotiable. Every component is verified against these rules before it ships."
      />

      <div className="mt-12 sm:mt-16">
        <AccessibilityShowcase />
      </div>
    </div>
  );
}

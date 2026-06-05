import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { AccessibilityShowcase } from "@/sections/accessibility/accessibility-showcase";

export const metadata: Metadata = {
  title: "Accessibility — Design System",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        category="Foundations"
        title="Accessibility"
        status="stable"
        description="Contrast, color independence and keyboard support are non-negotiable. Every component is verified against these rules before it ships."
        actions={<OpenInFigma />}
      />

      <PageBody>

      <div>
        <AccessibilityShowcase />
      </div>
      </PageBody>
    </>
  );
}

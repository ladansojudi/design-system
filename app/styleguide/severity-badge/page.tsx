import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { SeverityBadgeShowcase, SeverityBadgeExamples } from "@/sections/severity-badge/severity-badge-showcase";
import { SeverityBadgeSpecs } from "@/sections/severity-badge/severity-badge-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Severity Badge — Design System",
};

export default function SeverityBadgePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader
        category="Atoms"
        title="Severity Badge"
        status="stable"
        description="Five severity levels — Low, Info, Medium, High, Critical — each with a distinct color accent. Available with label only or label plus score."
      />

      <div className="mt-12 sm:mt-16">
        <ViewModeTabs />
      </div>

      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <SeverityBadgeShowcase />

            <Anatomy
              parts={[
                { label: "Accent bar",       description: "3px left bar that carries the severity color, giving instant recognition." },
                { label: "Background",       description: "Tinted surface in the lightest scale of the severity color." },
                { label: "Label",            description: "Severity name, colored to match the scale (600 weight)." },
                { label: "Score (optional)", description: "Numeric CVSS score or risk value aligned to the right." },
              ]}
              preview={
                <div className="flex items-center justify-between rounded-md px-3 py-1.5 w-40 bg-s4e-scale-red-50 border-l-[3px] border-s4e-scale-red-500">
                  <span className="text-sm font-medium text-s4e-scale-red-600">High</span>
                  <span className="text-sm text-s4e-scale-red-600 opacity-80">8.4</span>
                </div>
              }
            />

            <SeverityBadgeSpecs />

            <UseCases
              items={[
                "Tag vulnerabilities, findings or threats in tables and feeds.",
                "Summarise risk on stat cards and dashboard widgets.",
                "Pair with a CVSS or internal score when the number reinforces severity.",
              ]}
            />

            <Guidelines
              items={[
                { type: "do",   text: "Use exactly one severity per item — never stack badges for the same finding." },
                { type: "dont", text: "Don't invent new severities; stick to the five defined levels." },
                { type: "do",   text: "Align badges to a fixed width in tables so rows stay visually balanced." },
                { type: "dont", text: "Don't reuse severity colors for unrelated tags — it dilutes their meaning." },
              ]}
            />
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <SeverityBadgeExamples />
          </div>
        }
      />
    </div>
  );
}

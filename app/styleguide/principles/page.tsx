import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";

export const metadata: Metadata = {
  title: "Design Principles — Sentinel Design System",
};

const principles = [
  {
    title: "Clarity over cleverness",
    body:  "Every component should communicate its purpose immediately. If something needs explanation to be understood, it needs to be redesigned.",
  },
  {
    title: "Severity is never decorative",
    body:  "Purple means Critical, red means High. Severity colours are reserved — never used for charts, backgrounds or UI states. A misread severity level in a security tool has real consequences.",
  },
  {
    title: "Density with breathing room",
    body:  "Security products are data-heavy. Components are designed to show a lot of information without feeling overwhelming.",
  },
  {
    title: "Dark first, light always",
    body:  "Security teams live in these tools for hours, often in dark rooms. Every component works in dark and light, and both are tested equally.",
  },
  {
    title: "One source, no exceptions",
    body:  "Every color, spacing value, and typography decision references a token. No hardcoded values anywhere.",
  },
];

export default function PrinciplesPage() {
  return (
    <>
      <PageHero
        category="Foundations"
        title="Design Principles"
        status="stable"
        description="Five principles that guide every decision in this design system — from token names to component anatomy to the way severity is represented."
        actions={<OpenInFigma />}
      />

      <PageBody>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((p) => (
            <div
              key={p.title}
              className="border-[0.5px] border-snt-neutral-divider-10 rounded-lg p-5"
            >
              <h2 className="text-[14px] font-medium text-snt-text-primary">
                {p.title}
              </h2>
              <p className="mt-2 text-[12px] text-snt-text-secondary leading-[1.7]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      </PageBody>
    </>
  );
}

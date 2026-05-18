import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";

export const metadata: Metadata = {
  title: "Design Principles — Design System",
};

const principles = [
  {
    title: "Clarity over cleverness",
    body:  "Every component should communicate its purpose immediately. If something needs explanation to be understood, it needs to be redesigned.",
  },
  {
    title: "Severity is never decorative",
    body:  "Red means Critical. Purple means Critical severity. These colors are not available for charts, backgrounds, or UI states. A misread severity level in a security product has real consequences.",
  },
  {
    title: "Density with breathing room",
    body:  "s4e.io is a data-heavy product. Components are designed to show a lot of information without feeling overwhelming.",
  },
  {
    title: "Dark first, light always",
    body:  "The product is designed dark-first. Every component must work in both modes. Light mode is tested equally.",
  },
  {
    title: "One source, no exceptions",
    body:  "Every color, spacing value, and typography decision references a token. No hardcoded values anywhere.",
  },
];

export default function PrinciplesPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader
        category="Foundations"
        title="Design Principles"
        status="stable"
        description="Five principles that guide every decision in this design system — from token names to component anatomy to the way severity is represented."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {principles.map((p) => (
          <div
            key={p.title}
            className="border-[0.5px] border-s4e-neutral-divider-10 rounded-lg p-5"
          >
            <h2 className="text-[13px] font-medium text-s4e-text-primary">
              {p.title}
            </h2>
            <p className="mt-2 text-[12px] text-s4e-text-secondary leading-[1.7]">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

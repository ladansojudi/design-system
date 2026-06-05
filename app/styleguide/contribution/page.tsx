import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";

export const metadata: Metadata = {
  title: "Contribution Guide — Design System",
};

const steps = [
  {
    title: "Audit first",
    body:  "Check if the component already exists. If something similar exists, extend it rather than creating a new one.",
  },
  {
    title: "Define the token needs",
    body:  "Does this component need a new token? If yes, define it in the token file first. No hardcoded values.",
  },
  {
    title: "Document before you build",
    body:  "Write the spec first. All states, anatomy, use cases, do/don't rules — before any code.",
  },
  {
    title: "Build dark and light together",
    body:  "Never build dark mode first and add light mode later. Both modes built simultaneously from the start.",
  },
  {
    title: "Add to the style guide",
    body:  "The component is not done until it has a page here. Preview, anatomy, use cases, and guidelines — all four required.",
  },
  {
    title: "Update Figma",
    body:  "Mirror the component in the Figma library. Token names must match exactly between code and Figma.",
  },
];

export default function ContributionPage() {
  return (
    <>
      <PageHero
        category="Foundations"
        title="Contribution Guide"
        status="stable"
        description="Six steps every contributor follows when adding or extending a component. Skipping a step is how the system drifts out of alignment."
        actions={<OpenInFigma />}
      />

      <PageBody>

      <div>
        <ol className="space-y-5">
          {steps.map((step, i) => (
            <li key={step.title} className="flex items-start gap-4">
              <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-s4e-neutral-grey-200 text-s4e-text-primary text-[12px] font-medium">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0 pt-0.5">
                <h2 className="text-[14px] font-medium text-s4e-text-primary">
                  {step.title}
                </h2>
                <p className="mt-1 text-[12px] text-s4e-text-secondary leading-[1.7]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      </PageBody>
    </>
  );
}

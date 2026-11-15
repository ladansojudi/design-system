import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { EmptyStateShowcase, EmptyStateExamples } from "@/sections/empty-state/empty-state-showcase";
import { EmptyStateSpecs } from "@/sections/empty-state/empty-state-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { EmptyStateAnatomyPreview } from "@/sections/anatomy-previews";

export const metadata: Metadata = {
  title: "Empty State" };

export default function Page() {
  return (
    <>
      <PageHero category="Components"
        categoryHref="/styleguide/components" title="Empty State" status="beta" description="Placeholder surface shown when a list or view has no content to display."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Empty State" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Icon container", target: "[class*=\"rounded-full\"]|0", side: "top", description: "Round badge; its colour sets the tone: neutral, warning or alert." },
                  { label: "Title", target: "[class*=\"font-semibold\"]", side: "left", description: "Short sentence that names the situation, e.g. \u201cNo scans yet\u201d." },
                  { label: "Description", target: "p", side: "right", description: "One line on why it's empty and how to move on." },
                  { label: "Primary action", target: "[class*=\"mt-5\"] > :nth-child(1)", side: "bottom", description: "Filled button for the main next step." },
                  { label: "Secondary action", target: "[class*=\"mt-5\"] > :nth-child(2)", side: "bottom", description: "Outlined button for another path: clear filters, read the docs." },
                ]}
                preview={
                  <EmptyStateAnatomyPreview />
                }
              />
              <EmptyStateSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="empty-state" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <EmptyStateShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Show when a table, list, or dashboard panel has no records yet (first-run state).",
                  "Show when an applied filter or search returns zero results — offer a way to clear filters.",
                  "Show when loading fails — use the alert tone and surface a Retry action.",
                  "Show when the user lacks permissions — use the warning tone and provide a request-access path.",
                  "Use the small variant inline inside cards or sub-sections where the full-height state would feel heavy.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Always pair an empty state with at least one action — even if it's just a doc link." },
                  { type: "dont", text: "Don't leave an empty table completely blank; use this component so the user knows it's intentional." },
                  { type: "do",   text: "Match the tone to the cause: neutral for zero-data, warning for permissions, alert for errors." },
                  { type: "dont", text: "Don't write vague titles like \"Nothing here\" — name the specific thing that's missing." },
                  { type: "do",   text: "Keep the description to a single sentence explaining why and what to do next." },
                  { type: "dont", text: "Don't use an empty state as a loading placeholder; use a skeleton while data is fetching." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><EmptyStateExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

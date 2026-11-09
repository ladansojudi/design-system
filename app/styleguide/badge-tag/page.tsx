import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { BadgeTagShowcase, BadgeTagExamples } from "@/sections/badge-tag/badge-tag-showcase";
import { BadgeTagSpecs } from "@/sections/badge-tag/badge-tag-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";

export const metadata: Metadata = {
  title: "Badge · Tag — Sentinel Design System",
};

export default function Page() {
  return (
    <>
      <PageHero category="Components"
        categoryHref="/styleguide/components" title="Badge · Tag" status="stable" description="Small labeling elements used to categorize or annotate content."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Badge · Tag" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Dot (optional)", description: "7px colored circle that reinforces the badge color on either end." },
                  { label: "Label",          description: "Short noun — one or two words describing the category or status." },
                  { label: "Surface",        description: "Filled pill or outlined border depending on the variant." },
                ]}
              >
                <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium bg-snt-scale-green-50 text-snt-scale-green-600">
                  <span className="w-[7px] h-[7px] rounded-full bg-snt-scale-green-500 shrink-0" />
                  Success
                </div>
              </Anatomy>
              <BadgeTagSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="badge-tag" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <BadgeTagShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Label items in lists, tables, or cards — like asset type, environment, or status.",
                  "Use the dot variant when color alone carries meaning; it doubles as an accessibility cue.",
                  "Use filled for dense layouts; outlined when you need a lighter visual weight.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Keep labels short — one or two words, Title Case or lowercase consistently." },
                  { type: "dont", text: "Don't use severity colors (red, amber) for neutral tags; reserve them for risk." },
                  { type: "do",   text: "Group badges with consistent spacing (4–6px) when stacking multiple." },
                  { type: "dont", text: "Don't stack more than 3 badges on a single row; collapse the rest into +N." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><BadgeTagExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

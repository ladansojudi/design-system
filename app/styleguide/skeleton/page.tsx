import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { SkeletonShowcase, SkeletonExamples } from "@/sections/skeleton/skeleton-showcase";
import { SkeletonSpecs } from "@/sections/skeleton/skeleton-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Skeleton",
};

export default function SkeletonPage() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Skeleton"
        status="stable"
        description="Placeholder shapes that match the layout of the real content while data loads. Reduces perceived latency and prevents layout shift."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Skeleton" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Shape", target: "[class*=\"rounded-full\"]", side: "left", description: "Rectangle or circle that matches the box of the real element." },
                  { label: "Fill", target: "[class*=\"h-16\"]", side: "right", description: "Neutral grey: never a brand or semantic colour." },
                  { label: "Pulse", target: "[class*=\"h-3\"]|0", side: "top", description: "A slow pulse says the content is loading, not broken." },
                ]}
                preview={
                  <div className="w-64 space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="h-16 w-full" />
                  </div>
                }
              />
              <SkeletonSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="skeleton" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <SkeletonShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Initial page load before data is fetched.",
                  "Tabbed switches where the second tab fetches lazily.",
                  "Infinite-scroll list waiting on the next page.",
                  "Dashboards while widgets fetch in parallel.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Match the skeleton shape and count to the real content — same number of rows, same column widths." },
                  { type: "dont", text: "Don't show a skeleton for under ~300ms — flicker is worse than a brief blank state." },
                  { type: "do",   text: "Keep the pulse subtle. Loud animations make the page feel busier than it is." },
                  { type: "dont", text: "Don't mix skeletons with spinners in the same surface — pick one loading paradigm." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><SkeletonExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

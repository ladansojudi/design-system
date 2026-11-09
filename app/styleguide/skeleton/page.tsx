import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { SkeletonShowcase, SkeletonExamples } from "@/sections/skeleton/skeleton-showcase";
import { SkeletonSpecs } from "@/sections/skeleton/skeleton-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";

export const metadata: Metadata = {
  title: "Skeleton — Sentinel Design System",
};

export default function SkeletonPage() {
  return (
    <>
      <PageHero
        category="Atoms"
        title="Skeleton"
        status="beta"
        description="Placeholder shapes that match the layout of the real content while data loads. Reduces perceived latency and prevents layout shift."
        actions={<OpenInFigma />}
        tabs={<ViewModeTabs />}
      />

      <PageBody>


      <ModeAware
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
            <DocSection title="Specs">
              <Anatomy
                parts={[
                  { label: "Shape",     description: "Rounded rectangle or circle that mirrors the bounding box of the real element." },
                  { label: "Fill",      description: "Neutral grey (snt-neutral-grey-200) — never a brand or semantic color." },
                  { label: "Pulse",     description: "2-second opacity pulse signals the content is loading, not broken." },
                ]}
              />
              <SkeletonSpecs />
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
    </>
  );
}

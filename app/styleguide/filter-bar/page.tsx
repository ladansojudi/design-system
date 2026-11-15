import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { FilterBarShowcase, FilterBarExamples } from "@/sections/filter-bar/filter-bar-showcase";
import { FilterBarSpecs } from "@/sections/filter-bar/filter-bar-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { FilterBarAnatomyPreview } from "@/sections/anatomy-previews";

export const metadata: Metadata = {
  title: "Filter Bar" };

export default function Page() {
  return (
    <>
      <PageHero category="Components"
        categoryHref="/styleguide/components" title="Filter Bar" status="beta" description="Horizontal toolbar for applying and managing active filters."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Filter Bar" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                layout="stacked"
                parts={[
                  { label: "Filter pill", target: "span[class*=\"rounded-lg\"]|0", side: "top", description: "Chip with an icon and a label; turns brand-coloured when a value is applied." },
                  { label: "Active count", target: "span[class*=\"rounded-full\"]", side: "top", description: "Small number inside the pill: how many values are applied." },
                  { label: "Overflow (+ N)", target: "div.items-center > button|0", side: "bottom", description: "Dashed pill that reveals the filters that don't fit." },
                  { label: "Actions", target: "div.items-center > button|1", side: "bottom", description: "Buttons such as Export, kept apart from the filters." },
                ]}
                preview={
                  <FilterBarAnatomyPreview />
                }
              />
              <FilterBarSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="filter-bar" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <FilterBarShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Place directly above a data table or list to refine its rows.",
                  "Use overflow mode when filters exceed the row width; surface the most-used four inline.",
                  "Pair with a search input when users need both free-text and structured filtering.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Show a Clear button whenever one or more filters are active." },
                  { type: "dont", text: "Don't wrap filters onto a second row by default; use overflow + expand instead." },
                  { type: "do",   text: "Keep action buttons (Export, Bulk) pinned to the right even when filters scroll." },
                  { type: "dont", text: "Don't change the filter set between states; let overflow handle small viewports." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><FilterBarExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

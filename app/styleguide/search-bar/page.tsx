import type { Metadata } from "next";
import { Search } from "lucide-react";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { SearchBarShowcase, SearchBarExamples } from "@/sections/search-bar/search-bar-showcase";
import { SearchBarSpecs } from "@/sections/search-bar/search-bar-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";

export const metadata: Metadata = {
  title: "Search Bar — Sentinel Design System",
};

export default function Page() {
  return (
    <>
      <PageHero category="Components"
        categoryHref="/styleguide/components" title="Search Bar" status="stable" description="Input combined with search affordance for filtering and finding content."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Search Bar" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Search icon",  description: "14px magnifier on the left — turns primary blue when focused." },
                  { label: "Input",        description: "Single-line text field for the query; bg is white (default) or grey (ghost)." },
                  { label: "Clear (optional)", description: "× appears on the right only when the input has value." },
                ]}
              >
                <div className="flex items-center gap-2 rounded-lg px-3 h-9 w-72 border border-snt-neutral-divider-10 bg-snt-surface-app">
                  <Search size={14} className="text-snt-text-disabled shrink-0" />
                  <span className="flex-1 text-[14px] text-snt-text-disabled">Search assets…</span>
                </div>
              </Anatomy>
              <SearchBarSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="search-bar" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <SearchBarShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Use Default when the search bar is the main surface on a page (e.g., asset list).",
                  "Use Ghost inside top bars and filter toolbars where the input should recede visually.",
                  "Debounce queries by 300 ms before firing a request to avoid jittery results.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Use clear placeholder text that hints at what can be searched (“Search assets, CVEs…”)." },
                  { type: "dont", text: "Don't add a separate Search button — Enter/Return or live filtering is enough." },
                  { type: "do",   text: "Show the × clear button only when the input has a value, not when it's empty." },
                  { type: "dont", text: "Don't combine a search bar with advanced filters in the same input; use the Filter Bar for that." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><SearchBarExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

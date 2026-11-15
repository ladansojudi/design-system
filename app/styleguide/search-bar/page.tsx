import type { Metadata } from "next";
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
import { SearchBar } from "@/components/ui/search-bar";

export const metadata: Metadata = {
  title: "Search Bar" };

export default function Page() {
  return (
    <>
      <PageHero category="Components"
        categoryHref="/styleguide/components" title="Search Bar" status="beta" description="Input combined with search affordance for filtering and finding content."
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
                  { label: "Search icon", target: "svg|0", side: "left", description: "Magnifier on the left." },
                  { label: "Input", target: "input", side: "top", description: "Single-line field for the query." },
                  { label: "Clear (optional)", target: "button", side: "right", description: "Appears on the right only when the field has a value." },
                ]}
                preview={
                  <SearchBar value="api.example.com" placeholder="Search assets…" />
                }
              />
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

import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { SelectShowcase, SelectExamples } from "@/sections/select/select-showcase";
import { SelectSpecs } from "@/sections/select/select-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { Select } from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Select" };

export default function SelectPage() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Select"
        status="beta"
        description="Single-select dropdown for picking one value from a known list of options. For multi-select, free-form input or search, reach for Combobox (planned)."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Select" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Label", target: "label", side: "top", description: "Sits above the trigger. Always present unless the context makes the purpose obvious." },
                  { label: "Trigger", target: "[role=\"combobox\"]", side: "left", description: "Button-like control that shows the chosen value or a placeholder. Click opens the option list (see Examples)." },
                  { label: "Chevron", target: "[role=\"combobox\"] svg", side: "right", description: "Caret that turns upside down while the list is open." },
                  { label: "Helper / Error", target: "div.mt-1", side: "bottom", description: "Hint under the trigger; an error message replaces it when present." },
                ]}
                preview={
                  <div className="w-72">
                    <Select
                      label="Region"
                      value="eu"
                      options={[{ value: "eu", label: "Europe (Frankfurt)" }, { value: "us", label: "US East (Virginia)" }]}
                      helperText="Data is processed in this region only."
                    />
                  </div>
                }
              />
              <SelectSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="select" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <SelectShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Choosing a region, plan, or category from a fixed list.",
                  "Filtering a table by a single dimension (status, severity, owner).",
                  "Settings forms where each row picks one value from 3–20 options.",
                  "Sort order pickers (most recent / oldest / alphabetical).",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Prefer Radio when there are 2–4 options that the user benefits from seeing all at once." },
                  { type: "dont", text: "Don't use Select for binary choices — that's a Switch or Checkbox." },
                  { type: "do",   text: "Use a helper line to set expectations before the user opens the menu (\"Data is processed in this region only\")." },
                  { type: "dont", text: "Don't pre-select a destructive option as the default — the user shouldn't accidentally delete by hitting Enter." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><SelectExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

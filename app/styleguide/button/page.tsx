import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ButtonShowcase, ButtonExamples } from "@/sections/button/button-showcase";
import { ButtonSpecs } from "@/sections/button/button-specs";
import { ButtonUsage } from "@/sections/button/button-usage";
import { ButtonAccessibility } from "@/sections/button/button-accessibility";

export const metadata: Metadata = {
  title: "Button — Sentinel Design System",
};

export default function ButtonPage() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Button"
        status="stable"
        description="Starts an action on the current page: save, run a scan, delete. Three intents, three variants and three sizes."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
        <PageBody>
          <ModeAware
            design={
              <div className="mt-8 space-y-16 sm:mt-10">
                <DocSection title="Examples">
                  <ButtonShowcase />
                </DocSection>
                <DocSection title="Usage">
                  <ButtonUsage />
                  <Guidelines
                    items={[
                      { type: "do",   text: "Use one solid button per area. Make the other actions outline or ghost." },
                      { type: "dont", text: "Put two solid primary buttons side by side. Users can't tell which one matters." },
                      { type: "do",   text: "Write a verb + noun in sentence case, one to three words: “Start scan”, “Export report”." },
                      { type: "dont", text: "Use vague labels like “OK”, “Submit” or “Yes”, or end a label with punctuation." },
                      { type: "do",   text: "Keep the button enabled and explain what's missing when it's pressed." },
                      { type: "dont", text: "Disable a button without saying why. Disabled buttons can't be focused, so the reason is never read out." },
                      { type: "do",   text: "Give every icon-only button an aria-label, and a tooltip with the same text." },
                      { type: "dont", text: "Rely on the icon alone, or on a title attribute, to explain what the button does." },
                      { type: "do",   text: "Keep the destructive intent for actions that can't be undone, and name what is lost: “Delete 3 assets”." },
                      { type: "dont", text: "Use red to make an action look important." },
                    ]}
                  />
                </DocSection>
              </div>
            }
            specs={
              <div className="mt-8 space-y-14 sm:mt-10">
                <FigmaNote component="Button" />
                <ButtonSpecs />
              </div>
            }
            dev={
              <div className="mt-8 sm:mt-10">
                <DocSection title="Examples">
                  <ButtonExamples />
                </DocSection>
              </div>
            }
            a11y={
              <div className="mt-8 sm:mt-10">
                <ButtonAccessibility />
              </div>
            }
          />
        </PageBody>
      </ComponentTabPanel>
    </>
  );
}

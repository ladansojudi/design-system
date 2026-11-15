import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { SwitchRadioShowcase, SwitchRadioExamples } from "@/sections/switch-radio/switch-radio-showcase";
import { SwitchRadioSpecs } from "@/sections/switch-radio/switch-radio-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { Switch } from "@/components/ui/switch-radio";

export const metadata: Metadata = {
  title: "Switch · Radio",
};

export default function SwitchRadioPage() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Switch · Radio"
        status="beta"
        description="Toggle switches in unchecked, dark, and primary variants. Radio buttons across unchecked, hovered, disabled, and checked states."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Switch · Radio" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Track", target: "[role=\"switch\"]", side: "top", description: "The pill that changes colour between on and off." },
                  { label: "Thumb", target: "[role=\"switch\"] > span", side: "bottom", description: "The circle that slides to show the state." },
                  { label: "Label (external)", target: ":scope > div > span", side: "right", description: "Text beside the control saying what it switches. Switch has no built-in label." },
                ]}
                preview={
                  <div className="flex items-center gap-2.5">
                    <Switch checked variant="primary" aria-label="Continuous monitoring" />
                    <span className="text-snt-14 text-snt-text-primary">Continuous monitoring</span>
                  </div>
                }
              />
              <SwitchRadioSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="switch-radio" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <SwitchRadioShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Use Switch for binary on/off settings that take effect immediately.",
                  "Use Radio when the user picks exactly one option from a small set.",
                  "Always pair the control with a descriptive label so the state is unambiguous.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Apply changes instantly when a switch is toggled — no extra Save step." },
                  { type: "dont", text: "Don't use a switch when the action is destructive; prompt a confirm instead." },
                  { type: "do",   text: "Use Radio when options are mutually exclusive; use Checkbox for multiple selection." },
                  { type: "dont", text: "Don't stack more than 5 radios vertically — consider a dropdown instead." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><SwitchRadioExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ToastTooltipShowcase, ToastTooltipExamples } from "@/sections/toast-tooltip/toast-tooltip-showcase";
import { ToastTooltipSpecs } from "@/sections/toast-tooltip/toast-tooltip-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { ToastAnatomyPreview } from "@/sections/anatomy-previews";

export const metadata: Metadata = {
  title: "Toast · Tooltip" };

export default function ToastTooltipPage() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Toast · Tooltip"
        status="stable"
        description="Dismissible toast notifications in four feedback variants. Tooltips anchored to any side of a trigger element."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Toast · Tooltip" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Icon", target: "svg|0", side: "top", description: "Status icon, coloured by the intent." },
                  { label: "Message", target: "div.flex-1", side: "top", description: "A short sentence about what happened, ideally in the past tense." },
                  { label: "Dismiss", target: "button", side: "top", description: "Lets people remove the toast right away." },
                  { label: "Timer bar", target: "[class*=\"h-[3px]\"]", side: "bottom", description: "3px bar that counts down and closes the toast after 4 seconds." },
                ]}
                preview={
                  <ToastAnatomyPreview />
                }
              />
              <ToastTooltipSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="toast-tooltip" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <ToastTooltipShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Use Toast to confirm a completed background action (scan started, settings saved).",
                  "Use Tooltip for short, contextual hints on icon buttons or truncated text.",
                  "Keep toast copy to a single sentence; route detail to a notification center instead.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Auto-dismiss toasts after 4 seconds; let the user close earlier with the × button." },
                  { type: "dont", text: "Don't use toasts for errors that require user action — use an inline error or modal." },
                  { type: "do",   text: "Anchor tooltips to the side with most available space and keep the default 300ms delay before showing." },
                  { type: "dont", text: "Don't put interactive controls inside a tooltip; they dismiss on mouseout." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><ToastTooltipExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

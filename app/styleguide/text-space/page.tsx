import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { TextSpaceShowcase, TextSpaceExamples } from "@/sections/text-space/text-space-showcase";
import { TextSpaceSpecs } from "@/sections/text-space/text-space-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { TextSpace } from "@/components/ui/text-space";

export const metadata: Metadata = {
  title: "Text Space" };

export default function TextSpacePage() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Text Space"
        status="alpha"
        description="Rich-text editing surface with simple and full toolbar configurations, shown across enabled, disabled, and error states."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Text Space" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Toolbar", target: "[role=\"toolbar\"]", side: "top", description: "Grouped formatting controls: Simple (one row) or Full (with type settings)." },
                  { label: "Editor", target: "[contenteditable]", side: "left", description: "Multi-line editable area for rich text and keyboard shortcuts." },
                  { label: "Container", target: ":scope > *", side: "right", description: "Rounded surface; its border turns red on error and dims when disabled." },
                ]}
                preview={
                  <div className="w-96"><TextSpace label="Remediation notes" placeholder="Describe the remediation steps…" /></div>
                }
              />
              <TextSpaceSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="text-space" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <TextSpaceShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Use Simple when users need basic formatting (bold, list, link) — comment fields or notes.",
                  "Use Full for long-form writing such as reports or vulnerability write-ups.",
                  "Apply Error state when validation fails after submit, with a matching inline message.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Keep a consistent toolbar set within one product area so muscle memory builds." },
                  { type: "dont", text: "Don't expose every formatting option — curate the subset that matches the content type." },
                  { type: "do",   text: "Preserve pasted plain-text formatting and strip hostile HTML." },
                  { type: "dont", text: "Don't use Text Space for short single-line inputs; use Text Field instead." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><TextSpaceExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

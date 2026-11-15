import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { TextareaShowcase, TextareaExamples } from "@/sections/textarea/textarea-showcase";
import { TextareaSpecs } from "@/sections/textarea/textarea-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Textarea",
};

export default function TextareaPage() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Textarea"
        status="beta"
        description="Multi-line text input. Use when the response is longer than one short phrase — descriptions, notes, reproduction steps."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Textarea" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Label", target: "label", side: "top", description: "11px label that names the field." },
                  { label: "Field", target: "textarea", side: "left", description: "Bordered surface with a vertical resize handle at the bottom right." },
                  { label: "Helper", target: "div.mt-1 > div:first-child", side: "bottom", description: "Hint under the field; replaced by an error message in the error state." },
                  { label: "Counter", target: "div.mt-1 > div:last-child", side: "bottom", description: "Optional character count, turning amber near the limit." },
                ]}
                preview={
                  <div className="w-72"><Textarea label="Finding description" defaultValue="Port 22 is open to the internet on the staging bastion." helperText="Describe the impact." showCounter maxLength={200} /></div>
                }
              />
              <TextareaSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="textarea" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <TextareaShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Bug descriptions, findings, change-request notes.",
                  "Comment threads where messages span multiple lines.",
                  "Custom rule definitions or JSON snippets (paired with a monospace tweak).",
                  "Address fields where multiple lines are normal.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Use a placeholder to hint at the expected structure (\"1. Visit … 2. Click …\")." },
                  { type: "dont", text: "Don't use a Textarea for a one-line input — use Text Field, the resize handle is misleading." },
                  { type: "do",   text: "Show a counter when the limit is meaningful — it pre-empts errors instead of catching them." },
                  { type: "dont", text: "Don't disable resize for fields where 100+ char responses are common; users adjust to their content." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><TextareaExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

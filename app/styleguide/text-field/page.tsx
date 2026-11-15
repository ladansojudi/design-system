import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { TextFieldShowcase, TextFieldExamples } from "@/sections/text-field/text-field-showcase";
import { TextFieldSpecs } from "@/sections/text-field/text-field-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { TextField } from "@/components/ui/text-field";

export const metadata: Metadata = {
  title: "Text Field",
};

export default function TextFieldPage() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Text Field"
        status="beta"
        description="Filled and outlined variants across five states. Text Space provides a rich-text editing surface with simple and full toolbar configurations."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Text Field" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Label", target: "label", side: "top", description: "Always-visible name, floating on the border (outlined) or inside the surface (filled)." },
                  { label: "Container", target: "[class*=\"rounded-md\"]", side: "left", description: "The surface that holds the input; its border and background show the state." },
                  { label: "Input", target: "input", side: "bottom", description: "Where the value goes. Reflects focus, error and disabled states." },
                  { label: "Helper text", target: "div.mt-1", side: "bottom", description: "Short caption under the field: a hint, or an icon and a red message on error." },
                ]}
                preview={
                  <div className="w-72"><TextField variant="outlined" label="Asset name" defaultValue="api.example.com" helperText="Use the full hostname." /></div>
                }
              />
              <TextFieldSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="text-field" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <TextFieldShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Use Outlined for standalone forms where each field needs a visible boundary.",
                  "Use Filled for dense forms or sidebars where a softer surface fits the layout.",
                  "Always show the label — placeholders alone fail accessibility and memory recall.",
                  "Pair the Error state with an inline message that explains the rule and shows a valid example.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Keep labels short and descriptive (“Asset name”, not “Please enter asset name here”)." },
                  { type: "dont", text: "Don't rely on placeholder text as the only label — it disappears on typing." },
                  { type: "do",   text: "Write error messages in plain language — “Must be at least 8 characters” beats “Invalid input”." },
                  { type: "dont", text: "Don't rely on color alone for errors; always pair the red border with an icon + message." },
                  { type: "do",   text: "Validate on blur or submit, and clear the error the moment the user fixes it." },
                  { type: "dont", text: "Don't disable a field without explaining why; prefer read-only or a helper text." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><TextFieldExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

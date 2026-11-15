import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { AlertShowcase, AlertExamples } from "@/sections/alert/alert-showcase";
import { AlertSpecs } from "@/sections/alert/alert-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { Alert } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Alert" };

export default function AlertPage() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Alert"
        status="beta"
        description="Persistent in-page message that announces state the user must read or act on. Distinct from Toast (temporal) and Banner (page-level)."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Alert" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Surface", target: ":scope > *", side: "left", description: "Tinted background and matching border in the variant's colours." },
                  { label: "Icon", target: "svg|0", side: "top", description: "Icon that matches the variant: info, check, triangle or octagon." },
                  { label: "Title (optional)", target: "div.font-semibold", side: "top", description: "Short headline in 4\u20138 words." },
                  { label: "Description", target: "div.flex-1 > div:nth-child(2)", side: "right", description: "One sentence with the actionable detail." },
                  { label: "Action (optional)", target: "div.flex-1 > div:nth-child(3)", side: "bottom", description: "Inline link or button that takes the user to the next step." },
                  { label: "Dismiss (optional)", target: "button", side: "top", description: "Close button, only for alerts that are safe to ignore." },
                ]}
                preview={
                  <div className="w-[480px] max-w-full">
                    <Alert variant="warning" title="2 assets not scanned in 30 days" dismissible action={<a href="#" className="text-snt-12 font-medium underline">Schedule a scan</a>}>
                      Schedule a scan to keep the exposure score current.
                    </Alert>
                  </div>
                }
              />
              <AlertSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="alert" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <AlertShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Form-level validation summary at the top of a section.",
                  "Configuration warnings on settings pages (\"2FA recommended\", \"quota almost exceeded\").",
                  "Inline result of a long-running action (\"Scan completed\", \"Export failed\").",
                  "Empty-state nudges inside cards or tables.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Match the variant to the actual severity — green for success, red for failure." },
                  { type: "dont", text: "Don't use Alert for transient confirmations — use Toast instead, alerts stick around." },
                  { type: "do",   text: "Keep the message to one sentence. If you need more, link to the relevant doc or modal." },
                  { type: "dont", text: "Don't show more than one Alert in the same region at once — collapse multiple errors into a list." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><AlertExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

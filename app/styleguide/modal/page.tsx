import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ModalShowcase, ModalExamples } from "@/sections/modal/modal-showcase";
import { ModalSpecs } from "@/sections/modal/modal-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { ModalAnatomyPreview } from "@/sections/modal/modal-showcase";

export const metadata: Metadata = {
  title: "Modal",
};

export default function Page() {
  return (
    <>
      <PageHero category="Components"
        categoryHref="/styleguide/components" title="Modal" status="stable" description="Overlay dialog for focused interactions — Alert, Confirm (+ destructive), Onboarding and Detail variants."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Modal" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                layout="stacked"
                parts={[
                  { label: "Backdrop", target: ":scope > div", side: "top", description: "Dimmed layer that blocks the page behind. Clicking it closes non-destructive modals." },
                  { label: "Container", target: ":scope > div > div", side: "right", description: "Centred card with rounded corners and a shadow; the width follows the size." },
                  { label: "Header", target: ":scope > div > div > div:first-child", side: "top", description: "Title on the left, close button on the right." },
                  { label: "Icon badge", target: "[class*=\"size-10\"]", side: "left", description: "Round 40px badge that signals intent: success, warning or destructive." },
                  { label: "Title + body", target: "[class*=\"font-semibold\"]", side: "left", description: "A short title and one or two sentences saying what will happen." },
                  { label: "Actions", target: ":scope > div > div > div:last-child", side: "bottom", description: "Cancel on the left, the main action on the right. Destructive actions use the destructive button." },
                ]}
                preview={
                  <ModalAnatomyPreview />
                }
              />
              <ModalSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="modal" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <ModalShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Use a one-button modal (title, message, \u201cGot it\u201d) for passive confirmation of a background action (scan complete, settings saved).",
                  "Use a confirm modal (Cancel + action) for reversible but important changes (restart monitoring, unassign user).",
                  "Use a confirm modal with a destructive Button for irreversible actions (delete asset, revoke API token).",
                  "Use a gated modal (Switches + a disabled primary Button) for short, focused data entry that requires legal acknowledgments or authority confirmation — the primary button stays disabled until every toggle is on.",
                  "Use the lg size with a scrollable ModalBody for a deep-dive view where the user needs to inspect data before acting (CVE detail, finding timeline).",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Close on Esc and on backdrop click (the defaults) — for destructive confirms, set closeOnBackdrop={false}." },
                  { type: "dont", text: "Don't stack modals; if one modal triggers another, redesign the flow." },
                  { type: "do",   text: "Use red primary button only when the action is genuinely irreversible." },
                  { type: "dont", text: "Don't put more than two primary actions in the footer; split into multiple steps instead." },
                  { type: "do",   text: "Keep Form modals under ~400 px tall; scroll-trap longer content inside the body." },
                  { type: "dont", text: "Don't use a modal for navigation between sections — use a page route." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><ModalExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

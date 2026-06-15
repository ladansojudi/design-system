import type { Metadata } from "next";
import { AlertTriangle, X } from "lucide-react";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { AlertShowcase, AlertExamples } from "@/sections/alert/alert-showcase";
import { AlertSpecs } from "@/sections/alert/alert-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Alert — Design System",
};

export default function AlertPage() {
  return (
    <>
      <PageHero
        category="Atoms"
        title="Alert"
        status="beta"
        description="Persistent in-page message that announces state the user must read or act on. Distinct from Toast (temporal) and Banner (page-level)."
        actions={<OpenInFigma />}
        tabs={<ViewModeTabs />}
      />

      <PageBody>


      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <AlertShowcase />

            <Anatomy
              parts={[
                { label: "Surface",            description: "Tinted background + matching border in the variant's scale-50/200 colors." },
                { label: "Icon",               description: "Severity icon (Info, CheckCircle, Triangle, Octagon) tied to the variant." },
                { label: "Title (optional)",   description: "Short headline summarizing the message in 4–8 words." },
                { label: "Description",        description: "One sentence with the actionable detail. Avoid long paragraphs." },
                { label: "Action (optional)",  description: "Inline link or button taking the user to the next step." },
                { label: "Dismiss (optional)", description: "Close button — only for alerts the user can safely ignore." },
              ]}
              preview={
                <div className="flex items-start gap-3 rounded-md border border-s4e-scale-yellow-200 bg-s4e-scale-yellow-50 px-4 py-3 w-[320px]">
                  <AlertTriangle size={16} className="text-s4e-scale-yellow-700 shrink-0 mt-px" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-s4e-scale-yellow-700 leading-tight">
                      Quota almost exceeded
                    </div>
                    <div className="text-[12px] text-s4e-scale-yellow-700 mt-1 leading-relaxed">
                      You have used 9.2 GB of your 10 GB allowance.
                    </div>
                    <button
                      type="button"
                      className="mt-2.5 text-[11px] font-medium underline text-s4e-scale-yellow-700"
                    >
                      Upgrade plan
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label="Dismiss"
                    className="shrink-0 p-1 -m-1 rounded text-s4e-scale-yellow-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              }
            />

            <AlertSpecs />

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
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <AlertExamples />
          </div>
        }
      />
      </PageBody>
    </>
  );
}

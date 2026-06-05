import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ToastTooltipShowcase, ToastTooltipExamples } from "@/sections/toast-tooltip/toast-tooltip-showcase";
import { ToastTooltipSpecs } from "@/sections/toast-tooltip/toast-tooltip-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Toast · Tooltip — Design System",
};

export default function ToastTooltipPage() {
  return (
    <>
      <PageHero
        category="Atoms"
        title="Toast · Tooltip"
        status="stable"
        description="Dismissible toast notifications in four feedback variants. Tooltips anchored to any side of a trigger element."
        actions={<OpenInFigma />}
        tabs={<ViewModeTabs />}
      />

      <PageBody>


      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <ToastTooltipShowcase />

            <Anatomy
              parts={[
                { label: "Icon",       description: "Status glyph colored with the matching feedback scale." },
                { label: "Message",    description: "Short sentence describing what happened — ideally a past-tense verb." },
                { label: "Dismiss",    description: "Close button that lets the user remove the toast immediately." },
                { label: "Timer bar",  description: "3px bar at the bottom that counts down and auto-dismisses after 4 seconds." },
              ]}
            >
              <div className="w-80 overflow-hidden bg-s4e-surface-app border border-s4e-neutral-divider-10 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 px-4 py-3">
                  <CircleCheck size={20} className="text-s4e-feedback-success shrink-0" />
                  <span className="flex-1 text-[14px] font-semibold text-s4e-text-primary">Scan completed successfully.</span>
                </div>
                <div className="h-[3px] w-full bg-s4e-neutral-grey-100">
                  <div className="h-full bg-s4e-feedback-success w-1/3" />
                </div>
              </div>
            </Anatomy>

            <ToastTooltipSpecs />

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
                { type: "do",   text: "Anchor tooltips to the side with most available space and add 200ms delay before showing." },
                { type: "dont", text: "Don't put interactive controls inside a tooltip; they dismiss on mouseout." },
              ]}
            />
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <ToastTooltipExamples />
          </div>
        }
      />
      </PageBody>
    </>
  );
}

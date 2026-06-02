import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { SpinnerShowcase, SpinnerExamples } from "@/sections/spinner/spinner-showcase";
import { SpinnerSpecs } from "@/sections/spinner/spinner-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Spinner — Design System",
};

export default function SpinnerPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader
        category="Atoms"
        title="Spinner"
        status="beta"
        description="Indeterminate loading indicator. Used when the operation duration is unknown — for known progress, use a progress bar."
      />

      <div className="mt-12 sm:mt-16">
        <ViewModeTabs />
      </div>

      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <SpinnerShowcase />

            <Anatomy
              parts={[
                { label: "Ring",  description: "3/4 circle with a transparent quarter that rotates 360° per second." },
                { label: "Color", description: "Brand for primary actions, neutral for ambient loading, white on dark surfaces." },
                { label: "Size",  description: "xs (12px), sm (16px), md (24px), lg (36px). Match the surrounding text size." },
              ]}
            />

            <SpinnerSpecs />

            <UseCases
              items={[
                "Inside a button while an action is in flight.",
                "Inline with text describing what is being loaded (\"Scanning 1,248 endpoints…\").",
                "Centered on an empty surface while data is fetching.",
                "Replacing a clickable element to block interaction during a request.",
              ]}
            />

            <Guidelines
              items={[
                { type: "do",   text: "Pair the spinner with a label whenever the surface allows it — \"Saving…\" tells the user what is happening." },
                { type: "dont", text: "Don't show spinners for operations under ~300ms — flicker is worse than instant." },
                { type: "do",   text: "Match spinner size to the text or button it lives in (xs for inline, sm for button, lg for full-surface)." },
                { type: "dont", text: "Don't use a spinner where a skeleton fits better — skeletons preserve layout, spinners only signal activity." },
              ]}
            />
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <SpinnerExamples />
          </div>
        }
      />
    </div>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { BadgeTagShowcase, BadgeTagExamples } from "@/sections/badge-tag/badge-tag-showcase";
import { BadgeTagSpecs } from "@/sections/badge-tag/badge-tag-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Badge · Tag — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader category="Atoms" title="Badge · Tag" status="stable" description="Small labeling elements used to categorize or annotate content." />

      <div className="mt-12 sm:mt-16">
        <ViewModeTabs />
      </div>

      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <BadgeTagShowcase />

            <Anatomy
              parts={[
                { label: "Dot (optional)", description: "7px colored circle that reinforces the badge color on either end." },
                { label: "Label",          description: "Short noun — one or two words describing the category or status." },
                { label: "Surface",        description: "Filled pill or outlined border depending on the variant." },
              ]}
            >
              <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium bg-s4e-scale-green-50 text-s4e-scale-green-600">
                <span className="w-[7px] h-[7px] rounded-full bg-s4e-scale-green-500 shrink-0" />
                Success
              </div>
            </Anatomy>

            <BadgeTagSpecs />

            <UseCases
              items={[
                "Label items in lists, tables, or cards — like asset type, environment, or status.",
                "Use the dot variant when color alone carries meaning; it doubles as an accessibility cue.",
                "Use filled for dense layouts; outlined when you need a lighter visual weight.",
              ]}
            />

            <Guidelines
              items={[
                { type: "do",   text: "Keep labels short — one or two words, Title Case or lowercase consistently." },
                { type: "dont", text: "Don't use severity colors (red, amber) for neutral tags; reserve them for risk." },
                { type: "do",   text: "Group badges with consistent spacing (4–6px) when stacking multiple." },
                { type: "dont", text: "Don't stack more than 3 badges on a single row; collapse the rest into +N." },
              ]}
            />
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <BadgeTagExamples />
          </div>
        }
      />
    </div>
  );
}

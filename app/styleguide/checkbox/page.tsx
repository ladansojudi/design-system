import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { CheckboxShowcase, CheckboxExamples } from "@/sections/checkbox/checkbox-showcase";
import { CheckboxSpecs } from "@/sections/checkbox/checkbox-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Checkbox — Design System",
};

export default function CheckboxPage() {
  return (
    <>
      <PageHero
        category="Atoms"
        title="Checkbox"
        status="beta"
        description="Independent on/off control used for multi-select lists and single-option toggles. Indeterminate state communicates a partial parent selection."
        actions={<OpenInFigma />}
        tabs={<ViewModeTabs />}
      />

      <PageBody>


      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <CheckboxShowcase />

            <Anatomy
              parts={[
                { label: "Box",           description: "18px square with 3px radius. Empty when off, filled with check or minus when on." },
                { label: "Check / Minus", description: "12px icon inside the box. Minus indicates indeterminate (partial)." },
                { label: "Label",         description: "13px text aligned to the top of the box. Click target extends to the whole label." },
                { label: "Description",   description: "Optional 11px helper below the label, in disabled color." },
              ]}
              preview={
                <label className="flex items-start gap-2.5 w-[280px]">
                  <span className="relative inline-flex items-center justify-center mt-[1px]">
                    <span className="w-[18px] h-[18px] rounded-[3px] flex items-center justify-center bg-s4e-btn-primary-600">
                      <Check size={12} className="text-white" />
                    </span>
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[14px] leading-tight text-s4e-text-primary">
                      Enable real-time alerts
                    </span>
                    <span className="block text-[11px] text-s4e-text-disabled mt-0.5 leading-snug">
                      Notifies you within seconds when a critical finding lands.
                    </span>
                  </span>
                </label>
              }
            />

            <CheckboxSpecs />

            <UseCases
              items={[
                "Selecting multiple rows in a table or list.",
                "Granular notification or feature opt-ins on a settings page.",
                "Filter sidebar where each filter is independently togglable.",
                "Parent / child trees with an indeterminate \"select all\" toggle.",
              ]}
            />

            <Guidelines
              items={[
                { type: "do",   text: "Use Checkbox for independent multi-select. Use Radio when the options are mutually exclusive." },
                { type: "dont", text: "Don't use a single Checkbox for a setting that takes effect immediately — that's a Switch." },
                { type: "do",   text: "Make the label clickable — extending the hit target is more accessible than a 18px box alone." },
                { type: "dont", text: "Don't show only icons or values without labels — checkbox groups need text to be scannable." },
              ]}
            />
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <CheckboxExamples />
          </div>
        }
      />
      </PageBody>
    </>
  );
}

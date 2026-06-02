import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { TextareaShowcase, TextareaExamples } from "@/sections/textarea/textarea-showcase";
import { TextareaSpecs } from "@/sections/textarea/textarea-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Textarea — Design System",
};

export default function TextareaPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader
        category="Atoms"
        title="Textarea"
        status="beta"
        description="Multi-line text input. Use when the response is longer than one short phrase — descriptions, notes, reproduction steps."
      />

      <div className="mt-12 sm:mt-16">
        <ViewModeTabs />
      </div>

      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <TextareaShowcase />

            <Anatomy
              parts={[
                { label: "Label",   description: "11px label that names the field. Always present unless the surrounding context is obvious." },
                { label: "Field",   description: "Bordered surface with internal padding. Vertical resize handle in the bottom-right." },
                { label: "Counter", description: "Optional character count, right-aligned. Turns amber as the user approaches the limit." },
                { label: "Helper",  description: "10.5px helper line below. Replaced by an error message when the field is in error state." },
              ]}
              preview={
                <div className="w-[300px]">
                  <label className="block text-[11px] font-medium mb-1.5 text-s4e-text-secondary">
                    Finding description
                  </label>
                  <div className="block w-full rounded-md px-3 py-2 text-[14px] text-s4e-text-primary bg-s4e-surface-row border border-s4e-neutral-grey-300 min-h-[88px] leading-relaxed">
                    Found exposed credentials in the staging .env file.
                  </div>
                  <div className="mt-1 flex items-start justify-between gap-2">
                    <div className="text-[10.5px] text-s4e-text-disabled flex-1">Markdown is supported.</div>
                    <div className="text-[10.5px] text-s4e-text-disabled tabular-nums">52/200</div>
                  </div>
                </div>
              }
            />

            <TextareaSpecs />

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
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <TextareaExamples />
          </div>
        }
      />
    </div>
  );
}

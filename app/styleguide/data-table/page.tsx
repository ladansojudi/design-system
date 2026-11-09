import type { Metadata } from "next";
import { Info, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { DataTableShowcase, DataTableExamples } from "@/sections/data-table/data-table-showcase";
import { DataTableSpecs } from "@/sections/data-table/data-table-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";

export const metadata: Metadata = {
  title: "Data Table — Sentinel Design System",
};

export default function Page() {
  return (
    <>
      <PageHero category="Organisms" title="Data Table" status="stable" description="Dashboard table surface for listing threats, assets and findings — configurable header with badge, description and View all link."
        actions={<OpenInFigma />}
        tabs={<ViewModeTabs />}
      />

      <PageBody>


      <ModeAware
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <DataTableShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Use on dashboards to surface the first N rows of a larger list with a View all link.",
                  "Use a badge when the widget benefits from a state cue (Live, New detections, Beta data).",
                  "Always include the description — it's the only line that tells the user what the list is filtered by.",
                  "Add an info tooltip next to any column whose value is ambiguous or product-specific.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Keep titles short (2–3 words). Use the description for context, not the title." },
                  { type: "dont", text: "Don't stack more than one badge in the header — it dilutes meaning." },
                  { type: "do",   text: "Show View all when the backing dataset exceeds the rendered page size." },
                  { type: "dont", text: "Don't hide the description — it's a required part of the top header, not a decoration." },
                  { type: "do",   text: "Truncate long cells with ellipsis and expose full text on hover via tooltip." },
                  { type: "dont", text: "Don't remove the paginator even when there's a single page — show the total range." },
                ]}
              />
            </DocSection>
            <DocSection title="Specs">
              <Anatomy
                parts={[
                  { label: "Top header",        description: "Grey strip with title, info tooltip, description, optional badge and optional View all link." },
                  { label: "Info tooltip",      description: "13px Info icon placed after the title, column or row text — reveals context on hover." },
                  { label: "Badge (optional)",  description: "Pill in the header that tags the widget (Live, New, Beta…) with a colored dot." },
                  { label: "View all (optional)", description: "Right-aligned link that navigates to the full list view." },
                  { label: "Column headers",    description: "Uppercase 11px labels; info tooltip available for ambiguous columns." },
                  { label: "Row",               description: "Text cells + severity badge; hover highlight makes the row selectable." },
                  { label: "Row tooltip",       description: "When the cell text is truncated, the info icon sits right after the sentence so the pairing is unambiguous." },
                  { label: "Footer",            description: "Row-per-page selector + range indicator + prev/next paginator." },
                ]}
              >
                {/* Mini full table */}
                <div className="w-full max-w-2xl border border-snt-neutral-divider-10 rounded-xl bg-snt-surface-app">
                  {/* Header */}
                  <div className="flex items-center gap-3 px-5 py-3 bg-snt-neutral-grey-100 border-b border-snt-neutral-divider-10 rounded-t-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-snt-text-primary">Priority Actions</span>
                      <Info size={13} className="text-snt-text-disabled" />
                    </div>
                    <span className="text-[12px] text-snt-text-disabled flex-1 truncate">Security issues prioritized by risk growth.</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-snt-scale-yellow-50 text-snt-scale-yellow-700 text-[11px] font-medium">
                      <span className="w-[6px] h-[6px] rounded-full bg-snt-scale-yellow-500" />
                      Live
                    </span>
                    <button type="button" className="text-[12px] font-medium text-snt-brand-primary-500 underline underline-offset-2">View all</button>
                  </div>

                  {/* Column headers */}
                  <div className="grid grid-cols-[1fr_1fr_90px_80px] gap-3 px-5 py-2 border-b border-snt-neutral-divider-10">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-medium text-snt-text-disabled uppercase">Threats</span>
                      <Info size={11} className="text-snt-text-disabled" />
                    </div>
                    <span className="text-[11px] font-medium text-snt-text-disabled uppercase">Asset</span>
                    <span className="text-[11px] font-medium text-snt-text-disabled uppercase text-right">Date</span>
                    <span className="text-[11px] font-medium text-snt-text-disabled uppercase text-right">Severity</span>
                  </div>

                  {/* Sample rows */}
                  {[
                    { t: "SQL Injection",  a: "api.example.com",     d: "19.09.2024" },
                    { t: "SSL Expiring",   a: "zero.webapp.com", d: "19.09.2024" },
                  ].map((r) => (
                    <div key={r.t} className="grid grid-cols-[1fr_1fr_90px_80px] gap-3 items-center px-5 py-2.5 border-b border-snt-neutral-divider-10">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[12px] text-snt-text-primary truncate">{r.t}</span>
                        <Info size={11} className="text-snt-text-disabled shrink-0" />
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[12px] text-snt-text-primary truncate">{r.a}</span>
                        <Info size={11} className="text-snt-text-disabled shrink-0" />
                      </div>
                      <span className="text-[11px] text-snt-text-secondary text-right tabular-nums">{r.d}</span>
                      <div className="flex justify-end">
                        <div className="flex items-center justify-center rounded-md px-2 py-0.5 w-16 bg-snt-scale-red-50 border-l-[3px] border-snt-scale-red-500">
                          <span className="text-[11px] font-medium text-snt-scale-red-600">High</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Footer */}
                  <div className="flex items-center justify-end gap-3 px-5 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-snt-text-disabled">Row per page:</span>
                      <span className="inline-flex items-center gap-0.5 text-[11px] text-snt-text-primary">
                        3 <ChevronDown size={10} className="text-snt-text-disabled" />
                      </span>
                    </div>
                    <span className="text-[11px] text-snt-text-disabled tabular-nums">1–3 of 492</span>
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft size={12} className="text-snt-text-disabled" />
                      <ChevronRight size={12} className="text-snt-text-disabled" />
                    </div>
                  </div>
                </div>
              </Anatomy>
              <DataTableSpecs />
            </DocSection>
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><DataTableExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
    </>
  );
}

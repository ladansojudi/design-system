import type { Metadata } from "next";
import { Inbox, Plus } from "lucide-react";
import { PageHeader } from "@/components/styleguide/page-header";
import { EmptyStateShowcase, EmptyStateExamples } from "@/sections/empty-state/empty-state-showcase";
import { EmptyStateSpecs } from "@/sections/empty-state/empty-state-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Empty State — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader category="Organisms" title="Empty State" status="stable" description="Placeholder surface shown when a list or view has no content to display." />

      <div className="mt-12 sm:mt-16">
        <ViewModeTabs />
      </div>

      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <EmptyStateShowcase />

            <Anatomy
              parts={[
                { label: "Icon container",   description: "Circular badge with a themed background that sets the tone — neutral, warning, or alert." },
                { label: "Title",            description: "Short, human sentence that names the situation (e.g. \"No scans yet\")." },
                { label: "Description",      description: "One-line explanation of why the view is empty and how to move forward." },
                { label: "Primary action",   description: "Filled brand button for the main next step (start scan, retry, etc.)." },
                { label: "Secondary action", description: "Outlined button for an alternate path — clear filters, read docs, request access." },
              ]}
            >
              <div className="w-80 flex flex-col items-center text-center px-6 py-10 border border-s4e-neutral-divider-10 rounded-xl">
                <div className="w-14 h-14 rounded-full bg-s4e-neutral-grey-100 text-s4e-text-secondary flex items-center justify-center mb-4">
                  <Inbox size={24} />
                </div>
                <div className="text-[15px] font-semibold text-s4e-text-primary">No scans yet</div>
                <p className="mt-1.5 text-[13px] text-s4e-text-secondary">Run your first crawler to start collecting assets.</p>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-s4e-brand-primary-500 text-s4e-text-white text-[12px] font-medium"
                >
                  <Plus size={13} />
                  Start a scan
                </button>
              </div>
            </Anatomy>

            <EmptyStateSpecs />

            <UseCases
              items={[
                "Show when a table, list, or dashboard panel has no records yet (first-run state).",
                "Show when an applied filter or search returns zero results — offer a way to clear filters.",
                "Show when loading fails — use the alert tone and surface a Retry action.",
                "Show when the user lacks permissions — use the warning tone and provide a request-access path.",
                "Use the small variant inline inside cards or sub-sections where the full-height state would feel heavy.",
              ]}
            />

            <Guidelines
              items={[
                { type: "do",   text: "Always pair an empty state with at least one action — even if it's just a doc link." },
                { type: "dont", text: "Don't leave an empty table completely blank; use this component so the user knows it's intentional." },
                { type: "do",   text: "Match the tone to the cause: neutral for zero-data, warning for permissions, alert for errors." },
                { type: "dont", text: "Don't write vague titles like \"Nothing here\" — name the specific thing that's missing." },
                { type: "do",   text: "Keep the description to a single sentence explaining why and what to do next." },
                { type: "dont", text: "Don't use an empty state as a loading placeholder; use a skeleton while data is fetching." },
              ]}
            />
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <EmptyStateExamples />
          </div>
        }
      />
    </div>
  );
}

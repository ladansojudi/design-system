import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/styleguide/page-header";
import { SelectShowcase } from "@/sections/select/select-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Select — Design System",
};

export default function SelectPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto space-y-10">
      <PageHeader
        category="Atoms"
        title="Select"
        status="beta"
        description="Single-select dropdown for picking one value from a known list of options. For multi-select, free-form input or search, reach for Combobox (planned)."
      />

      <SelectShowcase />

      <Anatomy
        parts={[
          { label: "Label",          description: "Sits above the trigger. Always present unless the surrounding context makes the purpose obvious." },
          { label: "Trigger",        description: "Button-styled control that opens the popover. Shows the selected value or a placeholder." },
          { label: "Chevron",        description: "14px caret that rotates 180° when open — the only motion signal for state." },
          { label: "Popover",        description: "Floating list with options. Closes on outside click, escape, or selection." },
          { label: "Option",         description: "Selectable row with a check mark on the chosen entry. Disabled options are dimmed." },
          { label: "Helper / Error", description: "10.5px text below the trigger. Error message replaces helper when present." },
        ]}
        preview={
          <div className="w-[260px]">
            <label className="block text-[11px] font-medium mb-1.5 text-s4e-text-secondary">Region</label>
            <div className="relative">
              <div className="w-full flex items-center justify-between gap-2 h-9 px-3 rounded-md text-[13px] border border-s4e-brand-primary-600 bg-s4e-surface-row ring-2 ring-s4e-brand-primary-500/20">
                <span className="text-s4e-text-primary truncate">Europe (Frankfurt)</span>
                <ChevronDown size={14} className="text-s4e-text-disabled rotate-180" />
              </div>
              <div className="absolute left-0 right-0 mt-1.5 rounded-md border border-s4e-neutral-divider-10 bg-s4e-surface-row shadow-s4e-lg">
                <div className="px-3 py-2 text-[13px] text-s4e-text-primary bg-s4e-brand-primary-500/8">Europe (Frankfurt)</div>
                <div className="px-3 py-2 text-[13px] text-s4e-text-primary">US East (Virginia)</div>
                <div className="px-3 py-2 text-[13px] text-s4e-text-primary">US West (Oregon)</div>
              </div>
            </div>
            <div className="mt-1 text-[10.5px] text-s4e-text-disabled">Data is processed in this region only.</div>
          </div>
        }
      />

      <UseCases
        items={[
          "Choosing a region, plan, or category from a fixed list.",
          "Filtering a table by a single dimension (status, severity, owner).",
          "Settings forms where each row picks one value from 3–20 options.",
          "Sort order pickers (most recent / oldest / alphabetical).",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Prefer Radio when there are 2–4 options that the user benefits from seeing all at once." },
          { type: "dont", text: "Don't use Select for binary choices — that's a Switch or Checkbox." },
          { type: "do",   text: "Use a helper line to set expectations before the user opens the menu (\"Data is processed in this region only\")." },
          { type: "dont", text: "Don't pre-select a destructive option as the default — the user shouldn't accidentally delete by hitting Enter." },
        ]}
      />
    </div>
  );
}

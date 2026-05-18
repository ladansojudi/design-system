import type { Metadata } from "next";
import { Tag, ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/styleguide/page-header";
import { FilterBarShowcase } from "@/sections/filter-bar/filter-bar-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Filter Bar — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader category="Molecules" title="Filter Bar" status="stable" description="Horizontal toolbar for applying and managing active filters." />

      <FilterBarShowcase />

      <Anatomy
        parts={[
          { label: "Filter pill",   description: "Selectable chip with icon + label; turns blue when a value is active." },
          { label: "Active count",  description: "Small numeric badge inside the pill indicating how many values are applied." },
          { label: "Overflow (+ N)",description: "Dashed pill that reveals extra filters hidden due to space." },
          { label: "Actions",       description: "Right-aligned buttons (Export, Bulk Actions) separated from filters." },
        ]}
      >
        <div className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-s4e-brand-primary-500 bg-s4e-btn-primary-50 text-s4e-brand-primary-500 text-[12px] font-medium">
          <Tag size={12} className="opacity-70" />
          <span>Tags</span>
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-s4e-brand-primary-500 text-white text-[10px] font-bold">2</span>
          <ChevronDown size={11} className="opacity-50" />
        </div>
      </Anatomy>

      <UseCases
        items={[
          "Place directly above a data table or list to refine its rows.",
          "Use overflow mode when filters exceed the row width; surface the most-used four inline.",
          "Pair with a search input when users need both free-text and structured filtering.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Show a Clear button whenever one or more filters are active." },
          { type: "dont", text: "Don't wrap filters onto a second row by default; use overflow + expand instead." },
          { type: "do",   text: "Keep action buttons (Export, Bulk) pinned to the right even when filters scroll." },
          { type: "dont", text: "Don't change the filter set between states; let overflow handle small viewports." },
        ]}
      />
    </div>
  );
}

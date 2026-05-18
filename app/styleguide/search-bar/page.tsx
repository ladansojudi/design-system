import type { Metadata } from "next";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/styleguide/page-header";
import { SearchBarShowcase } from "@/sections/search-bar/search-bar-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Search Bar — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader category="Molecules" title="Search Bar" status="stable" description="Input combined with search affordance for filtering and finding content." />

      <SearchBarShowcase />

      <Anatomy
        parts={[
          { label: "Search icon",  description: "14px magnifier on the left — turns primary blue when focused." },
          { label: "Input",        description: "Single-line text field for the query; bg is white (default) or grey (ghost)." },
          { label: "Clear (optional)", description: "× appears on the right only when the input has value." },
        ]}
      >
        <div className="flex items-center gap-2 rounded-lg px-3 h-9 w-72 border border-s4e-neutral-divider-10 bg-s4e-surface-app">
          <Search size={14} className="text-s4e-text-disabled shrink-0" />
          <span className="flex-1 text-[13px] text-s4e-text-disabled">Search assets…</span>
        </div>
      </Anatomy>

      <UseCases
        items={[
          "Use Default when the search bar is the main surface on a page (e.g., asset list).",
          "Use Ghost inside top bars and filter toolbars where the input should recede visually.",
          "Debounce queries by 300 ms before firing a request to avoid jittery results.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Use clear placeholder text that hints at what can be searched (“Search assets, CVEs…”)." },
          { type: "dont", text: "Don't add a separate Search button — Enter/Return or live filtering is enough." },
          { type: "do",   text: "Show the × clear button only when the input has a value, not when it's empty." },
          { type: "dont", text: "Don't combine a search bar with advanced filters in the same input; use the Filter Bar for that." },
        ]}
      />
    </div>
  );
}

import type { Metadata } from "next";
import { Bold, Italic, Underline } from "lucide-react";
import { PageHeader } from "@/components/styleguide/page-header";
import { TextSpaceShowcase } from "@/sections/text-space/text-space-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Text Space — s4e Design System",
};

export default function TextSpacePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto space-y-10">
      <PageHeader
        category="Organisms"
        title="Text Space"
        description="Rich-text editing surface with simple and full toolbar configurations, shown across enabled, disabled, and error states."
      />

      <TextSpaceShowcase />

      <Anatomy
        parts={[
          { label: "Toolbar",    description: "Grouped formatting controls — Simple (one row) or Full (with type settings)." },
          { label: "Editor",     description: "Multi-line editable surface that accepts rich text and keyboard shortcuts." },
          { label: "Container",  description: "Rounded surface with border that shifts to Error or Disabled when needed." },
        ]}
      >
        <div className="w-80 rounded-lg border border-s4e-neutral-divider-10 bg-s4e-surface-app overflow-hidden">
          <div className="flex items-center gap-1 px-3 py-1.5 border-b border-s4e-neutral-divider-10">
            <Bold size={13} className="text-s4e-text-secondary" />
            <Italic size={13} className="text-s4e-text-secondary" />
            <Underline size={13} className="text-s4e-text-secondary" />
          </div>
          <div className="px-4 py-3 h-20 text-[12px] text-s4e-text-disabled">Write something awesome…</div>
        </div>
      </Anatomy>

      <UseCases
        items={[
          "Use Simple when users need basic formatting (bold, list, link) — comment fields or notes.",
          "Use Full for long-form writing such as reports or vulnerability write-ups.",
          "Apply Error state when validation fails after submit, with a matching inline message.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Keep a consistent toolbar set within one product area so muscle memory builds." },
          { type: "dont", text: "Don't expose every formatting option — curate the subset that matches the content type." },
          { type: "do",   text: "Preserve pasted plain-text formatting and strip hostile HTML." },
          { type: "dont", text: "Don't use Text Space for short single-line inputs; use Text Field instead." },
        ]}
      />
    </div>
  );
}

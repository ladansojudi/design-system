import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { ShadowScale } from "@/sections/shadow/shadow-scale";
import { UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Shadow — Design System",
};

export default function ShadowPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader
        category="Atoms"
        title="Shadow"
        status="stable"
        description="Elevation scale for surfacing UI above the page. Each level pairs to an interaction layer — pick by purpose, not by look."
      />
      <ShadowScale />

      <UseCases
        items={[
          "xs — quietly separate stationary surfaces (toolbar from background, card from page).",
          "sm — interactive cards on hover, dropdown popovers, tooltips.",
          "md — sticky surfaces that float over content (top bar after scroll, sticky filter row).",
          "lg — drawers and sidebars sliding in from edges.",
          "xl — modal dialogs centered on top of a scrim.",
          "2xl — popovers and dropdowns that need clear separation on a busy canvas.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Use a single elevation level per surface — never stack xs+md to fake depth." },
          { type: "dont", text: "Don't apply shadow to fixed UI chrome (sidebar, tabs); a 1px divider reads cleaner." },
          { type: "do",   text: "Increase shadow on hover only when the surface itself moves up — otherwise the depth lies." },
          { type: "dont", text: "Don't invent custom shadows for one-off cards — if the scale doesn't fit, the design probably doesn't either." },
        ]}
      />
    </div>
  );
}

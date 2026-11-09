import type { Metadata } from "next";
import { LayoutDashboard } from "lucide-react";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { SidebarShowcase } from "@/sections/sidebar/sidebar-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { DocSection } from "@/components/styleguide/doc-section";

export const metadata: Metadata = {
  title: "Sidebar — Sentinel Design System",
};

export default function Page() {
  return (
    <>
      <PageHero category="Components" categoryHref="/styleguide/components" title="Sidebar" status="stable" description="Primary navigation panel with expanded and collapsed variants, grouped links, and a plan-upgrade footer."
        actions={<OpenInFigma />}
      />

      <PageBody>
        <div className="space-y-16">
          <DocSection title="Examples">
            <SidebarShowcase />
          </DocSection>
          <DocSection title="Usage">
            <UseCases
          items={[
            "Use the Expanded variant as the default on desktop so users can scan labels at a glance.",
            "Use the Collapsed variant to save horizontal space in data-heavy views (tables, graphs).",
            "Persist the user's last choice (expanded/collapsed) per device so sessions feel consistent.",
            "Show the Upgrade footer only to Free / trial users — hide it completely for Pro, Business and Enterprise plans.",
            "Show onboarding progress in the footer until the user hits 100%; hide it after completion.",
          ]}
        />
            <Guidelines
          items={[
            { type: "do",   text: "Keep labels short (one or two words) so items don't truncate at 240px width." },
            { type: "dont", text: "Don't add more than five groups; introduce a second-level menu instead." },
            { type: "do",   text: "Always show a tooltip with the label when the sidebar is collapsed." },
            { type: "dont", text: "Don't show the Upgrade footer to paying users — swap it for a compact plan summary or hide it altogether." },
            { type: "do",   text: "Use static brand/button tokens for badges (Pro, Enterprise) so they stay legible in dark mode." },
            { type: "dont", text: "Don't nest expandable menus deeper than two levels; consider a separate page instead." },
          ]}
        />
          </DocSection>
          <DocSection title="Specs">
            <Anatomy
          parts={[
            { label: "Logo + badge",   description: "Product mark on the left and a Plan badge (e.g. Pro) on the right." },
            { label: "Group label",    description: "Uppercase caption that separates sections of navigation." },
            { label: "Nav item",       description: "Icon + label row with optional chevron for expandable groups." },
            { label: "Active indicator", description: "Blue 2px rail on the left of the active item and a grey highlight." },
            { label: "Footer",         description: "Onboarding progress chip + upgrade CTA + version status." },
            { label: "Collapse toggle", description: "Small circular button on the outer edge that switches between variants." },
          ]}
        >
          <div className="flex items-center gap-2.5 h-9 w-56 px-4 bg-snt-neutral-grey-100 rounded-lg relative">
            <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-snt-brand-primary-500 rounded-r" />
            <LayoutDashboard size={16} className="text-snt-text-primary" />
            <span className="text-[14px] font-medium text-snt-text-primary">Dashboard</span>
          </div>
        </Anatomy>
          </DocSection>
        </div>
      </PageBody>
    </>
  );
}

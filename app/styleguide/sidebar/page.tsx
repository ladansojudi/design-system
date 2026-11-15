import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { SidebarShowcase } from "@/sections/sidebar/sidebar-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { DocSection } from "@/components/styleguide/doc-section";
import { SidebarAnatomyPreview } from "@/sections/sidebar/sidebar-showcase";

export const metadata: Metadata = {
  title: "Sidebar" };

export default function Page() {
  return (
    <>
      <PageHero category="Components" categoryHref="/styleguide/components" title="Sidebar" status="alpha" description="Primary app navigation: a workspace switcher, grouped links, set-up progress and the account, in an expanded or collapsed form."
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
            "Use the workspace switcher when people belong to more than one workspace or environment; show the current one by name.",
            "Show set-up progress in the footer until it reaches 100%, then remove it.",
          ]}
        />
            <Guidelines
          items={[
            { type: "do",   text: "Keep labels short (one or two words) so items don't truncate at 240px width." },
            { type: "dont", text: "Don't add more than five groups; introduce a second-level menu instead." },
            { type: "do",   text: "Always show a tooltip with the label when the sidebar is collapsed." },
            { type: "dont", text: "Don't put sales prompts (Upgrade, plan badges) in the navigation; keep them on the billing page." },
            { type: "do",   text: "Put the account at the bottom and the workspace at the top, where people expect them." },
            { type: "dont", text: "Don't nest expandable menus deeper than two levels; consider a separate page instead." },
          ]}
        />
          </DocSection>
          <DocSection title="Specs">
            <Anatomy
                layout="stacked"
                parts={[
                  { label: "Workspace switcher", target: "[class*=\"h-[60px]\"]", side: "top", description: "Mark, workspace name and environment on the left, a switch affordance on the right." },
                  { label: "Group label", target: "[class*=\"h-[26px]\"]|0", side: "left", description: "Small caption that separates sections of navigation." },
                  { label: "Nav item", target: "nav button|1", side: "left", description: "Icon and label row, with a chevron for expandable groups." },
                  { label: "Active item", target: "[class*=\"bg-snt-bg-brand-subtle\"]", side: "left", description: "Brand-tinted background and brand-coloured label on the current page." },
                  { label: "Footer", target: "[class*=\"h-[116px]\"]", side: "left", description: "Set-up progress and the account menu." },
                  { label: "Collapse toggle", target: "[aria-label$=\"sidebar\"]", side: "right", description: "Small round button on the outer edge that switches expanded and collapsed." },
                ]}
                preview={
                  <SidebarAnatomyPreview />
                }
              />
          </DocSection>
        </div>
      </PageBody>
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { TopBarShowcase } from "@/sections/top-bar/top-bar-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { DocSection } from "@/components/styleguide/doc-section";
import { TopBarAnatomyPreview } from "@/sections/top-bar/top-bar-showcase";

export const metadata: Metadata = {
  title: "Top Bar" };

export default function Page() {
  return (
    <>
      <PageHero category="Components" categoryHref="/styleguide/components" title="Top Bar" status="alpha" description="The persistent header of an authenticated page: where you are, global search, Ask AI, help, notifications and your account."
        actions={<OpenInFigma />}
      />

      <PageBody>
        <div className="space-y-16">
          <DocSection title="Examples">
            <TopBarShowcase />
          </DocSection>
          <DocSection title="Usage">
            <UseCases
          items={[
            "Use one Top bar on every authenticated page. It is the fixed place for search, notifications and the account.",
            "Show the current location as a breadcrumb on the left, so the page title doesn't need its own row.",
            "Put Ask AI next to search: both are ways to find an answer, one by keyword and one in plain language.",
            "Open the command palette from the search field and from ⌘K / Ctrl K.",
          ]}
        />
            <Guidelines
          items={[
            { type: "do",   text: "Keep the bar at 56px and the same on every page." },
            { type: "dont", text: "Open Ask AI automatically or animate it at rest; it responds to hover and focus only." },
            { type: "do",   text: "Show a count on the notification bell, capped at 9+, and a text label for screen readers (\"3 unread\")." },
            { type: "dont", text: "Put more than four icons on the right. Move the rest into the account menu." },
            { type: "do",   text: "Give Ask AI a shortcut (⌘J) and show it in the button on wide screens." },
            { type: "dont", text: "Put sales prompts (Upgrade) in the bar. Keep them on the billing page." },
          ]}
        />
          </DocSection>
          <DocSection title="Specs">
            <Anatomy
                layout="stacked"
                parts={[
                  { label: "Container", target: "header", side: "left", description: "A header landmark, 56px tall, across the page." },
                  { label: "Breadcrumb", target: "nav", side: "top", description: "Where you are; the last item is the current page." },
                  { label: "Global search", target: "button[class*=\"max-w-sm\"]", side: "top", description: "A field-shaped button that opens the command palette. Shows the ⌘K shortcut." },
                  { label: "Ask AI", target: ".snt-ai-button", side: "bottom", description: "A pill with a gradient hairline border and a sparkle. Quiet at rest, animated on hover and focus." },
                  { label: "Notifications", target: "button[aria-label^=\"Notifications\"]", side: "bottom", description: "Icon button with an unread count." },
                  { label: "Account", target: "button[aria-label=\"Account menu\"]", side: "top", description: "Avatar that opens the dropdown menu: profile, settings, sign out." },
                ]}
                preview={
                  <TopBarAnatomyPreview />
                }
              />
          </DocSection>
        </div>
      </PageBody>
    </>
  );
}

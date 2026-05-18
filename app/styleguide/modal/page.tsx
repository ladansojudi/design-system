import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { ModalShowcase } from "@/sections/modal/modal-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Modal — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader category="Organisms" title="Modal" status="stable" description="Overlay dialog for focused interactions — Alert, Confirm (+ destructive), Onboarding and Detail variants." />

      <ModalShowcase />

      <Anatomy
        parts={[
          { label: "Backdrop",      description: "Dimmed, blurred layer that disables the content behind. Clicking it closes non-destructive modals." },
          { label: "Container",     description: "Centered card with rounded corners and drop shadow; max width varies by variant." },
          { label: "Header",        description: "Title on the left, close (×) button on the right. Omitted in compact Alert / Confirm where context is inline." },
          { label: "Icon badge",    description: "Round 40px tinted badge that signals intent — success (green), warning (yellow), destructive (red)." },
          { label: "Title + body",  description: "Semantic content block: short title + 1–2 sentence explanation." },
          { label: "Actions",       description: "Right-aligned footer with Cancel + primary button. Primary turns red for destructive variants." },
        ]}
      />

      <UseCases
        items={[
          "Use Alert for passive confirmation of a background action (scan complete, settings saved).",
          "Use Confirm for reversible but important changes (restart monitoring, unassign user).",
          "Use Confirm · Destructive for irreversible actions (delete asset, revoke API token).",
          "Use Onboarding · Gated for short, focused data entry that requires legal acknowledgments or authority confirmation — the primary button stays disabled until every toggle is on.",
          "Use Detail for a deep-dive view where the user needs to inspect data before acting (CVE detail, finding timeline).",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Close the modal on Esc and on backdrop click — except for destructive confirms." },
          { type: "dont", text: "Don't stack modals; if one modal triggers another, redesign the flow." },
          { type: "do",   text: "Use red primary button only when the action is genuinely irreversible." },
          { type: "dont", text: "Don't put more than two primary actions in the footer; split into multiple steps instead." },
          { type: "do",   text: "Keep Form modals under ~400 px tall; scroll-trap longer content inside the body." },
          { type: "dont", text: "Don't use a modal for navigation between sections — use a page route." },
        ]}
      />
    </div>
  );
}

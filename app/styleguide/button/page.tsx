import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/styleguide/page-header";
import { ButtonShowcase } from "@/sections/button/button-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Button — Design System",
};

export default function ButtonPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto space-y-10">
      <PageHeader
        category="Atoms"
        title="Button"
        status="stable"
        description="Contained, Outlined and Text variants across 5 color intents and 2 sizes. Plus loading state, icon-only, button group and full-width patterns for common UI shells."
      />

      <ButtonShowcase />

      <Anatomy
        parts={[
          { label: "Container",       description: "Surface that defines the clickable area, padding, radius and color intent." },
          { label: "Label",           description: "Action verb that describes what happens when pressed (\"Continue\", \"Start scan\")." },
          { label: "Icon (optional)", description: "Leading or trailing 14px icon that reinforces the action." },
          { label: "Focus ring",      description: "Outline that appears on keyboard focus — never removed, only restyled." },
        ]}
        preview={
          <button
            type="button"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-s4e-btn-primary-600 text-white text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-s4e-brand-primary-500/40"
          >
            Continue
            <ArrowRight size={14} />
          </button>
        }
      />

      <UseCases
        items={[
          "Use Primary to highlight the main call-to-action on a surface — only one per screen region.",
          "Use Secondary (Outlined / Text) for supporting actions placed next to a primary button.",
          "Use Small size inside dense UI such as toolbars, filter bars or inline table actions.",
          "Use Loading state any time an action takes more than ~300ms — keeps the button in place and disables it.",
          "Use Icon-only inside dense toolbars where the meaning is obvious; always include an aria-label.",
          "Use Button Group for connected mutually-exclusive actions (segmented controls, split buttons, toolbar clusters).",
          "Use Full-width on narrow forms and mobile drawers; almost never on desktop dashboards.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Use a clear action verb as the label (“Save changes”, “Start scan”)." },
          { type: "dont", text: "Don't use generic labels like “OK” or “Submit” when a specific verb is clearer." },
          { type: "do",   text: "Keep button hierarchy clear — a single Primary per region, rest as Secondary." },
          { type: "dont", text: "Don't stack two Primary buttons side by side; it breaks visual priority." },
          { type: "do",   text: "Always provide an aria-label on icon-only buttons — the icon is invisible to screen readers." },
          { type: "dont", text: "Don't change a button's width when it enters loading state — swap content, keep the box stable." },
        ]}
      />
    </div>
  );
}

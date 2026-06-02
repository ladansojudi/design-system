import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/styleguide/page-header";
import { ButtonShowcase, ButtonExamples } from "@/sections/button/button-showcase";
import { ButtonSpecs } from "@/sections/button/button-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Button — Design System",
};

export default function ButtonPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader
        category="Atoms"
        title="Button"
        status="stable"
        description="Three intents (Default, Primary, Destructive) × three styles (Solid, Outline, Ghost) × three sizes (Sm, Md, Lg). Plus loading, icon-only, button group and full-width patterns."
      />

      <div className="mt-12 sm:mt-16">
        <ViewModeTabs />
      </div>

      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
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
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-s4e-btn-primary-600 text-white text-[14px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-s4e-brand-primary-500/40"
                >
                  Continue
                  <ArrowRight size={14} />
                </button>
              }
            />

            <ButtonSpecs />

            <UseCases
              items={[
                "Use Primary Solid for the main call-to-action on a surface — only one per screen region.",
                "Use Default (dark) Solid as a neutral primary action when there's no brand-driven CTA.",
                "Use Destructive Solid for delete / revoke / sign-out — any irreversible action.",
                "Use Outline for supporting actions placed next to a Solid primary.",
                "Use Ghost for the lightest, lowest-emphasis actions (table row actions, toolbar items).",
                "Use Loading any time an action takes more than ~300ms — keeps the button in place and disables it.",
                "Use Icon-only inside dense toolbars where the meaning is obvious; always include an aria-label.",
                "Use Button Group for connected mutually-exclusive actions (segmented controls, split buttons).",
                "Use Full-width on narrow forms and mobile drawers; almost never on desktop dashboards.",
              ]}
            />

            <Guidelines
              items={[
                { type: "do",   text: "Use a clear action verb as the label (\"Save changes\", \"Start scan\")." },
                { type: "dont", text: "Don't use generic labels like \"OK\" or \"Submit\" when a specific verb is clearer." },
                { type: "do",   text: "Keep button hierarchy clear — one Solid per region, the rest Outline or Ghost." },
                { type: "dont", text: "Don't stack two Solid Primary buttons side by side; it breaks visual priority." },
                { type: "do",   text: "Reserve Destructive for actions the user cannot undo — never for cancel/back." },
                { type: "dont", text: "Don't change a button's width when it enters loading state — swap content, keep the box stable." },
                { type: "do",   text: "Always provide an aria-label on icon-only buttons — the icon is invisible to screen readers." },
                { type: "dont", text: "Don't disable the focus ring; restyle it with focus-visible:ring-* if it clashes." },
              ]}
            />
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <ButtonExamples />
          </div>
        }
      />
    </div>
  );
}

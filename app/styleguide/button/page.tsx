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
        description="Primary and Secondary variants in Small and Medium sizes. Three icon configurations: no icon, left icon, right icon."
      />

      <ButtonShowcase />

      <Anatomy
        parts={[
          { label: "Container",  description: "Surface that defines the clickable area, padding and background color." },
          { label: "Icon (optional)", description: "Leading or trailing 14px icon that reinforces the action." },
          { label: "Label",      description: "Action verb that describes what happens when pressed." },
        ]}
      >
        <button
          type="button"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-s4e-btn-primary-600 text-white text-[13px] font-medium"
        >
          Continue
          <ArrowRight size={14} />
        </button>
      </Anatomy>

      <UseCases
        items={[
          "Use Primary to highlight the main call-to-action on a surface — only one per screen region.",
          "Use Secondary for supporting actions placed next to a primary button.",
          "Use Small size inside dense UI such as toolbars, filter bars or inline table actions.",
          "Pair a leading icon with the label when the action is visual (Export, Upload, Copy).",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Use a clear action verb as the label (“Save changes”, “Start scan”)." },
          { type: "dont", text: "Don't use generic labels like “OK” or “Submit” when a specific verb is clearer." },
          { type: "do",   text: "Keep button hierarchy clear — a single Primary per region, rest as Secondary." },
          { type: "dont", text: "Don't stack two Primary buttons side by side; it breaks visual priority." },
        ]}
      />
    </div>
  );
}

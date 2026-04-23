import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { SwitchRadioShowcase } from "@/sections/switch-radio/switch-radio-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Switch · Radio — s4e Design System",
};

export default function SwitchRadioPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto space-y-10">
      <PageHeader
        category="Atoms"
        title="Switch · Radio"
        description="Toggle switches in unchecked, dark, and primary variants. Radio buttons across unchecked, hovered, disabled, and checked states."
      />

      <SwitchRadioShowcase />

      <Anatomy
        parts={[
          { label: "Track", description: "Container that shifts color between checked and unchecked states." },
          { label: "Thumb", description: "Circular indicator that slides left or right to reflect state." },
          { label: "Label (external)", description: "Text placed next to the control describing what the toggle controls." },
        ]}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-[22px] rounded-full bg-s4e-btn-primary-600">
            <div className="absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm translate-x-[18px]" />
          </div>
          <span className="text-[13px] text-s4e-text-primary">Continuous monitoring</span>
        </div>
      </Anatomy>

      <UseCases
        items={[
          "Use Switch for binary on/off settings that take effect immediately.",
          "Use Radio when the user picks exactly one option from a small set.",
          "Always pair the control with a descriptive label so the state is unambiguous.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Apply changes instantly when a switch is toggled — no extra Save step." },
          { type: "dont", text: "Don't use a switch when the action is destructive; prompt a confirm instead." },
          { type: "do",   text: "Use Radio when options are mutually exclusive; use Checkbox for multiple selection." },
          { type: "dont", text: "Don't stack more than 5 radios vertically — consider a dropdown instead." },
        ]}
      />
    </div>
  );
}

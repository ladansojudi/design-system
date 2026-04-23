import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { TextFieldShowcase } from "@/sections/text-field/text-field-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Text Field — s4e Design System",
};

export default function TextFieldPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto space-y-10">
      <PageHeader
        category="Atoms"
        title="Text Field"
        description="Filled and outlined variants across five states. Text Space provides a rich-text editing surface with simple and full toolbar configurations."
      />

      <TextFieldShowcase />

      <Anatomy
        parts={[
          { label: "Label",            description: "Always-visible descriptor placed above (outlined) or floating inside (filled)." },
          { label: "Container",        description: "Surface that holds the input, defining border, background and state colors." },
          { label: "Input",            description: "Text entry area that accepts user value and reflects focus, error and disabled states." },
          { label: "Helper / error text (optional)", description: "Small caption directly below the field — plain helper text, or an AlertCircle icon + red message when validation fails." },
        ]}
      >
        <div className="w-64 flex flex-col gap-1.5">
          <span className="text-[11px] text-s4e-text-secondary">Asset name</span>
          <div className="h-10 px-3 rounded-lg border border-s4e-neutral-divider-10 bg-s4e-surface-app flex items-center text-[13px] text-s4e-text-primary">
            zero.webappsecurity.com
          </div>
          <span className="text-[11px] text-s4e-text-disabled">Use the primary domain you want to monitor.</span>
        </div>
      </Anatomy>

      <UseCases
        items={[
          "Use Outlined for standalone forms where each field needs a visible boundary.",
          "Use Filled for dense forms or sidebars where a softer surface fits the layout.",
          "Always show the label — placeholders alone fail accessibility and memory recall.",
          "Pair the Error state with an inline message that explains the rule and shows a valid example.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Keep labels short and descriptive (“Asset name”, not “Please enter asset name here”)." },
          { type: "dont", text: "Don't rely on placeholder text as the only label — it disappears on typing." },
          { type: "do",   text: "Write error messages in plain language — “Must be at least 8 characters” beats “Invalid input”." },
          { type: "dont", text: "Don't rely on color alone for errors; always pair the red border with an icon + message." },
          { type: "do",   text: "Validate on blur or submit, and clear the error the moment the user fixes it." },
          { type: "dont", text: "Don't disable a field without explaining why; prefer read-only or a helper text." },
        ]}
      />
    </div>
  );
}

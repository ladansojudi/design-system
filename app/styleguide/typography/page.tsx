import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { TypographyScale } from "@/sections/typography/typography-scale";
import { TextColors } from "@/sections/typography/text-colors";
import { UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Typography — Design System",
};

export default function TypographyPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader
        category="Foundations"
        title="Typography"
        status="stable"
        description="Type scale for the s4e.io interface. All styles use the Inter variable font. Pair the size with the role — never pick by aesthetics alone."
      />
      <TypographyScale />

      <TextColors />

      <UseCases
        items={[
          "Use display-lg / display-md only for marketing pages and hero sections — never inside dashboards.",
          "Use heading-h1 once per page for the page title. Drop one level per nesting depth, never skip a level.",
          "Use heading-h2 to heading-h5 for section hierarchy. Weight grades from Bold (h1) to SemiBold (h2-h5).",
          "Use body-md (14px) as default body copy in dense product UI. Use body-lg (16px) on marketing or reading-heavy surfaces.",
          "Use label-md / label-sm for form labels, badges, and table column headers — short non-prose UI text.",
          "Use caption for helper text under inputs and table descriptions.",
          "Use overline (10px / 600 / uppercase / +0.1em tracking) for small section markers above titles.",
          "Use code-md / code-sm (IBM Plex Mono) for tokens, code snippets, and hex values.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Match weight to importance, not visibility — Bold for h1 + display, SemiBold for h2-h5, Medium for labels, Regular for body." },
          { type: "dont", text: "Don't introduce sizes outside the scale (\"just 17px\") — every off-scale value compounds over time." },
          { type: "do",   text: "Keep line-length between 45–75 characters for body copy. Past 90 the eye loses the next line." },
          { type: "dont", text: "Don't all-caps body text — reserve uppercase for overline and short labels where letter-spacing carries the load." },
          { type: "do",   text: "Use negative letter-spacing (-0.01em / -0.02em) on display + h1 sizes; default tracking on everything else." },
          { type: "dont", text: "Don't use Light (300) or thinner weights for body text — fails accessibility at small sizes." },
        ]}
      />
    </div>
  );
}

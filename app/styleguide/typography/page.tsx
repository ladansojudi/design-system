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
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto space-y-10">
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
          "Use H1 (24px / 600) once per page — for the page title only.",
          "Use H2 (18px / 600) for major section headers inside a page.",
          "Use H3 (15px / 600) for sub-sections, card titles and showcase labels.",
          "Use Body-1 (13px / 400) for primary body copy and table cells.",
          "Use Body-2 (12px / 400) for helper text, table descriptions and meta.",
          "Use Caption (10–11px / 500 uppercase) for category labels, badges and tags.",
          "Use Mono (12px Plex Mono) for tokens, code snippets and hex values.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Match weight to importance, not visibility — 600 is for hierarchy, not for emphasis inside body copy." },
          { type: "dont", text: "Don't introduce sizes outside the scale (\"just 14px\") — every off-scale value compounds over time." },
          { type: "do",   text: "Keep line-length between 45–75 characters for body copy. Past 90 the eye loses the next line." },
          { type: "dont", text: "Don't all-caps body text — reserve uppercase for short captions and category labels where letter-spacing carries the load." },
        ]}
      />
    </div>
  );
}

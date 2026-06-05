import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ColorsSystem } from "@/sections/colors/colors-system";

export const metadata: Metadata = {
  title: "Design System",
};

export default function ColorsPage() {
  return (
    <>
      <PageHero
        category="Foundations"
        title="Colors & Tokens"
        status="stable"
        description="Every visual decision in the system references a named token. No component uses a hardcoded color value."
        actions={<OpenInFigma />}
      />

      <PageBody>
      <div>
        <ColorsSystem />
      </div>
      </PageBody>
    </>
  );
}

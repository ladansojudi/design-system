import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ThemingShowcase } from "@/sections/theming/theming-showcase";

export const metadata: Metadata = {
  title: "Theming — Design System",
};

export default function ThemingPage() {
  return (
    <>
      <PageHero
        category="Foundations"
        title="Theming"
        status="stable"
        description="How light and dark modes are wired, what each kind of token does, and how to brand the system for your own product."
        actions={<OpenInFigma />}
      />

      <PageBody>
      <div>
        <ThemingShowcase />
      </div>
      </PageBody>
    </>
  );
}

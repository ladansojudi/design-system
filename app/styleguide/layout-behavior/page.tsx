import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { LayoutBehaviorShowcase } from "@/sections/layout-behavior/layout-behavior-showcase";

export const metadata: Metadata = {
  title: "Layout & Behavior — Design System",
};

export default function LayoutBehaviorPage() {
  return (
    <>
      <PageHero
        category="Foundations"
        title="Layout & Behavior"
        status="stable"
        description="Breakpoints, z-index layers, motion tokens and border-radius scale — the rules that decide how surfaces move, stack and respond to the viewport."
        actions={<OpenInFigma />}
      />

      <PageBody>
      <div>
        <LayoutBehaviorShowcase />
      </div>
      </PageBody>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { LayoutBehaviorShowcase } from "@/sections/layout-behavior/layout-behavior-showcase";

export const metadata: Metadata = {
  title: "Layout & Behavior — Design System",
};

export default function LayoutBehaviorPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader
        category="Foundations"
        title="Layout & Behavior"
        status="stable"
        description="Breakpoints, z-index layers, motion tokens and border-radius scale — the rules that decide how surfaces move, stack and respond to the viewport."
      />
      <div className="mt-12 sm:mt-16">
        <LayoutBehaviorShowcase />
      </div>
    </div>
  );
}

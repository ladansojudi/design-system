import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { ThemingShowcase } from "@/sections/theming/theming-showcase";

export const metadata: Metadata = {
  title: "Theming — Design System",
};

export default function ThemingPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader
        category="Foundations"
        title="Theming"
        status="stable"
        description="How light and dark modes are wired, what each kind of token does, and how to brand the system for your own product."
      />
      <div className="mt-12 sm:mt-16">
        <ThemingShowcase />
      </div>
    </div>
  );
}

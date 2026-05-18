import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { SkeletonShowcase } from "@/sections/skeleton/skeleton-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Skeleton — Design System",
};

export default function SkeletonPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader
        category="Atoms"
        title="Skeleton"
        status="beta"
        description="Placeholder shapes that match the layout of the real content while data loads. Reduces perceived latency and prevents layout shift."
      />

      <SkeletonShowcase />

      <Anatomy
        parts={[
          { label: "Shape",     description: "Rounded rectangle or circle that mirrors the bounding box of the real element." },
          { label: "Fill",      description: "Neutral grey (s4e-neutral-grey-200) — never a brand or semantic color." },
          { label: "Pulse",     description: "2-second opacity pulse signals the content is loading, not broken." },
        ]}
      />

      <UseCases
        items={[
          "Initial page load before data is fetched.",
          "Tabbed switches where the second tab fetches lazily.",
          "Infinite-scroll list waiting on the next page.",
          "Dashboards while widgets fetch in parallel.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Match the skeleton shape and count to the real content — same number of rows, same column widths." },
          { type: "dont", text: "Don't show a skeleton for under ~300ms — flicker is worse than a brief blank state." },
          { type: "do",   text: "Keep the pulse subtle. Loud animations make the page feel busier than it is." },
          { type: "dont", text: "Don't mix skeletons with spinners in the same surface — pick one loading paradigm." },
        ]}
      />
    </div>
  );
}

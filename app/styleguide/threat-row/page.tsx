import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ComingSoon } from "@/components/styleguide/coming-soon";

export const metadata: Metadata = {
  title: "Threat Row — Design System",
};

export default function Page() {
  return (
    <>
      <PageHero category="Molecules" title="Threat Row" status="alpha" description="Single row representing a threat entry with severity, title, and actions."
        actions={<OpenInFigma />}
      />

      <PageBody>
        <div className="space-y-10">
      <ComingSoon title="Threat Row" />
        </div>
      </PageBody>
    </>
  );
}

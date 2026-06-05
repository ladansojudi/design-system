import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ComingSoon } from "@/components/styleguide/coming-soon";

export const metadata: Metadata = {
  title: "Scan Type Item — Design System",
};

export default function Page() {
  return (
    <>
      <PageHero category="Molecules" title="Scan Type Item" status="alpha" description="Selectable item representing a scan configuration type."
        actions={<OpenInFigma />}
      />

      <PageBody>
        <div className="space-y-10">
      <ComingSoon title="Scan Type Item" />
        </div>
      </PageBody>
    </>
  );
}

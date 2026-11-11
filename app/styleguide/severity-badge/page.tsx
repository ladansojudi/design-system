import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { SeverityBadgeShowcase, SeverityBadgeExamples } from "@/sections/severity-badge/severity-badge-showcase";
import { SeverityBadgeSpecs } from "@/sections/severity-badge/severity-badge-specs";
import { SeverityBadge } from "@/components/ui/severity-badge";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";

export const metadata: Metadata = {
  title: "Severity Badge — Sentinel Design System",
};

export default function SeverityBadgePage() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Severity Badge"
        status="stable"
        description="Five severity levels — Low, Info, Medium, High, Critical — each with a distinct color accent. Available with label only or label plus score."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Severity Badge" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Signal bars",      description: "Four bars, filled to the level: Critical 4, High 3, Medium 2, Low 1. Info is a ring. Count and colour carry the level together." },
                  { label: "Label",            description: "Severity name, always written out." },
                  { label: "Score (optional)", description: "CVSS or internal score in mono, one decimal." },
                  { label: "Container",        description: "Neutral surface with a hairline ring, so badges stay calm in dense tables." },
                ]}
                preview={<SeverityBadge severity="critical" score={9.8} />}
              />
              <SeverityBadgeSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="severity-badge" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <SeverityBadgeShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Tag vulnerabilities, findings or threats in tables and feeds.",
                  "Summarise risk on stat cards and dashboard widgets.",
                  "Pair with a CVSS or internal score when the number reinforces severity.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Use exactly one severity per item — never stack badges for the same finding." },
                  { type: "dont", text: "Don't invent new severities; stick to the five defined levels." },
                  { type: "do",   text: "Right-align the severity column in tables so bars line up." },
                  { type: "dont", text: "Don't reuse severity colors for unrelated tags — it dilutes their meaning." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><SeverityBadgeExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

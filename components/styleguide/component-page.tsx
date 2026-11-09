import type React from "react";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { FigmaNote } from "@/components/styleguide/figma-note";
import type { ComponentStatus } from "@/components/styleguide/page-header";

/**
 * The four-tab component page (Usage · Specs · Code · Accessibility). Pages
 * pass content per tab; this owns the hero, tabs, spacing and section order.
 * The Code tab also gets Installation and API reference from PageBody.
 */
export function ComponentPage({
  title,
  status = "stable",
  description,
  examples,
  usage,
  specs,
  code,
  accessibility,
}: {
  title: string;
  status?: ComponentStatus;
  description: string;
  /** Usage tab → "Examples": live variants and states. */
  examples: React.ReactNode;
  /** Usage tab → "Usage": when to use, guidelines. */
  usage: React.ReactNode;
  /** Specs tab: SpecSection blocks. */
  specs: React.ReactNode;
  /** Code tab: ExampleCards. */
  code: React.ReactNode;
  /** Accessibility tab: A11ySection blocks. */
  accessibility: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title={title}
        status={status}
        description={description}
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />
      <ComponentTabPanel>
        <PageBody>
          <ModeAware
            design={
              <div className="mt-8 space-y-16 sm:mt-10">
                <DocSection title="Examples">{examples}</DocSection>
                <DocSection title="Usage">{usage}</DocSection>
              </div>
            }
            specs={
              <div className="mt-8 space-y-14 sm:mt-10">
                <FigmaNote component={title} />
                {specs}
              </div>
            }
            dev={
              <div className="mt-8 sm:mt-10">
                <DocSection title="Examples">
                  <div className="space-y-4">{code}</div>
                </DocSection>
              </div>
            }
            a11y={<div className="mt-8 space-y-14 sm:mt-10">{accessibility}</div>}
          />
        </PageBody>
      </ComponentTabPanel>
    </>
  );
}

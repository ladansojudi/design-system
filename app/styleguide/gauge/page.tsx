import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { GaugeShowcase, GaugeExamples } from "@/sections/gauge/gauge-showcase";
import { GaugeSpecs } from "@/sections/gauge/gauge-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";

export const metadata: Metadata = {
  title: "Gauge — Sentinel Design System",
};

export default function Page() {
  return (
    <>
      <PageHero category="Components"
        categoryHref="/styleguide/components" title="Gauge" status="stable" description="Animated half-arc visualization for displaying a value within a defined range."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Gauge" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Track arc",         description: "Light half-arc that represents the full range. Omitted in the minimal variant." },
                  { label: "Progress arc",      description: "Thick colored arc that animates from 0 to the current value on mount." },
                  { label: "Severity markers", description: "Three small arc segments (light · dark · light) clustered at the end of the progress, above the main arc — they reinforce where the value lands on the severity scale. Default variant only." },
                  { label: "Needle",            description: "Grey pointer that rotates from the left edge to the value angle. Default variant only." },
                  { label: "Label",             description: "Bold numeric value followed by a muted \"/ max\" reference." },
                ]}
              />
              <GaugeSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="gauge" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <GaugeShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Use the default variant on dashboards to surface a score against a known scale (risk score, coverage, SLA).",
                  "Use the minimal variant inside dense lists or small cards where a full gauge would dominate the layout.",
                  "Match the color to the meaning of the score — green for healthy, yellow for warning, red for critical, blue / purple for neutral categories.",
                  "Pair with a stat card for context (label + delta) when a single number isn't enough to interpret the value.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Keep the scale fixed (0–100 or similar) so users can read the fill proportion at a glance." },
                  { type: "dont", text: "Don't change the arc sweep per gauge — every gauge in a group should share the same geometry." },
                  { type: "do",   text: "Let the animation run once on mount; don't loop it — that reads as a spinner." },
                  { type: "dont", text: "Don't put more than one gauge per row on mobile; the label becomes unreadable." },
                  { type: "do",   text: "Use the minimal variant when the value is the message and decoration would steal attention." },
                  { type: "dont", text: "Don't use the gauge for binary states (on/off) — use a badge or switch instead." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><GaugeExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}

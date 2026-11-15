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
import { Gauge } from "@/components/ui/gauge";

export const metadata: Metadata = {
  title: "Gauge",
};

export default function Page() {
  return (
    <>
      <PageHero category="Components"
        categoryHref="/styleguide/components" title="Gauge" status="beta" description="Animated half-arc visualization for displaying a value within a defined range."
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
                  { label: "Track arc", target: "svg > path|0", side: "left", description: "Light half-arc showing the full range." },
                  { label: "Progress arc", target: "svg > path|1", side: "top", description: "Thick coloured arc that grows from 0 to the value on load." },
                  { label: "Severity markers", target: "svg > g|0", side: "top", description: "Three short arc segments at the end of the progress, showing where the value sits on the severity scale." },
                  { label: "Needle", target: "svg > g|1", side: "right", description: "Grey pointer that turns from the left edge to the value." },
                  { label: "Label", target: ":scope > div > div", side: "bottom", description: "The value and its maximum, e.g. 72 / 100." },
                ]}
                preview={
                  <Gauge value={72} color="green" />
                }
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
                  "Use it on dashboards to surface one score against a known scale (risk score, coverage, SLA).",
                  "In dense lists or small cards, show the number alone — a full gauge would dominate the layout.",
                  "Match the color to the meaning of the score — green for healthy, yellow for warning, red for critical, blue / brand for neutral categories.",
                  "Pair with a stat card for context (label + delta) when a single number isn't enough to interpret the value.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Keep the scale fixed (0–100 or similar) so users can read the fill proportion at a glance." },
                  { type: "dont", text: "Don't change the arc sweep per gauge — every gauge in a group should share the same geometry." },
                  { type: "do",   text: "Let the animation run once on mount; don't loop it — that reads as a spinner." },
                  { type: "dont", text: "Don't put more than one gauge per row on mobile; the label becomes unreadable." },
                  { type: "do",   text: "Show the plain number when the value is the message and the arc would only decorate it." },
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

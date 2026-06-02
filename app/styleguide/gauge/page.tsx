import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { GaugeShowcase, GaugeExamples } from "@/sections/gauge/gauge-showcase";
import { GaugeSpecs } from "@/sections/gauge/gauge-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Gauge — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader category="Organisms" title="Gauge" status="stable" description="Animated half-arc visualization for displaying a value within a defined range." />

      <div className="mt-12 sm:mt-16">
        <ViewModeTabs />
      </div>

      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <GaugeShowcase />

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
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <GaugeExamples />
          </div>
        }
      />
    </div>
  );
}

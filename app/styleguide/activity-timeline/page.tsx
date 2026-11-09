import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import { ComponentPage } from "@/components/styleguide/component-page";
import { InlineCode, Panel, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { ColorTokenTabs, DimensionsTable, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable } from "@/components/styleguide/a11y-docs";
import { ActivityTimeline, type TimelineItem } from "@/components/ui/activity-timeline";

export const metadata: Metadata = { title: "Activity timeline — Sentinel Design System" };

const ITEMS: TimelineItem[] = [
  { id: "1", title: "Suspicious login from new country", time: "14:02", dateTime: "2026-11-09T14:02:00Z", actor: "Detection rule · Impossible travel", tone: "error", icon: <ShieldAlert className="text-snt-text-error" /> },
  { id: "2", title: "MFA challenge passed", time: "14:03", dateTime: "2026-11-09T14:03:00Z", actor: "j.doe@example.com", tone: "warning" },
  { id: "3", title: "API key created", time: "14:05", dateTime: "2026-11-09T14:05:00Z", actor: "j.doe@example.com", tone: "info", description: "Key ending in …7a3b, scope: read:assets" },
  { id: "4", title: "Session revoked by analyst", time: "14:11", dateTime: "2026-11-09T14:11:00Z", actor: "SOC · m.kaya", tone: "success" },
];

export default function ActivityTimelinePage() {
  return (
    <ComponentPage
      title="Activity timeline"
      status="beta"
      description="A time-ordered list of events: an attack timeline, an audit log, or the history of a finding."
      examples={
        <SubSection title="Incident timeline" lede="Tone colours the marker; an icon can replace the dot for the event that matters most.">
          <Panel className="py-6"><ActivityTimeline items={ITEMS} /></Panel>
        </SubSection>
      }
      usage={
        <>
          <WhenToUse
            use={["Reconstruct what happened during an incident.", "Show the audit trail of a finding, asset or account."]}
            avoid={[<>Large event volumes to search and filter — use <InlineCode>DataTable</InlineCode>.</>, "Progress of a running job — use Scan progress."]}
          />
          <Guidelines items={[
            { type: "do", text: "Always show who or what did it (actor) — that is half of an audit trail." },
            { type: "dont", text: "Colour every event. Neutral is the default; tone is for the ones that matter." },
            { type: "do", text: "Pass dateTime in ISO format, and show absolute times in incident reports." },
            { type: "dont", text: "Mix time orders. Pick oldest-first for incidents, newest-first for feeds." },
          ]} />
        </>
      }
      specs={
        <>
          <SpecSection title="Properties">
            <PropertiesTable rows={[
              { name: "items", type: "TimelineItem[]", default: "—", description: "{ id, title, time, dateTime?, actor?, description?, tone?, icon? }" },
              { name: "tone", type: "enum", default: "neutral", description: "Per item: neutral · info · success · warning · error." },
            ]} />
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable columns={["value"]} rows={[
              { label: "Marker", values: ["24px, dot 10px"] },
              { label: "Line", values: ["1px"] },
              { label: "Gap between items", values: ["24px"] },
              { label: "Title / time", values: ["14 / 500, 12"] },
            ]} />
          </SpecSection>
          <SpecSection title="Color tokens">
            <ColorTokenTabs groups={[{ id: "t", label: "Tone", rows: [
              { variant: "Neutral", bg: { token: "neutral-grey-400" }, text: { token: "text-primary" } },
              { variant: "Info", bg: { token: "scale-blue-500" }, text: { token: "text-primary" } },
              { variant: "Success", bg: { token: "scale-green-500" }, text: { token: "text-primary" } },
              { variant: "Warning", bg: { token: "scale-yellow-500" }, text: { token: "text-primary" } },
              { variant: "Error", bg: { token: "scale-red-500" }, text: { token: "text-primary" } },
            ] }]} />
          </SpecSection>
        </>
      }
      code={
        <ExampleCard
          title="Default"
          code={`import { ActivityTimeline } from "@/components/ui/activity-timeline";\n\n<ActivityTimeline\n  items={[\n    { id: "1", title: "API key created", time: "14:05", dateTime: "2026-11-09T14:05:00Z", actor: "j.doe@example.com", tone: "info" },\n  ]}\n/>`}
          preview={<ActivityTimeline items={[ITEMS[2]]} />}
        />
      }
      accessibility={
        <>
          <A11ySection title="Built in">
            <A11yList items={[
              "An ordered list, so screen readers announce the number of events and each position.",
              <>Times use <InlineCode>&lt;time dateTime&gt;</InlineCode> for machine-readable values.</>,
              "Markers are decorative; tone never carries meaning that isn't in the title.",
            ]} />
          </A11ySection>
          <A11ySection title="Contrast">
            <ContrastTable rows={[
              { label: "Title", fg: "text-primary", bg: "surface-app", min: 4.5 },
              { label: "Time, actor", fg: "text-secondary", bg: "surface-app", min: 4.5 },
            ]} />
          </A11ySection>
        </>
      }
    />
  );
}

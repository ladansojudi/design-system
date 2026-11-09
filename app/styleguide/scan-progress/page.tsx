import type { Metadata } from "next";
import { ComponentPage } from "@/components/styleguide/component-page";
import { InlineCode, Panel, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { ColorTokenTabs, DimensionsTable, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable } from "@/components/styleguide/a11y-docs";
import { ScanProgress, type ScanStep } from "@/components/ui/scan-progress";

export const metadata: Metadata = { title: "Scan progress — Sentinel Design System" };

const RUNNING: ScanStep[] = [
  { label: "Queued", status: "done" },
  { label: "Discovery", status: "done", detail: "142 hosts" },
  { label: "Scanning", status: "active", detail: "61%" },
  { label: "Analysis", status: "pending" },
  { label: "Report", status: "pending" },
];
const FAILED: ScanStep[] = [
  { label: "Queued", status: "done" },
  { label: "Discovery", status: "failed", detail: "DNS timeout" },
  { label: "Scanning", status: "pending" },
  { label: "Report", status: "pending" },
];

export default function ScanProgressPage() {
  return (
    <ComponentPage
      title="Scan progress"
      status="beta"
      description="The stages of a scan or long job and where it is now: done, running, failed or still to come."
      examples={
        <>
          <SubSection title="Running"><Panel className="py-6"><ScanProgress steps={RUNNING} label="Scan of api.example.com" /></Panel></SubSection>
          <SubSection title="Failed" lede="The failed stage says why; later stages stay pending."><Panel className="py-6"><ScanProgress steps={FAILED} /></Panel></SubSection>
        </>
      }
      usage={
        <>
          <WhenToUse
            use={["Show a multi-stage job: scans, imports, report generation.", "Explain where a job failed, not just that it failed."]}
            avoid={[<>Short waits with no stages — use <InlineCode>Spinner</InlineCode>.</>, <>Steps the user moves through — that is a form stepper, not a job.</>]}
          />
          <Guidelines items={[
            { type: "do", text: "Keep stage names short (one word) and use detail for numbers." },
            { type: "dont", text: "Show more than six stages; group them instead." },
            { type: "do", text: "Give it a label naming the job (“Scan of api.example.com”)." },
            { type: "dont", text: "Fake progress. If a stage has no measurable progress, leave detail out." },
          ]} />
        </>
      }
      specs={
        <>
          <SpecSection title="Properties">
            <PropertiesTable rows={[
              { name: "steps", type: "ScanStep[]", default: "—", description: "{ label, status: pending | active | done | failed, detail? }" },
              { name: "label", type: "string", default: "Scan progress", description: "Accessible name of the list." },
            ]} />
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable columns={["value"]} rows={[
              { label: "Marker", values: ["24px circle"], note: "Icon 14px" },
              { label: "Connector", values: ["2px"] },
              { label: "Label", values: ["12 / 500"], note: "8px below the marker" },
              { label: "Detail", values: ["11 / 400"] },
            ]} />
          </SpecSection>
          <SpecSection title="Color tokens">
            <ColorTokenTabs groups={[{ id: "s", label: "Status", rows: [
              { variant: "Done", bg: { token: "btn-primary-600" }, text: { token: "text-on-accent" } },
              { variant: "Active", bg: { token: "surface-app" }, text: { token: "text-primary" }, border: { token: "focus-ring" } },
              { variant: "Failed", bg: { token: "btn-error-600" }, text: { token: "text-error" } },
              { variant: "Pending", bg: { token: "surface-app" }, text: { token: "text-secondary" }, border: { token: "border-strong" } },
            ] }]} />
          </SpecSection>
        </>
      }
      code={
        <ExampleCard
          title="Default"
          code={`import { ScanProgress } from "@/components/ui/scan-progress";\n\n<ScanProgress\n  label="Scan of api.example.com"\n  steps={[\n    { label: "Queued", status: "done" },\n    { label: "Scanning", status: "active", detail: "61%" },\n    { label: "Report", status: "pending" },\n  ]}\n/>`}
          preview={<ScanProgress steps={[{ label: "Queued", status: "done" }, { label: "Scanning", status: "active", detail: "61%" }, { label: "Report", status: "pending" }]} />}
        />
      }
      accessibility={
        <>
          <A11ySection title="Built in">
            <A11yList items={[
              <>An ordered list with an accessible name; the running stage has <InlineCode>aria-current=&quot;step&quot;</InlineCode>.</>,
              "Each stage's status is read out (“Discovery, done”), not left to colour or icon.",
              "The spinner stops for people who prefer reduced motion.",
            ]} />
          </A11ySection>
          <A11ySection title="Your responsibility">
            <A11yList items={["Announce completion or failure in a live region (e.g. a Toast) — the list itself doesn't speak when it changes."]} />
          </A11ySection>
          <A11ySection title="Contrast">
            <ContrastTable rows={[
              { label: "Done marker", fg: "btn-primary-600", bg: "surface-app", min: 3 },
              { label: "Pending marker", fg: "border-strong", bg: "surface-app", min: 3 },
              { label: "Pending label", fg: "text-secondary", bg: "surface-app", min: 4.5 },
              { label: "Failed label", fg: "text-error", bg: "surface-app", min: 4.5 },
            ]} />
          </A11ySection>
        </>
      }
    />
  );
}

import type { Metadata } from "next";
import { ComponentPage } from "@/components/styleguide/component-page";
import { InlineCode, Panel, Row, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { ColorTokenTabs, DimensionsTable, OptionPill, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable } from "@/components/styleguide/a11y-docs";
import { FindingStatus, FINDING_STATUSES } from "@/components/ui/finding-status";

export const metadata: Metadata = { title: "Finding status — Sentinel Design System" };

const IMPORT = `import { FindingStatus } from "@/components/ui/finding-status";`;

const MEANING: { status: (typeof FINDING_STATUSES)[number]; when: string }[] = [
  { status: "open",           when: "Found and not yet handled. Needs an owner." },
  { status: "in-progress",    when: "Someone is fixing it." },
  { status: "resolved",       when: "Fixed and verified by a re-scan." },
  { status: "accepted-risk",  when: "Known and deliberately not fixed, with a reason and an expiry date." },
  { status: "false-positive", when: "Not a real issue. Kept for audit, hidden from risk counts." },
];

export default function FindingStatusPage() {
  return (
    <ComponentPage
      status="beta"
      title="Finding status"
      description="Where a finding is in its lifecycle, from Open to Resolved. Each status has its own icon, so it never relies on colour."
      examples={
        <>
          <SubSection title="Statuses">
            <Panel>
              <dl>
                {MEANING.map((m) => (
                  <div key={m.status} className="grid gap-2 border-b border-snt-border-default py-4 last:border-b-0 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center sm:gap-6">
                    <dt><FindingStatus status={m.status} /></dt>
                    <dd className="text-snt-14 text-snt-text-secondary">{m.when}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </SubSection>
          <SubSection title="Sizes" lede="Medium by default; Small in dense tables.">
            <Panel>
              <Row label="Medium">{FINDING_STATUSES.map((s) => <FindingStatus key={s} status={s} />)}</Row>
              <Row label="Small">{FINDING_STATUSES.map((s) => <FindingStatus key={s} status={s} size="sm" />)}</Row>
            </Panel>
          </SubSection>
        </>
      }
      usage={
        <>
          <WhenToUse
            use={[
              "Show where a finding, alert or vulnerability is in triage — in tables, detail headers and activity logs.",
              "Filter lists by lifecycle: the same five statuses work as filter options.",
            ]}
            avoid={[
              <>Show how bad a finding is — that is <InlineCode>SeverityBadge</InlineCode>.</>,
              <>Show the state of a scan or an agent — use <InlineCode>Badge</InlineCode>.</>,
            ]}
          />
          <Guidelines
            items={[
              { type: "do",   text: "Put status next to severity: together they answer “how bad” and “who’s on it”." },
              { type: "dont", text: "Invent extra statuses per screen. Five keeps reports and filters comparable." },
              { type: "do",   text: "Require a reason and an expiry date before a finding becomes Accepted risk." },
              { type: "dont", text: "Count False positive findings in risk scores or severity totals." },
            ]}
          />
        </>
      }
      specs={
        <>
          <SpecSection title="Properties">
            <PropertiesTable
              rows={[
                {
                  name: "status",
                  type: "enum",
                  values: (
                    <div className="flex flex-wrap gap-1.5">
                      {FINDING_STATUSES.map((s) => <OptionPill key={s} label={s} />)}
                    </div>
                  ),
                  default: "—",
                  description: "Lifecycle state. Sets icon, colour and label.",
                },
                { name: "size", type: "enum", default: "md", description: "md 24px tall, sm 20px." },
                { name: "label", type: "string", default: "—", description: "Overrides the visible label, e.g. for translation." },
              ]}
            />
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable
              columns={["sm", "md"]}
              rows={[
                { label: "Height", values: ["20px", "24px"] },
                { label: "Padding (left, right)", values: ["8px", "10px"] },
                { label: "Icon size", values: ["12px", "14px"] },
                { label: "Icon to label gap", values: ["6px", "6px"] },
                { label: "Label", values: ["11 / 500", "12 / 500"], note: "size / weight" },
                { label: "Corner radius", values: ["full", "full"] },
              ]}
            />
          </SpecSection>
          <SpecSection title="Color tokens">
            <ColorTokenTabs
              groups={[{
                id: "status",
                label: "Status",
                rows: [
                  { variant: "Open",           bg: { token: "bg-error-subtle" },   text: { token: "text-error" } },
                  { variant: "In progress",    bg: { token: "bg-info-subtle" },    text: { token: "text-info" } },
                  { variant: "Resolved",       bg: { token: "bg-success-subtle" }, text: { token: "text-success" } },
                  { variant: "Accepted risk",  bg: { token: "bg-warning-subtle" }, text: { token: "text-warning" } },
                  { variant: "False positive", bg: { token: "bg-subtle" },         text: { token: "text-secondary" } },
                ],
              }]}
            />
          </SpecSection>
        </>
      }
      code={
        <>
          <ExampleCard
            title="Default"
            code={`${IMPORT}\n\n<FindingStatus status="in-progress" />`}
            preview={<FindingStatus status="in-progress" />}
          />
          <ExampleCard
            title="Translated label"
            code={`<FindingStatus status="resolved" label="Çözüldü" />`}
            preview={<FindingStatus status="resolved" label="Çözüldü" />}
          />
        </>
      }
      accessibility={
        <>
          <A11ySection title="Built in">
            <A11yList
              items={[
                "The status is plain text, so it is read out as written.",
                "Each status has a distinct icon shape as well as a colour (WCAG 1.4.1).",
                "Icons are decorative and hidden from screen readers.",
              ]}
            />
          </A11ySection>
          <A11ySection title="Your responsibility">
            <A11yList
              items={[
                <>If you make the status editable, wrap it in a real control (a <InlineCode>Select</InlineCode> or menu button) — the pill itself isn&apos;t interactive.</>,
                <>Keep translated labels short; <InlineCode>whitespace-nowrap</InlineCode> keeps the pill on one line.</>,
              ]}
            />
          </A11ySection>
          <A11ySection title="Contrast" lede="Label on its tint, computed live in the current theme.">
            <ContrastTable
              rows={[
                { label: "Open",           fg: "text-error",     bg: "bg-error-subtle",   min: 4.5 },
                { label: "In progress",    fg: "text-info",      bg: "bg-info-subtle",    min: 4.5 },
                { label: "Resolved",       fg: "text-success",   bg: "bg-success-subtle", min: 4.5 },
                { label: "Accepted risk",  fg: "text-warning",   bg: "bg-warning-subtle", min: 4.5 },
                { label: "False positive", fg: "text-secondary", bg: "bg-subtle",         min: 4.5 },
              ]}
            />
          </A11ySection>
        </>
      }
    />
  );
}

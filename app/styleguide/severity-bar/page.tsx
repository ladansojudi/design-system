import type { Metadata } from "next";
import { ComponentPage } from "@/components/styleguide/component-page";
import { InlineCode, Panel, Row, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { ColorTokenTabs, DimensionsTable, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable } from "@/components/styleguide/a11y-docs";
import { SeverityBar } from "@/components/ui/severity-bar";

export const metadata: Metadata = { title: "Severity bar — Sentinel Design System" };

const COUNTS = { critical: 3, high: 8, medium: 14, low: 21, info: 6 };
const IMPORT = `import { SeverityBar } from "@/components/ui/severity-bar";`;

export default function SeverityBarPage() {
  return (
    <ComponentPage
      status="beta"
      title="Severity bar"
      description="One bar that splits a set of findings by severity, so the riskiest share is visible at a glance."
      examples={
        <>
          <SubSection title="Default" lede="Segments run from Critical to Info. A legend repeats the counts.">
            <Panel className="py-6">
              <SeverityBar counts={COUNTS} />
            </Panel>
          </SubSection>
          <SubSection title="Sizes" lede="Medium for cards and headers, Small inside table rows and lists.">
            <Panel>
              <Row label="Medium"><SeverityBar counts={COUNTS} showLegend={false} /></Row>
              <Row label="Small"><SeverityBar counts={COUNTS} size="sm" showLegend={false} /></Row>
            </Panel>
          </SubSection>
          <SubSection title="States" lede="Severities with no findings are left out. With nothing to show, the bar stays as an empty track.">
            <Panel>
              <Row label="Partial"><SeverityBar counts={{ high: 2, low: 9 }} /></Row>
              <Row label="Empty"><SeverityBar counts={{}} /></Row>
            </Panel>
          </SubSection>
        </>
      }
      usage={
        <>
          <WhenToUse
            use={[
              "Summarise how a set of findings breaks down by severity: an asset, a scan, a repository.",
              "Compare risk across rows of a table, using the Small size without a legend.",
            ]}
            avoid={[
              <>Show the severity of one finding — use <InlineCode>SeverityBadge</InlineCode>.</>,
              "Show change over time — use a line or bar chart.",
            ]}
          />
          <Guidelines
            items={[
              { type: "do",   text: "Keep the legend when the bar stands alone, so the numbers are readable without hovering." },
              { type: "dont", text: "Recolour segments. Severity colours mean the same thing everywhere in the product." },
              { type: "do",   text: "Pass a noun that matches the context (“vulnerabilities”, “alerts”) — it is read out by screen readers." },
              { type: "dont", text: "Use it for non-severity categories, like status or asset type." },
            ]}
          />
        </>
      }
      specs={
        <>
          <SpecSection title="Properties">
            <PropertiesTable
              rows={[
                { name: "counts", type: "object", default: "—", description: "Findings per severity: { critical, high, medium, low, info }. Zero and missing are left out." },
                { name: "showLegend", type: "boolean", default: "true", description: "Legend with counts under the bar." },
                { name: "size", type: "enum", default: "md", description: "Bar thickness: sm 6px, md 10px." },
                { name: "noun", type: "string", default: "findings", description: "What is counted, for the accessible summary." },
              ]}
            />
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable
              columns={["sm", "md"]}
              rows={[
                { label: "Bar height", values: ["6px", "10px"] },
                { label: "Gap between segments", values: ["2px", "2px"] },
                { label: "Minimum segment width", values: ["4px", "4px"], note: "So a single finding stays visible" },
                { label: "Legend gap from bar", values: ["10px", "10px"] },
                { label: "Legend text", values: ["12px", "12px"] },
              ]}
            />
          </SpecSection>
          <SpecSection title="Color tokens" lede="Severity colours are reserved for severity.">
            <ColorTokenTabs
              groups={[{
                id: "severity",
                label: "Severity",
                rows: [
                  { variant: "Critical", bg: { token: "severity-critical" }, text: { token: "text-secondary" } },
                  { variant: "High",     bg: { token: "severity-high" },     text: { token: "text-secondary" } },
                  { variant: "Medium",   bg: { token: "severity-medium" },   text: { token: "text-secondary" } },
                  { variant: "Low",      bg: { token: "severity-low" },      text: { token: "text-secondary" } },
                  { variant: "Info",     bg: { token: "severity-info" },     text: { token: "text-secondary" } },
                  { variant: "Empty",    bg: { token: "bg-subtle" },         text: { token: "text-secondary" } },
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
            code={`${IMPORT}\n\n<SeverityBar counts={{ critical: 3, high: 8, medium: 14, low: 21, info: 6 }} />`}
            preview={<SeverityBar counts={COUNTS} />}
          />
          <ExampleCard
            title="In a table row"
            code={`<SeverityBar\n  size="sm"\n  showLegend={false}\n  noun="vulnerabilities"\n  counts={asset.findingsBySeverity}\n/>`}
            preview={<div className="w-48"><SeverityBar size="sm" showLegend={false} counts={{ critical: 1, high: 3, medium: 5 }} /></div>}
          />
        </>
      }
      accessibility={
        <>
          <A11ySection title="Built in">
            <A11yList
              items={[
                <>The bar is one <InlineCode>role=&quot;img&quot;</InlineCode> with a full text summary, e.g. &ldquo;52 findings: 3 critical, 8 high…&rdquo;.</>,
                "The visible legend repeats every number, so nobody has to rely on segment width or colour.",
                "It isn't interactive, so there is nothing to focus and no keyboard model.",
              ]}
            />
          </A11ySection>
          <A11ySection title="Your responsibility">
            <A11yList
              items={[
                <>Set <InlineCode>noun</InlineCode> so the summary says what is counted.</>,
                "Without a legend (Small, in tables), keep the total or the critical count visible next to the bar.",
              ]}
            />
          </A11ySection>
          <A11ySection title="Contrast" lede="Light severity hues (Medium, Info) fall under 3:1 against the page. That is allowed here because no meaning depends on the segment alone: the legend and the text summary carry every number (WCAG 1.4.11).">
            <ContrastTable
              rows={[
                { label: "Critical segment", fg: "severity-critical", bg: "surface-app", min: 3 },
                { label: "High segment",     fg: "severity-high",     bg: "surface-app", min: 3 },
                { label: "Medium segment",   fg: "severity-medium",   bg: "surface-app", min: 3 },
                { label: "Low segment",      fg: "severity-low",      bg: "surface-app", min: 3 },
                { label: "Info segment",     fg: "severity-info",     bg: "surface-app", min: 3 },
                { label: "Legend text",      fg: "text-secondary",    bg: "surface-app", min: 4.5 },
              ]}
            />
          </A11ySection>
        </>
      }
    />
  );
}

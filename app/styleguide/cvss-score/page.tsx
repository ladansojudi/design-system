import type { Metadata } from "next";
import { ComponentPage } from "@/components/styleguide/component-page";
import { InlineCode, Panel, Row, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { ColorTokenTabs, DimensionsTable, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable } from "@/components/styleguide/a11y-docs";
import { CvssScore } from "@/components/ui/cvss-score";

export const metadata: Metadata = { title: "CVSS score — Sentinel Design System" };

const VECTOR = "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H";
const IMPORT = `import { CvssScore } from "@/components/ui/cvss-score";`;

export default function CvssScorePage() {
  return (
    <ComponentPage
      status="beta"
      title="CVSS score"
      description="A CVSS base score with its rating, and the vector spelled out in plain words so anyone can see why it scored that way."
      examples={
        <>
          <SubSection title="With vector" lede="The vector string becomes a readable list: how it is attacked, what it takes, and what is at stake.">
            <Panel className="py-6">
              <CvssScore score={9.8} vector={VECTOR} />
            </Panel>
          </SubSection>
          <SubSection title="Ratings" lede="The rating follows the CVSS v3 bands: Low 0.1–3.9, Medium 4.0–6.9, High 7.0–8.9, Critical 9.0–10.0.">
            <Panel>
              <Row label="Score only">
                <CvssScore score={9.8} />
                <CvssScore score={7.5} />
                <CvssScore score={5.3} />
                <CvssScore score={2.1} />
              </Row>
            </Panel>
          </SubSection>
        </>
      }
      usage={
        <>
          <WhenToUse
            use={[
              "Show the standardised score of a known vulnerability (CVE) on its detail page.",
              "Explain a score to people who don't read vector strings: product owners, auditors.",
            ]}
            avoid={[
              <>Show your own risk rating — CVSS is the vendor&apos;s base score, not your context. Use <InlineCode>SeverityBadge</InlineCode> for your rating.</>,
              "Fill table cells — the score alone is enough there; keep the breakdown for detail views.",
            ]}
          />
          <Guidelines
            items={[
              { type: "do",   text: "Show the vector with the score on detail pages, so the score can be checked." },
              { type: "dont", text: "Round scores. 9.8 and 10.0 are different findings; always show one decimal." },
              { type: "do",   text: "Say which version it is (3.1, 4.0) — scores from different versions aren't comparable." },
              { type: "dont", text: "Present CVSS as the priority. Exploitability (KEV, EPSS) and your exposure matter more." },
            ]}
          />
        </>
      }
      specs={
        <>
          <SpecSection title="Properties">
            <PropertiesTable
              rows={[
                { name: "score", type: "number", default: "—", description: "Base score, 0.0–10.0. Shown with one decimal." },
                { name: "vector", type: "string", default: "—", description: "CVSS vector string. v3.0 / v3.1 metrics are translated; others are shown as written." },
                { name: "showMetrics", type: "boolean", default: "true", description: "Show the metric list when a vector is given." },
              ]}
            />
            <p className="mt-3 text-snt-12 text-snt-text-secondary">
              Also exported: <InlineCode>cvssRating(score)</InlineCode> and <InlineCode>parseCvssVector(vector)</InlineCode>.
            </p>
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable
              columns={["value"]}
              rows={[
                { label: "Score box", values: ["40px tall, min 48px wide"] },
                { label: "Score text", values: ["18 / 600 mono"], note: "size / weight" },
                { label: "Accent border", values: ["3px left"] },
                { label: "Box to rating gap", values: ["12px"] },
                { label: "Metric list", values: ["12px, 4px row gap"] },
              ]}
            />
          </SpecSection>
          <SpecSection title="Color tokens" lede="Ratings reuse the severity scale, the same as SeverityBadge.">
            <ColorTokenTabs
              groups={[{
                id: "rating",
                label: "Rating",
                rows: [
                  { variant: "Critical", bg: { token: "scale-purple-50" }, text: { token: "scale-purple-600" }, border: { token: "scale-purple-500" } },
                  { variant: "High",     bg: { token: "scale-red-50" },    text: { token: "scale-red-600" },    border: { token: "scale-red-500" } },
                  { variant: "Medium",   bg: { token: "scale-yellow-50" }, text: { token: "scale-yellow-700" }, border: { token: "scale-yellow-500" } },
                  { variant: "Low",      bg: { token: "scale-green-50" },  text: { token: "scale-green-600" },  border: { token: "scale-green-500" } },
                  { variant: "None",     bg: { token: "bg-subtle" },       text: { token: "text-primary" } },
                ],
              }]}
            />
          </SpecSection>
        </>
      }
      code={
        <>
          <ExampleCard
            title="With vector"
            code={`${IMPORT}\n\n<CvssScore score={9.8} vector="${VECTOR}" />`}
            preview={<CvssScore score={9.8} vector={VECTOR} />}
          />
          <ExampleCard
            title="Score only, in a table"
            code={`<CvssScore score={finding.cvss} />`}
            preview={<CvssScore score={6.1} />}
          />
          <ExampleCard
            title="Rating without the component"
            code={`import { cvssRating } from "@/components/ui/cvss-score";\n\ncvssRating(7.5); // "high"`}
            preview={<span className="font-mono text-snt-14 text-snt-text-primary">&quot;high&quot;</span>}
          />
        </>
      }
      accessibility={
        <>
          <A11ySection title="Built in">
            <A11yList
              items={[
                "The rating is written next to the score, so meaning never depends on colour.",
                <>Metrics are a description list (<InlineCode>dl</InlineCode>), read as name–value pairs.</>,
                "The raw vector stays visible for experts and is selectable for copying.",
              ]}
            />
          </A11ySection>
          <A11ySection title="Your responsibility">
            <A11yList items={["Label the region (e.g. a heading “Severity”) when the score sits among other numbers."]} />
          </A11ySection>
          <A11ySection title="Contrast">
            <ContrastTable
              rows={[
                { label: "Critical score", fg: "scale-purple-600", bg: "scale-purple-50", min: 4.5 },
                { label: "High score",     fg: "scale-red-600",    bg: "scale-red-50",    min: 4.5 },
                { label: "Medium score",   fg: "scale-yellow-700", bg: "scale-yellow-50", min: 4.5 },
                { label: "Low score",      fg: "scale-green-600",  bg: "scale-green-50",  min: 4.5 },
                { label: "Metric name",    fg: "text-secondary",   bg: "surface-app",     min: 4.5 },
              ]}
            />
          </A11ySection>
        </>
      }
    />
  );
}

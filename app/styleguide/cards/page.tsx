import type { Metadata } from "next";
import { ComponentPage } from "@/components/styleguide/component-page";
import { InlineCode, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Anatomy, Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { DimensionsTable, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable } from "@/components/styleguide/a11y-docs";
import { Button } from "@/components/ui/button";
import { StatDemo, StatGrid } from "@/sections/cards/stat-demos";
import { AlertExample, InsightExample } from "@/sections/cards/examples";

export const metadata: Metadata = { title: "Cards" };

const INSIGHT = `<Card>
  <CardHeader>
    <CardTitle>Live risk score</CardTitle>
    <Button intent="primary" variant="ghost" size="sm">View details <ArrowRight /></Button>
  </CardHeader>
  <CardContent>
    <dl className="divide-y divide-snt-border-default">
      {rows.map((r) => (
        <div key={r.label} className="flex justify-between py-3">
          <dt className="text-snt-12 text-snt-text-secondary">{r.label}</dt>
          <dd className="text-snt-14 font-semibold tabular-nums">{r.value}</dd>
        </div>
      ))}
    </dl>
  </CardContent>
</Card>`;
const ALERT = `<Card>
  <CardHeader className="border-b pb-4">
    <CardTitle>Attention needed</CardTitle>
    <span className="…pill…">2 active</span>
  </CardHeader>
  <CardContent>
    <p className="font-semibold">Security blind spots</p>
    <CardDescription>Assets excluded from scheduled scans.</CardDescription>
  </CardContent>
  <CardFooter>
    <Button variant="ghost" size="sm">Review assets <ArrowRight /></Button>
  </CardFooter>
</Card>`;
const STAT = `<StatCard
  icon={Link2}
  title="Total URLs"
  value="816"
  trend={{ direction: "down", value: "23%", label: "from last month", positive: true }}
/>`;

const insightDemo = (
  <InsightExample
    title="Live risk score"
    rows={[
      { label: "Critical vulnerabilities", value: 0 },
      { label: "Coverage gaps", value: 20 },
      { label: "Highest-risk asset", value: 14.6 },
    ]}
  />
);
const alertDemo = (
  <AlertExample title="Attention needed" count={2} heading="Security blind spots" description="Assets excluded from scheduled scans — potential blind spots in your coverage." action="Review assets" />
);
const statDemo = <StatDemo />;

export default function CardsPage() {
  return (
    <ComponentPage
      title="Cards"
      status="stable"
      description="The container for dashboard content. Card is the base, StatCard is a ready-made preset for one number, and the Usage tab shows how to compose summaries and alerts from the parts."
      examples={
        <>
          <SubSection title="Stat card" lede="One number, with a trend or a one-line explanation.">
            <StatGrid />
          </SubSection>
          <SubSection title="Card, composed" lede="Insight and alert cards are not separate components: they are product patterns built from CardHeader, CardTitle, CardContent and CardFooter.">
            <div className="grid gap-4 sm:grid-cols-2">
              {insightDemo}
              {alertDemo}
            </div>
          </SubSection>
        </>
      }
      usage={
        <>
          <WhenToUse
            use={[
              <><InlineCode>StatCard</InlineCode>: a KPI at the top of an overview. Three or four in a row.</>,
              <><InlineCode>Card</InlineCode> parts: any summary or callout, such as a figures list with a View details action, or an alert with a count and a next step.</>,
            ]}
            avoid={[
              <>Charts — use <InlineCode>ChartCard</InlineCode>.</>,
              <>Lists of records — use the Data table.</>,
              <>A message that must stay on the page until resolved — use <InlineCode>Alert</InlineCode>.</>,
            ]}
          />
          <Guidelines items={[
            { type: "do", text: "Keep cards in a grid with equal heights." },
            { type: "dont", text: "Put a trend and a description on the same stat card; pick one." },
            { type: "do", text: "Colour a trend by whether it is good news, not by its direction (fewer open findings is green)." },
            { type: "dont", text: "Stack more than three alert cards; collapse older ones into a list." },
            { type: "do", text: "Keep Insight rows to five or fewer so the card stays scannable." },
            { type: "dont", text: "Make the whole card and the button inside it both clickable." },
          ]} />
        </>
      }
      specs={
        <>
          <SpecSection title="Parts">
            <SubSection title="Stat card">
              <Anatomy
                parts={[
                  { label: "Icon + title", target: "[class*=\"gap-2\"]", side: "left", description: "A small icon and a short metric name." },
                  { label: "Value", target: "[class*=\"text-snt-32\"]", side: "right", description: "The number: 32px semibold, tabular figures." },
                  { label: "Trend", target: "[class*=\"rounded-full\"]", side: "bottom", description: "Change versus the previous period, coloured by good or bad news." },
                ]}
                preview={<div className="w-72">{statDemo}</div>}
              />
            </SubSection>
            <SubSection title="Card">
              <Anatomy
                parts={[
                  { label: "Header", target: "[class*=\"border-b\"]", side: "left", description: "CardHeader: title on the left, an optional action or status on the right." },
                  { label: "Title", target: "h3", side: "top", description: "CardTitle: a heading (h3 by default; choose the level with as)." },
                  { label: "Content", target: "[class*=\"space-y-1\"]", side: "right", description: "CardContent: the body." },
                  { label: "Footer", target: "button", side: "bottom", description: "CardFooter: the next step, as a ghost button." },
                ]}
                preview={<div className="w-80">{alertDemo}</div>}
              />
            </SubSection>
          </SpecSection>
          <SpecSection title="Properties">
            <PropertiesTable rows={[
              { name: "StatCard · title, value", type: "string, string | number", default: "—", description: "Metric name and the number." },
              { name: "StatCard · trend", type: "{ direction, value, label?, positive? }", default: "—", description: "Change vs. the previous period. positive says whether this direction is good news." },
              { name: "StatCard · description", type: "string", default: "—", description: "One helper sentence. Use instead of trend." },
              { name: "Card, CardHeader, CardContent, CardFooter", type: "HTMLAttributes<HTMLDivElement>", default: "—", description: "Containers; pass className to adjust spacing." },
              { name: "CardTitle · as", type: "\"h2\" | \"h3\" | \"h4\"", default: "\"h3\"", description: "Heading level for the page outline." },
              { name: "CardDescription", type: "HTMLAttributes<HTMLParagraphElement>", default: "—", description: "Secondary text, 12px." },
            ]} />
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable columns={["value"]} rows={[
              { label: "Radius", values: ["12px"], note: "rounded-xl" },
              { label: "Padding", values: ["20px"], note: "16px vertical on Stat and Alert body" },
              { label: "Recommended width", values: ["288–360px"] },
              { label: "Stat value", values: ["32 / 600"] },
              { label: "Title", values: ["16 / 600"] },
            ]} />
          </SpecSection>
        </>
      }
      code={
        <>
          <ExampleCard title="Stat card" code={`import { StatCard } from "@/components/ui/cards";\nimport { Link2 } from "lucide-react";\n\n${STAT}`} preview={<div className="w-72">{statDemo}</div>} />
          <ExampleCard title="Figures summary (composed)" density="tall" code={`import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/cards";\nimport { Button } from "@/components/ui/button";\n\n${INSIGHT}`} preview={<div className="w-80">{insightDemo}</div>} />
          <ExampleCard title="Attention alert (composed)" density="tall" code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/cards";\n\n${ALERT}`} preview={<div className="w-80">{alertDemo}</div>} />
        </>
      }
      accessibility={
        <>
          <A11ySection title="Built in">
            <A11yList items={[
              <><InlineCode>CardTitle</InlineCode> is a heading (<InlineCode>h3</InlineCode> by default) so dashboard sections can be navigated.</>,
              "The live dot and trend arrows are decorative: the count and the percentage are real text.",
              "Trends use an icon, a sign and a label as well as colour, so good and bad are not colour alone.",
              "Actions are real buttons with a focus ring.",
            ]} />
          </A11ySection>
          <A11ySection title="Your responsibility">
            <A11yList items={[
              "Make action labels describe the target (\"Review 20 assets\"), not just \"View\".",
              "Set CardTitle as=\"h2\" / \"h3\" / \"h4\" so cards fit the page outline.",
              "Don't make the whole card clickable as well as the button.",
            ]} />
          </A11ySection>
          <A11ySection title="Contrast" lede="Computed live from the tokens in the current theme.">
            <ContrastTable rows={[
              { label: "Title and value", fg: "text-primary", bg: "surface-app", min: 4.5 },
              { label: "Label and description", fg: "text-secondary", bg: "surface-app", min: 4.5 },
              { label: "Action", fg: "text-link", bg: "surface-app", min: 4.5 },
              { label: "Good trend", fg: "text-success", bg: "bg-success-subtle", min: 4.5 },
              { label: "Bad trend", fg: "text-error", bg: "bg-error-subtle", min: 4.5 },
            ]} />
          </A11ySection>
        </>
      }
    />
  );
}

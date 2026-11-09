import type { Metadata } from "next";
import { ComponentPage } from "@/components/styleguide/component-page";
import { InlineCode, Panel, Row, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { ColorTokenTabs, DimensionsTable, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable } from "@/components/styleguide/a11y-docs";
import { Indicator } from "@/components/ui/indicator";

export const metadata: Metadata = { title: "Indicator — Sentinel Design System" };

const HASH = "44d88612fea8a8f36de82e1278abb02f";

export default function IndicatorPage() {
  return (
    <ComponentPage
      title="Indicator"
      status="beta"
      description="An indicator of compromise — IP, domain, URL, hash or email — with its type, a reputation verdict and copy."
      examples={
        <>
          <SubSection title="Types">
            <Panel>
              <Row label="IP"><Indicator type="ip" value="185.220.101.47" verdict="malicious" /></Row>
              <Row label="Domain"><Indicator type="domain" value="login-micros0ft.com" verdict="suspicious" /></Row>
              <Row label="URL"><Indicator type="url" value="https://cdn.example.com/a.js" verdict="clean" /></Row>
              <Row label="Hash"><Indicator type="hash" value={HASH} verdict="malicious" /></Row>
              <Row label="Email"><Indicator type="email" value="billing@paypa1.co" verdict="unknown" /></Row>
            </Panel>
          </SubSection>
          <SubSection title="Defanged" lede="Shown as hxxps://evil[.]example so it can't be opened by accident. Copy still copies the real value.">
            <Panel>
              <Row label="URL"><Indicator type="url" value="https://evil.example/payload" verdict="malicious" defang /></Row>
            </Panel>
          </SubSection>
        </>
      }
      usage={
        <>
          <WhenToUse
            use={["List observables in alerts, threat-intel feeds and incident reports.", "Let analysts copy indicators into other tools quickly."]}
            avoid={[<>Show secrets — use <InlineCode>MaskedValue</InlineCode>.</>, "Show your own assets — use the asset name and a link."]}
          />
          <Guidelines items={[
            { type: "do", text: "Defang malicious URLs and domains in reports and shared views." },
            { type: "dont", text: "Make a malicious indicator a clickable link." },
            { type: "do", text: "Show the verdict next to the value; unknown is a valid answer." },
            { type: "dont", text: "Truncate IPs or domains — only hashes are shortened, with the full value on hover and in copy." },
          ]} />
        </>
      }
      specs={
        <>
          <SpecSection title="Properties">
            <PropertiesTable rows={[
              { name: "value", type: "string", default: "—", description: "The indicator. Copy always copies it unchanged." },
              { name: "type", type: "enum", default: "—", description: "ip · domain · url · hash · email. Sets the label and icon." },
              { name: "verdict", type: "enum", default: "—", description: "malicious · suspicious · clean · unknown." },
              { name: "defang", type: "boolean", default: "false", description: "Display as example[.]com / hxxp." },
              { name: "copyable", type: "boolean", default: "true", description: "Copy button." },
            ]} />
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable columns={["value"]} rows={[
              { label: "Height", values: ["28px"], note: "Verdict 24px" },
              { label: "Type label", values: ["11 / 500 uppercase"] },
              { label: "Value", values: ["12 mono"] },
              { label: "Hash shortening", values: ["first 10 … last 10"], note: "Over 24 characters" },
            ]} />
          </SpecSection>
          <SpecSection title="Color tokens">
            <ColorTokenTabs groups={[{ id: "v", label: "Verdict", rows: [
              { variant: "Malicious", bg: { token: "bg-error-subtle" }, text: { token: "text-error" } },
              { variant: "Suspicious", bg: { token: "bg-warning-subtle" }, text: { token: "text-warning" } },
              { variant: "Clean", bg: { token: "bg-success-subtle" }, text: { token: "text-success" } },
              { variant: "Unknown", bg: { token: "bg-subtle" }, text: { token: "text-secondary" } },
            ] }]} />
          </SpecSection>
        </>
      }
      code={
        <>
          <ExampleCard title="Default" code={`import { Indicator } from "@/components/ui/indicator";\n\n<Indicator type="ip" value="185.220.101.47" verdict="malicious" />`} preview={<Indicator type="ip" value="185.220.101.47" verdict="malicious" />} />
          <ExampleCard title="Defanged URL" code={`<Indicator type="url" value={ioc.url} verdict="malicious" defang />`} preview={<Indicator type="url" value="https://evil.example/payload" verdict="malicious" defang />} />
          <ExampleCard title="Defang helper" code={`import { defang } from "@/components/ui/indicator";\n\ndefang("https://evil.example"); // "hxxps://evil[.]example"`} preview={<code className="font-mono text-snt-12">hxxps://evil[.]example</code>} />
        </>
      }
      accessibility={
        <>
          <A11ySection title="Built in">
            <A11yList items={[
              "The type is written out (IP, Domain…), not shown by icon alone.",
              "The copy button names what it copies (“Copy ip 185.220.101.47”) and “Copied” is announced.",
              "Shortened hashes keep the full value in the title and in copy.",
            ]} />
          </A11ySection>
          <A11ySection title="Contrast">
            <ContrastTable rows={[
              { label: "Value", fg: "text-primary", bg: "surface-app", min: 4.5 },
              { label: "Malicious", fg: "text-error", bg: "bg-error-subtle", min: 4.5 },
              { label: "Suspicious", fg: "text-warning", bg: "bg-warning-subtle", min: 4.5 },
              { label: "Clean", fg: "text-success", bg: "bg-success-subtle", min: 4.5 },
            ]} />
          </A11ySection>
        </>
      }
    />
  );
}

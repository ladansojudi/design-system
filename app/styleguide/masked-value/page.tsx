import type { Metadata } from "next";
import { ComponentPage } from "@/components/styleguide/component-page";
import { InlineCode, Panel, Row, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { ColorTokenTabs, DimensionsTable, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable, KeyboardTable } from "@/components/styleguide/a11y-docs";
import { MaskedValue } from "@/components/ui/masked-value";

export const metadata: Metadata = { title: "Masked value — Sentinel Design System" };

const KEY = "sk_live_51NcX9fQe2R8vT4mZ7a3b";

export default function MaskedValuePage() {
  return (
    <ComponentPage
      title="Masked value"
      status="beta"
      description="A secret — API key, token, password — shown masked, with reveal and copy. Copy never needs a reveal."
      examples={
        <SubSection title="Variants" lede="The last characters stay visible, so people can tell keys apart without exposing them.">
          <Panel>
            <Row label="Default"><MaskedValue label="API key" value={KEY} /></Row>
            <Row label="Copy only"><MaskedValue label="Webhook secret" value="whsec_9f8e7d6c5b4a" revealable={false} /></Row>
            <Row label="Fully hidden"><MaskedValue label="Password" value="hunter2-but-longer" visibleChars={0} copyable={false} /></Row>
          </Panel>
        </SubSection>
      }
      usage={
        <>
          <WhenToUse
            use={["Show API keys, tokens, webhook secrets and connection strings in settings.", "Let people copy a secret without putting it on screen."]}
            avoid={[<>Password entry — use a <InlineCode>TextField</InlineCode> with type=&quot;password&quot;.</>, "Values that aren't secret: IDs, hostnames, hashes."]}
          />
          <Guidelines
            items={[
              { type: "do", text: "Keep the last 4 characters visible so a key can be matched to its record." },
              { type: "dont", text: "Show a full secret by default, even to admins. Screens get shared and recorded." },
              { type: "do", text: "Name the secret in label — it names the buttons (“Copy API key”)." },
              { type: "dont", text: "Re-show a secret you can't re-fetch. Show it once at creation, then masked." },
            ]}
          />
        </>
      }
      specs={
        <>
          <SpecSection title="Properties">
            <PropertiesTable rows={[
              { name: "value", type: "string", default: "—", description: "The secret. Copy always copies this." },
              { name: "label", type: "string", default: "—", description: "What the secret is. Names the buttons." },
              { name: "visibleChars", type: "number", default: "4", description: "Characters left visible at the end." },
              { name: "revealable", type: "boolean", default: "true", description: "Show / hide button." },
              { name: "copyable", type: "boolean", default: "true", description: "Copy button." },
            ]} />
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable columns={["value"]} rows={[
              { label: "Height", values: ["36px"] },
              { label: "Padding (left, right)", values: ["12px, 4px"] },
              { label: "Icon buttons", values: ["28 × 28, icon 14px"] },
              { label: "Value", values: ["12 mono"], note: "Truncates; never wraps" },
            ]} />
          </SpecSection>
          <SpecSection title="Color tokens">
            <ColorTokenTabs groups={[{ id: "f", label: "Field", rows: [
              { variant: "Field", bg: { token: "bg-subtle" }, text: { token: "text-primary" }, border: { token: "border-default" } },
              { variant: "Button", text: { token: "text-secondary" }, hover: { token: "bg-subtle" } },
            ] }]} />
          </SpecSection>
        </>
      }
      code={
        <>
          <ExampleCard title="Default" code={`import { MaskedValue } from "@/components/ui/masked-value";\n\n<MaskedValue label="API key" value={apiKey} />`} preview={<MaskedValue label="API key" value={KEY} />} />
          <ExampleCard title="Copy only" code={`<MaskedValue label="Webhook secret" value={secret} revealable={false} />`} preview={<MaskedValue label="Webhook secret" value="whsec_9f8e7d6c5b4a" revealable={false} />} />
        </>
      }
      accessibility={
        <>
          <A11ySection title="Keyboard">
            <KeyboardTable rows={[
              { keys: ["Tab"], action: "Moves to the Show and Copy buttons." },
              { keys: ["Enter", "Space"], action: "Shows / hides the value, or copies it." },
            ]} />
          </A11ySection>
          <A11ySection title="Built in">
            <A11yList items={[
              "While masked, screen readers hear the label and the last characters (“API key, hidden, ends in 3b”), not a row of dots.",
              <>The reveal button is a toggle with <InlineCode>aria-pressed</InlineCode>; both buttons are named from <InlineCode>label</InlineCode>.</>,
              <>&ldquo;Copied&rdquo; is announced through a polite live region.</>,
            ]} />
          </A11ySection>
          <A11ySection title="Contrast">
            <ContrastTable rows={[
              { label: "Value", fg: "text-primary", bg: "bg-subtle", min: 4.5 },
              { label: "Icon buttons", fg: "text-secondary", bg: "bg-subtle", min: 3 },
            ]} />
          </A11ySection>
        </>
      }
    />
  );
}

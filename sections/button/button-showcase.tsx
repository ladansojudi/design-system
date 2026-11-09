"use client";

import type React from "react";
import Link from "next/link";
import { ArrowRight, Download, Pencil, Plus, Trash2 } from "lucide-react";
import { ExampleCard } from "@/components/styleguide/example-card";
import { Button, buttonVariants } from "@/components/ui/button";

// Everything on this page renders the shipped <Button>. Designers take the
// component from the Figma library; developers copy code from the Dev view.

type Intent  = "primary" | "neutral" | "destructive";
type Variant = "solid" | "outline" | "ghost";
type Size    = "sm" | "md" | "lg";

const INTENTS:  Intent[]  = ["primary", "neutral", "destructive"];
const VARIANTS: Variant[] = ["solid", "outline", "ghost"];
const SIZES:    Size[]    = ["sm", "md", "lg"];

const LABEL: Record<Intent | Variant | Size, string> = {
  primary: "Primary", neutral: "Neutral", destructive: "Destructive",
  solid: "Solid", outline: "Outline", ghost: "Ghost",
  sm: "Small", md: "Medium", lg: "Large",
};

// ── Design view ───────────────────────────────────────────────────────────

function SectionTitle({ children, lede }: { children: React.ReactNode; lede?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <span aria-hidden className="hidden">▶▶</span>
        <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
      </div>
      {lede && <p className="mt-1 max-w-2xl text-snt-14 leading-relaxed text-snt-text-secondary">{lede}</p>}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-snt-border-default px-6 py-2">{children}</div>;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 border-b border-snt-border-default py-4 last:border-b-0 sm:grid-cols-[112px_minmax(0,1fr)] sm:items-center sm:gap-6">
      <span className="text-snt-12 font-medium text-snt-text-secondary">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function Variants() {
  return (
    <div>
      <SectionTitle lede="Intent sets the meaning, variant sets the emphasis.">Variants</SectionTitle>
      <Panel>
        {INTENTS.map((intent) => (
          <Row key={intent} label={LABEL[intent]}>
            {VARIANTS.map((variant) => (
              <Button key={variant} intent={intent} variant={variant}>{LABEL[variant]}</Button>
            ))}
          </Row>
        ))}
      </Panel>
    </div>
  );
}

function Sizes() {
  return (
    <div>
      <SectionTitle lede="Medium is the default. Small for dense tables and filter bars, Large for touch-first screens and empty-state calls to action.">
        Sizes
      </SectionTitle>
      <Panel>
        <Row label="With label">
          {SIZES.map((size) => (
            <Button key={size} size={size}>{LABEL[size]}</Button>
          ))}
        </Row>
        <Row label="Icon only">
          {SIZES.map((size) => (
            <Button key={size} intent="neutral" variant="outline" size={size} iconOnly aria-label="Edit">
              <Pencil />
            </Button>
          ))}
        </Row>
      </Panel>
    </div>
  );
}

function States() {
  return (
    <div>
      <SectionTitle lede="Hover and focus are live: point at a button, or press Tab to see the focus ring.">States</SectionTitle>
      <Panel>
        <Row label="Enabled">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>{LABEL[variant]}</Button>
          ))}
        </Row>
        <Row label="Disabled">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} disabled>{LABEL[variant]}</Button>
          ))}
        </Row>
        <Row label="Loading">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} loading>Saving</Button>
          ))}
        </Row>
      </Panel>
    </div>
  );
}

function WithIcons() {
  return (
    <div>
      <SectionTitle lede="Icons are sized by the button: 14px with a label, 14 / 16 / 20px when icon-only.">With icons</SectionTitle>
      <Panel>
        <Row label="Leading">
          <Button><Plus /> New scan</Button>
          <Button intent="neutral" variant="outline"><Download /> Export</Button>
          <Button intent="destructive"><Trash2 /> Delete</Button>
        </Row>
        <Row label="Trailing">
          <Button>Continue <ArrowRight /></Button>
          <Button variant="ghost">Learn more <ArrowRight /></Button>
        </Row>
        <Row label="Icon only">
          <Button intent="neutral" variant="ghost" iconOnly aria-label="Edit"><Pencil /></Button>
          <Button intent="destructive" variant="ghost" iconOnly aria-label="Delete"><Trash2 /></Button>
        </Row>
      </Panel>
    </div>
  );
}

function Density() {
  return (
    <div>
      <SectionTitle lede='Add data-snt-density="compact" to any container — a table page, or the whole app — and buttons, fields and tables inside it tighten up.'>
        Density
      </SectionTitle>
      <Panel>
        <Row label="Default">
          {SIZES.map((size) => <Button key={size} size={size}>{LABEL[size]}</Button>)}
        </Row>
        <div data-snt-density="compact">
          <Row label="Compact">
            {SIZES.map((size) => <Button key={size} size={size}>{LABEL[size]}</Button>)}
          </Row>
        </div>
      </Panel>
    </div>
  );
}

export function ButtonShowcase() {
  return (
    <div className="space-y-10">
      <Variants />
      <Sizes />
      <States />
      <WithIcons />
      <Density />
    </div>
  );
}

// ── Dev view: copy-paste examples ─────────────────────────────────────────

const IMPORT = `import { Button } from "@/components/ui/button";`;

function Preview({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

export function ButtonExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Default"
        code={`${IMPORT}\n\nexport function StartScan() {\n  return <Button>Start scan</Button>;\n}`}
        preview={<Button>Start scan</Button>}
      />
      <ExampleCard
        title="Variants"
        code={`<Button>Save changes</Button>\n<Button variant="outline">Preview</Button>\n<Button variant="ghost">Skip</Button>`}
        preview={
          <Preview>
            <Button>Save changes</Button>
            <Button variant="outline">Preview</Button>
            <Button variant="ghost">Skip</Button>
          </Preview>
        }
      />
      <ExampleCard
        title="Intents"
        code={`<Button>Start scan</Button>\n<Button intent="neutral" variant="outline">Cancel</Button>\n<Button intent="destructive">Delete asset</Button>`}
        preview={
          <Preview>
            <Button>Start scan</Button>
            <Button intent="neutral" variant="outline">Cancel</Button>
            <Button intent="destructive">Delete asset</Button>
          </Preview>
        }
      />
      <ExampleCard
        title="Sizes"
        code={`<Button size="sm">Small</Button>\n<Button>Medium</Button>\n<Button size="lg">Large</Button>`}
        preview={
          <Preview>
            {SIZES.map((size) => <Button key={size} size={size}>{LABEL[size]}</Button>)}
          </Preview>
        }
      />
      <ExampleCard
        title="With icon"
        code={`import { Download } from "lucide-react";\n${IMPORT}\n\n<Button intent="neutral" variant="outline">\n  <Download /> Export CSV\n</Button>`}
        preview={<Button intent="neutral" variant="outline"><Download /> Export CSV</Button>}
      />
      <ExampleCard
        title="Icon only"
        code={`import { Trash2 } from "lucide-react";\n${IMPORT}\n\n// aria-label is required: the icon has no text a screen reader can read.\n<Button intent="destructive" variant="ghost" iconOnly aria-label="Delete asset">\n  <Trash2 />\n</Button>`}
        preview={<Button intent="destructive" variant="ghost" iconOnly aria-label="Delete asset"><Trash2 /></Button>}
      />
      <ExampleCard
        title="Loading"
        code={`"use client";\n\nimport { useState } from "react";\n${IMPORT}\n\nexport function SaveButton({ onSave }: { onSave: () => Promise<void> }) {\n  const [saving, setSaving] = useState(false);\n  return (\n    <Button\n      loading={saving}\n      onClick={async () => {\n        setSaving(true);\n        try {\n          await onSave();\n        } finally {\n          setSaving(false);\n        }\n      }}\n    >\n      Save changes\n    </Button>\n  );\n}`}
        preview={<Button loading>Save changes</Button>}
      />
      <ExampleCard
        title="Link styled as a button"
        code={`import Link from "next/link";\nimport { buttonVariants } from "@/components/ui/button";\n\n// Navigation should be a real link, not a <button>.\n<Link href="/scans" className={buttonVariants({ intent: "neutral", variant: "outline" })}>\n  View scans\n</Link>`}
        preview={
          <Link href="/styleguide/button" className={buttonVariants({ intent: "neutral", variant: "outline" })}>
            View scans
          </Link>
        }
      />
    </div>
  );
}

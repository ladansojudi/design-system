"use client";

import type React from "react";
import { useState } from "react";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";
import { Checkbox } from "@/components/ui/checkbox";

// ── Checkbox primitive ────────────────────────────────────────────────────

type Tone = "primary" | "neutral";

// ── Showcase ──────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <span className="text-[15px] font-semibold text-snt-text-primary">{children}</span>
    </div>
  );
}

function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-8 py-4 border-b border-snt-neutral-divider-10 last:border-b-0">
      <span className="w-20 shrink-0 pt-1 text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </div>
  );
}

// ── Snippets ──────────────────────────────────────────────────────────────

type CheckboxSnippetOpts = {
  checked?:       boolean;
  indeterminate?: boolean;
  disabled?:      boolean;
  tone?:          Tone;
  label?:         string;
  description?:   string;
};

function checkboxSnippets(opts: CheckboxSnippetOpts): Record<Platform, string> {
  const {
    checked = false,
    indeterminate = false,
    disabled = false,
    tone = "primary",
    label,
    description,
  } = opts;

  const reactProps = [
    checked && "checked",
    indeterminate && "indeterminate",
    disabled && "disabled",
    tone !== "primary" && `tone="${tone}"`,
    label && `label="${label}"`,
    description && `description="${description}"`,
  ].filter(Boolean).join(" ");

  const swiftState = indeterminate ? ".mixed" : checked ? ".on" : ".off";
  const swiftMods = [
    tone !== "primary" && `.checkboxStyle(.sentinel(.${tone}))`,
    disabled && `.disabled(true)`,
  ].filter(Boolean).join("\n    ");

  const xmlProps = [
    `android:layout_width="wrap_content"`,
    `android:layout_height="wrap_content"`,
    label && `android:text="${label}"`,
    checked && `android:checked="true"`,
    indeterminate && `app:indeterminate="true"`,
    disabled && `android:enabled="false"`,
    tone !== "primary" && `app:tone="${tone}"`,
  ].filter(Boolean).join("\n    ");

  return {
    react: `<Checkbox ${reactProps} />`,
    swift: label
      ? `Checkbox("${label}", state: ${swiftState})${swiftMods ? "\n    " + swiftMods : ""}`
      : `Checkbox(state: ${swiftState})${swiftMods ? "\n    " + swiftMods : ""}`,
    xml: `<com.sentinel.ui.Checkbox
    ${xmlProps} />`,
  };
}

const PARENT_GROUP_SNIPPETS: Record<Platform, string> = {
  react: `const ITEMS = ["Firewalls", "Endpoints", "Containers", "Cloud services"];
const all  = ITEMS.every((i) => list[i]);
const some = !all && ITEMS.some((i) => list[i]);

<Checkbox
  checked={all}
  indeterminate={some}
  onChange={(v) => setList(Object.fromEntries(ITEMS.map((i) => [i, v])))}
  label="All asset types"
/>
{ITEMS.map((item) => (
  <Checkbox
    key={item}
    checked={list[item]}
    onChange={(v) => setList((p) => ({ ...p, [item]: v }))}
    label={item}
  />
))}`,
  swift: `let items = ["Firewalls", "Endpoints", "Containers", "Cloud services"]
@State private var list: [String: Bool] = [:]
var allOn:  Bool { items.allSatisfy { list[$0] == true } }
var someOn: Bool { !allOn && items.contains { list[$0] == true } }

Checkbox(
    "All asset types",
    state: someOn ? .mixed : (allOn ? .on : .off)
) { isOn in
    items.forEach { list[$0] = isOn }
}

ForEach(items, id: \\.self) { item in
    Checkbox(item, state: list[item] == true ? .on : .off) { isOn in
        list[item] = isOn
    }
}`,
  xml: `<!-- Parent triState checkbox + children in a LinearLayout -->
<com.sentinel.ui.Checkbox
    android:id="@+id/parent"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="All asset types"
    app:triState="true" />

<LinearLayout
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:paddingStart="24dp">
    <com.sentinel.ui.Checkbox android:text="Firewalls"      android:checked="true"  />
    <com.sentinel.ui.Checkbox android:text="Endpoints"      android:checked="false" />
    <com.sentinel.ui.Checkbox android:text="Containers"    android:checked="true"  />
    <com.sentinel.ui.Checkbox android:text="Cloud services" android:checked="false" />
</LinearLayout>`,
};

const ITEMS = ["Firewalls", "Endpoints", "Containers", "Cloud services"];

export function CheckboxShowcase() {
  const [single, setSingle] = useState(true);
  const [list,   setList]   = useState<Record<string, boolean>>({
    Firewalls: true, Endpoints: false, Containers: true, "Cloud services": false,
  });
  const all  = ITEMS.every((i) => list[i]);
  const some = !all && ITEMS.some((i) => list[i]);

  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>States</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-6">
          <PropertyRow label="Variants">
            <Copyable snippets={checkboxSnippets({ checked: false })} svgPath="/svg/checkbox/unchecked.svg">
              <Checkbox checked={false}                 onChange={() => {}} />
            </Copyable>
            <Copyable snippets={checkboxSnippets({ checked: true })} svgPath="/svg/checkbox/checked.svg">
              <Checkbox checked={single} onChange={setSingle} />
            </Copyable>
            <Copyable snippets={checkboxSnippets({ indeterminate: true })} svgPath="/svg/checkbox/indeterminate.svg">
              <Checkbox checked={false} indeterminate onChange={() => {}} />
            </Copyable>
            <Copyable snippets={checkboxSnippets({ checked: true, tone: "neutral" })}>
              <Checkbox checked tone="neutral" onChange={() => {}} />
            </Copyable>
          </PropertyRow>
          <PropertyRow label="Disabled">
            <Copyable snippets={checkboxSnippets({ checked: false, disabled: true })}>
              <Checkbox checked={false} disabled />
            </Copyable>
            <Copyable snippets={checkboxSnippets({ checked: true, disabled: true })}>
              <Checkbox checked        disabled />
            </Copyable>
            <Copyable snippets={checkboxSnippets({ indeterminate: true, disabled: true })}>
              <Checkbox checked={false} indeterminate disabled />
            </Copyable>
          </PropertyRow>
        </div>
      </div>

      <div>
        <SectionTitle>With label · description</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-5 space-y-4">
          <Copyable
            snippets={checkboxSnippets({
              checked: true,
              label: "Enable real-time alerts",
              description: "Notifies you within seconds when a new critical finding lands.",
            })}
            className="block w-full"
          >
            <Checkbox
              checked={single}
              onChange={setSingle}
              label="Enable real-time alerts"
              description="Notifies you within seconds when a new critical finding lands."
            />
          </Copyable>
          <Copyable
            snippets={checkboxSnippets({ checked: false, label: "Subscribe to weekly digest" })}
            className="block w-full"
          >
            <Checkbox checked={false} onChange={() => {}} label="Subscribe to weekly digest" />
          </Copyable>
          <Copyable
            snippets={checkboxSnippets({ checked: true, disabled: true, label: "Account already verified" })}
            className="block w-full"
          >
            <Checkbox checked disabled label="Account already verified" />
          </Copyable>
        </div>
      </div>

      <div>
        <SectionTitle>Indeterminate parent (multi-select pattern)</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-5">
          <Copyable snippets={PARENT_GROUP_SNIPPETS} className="block w-full">
            <div className="space-y-3">
              <Checkbox
                checked={all}
                indeterminate={some}
                onChange={(v) =>
                  setList(Object.fromEntries(ITEMS.map((i) => [i, v])))
                }
                label="All asset types"
              />
              <div className="pl-6 space-y-2 border-l border-snt-neutral-divider-10">
                {ITEMS.map((item) => (
                  <Checkbox
                    key={item}
                    checked={list[item]}
                    onChange={(v) => setList((prev) => ({ ...prev, [item]: v }))}
                    label={item}
                  />
                ))}
              </div>
            </div>
          </Copyable>
        </div>
      </div>
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function CheckboxExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Unchecked"
        code={checkboxSnippets({ checked: false }).react}
        preview={<Checkbox checked={false} onChange={() => {}} />}
      />
      <ExampleCard
        title="Checked"
        code={checkboxSnippets({ checked: true }).react}
        preview={<Checkbox checked onChange={() => {}} />}
      />
      <ExampleCard
        title="Indeterminate"
        code={checkboxSnippets({ indeterminate: true }).react}
        preview={<Checkbox checked={false} indeterminate onChange={() => {}} />}
      />
      <ExampleCard
        title="Neutral tone"
        code={checkboxSnippets({ checked: true, tone: "neutral" }).react}
        preview={<Checkbox checked tone="neutral" onChange={() => {}} />}
      />
      <ExampleCard
        title="Disabled · Checked"
        code={checkboxSnippets({ checked: true, disabled: true }).react}
        preview={<Checkbox checked disabled />}
      />
      <ExampleCard
        title="With label and description"
        code={checkboxSnippets({
          checked: true,
          label: "Enable real-time alerts",
          description: "Notifies you within seconds when a new critical finding lands.",
        }).react}
        preview={
          <div className="w-full max-w-sm">
            <Checkbox
              checked
              onChange={() => {}}
              label="Enable real-time alerts"
              description="Notifies you within seconds when a new critical finding lands."
            />
          </div>
        }
      />
    </div>
  );
}

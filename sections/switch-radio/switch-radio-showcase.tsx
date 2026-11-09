"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";
import { Switch, Radio } from "@/components/ui/switch-radio";

// ── Toggle ─────────────────────────────────────────────────────────────────

type ToggleVariant = "dark" | "primary";

function Toggle({
  checked,
  onChange,
  variant = "dark",
  disabled = false,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  variant?: ToggleVariant;
  disabled?: boolean;
}) {
  return <Switch checked={checked} onChange={onChange} variant={variant} disabled={disabled} aria-label="Example switch" />;
}

// ── Radio ──────────────────────────────────────────────────────────────────

function RadioButton({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) {
  return <Radio checked={checked} onChange={onChange} disabled={disabled} aria-label="Example option" />;
}

// ── Shared layout ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-8 py-4 border-b border-snt-neutral-divider-10 last:border-b-0">
      <span className="w-16 shrink-0 text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </div>
  );
}

function ItemLabel({ label, disabled }: { label: string; disabled?: boolean }) {
  return (
    <span className={cn("text-[14px]", disabled ? "text-snt-text-disabled" : "text-snt-text-primary")}>
      {label}
    </span>
  );
}

// ── Snippet builders ──────────────────────────────────────────────────────

function switchSnippets(variant: ToggleVariant, checked: boolean, label: string): Record<Platform, string> {
  return {
    react: `<Switch checked={${checked}} variant="${variant}" onChange={setOn} />`,
    swift: `Toggle("${label}", isOn: $isOn)
    .toggleStyle(.sentinel(.${variant}))`,
    xml:   `<com.google.android.material.materialswitch.MaterialSwitch
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:checked="${checked}"
    app:variant="${variant}" />`,
  };
}

function switchDisabledSnippets(variant: ToggleVariant, checked: boolean): Record<Platform, string> {
  return {
    react: `<Switch checked={${checked}} variant="${variant}" disabled />`,
    swift: `Toggle("Disabled", isOn: .constant(${checked}))
    .toggleStyle(.sentinel(.${variant}))
    .disabled(true)`,
    xml:   `<com.google.android.material.materialswitch.MaterialSwitch
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:checked="${checked}"
    android:enabled="false"
    app:variant="${variant}" />`,
  };
}

const RADIO_GROUP_SNIPPETS: Record<Platform, string> = {
  react: `<RadioGroup value={selected} onChange={setSelected}>
  <Radio value="Option 1">Option 1</Radio>
  <Radio value="Option 2">Option 2</Radio>
  <Radio value="Option 3">Option 3</Radio>
  <Radio value="Option 4">Option 4</Radio>
</RadioGroup>`,
  swift: `Picker("Options", selection: $selected) {
    Text("Option 1").tag("Option 1")
    Text("Option 2").tag("Option 2")
    Text("Option 3").tag("Option 3")
    Text("Option 4").tag("Option 4")
}
.pickerStyle(.radioGroup)`,
  xml: `<RadioGroup
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="vertical">
    <RadioButton android:id="@+id/opt1" android:text="Option 1" android:checked="true" />
    <RadioButton android:id="@+id/opt2" android:text="Option 2" />
    <RadioButton android:id="@+id/opt3" android:text="Option 3" />
    <RadioButton android:id="@+id/opt4" android:text="Option 4" />
</RadioGroup>`,
};

function radioDisabledSnippets(checked: boolean): Record<Platform, string> {
  return {
    react: `<Radio checked={${checked}} disabled>${checked ? "Checked" : "Unchecked"}</Radio>`,
    swift: `Picker("", selection: .constant("${checked ? "yes" : "no"}")) {
    Text("${checked ? "Checked" : "Unchecked"}").tag("${checked ? "yes" : "no"}")
}
.pickerStyle(.radioGroup)
.disabled(true)`,
    xml: `<RadioButton
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="${checked ? "Checked" : "Unchecked"}"
    android:checked="${checked}"
    android:enabled="false" />`,
  };
}

// ── Switch showcase ────────────────────────────────────────────────────────

function SwitchCard() {
  const [darkOn, setDarkOn]       = useState(false);
  const [primaryOn, setPrimaryOn] = useState(true);

  return (
    <div>
      <SectionTitle>Switch</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-6">
        <PropertyRow label="Variant">
          <Copyable
            snippets={switchSnippets("dark", darkOn, darkOn ? "Checked" : "UnChecked")}
            svgPath={`/svg/switch/${darkOn ? "on" : "off"}.svg`}
          >
            <div className="flex items-center gap-2.5">
              <Toggle checked={darkOn} onChange={setDarkOn} variant="dark" />
              <ItemLabel label={darkOn ? "Checked" : "UnChecked"} />
            </div>
          </Copyable>
          <Copyable
            snippets={switchSnippets("primary", primaryOn, primaryOn ? "Checked" : "UnChecked")}
            svgPath={`/svg/switch/${primaryOn ? "on" : "off"}.svg`}
          >
            <div className="flex items-center gap-2.5">
              <Toggle checked={primaryOn} onChange={setPrimaryOn} variant="primary" />
              <ItemLabel label={primaryOn ? "Checked" : "UnChecked"} />
            </div>
          </Copyable>
        </PropertyRow>

        <PropertyRow label="Disabled">
          <Copyable snippets={switchDisabledSnippets("dark", false)}>
            <div className="flex items-center gap-2.5">
              <Toggle checked={false} disabled />
              <ItemLabel label="Disabled" disabled />
            </div>
          </Copyable>
          <Copyable snippets={switchDisabledSnippets("dark", true)}>
            <div className="flex items-center gap-2.5">
              <Toggle checked={true} variant="dark" disabled />
              <ItemLabel label="Disabled" disabled />
            </div>
          </Copyable>
          <Copyable snippets={switchDisabledSnippets("primary", true)}>
            <div className="flex items-center gap-2.5">
              <Toggle checked={true} variant="primary" disabled />
              <ItemLabel label="Disabled" disabled />
            </div>
          </Copyable>
        </PropertyRow>
      </div>
    </div>
  );
}

// ── Radio showcase ─────────────────────────────────────────────────────────

const RADIO_OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4"];

function RadioCard() {
  const [selected, setSelected] = useState<string>("Option 1");

  return (
    <div>
      <SectionTitle>Radio</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-6">
        <PropertyRow label="Options">
          <Copyable snippets={RADIO_GROUP_SNIPPETS}>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {RADIO_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <RadioButton checked={selected === opt} onChange={() => setSelected(opt)} />
                  <span className="text-[14px] text-snt-text-primary">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </Copyable>
        </PropertyRow>

        <PropertyRow label="Disabled">
          <Copyable snippets={radioDisabledSnippets(false)}>
            <div className="flex items-center gap-2.5">
              <RadioButton checked={false} disabled />
              <ItemLabel label="Unchecked" disabled />
            </div>
          </Copyable>
          <Copyable snippets={radioDisabledSnippets(true)}>
            <div className="flex items-center gap-2.5">
              <RadioButton checked={true} disabled />
              <ItemLabel label="Checked" disabled />
            </div>
          </Copyable>
        </PropertyRow>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export function SwitchRadioShowcase() {
  return (
    <div className="space-y-10">
      <SwitchCard />
      <RadioCard />
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

function SwitchExamplePreview({
  variant,
  checked,
  disabled = false,
  label,
}: {
  variant?: ToggleVariant;
  checked: boolean;
  disabled?: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Toggle checked={checked} variant={variant} disabled={disabled} />
      <ItemLabel label={label} disabled={disabled} />
    </div>
  );
}

function RadioExamplePreview({
  checked,
  disabled = false,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <RadioButton checked={checked} disabled={disabled} />
      <ItemLabel label={label} disabled={disabled} />
    </div>
  );
}

export function SwitchRadioExamples() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Switch</SectionTitle>
        <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
          Toggle variants across dark and primary, plus disabled states.
        </p>
        <div className="space-y-4">
          <ExampleCard
            title="Dark · Unchecked"
            code={`<Switch checked={false} variant="dark" onChange={setOn} />`}
            preview={<SwitchExamplePreview variant="dark" checked={false} label="UnChecked" />}
            density="tight"
          />
          <ExampleCard
            title="Primary · Checked"
            code={`<Switch checked={true} variant="primary" onChange={setOn} />`}
            preview={<SwitchExamplePreview variant="primary" checked={true} label="Checked" />}
            density="tight"
          />
          <ExampleCard
            title="Disabled · Unchecked"
            code={`<Switch checked={false} variant="dark" disabled />`}
            preview={<SwitchExamplePreview variant="dark" checked={false} disabled label="Disabled" />}
            density="tight"
          />
          <ExampleCard
            title="Disabled · Checked"
            code={`<Switch checked={true} variant="primary" disabled />`}
            preview={<SwitchExamplePreview variant="primary" checked={true} disabled label="Disabled" />}
            density="tight"
          />
        </div>
      </div>

      <div>
        <SectionTitle>Radio</SectionTitle>
        <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
          Single options and grouped radio buttons.
        </p>
        <div className="space-y-4">
          <ExampleCard
            title="Radio group"
            code={RADIO_GROUP_SNIPPETS.react}
            preview={
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {RADIO_OPTIONS.map((opt, i) => (
                  <label key={opt} className="flex items-center gap-2.5">
                    <RadioButton checked={i === 0} />
                    <span className="text-[14px] text-snt-text-primary">{opt}</span>
                  </label>
                ))}
              </div>
            }
          />
          <ExampleCard
            title="Disabled · Unchecked"
            code={`<Radio checked={false} disabled>Unchecked</Radio>`}
            preview={<RadioExamplePreview checked={false} disabled label="Unchecked" />}
            density="tight"
          />
          <ExampleCard
            title="Disabled · Checked"
            code={`<Radio checked={true} disabled>Checked</Radio>`}
            preview={<RadioExamplePreview checked={true} disabled label="Checked" />}
            density="tight"
          />
        </div>
      </div>
    </div>
  );
}

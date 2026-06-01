"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Copyable } from "@/components/styleguide/copyable";
import { type Platform } from "@/components/styleguide/platform-provider";

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
  const track = checked
    ? variant === "primary"
      ? cn("bg-s4e-btn-primary-600", !disabled && "hover:bg-s4e-btn-primary-700")
      : cn("bg-s4e-neutral-grey-800", !disabled && "hover:bg-s4e-neutral-grey-900")
    : cn("bg-s4e-neutral-grey-300", !disabled && "hover:bg-s4e-neutral-grey-400");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative w-9 h-[22px] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-s4e-brand-primary-500",
        track,
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
      )}
    >
      <div
        className={cn(
          "absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
          checked ? "translate-x-[18px]" : "translate-x-[3px]",
        )}
      />
    </button>
  );
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
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.()}
      className={cn(
        "w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-s4e-brand-primary-500",
        checked
          ? "border-s4e-neutral-grey-800"
          : "border-s4e-neutral-grey-400 hover:border-s4e-neutral-grey-600",
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
      )}
    >
      {checked && (
        <div className="w-2 h-2 rounded-full bg-s4e-neutral-grey-800 transition-transform scale-100" />
      )}
    </button>
  );
}

// ── Shared layout ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-8 py-4 border-b border-s4e-neutral-divider-10 last:border-b-0">
      <span className="w-16 shrink-0 text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </div>
  );
}

function ItemLabel({ label, disabled }: { label: string; disabled?: boolean }) {
  return (
    <span className={cn("text-[13px]", disabled ? "text-s4e-text-disabled" : "text-s4e-text-primary")}>
      {label}
    </span>
  );
}

// ── Snippet builders ──────────────────────────────────────────────────────

function switchSnippets(variant: ToggleVariant, checked: boolean, label: string): Record<Platform, string> {
  return {
    react: `<Switch checked={${checked}} variant="${variant}" onChange={setOn} />`,
    swift: `Toggle("${label}", isOn: $isOn)
    .toggleStyle(.s4e(.${variant}))`,
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
    .toggleStyle(.s4e(.${variant}))
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
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-6">
        <PropertyRow label="Variant">
          <Copyable snippets={switchSnippets("dark", darkOn, darkOn ? "Checked" : "UnChecked")}>
            <div className="flex items-center gap-2.5">
              <Toggle checked={darkOn} onChange={setDarkOn} variant="dark" />
              <ItemLabel label={darkOn ? "Checked" : "UnChecked"} />
            </div>
          </Copyable>
          <Copyable snippets={switchSnippets("primary", primaryOn, primaryOn ? "Checked" : "UnChecked")}>
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
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-6">
        <PropertyRow label="Options">
          <Copyable snippets={RADIO_GROUP_SNIPPETS}>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {RADIO_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <RadioButton checked={selected === opt} onChange={() => setSelected(opt)} />
                  <span className="text-[13px] text-s4e-text-primary">
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

"use client";

import type React from "react";
import { useState } from "react";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";
import { Select } from "@/components/ui/select";

// ── Types ─────────────────────────────────────────────────────────────────

type Option = { value: string; label: string; disabled?: boolean };
type State  = "Default" | "Hover" | "Focused" | "Error" | "Disabled";

// ── Select component ──────────────────────────────────────────────────────

// ── Snippet builders ──────────────────────────────────────────────────────

type SnippetOpts = {
  label?:        string;
  options:       Option[];
  optionsName:   string;
  bindingName:   string;
  placeholder?:  string;
  helperText?:   string;
  errorText?:    string;
  state?:        State;
};

function selectSnippets({
  label, options, optionsName, bindingName, placeholder, helperText, errorText, state,
}: SnippetOpts): Record<Platform, string> {
  const isError = state === "Error";
  const reactProps = [
    label       ? ` label="${label}"`                : "",
    ` options={${optionsName}}`,
    ` value={${bindingName}}`,
    ` onChange={set${bindingName[0].toUpperCase()}${bindingName.slice(1)}}`,
    placeholder ? ` placeholder="${placeholder}"`    : "",
    helperText  ? ` helperText="${helperText}"`      : "",
    isError     ? ` state="error"`                   : "",
    errorText   ? ` errorText="${errorText}"`        : "",
  ].join("");
  const swiftLabel = label ?? "Select";
  const swiftCases = options.map(
    (o) => `        Text("${o.label}").tag("${o.value}")`,
  ).join("\n");
  const swiftMods = [
    `.pickerStyle(.menu)`,
    isError && errorText ? `.sentinelErrorText("${errorText}")` : null,
    helperText           ? `.sentinelHelperText("${helperText}")` : null,
  ].filter(Boolean).join("\n    ");
  const xmlItems = options.map(
    (o) => `        <item>${o.label}</item>`,
  ).join("\n");
  return {
    react: `<Select${reactProps} />`,
    swift: `Picker("${swiftLabel}", selection: $${bindingName}) {
${swiftCases}
}
${swiftMods}`,
    xml:   `<com.google.android.material.textfield.TextInputLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    style="@style/Widget.Material3.TextInputLayout.OutlinedBox.ExposedDropdownMenu"${label ? `\n    android:hint="${label}"` : ""}${isError ? `\n    app:errorEnabled="true"` : ""}${errorText ? `\n    app:error="${errorText}"` : ""}${helperText ? `\n    app:helperText="${helperText}"` : ""}>
    <AutoCompleteTextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="none"${placeholder ? `\n        android:hint="${placeholder}"` : ""}>
${xmlItems}
    </AutoCompleteTextView>
</com.google.android.material.textfield.TextInputLayout>`,
  };
}

// ── Showcase ──────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

const REGIONS: Option[] = [
  { value: "eu-west-1", label: "Europe (Frankfurt)" },
  { value: "us-east-1", label: "US East (Virginia)" },
  { value: "us-west-2", label: "US West (Oregon)" },
  { value: "ap-south-1",label: "Asia Pacific (Mumbai)" },
  { value: "sa-east-1", label: "South America (São Paulo)", disabled: true },
];

export function SelectShowcase() {
  const [region,  setRegion]  = useState<string>("eu-west-1");
  const [tier,    setTier]    = useState<string>("pro");
  const [empty,   setEmpty]   = useState<string>("");

  const TIERS: Option[] = [
    { value: "free",       label: "Free — Basic dashboards" },
    { value: "pro",        label: "Pro — Real-time scans + alerts" },
    { value: "enterprise", label: "Enterprise — SSO + audit logs" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Variants</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Copyable
            className="block w-full"
            snippets={selectSnippets({
              label: "Region",
              options: REGIONS,
              optionsName: "REGIONS",
              bindingName: "region",
              helperText: "Data is processed in this region only.",
            })}
          >
            <Select
              label="Region"
              options={REGIONS}
              value={region}
              onChange={setRegion}
              helperText="Data is processed in this region only."
            />
          </Copyable>
          <Copyable
            className="block w-full"
            snippets={selectSnippets({
              label: "Subscription tier",
              options: TIERS,
              optionsName: "TIERS",
              bindingName: "tier",
            })}
          >
            <Select
              label="Subscription tier"
              options={TIERS}
              value={tier}
              onChange={setTier}
            />
          </Copyable>
          <Copyable
            className="block w-full"
            snippets={selectSnippets({
              label: "Empty",
              options: REGIONS,
              optionsName: "REGIONS",
              bindingName: "region",
              placeholder: "Pick a region",
            })}
          >
            <Select
              label="Empty"
              options={REGIONS}
              value={empty}
              onChange={setEmpty}
              placeholder="Pick a region"
            />
          </Copyable>
          <Copyable
            className="block w-full"
            snippets={selectSnippets({
              label: "With error",
              options: REGIONS,
              optionsName: "REGIONS",
              bindingName: "region",
              state: "Error",
              errorText: "This field is required.",
            })}
          >
            <Select
              label="With error"
              options={REGIONS}
              value=""
              state="Error"
              errorText="This field is required."
            />
          </Copyable>
        </div>
      </div>

      <div>
        <SectionTitle>States</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(["Default", "Hover", "Focused", "Error", "Disabled"] as State[]).map((s) => (
            <Select
              key={s}
              label={s}
              options={REGIONS}
              value="eu-west-1"
              state={s}
              disabled={s === "Disabled"}
              errorText={s === "Error" ? "Region unavailable in your plan" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function SelectExamples() {
  const [region, setRegion] = useState<string>("eu-west-1");
  const [empty, setEmpty]   = useState<string>("");
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Default · With helper"
        code={selectSnippets({
          label: "Region",
          options: REGIONS,
          optionsName: "REGIONS",
          bindingName: "region",
          helperText: "Data is processed in this region only.",
        }).react}
        preview={
          <div className="w-full max-w-xs">
            <Select
              label="Region"
              options={REGIONS}
              value={region}
              onChange={setRegion}
              helperText="Data is processed in this region only."
            />
          </div>
        }
      />
      <ExampleCard
        title="Empty · With placeholder"
        code={selectSnippets({
          label: "Region",
          options: REGIONS,
          optionsName: "REGIONS",
          bindingName: "region",
          placeholder: "Pick a region",
        }).react}
        preview={
          <div className="w-full max-w-xs">
            <Select
              label="Region"
              options={REGIONS}
              value={empty}
              onChange={setEmpty}
              placeholder="Pick a region"
            />
          </div>
        }
      />
      <ExampleCard
        title="Error"
        code={selectSnippets({
          label: "Region",
          options: REGIONS,
          optionsName: "REGIONS",
          bindingName: "region",
          state: "Error",
          errorText: "This field is required.",
        }).react}
        preview={
          <div className="w-full max-w-xs">
            <Select
              label="Region"
              options={REGIONS}
              value=""
              state="Error"
              errorText="This field is required."
            />
          </div>
        }
      />
      <ExampleCard
        title="Focused"
        code={selectSnippets({
          label: "Region",
          options: REGIONS,
          optionsName: "REGIONS",
          bindingName: "region",
          state: "Focused",
        }).react}
        preview={
          <div className="w-full max-w-xs">
            <Select
              label="Region"
              options={REGIONS}
              value="eu-west-1"
              state="Focused"
            />
          </div>
        }
      />
      <ExampleCard
        title="Disabled"
        code={selectSnippets({
          label: "Region",
          options: REGIONS,
          optionsName: "REGIONS",
          bindingName: "region",
          state: "Disabled",
        }).react}
        preview={
          <div className="w-full max-w-xs">
            <Select
              label="Region"
              options={REGIONS}
              value="eu-west-1"
              state="Disabled"
              disabled
            />
          </div>
        }
      />
    </div>
  );
}

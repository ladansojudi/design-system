"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";

// ── Types ─────────────────────────────────────────────────────────────────

type Option = { value: string; label: string; disabled?: boolean };
type State  = "Default" | "Hover" | "Focused" | "Error" | "Disabled";

// ── Select component ──────────────────────────────────────────────────────

function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "Select…",
  state = "Default",
  helperText,
  errorText,
  disabled = false,
}: {
  label?:       string;
  options:      Option[];
  value?:       string;
  onChange?:    (v: string) => void;
  placeholder?: string;
  state?:       State;
  helperText?:  string;
  errorText?:   string;
  disabled?:    boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isError    = state === "Error";
  const isDisabled = disabled || state === "Disabled";
  const isFocused  = state === "Focused" || open;
  const selected   = options.find((o) => o.value === value);

  const borderClass = isError
    ? "border-s4e-scale-red-600"
    : isFocused
      ? "border-s4e-brand-primary-600"
      : state === "Hover"
        ? "border-s4e-neutral-grey-500"
        : "border-s4e-neutral-grey-300";

  return (
    <div className="w-full" ref={ref}>
      {label && (
        <label className={cn(
          "block text-[11px] font-medium mb-1.5",
          isError ? "text-s4e-scale-red-600" : "text-s4e-text-secondary",
        )}>
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "w-full flex items-center justify-between gap-2 h-9 px-3 rounded-md text-[14px] text-left transition-colors",
            "border", borderClass, "bg-s4e-surface-row",
            isDisabled
              ? "opacity-40 cursor-not-allowed"
              : "cursor-pointer hover:border-s4e-neutral-grey-500 focus:outline-none focus:border-s4e-brand-primary-600",
            isFocused && !isError && "ring-2 ring-s4e-brand-primary-500/20",
          )}
        >
          <span className={cn(selected ? "text-s4e-text-primary" : "text-s4e-text-disabled", "truncate")}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronDown
            size={14}
            className={cn("shrink-0 text-s4e-text-disabled transition-transform", open && "rotate-180")}
          />
        </button>

        {open && !isDisabled && (
          <div
            role="listbox"
            className="absolute z-20 left-0 right-0 mt-1.5 max-h-60 overflow-auto rounded-md border border-s4e-neutral-divider-10 bg-s4e-surface-row shadow-s4e-lg"
          >
            {options.map((opt) => {
              const isSel = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSel}
                  disabled={opt.disabled}
                  onClick={() => {
                    if (!opt.disabled) {
                      onChange?.(opt.value);
                      setOpen(false);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center justify-between gap-2 px-3 py-2 text-[14px] text-left",
                    opt.disabled
                      ? "text-s4e-text-disabled cursor-not-allowed"
                      : "text-s4e-text-primary cursor-pointer hover:bg-s4e-surface-row-hover",
                    isSel && "bg-s4e-brand-primary-500/8",
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSel && <Check size={14} className="text-s4e-brand-primary-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {(errorText || helperText) && (
        <div className={cn(
          "mt-1 text-[10.5px] leading-tight",
          isError ? "text-s4e-scale-red-600" : "text-s4e-text-disabled",
        )}>
          {isError ? errorText : helperText}
        </div>
      )}
    </div>
  );
}

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
    isError && errorText ? `.s4eErrorText("${errorText}")` : null,
    helperText           ? `.s4eHelperText("${helperText}")` : null,
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
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
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
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

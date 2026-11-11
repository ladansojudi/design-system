"use client";

import type React from "react";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";
import { TextField } from "@/components/ui/text-field";

// ── Types ──────────────────────────────────────────────────────────────────

type FieldState = "Default" | "Hover" | "Focused" | "Error" | "Disabled";
type Variant   = "filled" | "outlined";

function fieldSnippets(variant: Variant, state: FieldState): Record<Platform, string> {
  const isError    = state === "Error";
  const isDisabled = state === "Disabled";
  const errorProp  = isError    ? ` state="error" errorText="Incorrect"` : "";
  const disabled   = isDisabled ? " disabled" : "";
  const swiftMods  = [
    `.textFieldStyle(.sentinel(.${variant}))`,
    isError    ? `.sentinelErrorText("Incorrect")` : null,
    isDisabled ? `.disabled(true)`            : null,
  ].filter(Boolean).join("\n    ");
  const xmlErrorAttrs = isError
    ? `\n    app:errorEnabled="true"\n    app:error="Incorrect"`
    : "";
  const xmlDisabledAttrs = isDisabled ? `\n    android:enabled="false"` : "";
  return {
    react: `<TextField label="Label" variant="${variant}" value="Value"${errorProp}${disabled} />`,
    swift: `TextField("Label", text: $value)\n    ${swiftMods}`,
    xml:   `<com.google.android.material.textfield.TextInputLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Label"
    app:sentinelVariant="${variant}"${xmlErrorAttrs}>
    <com.google.android.material.textfield.TextInputEditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Value"${xmlDisabledAttrs} />
</com.google.android.material.textfield.TextInputLayout>`,
  };
}

// ── Styling maps ───────────────────────────────────────────────────────────

const valueByState: Record<FieldState, string> = {
  Default:  "Value",
  Hover:    "Hovered",
  Focused:  "Value",
  Error:    "Value",
  Disabled: "Value",
};

const STATES: FieldState[] = ["Default", "Hover", "Focused", "Error", "Disabled"];

// ── Field components ───────────────────────────────────────────────────────

function FilledField({ state, hasValue }: { state: FieldState; hasValue: boolean }) {
  return (
    <TextField
      variant="filled"
      label="Label"
      state={(state === "Hover" ? "default" : state.toLowerCase()) as "default" | "focused" | "error" | "disabled"}
      disabled={state === "Disabled"}
      value={hasValue ? valueByState[state] : ""}
      readOnly
      errorText="Incorrect"
      className="flex-1 min-w-0"
    />
  );
}

function OutlinedField({ state, hasValue }: { state: FieldState; hasValue: boolean }) {
  return (
    <TextField
      variant="outlined"
      label="Label"
      state={(state === "Hover" ? "default" : state.toLowerCase()) as "default" | "focused" | "error" | "disabled"}
      disabled={state === "Disabled"}
      value={hasValue ? valueByState[state] : ""}
      readOnly
      errorText="Incorrect"
      className="flex-1 min-w-0"
    />
  );
}

// ── Field Card ─────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

function FieldCard({ title, variant }: { title: string; variant: "filled" | "outlined" }) {
  const Field = variant === "filled" ? FilledField : OutlinedField;
  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
        {/* Mobile: stacked per state */}
        <div className="sm:hidden space-y-5">
          {STATES.map((s) => (
            <div key={s} className="space-y-2">
              <div className="text-[9px] font-medium uppercase tracking-widest text-snt-text-disabled">
                {s}
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-10 shrink-0 pt-2 text-[9px] font-medium uppercase tracking-widest text-snt-text-disabled">
                  Label
                </div>
                <Field state={s} hasValue={false} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-10 shrink-0 pt-2 text-[9px] font-medium uppercase tracking-widest text-snt-text-disabled">
                  Value
                </div>
                <Copyable snippets={fieldSnippets(variant, s)} className="block flex-1 min-w-0">
                  <Field state={s} hasValue={true} />
                </Copyable>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: 5-column matrix */}
        <div className="hidden sm:block space-y-3">
          {/* State column headers */}
          <div className="flex gap-2">
            <div className="w-10 shrink-0" />
            {STATES.map((s) => (
              <div
                key={s}
                className="flex-1 text-center text-[9px] font-medium uppercase tracking-widest text-snt-text-disabled"
              >
                {s}
              </div>
            ))}
          </div>

          {/* Empty row */}
          <div className="flex gap-2 items-start">
            <div className="w-10 shrink-0 pt-2 text-[9px] font-medium uppercase tracking-widest text-snt-text-disabled">
              Label
            </div>
            {STATES.map((s) => (
              <Field key={s} state={s} hasValue={false} />
            ))}
          </div>

          {/* Value row */}
          <div className="flex gap-2 items-start">
            <div className="w-10 shrink-0 pt-2 text-[9px] font-medium uppercase tracking-widest text-snt-text-disabled">
              Value
            </div>
            {STATES.map((s) => (
              <Copyable key={s} snippets={fieldSnippets(variant, s)} className="block flex-1 min-w-0">
                <Field state={s} hasValue={true} />
              </Copyable>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export function TextFieldShowcase() {
  return (
    <div className="space-y-10">
      <FieldCard title="Filled" variant="filled" />
      <FieldCard title="Outlined" variant="outlined" />
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

function FieldExamplePreview({
  variant,
  state,
}: {
  variant: Variant;
  state: FieldState;
}) {
  const Field = variant === "filled" ? FilledField : OutlinedField;
  return (
    <div className="w-64">
      <Field state={state} hasValue={true} />
    </div>
  );
}

export function TextFieldExamples() {
  const variants: Variant[] = ["filled", "outlined"];
  return (
    <div className="space-y-10">
      {variants.map((variant) => (
        <div key={variant}>
          <SectionTitle>{variant === "filled" ? "Filled" : "Outlined"}</SectionTitle>
          <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
            Five states for the {variant} variant — copy the JSX directly into your form.
          </p>
          <div className="space-y-4">
            {STATES.map((state) => (
              <ExampleCard
                key={`${variant}-${state}`}
                title={`${variant === "filled" ? "Filled" : "Outlined"} · ${state}`}
                code={fieldSnippets(variant, state).react}
                preview={<FieldExamplePreview variant={variant} state={state} />}
                density="tall"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

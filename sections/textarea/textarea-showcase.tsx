"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";

// ── Textarea component ────────────────────────────────────────────────────

type State = "Default" | "Hover" | "Focused" | "Error" | "Disabled";

const STATE_BORDER: Record<State, string> = {
  Default:  "border-s4e-neutral-grey-300",
  Hover:    "border-s4e-neutral-grey-500",
  Focused:  "border-s4e-brand-primary-600 ring-2 ring-s4e-brand-primary-500/20",
  Error:    "border-s4e-scale-red-600",
  Disabled: "border-s4e-neutral-grey-200 opacity-40",
};

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  state = "Default",
  helperText,
  errorText,
  maxLength,
  rows = 4,
  disabled = false,
  showCounter = false,
}: {
  label?:       string;
  value?:       string;
  onChange?:    (v: string) => void;
  placeholder?: string;
  state?:       State;
  helperText?:  string;
  errorText?:   string;
  maxLength?:   number;
  rows?:        number;
  disabled?:    boolean;
  showCounter?: boolean;
}) {
  const isError    = state === "Error";
  const isDisabled = disabled || state === "Disabled";
  const len        = (value ?? "").length;

  return (
    <div className="w-full">
      {label && (
        <label className={cn(
          "block text-[11px] font-medium mb-1.5",
          isError ? "text-s4e-scale-red-600" : "text-s4e-text-secondary",
        )}>
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        value={value}
        disabled={isDisabled}
        maxLength={maxLength}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "block w-full rounded-md px-3 py-2 text-[13px] text-s4e-text-primary placeholder:text-s4e-text-disabled bg-s4e-surface-row",
          "border resize-y transition-colors",
          "focus:outline-none focus:border-s4e-brand-primary-600 focus:ring-2 focus:ring-s4e-brand-primary-500/20",
          STATE_BORDER[state],
          isDisabled && "cursor-not-allowed",
        )}
      />
      <div className="mt-1 flex items-start justify-between gap-2">
        <div className={cn(
          "text-[10.5px] leading-tight flex-1",
          isError ? "text-s4e-scale-red-600" : "text-s4e-text-disabled",
        )}>
          {isError ? errorText : helperText}
        </div>
        {(showCounter || maxLength) && (
          <div className={cn(
            "text-[10.5px] tabular-nums shrink-0",
            maxLength && len > maxLength * 0.9 ? "text-s4e-scale-yellow-700" : "text-s4e-text-disabled",
          )}>
            {len}{maxLength ? `/${maxLength}` : ""}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Snippet builders ──────────────────────────────────────────────────────

type SnippetOpts = {
  label?:       string;
  placeholder?: string;
  helperText?:  string;
  errorText?:   string;
  maxLength?:   number;
  rows?:        number;
  state?:       State;
};

function textareaSnippets({
  label, placeholder, helperText, errorText, maxLength, rows, state,
}: SnippetOpts): Record<Platform, string> {
  const isError = state === "Error";
  const reactProps = [
    label       ? ` label="${label}"`                       : "",
    placeholder ? ` placeholder="${placeholder}"`            : "",
    helperText  ? ` helperText="${helperText}"`              : "",
    isError     ? ` state="error"`                           : "",
    errorText   ? ` errorText="${errorText}"`                : "",
    maxLength   ? ` maxLength={${maxLength}}`                : "",
    rows        ? ` rows={${rows}}`                          : "",
  ].join("");
  const swiftMods = [
    `.textEditorStyle(.s4e(.outlined))`,
    label       ? `.s4eLabel("${label}")`                    : null,
    helperText  ? `.s4eHelperText("${helperText}")`          : null,
    isError && errorText ? `.s4eErrorText("${errorText}")`   : null,
    maxLength   ? `.s4eMaxLength(${maxLength})`              : null,
  ].filter(Boolean).join("\n    ");
  const xmlAttrs = [
    label       ? `\n    android:hint="${label}"`            : "",
    isError     ? `\n    app:errorEnabled="true"`            : "",
    errorText   ? `\n    app:error="${errorText}"`           : "",
    helperText  ? `\n    app:helperText="${helperText}"`     : "",
    maxLength   ? `\n    app:counterEnabled="true"\n    app:counterMaxLength="${maxLength}"` : "",
  ].join("");
  const editAttrs = [
    `        android:layout_width="match_parent"`,
    `        android:layout_height="wrap_content"`,
    `        android:inputType="textMultiLine"`,
    `        android:minLines="${rows ?? 4}"`,
    placeholder ? `        android:hint="${placeholder}"` : null,
  ].filter(Boolean).join("\n");
  return {
    react: `<Textarea${reactProps} />`,
    swift: `TextEditor(text: $value)\n    ${swiftMods}`,
    xml:   `<com.google.android.material.textfield.TextInputLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"${xmlAttrs}>
    <com.google.android.material.textfield.TextInputEditText
${editAttrs} />
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

export function TextareaShowcase() {
  const [note, setNote] = useState("Found exposed credentials in the staging .env file. Reproducible by hitting /api/debug while logged out.");
  const [empty, setEmpty] = useState("");
  const [overLimit, setOverLimit] = useState("This text is intentionally long to demonstrate the counter approaching the soft limit. Keep typing and the counter will turn amber.");

  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Variants</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Copyable
            className="block w-full"
            snippets={textareaSnippets({
              label: "Finding description",
              helperText: "Markdown is supported.",
            })}
          >
            <Textarea
              label="Finding description"
              value={note}
              onChange={setNote}
              helperText="Markdown is supported."
            />
          </Copyable>
          <Copyable
            className="block w-full"
            snippets={textareaSnippets({
              label: "Reproduction steps",
              placeholder: "1. Visit …\\n2. Click …\\n3. Observe …",
            })}
          >
            <Textarea
              label="Reproduction steps"
              value={empty}
              onChange={setEmpty}
              placeholder="1. Visit …&#10;2. Click …&#10;3. Observe …"
            />
          </Copyable>
          <Copyable
            className="block w-full"
            snippets={textareaSnippets({
              label: "With counter",
              maxLength: 200,
              helperText: "Keep the summary short — full details go in the body below.",
            })}
          >
            <Textarea
              label="With counter"
              value={overLimit}
              onChange={setOverLimit}
              maxLength={200}
              helperText="Keep the summary short — full details go in the body below."
            />
          </Copyable>
          <Copyable
            className="block w-full"
            snippets={textareaSnippets({
              label: "With error",
              state: "Error",
              errorText: "Add at least 40 characters describing the issue.",
            })}
          >
            <Textarea
              label="With error"
              value="Too vague"
              state="Error"
              errorText="Add at least 40 characters describing the issue."
            />
          </Copyable>
        </div>
      </div>

      <div>
        <SectionTitle>States</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(["Default", "Hover", "Focused", "Error", "Disabled"] as State[]).map((s) => (
            <Textarea
              key={s}
              label={s}
              rows={3}
              value="Sample value"
              state={s}
              disabled={s === "Disabled"}
              errorText={s === "Error" ? "Required field" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function TextareaExamples() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Variants</SectionTitle>
        <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
          Common configurations — with helper, placeholder, counter, and error.
        </p>
        <div className="space-y-4">
          <ExampleCard
            title="With helper text"
            code={textareaSnippets({
              label: "Finding description",
              helperText: "Markdown is supported.",
            }).react}
            preview={
              <div className="w-full max-w-md">
                <Textarea
                  label="Finding description"
                  value="Found exposed credentials in the staging .env file."
                  helperText="Markdown is supported."
                />
              </div>
            }
            density="tall"
          />
          <ExampleCard
            title="With placeholder"
            code={textareaSnippets({
              label: "Reproduction steps",
              placeholder: "1. Visit …\\n2. Click …\\n3. Observe …",
            }).react}
            preview={
              <div className="w-full max-w-md">
                <Textarea
                  label="Reproduction steps"
                  value=""
                  placeholder="1. Visit …&#10;2. Click …&#10;3. Observe …"
                />
              </div>
            }
            density="tall"
          />
          <ExampleCard
            title="With counter"
            code={textareaSnippets({
              label: "With counter",
              maxLength: 200,
              helperText: "Keep the summary short — full details go in the body below.",
            }).react}
            preview={
              <div className="w-full max-w-md">
                <Textarea
                  label="With counter"
                  value="This text is intentionally long to demonstrate the counter approaching the soft limit. Keep typing and the counter will turn amber."
                  maxLength={200}
                  helperText="Keep the summary short — full details go in the body below."
                />
              </div>
            }
            density="tall"
          />
          <ExampleCard
            title="With error"
            code={textareaSnippets({
              label: "With error",
              state: "Error",
              errorText: "Add at least 40 characters describing the issue.",
            }).react}
            preview={
              <div className="w-full max-w-md">
                <Textarea
                  label="With error"
                  value="Too vague"
                  state="Error"
                  errorText="Add at least 40 characters describing the issue."
                />
              </div>
            }
            density="tall"
          />
        </div>
      </div>

      <div>
        <SectionTitle>States</SectionTitle>
        <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
          Five field states.
        </p>
        <div className="space-y-4">
          {(["Default", "Focused", "Error", "Disabled"] as State[]).map((s) => (
            <ExampleCard
              key={s}
              title={`State · ${s}`}
              code={textareaSnippets({
                label: s,
                state: s,
                errorText: s === "Error" ? "Required field" : undefined,
              }).react}
              preview={
                <div className="w-full max-w-md">
                  <Textarea
                    label={s}
                    rows={3}
                    value="Sample value"
                    state={s}
                    disabled={s === "Disabled"}
                    errorText={s === "Error" ? "Required field" : undefined}
                  />
                </div>
              }
              density="tall"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

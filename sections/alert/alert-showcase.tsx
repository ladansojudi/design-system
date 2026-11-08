"use client";

import type React from "react";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";
import { Alert } from "@/components/ui/alert";

// ── Variant config ────────────────────────────────────────────────────────

type Variant = "info" | "success" | "warning" | "error";

// ── Alert component ───────────────────────────────────────────────────────

// ── Showcase ──────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <span className="text-[15px] font-semibold text-snt-text-primary">{children}</span>
    </div>
  );
}

const VARIANTS: Variant[] = ["info", "success", "warning", "error"];

const VARIANT_BODY =
  "Stays on screen until explicitly resolved. Use for state that the user must acknowledge — not for transient messages.";

function variantSnippets(v: Variant): Record<Platform, string> {
  const title = `${v[0].toUpperCase()}${v.slice(1)} alert`;
  return {
    react: `<Alert variant="${v}" title="${title}">\n  ${VARIANT_BODY}\n</Alert>`,
    swift: `Alert(variant: .${v}, title: "${title}") {\n    Text("${VARIANT_BODY}")\n}`,
    xml:   `<com.sentinel.ui.Alert\n    app:variant="${v}"\n    app:title="${title}"\n    android:text="${VARIANT_BODY}" />`,
  };
}

const QUOTA_SNIPPETS: Record<Platform, string> = {
  react: `<Alert
  variant="warning"
  title="Quota almost exceeded"
  dismissible
  action={<button>Upgrade plan</button>}
>
  You have used 9.2 GB of your 10 GB monthly allowance.
</Alert>`,
  swift: `Alert(variant: .warning, title: "Quota almost exceeded", dismissible: true) {
    Text("You have used 9.2 GB of your 10 GB monthly allowance.")
} action: {
    Button("Upgrade plan") { /* action */ }
}`,
  xml: `<com.sentinel.ui.Alert
    app:variant="warning"
    app:title="Quota almost exceeded"
    app:dismissible="true"
    app:actionLabel="Upgrade plan"
    android:text="You have used 9.2 GB of your 10 GB monthly allowance." />`,
};

const ERROR_DISMISS_SNIPPETS: Record<Platform, string> = {
  react: `<Alert variant="error" dismissible>
  Failed to save changes. Check your connection and try again.
</Alert>`,
  swift: `Alert(variant: .error, dismissible: true) {
    Text("Failed to save changes. Check your connection and try again.")
}`,
  xml: `<com.sentinel.ui.Alert
    app:variant="error"
    app:dismissible="true"
    android:text="Failed to save changes. Check your connection and try again." />`,
};

const TITLE_ONLY_SNIPPETS: Record<Platform, string> = {
  react: `<Alert variant="success" title="Scan completed in 4.3 seconds" />`,
  swift: `Alert(variant: .success, title: "Scan completed in 4.3 seconds")`,
  xml:   `<com.sentinel.ui.Alert
    app:variant="success"
    app:title="Scan completed in 4.3 seconds" />`,
};

const DESC_ONLY_SNIPPETS: Record<Platform, string> = {
  react: `<Alert variant="info">All keyboard shortcuts have been remapped.</Alert>`,
  swift: `Alert(variant: .info) {
    Text("All keyboard shortcuts have been remapped.")
}`,
  xml: `<com.sentinel.ui.Alert
    app:variant="info"
    android:text="All keyboard shortcuts have been remapped." />`,
};

export function AlertShowcase() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Variants</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-5 space-y-3">
          {VARIANTS.map((v) => (
            <Copyable key={v} snippets={variantSnippets(v)} className="block">
              <Alert variant={v} title={`${v[0].toUpperCase()}${v.slice(1)} alert`}>
                Stays on screen until explicitly resolved. Use for state that the user must
                acknowledge — not for transient messages.
              </Alert>
            </Copyable>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Dismissible · With action</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-5 space-y-3">
          <Copyable snippets={QUOTA_SNIPPETS} className="block">
            <Alert
              variant="warning"
              title="Quota almost exceeded"
              dismissible
              action={
                <button
                  type="button"
                  className="text-[11px] font-medium underline text-snt-scale-yellow-700 hover:opacity-80 cursor-pointer"
                >
                  Upgrade plan
                </button>
              }
            >
              You have used 9.2 GB of your 10 GB monthly allowance.
            </Alert>
          </Copyable>
          <Copyable snippets={ERROR_DISMISS_SNIPPETS} className="block">
            <Alert variant="error" dismissible>
              Failed to save changes. Check your connection and try again.
            </Alert>
          </Copyable>
        </div>
      </div>

      <div>
        <SectionTitle>Title only · Description only</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-5 space-y-3">
          <Copyable snippets={TITLE_ONLY_SNIPPETS} className="block">
            <Alert variant="success" title="Scan completed in 4.3 seconds" />
          </Copyable>
          <Copyable snippets={DESC_ONLY_SNIPPETS} className="block">
            <Alert variant="info">All keyboard shortcuts have been remapped.</Alert>
          </Copyable>
        </div>
      </div>
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function AlertExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Info"
        density="tall"
        code={variantSnippets("info").react}
        preview={
          <div className="w-full max-w-md">
            <Alert variant="info" title="Info alert">
              {VARIANT_BODY}
            </Alert>
          </div>
        }
      />
      <ExampleCard
        title="Success"
        density="tall"
        code={variantSnippets("success").react}
        preview={
          <div className="w-full max-w-md">
            <Alert variant="success" title="Success alert">
              {VARIANT_BODY}
            </Alert>
          </div>
        }
      />
      <ExampleCard
        title="Warning"
        density="tall"
        code={variantSnippets("warning").react}
        preview={
          <div className="w-full max-w-md">
            <Alert variant="warning" title="Warning alert">
              {VARIANT_BODY}
            </Alert>
          </div>
        }
      />
      <ExampleCard
        title="Error"
        density="tall"
        code={variantSnippets("error").react}
        preview={
          <div className="w-full max-w-md">
            <Alert variant="error" title="Error alert">
              {VARIANT_BODY}
            </Alert>
          </div>
        }
      />
      <ExampleCard
        title="Warning · Dismissible with action"
        density="tall"
        code={QUOTA_SNIPPETS.react}
        preview={
          <div className="w-full max-w-md">
            <Alert
              variant="warning"
              title="Quota almost exceeded"
              dismissible
              action={
                <button
                  type="button"
                  className="text-[11px] font-medium underline text-snt-scale-yellow-700 hover:opacity-80 cursor-pointer"
                >
                  Upgrade plan
                </button>
              }
            >
              You have used 9.2 GB of your 10 GB monthly allowance.
            </Alert>
          </div>
        }
      />
      <ExampleCard
        title="Title only"
        density="tall"
        code={TITLE_ONLY_SNIPPETS.react}
        preview={
          <div className="w-full max-w-md">
            <Alert variant="success" title="Scan completed in 4.3 seconds" />
          </div>
        }
      />
    </div>
  );
}

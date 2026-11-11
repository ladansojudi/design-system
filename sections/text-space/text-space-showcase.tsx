"use client";

import type React from "react";
import { ExampleCard } from "@/components/styleguide/example-card";
import { TextSpace } from "@/components/ui/text-space";

// ── Types ──────────────────────────────────────────────────────────────────

type TextSpaceState = "enabled" | "disabled" | "error";
// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

function TextSpaceCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">{children}</div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export function TextSpaceShowcase() {
  return (
    <div className="space-y-10">
      <TextSpaceCard title="Simple">
        <TextSpace toolbarSize="simple" />
      </TextSpaceCard>

      <TextSpaceCard title="Full">
        <TextSpace toolbarSize="full" />
      </TextSpaceCard>

      <TextSpaceCard title="State">
        <div className="space-y-6">
          {(
            [
              { label: "Enabled", state: "enabled" },
              { label: "Disabled", state: "disabled" },
              { label: "Error", state: "error" },
            ] as { label: string; state: TextSpaceState }[]
          ).map(({ label, state }) => (
            <div key={state}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-snt-text-disabled mb-2">
                {label}
              </p>
              <TextSpace toolbarSize="full" state={state} />
            </div>
          ))}
        </div>
      </TextSpaceCard>
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function TextSpaceExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Simple toolbar"
        density="tall"
        code={`<TextSpace toolbarSize="simple" placeholder="Write something awesome…" />`}
        preview={
          <div className="w-full max-w-lg">
            <TextSpace toolbarSize="simple" />
          </div>
        }
      />
      <ExampleCard
        title="Full toolbar"
        density="tall"
        code={`<TextSpace toolbarSize="full" placeholder="Write something awesome…" />`}
        preview={
          <div className="w-full max-w-lg">
            <TextSpace toolbarSize="full" />
          </div>
        }
      />
      <ExampleCard
        title="Error state"
        density="tall"
        code={`<TextSpace toolbarSize="full" state="error" placeholder="Write something awesome…" />`}
        preview={
          <div className="w-full max-w-lg">
            <TextSpace toolbarSize="full" state="error" />
          </div>
        }
      />
    </div>
  );
}

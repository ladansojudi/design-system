"use client";

import type React from "react";
import { useState } from "react";
import { ExampleCard } from "@/components/styleguide/example-card";
import { SearchBar as UISearchBar } from "@/components/ui/search-bar";

// ── Types ──────────────────────────────────────────────────────────────────

type SearchVariant = "default" | "ghost";
type SearchState   = "default" | "focused" | "disabled";

// ── Search Bar ─────────────────────────────────────────────────────────────

function SearchBar({
  variant = "default",
  state   = "default",
  value,
  onChange,
  placeholder = "Search…",
}: {
  variant?:     SearchVariant;
  state?:       SearchState;
  value?:       string;
  onChange?:    (v: string) => void;
  placeholder?: string;
}) {
  // "focused" is a forced visual state for docs; real focus is :focus-within.
  return (
    <UISearchBar
      variant={variant}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={state === "disabled"}
      aria-label={placeholder}
      className={state === "focused" ? "border-snt-brand-primary-500 ring-2 ring-snt-focus-ring/20" : undefined}
    />
  );
}

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <span className="text-[15px] font-semibold text-snt-text-primary">{children}</span>
    </div>
  );
}

// ── State grid ─────────────────────────────────────────────────────────────

const STATES: { label: string; state: SearchState }[] = [
  { label: "Default",  state: "default"  },
  { label: "Focused",  state: "focused"  },
  { label: "Disabled", state: "disabled" },
];

function VariantCard({
  title,
  variant,
}: {
  title: string;
  variant: SearchVariant;
}) {
  const [value, setValue] = useState("");

  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5 space-y-6">

        {/* Static states */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">
            States
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STATES.map(({ label, state }) => (
              <div key={state} className="space-y-1.5">
                <p className="text-[10px] text-snt-text-disabled">{label}</p>
                <SearchBar variant={variant} state={state} />
              </div>
            ))}
          </div>
        </div>

        {/* Interactive — shows filled + clear */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">
            Filled
          </p>
          <div className="max-w-xs">
            <SearchBar
              variant={variant}
              value={value}
              onChange={setValue}
              placeholder="Type to search…"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export function SearchBarShowcase() {
  return (
    <div className="space-y-10">
      <VariantCard title="Default" variant="default" />
      <VariantCard title="Ghost"   variant="ghost"   />
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

function FilledSearchBar({ variant }: { variant: SearchVariant }) {
  const [value, setValue] = useState("asset.example.com");
  return (
    <div className="w-full max-w-sm">
      <SearchBar variant={variant} value={value} onChange={setValue} placeholder="Search assets…" />
    </div>
  );
}

export function SearchBarExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Default"
        density="default"
        code={`<SearchBar placeholder="Search assets…" />`}
        preview={
          <div className="w-full max-w-sm">
            <SearchBar variant="default" placeholder="Search assets…" />
          </div>
        }
      />
      <ExampleCard
        title="Ghost"
        density="default"
        code={`<SearchBar variant="ghost" placeholder="Search assets…" />`}
        preview={
          <div className="w-full max-w-sm">
            <SearchBar variant="ghost" placeholder="Search assets…" />
          </div>
        }
      />
      <ExampleCard
        title="Focused"
        density="default"
        code={`<SearchBar placeholder="Search assets…" autoFocus />`}
        preview={
          <div className="w-full max-w-sm">
            <SearchBar variant="default" state="focused" placeholder="Search assets…" />
          </div>
        }
      />
      <ExampleCard
        title="Disabled"
        density="default"
        code={`<SearchBar placeholder="Search assets…" disabled />`}
        preview={
          <div className="w-full max-w-sm">
            <SearchBar variant="default" state="disabled" placeholder="Search assets…" />
          </div>
        }
      />
      <ExampleCard
        title="Filled (with clear)"
        density="default"
        code={`<SearchBar value={value} onChange={setValue} placeholder="Search assets…" />`}
        preview={<FilledSearchBar variant="default" />}
      />
      <ExampleCard
        title="Ghost · Filled"
        density="default"
        code={`<SearchBar variant="ghost" value={value} onChange={setValue} placeholder="Search assets…" />`}
        preview={<FilledSearchBar variant="ghost" />}
      />
    </div>
  );
}

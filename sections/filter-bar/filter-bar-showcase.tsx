"use client";

import type React from "react";
import { useState } from "react";
import {
  SlidersHorizontal, Upload, X, Plus,
  Tag, CheckCircle, Shield, Calendar, Radar, Network,
} from "lucide-react";
import { ExampleCard } from "@/components/styleguide/example-card";
import { FilterPill, FilterSearch, FilterAction, FilterClear, FilterBarDivider } from "@/components/ui/filter-bar";

// ── Filter Pill ────────────────────────────────────────────────────────────

// ── Search Input ───────────────────────────────────────────────────────────

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <FilterSearch aria-label="Search findings" placeholder="Search…" value={value} onChange={onChange} />;
}

// ── Action Button ──────────────────────────────────────────────────────────

function ActionBtn({
  icon,
  label,
  iconOnly,
  muted,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  iconOnly?: boolean;
  muted?: boolean;
}) {
  return <FilterAction icon={icon} label={label} iconOnly={iconOnly} muted={muted} />;
}

// ── Clear Button ───────────────────────────────────────────────────────────

function ClearBtn({ onClick }: { onClick: () => void }) {
  return <FilterClear onClick={onClick} />;
}

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

// ── Divider ────────────────────────────────────────────────────────────────

function VDivider() {
  return <FilterBarDivider />;
}

// ── Showcase ───────────────────────────────────────────────────────────────

const VISIBLE_PILLS = [
  { label: "Tags",              icon: Tag          },
  { label: "Verify Status",     icon: CheckCircle  },
  { label: "Advanced Security", icon: Shield, count: 1, active: true },
];

const OVERFLOW_PILLS = [
  { label: "Created At",        icon: Calendar },
  { label: "Detection Source",  icon: Radar    },
  { label: "Port",              icon: Network  },
];

export function FilterBarShowcase() {
  const [search, setSearch]     = useState("");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-10">

      {/* Fits — all pills visible */}
      <div>
        <SectionTitle>Fits</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5 space-y-4">

          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">With Search</p>
            <div className="border border-snt-neutral-divider-10 rounded-xl p-3 overflow-x-auto snt-scrollbar-hide">
              <div className="flex items-center gap-2 w-max md:w-auto">
                <div className="flex items-center gap-2 md:flex-1 md:min-w-0">
                  <SearchInput value={search} onChange={setSearch} />
                  <VDivider />
                  {VISIBLE_PILLS.map((p) => (
                    <FilterPill key={p.label} {...p} />
                  ))}
                  <ClearBtn onClick={() => {}} />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <VDivider />
                  <ActionBtn icon={Upload} label="Export" iconOnly />
                  <ActionBtn icon={SlidersHorizontal} label="Bulk Actions" muted />
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">Without Search</p>
            <div className="border border-snt-neutral-divider-10 rounded-xl p-3 overflow-x-auto snt-scrollbar-hide">
              <div className="flex items-center gap-2 w-max md:w-auto">
                <div className="flex items-center gap-2 md:flex-1 md:min-w-0">
                  {VISIBLE_PILLS.map((p) => (
                    <FilterPill key={p.label} {...p} />
                  ))}
                  <ClearBtn onClick={() => {}} />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <VDivider />
                  <ActionBtn icon={Upload} label="Export" iconOnly />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Overflow — extra pills hidden behind + button */}
      <div>
        <SectionTitle>Overflow</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="border border-snt-neutral-divider-10 rounded-xl p-3 space-y-2 overflow-x-auto snt-scrollbar-hide">

            {/* Main row */}
            <div className="flex items-center gap-2 w-max md:w-auto">
              {/* Left: search + pills + overflow + clear */}
              <div className="flex items-center gap-2 md:flex-1 md:min-w-0">
                <SearchInput value={search} onChange={setSearch} />
                <VDivider />
                {VISIBLE_PILLS.map((p) => (
                  <FilterPill key={p.label} {...p} />
                ))}
                {!expanded && (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-dashed border-snt-neutral-divider-10 text-[12px] font-medium text-snt-text-secondary hover:border-snt-brand-primary-500 hover:text-snt-brand-primary-500 transition-colors shrink-0"
                  >
                    <Plus size={12} />
                    {OVERFLOW_PILLS.length}
                  </button>
                )}
                <ClearBtn onClick={() => setExpanded(false)} />
              </div>
              {/* Right: actions always visible */}
              <div className="flex items-center gap-2 shrink-0">
                <VDivider />
                <ActionBtn icon={Upload} label="Export" iconOnly />
                <ActionBtn icon={SlidersHorizontal} label="Bulk Actions" muted />
              </div>
            </div>

            {/* Expanded overflow row */}
            {expanded && (
              <div className="flex items-center gap-2 pt-1 border-t border-snt-neutral-divider-10 w-max md:w-auto">
                <span className="text-[10px] text-snt-text-disabled shrink-0">More filters</span>
                {OVERFLOW_PILLS.map((p) => (
                  <FilterPill key={p.label} label={p.label} />
                ))}
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="md:ml-auto text-[11px] text-snt-text-disabled hover:text-snt-text-primary transition-colors shrink-0"
                >
                  <X size={13} />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

function SearchOnlyExample() {
  const [v, setV] = useState("");
  return (
    <div className="w-full max-w-2xl border border-snt-neutral-divider-10 rounded-xl p-3">
      <div className="flex items-center gap-2">
        <SearchInput value={v} onChange={setV} />
        <VDivider />
        <FilterPill label="Tags" icon={Tag} />
        <FilterPill label="Verify Status" icon={CheckCircle} />
      </div>
    </div>
  );
}

function FullBarExample() {
  const [v, setV] = useState("");
  return (
    <div className="w-full max-w-3xl border border-snt-neutral-divider-10 rounded-xl p-3 overflow-x-auto snt-scrollbar-hide">
      <div className="flex items-center gap-2 w-max md:w-auto">
        <div className="flex items-center gap-2 md:flex-1 md:min-w-0">
          <SearchInput value={v} onChange={setV} />
          <VDivider />
          {VISIBLE_PILLS.map((p) => (
            <FilterPill key={p.label} {...p} />
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <VDivider />
          <ActionBtn icon={Upload} label="Export" iconOnly />
          <ActionBtn icon={SlidersHorizontal} label="Bulk Actions" />
        </div>
      </div>
    </div>
  );
}

function ActivePillsExample() {
  return (
    <div className="w-full max-w-2xl border border-snt-neutral-divider-10 rounded-xl p-3">
      <div className="flex items-center gap-2">
        <FilterPill label="Tags" icon={Tag} count={2} active onClear={() => {}} />
        <FilterPill label="Advanced Security" icon={Shield} count={1} active onClear={() => {}} />
        <FilterPill label="Verify Status" icon={CheckCircle} />
        <ClearBtn onClick={() => {}} />
      </div>
    </div>
  );
}

function OverflowExample() {
  const [v, setV] = useState("");
  return (
    <div className="w-full max-w-3xl border border-snt-neutral-divider-10 rounded-xl p-3 overflow-x-auto snt-scrollbar-hide">
      <div className="flex items-center gap-2 w-max md:w-auto">
        <div className="flex items-center gap-2 md:flex-1 md:min-w-0">
          <SearchInput value={v} onChange={setV} />
          <VDivider />
          {VISIBLE_PILLS.map((p) => (
            <FilterPill key={p.label} {...p} />
          ))}
          <button
            type="button"
            className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-dashed border-snt-neutral-divider-10 text-[12px] font-medium text-snt-text-secondary hover:border-snt-brand-primary-500 hover:text-snt-brand-primary-500 transition-colors shrink-0"
          >
            <Plus size={12} />
            {OVERFLOW_PILLS.length}
          </button>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <VDivider />
          <ActionBtn icon={Upload} label="Export" iconOnly />
        </div>
      </div>
    </div>
  );
}

export function FilterBarExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Full bar — search + filters + actions"
        density="default"
        code={`<FilterBar>
  <SearchInput />
  <FilterPill label="Tags" icon={Tag} />
  <FilterPill label="Verify Status" icon={CheckCircle} />
  <FilterPill label="Advanced Security" icon={Shield} count={1} active />
  <FilterBarActions>
    <Button variant="outline" iconOnly><Upload /></Button>
    <Button variant="outline">Bulk Actions</Button>
  </FilterBarActions>
</FilterBar>`}
        preview={<FullBarExample />}
      />
      <ExampleCard
        title="Search only"
        density="default"
        code={`<FilterBar>
  <SearchInput />
  <FilterPill label="Tags" icon={Tag} />
  <FilterPill label="Verify Status" icon={CheckCircle} />
</FilterBar>`}
        preview={<SearchOnlyExample />}
      />
      <ExampleCard
        title="With active pills"
        density="default"
        code={`<FilterBar>
  <FilterPill label="Tags" icon={Tag} count={2} active onClear={...} />
  <FilterPill label="Advanced Security" icon={Shield} count={1} active onClear={...} />
  <FilterPill label="Verify Status" icon={CheckCircle} />
  <FilterBarClear onClick={...} />
</FilterBar>`}
        preview={<ActivePillsExample />}
      />
      <ExampleCard
        title="With overflow"
        density="default"
        code={`<FilterBar>
  <SearchInput />
  <FilterPill label="Tags" icon={Tag} />
  <FilterPill label="Verify Status" icon={CheckCircle} />
  <FilterPill label="Advanced Security" icon={Shield} count={1} active />
  <FilterBarOverflow count={3} />
</FilterBar>`}
        preview={<OverflowExample />}
      />
    </div>
  );
}

"use client";

import type React from "react";
import { useState } from "react";
import {
  Search, ChevronDown, SlidersHorizontal, Upload, X, Plus,
  Tag, CheckCircle, Shield, Calendar, Radar, Network,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Filter Pill ────────────────────────────────────────────────────────────

function FilterPill({
  label,
  icon: Icon,
  count,
  active,
  onClear,
}: {
  label:    string;
  icon?:    React.ComponentType<{ size?: number; className?: string }>;
  count?:   number;
  active?:  boolean;
  onClear?: () => void;
}) {
  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border text-[12px] font-medium cursor-pointer select-none transition-colors shrink-0",
      active
        ? "border-s4e-brand-primary-500 bg-s4e-btn-primary-50 text-s4e-brand-primary-500"
        : "border-s4e-neutral-divider-10 bg-s4e-surface-app text-s4e-text-secondary hover:border-s4e-neutral-grey-300 hover:text-s4e-text-primary",
    )}>
      {Icon && <Icon size={12} className="opacity-70 shrink-0" />}
      <span>{label}</span>
      {count !== undefined && (
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-s4e-brand-primary-500 text-white text-[10px] font-bold">
          {count}
        </span>
      )}
      {active && onClear
        ? <button type="button" onClick={onClear} className="ml-0.5 hover:opacity-70"><X size={11} /></button>
        : <ChevronDown size={11} className="opacity-50" />
      }
    </div>
  );
}

// ── Search Input ───────────────────────────────────────────────────────────

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative flex items-center shrink-0">
      <Search size={13} className="absolute left-3 text-s4e-text-disabled pointer-events-none" />
      <input
        type="text"
        placeholder="Search…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-48 pl-8 pr-3 rounded-lg border border-s4e-neutral-divider-10 bg-s4e-surface-app text-[12px] text-s4e-text-primary placeholder:text-s4e-text-disabled outline-none focus:border-s4e-brand-primary-500 focus:ring-2 focus:ring-s4e-brand-primary-500/20 transition-colors"
      />
    </div>
  );
}

// ── Action Button ──────────────────────────────────────────────────────────

function ActionBtn({
  icon: Icon,
  label,
  iconOnly,
  muted,
}: {
  icon:      React.ComponentType<{ size?: number; className?: string }>;
  label:     string;
  iconOnly?: boolean;
  muted?:    boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      className={cn(
        "inline-flex items-center gap-1.5 h-8 rounded-lg border text-[12px] font-medium transition-colors shrink-0",
        iconOnly ? "w-8 justify-center" : "px-3",
        muted
          ? "border-s4e-neutral-divider-10 bg-s4e-surface-app text-s4e-text-disabled cursor-not-allowed"
          : "border-s4e-neutral-divider-10 bg-s4e-surface-app text-s4e-text-secondary hover:text-s4e-text-primary hover:border-s4e-neutral-grey-300",
      )}
    >
      <Icon size={13} />
      {!iconOnly && label}
    </button>
  );
}

// ── Clear Button ───────────────────────────────────────────────────────────

function ClearBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 h-8 px-2.5 text-[12px] font-medium text-s4e-scale-red-600 hover:text-s4e-scale-red-700 transition-colors shrink-0"
    >
      <X size={13} />
      Clear
    </button>
  );
}

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

// ── Divider ────────────────────────────────────────────────────────────────

function VDivider() {
  return <div className="w-px h-5 bg-s4e-neutral-divider-10 shrink-0" />;
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
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5 space-y-4">

          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-3">With Search</p>
            <div className="border border-s4e-neutral-divider-10 rounded-xl p-3 overflow-x-auto s4e-scrollbar-hide">
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
            <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-3">Without Search</p>
            <div className="border border-s4e-neutral-divider-10 rounded-xl p-3 overflow-x-auto s4e-scrollbar-hide">
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
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="border border-s4e-neutral-divider-10 rounded-xl p-3 space-y-2 overflow-x-auto s4e-scrollbar-hide">

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
                    className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-dashed border-s4e-neutral-divider-10 text-[12px] font-medium text-s4e-text-secondary hover:border-s4e-brand-primary-500 hover:text-s4e-brand-primary-500 transition-colors shrink-0"
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
              <div className="flex items-center gap-2 pt-1 border-t border-s4e-neutral-divider-10 w-max md:w-auto">
                <span className="text-[10px] text-s4e-text-disabled shrink-0">More filters</span>
                {OVERFLOW_PILLS.map((p) => (
                  <FilterPill key={p.label} label={p.label} />
                ))}
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="md:ml-auto text-[11px] text-s4e-text-disabled hover:text-s4e-text-primary transition-colors shrink-0"
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

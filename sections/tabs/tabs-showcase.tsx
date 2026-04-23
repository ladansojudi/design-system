"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

type TabVariant = "underline" | "pill";

type TabItem = {
  id: string;
  label: string;
  badge?: number;
  disabled?: boolean;
};

// ── Badge chip ─────────────────────────────────────────────────────────────

function BadgeChip({ count, active }: { count: number; active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-1.5 min-w-[18px] h-[18px] text-[10px] font-semibold tabular-nums transition-colors",
        active
          ? "bg-s4e-brand-primary-500 text-white"
          : "bg-s4e-neutral-grey-200 text-s4e-text-secondary",
      )}
    >
      {count}
    </span>
  );
}

// ── Tab Bar ────────────────────────────────────────────────────────────────

function TabBar({
  variant,
  items,
  activeId,
  onSelect,
}: {
  variant:  TabVariant;
  items:    TabItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  if (variant === "underline") {
    return (
      <div className="flex items-end border-b border-s4e-neutral-divider-10 gap-0">
        {items.map((tab) => {
          const isActive   = tab.id === activeId;
          const isDisabled = !!tab.disabled;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 pb-2.5 pt-2 text-[13px] font-medium border-b-2 -mb-px transition-colors",
                isActive
                  ? "border-s4e-brand-primary-500 text-s4e-brand-primary-500"
                  : isDisabled
                  ? "border-transparent text-s4e-text-disabled cursor-not-allowed"
                  : "border-transparent text-s4e-text-secondary hover:text-s4e-text-primary hover:border-s4e-neutral-divider-10",
              )}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <BadgeChip count={tab.badge} active={isActive} />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // pill
  return (
    <div className="inline-flex items-center gap-1 bg-s4e-neutral-grey-100 rounded-lg p-1">
      {items.map((tab) => {
        const isActive   = tab.id === activeId;
        const isDisabled = !!tab.disabled;
        return (
          <button
            key={tab.id}
            type="button"
            disabled={isDisabled}
            onClick={() => !isDisabled && onSelect(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-colors",
              isActive
                ? "bg-white text-s4e-text-primary shadow-sm"
                : isDisabled
                ? "text-s4e-text-disabled cursor-not-allowed"
                : "text-s4e-text-secondary hover:text-s4e-text-primary",
            )}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <BadgeChip count={tab.badge} active={isActive} />
            )}
          </button>
        );
      })}
    </div>
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

// ── Variant card ───────────────────────────────────────────────────────────

const BASE_TABS: TabItem[] = [
  { id: "tab1", label: "Tab 1" },
  { id: "tab2", label: "Tab 2" },
  { id: "tab3", label: "Tab 3" },
];

const BADGE_TABS: TabItem[] = [
  { id: "tab1", label: "Overview" },
  { id: "tab2", label: "Findings", badge: 12 },
  { id: "tab3", label: "Assets",   badge: 4  },
];

const DISABLED_TABS: TabItem[] = [
  { id: "tab1", label: "Tab 1" },
  { id: "tab2", label: "Tab 2" },
  { id: "tab3", label: "Tab 3", disabled: true },
];

function VariantCard({ title, variant }: { title: string; variant: TabVariant }) {
  const [active1, setActive1] = useState("tab1");
  const [active2, setActive2] = useState("tab2");
  const [active3, setActive3] = useState("tab1");

  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5 space-y-8">

        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-3">
            Default
          </p>
          <TabBar variant={variant} items={BASE_TABS} activeId={active1} onSelect={setActive1} />
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-3">
            With Badge
          </p>
          <TabBar variant={variant} items={BADGE_TABS} activeId={active2} onSelect={setActive2} />
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-3">
            With Disabled
          </p>
          <TabBar variant={variant} items={DISABLED_TABS} activeId={active3} onSelect={setActive3} />
        </div>

      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export function TabsShowcase() {
  return (
    <div className="space-y-10">
      <VariantCard title="Underline" variant="underline" />
      <VariantCard title="Pill"      variant="pill"      />
    </div>
  );
}

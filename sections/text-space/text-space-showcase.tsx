"use client";

import type React from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  Superscript, Subscript,
  List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight,
  Link2, Image as LucideImage,
  Quote, Minus, X, Code,
  ChevronDown, Type,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

type TextSpaceState = "enabled" | "disabled" | "error";
type ToolbarSize = "simple" | "full";

// ── Toolbar ────────────────────────────────────────────────────────────────

type ToolItem =
  | { type: "sep" }
  | { type: "icon"; icon: React.ComponentType<{ size?: number; className?: string }> };

const TOOL_ITEMS: ToolItem[] = [
  { type: "icon", icon: Bold },
  { type: "icon", icon: Italic },
  { type: "icon", icon: Underline },
  { type: "icon", icon: Strikethrough },
  { type: "sep" },
  { type: "icon", icon: Superscript },
  { type: "icon", icon: Subscript },
  { type: "sep" },
  { type: "icon", icon: List },
  { type: "icon", icon: ListOrdered },
  { type: "icon", icon: Quote },
  { type: "sep" },
  { type: "icon", icon: AlignLeft },
  { type: "icon", icon: AlignCenter },
  { type: "icon", icon: AlignRight },
  { type: "sep" },
  { type: "icon", icon: Link2 },
  { type: "icon", icon: LucideImage },
  { type: "icon", icon: Code },
  { type: "sep" },
  { type: "icon", icon: Minus },
  { type: "icon", icon: X },
];

function ToolbarBtn({
  icon: Icon,
  disabled,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      tabIndex={-1}
      disabled={disabled}
      className="p-1 rounded hover:bg-s4e-neutral-grey-100 disabled:pointer-events-none"
    >
      <Icon size={13} className="text-s4e-text-secondary" />
    </button>
  );
}

function Toolbar({ size, disabled }: { size: ToolbarSize; disabled?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center flex-wrap gap-0.5 px-3 py-1.5 border-b border-s4e-neutral-divider-10",
        disabled && "opacity-40 pointer-events-none",
      )}
    >
      {size === "full" && (
        <>
          <span className="flex items-center gap-0.5 text-[11px] text-s4e-text-secondary pr-1">
            <Type size={12} className="text-s4e-text-disabled" />
            <ChevronDown size={10} className="text-s4e-text-disabled" />
          </span>
          <span className="flex items-center gap-0.5 text-[11px] text-s4e-text-secondary pr-1">
            16px <ChevronDown size={10} className="text-s4e-text-disabled" />
          </span>
          <span className="flex items-center gap-0.5 text-[11px] text-s4e-text-secondary pr-1">
            Normal <ChevronDown size={10} className="text-s4e-text-disabled" />
          </span>
          <div className="w-px h-4 bg-s4e-neutral-divider-10 mx-1" />
        </>
      )}
      {size === "simple" && (
        <span className="text-[11px] text-s4e-text-secondary mr-1.5">Font</span>
      )}
      {TOOL_ITEMS.map((item, i) =>
        item.type === "sep" ? (
          <div key={i} className="w-px h-4 bg-s4e-neutral-divider-10 mx-0.5" />
        ) : (
          <ToolbarBtn key={i} icon={item.icon} disabled={disabled} />
        ),
      )}
    </div>
  );
}

// ── Text Space ─────────────────────────────────────────────────────────────

function TextSpace({
  toolbarSize = "simple",
  state = "enabled",
}: {
  toolbarSize?: ToolbarSize;
  state?: TextSpaceState;
}) {
  const isDisabled = state === "disabled";
  const isError = state === "error";
  return (
    <div
      className={cn(
        "rounded-lg border overflow-hidden",
        isError
          ? "border-s4e-text-error bg-s4e-scale-red-50"
          : "border-s4e-neutral-divider-10 bg-s4e-surface-app",
        isDisabled && "opacity-40",
      )}
    >
      <Toolbar size={toolbarSize} disabled={isDisabled} />
      <div
        className={cn(
          "px-4 py-3 h-24 text-[12px]",
          isError ? "text-s4e-text-error" : "text-s4e-text-disabled",
          isDisabled && "cursor-not-allowed",
        )}
      >
        Write something awesome…
      </div>
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

function TextSpaceCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">{children}</div>
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
              <p className="text-[10px] font-semibold uppercase tracking-widest text-s4e-text-disabled mb-2">
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

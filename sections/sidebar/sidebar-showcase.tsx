"use client";

import type React from "react";
import { useState } from "react";
import {
  LayoutDashboard, Radar, Server, ScanLine, Bug, Globe2,
  Siren, ListChecks, ShieldCheck, FileText, Plug, Users, Settings,
  ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

type NavItem = {
  id:          string;
  label:       string;
  icon:        React.ComponentType<{ size?: number; className?: string }>;
  expandable?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { id: "dashboard",      label: "Dashboard",      icon: LayoutDashboard },
      { id: "attack-surface", label: "Attack surface", icon: Radar },
    ],
  },
  {
    label: "Assets & exposure",
    items: [
      { id: "assets",          label: "Assets",          icon: Server },
      { id: "scans",           label: "Scans",           icon: ScanLine, expandable: true },
      { id: "vulnerabilities", label: "Vulnerabilities", icon: Bug },
      { id: "threat-intel",    label: "Threat intelligence", icon: Globe2 },
    ],
  },
  {
    label: "Response",
    items: [
      { id: "incidents",   label: "Incidents",   icon: Siren },
      { id: "remediation", label: "Remediation", icon: ListChecks },
    ],
  },
  {
    label: "Governance",
    items: [
      { id: "compliance", label: "Compliance", icon: ShieldCheck, expandable: true },
      { id: "reports",    label: "Reports",    icon: FileText },
    ],
  },
  {
    label: "Workspace",
    items: [
      { id: "integrations", label: "Integrations", icon: Plug },
      { id: "team",         label: "Team & access", icon: Users },
      { id: "settings",     label: "Settings",     icon: Settings },
    ],
  },
];

// ── Sidebar ────────────────────────────────────────────────────────────────

function Sidebar({
  collapsed,
  onToggle,
  active,
  onSelect,
}: {
  collapsed: boolean;
  onToggle:  () => void;
  active:    string;
  onSelect:  (id: string) => void;
}) {
  return (
    <div
      className={cn(
        "relative transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-[240px]",
      )}
    >
    <div className="flex flex-col bg-snt-surface-app border border-snt-border-default rounded-xl overflow-hidden shadow-snt-control">
      {/* Workspace switcher */}
      <div className="h-[60px] px-2 border-b border-snt-border-default shrink-0 flex items-center">
        <button
          type="button"
          aria-label="Switch workspace"
          title={collapsed ? "Northwind Security" : undefined}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors hover:bg-snt-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring",
            collapsed && "justify-center",
          )}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-snt-action-primary">
            <span className="size-3.5 rotate-45 rounded-sm bg-snt-text-on-accent/90" />
          </span>
          {!collapsed && (
            <>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-snt-14 font-semibold tracking-tight text-snt-text-primary">Northwind Security</span>
                <span className="block truncate text-snt-11 text-snt-text-secondary">Production workspace</span>
              </span>
              <ChevronsUpDown size={14} aria-hidden className="shrink-0 text-snt-text-secondary" />
            </>
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-2">
            {/* Group header — same height in both variants */}
            <div className="h-[26px] flex items-center">
              {!collapsed ? (
                <span className="px-5 text-snt-11 font-medium text-snt-text-secondary">
                  {group.label}
                </span>
              ) : (
                <span className="mx-3 w-full h-px bg-snt-neutral-divider-10" />
              )}
            </div>
            {group.items.map((item) => {
              const isActive = active === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group flex items-center h-9 transition-colors rounded-md mx-2 w-[calc(100%-1rem)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring",
                    collapsed ? "justify-center px-3" : "px-3 gap-2.5",
                    isActive
                      ? "bg-snt-bg-brand-subtle text-snt-text-link"
                      : "text-snt-text-secondary hover:bg-snt-bg-subtle hover:text-snt-text-primary",
                  )}
                >
                  <Icon size={16} aria-hidden className="shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="text-snt-14 font-medium flex-1 text-left">{item.label}</span>
                      {item.expandable && (
                        <ChevronDown size={14} className="text-snt-text-disabled shrink-0" />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ))}

      </nav>

      {/* Footer — same height in both variants */}
      <div className="border-t border-snt-border-default shrink-0 h-[116px] flex flex-col justify-end gap-2 p-2">
        {!collapsed && (
          <div className="rounded-lg border border-snt-border-default px-3 py-2">
            <div className="flex items-center justify-between text-snt-11">
              <span className="font-medium text-snt-text-primary">Set-up progress</span>
              <span className="tabular-nums text-snt-text-secondary">14%</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-snt-bg-subtle" role="progressbar" aria-label="Set-up progress" aria-valuenow={14} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full w-[14%] rounded-full bg-snt-action-primary" />
            </div>
          </div>
        )}
        <button
          type="button"
          aria-label="Account menu"
          title={collapsed ? "Selin Demir" : undefined}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors hover:bg-snt-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring",
            collapsed && "justify-center",
          )}
        >
          <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-snt-bg-brand-subtle text-snt-12 font-semibold text-snt-text-link">SD</span>
          {!collapsed && (
            <>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-snt-12 font-medium text-snt-text-primary">Selin Demir</span>
                <span className="block truncate text-snt-11 text-snt-text-secondary">Security analyst</span>
              </span>
              <ChevronsUpDown size={14} aria-hidden className="shrink-0 text-snt-text-secondary" />
            </>
          )}
        </button>
      </div>

    </div>

      {/* Toggle — half-outside, aligned with Smart Assistant */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 bottom-[124px] w-6 h-6 rounded-full bg-snt-surface-app border border-snt-neutral-divider-10 text-snt-text-secondary hover:text-snt-text-primary hover:border-snt-brand-primary-500 transition-colors flex items-center justify-center shadow-sm z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </div>
  );
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

// ── Showcase ───────────────────────────────────────────────────────────────

/** Static expanded sidebar, for the Anatomy preview. */
export function SidebarAnatomyPreview() {
  return (
    <div className="mx-auto w-fit">
      <Sidebar collapsed={false} onToggle={() => {}} active="dashboard" onSelect={() => {}} />
    </div>
  );
}

export function SidebarShowcase() {
  const [collapsedA, setCollapsedA] = useState(false);
  const [collapsedB, setCollapsedB] = useState(true);
  const [active, setActive]         = useState("dashboard");

  return (
    <div className="space-y-10">

      {/* Interactive */}
      <div>
        <SectionTitle>Interactive</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl p-4 sm:p-6 bg-snt-neutral-grey-100/50">
          <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-4">
            Click the arrow to collapse · Click any item to set as active
          </p>
          <div className="flex justify-center">
            <Sidebar
              collapsed={collapsedA}
              onToggle={() => setCollapsedA(!collapsedA)}
              active={active}
              onSelect={setActive}
            />
          </div>
        </div>
      </div>

      {/* Variants side by side */}
      <div>
        <SectionTitle>Variants</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl p-4 sm:p-6 bg-snt-neutral-grey-100/50">
          <div className="flex items-start justify-center gap-10 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled">Expanded</span>
              <Sidebar
                collapsed={false}
                onToggle={() => {}}
                active="dashboard"
                onSelect={() => {}}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled">Collapsed</span>
              <Sidebar
                collapsed={collapsedB}
                onToggle={() => setCollapsedB(!collapsedB)}
                active="dashboard"
                onSelect={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

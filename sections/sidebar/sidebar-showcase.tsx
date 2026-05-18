"use client";

import type React from "react";
import { useState } from "react";
import {
  LayoutDashboard, BarChart3, Briefcase,
  ScanLine, Sliders, Activity,
  Shield, FileText, Bug, FileCheck, Database, Sparkles,
  ChevronDown, ChevronLeft, ChevronRight, Zap,
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
    label: "General",
    items: [
      { id: "dashboard",     label: "Dashboard",     icon: LayoutDashboard },
      { id: "insight",       label: "Insight",       icon: BarChart3 },
      { id: "asset-manager", label: "Asset Manager", icon: Briefcase },
    ],
  },
  {
    label: "Scans",
    items: [
      { id: "start",      label: "Start",      icon: ScanLine, expandable: true },
      { id: "manage",     label: "Manage",     icon: Sliders,  expandable: true },
      { id: "activities", label: "Activities", icon: Activity },
    ],
  },
  {
    label: "Compliance",
    items: [
      { id: "pc-dss", label: "PC-DSS 4.0", icon: Shield },
    ],
  },
  {
    label: "Results",
    items: [
      { id: "scan-reports",    label: "Scan Reports",        icon: FileText,  expandable: true },
      { id: "crawler-results", label: "Crawler Results",     icon: Bug,       expandable: true },
      { id: "security-txt",    label: "Security.txt Reports", icon: FileCheck },
      { id: "data-explorer",   label: "Data Explorer",       icon: Database },
      { id: "smart-assistant", label: "Smart Assistant",     icon: Sparkles },
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
    <div className="flex flex-col bg-s4e-surface-app border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-2 h-[56px] px-4 border-b border-s4e-neutral-divider-10 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-s4e-brand-primary-500 flex items-center justify-center shrink-0">
          <div className="w-3.5 h-3.5 rounded-sm bg-s4e-text-white/90 rotate-45" />
        </div>
        {!collapsed && (
          <>
            <span className="text-[15px] font-bold text-s4e-text-primary tracking-tight">Acme</span>
            <span className="ml-auto px-2 py-0.5 rounded-md bg-s4e-btn-primary-600 text-white text-[10px] font-semibold">Pro</span>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-2">
            {/* Group header — same height in both variants */}
            <div className="h-[26px] flex items-center">
              {!collapsed ? (
                <span className="px-4 text-[10px] uppercase tracking-widest text-s4e-text-disabled">
                  {group.label}
                </span>
              ) : (
                <span className="mx-3 w-full h-px bg-s4e-neutral-divider-10" />
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
                    "group flex items-center w-full h-9 transition-colors relative",
                    collapsed ? "justify-center px-3" : "px-4 gap-2.5",
                    isActive
                      ? "bg-s4e-neutral-grey-100 text-s4e-text-primary"
                      : "text-s4e-text-secondary hover:bg-s4e-neutral-grey-100 hover:text-s4e-text-primary",
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-s4e-brand-primary-500 rounded-r" />
                  )}
                  <Icon size={16} className="shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="text-[13px] font-medium flex-1 text-left">{item.label}</span>
                      {item.expandable && (
                        <ChevronDown size={14} className="text-s4e-text-disabled shrink-0" />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ))}

      </nav>

      {/* Footer — same height in both variants (~126px) */}
      <div className="border-t border-s4e-neutral-divider-10 shrink-0 h-[126px] flex flex-col">
        {!collapsed ? (
          <div className="p-3 flex flex-col gap-2.5 h-full">
            <div className="rounded-lg border border-s4e-brand-primary-500 px-3 py-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-s4e-text-primary">Getting Started</span>
              <span className="text-[11px] font-semibold text-s4e-brand-primary-500">14%</span>
            </div>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-lg bg-s4e-btn-primary-600 hover:bg-s4e-btn-primary-700 text-white text-[13px] font-medium transition-colors"
            >
              <Zap size={13} />
              Upgrade plan
            </button>
            <div className="mt-auto text-center text-[10px] text-s4e-text-disabled">Status · v03.23.0</div>
          </div>
        ) : (
          <div className="p-3 flex flex-col items-center h-full">
            <button
              type="button"
              title="Upgrade plan"
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-s4e-btn-primary-600 hover:bg-s4e-btn-primary-700 text-white transition-colors"
            >
              <Zap size={14} />
            </button>
            <div className="mt-auto text-center text-[9px] text-s4e-text-disabled">v03.23.0</div>
          </div>
        )}
      </div>

    </div>

      {/* Toggle — half-outside, aligned with Smart Assistant */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 bottom-[132px] w-6 h-6 rounded-full bg-s4e-surface-app border border-s4e-neutral-divider-10 text-s4e-text-secondary hover:text-s4e-text-primary hover:border-s4e-brand-primary-500 transition-colors flex items-center justify-center shadow-sm z-10"
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
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

export function SidebarShowcase() {
  const [collapsedA, setCollapsedA] = useState(false);
  const [collapsedB, setCollapsedB] = useState(true);
  const [active, setActive]         = useState("dashboard");

  return (
    <div className="space-y-10">

      {/* Interactive */}
      <div>
        <SectionTitle>Interactive</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl p-4 sm:p-6 bg-s4e-neutral-grey-100/50">
          <p className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled mb-4">
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
        <div className="border border-s4e-neutral-divider-10 rounded-xl p-4 sm:p-6 bg-s4e-neutral-grey-100/50">
          <div className="flex items-start justify-center gap-10 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled">Expanded</span>
              <Sidebar
                collapsed={false}
                onToggle={() => {}}
                active="dashboard"
                onSelect={() => {}}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled">Collapsed</span>
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

"use client";

import {
  LayoutGrid, BarChart3, Box, Crosshair, Settings2, Activity,
  FileCheck, FileText, Globe, Database, Sparkles, ChevronDown, Zap, Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { label: string; icon: React.ComponentType<{ size?: number; className?: string }>; active?: boolean; expandable?: boolean };
type Group = { label: string; items: Item[] };

const GROUPS: Group[] = [
  {
    label: "General",
    items: [
      { label: "Dashboard",     icon: LayoutGrid, active: true },
      { label: "Insight",       icon: BarChart3 },
      { label: "Asset Manager", icon: Box },
    ],
  },
  {
    label: "Scans",
    items: [
      { label: "Start",      icon: Crosshair,  expandable: true },
      { label: "Manage",     icon: Settings2,  expandable: true },
      { label: "Activities", icon: Activity },
    ],
  },
  {
    label: "Compliance",
    items: [
      { label: "PC-DSS 4.0", icon: FileCheck },
    ],
  },
  {
    label: "Results",
    items: [
      { label: "Scan Reports",        icon: FileText, expandable: true },
      { label: "Crawler Results",     icon: Globe,    expandable: true },
      { label: "Security.txt Reports", icon: FileCheck },
      { label: "Data Explorer",       icon: Database },
      { label: "Smart Assistant",     icon: Sparkles },
    ],
  },
];

export function AppSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[210px] shrink-0 border-r border-s4e-neutral-divider-10 bg-s4e-surface-app">
      {/* Logo */}
      <div className="flex items-center gap-2 h-[52px] px-4 border-b border-s4e-neutral-divider-10 shrink-0">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-s4e-brand-primary-500 text-s4e-text-on-accent">
          <Zap size={15} className="fill-current" />
        </span>
        <span className="text-[16px] font-bold tracking-tight text-s4e-text-primary">S4E</span>
        <span className="ml-1 px-1.5 py-0.5 rounded bg-s4e-neutral-grey-900 text-s4e-neutral-grey-00 text-[9px] font-semibold uppercase tracking-wide">Pro</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto s4e-scrollbar-hide py-2">
        {GROUPS.map((g) => (
          <div key={g.label} className="px-2 mb-1">
            <div className="px-2 pt-2.5 pb-1 text-[10px] uppercase tracking-widest text-s4e-text-disabled">{g.label}</div>
            {g.items.map((it) => {
              const Icon = it.icon;
              return (
                <div
                  key={it.label}
                  className={cn(
                    "flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[14px] cursor-default transition-colors",
                    it.active
                      ? "bg-s4e-brand-primary-50 text-s4e-brand-primary-600 font-medium"
                      : "text-s4e-text-secondary hover:bg-s4e-neutral-grey-100 hover:text-s4e-text-primary",
                  )}
                >
                  <Icon size={15} className="shrink-0" />
                  <span className="flex-1 truncate">{it.label}</span>
                  {it.expandable && <ChevronDown size={13} className="text-s4e-text-disabled shrink-0" />}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-s4e-neutral-divider-10 p-3 space-y-2.5 shrink-0">
        <div className="rounded-md border border-s4e-neutral-divider-10 px-2.5 py-1.5">
          <div className="flex items-center justify-between text-[11px] text-s4e-text-secondary mb-1">
            <span>Getting Started</span><span className="font-medium text-s4e-text-primary">14%</span>
          </div>
          <div className="h-1 rounded-full bg-s4e-neutral-grey-200 overflow-hidden">
            <div className="h-full w-[14%] bg-s4e-brand-primary-500" />
          </div>
        </div>
        <button type="button" className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-lg bg-s4e-btn-primary-600 text-s4e-text-on-accent text-[14px] font-medium hover:bg-s4e-btn-primary-700 transition-colors">
          <Rocket size={14} /> Upgrade plan
        </button>
        <div className="text-center text-[10px] text-s4e-text-disabled">Status · v03.23.0</div>
      </div>
    </aside>
  );
}

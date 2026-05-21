"use client";

import { ScanLine, Sparkles, Bell } from "lucide-react";

export function AppTopbar() {
  return (
    <div className="flex items-center gap-3 h-[52px] px-5 sm:px-7 border-b border-s4e-neutral-divider-10 bg-s4e-surface-app shrink-0">
      {/* Test mode pill */}
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-s4e-scale-red-200 bg-s4e-scale-red-50 text-[11px] font-medium text-s4e-scale-red-600">
        <span className="w-[6px] h-[6px] rounded-full bg-s4e-scale-red-500" />
        Test Mode
      </span>

      <div className="ml-auto flex items-center gap-4">
        <button type="button" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-s4e-text-secondary hover:text-s4e-text-primary transition-colors">
          <ScanLine size={14} className="text-s4e-brand-primary-500" /> Scan Generator
        </button>
        <button type="button" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-s4e-text-secondary hover:text-s4e-text-primary transition-colors">
          <Sparkles size={14} className="text-s4e-scale-purple-500" /> Ask AI
        </button>
        <button type="button" aria-label="Notifications" className="text-s4e-text-secondary hover:text-s4e-text-primary transition-colors">
          <Bell size={16} />
        </button>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-s4e-neutral-grey-200 text-s4e-text-secondary text-[12px] font-semibold ring-1 ring-s4e-neutral-divider-10">
          S
        </span>
      </div>
    </div>
  );
}

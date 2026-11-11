"use client";

import { ScanLine, Sparkles, Bell } from "lucide-react";

export function AppTopbar() {
  return (
    <div className="flex items-center gap-3 h-[52px] px-5 sm:px-7 border-b border-snt-neutral-divider-10 bg-snt-surface-app shrink-0">
      {/* Test mode pill */}
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-snt-scale-red-200 bg-snt-scale-red-50 text-[11px] font-medium text-snt-scale-red-600">
        <span className="w-[6px] h-[6px] rounded-full bg-snt-scale-red-500" />
        Test Mode
      </span>

      <div className="ml-auto flex items-center gap-4">
        <button type="button" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-snt-text-secondary hover:text-snt-text-primary transition-colors">
          <ScanLine size={14} className="text-snt-brand-primary-500" /> Scan Generator
        </button>
        <button type="button" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-snt-text-secondary hover:text-snt-text-primary transition-colors">
          <Sparkles size={14} className="text-snt-scale-purple-500" /> Ask AI
        </button>
        <button type="button" aria-label="Notifications" className="text-snt-text-secondary hover:text-snt-text-primary transition-colors">
          <Bell size={16} />
        </button>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-snt-neutral-grey-200 text-snt-text-secondary text-[12px] font-semibold ring-1 ring-snt-neutral-divider-10">
          S
        </span>
      </div>
    </div>
  );
}

"use client";

import type React from "react";
import { useState } from "react";
import { Sparkles, Bell, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

// ── Test Mode pill (ON state) ──────────────────────────────────────────────

function TestModePill({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Click to exit Test Mode"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-snt-scale-red-50 hover:bg-snt-scale-red-100 text-snt-scale-red-600 transition-colors"
    >
      <span className="snt-pulse-dot w-[7px] h-[7px] rounded-full bg-snt-scale-red-500 shrink-0" />
      <span className="text-[11px] font-semibold">Test Mode</span>
    </button>
  );
}

// ── Test Mode trigger (OFF state) ──────────────────────────────────────────

function TestModeTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Preview the dashboard with demo data"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-dashed border-snt-neutral-divider-10 text-snt-text-disabled hover:border-snt-brand-primary-500 hover:text-snt-brand-primary-500 transition-colors"
    >
      <FlaskConical size={12} />
      <span className="text-[11px] font-medium">Try demo data</span>
    </button>
  );
}

// ── Ask AI button with AI vibe hover ───────────────────────────────────────

function AskAIButton() {
  return (
    <button
      type="button"
      className="ai-trigger inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[12px] font-semibold"
    >
      <span className="relative inline-flex items-center justify-center w-4 h-4">
        {/* Expanding rings — color-cycling ripples */}
        <span className="ai-ring absolute inset-0 rounded-full" />
        <span className="ai-ring ai-ring-delay absolute inset-0 rounded-full" />
        <Sparkles size={14} className="ai-icon ai-gradient-icon relative z-10" />
      </span>
      <span className="ai-gradient-text">Ask AI</span>
    </button>
  );
}

// ── Notification bell ──────────────────────────────────────────────────────

function NotificationBell() {
  return (
    <button
      type="button"
      title="Notifications"
      className="relative w-8 h-8 rounded-lg hover:bg-snt-neutral-grey-100 flex items-center justify-center text-snt-text-secondary hover:text-snt-text-primary transition-colors"
    >
      <Bell size={15} />
      <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full bg-snt-scale-red-500 ring-2 ring-snt-surface-app" />
    </button>
  );
}

// ── Avatar ─────────────────────────────────────────────────────────────────

function Avatar() {
  return (
    <button
      type="button"
      title="Account"
      className="w-8 h-8 rounded-full bg-snt-neutral-grey-200 border border-snt-neutral-divider-10 text-snt-text-primary text-[12px] font-semibold flex items-center justify-center hover:border-snt-brand-primary-500 transition-colors"
    >
      S
    </button>
  );
}

// ── Top Bar ────────────────────────────────────────────────────────────────

function TopBar({
  testMode,
  onToggleTest,
}: {
  testMode:     boolean;
  onToggleTest: () => void;
}) {
  return (
    <div className="flex items-center h-[52px] px-4 bg-snt-surface-app border border-snt-neutral-divider-10 rounded-xl">
      {/* Left */}
      <div className="flex items-center">
        {testMode
          ? <TestModePill onClick={onToggleTest} />
          : <TestModeTrigger onClick={onToggleTest} />
        }
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-1">
        <AskAIButton />
        <div className="w-px h-5 bg-snt-neutral-divider-10 mx-1.5" />
        <NotificationBell />
        <div className="w-px h-5 bg-snt-neutral-divider-10 mx-1.5" />
        <Avatar />
      </div>
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

export function TopBarShowcase() {
  const [interactive, setInteractive] = useState(true);

  return (
    <div className="space-y-10">

      {/* Interactive */}
      <div>
        <SectionTitle>Interactive</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-8 bg-snt-neutral-grey-100/40">
          <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-4 text-center">
            Click the Test Mode pill to toggle · Hover Ask AI for the shimmer
          </p>
          <TopBar testMode={interactive} onToggleTest={() => setInteractive(!interactive)} />
        </div>
      </div>

      {/* Variants */}
      <div>
        <SectionTitle>Variants</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5 space-y-6">

          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">Test Mode · On</p>
            <TopBar testMode onToggleTest={() => {}} />
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">Test Mode · Off</p>
            <TopBar testMode={false} onToggleTest={() => {}} />
          </div>

        </div>
      </div>

      {/* Ask AI focus */}
      <div>
        <SectionTitle>Ask AI · Hover Effect</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-8 flex items-center justify-center">
          <div className={cn(
            "inline-flex items-center gap-2 p-4 rounded-xl bg-snt-neutral-grey-100/50",
          )}>
            <AskAIButton />
            <span className="text-[11px] text-snt-text-disabled ml-2">← hover me</span>
          </div>
        </div>
      </div>

    </div>
  );
}

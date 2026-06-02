"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { CircleCheck, CircleAlert, Lightbulb, Ban, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";

// ── Tooltip ────────────────────────────────────────────────────────────────

const TOOLTIP_TEXT = "Rorem ipsum dolor sit amet, consectetur adipiscing elit.";

type TooltipPos = "top" | "bottom" | "left" | "right";

function TooltipBubble({
  children,
  content = TOOLTIP_TEXT,
  position = "top",
}: {
  children: React.ReactNode;
  content?: string;
  position?: TooltipPos;
}) {
  const [show, setShow] = useState(false);

  const bubblePos: Record<TooltipPos, string> = {
    top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left:   "right-full top-1/2 -translate-y-1/2 mr-2",
    right:  "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowPos: Record<TooltipPos, string> = {
    top:    "top-full left-1/2 -translate-x-1/2 border-t-s4e-neutral-grey-900",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-s4e-neutral-grey-900",
    left:   "left-full top-1/2 -translate-y-1/2 border-l-s4e-neutral-grey-900",
    right:  "right-full top-1/2 -translate-y-1/2 border-r-s4e-neutral-grey-900",
  };

  const arrowBorder: Record<TooltipPos, string> = {
    top:    "border-t-s4e-neutral-grey-900 border-b-transparent border-x-transparent",
    bottom: "border-b-s4e-neutral-grey-900 border-t-transparent border-x-transparent",
    left:   "border-l-s4e-neutral-grey-900 border-r-transparent border-y-transparent",
    right:  "border-r-s4e-neutral-grey-900 border-l-transparent border-y-transparent",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={cn(
            "absolute z-dropdown w-56 px-3 py-2 rounded-xl text-[12px] text-s4e-text-inverse leading-relaxed pointer-events-none",
            "bg-s4e-neutral-grey-900",
            bubblePos[position],
          )}
        >
          {content}
          <div
            className={cn(
              "absolute border-4",
              arrowPos[position],
              arrowBorder[position],
            )}
          />
        </div>
      )}
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────────

type ToastType = "success" | "alert" | "info" | "warning";

const TOAST_CONFIG: Record<
  ToastType,
  { label: string; Icon: React.ComponentType<{ size?: number; className?: string }>; color: string; bar: string }
> = {
  success: { label: "Successfully Message", Icon: CircleCheck,  color: "text-s4e-feedback-success", bar: "bg-s4e-feedback-success" },
  alert:   { label: "Alert Message",        Icon: CircleAlert,  color: "text-s4e-feedback-warning",  bar: "bg-s4e-feedback-warning" },
  info:    { label: "Info Message",         Icon: Lightbulb,    color: "text-s4e-feedback-info",     bar: "bg-s4e-feedback-info"    },
  warning: { label: "Warning Message",      Icon: Ban,          color: "text-s4e-feedback-alert",    bar: "bg-s4e-feedback-alert"   },
};

const TOAST_ORDER: ToastType[] = ["success", "alert", "info", "warning"];

function Toast({
  type,
  onDismiss,
}: {
  type: ToastType;
  onDismiss: () => void;
}) {
  const { label, Icon, color, bar } = TOAST_CONFIG[type];

  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);
  return (
    <div className="overflow-hidden bg-s4e-surface-app border border-s4e-neutral-divider-10 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3">
        <Icon size={20} className={cn("shrink-0", color)} />
        <span className="flex-1 text-[13px] font-semibold text-s4e-text-primary">{label}</span>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-s4e-text-disabled hover:text-s4e-text-primary transition-colors"
        >
          <X size={15} />
        </button>
      </div>
      <div className="h-[3px] w-full bg-s4e-neutral-grey-100">
        <div className={cn("h-full toast-timer-bar", bar)} />
      </div>
    </div>
  );
}

// ── Section helpers ────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

// ── Snippets ───────────────────────────────────────────────────────────────

function tooltipSnippets(pos: TooltipPos): Record<Platform, string> {
  return {
    react: `<Tooltip position="${pos}" content="${TOOLTIP_TEXT}">
  <button>${pos[0].toUpperCase()}${pos.slice(1)}</button>
</Tooltip>`,
    swift: `Button("${pos[0].toUpperCase()}${pos.slice(1)}") { /* action */ }
    .help("${TOOLTIP_TEXT}")
    .tooltipPosition(.${pos})`,
    xml: `<com.s4e.ui.Tooltip
    app:position="${pos}"
    android:contentDescription="${TOOLTIP_TEXT}">
    <Button android:text="${pos[0].toUpperCase()}${pos.slice(1)}" />
</com.s4e.ui.Tooltip>`,
  };
}

function toastSnippets(t: ToastType): Record<Platform, string> {
  const label = TOAST_CONFIG[t].label;
  return {
    react: `<Toast type="${t}">${label}</Toast>`,
    swift: `.toast(isPresented: $show, type: .${t}) {
    Text("${label}")
}`,
    xml: `<com.s4e.ui.Toast
    app:type="${t}"
    android:text="${label}" />`,
  };
}

// ── Showcase ───────────────────────────────────────────────────────────────

export function ToastTooltipShowcase() {
  const [dismissed, setDismissed] = useState<Set<ToastType>>(new Set());

  const dismiss = (t: ToastType) =>
    setDismissed((prev) => new Set([...prev, t]));

  const allDismissed = dismissed.size === TOAST_ORDER.length;

  return (
    <div className="space-y-10">

      {/* Tooltip */}
      <div>
        <SectionTitle>Tooltip</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-8">
          <div className="flex flex-wrap justify-center gap-10">
            {(["top", "right", "bottom", "left"] as TooltipPos[]).map((pos) => (
              <Copyable key={pos} snippets={tooltipSnippets(pos)}>
                <TooltipBubble position={pos}>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg border border-s4e-neutral-divider-10 text-[12px] font-medium text-s4e-text-secondary hover:bg-s4e-neutral-grey-100 transition-colors capitalize"
                  >
                    {pos}
                  </button>
                </TooltipBubble>
              </Copyable>
            ))}
          </div>
          <p className="text-center text-[10px] text-s4e-text-disabled mt-6">
            Hover over the buttons to see the tooltip
          </p>
        </div>
      </div>

      {/* Toast */}
      <div>
        <SectionTitle>Toast</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="space-y-2 max-w-sm">
            {TOAST_ORDER.filter((t) => !dismissed.has(t)).map((t) => (
              <Copyable key={t} snippets={toastSnippets(t)} className="block">
                <Toast type={t} onDismiss={() => dismiss(t)} />
              </Copyable>
            ))}

            {allDismissed && (
              <div className="flex flex-col items-start gap-3 pt-1">
                <span className="text-[12px] text-s4e-text-disabled">All toasts dismissed.</span>
                <button
                  type="button"
                  onClick={() => setDismissed(new Set())}
                  className="text-[12px] font-medium text-s4e-brand-primary-600 hover:text-s4e-brand-primary-700 transition-colors"
                >
                  Reset
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

function StaticToast({ type }: { type: ToastType }) {
  const { label, Icon, color, bar } = TOAST_CONFIG[type];
  return (
    <div className="w-80 overflow-hidden bg-s4e-surface-app border border-s4e-neutral-divider-10 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3">
        <Icon size={20} className={cn("shrink-0", color)} />
        <span className="flex-1 text-[13px] font-semibold text-s4e-text-primary">{label}</span>
        <button
          type="button"
          className="shrink-0 text-s4e-text-disabled hover:text-s4e-text-primary transition-colors"
        >
          <X size={15} />
        </button>
      </div>
      <div className="h-[3px] w-full bg-s4e-neutral-grey-100">
        <div className={cn("h-full w-1/3", bar)} />
      </div>
    </div>
  );
}

function StaticTooltipPreview({ position }: { position: TooltipPos }) {
  return (
    <TooltipBubble position={position}>
      <button
        type="button"
        className="px-4 py-2 rounded-lg border border-s4e-neutral-divider-10 text-[12px] font-medium text-s4e-text-secondary hover:bg-s4e-neutral-grey-100 transition-colors capitalize"
      >
        {position}
      </button>
    </TooltipBubble>
  );
}

export function ToastTooltipExamples() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Tooltip</SectionTitle>
        <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
          Anchor the tooltip to the side with most available space. Hover the trigger to see the bubble.
        </p>
        <div className="space-y-4">
          {(["top", "right", "bottom", "left"] as TooltipPos[]).map((pos) => (
            <ExampleCard
              key={pos}
              title={`Position · ${pos[0].toUpperCase()}${pos.slice(1)}`}
              code={tooltipSnippets(pos).react}
              preview={<StaticTooltipPreview position={pos} />}
              density="tall"
            />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Toast</SectionTitle>
        <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
          Four feedback variants. Toasts auto-dismiss after 4 seconds; users can close earlier with the × button.
        </p>
        <div className="space-y-4">
          {TOAST_ORDER.map((t) => (
            <ExampleCard
              key={t}
              title={`Type · ${t[0].toUpperCase()}${t.slice(1)}`}
              code={toastSnippets(t).react}
              preview={<StaticToast type={t} />}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

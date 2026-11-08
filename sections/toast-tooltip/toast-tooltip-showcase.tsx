"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { CircleCheck, CircleAlert, Lightbulb, Ban, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";
import { Toast as UIToast, Tooltip } from "@/components/ui/toast-tooltip";

// ── Tooltip ────────────────────────────────────────────────────────────────

const TOOLTIP_TEXT = "Rorem ipsum dolor sit amet, consectetur adipiscing elit.";

type TooltipPos = "top" | "bottom" | "left" | "right";

function TooltipBubble({
  children,
  content = TOOLTIP_TEXT,
  position = "top",
  open,
}: {
  children: React.ReactNode;
  content?: string;
  position?: TooltipPos;
  open?: boolean;
}) {
  return <Tooltip content={content} position={position} open={open}>{children}</Tooltip>;
}

// ── Toast ──────────────────────────────────────────────────────────────────

type ToastType = "success" | "alert" | "info" | "warning";

const TOAST_CONFIG: Record<
  ToastType,
  { label: string; Icon: React.ComponentType<{ size?: number; className?: string }>; color: string; bar: string }
> = {
  success: { label: "Successfully Message", Icon: CircleCheck,  color: "text-snt-feedback-success", bar: "bg-snt-feedback-success" },
  alert:   { label: "Alert Message",        Icon: CircleAlert,  color: "text-snt-feedback-warning",  bar: "bg-snt-feedback-warning" },
  info:    { label: "Info Message",         Icon: Lightbulb,    color: "text-snt-feedback-info",     bar: "bg-snt-feedback-info"    },
  warning: { label: "Warning Message",      Icon: Ban,          color: "text-snt-feedback-alert",    bar: "bg-snt-feedback-alert"   },
};

const TOAST_ORDER: ToastType[] = ["success", "alert", "info", "warning"];

function Toast({
  type,
  onDismiss,
}: {
  type: ToastType;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);
  return <UIToast intent={type} title={TOAST_CONFIG[type].label} onDismiss={onDismiss} />;
}

// ── Section helpers ────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <span className="text-[15px] font-semibold text-snt-text-primary">{children}</span>
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
    xml: `<com.sentinel.ui.Tooltip
    app:position="${pos}"
    android:contentDescription="${TOOLTIP_TEXT}">
    <Button android:text="${pos[0].toUpperCase()}${pos.slice(1)}" />
</com.sentinel.ui.Tooltip>`,
  };
}

function toastSnippets(t: ToastType): Record<Platform, string> {
  const label = TOAST_CONFIG[t].label;
  return {
    react: `<Toast type="${t}">${label}</Toast>`,
    swift: `.toast(isPresented: $show, type: .${t}) {
    Text("${label}")
}`,
    xml: `<com.sentinel.ui.Toast
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
        <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-8">
          <div className="flex flex-wrap justify-center gap-10">
            {(["top", "right", "bottom", "left"] as TooltipPos[]).map((pos) => (
              <Copyable key={pos} snippets={tooltipSnippets(pos)}>
                <TooltipBubble position={pos}>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg border border-snt-neutral-divider-10 text-[12px] font-medium text-snt-text-secondary hover:bg-snt-neutral-grey-100 transition-colors capitalize"
                  >
                    {pos}
                  </button>
                </TooltipBubble>
              </Copyable>
            ))}
          </div>
          <p className="text-center text-[10px] text-snt-text-disabled mt-6">
            Hover over the buttons to see the tooltip
          </p>
        </div>
      </div>

      {/* Toast */}
      <div>
        <SectionTitle>Toast</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="space-y-2 max-w-sm">
            {TOAST_ORDER.filter((t) => !dismissed.has(t)).map((t) => (
              <Copyable key={t} snippets={toastSnippets(t)} className="block">
                <Toast type={t} onDismiss={() => dismiss(t)} />
              </Copyable>
            ))}

            {allDismissed && (
              <div className="flex flex-col items-start gap-3 pt-1">
                <span className="text-[12px] text-snt-text-disabled">All toasts dismissed.</span>
                <button
                  type="button"
                  onClick={() => setDismissed(new Set())}
                  className="text-[12px] font-medium text-snt-brand-primary-600 hover:text-snt-brand-primary-700 transition-colors"
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
    <div className="w-80 overflow-hidden bg-snt-surface-app border border-snt-neutral-divider-10 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3">
        <Icon size={20} className={cn("shrink-0", color)} />
        <span className="flex-1 text-[14px] font-semibold text-snt-text-primary">{label}</span>
        <button
          type="button"
          className="shrink-0 text-snt-text-disabled hover:text-snt-text-primary transition-colors"
        >
          <X size={15} />
        </button>
      </div>
      <div className="h-[3px] w-full bg-snt-neutral-grey-100">
        <div className={cn("h-full w-1/3", bar)} />
      </div>
    </div>
  );
}

function StaticTooltipPreview({ position }: { position: TooltipPos }) {
  return (
    <TooltipBubble position={position} open>
      <button
        type="button"
        className="px-4 py-2 rounded-lg border border-snt-neutral-divider-10 text-[12px] font-medium text-snt-text-secondary hover:bg-snt-neutral-grey-100 transition-colors capitalize"
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
        <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
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
        <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
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

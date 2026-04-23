"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { CircleCheck, CircleAlert, Lightbulb, Ban, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    top:    "top-full left-1/2 -translate-x-1/2 border-t-s4e-neutral-grey-800",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-s4e-neutral-grey-800",
    left:   "left-full top-1/2 -translate-y-1/2 border-l-s4e-neutral-grey-800",
    right:  "right-full top-1/2 -translate-y-1/2 border-r-s4e-neutral-grey-800",
  };

  const arrowBorder: Record<TooltipPos, string> = {
    top:    "border-t-s4e-neutral-grey-800 border-b-transparent border-x-transparent",
    bottom: "border-b-s4e-neutral-grey-800 border-t-transparent border-x-transparent",
    left:   "border-l-s4e-neutral-grey-800 border-r-transparent border-y-transparent",
    right:  "border-r-s4e-neutral-grey-800 border-l-transparent border-y-transparent",
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
            "absolute z-20 w-56 px-3 py-2 rounded-xl text-[12px] text-white leading-relaxed pointer-events-none",
            "bg-s4e-neutral-grey-800",
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
              <TooltipBubble key={pos} position={pos}>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-s4e-neutral-divider-10 text-[12px] font-medium text-s4e-text-secondary hover:bg-s4e-neutral-grey-100 transition-colors capitalize"
                >
                  {pos}
                </button>
              </TooltipBubble>
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
              <Toast key={t} type={t} onDismiss={() => dismiss(t)} />
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

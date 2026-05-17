"use client";

import type React from "react";
import { useState } from "react";
import { CheckCircle2, Info, AlertTriangle, OctagonAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Variant config ────────────────────────────────────────────────────────

type Variant = "info" | "success" | "warning" | "error";

const VARIANT: Record<Variant, {
  bg:     string;
  border: string;
  text:   string;
  title:  string;
  icon:   React.ComponentType<{ size?: number }>;
}> = {
  info: {
    bg:     "bg-s4e-scale-blue-50",
    border: "border-s4e-scale-blue-200",
    text:   "text-s4e-scale-blue-700",
    title:  "text-s4e-scale-blue-700",
    icon:   Info,
  },
  success: {
    bg:     "bg-s4e-scale-green-50",
    border: "border-s4e-scale-green-200",
    text:   "text-s4e-scale-green-700",
    title:  "text-s4e-scale-green-700",
    icon:   CheckCircle2,
  },
  warning: {
    bg:     "bg-s4e-scale-yellow-50",
    border: "border-s4e-scale-yellow-200",
    text:   "text-s4e-scale-yellow-700",
    title:  "text-s4e-scale-yellow-700",
    icon:   AlertTriangle,
  },
  error: {
    bg:     "bg-s4e-scale-red-50",
    border: "border-s4e-scale-red-200",
    text:   "text-s4e-scale-red-700",
    title:  "text-s4e-scale-red-700",
    icon:   OctagonAlert,
  },
};

// ── Alert component ───────────────────────────────────────────────────────

function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  action,
}: {
  variant?:     Variant;
  title?:       string;
  children?:    React.ReactNode;
  dismissible?: boolean;
  action?:      React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const cfg = VARIANT[variant];
  const Icon = cfg.icon;
  if (!open) return null;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-md border px-4 py-3",
        cfg.bg, cfg.border,
      )}
    >
      <Icon size={16} />
      <div className="flex-1 min-w-0">
        {title && (
          <div className={cn("text-[13px] font-semibold leading-tight", cfg.title)}>
            {title}
          </div>
        )}
        {children && (
          <div className={cn("text-[12px] leading-relaxed", cfg.text, title && "mt-1")}>
            {children}
          </div>
        )}
        {action && <div className="mt-2.5">{action}</div>}
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setOpen(false)}
          className={cn("shrink-0 p-1 -m-1 rounded hover:bg-black/5 cursor-pointer", cfg.text)}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

// ── Showcase ──────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

const VARIANTS: Variant[] = ["info", "success", "warning", "error"];

export function AlertShowcase() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Variants</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 space-y-3">
          {VARIANTS.map((v) => (
            <Alert key={v} variant={v} title={`${v[0].toUpperCase()}${v.slice(1)} alert`}>
              Stays on screen until explicitly resolved. Use for state that the user must
              acknowledge — not for transient messages.
            </Alert>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Dismissible · With action</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 space-y-3">
          <Alert
            variant="warning"
            title="Quota almost exceeded"
            dismissible
            action={
              <button
                type="button"
                className="text-[11px] font-medium underline text-s4e-scale-yellow-700 hover:opacity-80 cursor-pointer"
              >
                Upgrade plan
              </button>
            }
          >
            You have used 9.2 GB of your 10 GB monthly allowance.
          </Alert>
          <Alert variant="error" dismissible>
            Failed to save changes. Check your connection and try again.
          </Alert>
        </div>
      </div>

      <div>
        <SectionTitle>Title only · Description only</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 space-y-3">
          <Alert variant="success" title="Scan completed in 4.3 seconds" />
          <Alert variant="info">All keyboard shortcuts have been remapped.</Alert>
        </div>
      </div>
    </div>
  );
}

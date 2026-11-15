"use client";

import * as React from "react";
import { CheckCircle2, Info, AlertTriangle, OctagonAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Alert
 *
 * Drop this file into your project at components/ui/alert.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 *   • lucide-react for icons.
 */

type Variant = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?:     Variant;
  title?:       React.ReactNode;
  dismissible?: boolean;
  action?:      React.ReactNode;
  onDismiss?:   () => void;
}

type VariantConfig = {
  bg:        string;
  border:    string;
  text:      string;
  title:     string;
  iconClass: string;
  icon:      React.ComponentType<{ size?: number; className?: string }>;
};

const VARIANT_CLASS: Record<Variant, VariantConfig> = {
  info: {
    bg:        "bg-snt-bg-info-subtle",
    border:    "border-snt-border-default",
    text:      "text-snt-text-secondary",
    title:     "text-snt-text-primary",
    iconClass: "text-snt-text-info",
    icon:      Info,
  },
  success: {
    bg:        "bg-snt-bg-success-subtle",
    border:    "border-snt-border-default",
    text:      "text-snt-text-secondary",
    title:     "text-snt-text-primary",
    iconClass: "text-snt-text-success",
    icon:      CheckCircle2,
  },
  warning: {
    bg:        "bg-snt-bg-warning-subtle",
    border:    "border-snt-border-default",
    text:      "text-snt-text-secondary",
    title:     "text-snt-text-primary",
    iconClass: "text-snt-text-warning",
    icon:      AlertTriangle,
  },
  error: {
    bg:        "bg-snt-bg-error-subtle",
    border:    "border-snt-border-default",
    text:      "text-snt-text-secondary",
    title:     "text-snt-text-primary",
    iconClass: "text-snt-text-error",
    icon:      OctagonAlert,
  },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant     = "info",
      title,
      dismissible = false,
      action,
      onDismiss,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(true);
    const cfg = VARIANT_CLASS[variant];
    const Icon = cfg.icon;
    if (!open) return null;

    const handleDismiss = () => {
      setOpen(false);
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        role={variant === "error" || variant === "warning" ? "alert" : "status"}
        className={cn(
          "flex items-start gap-3 rounded-xl border px-4 py-3.5",
          cfg.bg,
          cfg.border,
          className,
        )}
        {...props}
      >
        <Icon size={18} aria-hidden className={cn("shrink-0 mt-px", cfg.iconClass)} />
        <div className="flex-1 min-w-0">
          {title && (
            <div className={cn("text-snt-14 font-semibold tracking-tight leading-tight", cfg.title)}>
              {title}
            </div>
          )}
          {children && (
            <div className={cn("text-snt-12 leading-relaxed", cfg.text, title && "mt-1")}>
              {children}
            </div>
          )}
          {action && <div className="mt-2.5">{action}</div>}
        </div>
        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={handleDismiss}
            className={cn(
              "flex size-7 shrink-0 -mr-1.5 -mt-1 items-center justify-center rounded-md hover:bg-snt-neutral-divider-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring",
              cfg.text,
            )}
          >
            <X size={14} aria-hidden />
          </button>
        )}
      </div>
    );
  },
);
Alert.displayName = "Alert";

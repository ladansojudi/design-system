"use client";

import * as React from "react";
import { CheckCircle2, Info, AlertTriangle, OctagonAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Alert
 *
 * Drop this file into your project at components/ui/alert.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
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
    bg:        "bg-s4e-scale-blue-50",
    border:    "border-s4e-scale-blue-200",
    text:      "text-s4e-text-info",
    title:     "text-s4e-text-info",
    iconClass: "text-s4e-text-info",
    icon:      Info,
  },
  success: {
    bg:        "bg-s4e-scale-green-50",
    border:    "border-s4e-scale-green-200",
    text:      "text-s4e-text-success",
    title:     "text-s4e-text-success",
    iconClass: "text-s4e-text-success",
    icon:      CheckCircle2,
  },
  warning: {
    bg:        "bg-s4e-scale-yellow-50",
    border:    "border-s4e-scale-yellow-200",
    text:      "text-s4e-text-warning",
    title:     "text-s4e-text-warning",
    iconClass: "text-s4e-text-warning",
    icon:      AlertTriangle,
  },
  error: {
    bg:        "bg-s4e-scale-red-50",
    border:    "border-s4e-scale-red-200",
    text:      "text-s4e-text-error",
    title:     "text-s4e-text-error",
    iconClass: "text-s4e-text-error",
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
        role="alert"
        className={cn(
          "flex items-start gap-3 rounded-md border px-4 py-3",
          cfg.bg,
          cfg.border,
          className,
        )}
        {...props}
      >
        <Icon size={16} className={cn("shrink-0 mt-px", cfg.iconClass)} />
        <div className="flex-1 min-w-0">
          {title && (
            <div className={cn("text-[14px] font-semibold leading-tight", cfg.title)}>
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
            onClick={handleDismiss}
            className={cn(
              "shrink-0 p-1 -m-1 rounded hover:bg-s4e-neutral-divider-10 cursor-pointer",
              cfg.text,
            )}
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  },
);
Alert.displayName = "Alert";

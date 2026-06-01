"use client";

import * as React from "react";
import { Megaphone, Sparkles, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Banner
 *
 * Drop this file into your project at components/ui/banner.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 *   • lucide-react for icons.
 */

type Tone = "neutral" | "promo" | "warning";

export interface BannerCta {
  label: string;
  href?: string;
}

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?:        Tone;
  message:      React.ReactNode;
  cta?:         BannerCta;
  dismissible?: boolean;
  onDismiss?:   () => void;
}

type ToneConfig = {
  bg:    string;
  text:  string;
  hover: string;
  icon:  React.ComponentType<{ size?: number; className?: string }>;
};

const TONE_CLASS: Record<Tone, ToneConfig> = {
  neutral: {
    bg:    "bg-s4e-btn-neutral-800",
    text:  "text-s4e-text-white",
    hover: "hover:bg-s4e-text-white/10",
    icon:  Megaphone,
  },
  promo: {
    bg:    "bg-s4e-btn-primary-600",
    text:  "text-s4e-text-white",
    hover: "hover:bg-s4e-text-white/10",
    icon:  Sparkles,
  },
  warning: {
    bg:    "bg-s4e-scale-yellow-500",
    text:  "text-s4e-btn-neutral-800",
    hover: "hover:bg-s4e-btn-neutral-800/10",
    icon:  AlertTriangle,
  },
};

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      tone        = "neutral",
      message,
      cta,
      dismissible = true,
      onDismiss,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(true);
    const cfg = TONE_CLASS[tone];
    const Icon = cfg.icon;
    if (!open) return null;

    const handleDismiss = () => {
      setOpen(false);
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-2.5",
          cfg.bg,
          cfg.text,
          className,
        )}
        {...props}
      >
        <Icon size={14} className="shrink-0" />
        <div className="flex-1 min-w-0 text-[12px] leading-tight">{message}</div>
        {cta && (
          <a
            href={cta.href ?? "#"}
            className="text-[11px] font-semibold underline underline-offset-2 hover:opacity-80 shrink-0"
          >
            {cta.label}
          </a>
        )}
        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={handleDismiss}
            className={cn("shrink-0 p-1 -m-1 rounded cursor-pointer", cfg.hover)}
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  },
);
Banner.displayName = "Banner";

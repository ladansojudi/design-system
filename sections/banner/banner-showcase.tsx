"use client";

import type React from "react";
import { useState } from "react";
import { Megaphone, Sparkles, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";

type Tone = "neutral" | "promo" | "warning";

const TONE: Record<Tone, { bg: string; text: string; hover: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  // bg + text colors are static (don't flip) so banners read the same in light + dark
  neutral: { bg: "bg-s4e-btn-neutral-800", text: "text-s4e-text-white",     hover: "hover:bg-s4e-text-white/10",  icon: Megaphone     },
  promo:   { bg: "bg-s4e-btn-primary-600", text: "text-s4e-text-white",     hover: "hover:bg-s4e-text-white/10",  icon: Sparkles      },
  warning: { bg: "bg-s4e-scale-yellow-500",text: "text-s4e-btn-neutral-800",hover: "hover:bg-s4e-btn-neutral-800/10", icon: AlertTriangle },
};

function Banner({
  tone = "neutral",
  message,
  cta,
  dismissible = true,
}: {
  tone?:        Tone;
  message:      React.ReactNode;
  cta?:         { label: string; href?: string };
  dismissible?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const cfg = TONE[tone];
  const Icon = cfg.icon;
  if (!open) return null;

  return (
    <div className={cn("w-full flex items-center gap-3 px-4 py-2.5", cfg.bg, cfg.text)}>
      <Icon size={14} className="shrink-0" />
      <div className="flex-1 min-w-0 text-[12px] leading-tight">
        {message}
      </div>
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
          onClick={() => setOpen(false)}
          className={cn("shrink-0 p-1 -m-1 rounded cursor-pointer", cfg.hover)}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

const NEUTRAL_SNIPPETS: Record<Platform, string> = {
  react: `<Banner tone="neutral" message="Scheduled maintenance window starts at 02:00 UTC tomorrow." />`,
  swift: `Banner(tone: .neutral, message: "Scheduled maintenance window starts at 02:00 UTC tomorrow.")`,
  xml: `<com.s4e.ui.Banner
    app:tone="neutral"
    android:text="Scheduled maintenance window starts at 02:00 UTC tomorrow." />`,
};

const PROMO_SNIPPETS: Record<Platform, string> = {
  react: `<Banner
  tone="promo"
  message="New: AI-assisted vulnerability triage is live for all teams."
  cta={{ label: "Try it" }}
/>`,
  swift: `Banner(tone: .promo, message: "New: AI-assisted vulnerability triage is live for all teams.") {
    Button("Try it") { /* action */ }
}`,
  xml: `<com.s4e.ui.Banner
    app:tone="promo"
    app:ctaLabel="Try it"
    android:text="New: AI-assisted vulnerability triage is live for all teams." />`,
};

const WARNING_SNIPPETS: Record<Platform, string> = {
  react: `<Banner
  tone="warning"
  message="Your trial expires in 3 days."
  cta={{ label: "Upgrade now" }}
/>`,
  swift: `Banner(tone: .warning, message: "Your trial expires in 3 days.") {
    Button("Upgrade now") { /* action */ }
}`,
  xml: `<com.s4e.ui.Banner
    app:tone="warning"
    app:ctaLabel="Upgrade now"
    android:text="Your trial expires in 3 days." />`,
};

const NO_DISMISS_SNIPPETS: Record<Platform, string> = {
  react: `<Banner
  tone="warning"
  dismissible={false}
  message="Read-only mode — billing issue requires attention."
  cta={{ label: "Resolve" }}
/>`,
  swift: `Banner(tone: .warning, dismissible: false, message: "Read-only mode — billing issue requires attention.") {
    Button("Resolve") { /* action */ }
}`,
  xml: `<com.s4e.ui.Banner
    app:tone="warning"
    app:dismissible="false"
    app:ctaLabel="Resolve"
    android:text="Read-only mode — billing issue requires attention." />`,
};

export function BannerShowcase() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Tones</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden divide-y divide-s4e-neutral-divider-10">
          <Copyable snippets={NEUTRAL_SNIPPETS} className="block">
            <Banner tone="neutral" message="Scheduled maintenance window starts at 02:00 UTC tomorrow." />
          </Copyable>
          <Copyable snippets={PROMO_SNIPPETS} className="block">
            <Banner
              tone="promo"
              message="New: AI-assisted vulnerability triage is live for all teams."
              cta={{ label: "Try it" }}
            />
          </Copyable>
          <Copyable snippets={WARNING_SNIPPETS} className="block">
            <Banner
              tone="warning"
              message="Your trial expires in 3 days."
              cta={{ label: "Upgrade now" }}
            />
          </Copyable>
        </div>
      </div>

      <div>
        <SectionTitle>Without dismiss</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
          <Copyable snippets={NO_DISMISS_SNIPPETS} className="block">
            <Banner
              tone="warning"
              dismissible={false}
              message="Read-only mode — billing issue requires attention."
              cta={{ label: "Resolve" }}
            />
          </Copyable>
        </div>
      </div>
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function BannerExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Neutral"
        density="tall"
        code={NEUTRAL_SNIPPETS.react}
        preview={
          <div className="w-full">
            <Banner tone="neutral" message="Scheduled maintenance window starts at 02:00 UTC tomorrow." />
          </div>
        }
      />
      <ExampleCard
        title="Promo · With CTA"
        density="tall"
        code={PROMO_SNIPPETS.react}
        preview={
          <div className="w-full">
            <Banner
              tone="promo"
              message="New: AI-assisted vulnerability triage is live for all teams."
              cta={{ label: "Try it" }}
            />
          </div>
        }
      />
      <ExampleCard
        title="Warning · With CTA"
        density="tall"
        code={WARNING_SNIPPETS.react}
        preview={
          <div className="w-full">
            <Banner
              tone="warning"
              message="Your trial expires in 3 days."
              cta={{ label: "Upgrade now" }}
            />
          </div>
        }
      />
      <ExampleCard
        title="Warning · Not dismissible"
        density="tall"
        code={NO_DISMISS_SNIPPETS.react}
        preview={
          <div className="w-full">
            <Banner
              tone="warning"
              dismissible={false}
              message="Read-only mode — billing issue requires attention."
              cta={{ label: "Resolve" }}
            />
          </div>
        }
      />
    </div>
  );
}

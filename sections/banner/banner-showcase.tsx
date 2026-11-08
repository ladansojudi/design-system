"use client";

import type React from "react";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";
import { Banner } from "@/components/ui/banner";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <span className="text-[15px] font-semibold text-snt-text-primary">{children}</span>
    </div>
  );
}

const NEUTRAL_SNIPPETS: Record<Platform, string> = {
  react: `<Banner tone="neutral" message="Scheduled maintenance window starts at 02:00 UTC tomorrow." />`,
  swift: `Banner(tone: .neutral, message: "Scheduled maintenance window starts at 02:00 UTC tomorrow.")`,
  xml: `<com.sentinel.ui.Banner
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
  xml: `<com.sentinel.ui.Banner
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
  xml: `<com.sentinel.ui.Banner
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
  xml: `<com.sentinel.ui.Banner
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
        <div className="border border-snt-neutral-divider-10 rounded-xl overflow-hidden divide-y divide-snt-neutral-divider-10">
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
        <div className="border border-snt-neutral-divider-10 rounded-xl overflow-hidden">
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

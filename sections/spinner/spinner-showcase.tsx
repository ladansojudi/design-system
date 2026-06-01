"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Copyable } from "@/components/styleguide/copyable";
import { type Platform } from "@/components/styleguide/platform-provider";

// ── Spinner primitive ─────────────────────────────────────────────────────

type Size = "xs" | "sm" | "md" | "lg";
type Tone = "primary" | "neutral" | "white";

const SIZE: Record<Size, string> = {
  xs: "w-3 h-3 border-2",
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-[2.5px]",
  lg: "w-9 h-9 border-[3px]",
};

const TONE: Record<Tone, string> = {
  primary: "border-s4e-brand-primary-500/25 border-t-s4e-brand-primary-500",
  neutral: "border-s4e-text-disabled/25 border-t-s4e-text-secondary",
  white:   "border-s4e-text-white/30 border-t-s4e-text-white",
};

// ── Snippet builders ───────────────────────────────────────────────────────

function spinnerSnippets(opts: { size?: Size; tone?: Tone } = {}): Record<Platform, string> {
  const { size, tone } = opts;
  const reactProps: string[] = [];
  if (size) reactProps.push(`size="${size}"`);
  if (tone) reactProps.push(`tone="${tone}"`);

  const swiftArgs: string[] = [];
  if (size) swiftArgs.push(`size: .${size}`);
  if (tone) swiftArgs.push(`tone: .${tone}`);

  const xmlProps: string[] = [];
  if (size) xmlProps.push(`app:size="${size}"`);
  if (tone) xmlProps.push(`app:tone="${tone}"`);

  const reactTag = reactProps.length ? `<Spinner ${reactProps.join(" ")} />` : `<Spinner />`;
  const swiftTag = swiftArgs.length ? `Spinner(${swiftArgs.join(", ")})` : `Spinner()`;
  const xmlTag = xmlProps.length
    ? `<com.s4e.ui.Spinner\n    ${xmlProps.join("\n    ")} />`
    : `<com.s4e.ui.Spinner />`;

  return { react: reactTag, swift: swiftTag, xml: xmlTag };
}

function Spinner({
  size = "md",
  tone = "primary",
  label = "Loading",
  className,
}: {
  size?:  Size;
  tone?:  Tone;
  label?: string;
  className?: string;
}) {
  return (
    <span role="status" aria-label={label} className={cn("inline-block align-middle", className)}>
      <span className={cn("block rounded-full animate-spin", SIZE[size], TONE[tone])} />
      <span className="sr-only">{label}</span>
    </span>
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

function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-8 py-4 border-b border-s4e-neutral-divider-10 last:border-b-0">
      <span className="w-16 shrink-0 text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </div>
  );
}

export function SpinnerShowcase() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Sizes</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6">
          <PropertyRow label="Size">
            {(["xs", "sm", "md", "lg"] as Size[]).map((s) => (
              <div key={s} className="flex flex-col items-center gap-1.5">
                <Copyable snippets={spinnerSnippets({ size: s })}>
                  <Spinner size={s} />
                </Copyable>
                <span className="text-[10px] uppercase tracking-widest text-s4e-text-disabled">{s}</span>
              </div>
            ))}
          </PropertyRow>
          <PropertyRow label="Tone">
            <Copyable snippets={spinnerSnippets({ tone: "primary" })}>
              <Spinner tone="primary" />
            </Copyable>
            <Copyable snippets={spinnerSnippets({ tone: "neutral" })}>
              <Spinner tone="neutral" />
            </Copyable>
            <Copyable snippets={spinnerSnippets({ tone: "white", size: "sm" })}>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-s4e-btn-primary-600">
                <Spinner tone="white" size="sm" />
              </div>
            </Copyable>
          </PropertyRow>
        </div>
      </div>

      <div>
        <SectionTitle>In context</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 space-y-4">
          {/* Inside button */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-[10px] uppercase tracking-widest text-s4e-text-disabled">Inside button</span>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-s4e-btn-primary-600 text-s4e-text-on-accent text-[13px] font-medium cursor-wait opacity-90"
            >
              <Spinner size="sm" tone="white" />
              Saving…
            </button>
          </div>

          {/* Inline */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-[10px] uppercase tracking-widest text-s4e-text-disabled">Inline text</span>
            <span className="inline-flex items-center gap-2 text-[12px] text-s4e-text-secondary">
              <Spinner size="xs" /> Scanning 1,248 endpoints…
            </span>
          </div>

          {/* Full surface */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-[10px] uppercase tracking-widest text-s4e-text-disabled">Centered</span>
            <div className="flex-1 h-24 rounded-md bg-s4e-neutral-grey-100 flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

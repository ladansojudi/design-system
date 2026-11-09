"use client";

import type React from "react";
import { Badge as UIBadge } from "@/components/ui/badge-tag";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";

// ── Types & config ─────────────────────────────────────────────────────────

type BadgeColor = "warning" | "error" | "success" | "neutral" | "info" | "primary";
type DotPosition = "left" | "right";

type BadgeConfig = { label: string };

const BADGE_COLORS: Record<BadgeColor, BadgeConfig> = {
  warning: {
    label:  "Warning",
  },
  error: {
    label:  "Error",
  },
  success: {
    label:  "Success",
  },
  neutral: {
    label:  "Neutral",
  },
  info: {
    label:  "Info",
  },
  primary: {
    label:  "Primary",
  },
};

const ALL_COLORS: BadgeColor[] = ["warning", "error", "success", "neutral", "info", "primary"];

// ── Snippet builders ───────────────────────────────────────────────────────

function badgeSnippets(
  color: BadgeColor,
  label: string,
  opts: { showDot?: boolean; dotPosition?: DotPosition; outlined?: boolean } = {},
): Record<Platform, string> {
  const { showDot = true, dotPosition = "left", outlined = false } = opts;
  const reactProps = [`tone="${color}"`];
  if (!showDot) reactProps.push(`showDot={false}`);
  if (showDot && dotPosition === "right") reactProps.push(`dotPosition="right"`);
  if (outlined) reactProps.push(`outlined`);

  const swiftArgs = [`color: .${color}`];
  if (!showDot) swiftArgs.push(`showDot: false`);
  if (showDot && dotPosition === "right") swiftArgs.push(`dotPosition: .right`);
  if (outlined) swiftArgs.push(`outlined: true`);

  const xmlProps = [`android:text="${label}"`, `app:color="${color}"`];
  if (!showDot) xmlProps.push(`app:showDot="false"`);
  if (showDot && dotPosition === "right") xmlProps.push(`app:dotPosition="right"`);
  if (outlined) xmlProps.push(`app:outlined="true"`);

  return {
    react: `<Badge ${reactProps.join(" ")}>${label}</Badge>`,
    swift: `BadgeTag("${label}", ${swiftArgs.join(", ")})`,
    xml:   `<com.sentinel.ui.BadgeTag\n    ${xmlProps.join("\n    ")} />`,
  };
}

// ── Badge component ────────────────────────────────────────────────────────

function Badge({
  color,
  showDot = true,
  dotPosition = "left",
  outlined = false,
}: {
  color: BadgeColor;
  showDot?: boolean;
  dotPosition?: DotPosition;
  outlined?: boolean;
}) {
  // The real component from components/ui — the styleguide renders exactly
  // what ships.
  return (
    <UIBadge tone={color} showDot={showDot} dotPosition={dotPosition} outlined={outlined}>
      {BADGE_COLORS[color].label}
    </UIBadge>
  );
}

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

export function BadgeTagShowcase() {
  return (
    <div className="space-y-10">

      {/* With dot */}
      <div>
        <SectionTitle>With Dot</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Dot left */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">
                Dot Left
              </p>
              <div className="space-y-2">
                {ALL_COLORS.map((c) => (
                  <div key={c}>
                    <Copyable
                      snippets={badgeSnippets(c, BADGE_COLORS[c].label, { showDot: true, dotPosition: "left" })}
                      svgPath={`/svg/badge-tag/${c}-filled-dot.svg`}
                    >
                      <Badge color={c} showDot dotPosition="left" />
                    </Copyable>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot right */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">
                Dot Right
              </p>
              <div className="space-y-2">
                {ALL_COLORS.map((c) => (
                  <div key={c}>
                    <Badge color={c} showDot dotPosition="right" outlined />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Without dot */}
      <div>
        <SectionTitle>Without Dot</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Filled */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">
                Filled
              </p>
              <div className="space-y-2">
                {ALL_COLORS.map((c) => (
                  <div key={c}>
                    <Copyable
                      snippets={badgeSnippets(c, BADGE_COLORS[c].label, { showDot: false })}
                      svgPath={`/svg/badge-tag/${c}-filled.svg`}
                    >
                      <Badge color={c} showDot={false} />
                    </Copyable>
                  </div>
                ))}
              </div>
            </div>

            {/* Outlined */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">
                Outlined
              </p>
              <div className="space-y-2">
                {ALL_COLORS.map((c) => (
                  <div key={c}>
                    <Badge color={c} showDot={false} outlined />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function BadgeTagExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Success · Dot left"
        density="tight"
        code={badgeSnippets("success", "Success").react}
        preview={<Badge color="success" />}
      />
      <ExampleCard
        title="Warning · Dot left"
        density="tight"
        code={badgeSnippets("warning", "Warning").react}
        preview={<Badge color="warning" />}
      />
      <ExampleCard
        title="Error · Dot left"
        density="tight"
        code={badgeSnippets("error", "Error").react}
        preview={<Badge color="error" />}
      />
      <ExampleCard
        title="Info · Dot right"
        density="tight"
        code={badgeSnippets("info", "Info", { showDot: true, dotPosition: "right" }).react}
        preview={<Badge color="info" showDot dotPosition="right" />}
      />
      <ExampleCard
        title="Neutral · No dot"
        density="tight"
        code={badgeSnippets("neutral", "Neutral", { showDot: false }).react}
        preview={<Badge color="neutral" showDot={false} />}
      />
      <ExampleCard
        title="Primary · Outlined"
        density="tight"
        code={badgeSnippets("primary", "Primary", { showDot: false, outlined: true }).react}
        preview={<Badge color="primary" showDot={false} outlined />}
      />
    </div>
  );
}

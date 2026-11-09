"use client";

import type React from "react";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";
import { SeverityBadge } from "@/components/ui/severity-badge";

// ── Types & config ─────────────────────────────────────────────────────────

type Severity = "low" | "critical" | "high" | "medium" | "info";

type SeverityConfig = {
  label: string;
  bg: string;
  accent: string;
  text: string;
};

const SEVERITY: Record<Severity, SeverityConfig> = {
  low: {
    label:  "Low",
    bg:     "bg-snt-scale-green-50",
    accent: "border-l-[3px] border-snt-scale-green-500",
    text:   "text-snt-scale-green-600",
  },
  critical: {
    label:  "Critical",
    bg:     "bg-snt-scale-purple-50",
    accent: "border-l-[3px] border-snt-scale-purple-500",
    text:   "text-snt-scale-purple-600",
  },
  high: {
    label:  "High",
    bg:     "bg-snt-scale-red-50",
    accent: "border-l-[3px] border-snt-scale-red-500",
    text:   "text-snt-scale-red-600",
  },
  medium: {
    label:  "Medium",
    bg:     "bg-snt-scale-yellow-50",
    accent: "border-l-[3px] border-snt-scale-yellow-500",
    text:   "text-snt-scale-yellow-700",
  },
  info: {
    label:  "Info",
    bg:     "bg-snt-scale-blue-50",
    accent: "border-l-[3px] border-snt-scale-blue-500",
    text:   "text-snt-scale-blue-600",
  },
};

const SEVERITIES: Severity[] = ["low", "critical", "high", "medium", "info"];

// ── Snippet builders ───────────────────────────────────────────────────────

function severitySnippets(severity: Severity, score?: number): Record<Platform, string> {
  const label = SEVERITY[severity].label;
  const reactProps = [`severity="${severity}"`];
  if (score !== undefined) reactProps.push(`score={${score}}`);

  const swiftArgs = [`severity: .${severity}`];
  if (score !== undefined) swiftArgs.push(`score: ${score}`);

  const xmlProps = [`app:severity="${severity}"`];
  if (score !== undefined) xmlProps.push(`app:score="${score}"`);

  return {
    react: `<SeverityBadge ${reactProps.join(" ")} />`,
    swift: `SeverityBadge(${swiftArgs.join(", ")})`,
    xml:   `<com.sentinel.ui.SeverityBadge\n    android:contentDescription="${label}"\n    ${xmlProps.join("\n    ")} />`,
  };
}

// ── Badge component ────────────────────────────────────────────────────────

// ── Showcase ───────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

export function SeverityBadgeShowcase() {
  return (
    <div className="space-y-10">
      {/* Variants */}
      <div>
        <SectionTitle>Variants</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Label only */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">
                Label
              </p>
              <div className="space-y-2">
                {SEVERITIES.map((s) => (
                  <Copyable key={s} snippets={severitySnippets(s)}>
                    <SeverityBadge severity={s} />
                  </Copyable>
                ))}
              </div>
            </div>

            {/* Label + score */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled mb-3">
                Label + Score
              </p>
              <div className="space-y-2">
                {SEVERITIES.map((s) => (
                  <Copyable key={s} snippets={severitySnippets(s, 8.4)}>
                    <SeverityBadge severity={s} score={8.4} />
                  </Copyable>
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

export function SeverityBadgeExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Critical · With score"
        density="tight"
        code={severitySnippets("critical", 9.8).react}
        preview={<SeverityBadge severity="critical" score={9.8} />}
      />
      <ExampleCard
        title="High · With score"
        density="tight"
        code={severitySnippets("high", 8.4).react}
        preview={<SeverityBadge severity="high" score={8.4} />}
      />
      <ExampleCard
        title="Medium · With score"
        density="tight"
        code={severitySnippets("medium", 5.5).react}
        preview={<SeverityBadge severity="medium" score={5.5} />}
      />
      <ExampleCard
        title="Low · Label only"
        density="tight"
        code={severitySnippets("low").react}
        preview={<SeverityBadge severity="low" />}
      />
      <ExampleCard
        title="Info · Label only"
        density="tight"
        code={severitySnippets("info").react}
        preview={<SeverityBadge severity="info" />}
      />
    </div>
  );
}

"use client";

import React from "react";
import { ExampleCard } from "@/components/styleguide/example-card";
import { Gauge } from "@/components/ui/gauge";

// ── Types ──────────────────────────────────────────────────────────────────

type GaugeColor = "blue" | "green" | "yellow" | "red" | "purple";

// ── Token maps (Tailwind stroke / fill classes for Sentinel tokens) ─────────────

// ── Geometry helpers ───────────────────────────────────────────────────────

// ── Gauge ──────────────────────────────────────────────────────────────────

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

const colors: GaugeColor[] = ["blue", "green", "yellow", "red", "purple"];

export function GaugeShowcase() {
  return (
    <div className="space-y-10">
      {/* Default — 5 severity colors × 2 values */}
      <div>
        <SectionTitle>Default</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 justify-items-center">
            {colors.map((c) => (
              <React.Fragment key={c}>
                <Gauge color={c} value={27} />
                <Gauge color={c} value={70} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function GaugeExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Blue"
        density="tall"
        code={`<Gauge value={42} color="blue" />`}
        preview={<Gauge color="blue" value={42} />}
      />
      <ExampleCard
        title="Green"
        density="tall"
        code={`<Gauge value={78} color="green" />`}
        preview={<Gauge color="green" value={78} />}
      />
      <ExampleCard
        title="Yellow"
        density="tall"
        code={`<Gauge value={55} color="yellow" />`}
        preview={<Gauge color="yellow" value={55} />}
      />
      <ExampleCard
        title="Red"
        density="tall"
        code={`<Gauge value={88} color="red" />`}
        preview={<Gauge color="red" value={88} />}
      />
      <ExampleCard
        title="Purple"
        density="tall"
        code={`<Gauge value={33} color="purple" />`}
        preview={<Gauge color="purple" value={33} />}
      />
    </div>
  );
}

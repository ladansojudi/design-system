"use client";

import type React from "react";
import { ArrowRight, CircleCheck, FlaskConical, Microscope, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Status data ───────────────────────────────────────────────────────────

type StatusKey = "alpha" | "beta" | "stable" | "deprecated";

type StatusInfo = {
  key:          StatusKey;
  label:        string;
  badge:        string;     // tailwind classes for the badge
  icon:         React.ComponentType<{ size?: number; className?: string }>;
  summary:      string;
  use:          string;
  avoid:        string;
  stability:    string;
  promotedTo?:  StatusKey;
};

const STATUSES: StatusInfo[] = [
  {
    key:     "alpha",
    label:   "Alpha",
    badge:   "bg-s4e-scale-yellow-500/15 text-s4e-scale-yellow-700",
    icon:    FlaskConical,
    summary: "Early development. Exploratory — expect breaking changes from one release to the next.",
    use:     "Internal demos, proof-of-concept work, design exploration.",
    avoid:   "Production code, customer-facing features, anywhere stability matters.",
    stability: "No API or visual stability. Anything can change without notice — including the component being removed.",
    promotedTo: "beta",
  },
  {
    key:     "beta",
    label:   "Beta",
    badge:   "bg-s4e-brand-primary-500/15 text-s4e-brand-primary-500",
    icon:    Microscope,
    summary: "API is mostly settled but still under field validation. Suitable for early adopters who can tolerate small breaks.",
    use:     "Production features where the upside outweighs the risk of a future migration.",
    avoid:   "Critical paths (auth, payments) where churn cost is high.",
    stability: "API changes possible but minor, communicated in release notes. No silent visual changes.",
    promotedTo: "stable",
  },
  {
    key:     "stable",
    label:   "Stable",
    badge:   "bg-s4e-scale-green-500/15 text-s4e-scale-green-600",
    icon:    CircleCheck,
    summary: "Production-ready. The contract is fixed; breaking changes require a major version bump and a documented migration path.",
    use:     "Anywhere. Default choice for new features.",
    avoid:   "Nothing to avoid — these are the load-bearing primitives.",
    stability: "API frozen within the major version. Visual tweaks allowed only if they don't change tokens or behavior.",
  },
  {
    key:     "deprecated",
    label:   "Deprecated",
    badge:   "bg-s4e-scale-red-500/15 text-s4e-scale-red-600",
    icon:    Archive,
    summary: "Superseded by another component. Will be removed in the next major release.",
    use:     "Only for unavoidable legacy code paths during migration.",
    avoid:   "New code. Reach for the replacement noted on the component page.",
    stability: "Frozen — no new features, no bug fixes beyond critical security issues.",
  },
];

// ── Lifecycle progression ─────────────────────────────────────────────────

function Lifecycle() {
  const ORDER: StatusKey[] = ["alpha", "beta", "stable", "deprecated"];
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {ORDER.map((k, i) => {
          const s = STATUSES.find((x) => x.key === k)!;
          return (
            <span key={k} className="inline-flex items-center gap-2">
              <span className={cn("inline-block px-2 py-0.5 rounded-[2px] text-[10px] font-semibold uppercase tracking-widest", s.badge)}>
                {s.label}
              </span>
              {i < ORDER.length - 1 && <ArrowRight size={14} className="text-s4e-text-disabled" />}
            </span>
          );
        })}
      </div>
      <p className="text-center mt-3 text-[11px] text-s4e-text-disabled">
        One-way progression. Components don&apos;t move backwards — a deprecated component is replaced, not revived.
      </p>
    </div>
  );
}

// ── Status card ───────────────────────────────────────────────────────────

function StatusCard({ info }: { info: StatusInfo }) {
  const Icon = info.icon;
  return (
    <article className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
      <header className="flex items-center gap-3 px-5 py-3 border-b border-s4e-neutral-divider-10 bg-s4e-neutral-grey-100">
        <Icon size={16} className="text-s4e-text-secondary shrink-0" />
        <span className={cn("inline-block px-1.5 py-0.5 rounded-[2px] text-[10px] font-semibold uppercase tracking-widest", info.badge)}>
          {info.label}
        </span>
        <p className="text-[12px] text-s4e-text-secondary flex-1 leading-snug">
          {info.summary}
        </p>
      </header>
      <dl className="divide-y divide-s4e-neutral-divider-10">
        <div className="grid grid-cols-[120px_1fr] gap-4 px-5 py-3">
          <dt className="text-[10px] uppercase tracking-widest text-s4e-text-disabled">Use for</dt>
          <dd className="text-[12px] text-s4e-text-primary">{info.use}</dd>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-4 px-5 py-3">
          <dt className="text-[10px] uppercase tracking-widest text-s4e-text-disabled">Avoid</dt>
          <dd className="text-[12px] text-s4e-text-primary">{info.avoid}</dd>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-4 px-5 py-3">
          <dt className="text-[10px] uppercase tracking-widest text-s4e-text-disabled">Stability</dt>
          <dd className="text-[12px] text-s4e-text-secondary leading-relaxed">{info.stability}</dd>
        </div>
        {info.promotedTo && (
          <div className="grid grid-cols-[120px_1fr] gap-4 px-5 py-3">
            <dt className="text-[10px] uppercase tracking-widest text-s4e-text-disabled">Promoted to</dt>
            <dd className="text-[12px] text-s4e-text-secondary">
              <span className="font-semibold text-s4e-text-primary capitalize">{info.promotedTo}</span>{" "}
              when usage in production reaches at least 3 teams with no API changes in 60 days.
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}

// ── Promotion criteria ────────────────────────────────────────────────────

function PromotionCriteria() {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-s4e-surface-table-header">
          <tr className="text-left">
            <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-44">From → To</th>
            <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">Required criteria</th>
          </tr>
        </thead>
        <tbody className="text-[12px] text-s4e-text-secondary">
          <tr className="border-t border-s4e-neutral-divider-10">
            <td className="py-3 px-4 font-mono text-[11px] text-s4e-brand-primary-500">alpha → beta</td>
            <td className="py-3 px-4">
              Full Anatomy / Use Cases / Guidelines page. Dark + light themes tested. Used by at least one product team.
            </td>
          </tr>
          <tr className="border-t border-s4e-neutral-divider-10">
            <td className="py-3 px-4 font-mono text-[11px] text-s4e-brand-primary-500">beta → stable</td>
            <td className="py-3 px-4">
              Used by 3+ teams in production for 60+ days with no breaking API change. WCAG AA verified. Figma asset published.
            </td>
          </tr>
          <tr className="border-t border-s4e-neutral-divider-10">
            <td className="py-3 px-4 font-mono text-[11px] text-s4e-brand-primary-500">stable → deprecated</td>
            <td className="py-3 px-4">
              A replacement component exists, ships with migration notes, and has a removal target version on the page.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

export function ComponentStatusShowcase() {
  return (
    <div className="space-y-12">
      <div>
        <SectionTitle>Lifecycle</SectionTitle>
        <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
          Every component carries a status badge that signals how confidently you can depend on it.
          The four statuses follow a one-way progression — components move forward, never backward.
        </p>
        <Lifecycle />
      </div>

      <div>
        <SectionTitle>The four statuses</SectionTitle>
        <div className="space-y-4">
          {STATUSES.map((s) => (
            <StatusCard key={s.key} info={s} />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Promotion criteria</SectionTitle>
        <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
          Status is a contract. Promotions follow checkable rules — not vibes — so the badge is trustworthy.
        </p>
        <PromotionCriteria />
      </div>
    </div>
  );
}

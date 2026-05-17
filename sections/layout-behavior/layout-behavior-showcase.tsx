"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ── Section title ─────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

// ── Breakpoints ───────────────────────────────────────────────────────────

const BREAKPOINTS = [
  { token: "sm",  min: "640px",   description: "Small phones landscape, narrow content drawers" },
  { token: "md",  min: "768px",   description: "Tablets portrait, primary breakpoint for sidebar collapse" },
  { token: "lg",  min: "1024px",  description: "Laptops, default desktop layout" },
  { token: "xl",  min: "1280px",  description: "Wide laptops, multi-column dashboards" },
  { token: "2xl", min: "1536px",  description: "Large monitors, max content width" },
];

function BreakpointsTable() {
  return (
    <div>
      <SectionTitle>Breakpoints</SectionTitle>
      <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
        Mobile-first. Default styles target the smallest viewport; use Tailwind prefixes to
        progressively enhance upward. Never write{" "}
        <code className="font-mono text-s4e-text-primary">max-w</code> queries — always go from
        narrow to wide.
      </p>
      <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-s4e-surface-table-header">
            <tr className="text-left">
              <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-24">Token</th>
              <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-28">Min width</th>
              <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">Use case</th>
            </tr>
          </thead>
          <tbody>
            {BREAKPOINTS.map((bp) => (
              <tr key={bp.token} className="border-t border-s4e-neutral-divider-10">
                <td className="py-2.5 px-4 font-mono text-[12px] text-s4e-brand-primary-500">{bp.token}:</td>
                <td className="py-2.5 px-4 font-mono text-[12px] text-s4e-text-primary">{bp.min}</td>
                <td className="py-2.5 px-4 text-[12px] text-s4e-text-secondary">{bp.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Z-index scale ─────────────────────────────────────────────────────────

const Z_LAYERS = [
  { token: "z-base",     css: "--s4e-z-base",     value: "0",   description: "Page content, default flow"             },
  { token: "z-sticky",   css: "--s4e-z-sticky",   value: "10",  description: "Sticky top bars, table headers"          },
  { token: "z-dropdown", css: "--s4e-z-dropdown", value: "20",  description: "Dropdowns, popovers, tooltips"           },
  { token: "z-overlay",  css: "--s4e-z-overlay",  value: "30",  description: "Sidebar overlays (mobile), drawer scrim" },
  { token: "z-sidebar",  css: "--s4e-z-sidebar",  value: "40",  description: "Slide-in sidebar / drawer panel"         },
  { token: "z-modal",    css: "--s4e-z-modal",    value: "50",  description: "Modal dialogs, confirmation prompts"     },
  { token: "z-toast",    css: "--s4e-z-toast",    value: "60",  description: "Toasts (highest — they must reach user)" },
];

function ZIndexTable() {
  return (
    <div>
      <SectionTitle>Z-index Scale</SectionTitle>
      <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
        Seven layers, monotonically increasing. Each maps to a real utility class
        (defined in <code className="font-mono text-s4e-text-primary">globals.css</code>) and
        a <code className="font-mono text-s4e-text-primary">--s4e-z-*</code> CSS variable.
        Never invent ad-hoc values like <code className="font-mono text-s4e-text-primary">z-[99]</code>.
      </p>
      <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-s4e-surface-table-header">
            <tr className="text-left">
              <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-32">Utility</th>
              <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-44">CSS variable</th>
              <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-16">Value</th>
              <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">Use case</th>
            </tr>
          </thead>
          <tbody>
            {Z_LAYERS.map((z) => (
              <tr key={z.token} className="border-t border-s4e-neutral-divider-10">
                <td className="py-2.5 px-4 font-mono text-[12px] text-s4e-brand-primary-500">{z.token}</td>
                <td className="py-2.5 px-4 font-mono text-[11px] text-s4e-text-secondary">{z.css}</td>
                <td className="py-2.5 px-4 font-mono text-[12px] text-s4e-text-primary">{z.value}</td>
                <td className="py-2.5 px-4 text-[12px] text-s4e-text-secondary">{z.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Motion ────────────────────────────────────────────────────────────────

const DURATIONS = [
  { token: "duration-instant",  css: "--s4e-motion-duration-instant",  ms: "75ms",  description: "Micro — color/opacity flips on focus, hover" },
  { token: "duration-snap",     css: "--s4e-motion-duration-snap",     ms: "100ms", description: "Snap — icon swaps, checkbox tick"            },
  { token: "duration-default",  css: "--s4e-motion-duration-default",  ms: "150ms", description: "Default — most interactive UI transitions"   },
  { token: "duration-emphasis", css: "--s4e-motion-duration-emphasis", ms: "200ms", description: "Emphasis — switches, accordions, drawers"    },
  { token: "duration-spatial",  css: "--s4e-motion-duration-spatial",  ms: "300ms", description: "Spatial — modal in/out, page-level reveals"  },
];

const EASINGS = [
  { token: "ease-linear",  css: "--s4e-motion-ease-linear",  curve: "linear",                       description: "Progress bars only. Never for entrances" },
  { token: "ease-in",      css: "--s4e-motion-ease-in",      curve: "cubic-bezier(0.4, 0, 1, 1)",   description: "Exit animations — fades out, slide out"  },
  { token: "ease-out",     css: "--s4e-motion-ease-out",     curve: "cubic-bezier(0, 0, 0.2, 1)",   description: "Default for entrances — feels natural"   },
  { token: "ease-in-out",  css: "--s4e-motion-ease-in-out",  curve: "cubic-bezier(0.4, 0, 0.2, 1)", description: "Two-way movement (open/close toggles)"   },
];

function MotionDemo() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5">
      <p className="text-[11px] text-s4e-text-disabled mb-3 uppercase tracking-widest">
        Live preview · click a row to play
      </p>
      <div className="space-y-2">
        {DURATIONS.map((d) => (
          <button
            key={d.token}
            type="button"
            onClick={() => {
              setActive(null);
              requestAnimationFrame(() => setActive(d.token));
            }}
            className="flex items-center gap-4 w-full text-left rounded-md px-2 py-2 hover:bg-s4e-neutral-grey-100 cursor-pointer transition-colors"
          >
            <span className="w-28 shrink-0 font-mono text-[11px] text-s4e-brand-primary-500">
              {d.token}
            </span>
            <span className="w-14 shrink-0 font-mono text-[11px] text-s4e-text-primary">
              {d.ms}
            </span>
            <div className="relative flex-1 h-2 rounded-full bg-s4e-neutral-grey-200 overflow-hidden">
              <div
                key={active === d.token ? "on" : "off"}
                className={cn(
                  "absolute inset-y-0 left-0 bg-s4e-brand-primary-500 ease-out",
                  active === d.token ? "w-full" : "w-0",
                )}
                style={{ transitionProperty: "width", transitionDuration: d.ms }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MotionSection() {
  return (
    <div>
      <SectionTitle>Motion</SectionTitle>
      <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
        Motion is communication, not decoration. Default to{" "}
        <code className="font-mono text-s4e-text-primary">duration-default</code> with{" "}
        <code className="font-mono text-s4e-text-primary">ease-out</code>. Durations are real
        utility classes backed by <code className="font-mono text-s4e-text-primary">--s4e-motion-duration-*</code>{" "}
        variables. Easings use Tailwind&apos;s built-ins, also mirrored as{" "}
        <code className="font-mono text-s4e-text-primary">--s4e-motion-ease-*</code> for non-Tailwind contexts.
      </p>

      <div className="space-y-5">
        <MotionDemo />

        <div>
          <div className="text-[10px] uppercase tracking-widest text-s4e-text-disabled mb-2">
            Durations
          </div>
          <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-s4e-surface-table-header">
                <tr className="text-left">
                  <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-44">Utility</th>
                  <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-56">CSS variable</th>
                  <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-16">ms</th>
                  <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">Use case</th>
                </tr>
              </thead>
              <tbody>
                {DURATIONS.map((d) => (
                  <tr key={d.token} className="border-t border-s4e-neutral-divider-10">
                    <td className="py-2.5 px-4 font-mono text-[12px] text-s4e-brand-primary-500">{d.token}</td>
                    <td className="py-2.5 px-4 font-mono text-[11px] text-s4e-text-secondary">{d.css}</td>
                    <td className="py-2.5 px-4 font-mono text-[12px] text-s4e-text-primary">{d.ms}</td>
                    <td className="py-2.5 px-4 text-[12px] text-s4e-text-secondary">{d.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-widest text-s4e-text-disabled mb-2">
            Easing curves
          </div>
          <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-s4e-surface-table-header">
                <tr className="text-left">
                  <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-32">Utility</th>
                  <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-44">CSS variable</th>
                  <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-56">Curve</th>
                  <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">Use case</th>
                </tr>
              </thead>
              <tbody>
                {EASINGS.map((e) => (
                  <tr key={e.token} className="border-t border-s4e-neutral-divider-10">
                    <td className="py-2.5 px-4 font-mono text-[12px] text-s4e-brand-primary-500">{e.token}</td>
                    <td className="py-2.5 px-4 font-mono text-[11px] text-s4e-text-secondary">{e.css}</td>
                    <td className="py-2.5 px-4 font-mono text-[11px] text-s4e-text-secondary">{e.curve}</td>
                    <td className="py-2.5 px-4 text-[12px] text-s4e-text-secondary">{e.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Border radius ─────────────────────────────────────────────────────────

const RADII = [
  { token: "rounded-sm",   px: "3.6px",  use: "Inline tags, status pills"     },
  { token: "rounded-md",   px: "4.8px",  use: "Compact controls, small chips" },
  { token: "rounded-lg",   px: "6px",    use: "Default — inputs, buttons, cards" },
  { token: "rounded-xl",   px: "8.4px",  use: "Section containers, popovers"  },
  { token: "rounded-2xl",  px: "10.8px", use: "Modals, drawers"               },
  { token: "rounded-full", px: "9999px", use: "Avatars, pill badges, toggle thumbs" },
];

function RadiusSection() {
  return (
    <div>
      <SectionTitle>Border Radius</SectionTitle>
      <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
        Six steps derived from a single{" "}
        <code className="font-mono text-s4e-text-primary">--radius: 0.375rem</code> base
        (defined in <code className="font-mono text-s4e-text-primary">globals.css</code>) with
        fixed multipliers. Larger surfaces use larger radii — a modal inside a button looks broken.
      </p>
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {RADII.map((r) => (
            <div key={r.token} className="flex flex-col items-center gap-2">
              <div
                className={cn("w-16 h-16 bg-s4e-brand-primary-500", r.token)}
              />
              <div className="text-center">
                <div className="font-mono text-[11px] text-s4e-text-primary">{r.token}</div>
                <div className="font-mono text-[10px] text-s4e-text-disabled">{r.px}</div>
                <div className="text-[10px] text-s4e-text-secondary mt-1">{r.use}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────

export function LayoutBehaviorShowcase() {
  return (
    <div className="space-y-12">
      <BreakpointsTable />
      <ZIndexTable />
      <MotionSection />
      <RadiusSection />
    </div>
  );
}

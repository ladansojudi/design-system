"use client";

import type React from "react";
import { useState } from "react";
import { Sliders } from "lucide-react";
import { cn } from "@/lib/utils";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

// ── Shared primitives ──────────────────────────────────────────────────────

function ChartCard({
  title,
  description,
  viewAll,
  trailing,
  children,
}: {
  title:        string;
  description?: string;
  viewAll?:     boolean;
  trailing?:    React.ReactNode;
  children:     React.ReactNode;
}) {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl bg-s4e-surface-app">
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3 bg-s4e-neutral-grey-100 border-b border-s4e-neutral-divider-10 rounded-t-xl">
        <span className="text-[14px] font-semibold text-s4e-text-primary shrink-0">{title}</span>
        {description && (
          <span className="hidden sm:inline text-[12px] text-s4e-text-disabled truncate flex-1 min-w-0">{description}</span>
        )}
        {trailing}
        {viewAll && (
          <button type="button" className="ml-auto text-[12px] font-medium text-s4e-brand-primary-500 hover:text-s4e-brand-primary-600 transition-colors shrink-0 underline underline-offset-2">
            View all
          </button>
        )}
      </div>
      <div className="px-4 sm:px-5 py-5">{children}</div>
    </div>
  );
}

function StatBlock({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex-1 min-w-0 rounded-lg bg-s4e-neutral-grey-100 px-4 py-3">
      <div className="text-[12px] text-s4e-text-disabled mb-1 truncate">{label}</div>
      <div className={cn("text-[16px] font-bold tabular-nums truncate", accent ?? "text-s4e-text-primary")}>
        {value}
      </div>
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

// ── Donut ──────────────────────────────────────────────────────────────────

type DonutSegment = { label: string; value: number; color: string };

const DONUT_DATA: DonutSegment[] = [
  { label: "Category A", value: 420, color: "var(--s4e-data-1)" },
  { label: "Category B", value: 120, color: "var(--s4e-data-5)" },
  { label: "Category C", value: 60,  color: "var(--s4e-data-2)" },
  { label: "Category D", value: 30,  color: "var(--s4e-data-3)" },
];

function Donut({ size = 180 }: { size?: number }) {
  const total = DONUT_DATA.reduce((s, d) => s + d.value, 0);
  const RADIUS = 70;
  const STROKE = 28;
  // pathLength normalises the stroke to 100 units, killing float drift between segments
  const PATH_LEN = 100;

  let offset = 0;
  const segments = DONUT_DATA.map((d) => {
    const dash = (d.value / total) * PATH_LEN;
    const seg  = { ...d, dash, offset };
    offset += dash;
    return seg;
  });

  return (
    <svg width={size} height={size} viewBox="-90 -90 180 180" className="shrink-0">
      <circle r={RADIUS} fill="none" stroke="var(--s4e-neutral-grey-100)" strokeWidth={STROKE} />
      {segments.map((s) => (
        <circle
          key={s.label}
          r={RADIUS}
          fill="none"
          stroke={s.color}
          strokeWidth={STROKE}
          pathLength={PATH_LEN}
          strokeDasharray={`${s.dash} ${PATH_LEN - s.dash}`}
          strokeDashoffset={-s.offset}
          transform="rotate(-90)"
        />
      ))}
      <text x="0" y="6" textAnchor="middle" className="fill-s4e-text-primary" fontSize="22" fontWeight="600">
        {total.toLocaleString()}
      </text>
    </svg>
  );
}

function DonutLegend({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <div className={cn(
      "divide-y divide-s4e-neutral-divider-10",
      fullWidth ? "w-full" : "flex-1 min-w-0 sm:min-w-[200px]",
    )}>
      {DONUT_DATA.map((d) => (
        <div key={d.label} className="flex items-center gap-3 py-2.5">
          <span className="w-[10px] h-[10px] rounded-full shrink-0" style={{ backgroundColor: d.color }} />
          <span className="text-[13px] text-s4e-text-primary flex-1">{d.label}</span>
          <span className="text-[13px] font-semibold text-s4e-text-primary tabular-nums">
            {d.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function DonutSection() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Horizontal · Legend on the side</SectionTitle>
        <ChartCard title="Items by Category">
          <div className="flex items-center gap-8 flex-wrap">
            <Donut />
            <DonutLegend />
          </div>
        </ChartCard>
      </div>

      <div>
        <SectionTitle>Vertical · Donut on top, list below</SectionTitle>
        <ChartCard title="Items by Category">
          <div className="flex flex-col items-center gap-6">
            <Donut />
            <DonutLegend fullWidth />
          </div>
        </ChartCard>
      </div>

      <Anatomy
        parts={[
          { label: "Donut ring",    description: "Arcs drawn on a shared radius; each segment's arc length is proportional to its value." },
          { label: "Center label",  description: "Total count rendered in the hole — the “so what” of the chart." },
          { label: "Legend",        description: "List of segments with color dot + label + value. Side for horizontal, below for vertical." },
          { label: "Container",     description: "Card with grey header — title, optional description, optional View all." },
        ]}
      >
        <div className="flex items-center gap-5">
          <Donut size={90} />
        </div>
      </Anatomy>

      <UseCases
        items={[
          "Use Horizontal when space is wide — legend sits beside the donut for quick scanning.",
          "Use Vertical in narrow columns or mobile — legend wraps below the donut.",
          "Use when you want users to see both the total and the parts at the same time.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Keep segments to 6 or fewer. Collapse the rest into an “Other” bucket." },
          { type: "dont", text: "Don't use a donut for more than ~20 categories; switch to a Bar chart." },
          { type: "do",   text: "Use the lightest color for the largest segment so the chart reads calm, not loud." },
          { type: "dont", text: "Don't rely on color alone — always pair the donut with a labeled legend." },
        ]}
      />
    </div>
  );
}

// ── Treemap ────────────────────────────────────────────────────────────────

function TreemapSection() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Default</SectionTitle>
        <ChartCard
          title="Group Distribution"
          description="Overview of the top four groups by size"
          trailing={
            <button type="button" className="ml-auto shrink-0 w-7 h-7 rounded-md hover:bg-s4e-neutral-divider-10 flex items-center justify-center text-s4e-text-disabled hover:text-s4e-text-primary transition-colors">
              <Sliders size={14} />
            </button>
          }
        >
          <div className="space-y-4">
            <div className="flex gap-3">
              <StatBlock label="Total Items"     value="240" />
              <StatBlock label="Top Group"       value="Group A" />
            </div>

            <div className="flex gap-1 h-64">
              <div className="flex-1 rounded-md bg-s4e-data-5 flex items-center justify-center text-s4e-text-on-accent text-[13px] font-semibold">
                Group A · 92
              </div>
              <div className="flex-1 rounded-md bg-s4e-data-7 flex items-center justify-center text-s4e-text-on-accent text-[13px] font-semibold">
                Group B · 78
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex-1 rounded-md bg-s4e-data-1 flex items-center justify-center text-s4e-text-primary text-[13px] font-semibold">
                  Group C · 42
                </div>
                <div className="flex-1 rounded-md bg-s4e-data-3 flex items-center justify-center text-s4e-text-primary text-[13px] font-semibold">
                  Group D · 28
                </div>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      <Anatomy
        parts={[
          { label: "Blocks",       description: "Rectangles whose area encodes the magnitude of the group." },
          { label: "Labels",       description: "Group name + numeric value, centered inside each block." },
          { label: "Color scale",  description: "Single hue ramp — darker for larger blocks, lighter for smaller ones." },
          { label: "Stat blocks",  description: "Summary cards above the chart — total count + top group." },
        ]}
      >
        <div className="flex gap-1 w-64 h-24">
          <div className="flex-1 rounded-md bg-s4e-data-5 flex items-center justify-center text-s4e-text-on-accent text-[11px] font-semibold">A · 92</div>
          <div className="flex-1 rounded-md bg-s4e-data-1 flex items-center justify-center text-s4e-text-primary text-[11px] font-semibold">B · 42</div>
          <div className="flex-1 rounded-md bg-s4e-data-3 flex items-center justify-center text-s4e-text-primary text-[11px] font-semibold">C · 28</div>
        </div>
      </Anatomy>

      <UseCases
        items={[
          "Use when the user needs to compare part-to-whole relationships at a glance.",
          "Good for surfacing dominance — one block visibly larger signals concentration risk.",
          "Pair with stat blocks so the “leader” is explicitly named, not only visible.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Limit to 4–6 visible blocks; group the rest into a trailing “Other”." },
          { type: "dont", text: "Don't use a treemap to track trends over time — use a Line chart instead." },
          { type: "do",   text: "Keep to one color family; ramp brightness with block size." },
          { type: "dont", text: "Don't print long labels inside small blocks; truncate or move to tooltip." },
        ]}
      />
    </div>
  );
}

// ── Bar ────────────────────────────────────────────────────────────────────

const BAR_DATA = [
  { label: "Item A", value: 48 },
  { label: "Item B", value: 42 },
  { label: "Item C", value: 27 },
  { label: "Item D", value: 18 },
  { label: "Item E", value: 9  },
];

function BarChart() {
  const MAX = 50;
  const TICKS = [0, 10, 20, 30, 40, 50];

  return (
    <ChartCard title="Top Items" description="Frequency of the top five items" viewAll>
      <div className="space-y-4">
        <div className="flex gap-3">
          <StatBlock label="Total Items"    value="5" />
          <StatBlock label="Leading Item"   value="Item A" />
        </div>

        <div className="flex gap-3">
          {/* Y axis labels */}
          <div className="flex flex-col-reverse justify-between h-60 text-right pr-1 w-8">
            {TICKS.map((t) => (
              <span key={t} className="text-[10px] text-s4e-text-disabled tabular-nums">{t}</span>
            ))}
          </div>

          {/* Chart area */}
          <div className="flex-1 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col-reverse justify-between pointer-events-none">
              {TICKS.map((t) => (
                <div key={t} className="border-t border-s4e-neutral-divider-10/70" />
              ))}
            </div>
            {/* Bars + values */}
            <div className="relative h-60 flex items-end gap-2 sm:gap-6">
              {BAR_DATA.map((b, i) => (
                <div key={b.label} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
                  <span className="text-[11px] font-semibold text-s4e-text-primary tabular-nums">{b.value}</span>
                  <div
                    className={cn(
                      "w-full max-w-[54px] rounded-t-md transition-all",
                      i === 0
                        ? "bg-s4e-brand-primary-600"
                        : "bg-s4e-brand-primary-500",
                    )}
                    style={{ height: `${(b.value / MAX) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* X axis labels */}
        <div className="flex gap-2 sm:gap-6 pl-11">
          {BAR_DATA.map((b) => (
            <div key={b.label} className="flex-1 text-center text-[11px] text-s4e-text-secondary">
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

function BarSection() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Vertical Bars</SectionTitle>
        <BarChart />
      </div>

      <Anatomy
        parts={[
          { label: "Y axis",       description: "Tick values from 0 to max with evenly spaced horizontal grid lines." },
          { label: "Bar",          description: "Gradient-filled rounded column; width scales with the container." },
          { label: "Value label",  description: "11px number printed directly above each bar for exact reading." },
          { label: "X axis label", description: "Category name centered under each bar." },
          { label: "Stat blocks",  description: "Summary cards (Total, Leader) that sit above the chart." },
        ]}
      >
        <div className="flex items-end gap-2 h-20">
          <div className="w-6 h-full rounded-t-md bg-gradient-to-t from-s4e-brand-primary-600 to-s4e-brand-primary-500" />
          <div className="w-6 h-[80%] rounded-t-md bg-gradient-to-t from-s4e-brand-primary-500 to-s4e-brand-primary-400" />
          <div className="w-6 h-[55%] rounded-t-md bg-gradient-to-t from-s4e-brand-primary-500 to-s4e-brand-primary-400" />
          <div className="w-6 h-[35%] rounded-t-md bg-gradient-to-t from-s4e-brand-primary-500 to-s4e-brand-primary-400" />
        </div>
      </Anatomy>

      <UseCases
        items={[
          "Use for ranking items by a single metric (counts, durations, scores).",
          "Use when categories are unordered or short in number — typically 5–8 bars.",
          "Highlight the leading bar with a darker gradient so it reads first.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Always label values directly above bars so users don't have to estimate heights." },
          { type: "dont", text: "Don't start the Y-axis above zero; bar heights become misleading." },
          { type: "do",   text: "Use one color family; highlight a single bar to draw attention." },
          { type: "dont", text: "Don't rotate X-axis labels unless you have more than ~10 bars; shorten labels instead." },
        ]}
      />
    </div>
  );
}

// ── Line / Area ────────────────────────────────────────────────────────────

function LineChart() {
  // Smooth cubic bezier path for a gradual growth curve
  const linePath =
    "M 0 88 " +
    "C 15 87, 25 86, 35 82 " +
    "C 45 78, 50 75, 58 70 " +
    "C 66 65, 72 55, 80 40 " +
    "C 86 28, 92 22, 100 18";

  const areaPath = `${linePath} L 100 100 L 0 100 Z`;

  return (
    <ChartCard
      title="Total Items"
      description="Growth of items within the selected time range"
      viewAll
    >
      <div className="space-y-4">
        <div className="flex gap-3">
          <StatBlock label="Current Total"     value="816" />
          <StatBlock label="Last Week"         value="+1.1%" accent="text-s4e-scale-green-600" />
          <StatBlock label="Peak Day"          value="20 Feb 2026" />
        </div>

        <div className="relative">
          {/* Y axis labels */}
          <div className="absolute left-0 top-0 bottom-5 flex flex-col justify-between text-[10px] text-s4e-text-disabled">
            <span>1500</span>
            <span>1000</span>
            <span>500</span>
            <span>0</span>
          </div>

          {/* Chart */}
          <div className="ml-10">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-40">
              <defs>
                <linearGradient id="line-area-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="var(--s4e-brand-primary-500)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--s4e-brand-primary-500)" stopOpacity="0"    />
                </linearGradient>
              </defs>
              {/* Horizontal grid */}
              {[0, 33, 66, 100].map((y) => (
                <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="var(--s4e-neutral-grey-200)" strokeWidth="0.3" strokeDasharray="1 1" />
              ))}
              <path d={areaPath}  fill="url(#line-area-fill)" />
              <path d={linePath}  fill="none" stroke="var(--s4e-brand-primary-500)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* X axis labels */}
          <div className="ml-10 mt-2 flex justify-between text-[10px] text-s4e-text-disabled">
            {["Mar 25", "Jun 25", "Sep 25", "Dec 25", "Feb 26", "Apr 26"].map((d) => (
              <span key={d} className="whitespace-nowrap">{d}</span>
            ))}
          </div>
        </div>
      </div>
    </ChartCard>
  );
}

function LineSection() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Line · Area</SectionTitle>
        <LineChart />
      </div>

      <Anatomy
        parts={[
          { label: "Line",         description: "Cubic-bezier smoothed path that connects data points over time." },
          { label: "Area fill",    description: "Gradient from the accent color fading to transparent beneath the line." },
          { label: "Grid lines",   description: "Dashed horizontal lines at each Y-axis tick for value reference." },
          { label: "Axes",         description: "Y ticks on the left, X date labels on the bottom." },
          { label: "Stat blocks",  description: "Current value + week-over-week change + peak day for context." },
        ]}
      >
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="w-64 h-20">
          <defs>
            <linearGradient id="anatomy-line-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--s4e-brand-primary-500)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--s4e-brand-primary-500)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 50 C 20 48, 40 42, 60 25 C 80 12, 95 10, 100 8 L 100 60 L 0 60 Z" fill="url(#anatomy-line-area)" />
          <path d="M 0 50 C 20 48, 40 42, 60 25 C 80 12, 95 10, 100 8" fill="none" stroke="var(--s4e-brand-primary-500)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </Anatomy>

      <UseCases
        items={[
          "Use for time-series trends where the shape of change matters (growth, regressions, plateaus).",
          "Pair with stat blocks so the user sees the current value and delta without estimating.",
          "Highlight peak day or inflection points with a stat block or a subtle marker.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Use smooth bezier curves for aesthetic data; use step lines for discrete events." },
          { type: "dont", text: "Don't overload with more than one series; use Area stacks or separate charts." },
          { type: "do",   text: "Keep 4–6 X-axis labels; more than that and rotate or thin them out." },
          { type: "dont", text: "Don't cut the Y-axis; start from zero unless the data genuinely never approaches it." },
        ]}
      />
    </div>
  );
}

// ── Tabs ───────────────────────────────────────────────────────────────────

type TabKey = "donut" | "treemap" | "bar" | "line";

const TABS: { id: TabKey; label: string }[] = [
  { id: "donut",   label: "Donut"       },
  { id: "treemap", label: "Treemap"     },
  { id: "bar",     label: "Bar"         },
  { id: "line",    label: "Line · Area" },
];

// ── Showcase entry point ───────────────────────────────────────────────────

export function ChartShowcase() {
  const [active, setActive] = useState<TabKey>("donut");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex items-end border-b border-s4e-neutral-divider-10 mb-8">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "px-4 pb-2.5 pt-2 text-[13px] font-medium border-b-2 -mb-px transition-colors",
                isActive
                  ? "border-s4e-brand-primary-500 text-s4e-brand-primary-500"
                  : "border-transparent text-s4e-text-secondary hover:text-s4e-text-primary",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {active === "donut"   && <DonutSection   />}
      {active === "treemap" && <TreemapSection />}
      {active === "bar"     && <BarSection     />}
      {active === "line"    && <LineSection    />}
    </div>
  );
}

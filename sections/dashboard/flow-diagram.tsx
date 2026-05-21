"use client";

/**
 * Sankey-style flow diagram — a lightweight, token-driven approximation built
 * from SVG bezier ribbons. Not a full Sankey solver; link thicknesses are
 * authored to communicate proportion (e.g. the dominant "covered" path).
 */

type Node = {
  id:    string;
  label: string;
  value: string;
  /** vertical center, 0..1 within the column */
  y:     number;
  /** ribbon thickness in px */
  size:  number;
  tone:  "primary" | "muted" | "alert";
};

type Col = { title: string; nodes: Node[] };

const COLS: Col[] = [
  {
    title: "What we protect",
    nodes: [
      { id: "covered",   label: "Covered Assets",   value: "%95", y: 0.30, size: 70, tone: "primary" },
      { id: "uncovered", label: "Uncovered Assets", value: "%5",  y: 0.82, size: 14, tone: "muted"   },
    ],
  },
  {
    title: "What is running",
    nodes: [
      { id: "scanners",   label: "Continuous Scanners", value: "10,250 executions", y: 0.16, size: 30, tone: "primary" },
      { id: "crawlers",   label: "Active Crawlers",     value: "298",               y: 0.40, size: 22, tone: "primary" },
      { id: "enrich",     label: "Enrichments Applied", value: "298",               y: 0.62, size: 22, tone: "primary" },
      { id: "integ",      label: "Integration",         value: "298",               y: 0.80, size: 18, tone: "primary" },
      { id: "blind",      label: "Blind Spot",          value: "298",               y: 0.96, size: 12, tone: "alert"   },
    ],
  },
  {
    title: "What we do",
    nodes: [
      { id: "outputs",   label: "Outputs Analyzed",    value: "10,250", y: 0.20, size: 26, tone: "primary" },
      { id: "decisions", label: "Decisions & Actions", value: "10,250", y: 0.44, size: 26, tone: "primary" },
      { id: "support",   label: "Support",             value: "10,250", y: 0.66, size: 22, tone: "primary" },
      { id: "notif",     label: "Notifications",       value: "10,250", y: 0.86, size: 18, tone: "primary" },
    ],
  },
];

// Links: [fromCol, fromId, toCol, toId, tone]
const LINKS: [number, string, number, string, "primary" | "muted" | "alert"][] = [
  [0, "covered",   1, "scanners",  "primary"],
  [0, "covered",   1, "crawlers",  "primary"],
  [0, "covered",   1, "enrich",    "primary"],
  [0, "covered",   1, "integ",     "primary"],
  [0, "uncovered", 1, "blind",     "alert"],
  [1, "scanners",  2, "outputs",   "primary"],
  [1, "crawlers",  2, "decisions", "primary"],
  [1, "enrich",    2, "support",   "primary"],
  [1, "integ",     2, "notif",     "primary"],
  [1, "blind",     2, "decisions", "alert"],
  [2, "outputs",   3, "risk",      "primary"],
  [2, "decisions", 3, "risk",      "alert"],
  [2, "support",   3, "findings",  "muted"],
  [2, "notif",     3, "findings",  "muted"],
];

const W = 1180;
const H = 320;
const COL_X = [60, 430, 800, 1120]; // node x per column (last is the "why" outcomes)

const TONE_FILL: Record<string, string> = {
  primary: "var(--s4e-data-1)",
  muted:   "var(--s4e-neutral-grey-300)",
  alert:   "var(--s4e-scale-red-200)",
};
const NODE_FILL: Record<string, string> = {
  primary: "var(--s4e-data-5)",
  muted:   "var(--s4e-neutral-grey-400)",
  alert:   "var(--s4e-scale-red-500)",
};

function nodeY(n: Node) { return 40 + n.y * (H - 70); }

function findNode(col: number, id: string): Node | undefined {
  return COLS[col]?.nodes.find((n) => n.id === id);
}

// Outcome anchors in the last column (not real nodes, just y positions)
const OUTCOME_Y: Record<string, number> = { risk: 0.42, findings: 0.78 };

export function FlowDiagram() {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl bg-s4e-surface-app overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 bg-s4e-neutral-grey-100 border-b border-s4e-neutral-divider-10">
        <span className="text-[14px] font-semibold text-s4e-text-primary">Scans Workflow Overview</span>
        <span className="hidden sm:inline text-[12px] text-s4e-text-disabled truncate">
          Korem ipsum dolor sit amet, consectetur adipiscing elit.
        </span>
        <span className="inline-flex items-center gap-1.5 ml-auto shrink-0">
          <span className="w-[7px] h-[7px] rounded-full bg-s4e-scale-green-500 s4e-pulse-dot" />
          <span className="text-[11px] text-s4e-text-secondary">Live</span>
        </span>
      </div>

      {/* Column titles */}
      <div className="grid grid-cols-4 px-5 pt-4 text-[12px] font-medium text-s4e-text-secondary">
        <span>What we protect</span>
        <span>What is running</span>
        <span>What we do</span>
        <span className="text-right">Why it matters</span>
      </div>

      {/* Diagram */}
      <div className="px-3 pb-5 overflow-x-auto s4e-scrollbar-hide">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[820px]" style={{ height: H }}>
          {/* Ribbons */}
          {LINKS.map(([fc, fid, tc, tid], i) => {
            const from = findNode(fc, fid);
            if (!from) return null;
            const x1 = COL_X[fc] + 14;
            const y1 = nodeY(from);
            const x2 = tc === 3 ? COL_X[3] - 40 : COL_X[tc];
            const y2 = tc === 3 ? 40 + OUTCOME_Y[tid] * (H - 70) : nodeY(findNode(tc, tid)!);
            const mx = (x1 + x2) / 2;
            const t  = Math.max(6, Math.min(from.size, 30));
            return (
              <path
                key={i}
                d={`M ${x1} ${y1 - t / 2}
                    C ${mx} ${y1 - t / 2}, ${mx} ${y2 - t / 2}, ${x2} ${y2 - t / 2}
                    L ${x2} ${y2 + t / 2}
                    C ${mx} ${y2 + t / 2}, ${mx} ${y1 + t / 2}, ${x1} ${y1 + t / 2} Z`}
                fill={TONE_FILL[LINKS[i][4]]}
                opacity={0.45}
              />
            );
          })}

          {/* Nodes (first 3 columns) */}
          {COLS.map((col, ci) =>
            col.nodes.map((n) => {
              const y = nodeY(n);
              const h = Math.max(14, n.size);
              return (
                <g key={n.id}>
                  <rect x={COL_X[ci]} y={y - h / 2} width={14} height={h} rx={3} fill={NODE_FILL[n.tone]} />
                  <text x={COL_X[ci] + 22} y={y - 2} fontSize="11" fontWeight="500" fill="var(--s4e-text-primary)">
                    {n.label}
                  </text>
                  <text x={COL_X[ci] + 22} y={y + 12} fontSize="11" fontWeight="700"
                    fill={n.tone === "alert" ? "var(--s4e-scale-red-600)" : "var(--s4e-text-primary)"}>
                    {n.value}
                  </text>
                </g>
              );
            }),
          )}

          {/* Outcomes (last column) */}
          <g>
            <rect x={COL_X[3] - 26} y={40 + OUTCOME_Y.risk * (H - 70) - 22} width={14} height={44} rx={3} fill="var(--s4e-scale-red-500)" />
            <text x={COL_X[3] - 40} y={40 + OUTCOME_Y.risk * (H - 70) - 8} fontSize="11" fontWeight="500" textAnchor="end" fill="var(--s4e-text-secondary)">Overall Risk Score</text>
            <text x={COL_X[3] - 40} y={40 + OUTCOME_Y.risk * (H - 70) + 8} fontSize="13" fontWeight="700" textAnchor="end" fill="var(--s4e-scale-purple-600)">Critical 80/100</text>

            <text x={COL_X[3] - 40} y={40 + OUTCOME_Y.findings * (H - 70) - 8} fontSize="11" fontWeight="500" textAnchor="end" fill="var(--s4e-text-secondary)">Key Findings</text>
            <text x={COL_X[3] - 40} y={40 + OUTCOME_Y.findings * (H - 70) + 10} fontSize="12" fontWeight="700" textAnchor="end" fill="var(--s4e-text-primary)">10 · 24 · 56 · 03 · 12</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

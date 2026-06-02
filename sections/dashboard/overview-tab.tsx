"use client";

import type React from "react";
import { TriangleAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/sections/dashboard/card";
import { FlowDiagram } from "@/sections/dashboard/flow-diagram";
import { SeverityPill, SeverityDot, Delta, type Severity } from "@/sections/dashboard/widgets";
import { Inspectable } from "@/sections/dashboard/inspect";

// ── Risk gauge (half-arc) ──────────────────────────────────────────────────

function RiskGauge({ value }: { value: number }) {
  const pct = value / 100;
  const R = 70, CX = 90, CY = 90;
  const start = 180, end = 360;
  const a = (deg: number) => ({ x: CX + R * Math.cos((deg * Math.PI) / 180), y: CY + R * Math.sin((deg * Math.PI) / 180) });
  const arc = (from: number, to: number) => {
    const p0 = a(from), p1 = a(to);
    return `M ${p0.x} ${p0.y} A ${R} ${R} 0 0 1 ${p1.x} ${p1.y}`;
  };
  const valDeg = start + (end - start) * pct;
  const knob = a(valDeg);
  return (
    <svg viewBox="0 10 180 95" className="w-full max-w-[220px]">
      <path d={arc(start, end)} fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-s4e-neutral-grey-200" />
      <path d={arc(start, start + 60)}  fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-s4e-scale-green-500" />
      <path d={arc(start + 60, start + 120)} fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-s4e-scale-yellow-500" />
      <path d={arc(start + 120, start + 160)} fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-s4e-scale-red-500" />
      <path d={arc(start + 160, end)} fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-s4e-scale-purple-500" />
      <circle cx={knob.x} cy={knob.y} r="7" className="fill-s4e-surface-app stroke-s4e-text-primary" strokeWidth="2.5" />
      <text x={CX} y={CY - 6} textAnchor="middle" className="fill-s4e-text-primary" fontSize="26" fontWeight="700">{value}</text>
    </svg>
  );
}

function RiskMetric({ label, delta }: { label: string; delta: number }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-[12px] text-s4e-text-secondary">{label}</span>
      <Delta value={delta} />
    </div>
  );
}

// ── Terminal log ────────────────────────────────────────────────────────────

type LogLine = { time: string; tag: string; kind: "INFORMATIONAL" | "ERROR"; source: "AI" | "Manual" | "Continuous"; text: string };

const LOG: LogLine[] = [
  { time: "18:07", kind: "INFORMATIONAL", source: "AI",         tag: "Rate Limit Test Scanner", text: "has been completed for the target testphp.vulnweb.com" },
  { time: "17:45", kind: "INFORMATIONAL", source: "Manual",     tag: "Light Scan",              text: "started on resources.s4e.io" },
  { time: "17:10", kind: "ERROR",         source: "AI",         tag: "Port Scan",               text: "failed on siberkuvvet.com" },
  { time: "16:55", kind: "INFORMATIONAL", source: "Continuous", tag: "Scan",                    text: "initiated on 108.21.251.179" },
];

function TerminalLog() {
  return (
    <Card title="Continuous Monitoring Activity" info status={{ label: "CTEM Active", tone: "live" }}>
      <div className="rounded-md bg-s4e-brand-primary-50/60 px-3 py-2 mb-3">
        <span className="text-[12px] text-s4e-brand-primary-600 font-medium">Scanner IPs:</span>
        <span className="text-[12px] text-s4e-text-secondary"> 85.17.120.200, 95.211.107.144 (whitelist recommended)</span>
      </div>
      <pre className="rounded-md bg-s4e-btn-neutral-800 px-4 py-3 text-[11px] leading-6 font-mono overflow-x-auto">
        {LOG.map((l, i) => (
          <div key={i} className={l.kind === "ERROR" ? "text-s4e-scale-red-500" : "text-s4e-text-white"}>
            <span className="text-[#8a8a8a]">$: {l.time} </span>
            <span className="text-s4e-brand-secondary-500">[{l.kind}] </span>
            <span className="text-s4e-brand-primary-500">[{l.source}] </span>
            {l.tag} {l.text}
          </div>
        ))}
      </pre>
    </Card>
  );
}

// ── Tables ───────────────────────────────────────────────────────────────────

type Threat = { threat: string; asset?: string; date: string; severity: Severity };

const PRIORITY: Threat[] = [
  { threat: "SQL Injection vulnerability in login form",       asset: "Morem ipsum dolor sit amet, dolore eu fugia…", date: "19.09.2024", severity: "high" },
  { threat: "Cross-Site Scripting (XSS) in comment…",          asset: "Morem ipsum dolor sit amet, dolore eu fugia…", date: "19.09.2024", severity: "high" },
  { threat: "Cross-Site Scripting (XSS) in comment…",          asset: "Sorem ipsum dolor sit amet, ut labore et dol…", date: "17.09.2024", severity: "high" },
  { threat: "Insecure Direct Object Reference in use…",        asset: "Dorem ipsum dolor sit amet, quis nostrud ex…", date: "18.09.2024", severity: "critical" },
  { threat: "Insecure Direct Object Reference in use…",        asset: "Vorem ipsum dolor sit amet, consectetur adi…", date: "15.09.2024", severity: "critical" },
];

const RECENT: Threat[] = [
  { threat: "Oorem ipsum dolor sit amet, dolore eu fugiat nulla pariatur.", date: "19.09.2024", severity: "high" },
  { threat: "Oorem ipsum dolor sit amet, dolore eu fugiat nulla pariatur.", date: "19.09.2024", severity: "high" },
  { threat: "Eorem ipsum dolor sit amet, ut et labore et dolore magna.",    date: "17.09.2024", severity: "high" },
  { threat: "Iorem ipsum dolor sit amet, quis nostrud exercitation ullamco.", date: "18.09.2024", severity: "critical" },
  { threat: "Jorem ipsum dolor sit amet, consectetur adipiscing elit.",     date: "15.09.2024", severity: "critical" },
];

function ThreatTable({ rows, showAsset }: { rows: Threat[]; showAsset: boolean }) {
  const cols = showAsset
    ? "grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_100px_90px]"
    : "grid-cols-[minmax(0,1fr)_110px_90px]";
  return (
    <div>
      <div className={cn("grid gap-3 px-3 py-2 rounded-md bg-s4e-surface-table-header", cols)}>
        <span className="text-[11px] font-medium uppercase tracking-wide text-s4e-text-disabled inline-flex items-center gap-1">Threats <Info size={11} /></span>
        {showAsset && <span className="text-[11px] font-medium uppercase tracking-wide text-s4e-text-disabled">Asset</span>}
        <span className="text-[11px] font-medium uppercase tracking-wide text-s4e-text-disabled">Date</span>
        <span className="text-[11px] font-medium uppercase tracking-wide text-s4e-text-disabled">Severity</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className={cn("grid gap-3 px-3 py-2.5 items-center border-b border-s4e-neutral-divider-10 last:border-b-0", cols)}>
          <span className="text-[12px] text-s4e-text-primary truncate inline-flex items-center gap-1.5">
            {r.threat}
            <Info size={11} className="text-s4e-text-disabled shrink-0" />
          </span>
          {showAsset && <span className="text-[12px] text-s4e-text-secondary truncate">{r.asset}</span>}
          <span className="text-[12px] text-s4e-text-secondary tabular-nums">{r.date}</span>
          <SeverityPill severity={r.severity} />
        </div>
      ))}
    </div>
  );
}

// ── Quick Stats ──────────────────────────────────────────────────────────────

const DIST: { sev: Severity; count: number; delta: number }[] = [
  { sev: "info",     count: 24, delta: 0  },
  { sev: "low",      count: 18, delta: 0  },
  { sev: "medium",   count: 24, delta: -5 },
  { sev: "high",     count: 38, delta: 3  },
  { sev: "critical", count: 2,  delta: 0  },
];

const SEV_LABEL: Record<Severity, string> = { info: "Information", low: "Low", medium: "Medium", high: "High", critical: "Critical" };

// ── Overview tab ──────────────────────────────────────────────────────────────

export function OverviewTab() {
  return (
    <div className="space-y-5">
      <Inspectable slug="chart" label="Chart">
        <FlowDiagram />
      </Inspectable>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-5 items-start">
        {/* Left column */}
        <div className="space-y-5">
          {/* Live Risk Score */}
          <Inspectable slug="gauge" label="Gauge">
          <Card title="Live Risk Score" description="Overall security posture" viewAll="View details">
            <div className="flex items-center gap-4">
              <RiskGauge value={75} />
              <div className="flex-1 min-w-0">
                <RiskMetric label="4 assets added in last 48h without coverage" delta={2} />
                <RiskMetric label="Coverage gaps (blind spots)" delta={4} />
                <RiskMetric label="Highest-risk asset" delta={5} />
              </div>
            </div>
          </Card>
          </Inspectable>

          {/* Attention Needed */}
          <Inspectable slug="cards" label="Card">
          <Card title="Attention Needed" info trailing={
            <span className="inline-flex items-center gap-1.5">
              <span className="w-[7px] h-[7px] rounded-full bg-s4e-scale-red-500" />
              <span className="text-[11px] text-s4e-text-secondary">5 Active</span>
              <button type="button" className="text-[12px] font-medium text-s4e-brand-primary-500 underline underline-offset-2 ml-1">View All</button>
            </span>
          }>
            <div className="flex items-start gap-2 mb-2">
              <TriangleAlert size={16} className="text-s4e-scale-red-600 shrink-0 mt-0.5" />
              <span className="text-[14px] font-semibold text-s4e-scale-red-600">Security Blind Spots</span>
              <span className="ml-auto text-[12px] text-s4e-text-secondary bg-s4e-scale-red-50 px-2 py-0.5 rounded-md shrink-0">4 Assets</span>
            </div>
            <p className="text-[14px] text-s4e-text-primary font-medium">4 assets are not being Continuously Monitored.</p>
            <p className="text-[12px] text-s4e-text-secondary mt-1 leading-relaxed">
              These assets are currently outside your security coverage. Hidden vulnerabilities may go undetected.
            </p>
            <button type="button" className="mt-3 inline-flex items-center h-9 px-4 rounded-lg bg-s4e-btn-primary-600 text-s4e-text-on-accent text-[14px] font-medium hover:bg-s4e-btn-primary-700 transition-colors">
              Review Assets
            </button>
            <div className="flex items-center gap-1.5 mt-4">
              <span className="w-5 h-1 rounded-full bg-s4e-brand-primary-500" />
              <span className="w-1.5 h-1 rounded-full bg-s4e-neutral-grey-300" />
            </div>
          </Card>
          </Inspectable>

          {/* Quick Stats */}
          <Inspectable slug="severity-badge" label="Severity Badge">
          <Card title="Quick Stats" description="Issue distribution" viewAll="Scan Reports">
            <div className="flex items-center justify-between rounded-lg bg-s4e-neutral-grey-100 px-4 py-3 mb-2">
              <span className="text-[14px] font-semibold text-s4e-text-primary">Total Issues:</span>
              <span className="text-[15px] font-bold text-s4e-text-primary tabular-nums inline-flex items-center gap-1">266 <span className="text-s4e-scale-red-600 text-[12px]">↗</span></span>
            </div>
            <div className="divide-y divide-s4e-neutral-divider-10">
              {DIST.map((d) => (
                <div key={d.sev} className="flex items-center gap-3 py-2.5">
                  <SeverityDot severity={d.sev} />
                  <span className="text-[14px] text-s4e-text-primary flex-1">{SEV_LABEL[d.sev]}</span>
                  <span className="text-[14px] font-semibold text-s4e-text-primary tabular-nums">{d.count}</span>
                  <Delta value={d.delta} />
                </div>
              ))}
            </div>
          </Card>
          </Inspectable>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <Inspectable slug="data-table" label="Data Table">
          <Card title="Priority Actions" description="These actions are prioritized based on risk growth, not severity alone." status={{ label: "Live", tone: "live" }} viewAll="View All">
            <ThreatTable rows={PRIORITY} showAsset />
          </Card>
          </Inspectable>

          <Inspectable slug="data-table" label="Data Table">
          <Card title="Recently Detected Issues" description="New issues detected since last scan cycle" status={{ label: "Live", tone: "live" }} viewAll="View All">
            <ThreatTable rows={RECENT} showAsset={false} />
          </Card>
          </Inspectable>

          <Inspectable slug="toast-tooltip" label="Activity Log">
            <TerminalLog />
          </Inspectable>
        </div>
      </div>
    </div>
  );
}

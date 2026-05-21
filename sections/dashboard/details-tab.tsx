"use client";

import type React from "react";
import { useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/sections/dashboard/card";
import { Donut, DonutLegend, Delta, DATA, SEV_COLOR, type DonutSlice } from "@/sections/dashboard/widgets";
import { AreaChart, BarChart, Treemap, MiniGauge } from "@/sections/dashboard/charts";
import { Inspectable } from "@/sections/dashboard/inspect";

// ── Donut datasets ────────────────────────────────────────────────────────

const STATUS: DonutSlice[] = [
  { label: "Open",     value: 102, color: DATA.navy  },
  { label: "Fixed",    value: 18,  color: DATA.blue2 },
  { label: "Reopened", value: 24,  color: DATA.blue  },
];
const STATUS_DELTA: Record<string, number> = { Open: 12, Fixed: -16, Reopened: 4 };

const SEVERITIES: DonutSlice[] = [
  { label: "Information", value: 102, color: SEV_COLOR.info     },
  { label: "Low",         value: 18,  color: SEV_COLOR.low      },
  { label: "Medium",      value: 24,  color: SEV_COLOR.medium   },
  { label: "High",        value: 38,  color: SEV_COLOR.high     },
  { label: "Critical",    value: 2,   color: SEV_COLOR.critical },
];

const TREND = [72, 65, 70, 58, 62, 55, 68, 60, 64, 52, 66, 70, 62, 48, 60];

const RANGE = ["7 Days", "30 Days", "90 Days"] as const;

// ── Sub-widgets ──────────────────────────────────────────────────────────────

function MiniStat({ label, value, sub }: { label: string; value: React.ReactNode; sub: string }) {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-lg px-3 py-2">
      <div className="text-[16px] font-bold text-s4e-text-primary tabular-nums leading-none">{value}</div>
      <div className="text-[11px] text-s4e-text-secondary mt-1">{sub}</div>
      <div className="text-[10px] text-s4e-text-disabled">{label}</div>
    </div>
  );
}

function PortChips({ ports }: { ports: number[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {ports.map((p, i) => (
        <span key={i} className="inline-flex items-center px-1.5 py-0.5 rounded bg-s4e-scale-blue-50 text-s4e-scale-blue-600 text-[10px] font-medium tabular-nums">
          {p}
        </span>
      ))}
    </div>
  );
}

// ── Details tab ──────────────────────────────────────────────────────────────

export function DetailsTab() {
  const [range, setRange] = useState<(typeof RANGE)[number]>("30 Days");

  return (
    <div className="space-y-5">
      {/* Donuts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Inspectable slug="chart" label="Chart">
        <Card title="Scan Reports by Status" description="Current state of detected security findings.">
          <div className="flex items-center gap-6">
            <Donut data={STATUS} />
            <DonutLegend data={STATUS} suffix={(d) => <Delta value={STATUS_DELTA[d.label] ?? 0} />} />
          </div>
        </Card>
        </Inspectable>
        <Inspectable slug="chart" label="Chart">
        <Card title="Scan reports by severities" description="Severity distribution of findings" trailing={<span className="text-[11px] text-s4e-text-disabled">Status</span>}>
          <div className="flex items-center gap-6">
            <Donut data={SEVERITIES} />
            <DonutLegend data={SEVERITIES} />
          </div>
        </Card>
        </Inspectable>
      </div>

      {/* Risk trend */}
      <Card
        title="Risk Score Trend"
        description="Monitoring view (use Insights for explanations)"
        trailing={
          <div className="flex items-center gap-1">
            {RANGE.map((r) => (
              <button key={r} type="button" onClick={() => setRange(r)}
                className={cn("px-2 py-1 rounded-md text-[11px] font-medium transition-colors",
                  range === r ? "bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500" : "text-s4e-text-secondary hover:text-s4e-text-primary")}>
                {r}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_200px] gap-5">
          <AreaChart points={TREND} />
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            <MiniStat label="" value={<span className="inline-flex items-center gap-1">60 <Delta value={-18} /></span>} sub="Current Risk Score" />
            <MiniStat label="Day 2"        value="60" sub="Highest Risk" />
            <MiniStat label="Today"        value="60" sub="Lowest Risk" />
            <MiniStat label="Last 30 days" value="60" sub="Average Risk" />
          </div>
        </div>
      </Card>

      {/* Assets by vulnerabilities */}
      <Inspectable slug="data-table" label="Data Table">
      <Card title="Assets by Vulnerabilities" viewAll="View all in Asset Manager">
        <div className="grid grid-cols-[60px_minmax(0,1fr)_minmax(0,1fr)] gap-3 px-3 py-2 rounded-md bg-s4e-surface-table-header">
          <span className="text-[11px] uppercase tracking-wide text-s4e-text-disabled">Risk Score</span>
          <span className="text-[11px] uppercase tracking-wide text-s4e-text-disabled inline-flex items-center gap-1">Asset <Info size={11} /></span>
          <span className="text-[11px] uppercase tracking-wide text-s4e-text-disabled">Severity</span>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-[60px_minmax(0,1fr)_minmax(0,1fr)] gap-3 px-3 py-2.5 items-center border-b border-s4e-neutral-divider-10 last:border-b-0">
            <MiniGauge value={20} />
            <span className="text-[12px] text-s4e-text-primary truncate">Oorem ipsum dolor sit amet, dolore eu fugiat nulla pariatur.</span>
            <div className="flex items-center gap-1 text-[11px] font-medium tabular-nums">
              <span className="px-1.5 py-0.5 rounded bg-s4e-scale-blue-50 text-s4e-scale-blue-600">60</span>
              <span className="px-1.5 py-0.5 rounded bg-s4e-scale-green-50 text-s4e-scale-green-600">85</span>
              <span className="px-1.5 py-0.5 rounded bg-s4e-scale-yellow-50 text-s4e-scale-yellow-700">305</span>
              <span className="px-1.5 py-0.5 rounded bg-s4e-scale-red-50 text-s4e-scale-red-600">3</span>
              <span className="px-1.5 py-0.5 rounded bg-s4e-scale-purple-50 text-s4e-scale-purple-600">100000000</span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-end gap-2 pt-3 text-[11px] text-s4e-text-disabled">
          Row per page: 3 · 1–3 of 492 ‹ ›
        </div>
      </Card>
      </Inspectable>

      {/* Crawler history */}
      <Inspectable slug="data-table" label="Data Table">
      <Card title="Crawler History" info>
        <div className="overflow-x-auto s4e-scrollbar-hide">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-s4e-surface-table-header">
              <tr className="text-left">
                {["Asset", "Port", "Count", "Last Crawl URL #", "Unique Request #", "Change URL #", "Unique Request #"].map((h, i) => (
                  <th key={i} className="py-2.5 px-3 text-[10px] uppercase tracking-wide font-medium text-s4e-text-disabled first:rounded-l-md last:rounded-r-md">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-s4e-neutral-divider-10 last:border-b-0">
                  <td className="py-2.5 px-3 text-[12px] text-s4e-text-primary">s4e.kazverse.com</td>
                  <td className="py-2.5 px-3 text-[12px] text-s4e-text-secondary tabular-nums">10</td>
                  <td className="py-2.5 px-3 text-[12px] text-s4e-text-secondary tabular-nums">20</td>
                  <td className="py-2.5 px-3 text-[12px] text-s4e-text-secondary tabular-nums">60</td>
                  <td className="py-2.5 px-3 text-[12px] text-s4e-text-secondary tabular-nums">50</td>
                  <td className="py-2.5 px-3 text-[12px] text-s4e-scale-green-600 tabular-nums">30 (%70+)</td>
                  <td className="py-2.5 px-3 text-[12px] text-s4e-scale-red-600 tabular-nums">400 (%200+)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      </Inspectable>

      {/* Ports + Asset stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Latest Ports Changes" description="Recent exposure changes (top 5)">
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="text-[12px] text-s4e-text-primary">zero.webappsecurity.com</div>
                <div className="text-[10px] text-s4e-text-disabled mb-1.5">19.09.2024</div>
                <PortChips ports={[80, 4900, 4900, 4900, 4900, 4900, 4900, 4900, 4900, 4900, 4900]} />
              </div>
            ))}
          </div>
        </Card>
        <Card title="Asset Stats" description="Overview of verification status." info>
          <div className="flex flex-col items-center gap-4">
            <Donut data={[{ label: "verified", value: 34, color: DATA.blue }, { label: "unverified", value: 7, color: DATA.navy }]} centerLabel="" />
            <div className="w-full">
              <div className="text-[12px] text-s4e-text-secondary mb-2">Total Assets <span className="font-semibold text-s4e-text-primary">42</span></div>
              <DonutLegend data={[{ label: "verified", value: 34, color: DATA.blue }, { label: "unverified", value: 7, color: DATA.navy }]} />
            </div>
          </div>
        </Card>
      </div>

      {/* URLs + Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Total URLs over time" description="Growth of discovered URLs within the selected time range">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <MiniStat label="" value="128,450" sub="Current total" />
            <MiniStat label="" value={<span className="text-s4e-scale-green-600">+12%</span>} sub="Last 24h change" />
            <MiniStat label="" value="14:00" sub="Peak hour" />
          </div>
          <AreaChart points={[20, 35, 30, 48, 42, 60, 55, 72, 68, 80]} height={120} />
        </Card>
        <Card title="Top Auto Detected Services" description="Most frequently identified services across monitored">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <MiniStat label="" value="12 Open" sub="Total Services" />
            <MiniStat label="" value="1,248" sub="Total Assets" />
            <MiniStat label="" value="Web Services" sub="Top Data Source" />
          </div>
          <BarChart data={[{ label: "HTTPS: 443", value: 28 }, { label: "HTTP:80", value: 36 }, { label: "SSH:22", value: 48 }, { label: "FTP:21", value: 54 }]} height={140} />
        </Card>
      </div>

      {/* Requests + Open ports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Unique requests over time" description="Unique HTTP requests over time. Use it to spot traffic spikes.">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <MiniStat label="" value="42" sub="Last 24h requests" />
            <MiniStat label="" value="42" sub="Max RPS" />
            <MiniStat label="" value={<span className="text-s4e-scale-green-600">No</span>} sub="Anomaly" />
          </div>
          <AreaChart points={[40, 30, 45, 35, 50, 42, 55, 48, 60]} height={120} />
        </Card>
        <Card title="Open port statistic" description="Distribution of open ports across monitored assets.">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <MiniStat label="" value="42" sub="Total open ports" />
            <MiniStat label="" value="443 (HTTPS)" sub="Most common" />
            <MiniStat label="" value={<span className="text-s4e-scale-green-600">+3</span>} sub="New since last scan" />
          </div>
          <Treemap />
        </Card>
      </div>

      {/* DNS records */}
      <Card title="DNS records" description="Overview of DNS record types across monitored domains">
        <div className="grid grid-cols-3 gap-2 mb-4 max-w-md">
          <MiniStat label="" value="42" sub="Total records" />
          <MiniStat label="" value="4" sub="Misconfigured" />
          <MiniStat label="" value={<span className="text-s4e-scale-green-600">+3</span>} sub="New since last scan" />
        </div>
        <Treemap />
      </Card>

      {/* Source donuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Asset Sources" info>
          <div className="flex flex-col items-center gap-4">
            <Donut data={[{ label: "S4E Subdomain Finder", value: 102, color: DATA.rust }]} />
            <DonutLegend data={[{ label: "S4E Subdomain Finder", value: 102, color: DATA.rust }]} />
          </div>
        </Card>
        <Card title="Private vs Public Asset" info>
          <div className="flex flex-col items-center gap-4">
            <Donut data={[{ label: "Privet", value: 97, color: DATA.blue }, { label: "Public", value: 3, color: DATA.navy }]} />
            <DonutLegend data={[{ label: "Privet", value: 97, color: DATA.blue }, { label: "Public", value: 3, color: DATA.navy }]} />
          </div>
        </Card>
      </div>
    </div>
  );
}

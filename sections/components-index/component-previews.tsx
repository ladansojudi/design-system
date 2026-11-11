"use client";

import type React from "react";
import { ChevronRight, FileSearch, Filter, LayoutDashboard, Radar, Search, ShieldAlert, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch, RadioGroup, Radio } from "@/components/ui/switch-radio";
import { SearchBar } from "@/components/ui/search-bar";
import { Alert } from "@/components/ui/alert";
import { Toast } from "@/components/ui/toast-tooltip";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { SeverityBadge } from "@/components/ui/severity-badge";
import { Badge, Tag } from "@/components/ui/badge-tag";
import { Gauge } from "@/components/ui/gauge";
import { DonutChart } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SeverityBar } from "@/components/ui/severity-bar";
import { CvssScore } from "@/components/ui/cvss-score";
import { CveTag } from "@/components/ui/cve-tag";
import { FindingStatus } from "@/components/ui/finding-status";
import { MaskedValue } from "@/components/ui/masked-value";
import { Indicator } from "@/components/ui/indicator";
import { ScanProgress } from "@/components/ui/scan-progress";
import { ActivityTimeline } from "@/components/ui/activity-timeline";

// Thumbnails for the Components index. Real components where they fit a small
// card; a drawn sketch (tokens only) for the big organisms. The card renders
// these inside an `inert` box, so nothing here is focusable.

/** Scales a wide component down to fit the thumbnail. */
function Shrink({ children, scale = 0.8, width = 320 }: { children: React.ReactNode; scale?: number; width?: number }) {
  return (
    <div style={{ width: width * scale }}>
      <div style={{ width, transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

function Line({ w, strong }: { w: string; strong?: boolean }) {
  return <span className={`block h-1.5 rounded-full ${strong ? "bg-snt-neutral-grey-400" : "bg-snt-neutral-grey-300"}`} style={{ width: w }} />;
}

const PREVIEWS: Record<string, () => React.ReactNode> = {
  "masked-value": () => <MaskedValue label="API key" value="sk_live_51NcX9fQe7a3b" />,
  indicator: () => <Shrink width={300} scale={0.8}><Indicator type="ip" value="185.220.101.47" verdict="malicious" copyable={false} /></Shrink>,
  "scan-progress": () => (
    <div className="w-64">
      <ScanProgress steps={[{ label: "Queued", status: "done" }, { label: "Scan", status: "active" }, { label: "Report", status: "pending" }]} />
    </div>
  ),
  "activity-timeline": () => (
    <Shrink width={260} scale={0.8}>
      <ActivityTimeline items={[
        { id: "1", title: "Suspicious login", time: "14:02", tone: "error" },
        { id: "2", title: "Session revoked", time: "14:11", tone: "success" },
      ]} />
    </Shrink>
  ),
  "severity-bar": () => (
    <div className="w-60"><SeverityBar counts={{ critical: 3, high: 8, medium: 14, low: 21 }} /></div>
  ),
  "cvss-score": () => <CvssScore score={9.8} />,
  "cve-tag": () => <CveTag id="CVE-2021-44228" kev href={false} />,
  "finding-status": () => (
    <div className="flex flex-col items-start gap-2">
      <FindingStatus status="open" />
      <FindingStatus status="in-progress" />
      <FindingStatus status="resolved" />
    </div>
  ),
  button: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Start scan</Button>
      <Button size="sm" intent="neutral" variant="outline">Cancel</Button>
    </div>
  ),
  "text-field": () => (
    <Shrink width={260}>
      <TextField variant="outlined" label="Target domain" defaultValue="api.example.com" />
    </Shrink>
  ),
  textarea: () => (
    <Shrink width={260}>
      <Textarea label="Notes" defaultValue="Port 22 exposed on staging." rows={2} />
    </Shrink>
  ),
  select: () => (
    <div className="w-52 rounded-md border border-snt-border-strong bg-snt-surface-app px-3 py-2 text-snt-12 text-snt-text-primary flex items-center justify-between">
      Europe (Frankfurt) <ChevronRight size={14} className="rotate-90 text-snt-text-secondary" aria-hidden />
    </div>
  ),
  checkbox: () => (
    <div className="space-y-2">
      <Checkbox checked label="Critical" />
      <Checkbox checked={false} label="Low" />
    </div>
  ),
  "switch-radio": () => (
    <div className="flex items-center gap-6">
      <Switch checked variant="primary" aria-label="Enabled" />
      <RadioGroup value="a" aria-label="Scan type" className="flex gap-3">
        <Radio value="a" aria-label="Quick" />
        <Radio value="b" aria-label="Full" />
      </RadioGroup>
    </div>
  ),
  "search-bar": () => (
    <Shrink width={260}>
      <SearchBar value="CVE-2024" />
    </Shrink>
  ),
  "text-space": () => (
    <div className="w-56 overflow-hidden rounded-md border border-snt-border-default bg-snt-surface-app">
      <div className="flex gap-2 border-b border-snt-border-default px-2 py-1.5 text-snt-11 font-semibold text-snt-text-secondary">
        <span>B</span><span className="italic">I</span><span className="underline">U</span><span>•</span>
      </div>
      <div className="space-y-1.5 p-3"><Line w="90%" strong /><Line w="70%" /><Line w="40%" /></div>
    </div>
  ),
  alert: () => (
    <Shrink width={300} scale={0.75}>
      <Alert variant="warning" title="2 assets not scanned">Schedule a scan.</Alert>
    </Shrink>
  ),
  "toast-tooltip": () => (
    <Shrink width={300} scale={0.75}>
      <Toast intent="success" title="Scan started" description="Results in about 2 minutes." paused />
    </Shrink>
  ),
  spinner: () => (
    <div className="flex items-center gap-4">
      <Spinner size="md" label="Loading" />
      <Spinner size="lg" tone="neutral" label="Loading" />
    </div>
  ),
  skeleton: () => (
    <div className="w-52 space-y-2">
      <div className="flex items-center gap-2">
        <Skeleton className="size-8 rounded-full" />
        <div className="flex-1 space-y-1.5"><Skeleton className="h-2.5 w-3/4" /><Skeleton className="h-2.5 w-1/2" /></div>
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  ),
  "empty-state": () => (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="flex size-9 items-center justify-center rounded-full bg-snt-bg-subtle text-snt-text-secondary"><FileSearch size={16} aria-hidden /></span>
      <span className="text-snt-12 font-medium text-snt-text-primary">No findings yet</span>
      <Line w="7rem" />
    </div>
  ),
  banner: () => (
    <div className="w-56 rounded-md bg-snt-neutral-grey-900 px-3 py-2 text-snt-11 text-snt-neutral-grey-100">Maintenance on Sunday, 02:00 UTC</div>
  ),
  "severity-badge": () => (
    <div className="grid grid-cols-2 gap-2">
      <SeverityBadge severity="critical" />
      <SeverityBadge severity="high" />
      <SeverityBadge severity="medium" />
      <SeverityBadge severity="low" />
    </div>
  ),
  "badge-tag": () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone="success">Active</Badge>
      <Badge tone="error">Failed</Badge>
      <Tag tone="info">Production</Tag>
    </div>
  ),
  cards: () => (
    <div className="w-56 rounded-lg border border-snt-border-default bg-snt-surface-app p-3 shadow-snt-sm">
      <div className="flex items-center justify-between text-snt-12 font-semibold text-snt-text-primary">Live risk score <span className="text-snt-11 font-normal text-snt-text-link">View</span></div>
      <div className="mt-2 space-y-1.5 text-snt-11 text-snt-text-secondary">
        <div className="flex justify-between">Critical vulnerabilities <b className="text-snt-text-primary">0</b></div>
        <div className="flex justify-between">Coverage gaps <b className="text-snt-text-primary">20</b></div>
      </div>
    </div>
  ),
  "data-table": () => (
    <div className="w-64 overflow-hidden rounded-lg border border-snt-border-default bg-snt-surface-app">
      {(["critical", "high", "medium"] as const).map((s) => (
        <div key={s} className="flex items-center justify-between border-b border-snt-border-default px-3 py-1.5 last:border-b-0">
          <Line w="5rem" strong />
          <Shrink width={110} scale={0.75}><SeverityBadge severity={s} /></Shrink>
        </div>
      ))}
    </div>
  ),
  chart: () => (
    <DonutChart
      size={96}
      showTotal={false}
      aria-label="Findings by severity"
      data={[
        { label: "Critical", value: 3, color: "var(--snt-severity-critical)" },
        { label: "High",     value: 5, color: "var(--snt-severity-high)" },
        { label: "Medium",   value: 8, color: "var(--snt-severity-medium)" },
        { label: "Low",      value: 6, color: "var(--snt-severity-low)" },
      ]}
    />
  ),
  gauge: () => <Gauge value={72} color="green" />,
  tabs: () => (
    <Tabs defaultValue="findings">
      <TabsList aria-label="Preview">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="findings" count={12}>Findings</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
  breadcrumb: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#">Assets</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem isCurrent>api.example.com</BreadcrumbItem>
    </Breadcrumb>
  ),
  "filter-bar": () => (
    <div className="flex items-center gap-1.5 rounded-md border border-snt-border-default bg-snt-surface-app p-1.5 text-snt-11 text-snt-text-secondary">
      <span className="flex items-center gap-1 rounded px-1.5 py-1"><Search size={12} aria-hidden /> Search</span>
      <span className="flex items-center gap-1 rounded bg-snt-bg-brand-subtle px-1.5 py-1 text-snt-text-brand"><Filter size={12} aria-hidden /> Severity · 2 <X size={11} aria-hidden /></span>
      <span className="rounded px-1.5 py-1">Status</span>
    </div>
  ),
  sidebar: () => (
    <div className="flex w-36 flex-col gap-1 rounded-lg border border-snt-border-default bg-snt-surface-app p-2 text-snt-11 text-snt-text-secondary">
      <span className="flex items-center gap-1.5 rounded bg-snt-bg-subtle px-2 py-1 font-medium text-snt-text-primary"><LayoutDashboard size={12} aria-hidden /> Dashboard</span>
      <span className="flex items-center gap-1.5 px-2 py-1"><Radar size={12} aria-hidden /> Scans</span>
      <span className="flex items-center gap-1.5 px-2 py-1"><ShieldAlert size={12} aria-hidden /> Findings</span>
    </div>
  ),
  "top-bar": () => (
    <div className="flex w-60 items-center gap-2 rounded-lg border border-snt-border-default bg-snt-surface-app px-3 py-2">
      <Line w="3rem" strong />
      <span className="ml-auto size-4 rounded bg-snt-neutral-grey-300" />
      <span className="size-5 rounded-full bg-snt-neutral-grey-400" />
    </div>
  ),
  modal: () => (
    <div className="relative flex h-full w-full items-center justify-center rounded-md bg-snt-neutral-grey-900/10">
      <div className="w-44 rounded-lg border border-snt-border-default bg-snt-surface-app p-3 shadow-snt-lg">
        <div className="text-snt-12 font-semibold text-snt-text-primary">Delete asset?</div>
        <div className="mt-1.5"><Line w="90%" /></div>
        <div className="mt-3 flex justify-end gap-1.5">
          <span className="rounded border border-snt-border-strong px-2 py-0.5 text-snt-10 text-snt-text-primary">Cancel</span>
          <span className="rounded bg-snt-btn-error-600 px-2 py-0.5 text-snt-10 text-snt-text-on-accent">Delete</span>
        </div>
      </div>
    </div>
  ),
};

export function ComponentPreview({ slug }: { slug: string }) {
  const render = PREVIEWS[slug];
  return render ? <>{render()}</> : null;
}


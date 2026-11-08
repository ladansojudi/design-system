import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, Accessibility, SunMoon, Blocks, ShieldCheck } from "lucide-react";

import { PageBody } from "@/components/styleguide/page-body";
import { SectionTitle } from "@/components/styleguide/section-title";
import { FigmaMark } from "@/components/styleguide/open-in-figma";
import { SentinelMark } from "@/components/styleguide/logo";
import { FIGMA_FILE_URL } from "@/components/styleguide/figma-data";
import { navGroups } from "@/components/styleguide/nav-data";
import { version } from "@/package.json";

import { Button, buttonVariants } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Badge, Tag } from "@/components/ui/badge-tag";
import { SeverityBadge } from "@/components/ui/severity-badge";
import { TextField } from "@/components/ui/text-field";
import { Switch } from "@/components/ui/switch-radio";
import { Checkbox } from "@/components/ui/checkbox";
import { Gauge } from "@/components/ui/gauge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Overview — Sentinel Design System",
  description: "Sentinel — an open design system for cybersecurity products: tokens, components and docs. Designed in Figma, built in React, ready for AI agents.",
};

// Counted from the source at build time so the numbers never drift.
function systemStats() {
  const root = process.cwd();
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "public", "sentinel-manifest.json"), "utf8"));
  const css = fs.readFileSync(path.join(root, "app", "globals.css"), "utf8");
  const tokens = new Set([...css.matchAll(/--(snt-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
  return { components: manifest.components.length as number, tokens: tokens.size };
}

const PILLARS = [
  {
    icon: <FigmaMark size={18} />,
    title: "Designed in Figma",
    body: "A Figma library generated from the code: Light/Dark variables with the same names as the CSS tokens, text styles, 40 icons and one page per component.",
    href: FIGMA_FILE_URL,
    cta: "Open the library",
    external: true,
  },
  {
    icon: <Blocks size={18} aria-hidden />,
    title: "Built in React",
    body: "Copy-paste components on Tailwind v4 — you own the code. Install any of them with one shadcn command; every visual property is a token.",
    href: "/styleguide/button",
    cta: "Browse components",
  },
  {
    icon: <Bot size={18} aria-hidden />,
    title: "Ready for AI",
    body: "llms.txt, a typed component manifest, a shadcn registry and lint rules that reject hard-coded colours — so agents build with the system, not around it.",
    href: "/styleguide/ai",
    cta: "How it works",
  },
];

const QUALITIES = [
  { icon: SunMoon,       title: "Light & dark",        body: "Every token resolves per theme, including nested previews." },
  { icon: Accessibility, title: "WCAG 2.2 AA target",  body: "Labels, focus, keyboard models from the WAI-ARIA patterns." },
  { icon: ShieldCheck,   title: "Severity is sacred",  body: "Critical → Info colours are reserved and never decorative." },
];

export default function OverviewPage() {
  const stats = systemStats();
  const groups = navGroups.filter((g) => g.label !== "GET STARTED");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-snt-border-default bg-snt-surface-page">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--snt-border-default)_1px,transparent_1px),linear-gradient(to_bottom,var(--snt-border-default)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid gap-10 lg:grid-cols-[1.05fr_1fr] items-center">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <SentinelMark size={28} />
              <Tag tone="primary" outlined>Open design system</Tag>
              <span className="font-mono text-snt-11 text-snt-text-secondary">v{version}</span>
            </div>
            <h1 className="text-snt-32 sm:text-snt-48 font-semibold tracking-tight leading-[1.05] text-snt-text-primary">
              Sentinel Design System
            </h1>
            <p className="mt-5 text-snt-16 leading-relaxed text-snt-text-secondary max-w-[540px]">
              An open design system for cybersecurity products — threat dashboards, scans, assets, findings and severity.
              Designed in Figma, built in React, and ready for AI agents.
            </p>
            <p className="mt-3 text-snt-12 text-snt-text-secondary">
              Designed &amp; built by <span className="font-medium text-snt-text-primary">Laden Sojudi</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/styleguide/button" className={buttonVariants({ size: "lg" })}>
                Browse components <ArrowRight size={16} aria-hidden />
              </Link>
              <a href={FIGMA_FILE_URL} target="_blank" rel="noreferrer" className={buttonVariants({ intent: "default", variant: "outline", size: "lg" })}>
                <FigmaMark size={15} /> Figma library <span className="sr-only">(opens in a new tab)</span>
              </a>
              <Link href="/styleguide/ai" className={buttonVariants({ intent: "default", variant: "ghost", size: "lg" })}>
                <Bot size={16} aria-hidden /> Built for AI
              </Link>
            </div>
          </div>

          {/* Product shot — real components, not a screenshot */}
          <div aria-label="Live preview of Sentinel components" role="group" className="rounded-2xl border border-snt-border-default bg-snt-surface-app shadow-snt-xl p-5 sm:p-6">
            <Tabs defaultValue="findings" className="gap-5">
              <TabsList aria-label="Preview sections">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="findings">Findings</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="mt-5 grid gap-5 sm:grid-cols-[auto_1fr] items-center">
              <Gauge value={72} color="green" />
              <div className="space-y-2">
                <SeverityBadge severity="critical" score={9.8} />
                <SeverityBadge severity="high" score={8.1} />
                <SeverityBadge severity="medium" score={5.4} />
              </div>
            </div>
            <div className="mt-5">
              <Alert variant="warning" title="2 assets not scanned in 30 days">
                Schedule a scan to keep the exposure score current.
              </Alert>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 items-end">
              <TextField variant="outlined" label="Target domain" defaultValue="api.example.com" />
              <div className="flex items-center gap-3 pb-5">
                <Switch checked variant="primary" aria-label="Continuous scanning" />
                <span className="text-snt-12 text-snt-text-secondary">Continuous scanning</span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <Badge tone="success">Active</Badge>
                <Tag tone="info">Production</Tag>
                <Checkbox checked label="Notify team" />
              </div>
              <Button size="sm">Start scan</Button>
            </div>
          </div>
        </div>
      </section>

      <PageBody>
        {/* ── Numbers ─────────────────────────────────────────────────────── */}
        <section aria-label="System at a glance" className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-xl border border-snt-border-default bg-snt-border-default">
          {[
            [String(stats.components), "Components", "Atoms, molecules, organisms"],
            [String(stats.tokens), "Design tokens", "Colour, type, shadow, motion"],
            ["2", "Themes", "Light and dark, one source"],
            ["5", "Lint rules", "Guardrails for humans & AI"],
          ].map(([value, label, hint]) => (
            <div key={label} className="bg-snt-surface-app p-5">
              <div className="text-snt-32 font-semibold tracking-tight text-snt-text-primary tabular-nums">{value}</div>
              <div className="mt-1 text-snt-14 font-medium text-snt-text-primary">{label}</div>
              <div className="text-snt-12 text-snt-text-secondary">{hint}</div>
            </div>
          ))}
        </section>

        {/* ── Pillars ─────────────────────────────────────────────────────── */}
        <section className="mt-14">
          <SectionTitle kicker="One source of truth">Design, code and AI stay in sync</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {PILLARS.map((p) => {
              const inner = (
                <>
                  <div className="w-9 h-9 rounded-lg bg-snt-bg-brand-subtle text-snt-text-brand flex items-center justify-center">{p.icon}</div>
                  <h3 className="mt-4 text-snt-14 font-semibold text-snt-text-primary">{p.title}</h3>
                  <p className="mt-2 text-snt-12 leading-relaxed text-snt-text-secondary flex-1">{p.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-snt-12 font-medium text-snt-text-brand">
                    {p.cta} {p.external ? <ArrowUpRight size={13} aria-hidden /> : <ArrowRight size={13} aria-hidden />}
                  </span>
                </>
              );
              const cls = "group flex flex-col rounded-xl border border-snt-border-default bg-snt-surface-app p-5 transition-colors hover:border-snt-border-strong hover:bg-snt-surface-row-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring";
              return p.external ? (
                <a key={p.title} href={p.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
              ) : (
                <Link key={p.title} href={p.href} className={cls}>{inner}</Link>
              );
            })}
          </div>
        </section>

        {/* ── Qualities ───────────────────────────────────────────────────── */}
        <section className="mt-14">
          <SectionTitle kicker="Principles in practice">Built for security teams</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-3">
            {QUALITIES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-3">
                <Icon size={18} aria-hidden className="mt-0.5 shrink-0 text-snt-text-brand" />
                <div>
                  <div className="text-snt-14 font-medium text-snt-text-primary">{title}</div>
                  <p className="mt-1 text-snt-12 leading-relaxed text-snt-text-secondary">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Explore ─────────────────────────────────────────────────────── */}
        <section className="mt-14">
          <SectionTitle kicker="Explore">Browse the system</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <div key={g.label} className="rounded-xl border border-snt-border-default p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-snt-11 font-semibold uppercase tracking-[0.08em] text-snt-text-secondary">{g.label}</h3>
                  <span className="text-snt-11 text-snt-text-secondary tabular-nums">{g.items.length}</span>
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                  {g.items.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/styleguide/${item.slug}`} className="text-snt-12 text-snt-text-primary hover:text-snt-text-brand hover:underline underline-offset-2">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </PageBody>
    </>
  );
}

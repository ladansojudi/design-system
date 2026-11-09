import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, FileCode2, ShieldCheck, Sparkles, Terminal } from "lucide-react";

import { Sidebar } from "@/components/styleguide/sidebar";
import { SiteFooter } from "@/components/styleguide/site-footer";
import { SentinelMark } from "@/components/styleguide/logo";
import { FigmaMark } from "@/components/styleguide/open-in-figma";
import { FIGMA_FILE_URL } from "@/components/styleguide/figma-data";
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
  title: "Sentinel — the design system for security products",
  description:
    "Sentinel is an open design system for cybersecurity products: tokens, components and guidance for threat dashboards, scans and findings. Designed in Figma, built in React, ready for AI agents.",
};

// Counted from the source at build time so the numbers never drift.
function systemStats() {
  const root = process.cwd();
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "public", "sentinel-manifest.json"), "utf8"));
  const css = fs.readFileSync(path.join(root, "app", "globals.css"), "utf8");
  const tokens = new Set([...css.matchAll(/--(snt-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
  return { components: manifest.components.length as number, tokens: tokens.size };
}

const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-snt-12 font-semibold uppercase tracking-[0.12em] text-snt-text-brand">{children}</p>;
}

function SectionHeading({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-snt-32 font-semibold tracking-tight text-snt-text-primary">{title}</h2>
      {lede && <p className="mt-3 text-snt-16 leading-relaxed text-snt-text-secondary">{lede}</p>}
    </div>
  );
}

// ── Building blocks: each card previews its section with real tokens/components

function FoundationsPreview() {
  const swatches = ["brand-primary-600", "neutral-grey-900", "severity-critical", "severity-high", "severity-medium", "severity-low", "severity-info"];
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      <div className="flex gap-1.5">
        {swatches.map((t) => (
          <span key={t} aria-hidden className="h-10 flex-1 rounded-md" style={{ backgroundColor: `var(--snt-${t})` }} />
        ))}
      </div>
      <div className="flex items-end gap-4">
        <span className="text-snt-48 font-semibold leading-none tracking-tight text-snt-text-primary">Aa</span>
        <div className="space-y-1.5 pb-1">
          <div className="h-2 w-28 rounded-full bg-snt-neutral-grey-300" />
          <div className="h-2 w-20 rounded-full bg-snt-neutral-grey-200" />
        </div>
      </div>
    </div>
  );
}

function ComponentsPreview() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Start scan</Button>
        <Button size="sm" intent="neutral" variant="outline">Cancel</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <SeverityBadge severity="critical" />
        <SeverityBadge severity="medium" />
        <Badge tone="success">Active</Badge>
      </div>
      <div className="flex items-center gap-3">
        <Switch checked variant="primary" aria-label="Preview switch" />
        <Checkbox checked label="Notify team" />
      </div>
    </div>
  );
}

function AccessibilityPreview() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex items-center gap-3">
        <span className="rounded-md px-3 py-1.5 text-snt-14 font-medium text-snt-text-primary ring-2 ring-snt-focus-ring ring-offset-2 ring-offset-snt-bg-subtle">
          Focus visible
        </span>
        <span className="rounded-md border border-snt-border-default bg-snt-surface-app px-2.5 py-1 font-mono text-snt-12 text-snt-text-primary">
          6.3 : 1 <span className="text-snt-scale-green-600">AA</span>
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-snt-12 text-snt-text-secondary">
        {["Tab", "↑", "↓", "Esc"].map((k) => (
          <kbd key={k} className="rounded border border-snt-border-strong bg-snt-surface-app px-2 py-0.5 font-mono text-snt-12 text-snt-text-primary">{k}</kbd>
        ))}
        <span className="ml-1">keyboard first</span>
      </div>
    </div>
  );
}

const BLOCKS = [
  {
    title: "Foundations",
    body: "Colour, type, spacing, elevation and icons — the tokens every component is built from, in light and dark.",
    href: "/styleguide/colors",
    preview: <FoundationsPreview />,
  },
  {
    title: "Components",
    body: "Accessible React components for forms, feedback, data and navigation, each with usage guidance and specs.",
    href: "/styleguide/components",
    preview: <ComponentsPreview />,
  },
  {
    title: "Accessibility",
    body: "WCAG 2.2 AA as part of the API: labels, focus, contrast and keyboard models from the WAI-ARIA patterns.",
    href: "/styleguide/accessibility",
    preview: <AccessibilityPreview />,
  },
];

const AI_FEATURES = [
  { icon: FileCode2, title: "llms.txt", body: "Every rule, token and component API in one file an agent can read." },
  { icon: Terminal,  title: "shadcn registry", body: "Install any component with one command — or let an agent do it through MCP." },
  { icon: ShieldCheck, title: "Lint guardrails", body: "ESLint rules reject hard-coded colours and unlabeled icon buttons." },
];

export default function HomePage() {
  const stats = systemStats();

  return (
    <>
      <Sidebar mobileOnly />
      <main id="main" className="relative flex-1 overflow-y-auto overflow-x-hidden">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-snt-border-default">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,var(--snt-border-default)_1px,transparent_1px),linear-gradient(to_bottom,var(--snt-border-default)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_65%)]"
          />
          <div className={`${container} relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr]`}>
            <div>
              <Link
                href="/styleguide/ai"
                className="inline-flex items-center gap-2 rounded-full border border-snt-border-default bg-snt-surface-app py-1 pl-1 pr-3 text-snt-12 text-snt-text-secondary transition-colors hover:border-snt-border-strong hover:text-snt-text-primary"
              >
                <span className="rounded-full bg-snt-bg-brand-subtle px-2 py-0.5 font-medium text-snt-text-brand">New</span>
                Built for AI agents
                <ArrowRight size={12} aria-hidden />
              </Link>
              <h1 className="mt-6 text-snt-48 font-semibold leading-[1.05] tracking-tight text-snt-text-primary">
                The design system for security products.
              </h1>
              <p className="mt-5 max-w-[540px] text-snt-18 leading-relaxed text-snt-text-secondary">
                Tokens, components and guidance for threat dashboards, scans and findings. Designed in Figma, built in
                React, and readable by AI agents.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={FIGMA_FILE_URL} target="_blank" rel="noreferrer" className={buttonVariants({ size: "lg" })}>
                  <FigmaMark size={15} /> Start designing <span className="sr-only">(opens Figma in a new tab)</span>
                </a>
                <Link href="/styleguide/overview" className={buttonVariants({ intent: "neutral", variant: "outline", size: "lg" })}>
                  Start developing <ArrowRight aria-hidden />
                </Link>
              </div>
              <p className="mt-6 flex items-center gap-2 text-snt-12 text-snt-text-secondary">
                <SentinelMark size={14} /> Open source · v{version} · by Laden Sojudi
              </p>
            </div>

            {/* Product shot — real components, not a screenshot */}
            <div
              role="group"
              aria-label="Live preview of Sentinel components"
              className="rounded-2xl border border-snt-border-default bg-snt-surface-app p-5 shadow-snt-xl sm:p-6"
            >
              <Tabs defaultValue="findings" className="gap-5">
                <TabsList aria-label="Preview sections">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="findings" count={12}>Findings</TabsTrigger>
                  <TabsTrigger value="assets">Assets</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="mt-5 grid items-center gap-5 sm:grid-cols-[auto_1fr]">
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
              <div className="mt-5 grid items-end gap-4 sm:grid-cols-2">
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
                </div>
                <Button size="sm">Start scan</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── At a glance ──────────────────────────────────────────────── */}
        <section aria-label="System at a glance" className="border-b border-snt-border-default">
          <dl className={`${container} grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4`}>
            {[
              [String(stats.components), "Components"],
              [String(stats.tokens), "Design tokens"],
              ["WCAG 2.2", "AA target"],
              ["Light · Dark", "One token source"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-snt-14 text-snt-text-secondary">{label}</dt>
                <dd className="mt-1 text-snt-24 font-semibold tracking-tight text-snt-text-primary tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Building blocks ──────────────────────────────────────────── */}
        <section className={`${container} py-20`}>
          <SectionHeading
            eyebrow="Building blocks"
            title="Everything you need to build a security product"
            lede="Start from the foundations, compose accessible components, and ship screens made for the way security teams work."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {BLOCKS.map((b) => (
              // Stretched-link card: the title link covers the card, and the
              // preview is inert, so no interactive element sits inside the link.
              <div
                key={b.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-snt-border-default bg-snt-surface-app transition-colors hover:border-snt-border-strong has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-snt-focus-ring"
              >
                <div inert className="h-44 border-b border-snt-border-default bg-snt-bg-subtle p-6">{b.preview}</div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-snt-18 font-semibold text-snt-text-primary">
                    <Link href={b.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                      {b.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-snt-14 leading-relaxed text-snt-text-secondary">{b.body}</p>
                  <span aria-hidden className="mt-5 inline-flex items-center gap-1 text-snt-14 font-medium text-snt-text-brand">
                    Explore {b.title.toLowerCase()}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Two audiences ────────────────────────────────────────────── */}
        <section className="border-y border-snt-border-default bg-snt-bg-subtle">
          <div className={`${container} grid gap-5 py-20 md:grid-cols-2`}>
            <div className="min-w-0 rounded-2xl border border-snt-border-default bg-snt-surface-app p-6 sm:p-8">
              <span className="flex size-10 items-center justify-center rounded-lg bg-snt-bg-brand-subtle text-snt-text-brand">
                <FigmaMark size={18} />
              </span>
              <h3 className="mt-5 text-snt-20 font-semibold text-snt-text-primary">For designers</h3>
              <p className="mt-2 text-snt-14 leading-relaxed text-snt-text-secondary">
                A Figma library with the same names as the code: variables for light and dark, text styles, icons and a
                component for every element on this site.
              </p>
              <a
                href={FIGMA_FILE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1 text-snt-14 font-medium text-snt-text-brand hover:underline"
              >
                Open the Figma library <ArrowUpRight size={14} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
            <div className="min-w-0 rounded-2xl border border-snt-border-default bg-snt-surface-app p-6 sm:p-8">
              <span className="flex size-10 items-center justify-center rounded-lg bg-snt-bg-brand-subtle text-snt-text-brand">
                <Terminal size={18} aria-hidden />
              </span>
              <h3 className="mt-5 text-snt-20 font-semibold text-snt-text-primary">For developers</h3>
              <p className="mt-2 text-snt-14 leading-relaxed text-snt-text-secondary">
                Copy-paste React components on Tailwind v4 — you own the code. Add the theme once, then install any
                component with one command.
              </p>
              <pre className="mt-5 overflow-x-auto rounded-lg bg-snt-neutral-grey-900 px-4 py-3 font-mono text-snt-12 text-snt-neutral-grey-100">
                <code>npx shadcn@latest add &lt;site&gt;/r/button.json</code>
              </pre>
              <Link href="/styleguide/overview" className="mt-5 inline-flex items-center gap-1 text-snt-14 font-medium text-snt-text-brand hover:underline">
                Installation guide <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Built for AI ─────────────────────────────────────────────── */}
        <section className={`${container} grid gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center`}>
          <div>
            <SectionHeading
              eyebrow="Built for AI"
              title="Agents build with the system, not around it"
              lede="Point an AI coding tool at Sentinel and it uses the real components and tokens — instead of inventing its own."
            />
            <ul className="mt-8 space-y-5">
              {AI_FEATURES.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-snt-border-default text-snt-text-brand">
                    <Icon size={16} aria-hidden />
                  </span>
                  <div>
                    <p className="text-snt-14 font-semibold text-snt-text-primary">{title}</p>
                    <p className="mt-0.5 text-snt-14 leading-relaxed text-snt-text-secondary">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/styleguide/ai" className={`${buttonVariants({ intent: "neutral", variant: "outline" })} mt-8`}>
              <Bot aria-hidden /> How it works
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-snt-border-default bg-snt-neutral-grey-900 shadow-snt-xl">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
              <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
              <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
              <span className="ml-3 text-snt-12 text-white/50">Prompt</span>
            </div>
            <div className="space-y-4 p-6 font-mono text-snt-12 leading-relaxed">
              <p className="text-white/90">
                <span className="text-white/40">&gt; </span>Build a findings page. Use the Sentinel design system: &lt;site&gt;/llms.txt
              </p>
              <p className="flex items-center gap-2 text-white/50">
                <Sparkles size={13} aria-hidden /> Reading llms.txt · installing @sentinel/data-table, severity-badge
              </p>
              <pre className="overflow-x-auto text-white/80">{`<DataTable>
  <DataTableHeader title="Findings" description="12 open" />
  …
  <SeverityBadge severity="critical" score={9.8} />
</DataTable>`}</pre>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}

import type { Metadata } from "next";
import { FileText, FileJson, Package, ShieldCheck, Bot, Palette, ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { SectionTitle } from "@/components/styleguide/section-title";
import { HighlightedCode } from "@/components/styleguide/highlighted-code";

export const metadata: Metadata = {
  title: "Built for AI — Sentinel Design System",
  description: "How Sentinel makes coding agents use the design system correctly: llms.txt, a typed manifest, a shadcn registry and lint guardrails.",
};

const SITE = (process.env.SITE_URL ?? "https://<your-styleguide-domain>").replace(/\/$/, "");

const PACKAGE = [
  { icon: FileText, file: "/llms.txt",            title: "llms.txt",            body: "Entry point for agents: the rules, setup and a link to every component's docs and source." },
  { icon: FileText, file: "/llms-full.txt",       title: "llms-full.txt",       body: "Everything in one file (~70k tokens): rules, theme CSS, every doc followed by its source." },
  { icon: FileJson, file: "/sentinel-manifest.json",   title: "sentinel-manifest.json",   body: "Structured data generated from the TypeScript source: props, types, defaults, status, when to use." },
  { icon: Package,  file: "/r/registry.json",     title: "shadcn registry",     body: "Every component installable with one command — dependencies, theme and cn() resolved for you." },
  { icon: Palette,  file: "/theme.css",           title: "theme.css",           body: "All tokens for light and dark plus the Tailwind v4 @theme mapping, ready to import." },
  { icon: ShieldCheck, file: "/eslint-plugin-sentinel.mjs", title: "eslint-plugin-sentinel", body: "Lint rules that reject hard-coded colours and unlabeled icon buttons, and autofix primitives." },
  { icon: Bot,      file: "/AGENTS.template.md",  title: "AGENTS.md template",  body: "A rules file for consumer repos. Claude, Cursor and Copilot read it automatically." },
];

const RULES = [
  ["sentinel/no-hardcoded-colors", "error", "#1383d4, rgb(…), bg-red-500, bg-[#fff]"],
  ["sentinel/icon-only-needs-label", "error", "<Button iconOnly> without aria-label"],
  ["sentinel/prefer-semantic-tokens", "warn · autofix", "border-snt-neutral-divider-10 → border-snt-border-default"],
  ["sentinel/no-arbitrary-values", "warn", "text-[13px], p-[7px] instead of the scale"],
  ["sentinel/no-deprecated-components", "warn", "importing Banner"],
];

export default function AiPage() {
  return (
    <>
      <PageHero
        category="Get started"
        title="Built for AI"
        status="beta"
        description="Coding agents copy whatever they see. Sentinel gives them the right thing to copy — rules they can read, data they can parse, a command to install components, and lint errors when they drift."
      />
      <PageBody>
        <section>
          <SectionTitle kicker="Read · Install · Verify">How an agent uses Sentinel</SectionTitle>
          <ol className="grid gap-4 md:grid-cols-3">
            {[
              ["1", "Read the rules", "The agent starts at llms.txt (or the repo's AGENTS.md) and looks up props in the manifest."],
              ["2", "Install, don't rewrite", "Components come from the registry with npx shadcn add — no hand-written copies."],
              ["3", "Lint before finishing", "eslint-plugin-sentinel turns off-system code into errors the agent must fix."],
            ].map(([n, title, body]) => (
              <li key={n} className="rounded-xl border border-snt-border-default p-5">
                <div className="w-7 h-7 rounded-full bg-snt-bg-brand-subtle text-snt-text-brand text-snt-12 font-semibold flex items-center justify-center">{n}</div>
                <div className="mt-3 text-snt-14 font-semibold text-snt-text-primary">{title}</div>
                <p className="mt-1.5 text-snt-12 leading-relaxed text-snt-text-secondary">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <SectionTitle kicker="Generated on every build">The AI package</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {PACKAGE.map(({ icon: Icon, file, title, body }) => (
              <a
                key={file}
                href={file}
                target="_blank"
                rel="noreferrer"
                className="group flex gap-3 rounded-xl border border-snt-border-default p-4 transition-colors hover:border-snt-border-strong hover:bg-snt-surface-row-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
              >
                <Icon size={18} aria-hidden className="mt-0.5 shrink-0 text-snt-text-brand" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 font-mono text-snt-12 font-medium text-snt-text-primary">
                    {title}
                    <ArrowUpRight size={12} aria-hidden className="text-snt-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mt-1 text-snt-12 leading-relaxed text-snt-text-secondary">{body}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <SectionTitle kicker="Consumer projects">Install with the shadcn CLI</SectionTitle>
          <p className="mb-4 text-snt-14 leading-relaxed text-snt-text-secondary max-w-[640px]">
            Register Sentinel once in <code className="font-mono text-snt-12 text-snt-text-primary">components.json</code>. The same entry lets the shadcn MCP server list and search Sentinel components for your agent.
          </p>
          <HighlightedCode lang="json" code={`{
  "registries": {
    "@sentinel": "${SITE}/r/{name}.json"
  }
}`} />
          <div className="mt-3">
            <HighlightedCode lang="bash" code={`# once: tokens + cn()
npx shadcn add @sentinel/theme @sentinel/utils

# then any component
npx shadcn add @sentinel/button @sentinel/select @sentinel/modal

# optional: let your agent browse the registry
npx shadcn mcp init`} />
          </div>
        </section>

        <section className="mt-14">
          <SectionTitle kicker="Guardrails">Lint rules that keep output on-system</SectionTitle>
          <div className="overflow-x-auto rounded-xl border border-snt-border-default">
            <table className="w-full text-left text-snt-12">
              <thead className="bg-snt-bg-subtle text-snt-text-secondary">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">Rule</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Level</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Catches</th>
                </tr>
              </thead>
              <tbody>
                {RULES.map(([rule, level, catches]) => (
                  <tr key={rule} className="border-t border-snt-border-default">
                    <td className="px-4 py-2.5 font-mono text-snt-text-primary whitespace-nowrap">{rule}</td>
                    <td className="px-4 py-2.5 text-snt-text-secondary whitespace-nowrap">{level}</td>
                    <td className="px-4 py-2.5 font-mono text-snt-text-secondary">{catches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <HighlightedCode lang="js" code={`// eslint.config.mjs
import sentinel from "./eslint-plugin-sentinel.mjs";

export default [
  // …your config
  sentinel.configs.recommended,
];`} />
          </div>
        </section>

        <section className="mt-14">
          <SectionTitle kicker="Why it matters">Designed for both readers</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-snt-border-default p-5">
              <div className="text-snt-14 font-semibold text-snt-text-primary">What helps AI helps people</div>
              <p className="mt-2 text-snt-12 leading-relaxed text-snt-text-secondary">
                Consistent names (lowercase states, <code className="font-mono">tone</code> everywhere), semantic tokens instead of raw scales and an explicit “when not to use” on every page make the system easier for designers and developers too.
              </p>
            </div>
            <div className="rounded-xl border border-snt-border-default p-5">
              <div className="text-snt-14 font-semibold text-snt-text-primary">One source, many outputs</div>
              <p className="mt-2 text-snt-12 leading-relaxed text-snt-text-secondary">
                Docs, tokens and components live in the repo; the site, the Figma library and the AI package are generated from them — so none of them can drift on its own.
              </p>
            </div>
          </div>
        </section>
      </PageBody>
    </>
  );
}

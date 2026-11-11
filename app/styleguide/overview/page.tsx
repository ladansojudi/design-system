import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { SectionTitle } from "@/components/styleguide/section-title";
import { OriginCode } from "@/components/styleguide/origin-code";
import { FIGMA_FILE_URL } from "@/components/styleguide/figma-data";

export const metadata: Metadata = {
  title: "Introduction — Sentinel Design System",
  description: "How to start with Sentinel: the Figma library for designers, a one-command install for developers, and llms.txt for AI agents.",
};

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="relative pl-12">
      <span
        aria-hidden
        className="absolute left-0 top-0 flex size-8 items-center justify-center rounded-full bg-snt-bg-subtle text-snt-14 font-semibold text-snt-text-primary"
      >
        {n}
      </span>
      <h3 className="pt-1 text-snt-16 font-semibold text-snt-text-primary">{title}</h3>
      <div className="mt-2 space-y-3 text-snt-14 leading-relaxed text-snt-text-secondary">{children}</div>
    </li>
  );
}

function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="space-y-10">{children}</ol>;
}

function Code({ children }: { children: string }) {
  return <code className="rounded bg-snt-bg-subtle px-1.5 py-0.5 font-mono text-snt-12 text-snt-text-primary">{children}</code>;
}

const NEXT = [
  { title: "Components", body: "Browse every component with usage, specs and code.", href: "/styleguide/components" },
  { title: "Foundations", body: "Colour, type, spacing and the tokens behind them.", href: "/styleguide/colors" },
  { title: "Accessibility", body: "How Sentinel meets WCAG 2.2 AA, and what you still own.", href: "/styleguide/accessibility" },
];

export default function IntroductionPage() {
  return (
    <>
      <PageHero
        category="Get started"
        title="Introduction"
        description="Sentinel is an open design system for cybersecurity products. Pick your path: design in Figma, build in React, or let an AI agent build with it."
      />

      <PageBody>
        <div className="max-w-3xl space-y-16">
          <section>
            <SectionTitle>For designers</SectionTitle>
            <Steps>
              <Step n={1} title="Open the Figma library">
                <p>
                  The library has a component for every element on this site, colour variables for light and dark, and
                  text styles — named exactly like the code tokens.
                </p>
                <a
                  href={FIGMA_FILE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-snt-text-brand hover:underline"
                >
                  Open in Figma <ArrowUpRight size={14} aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Step>
              <Step n={2} title="Add it to your files">
                <p>
                  Duplicate the file into your team and publish it as a library (Assets → Libraries → Publish). Then turn it
                  on in any file to use the components.
                </p>
              </Step>
              <Step n={3} title="Design with components, not copies">
                <p>
                  Drag components from the Assets panel and change them through their properties (intent, variant, size)
                  instead of detaching. Read each component&apos;s Usage tab before designing a new flow.
                </p>
              </Step>
            </Steps>
          </section>

          <section>
            <SectionTitle>For developers</SectionTitle>
            <p className="mb-8 text-snt-14 leading-relaxed text-snt-text-secondary">
              Requires React 19, Tailwind CSS v4 and a project set up for the shadcn CLI (<Code>npx shadcn@latest init</Code>).
              Components are copied into your project — you own the code.
            </p>
            <Steps>
              <Step n={1} title="Add the Sentinel registry">
                <p>In <Code>components.json</Code>:</p>
                <OriginCode lang="json" code={`"registries": {\n  "@sentinel": "{origin}/r/{name}.json"\n}`} className="rounded-lg" />
              </Step>
              <Step n={2} title="Install the theme once">
                <p>Adds every <Code>--snt-*</Code> token for light and dark. Import the CSS file it creates after <Code>@import &quot;tailwindcss&quot;;</Code>.</p>
                <OriginCode lang="bash" code="npx shadcn@latest add @sentinel/theme" className="rounded-lg" />
              </Step>
              <Step n={3} title="Add components as you need them">
                <p>Each component brings what it depends on, including the <Code>cn()</Code> helper.</p>
                <OriginCode lang="bash" code="npx shadcn@latest add @sentinel/button @sentinel/severity-badge" className="rounded-lg" />
              </Step>
              <Step n={4} title="Use them">
                <OriginCode
                  lang="tsx"
                  code={`import { Button } from "@/components/ui/button";\n\nexport function ScanActions() {\n  return <Button>Start scan</Button>;\n}`}
                  className="rounded-lg"
                />
              </Step>
            </Steps>
          </section>

          <section>
            <SectionTitle>With an AI agent</SectionTitle>
            <p className="mb-5 text-snt-14 leading-relaxed text-snt-text-secondary">
              Give your coding agent the system&apos;s rules and it uses the real components and tokens instead of inventing
              its own. Start your prompt with:
            </p>
            <OriginCode lang="bash" code="Use the Sentinel design system: {origin}/llms.txt" className="rounded-lg" />
            <p className="mt-5 text-snt-14 leading-relaxed text-snt-text-secondary">
              For a project that keeps using Sentinel, add the rules file and lint guardrails too.{" "}
              <Link href="/styleguide/ai" className="font-medium text-snt-text-brand hover:underline">How it works</Link>
            </p>
          </section>

          <section>
            <SectionTitle>Next steps</SectionTitle>
            <ul className="grid gap-4 sm:grid-cols-3">
              {NEXT.map((n) => (
                <li key={n.title} className="group relative rounded-xl border border-snt-border-default p-5 transition-colors hover:border-snt-border-strong has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-snt-focus-ring">
                  <h3 className="text-snt-14 font-semibold text-snt-text-primary">
                    <Link href={n.href} className="after:absolute after:inset-0 focus-visible:outline-none">{n.title}</Link>
                  </h3>
                  <p className="mt-1.5 text-snt-14 leading-relaxed text-snt-text-secondary">{n.body}</p>
                  <ArrowRight size={14} aria-hidden className="mt-3 text-snt-text-brand transition-transform group-hover:translate-x-0.5" />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </PageBody>
    </>
  );
}

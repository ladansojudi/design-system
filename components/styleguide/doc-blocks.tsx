import type React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Shared building blocks for component pages on the four-tab template.
// Usage-tab subsections are <h3> (under a DocSection <h2>); Specs-tab sections
// are <h2> (directly under the page <h1>). The hidden ▶▶ marker feeds PageTOC.

export function SubSection({ title, lede, children }: { title: string; lede?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span aria-hidden className="hidden">▶▶</span>
          <h3 className="text-snt-16 font-semibold text-snt-text-primary">{title}</h3>
        </div>
        {lede && <p className="mt-1 max-w-2xl text-snt-14 leading-relaxed text-snt-text-secondary">{lede}</p>}
      </div>
      {children}
    </div>
  );
}

export function SpecSection({ title, lede, children }: { title: string; lede?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span aria-hidden className="hidden">▶▶</span>
          <h2 className="text-snt-20 font-semibold tracking-tight text-snt-text-primary">{title}</h2>
        </div>
        {lede && <p className="mt-1.5 max-w-2xl text-snt-14 leading-relaxed text-snt-text-secondary">{lede}</p>}
      </div>
      {children}
    </section>
  );
}

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-snt-border-default px-6 py-2", className)}>{children}</div>;
}

export function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 border-b border-snt-border-default py-4 last:border-b-0 sm:grid-cols-[128px_minmax(0,1fr)] sm:items-center sm:gap-6">
      <span className="text-snt-12 font-medium text-snt-text-secondary">{label}</span>
      <div className="flex min-w-0 flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/** A single live example on a neutral stage. */
export function Stage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4 rounded-xl border border-snt-border-default px-6 py-8", className)}>
      {children}
    </div>
  );
}

export function WhenToUse({ use, avoid }: { use: React.ReactNode[]; avoid: React.ReactNode[] }) {
  return (
    <SubSection title="When to use">
    <div className="grid gap-4 md:grid-cols-2">
      {[
        { title: "Use it to", items: use, icon: <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-snt-scale-green-600" /> },
        { title: "Don't use it to", items: avoid, icon: <X size={16} aria-hidden className="mt-0.5 shrink-0 text-snt-text-error" /> },
      ].map((col) => (
        <div key={col.title} className="rounded-xl border border-snt-border-default p-5">
          <h4 className="text-snt-14 font-semibold text-snt-text-primary">{col.title}</h4>
          <ul className="mt-3 space-y-2.5">
            {col.items.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-snt-14 leading-relaxed text-snt-text-primary">
                {col.icon}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </SubSection>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-snt-bg-subtle px-1 py-0.5 font-mono text-snt-12 text-snt-text-primary">{children}</code>;
}

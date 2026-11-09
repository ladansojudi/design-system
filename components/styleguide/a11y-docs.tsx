"use client";

import type React from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useTokenValue } from "@/components/styleguide/specs";
import { cn } from "@/lib/utils";

// Building blocks for a component's Accessibility tab. Headings are <h2>: the
// tab content sits directly under the page <h1>.

export function A11ySection({ title, lede, children }: { title: string; lede?: string; children: React.ReactNode }) {
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

/** The WAI-ARIA Authoring Practices pattern the component follows. */
export function ApgPattern({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="relative inline-flex items-center gap-1.5 rounded-lg border border-snt-border-default px-3 py-2 text-snt-14 text-snt-text-primary transition-colors hover:border-snt-border-strong"
    >
      WAI-ARIA pattern: <span className="font-medium">{name}</span>
      <ArrowUpRight size={14} aria-hidden className="text-snt-text-secondary" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function KeyboardTable({ rows }: { rows: { keys: string[]; action: string }[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-snt-border-default">
      <table className="w-full text-left">
        <thead className="bg-snt-bg-subtle">
          <tr>
            <th scope="col" className="w-48 px-4 py-2.5 text-snt-12 font-medium text-snt-text-secondary">Key</th>
            <th scope="col" className="px-4 py-2.5 text-snt-12 font-medium text-snt-text-secondary">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.keys.join("+")} className="border-t border-snt-border-default">
              <td className="px-4 py-3">
                <span className="flex flex-wrap items-center gap-1">
                  {r.keys.map((k, i) => (
                    <span key={k} className="flex items-center gap-1">
                      {i > 0 && <span aria-hidden className="text-snt-12 text-snt-text-secondary">/</span>}
                      <kbd className="rounded border border-snt-border-strong bg-snt-surface-app px-1.5 py-0.5 font-mono text-snt-12 text-snt-text-primary">{k}</kbd>
                    </span>
                  ))}
                </span>
              </td>
              <td className="px-4 py-3 text-snt-14 text-snt-text-primary">{r.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A checklist of what the component does, or what the consumer must do. */
export function A11yList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="max-w-3xl space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-snt-14 leading-relaxed text-snt-text-primary">
          <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-snt-scale-green-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ── Live contrast ─────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.match(/^#([0-9a-f]{6})/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminance([r, g, b]: [number, number, number]) {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(a: string, b: string): number | null {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  if (!x || !y) return null;
  const [hi, lo] = [luminance(x), luminance(y)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
}

function ContrastRow({ label, fg, bg, min }: { label: string; fg: string; bg: string; min: number }) {
  const fgHex = useTokenValue(fg);
  const bgHex = useTokenValue(bg);
  const r = ratio(fgHex, bgHex);
  const pass = r !== null && r >= min;
  return (
    <tr className="border-t border-snt-border-default">
      <td className="px-4 py-3">
        <span className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-7 w-10 items-center justify-center rounded-md border border-snt-border-default text-snt-12 font-semibold"
            style={{ backgroundColor: `var(--snt-${bg})`, color: `var(--snt-${fg})` }}
          >
            Aa
          </span>
          <span className="text-snt-14 text-snt-text-primary">{label}</span>
        </span>
      </td>
      <td className="hidden px-4 py-3 font-mono text-snt-12 text-snt-text-secondary md:table-cell">{fg} on {bg}</td>
      <td className="px-4 py-3 font-mono text-snt-14 tabular-nums text-snt-text-primary">{r ? `${r.toFixed(2)} : 1` : "—"}</td>
      <td className="px-4 py-3">
        {r !== null && (
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-snt-12 font-medium",
              pass ? "bg-snt-bg-success-subtle text-snt-scale-green-600" : "bg-snt-bg-error-subtle text-snt-text-error",
            )}
          >
            {pass ? "Pass" : "Fail"} · {min}:1
          </span>
        )}
      </td>
    </tr>
  );
}

/**
 * Contrast pairs computed live from the tokens in the current theme, so the
 * numbers can't drift. `min` is 4.5 for text, 3 for non-text (borders, rings).
 */
export function ContrastTable({ rows }: { rows: { label: string; fg: string; bg: string; min: number }[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-snt-border-default">
      <table className="w-full text-left">
        <thead className="bg-snt-bg-subtle">
          <tr>
            <th scope="col" className="px-4 py-2.5 text-snt-12 font-medium text-snt-text-secondary">Pair</th>
            <th scope="col" className="hidden px-4 py-2.5 text-snt-12 font-medium text-snt-text-secondary md:table-cell">Tokens</th>
            <th scope="col" className="px-4 py-2.5 text-snt-12 font-medium text-snt-text-secondary">Ratio</th>
            <th scope="col" className="px-4 py-2.5 text-snt-12 font-medium text-snt-text-secondary">WCAG 2.2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => <ContrastRow key={r.label} {...r} />)}
        </tbody>
      </table>
    </div>
  );
}

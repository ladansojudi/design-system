"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { TokenExportTabs } from "@/components/styleguide/token-export-tabs";
import { HighlightedCode } from "@/components/styleguide/highlighted-code";

// ── Code block helper ───────────────────────────────────────────────────────

function CodeBlock({ code, lang = "css" }: { code: string; lang?: "css" | "html" }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    void navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="border border-snt-neutral-divider-10 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-4 py-2 bg-snt-surface-table-header">
        <span className="text-[10px] uppercase tracking-widest text-snt-text-disabled font-mono">{lang}</span>
        <button
          type="button"
          onClick={onCopy}
          className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium cursor-pointer transition-colors",
            copied
              ? "bg-snt-scale-green-500/15 text-snt-scale-green-600"
              : "text-snt-text-secondary hover:text-snt-text-primary hover:bg-snt-neutral-grey-100",
          )}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <HighlightedCode code={code} lang={lang} className="max-h-[420px]" />
    </div>
  );
}

// ── Layout helpers ─────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">{children}</p>
  );
}

function TokenChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-[3px] bg-snt-neutral-grey-100 font-mono text-[11px] text-snt-text-primary">
      {name}
    </span>
  );
}

// ── Section: Convention ────────────────────────────────────────────────────

function Convention() {
  return (
    <section>
      <SectionTitle>Convention</SectionTitle>
      <Lede>
        Every token follows <code className="font-mono text-snt-text-primary">--snt-&lt;category&gt;-&lt;role&gt;-&lt;scale&gt;</code>.
        Categories tell you what kind of token; roles describe semantic use; scale is the visual step (50–800 for colors, sm/md/lg for radii, etc.).
      </Lede>

      <div className="border border-snt-neutral-divider-10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-[120px_120px_1fr] text-[12px]">
          <div className="px-4 py-2 bg-snt-surface-table-header text-[10px] uppercase tracking-widest text-snt-text-disabled font-medium border-b border-snt-neutral-divider-10 sm:border-r">Category</div>
          <div className="px-4 py-2 bg-snt-surface-table-header text-[10px] uppercase tracking-widest text-snt-text-disabled font-medium border-b border-snt-neutral-divider-10 sm:border-r">Role</div>
          <div className="px-4 py-2 bg-snt-surface-table-header text-[10px] uppercase tracking-widest text-snt-text-disabled font-medium border-b border-snt-neutral-divider-10">Example</div>

          {[
            { cat: "brand",     role: "primary, secondary",    ex: "--snt-brand-primary-500"     },
            { cat: "scale",     role: "blue, green, red, …",   ex: "--snt-scale-red-600"         },
            { cat: "neutral",   role: "grey, divider",         ex: "--snt-neutral-grey-100"      },
            { cat: "text",      role: "primary, secondary, link, error, on-accent", ex: "--snt-text-link" },
            { cat: "surface",   role: "app, row, table-header", ex: "--snt-surface-app"          },
            { cat: "btn",       role: "primary-600, error-700", ex: "--snt-btn-primary-600"      },
            { cat: "severity",  role: "info, low, medium, high, critical", ex: "--snt-severity-critical" },
            { cat: "shadow",    role: "xs, sm, md, lg",         ex: "--snt-shadow-sm"             },
          ].map(({ cat, role, ex }) => (
            <div key={cat} className="contents">
              <div className="px-4 py-2.5 border-b border-snt-neutral-divider-10 sm:border-r font-mono text-[12px] text-snt-brand-primary-500">{cat}</div>
              <div className="px-4 py-2.5 border-b border-snt-neutral-divider-10 sm:border-r text-snt-text-secondary">{role}</div>
              <div className="px-4 py-2.5 border-b border-snt-neutral-divider-10 font-mono text-[12px] text-snt-text-primary">{ex}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: Light & Dark ──────────────────────────────────────────────────

const THEMING_CSS = `/* app/globals.css */

/* Light values (default) */
:root,
[data-snt-theme="light"] {
  --snt-text-primary:   #121f28;
  --snt-text-inverse:   #ffffff;
  --snt-text-link:      #0066cc;
  --snt-surface-app:    #ffffff;
  /* …23 colors total */
}

/* Dark values — flipped */
[data-snt-theme="dark"] {
  --snt-text-primary:   #ffffff;
  --snt-text-inverse:   #121f28;
  --snt-text-link:      #56b3ff;
  --snt-surface-app:    #0f1010;
  /* …same keys, different hex */
}`;

const THEMING_HTML = `<!-- Switch the theme by setting the attribute on <html>. -->
<html data-snt-theme="dark">
  <!-- … -->
</html>

<!-- Or toggle the .dark class — both are wired. -->
<html class="dark">
  <!-- … -->
</html>`;

function LightAndDark() {
  return (
    <section>
      <SectionTitle>Two themes, one attribute</SectionTitle>
      <Lede>
        Light and dark live in the same stylesheet as two CSS blocks scoped by
        <code className="font-mono text-snt-text-primary"> [data-snt-theme]</code> on the root element.
        Components don&rsquo;t know which mode is active — they only read the named tokens. Flipping the attribute
        swaps every token at once.
      </Lede>
      <div className="grid sm:grid-cols-2 gap-4">
        <CodeBlock code={THEMING_CSS} lang="css" />
        <CodeBlock code={THEMING_HTML} lang="html" />
      </div>
    </section>
  );
}

// ── Section: Three flavors of tokens ───────────────────────────────────────

function ThreeFlavors() {
  return (
    <section>
      <SectionTitle>Three flavors of tokens</SectionTitle>
      <Lede>
        Not every token flips. Pick the right kind so components stay correct in both modes without conditionals.
      </Lede>

      <div className="space-y-3">
        <div className="border border-snt-neutral-divider-10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-snt-brand-primary-500" />
            <h3 className="text-[14px] font-semibold text-snt-text-primary">Semantic · theme-aware</h3>
            <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-snt-brand-primary-500/10 text-snt-brand-primary-500">Reach for these first</span>
          </div>
          <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-3">
            Flip with the theme. Use them for body text, links, surfaces, dividers — anything that should automatically read against the current background.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["text-primary", "text-secondary", "text-disabled", "text-inverse", "text-link", "text-error", "surface-app", "surface-row", "surface-table-header", "neutral-divider-10"].map((t) => (
              <TokenChip key={t} name={`snt-${t}`} />
            ))}
          </div>
        </div>

        <div className="border border-snt-neutral-divider-10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-snt-btn-warning-600" />
            <h3 className="text-[14px] font-semibold text-snt-text-primary">Static · same in both modes</h3>
          </div>
          <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-3">
            Identical in light and dark. Use for accent fills that should never flip — button backgrounds, brand colors, severity indicators.
            Pair with <TokenChip name="snt-text-on-accent" /> for guaranteed contrast.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["btn-primary-600", "btn-primary-700", "btn-error-600", "btn-error-700", "btn-success-600", "btn-warning-600", "severity-info", "severity-low", "severity-medium", "severity-high", "severity-critical", "text-on-accent"].map((t) => (
              <TokenChip key={t} name={`snt-${t}`} />
            ))}
          </div>
        </div>

        <div className="border border-snt-neutral-divider-10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-snt-neutral-grey-500" />
            <h3 className="text-[14px] font-semibold text-snt-text-primary">Scale · raw primitives</h3>
          </div>
          <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-3">
            The lowest layer. Most of these flip in dark mode (e.g. <TokenChip name="snt-brand-primary-50" /> swaps with <TokenChip name="snt-brand-primary-800" />). Prefer a semantic token over a raw scale step.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["brand-primary-50", "brand-primary-500", "brand-primary-800", "scale-red-500", "scale-green-600", "neutral-grey-100", "neutral-grey-900"].map((t) => (
              <TokenChip key={t} name={`snt-${t}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Customize ─────────────────────────────────────────────────────

const CUSTOM_CSS = `/* my-app/globals.css — after importing tokens.css */

/* Brand the system for your product. Override only the values you want
   to change; everything else inherits the Sentinel defaults. */
:root,
[data-snt-theme="light"] {
  --snt-brand-primary-500: #6d28d9;  /* violet */
  --snt-brand-primary-600: #5b21b6;
  --snt-brand-primary-700: #4c1d95;

  --snt-btn-primary-600:   #5b21b6;
  --snt-btn-primary-700:   #4c1d95;

  --snt-text-link:         #6d28d9;
}

[data-snt-theme="dark"] {
  --snt-brand-primary-500: #a78bfa;
  --snt-brand-primary-600: #c4b5fd;
  --snt-text-link:         #c4b5fd;
}`;

function Customize() {
  return (
    <section>
      <SectionTitle>Customize the theme</SectionTitle>
      <Lede>
        Install the tokens once, then override only the values you want to change. Components read semantic tokens —
        change <TokenChip name="snt-brand-primary-500" /> and every primary surface picks it up.
      </Lede>
      <CodeBlock code={CUSTOM_CSS} lang="css" />
      <p className="mt-3 text-[12px] text-snt-text-secondary leading-relaxed max-w-2xl">
        Place your override block <em>after</em> the imported <code className="font-mono text-snt-text-primary">tokens.css</code> so the cascade picks your values.
        The dark-mode block only needs the keys you&rsquo;re changing; the rest fall through to the Sentinel dark defaults.
      </p>
    </section>
  );
}

// ── Section: Live preview ──────────────────────────────────────────────────

function PreviewTile({ scheme }: { scheme: "light" | "dark" }) {
  return (
    <div
      data-snt-theme={scheme}
      className={cn(
        "border rounded-xl p-5 space-y-3",
        scheme === "light"
          ? "border-snt-neutral-divider-10 bg-white"
          : "border-white/10 bg-[#0f1010]",
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn("text-[10px] uppercase tracking-widest font-medium", scheme === "light" ? "text-snt-text-disabled" : "text-white/40")}>
          {scheme}
        </span>
        <span className="font-mono text-[10px] text-snt-text-disabled">data-snt-theme=&quot;{scheme}&quot;</span>
      </div>

      <h4 className={cn("text-[15px] font-semibold", scheme === "light" ? "text-snt-text-primary" : "text-white")}>
        Asset health is dropping
      </h4>
      <p className={cn("text-[12px] leading-relaxed", scheme === "light" ? "text-snt-text-secondary" : "text-white/60")}>
        12 endpoints missed their last weekly scan. Review them and reschedule before the SLA window closes.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-snt-btn-primary-600 text-snt-text-on-accent text-[14px] font-medium hover:bg-snt-btn-primary-700 transition-colors"
        >
          Review now
        </button>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center h-9 px-4 rounded-md border text-[14px] font-medium transition-colors",
            scheme === "light"
              ? "border-snt-neutral-grey-300 text-snt-text-primary hover:bg-snt-neutral-grey-100"
              : "border-white/15 text-white hover:bg-white/5",
          )}
        >
          Dismiss
        </button>
        <a
          href="#"
          className="inline-flex items-center text-[14px] font-medium underline-offset-2 hover:underline"
          style={{ color: scheme === "light" ? "#0066cc" : "#56b3ff" }}
        >
          View dashboard
        </a>
      </div>
    </div>
  );
}

function LivePreview() {
  return (
    <section>
      <SectionTitle>Same tokens, both modes</SectionTitle>
      <Lede>
        Identical markup. The only thing that differs between the two cards is the <code className="font-mono text-snt-text-primary">data-snt-theme</code> attribute on the wrapper.
        The semantic tokens (text, surface, divider) flip; <TokenChip name="snt-btn-primary-600" /> stays the same exact blue.
      </Lede>
      <div className="grid sm:grid-cols-2 gap-4">
        <PreviewTile scheme="light" />
        <PreviewTile scheme="dark" />
      </div>
    </section>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

export function ThemingShowcase() {
  return (
    <div className="space-y-10">
      <Convention />
      <LightAndDark />
      <ThreeFlavors />
      <Customize />
      <LivePreview />

      <TokenExportTabs
        slugOverride="_all"
        title="Install once"
        badge="All tokens · all platforms"
        intro={
          <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
            The complete snt-* token set — every color, spacing, radius, border width, font size, font weight, and focus
            ring used in the system. Drop the file matching your platform into your project:{" "}
            <code className="font-mono text-snt-text-primary">app/globals.css</code> (web),{" "}
            <code className="font-mono text-snt-text-primary">Tokens.swift</code> (iOS), or{" "}
            <code className="font-mono text-snt-text-primary">res/values/tokens.xml</code> (Android). Auto-generated by{" "}
            <code className="font-mono text-snt-text-primary">scripts/export-tokens.js</code>.
          </p>
        }
      />
    </div>
  );
}

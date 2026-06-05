"use client";

import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { cn } from "@/lib/utils";

// ── Shared syntax highlighter ───────────────────────────────────────────────
//
// One Shiki highlighter, shared by every dev-mode code block in the styleguide.
// Theme: VS Code "Dark+" (dark-plus) — the editor look most developers know.
// Engine: the pure-JS RegExp engine, so there is no WASM to ship to the client.
//
// Replaces the hand-rolled regex highlighters that used to live in
// installation-tabs, example-card, theming-showcase, token-export-tabs and
// developer-notes — those covered ~4 token colours; Shiki covers the full set.

export type CodeLang =
  | "tsx" | "jsx" | "ts" | "js"
  | "css" | "html" | "xml" | "swift" | "json";

const THEME = "dark-plus";

// Loaded once, then reused for every block on the page.
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: ["tsx", "jsx", "typescript", "javascript", "css", "html", "xml", "swift", "json"],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
}

export interface HighlightedCodeProps {
  code: string;
  lang?: CodeLang;
  /** Extra classes for the scroll container (e.g. max-h-[480px]). */
  className?: string;
}

export function HighlightedCode({ code, lang = "tsx", className }: HighlightedCodeProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getHighlighter()
      .then((hl) => {
        if (cancelled) return;
        setHtml(hl.codeToHtml(code, { lang, theme: THEME }));
      })
      .catch(() => {
        if (!cancelled) setHtml(null);
      });
    return () => { cancelled = true; };
  }, [code, lang]);

  // While Shiki loads (or if it fails) show the raw source with identical
  // metrics, so the block never collapses or flashes layout.
  if (!html) {
    return (
      <pre className={cn("px-5 py-4 text-[11px] leading-6 font-mono bg-[#1e1e1e] text-[#d4d4d4] overflow-auto", className)}>
        {code}
      </pre>
    );
  }

  return (
    <div
      className={cn("ds-code text-[11px] leading-6 font-mono overflow-auto", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Copy, Download } from "lucide-react";
import { cn } from "@/lib/utils";

// The Installation section renders whenever a matching source file exists at
// public/components/<slug>.tsx.txt. Slugs that have no file (Foundations
// pages, work-in-progress components) just see a 404 → the section auto-hides.

// ── Inline TSX / JSX syntax highlighter ────────────────────────────────────
//
// Line-by-line, no parser — covers the common shapes used in our component
// sources (imports, type aliases, JSX, strings, numbers, block comments).

const KEYWORDS = new Set([
  "import", "from", "export", "default", "as",
  "const", "let", "var", "function", "return",
  "if", "else", "for", "while", "switch", "case", "break",
  "interface", "type", "extends", "implements",
  "true", "false", "null", "undefined", "void",
  "new", "in", "of", "typeof", "instanceof",
]);

function hlTsx(src: string): React.ReactNode[] {
  return src.split("\n").map((line, i) => {
    // Block comment / JSDoc lines
    if (
      /^\s*\/\*/.test(line) ||
      /^\s*\*/.test(line)   ||
      /\*\/\s*$/.test(line)
    ) {
      return (
        <span key={i} className="text-[#8a8a8a] italic block">
          {line || " "}{"\n"}
        </span>
      );
    }
    // Single-line comment
    if (/^\s*\/\//.test(line)) {
      return (
        <span key={i} className="text-[#8a8a8a] italic block">
          {line || " "}{"\n"}
        </span>
      );
    }

    // Tokenize via a single capturing regex with alternatives.
    // Order matters: strings first so quoted words don't get re-tokenized.
    const parts = line.split(
      /("[^"]*"|`[^`]*`|'[^']*'|\/\/.*$|<\/?[A-Za-z][A-Za-z0-9_.]*|\/?>|\.\.\.|\b(?:import|from|export|default|as|const|let|var|function|return|if|else|for|while|switch|case|break|interface|type|extends|implements|true|false|null|undefined|void|new|in|of|typeof|instanceof)\b|\b[A-Z][A-Za-z0-9_]*\b|\b\d+(?:\.\d+)?\b)/g,
    );

    return (
      <span key={i} className="block">
        {parts.map((p, j) => {
          if (!p) return null;

          // Strings + template literals → secondary
          if (/^["'`]/.test(p)) {
            return <span key={j} className="text-s4e-brand-secondary-500">{p}</span>;
          }
          // Trailing line comment
          if (/^\/\//.test(p)) {
            return <span key={j} className="text-[#8a8a8a] italic">{p}</span>;
          }
          // JSX tag opens / closes
          if (/^<\/?[A-Za-z]/.test(p) || p === ">" || p === "/>") {
            return <span key={j} className="text-s4e-brand-primary-500">{p}</span>;
          }
          // Spread
          if (p === "...") {
            return <span key={j} className="text-s4e-brand-primary-500">{p}</span>;
          }
          // Keywords
          if (KEYWORDS.has(p)) {
            return <span key={j} className="text-s4e-brand-primary-500">{p}</span>;
          }
          // PascalCase identifiers → type/component
          if (/^[A-Z][A-Za-z0-9_]*$/.test(p)) {
            return <span key={j} className="text-s4e-scale-yellow-500">{p}</span>;
          }
          // Numbers
          if (/^\d/.test(p)) {
            return <span key={j} className="text-s4e-scale-yellow-500">{p}</span>;
          }
          return p;
        })}
        {"\n"}
      </span>
    );
  });
}

export function InstallationTabs() {
  const pathname = usePathname();
  const slug     = pathname?.match(/\/styleguide\/([^/]+)/)?.[1];
  const filename = slug ? `${slug}.tsx` : undefined;

  const [source, setSource] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!filename) { setStatus("missing"); return; }
    let cancelled = false;
    fetch(`/components/${filename}.txt`)
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => {
        if (cancelled) return;
        if (text === null) { setStatus("missing"); return; }
        setSource(text);
        setStatus("ready");
      });
    return () => { cancelled = true; };
  }, [filename]);

  if (status !== "ready" || !source || !filename || !slug) return null;

  const importPath = `@/components/ui/${filename.replace(/\.tsx$/, "")}`;

  // Parse named value exports (const / function / class + re-exports). Filters
  // to PascalCase names so we skip `cn`, helper consts, and type-only exports.
  const declared = [...source.matchAll(/^export\s+(?:const|function|class)\s+([A-Z][A-Za-z0-9_]*)/gm)]
    .map((m) => m[1]);
  const reExported = [...source.matchAll(/^export\s*\{\s*([^}]+)\s*\}/gm)]
    .flatMap((m) => m[1].split(",").map((s) => s.trim().split(/\s+as\s+/).pop() ?? ""))
    .filter((s) => /^[A-Z]/.test(s));
  const exports = [...new Set([...declared, ...reExported])];
  const importLine =
    exports.length > 0
      ? `import { ${exports.join(", ")} } from "${importPath}";`
      : `import "${importPath}";`;

  const onCopy = () => {
    void navigator.clipboard?.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const onDownload = () => {
    const blob = new Blob([source], { type: "text/plain;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
        <span className="text-[15px] font-semibold text-s4e-text-primary">Installation</span>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500">
          React only
        </span>
      </div>
      <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
        Copy the source file into your project. You will also need the design tokens — install them once on the{" "}
        <Link href="/styleguide/theming" className="text-s4e-text-link hover:underline">Theming page</Link>.
      </p>

      <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
        {/* Action bar above source */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-s4e-neutral-divider-10 bg-s4e-surface-app">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] uppercase tracking-widest text-s4e-text-disabled shrink-0">Source</span>
            <code className="font-mono text-[11px] text-s4e-text-secondary truncate">components/ui/{filename}</code>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium text-s4e-text-secondary hover:text-s4e-text-primary hover:bg-s4e-neutral-grey-100 transition-colors cursor-pointer"
            >
              <Download size={11} />
              Download
            </button>
            <button
              type="button"
              onClick={onCopy}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium cursor-pointer transition-colors",
                copied
                  ? "bg-s4e-scale-green-500/15 text-s4e-scale-green-600"
                  : "text-s4e-text-on-accent bg-s4e-btn-primary-600 hover:bg-s4e-btn-primary-700",
              )}
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <pre className="px-5 py-4 text-[11px] leading-6 font-mono bg-s4e-btn-neutral-800 text-s4e-text-white overflow-auto max-h-[480px]">
          {hlTsx(source)}
        </pre>
        {/* Usage hint */}
        <div className="px-4 py-3 border-t border-s4e-neutral-divider-10 bg-s4e-surface-app">
          <div className="text-[10px] uppercase tracking-widest text-s4e-text-disabled mb-1.5">Then import</div>
          <code className="font-mono text-[11px] text-s4e-text-primary block break-all">
            {importLine}
          </code>
        </div>
      </div>
    </section>
  );
}

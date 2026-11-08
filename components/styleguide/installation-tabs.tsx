"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Copy, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { HighlightedCode } from "@/components/styleguide/highlighted-code";

// The Installation section renders whenever a matching source file exists at
// public/components/<slug>.tsx.txt. Slugs that have no file (Foundations
// pages, work-in-progress components) just see a 404 → the section auto-hides.

export function InstallationTabs() {
  const pathname = usePathname();
  const slug     = pathname?.match(/\/styleguide\/([^/]+)/)?.[1];
  const filename = slug ? `${slug}.tsx` : undefined;

  const [source, setSource] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!filename) return; // nothing to fetch; render bails out on !filename
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
        <span aria-hidden className="hidden">▶▶</span>
        <span className="text-[15px] font-semibold text-snt-text-primary">Installation</span>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-snt-brand-primary-500/10 text-snt-brand-primary-500">
          React only
        </span>
      </div>
      <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
        Copy the source file into your project. You will also need the design tokens — install them once on the{" "}
        <Link href="/styleguide/theming" className="text-snt-text-link hover:underline">Theming page</Link>.
      </p>

      <div className="border border-snt-neutral-divider-10 rounded-xl overflow-hidden">
        {/* Action bar above source */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-snt-neutral-divider-10 bg-snt-surface-app">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] uppercase tracking-widest text-snt-text-disabled shrink-0">Source</span>
            <code className="font-mono text-[11px] text-snt-text-secondary truncate">components/ui/{filename}</code>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium text-snt-text-secondary hover:text-snt-text-primary hover:bg-snt-neutral-grey-100 transition-colors cursor-pointer"
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
                  ? "bg-snt-scale-green-500/15 text-snt-scale-green-600"
                  : "text-snt-text-on-accent bg-snt-btn-primary-600 hover:bg-snt-btn-primary-700",
              )}
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <HighlightedCode code={source} lang="tsx" className="max-h-[480px]" />
        {/* Usage hint */}
        <div className="px-4 py-3 border-t border-snt-neutral-divider-10 bg-snt-surface-app">
          <div className="text-[10px] uppercase tracking-widest text-snt-text-disabled mb-1.5">Then import</div>
          <code className="font-mono text-[11px] text-snt-text-primary block break-all">
            {importLine}
          </code>
        </div>
      </div>
    </section>
  );
}

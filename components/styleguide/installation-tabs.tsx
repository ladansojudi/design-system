"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Copy, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { HighlightedCode } from "@/components/styleguide/highlighted-code";

// Installation: a shadcn CLI one-liner by default, the raw source under
// "Manual". The section renders whenever a matching source file exists at
// public/components/<slug>.tsx.txt. Slugs that have no file (Foundations
// pages, work-in-progress components) just see a 404 → the section auto-hides.

export function InstallationTabs() {
  const pathname = usePathname();
  const slug     = pathname?.match(/\/styleguide\/([^/]+)/)?.[1];
  const filename = slug ? `${slug}.tsx` : undefined;

  const [source, setSource] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");
  const [copied, setCopied] = useState(false);
  const [method, setMethod] = useState<"cli" | "manual">("cli");

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

  const cliCommand = `npx shadcn@latest add ${window.location.origin}/r/${slug}.json`;
  const copyCli = () => void navigator.clipboard?.writeText(cliCommand);

  const tabClass = (on: boolean) =>
    cn(
      "px-3 py-1.5 rounded-md text-snt-12 font-medium transition-colors cursor-pointer",
      on ? "bg-snt-surface-app text-snt-text-primary shadow-snt-sm" : "text-snt-text-secondary hover:text-snt-text-primary",
    );

  return (
    <section className="border-t border-snt-border-default pt-10 mt-12 first:mt-0 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-2 mb-1.5">
        <span aria-hidden className="hidden">▶▶</span>
        <h2 className="text-snt-20 font-semibold tracking-tight text-snt-text-primary">Installation</h2>
      </div>
      <p className="text-snt-14 text-snt-text-secondary leading-relaxed mb-5 max-w-2xl">
        Add the component with the shadcn CLI, or copy the source by hand. Either way, install the design tokens once
        from the <Link href="/styleguide/theming" className="text-snt-text-link hover:underline">Theming page</Link>.
      </p>

      <div role="tablist" aria-label="Installation method" className="inline-flex gap-1 p-1 mb-3 rounded-lg bg-snt-bg-subtle">
        <button type="button" role="tab" aria-selected={method === "cli"} onClick={() => setMethod("cli")} className={tabClass(method === "cli")}>
          CLI
        </button>
        <button type="button" role="tab" aria-selected={method === "manual"} onClick={() => setMethod("manual")} className={tabClass(method === "manual")}>
          Manual
        </button>
      </div>

      {method === "cli" ? (
        <div className="relative rounded-xl border border-snt-border-default overflow-hidden">
          <HighlightedCode code={cliCommand} lang="bash" />
          <CopyIconButton onCopy={copyCli} label="Copy install command" />
        </div>
      ) : (
        <div className="border border-snt-border-default rounded-xl overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-snt-border-default bg-snt-surface-app">
            <code className="font-mono text-snt-12 text-snt-text-secondary truncate">components/ui/{filename}</code>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onDownload}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-snt-11 font-medium text-snt-text-secondary hover:text-snt-text-primary hover:bg-snt-bg-subtle transition-colors cursor-pointer"
              >
                <Download size={12} aria-hidden />
                Download
              </button>
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-snt-11 font-medium text-snt-text-secondary hover:text-snt-text-primary hover:bg-snt-bg-subtle transition-colors cursor-pointer"
              >
                {copied ? <Check size={12} aria-hidden /> : <Copy size={12} aria-hidden />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <HighlightedCode code={source} lang="tsx" className="max-h-[360px]" />
        </div>
      )}

      <div className="mt-4">
        <div className="text-snt-12 font-medium text-snt-text-secondary mb-1.5">Then import</div>
        <div className="relative rounded-xl border border-snt-border-default overflow-hidden">
          <HighlightedCode code={importLine} lang="tsx" />
        </div>
      </div>
    </section>
  );
}

function CopyIconButton({ onCopy, label }: { onCopy: () => void; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        onCopy();
        setDone(true);
        setTimeout(() => setDone(false), 1200);
      }}
      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-7 h-7 rounded-md text-snt-text-secondary hover:text-snt-text-primary hover:bg-snt-bg-subtle transition-colors cursor-pointer"
    >
      {done ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
    </button>
  );
}

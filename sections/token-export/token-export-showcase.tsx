"use client";

import { useState } from "react";
import { Download, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

type Format = "css" | "swift" | "android";

type FileSpec = {
  key:        Format;
  label:      string;
  filename:   string;
  language:   string;
  description:string;
  whenToUse:  string;
  content:    string;
};

// ── Lightweight syntax highlighters ───────────────────────────────────────

function highlightCss(src: string): React.ReactNode[] {
  return src.split("\n").map((line, i) => {
    if (/^\s*\/\*/.test(line) || /^\s*\*/.test(line) || /\*\/\s*$/.test(line)) {
      return <span key={i} className="text-s4e-text-disabled italic block">{line || " "}{"\n"}</span>;
    }
    const m = line.match(/^(\s*)(--[a-z0-9-]+)(\s*:\s*)([^;]+)(;?)$/);
    if (m) {
      return (
        <span key={i} className="block">
          {m[1]}
          <span className="text-s4e-brand-secondary-500">{m[2]}</span>
          <span className="text-s4e-text-disabled">{m[3]}</span>
          <span className="text-s4e-text-primary">{m[4]}</span>
          <span className="text-s4e-text-disabled">{m[5]}</span>
          {"\n"}
        </span>
      );
    }
    if (/^\s*[:.][a-z][a-z-]*[, ]/i.test(line) || /\{\s*$/.test(line) || /^\s*\}\s*$/.test(line)) {
      return <span key={i} className="text-s4e-brand-primary-500 block">{line}{"\n"}</span>;
    }
    return <span key={i} className="block">{line || " "}{"\n"}</span>;
  });
}

function highlightSwift(src: string): React.ReactNode[] {
  return src.split("\n").map((line, i) => {
    if (/^\s*\/\//.test(line)) {
      return <span key={i} className="text-s4e-text-disabled italic block">{line || " "}{"\n"}</span>;
    }
    if (/^\s*import\s/.test(line)) {
      return <span key={i} className="text-s4e-brand-primary-500 block">{line}{"\n"}</span>;
    }
    const ext = line.match(/^(extension)(\s+)([A-Z][A-Za-z]+)(\s*\{?)$/);
    if (ext) {
      return (
        <span key={i} className="block">
          <span className="text-s4e-brand-primary-500">{ext[1]}</span>
          {ext[2]}
          <span className="text-s4e-text-primary font-semibold">{ext[3]}</span>
          {ext[4]}{"\n"}
        </span>
      );
    }
    const decl = line.match(/^(\s+)(static\s+let)(\s+)([a-zA-Z0-9_]+)(\s*[:=].+)$/);
    if (decl) {
      return (
        <span key={i} className="block">
          {decl[1]}
          <span className="text-s4e-brand-primary-500">{decl[2]}</span>
          {decl[3]}
          <span className="text-s4e-text-primary">{decl[4]}</span>
          <span className="text-s4e-brand-secondary-500">{decl[5]}</span>
          {"\n"}
        </span>
      );
    }
    return <span key={i} className="block">{line || " "}{"\n"}</span>;
  });
}

function highlightXml(src: string): React.ReactNode[] {
  return src.split("\n").map((line, i) => {
    if (/^\s*<!--/.test(line) || /-->\s*$/.test(line) || /^\s*[^<]*-->/.test(line)) {
      return <span key={i} className="text-s4e-text-disabled italic block">{line || " "}{"\n"}</span>;
    }
    const m = line.match(/^(\s*)(<\/?[a-z]+)((?:\s+[a-z]+="[^"]*")*)(\s*\/?>)([^<]*)(<\/[a-z]+>)?$/i);
    if (m) {
      const attrs = m[3].replace(/(\s+)([a-z]+)(=")([^"]*)(")/gi,
        (_, sp, k, eq, v, q) => `${sp}__A__${k}__B__${eq}__C__${v}__D__${q}`);
      const attrParts = attrs.split(/(__A__|__B__|__C__|__D__)/).map((p, j) => {
        if (p === "__A__" || p === "__B__" || p === "__C__" || p === "__D__") return null;
        const idx = attrs.indexOf(p);
        if (idx > 0 && attrs.substring(idx - 5, idx) === "__A__") {
          return <span key={j} className="text-s4e-brand-secondary-500">{p}</span>;
        }
        if (idx > 0 && attrs.substring(idx - 5, idx) === "__C__") {
          return <span key={j} className="text-s4e-text-primary">{p}</span>;
        }
        return p;
      }).filter(Boolean);
      return (
        <span key={i} className="block">
          {m[1]}
          <span className="text-s4e-brand-primary-500">{m[2]}</span>
          {attrParts}
          <span className="text-s4e-brand-primary-500">{m[4]}</span>
          <span className="text-s4e-text-primary">{m[5]}</span>
          {m[6] && <span className="text-s4e-brand-primary-500">{m[6]}</span>}
          {"\n"}
        </span>
      );
    }
    return <span key={i} className="block">{line || " "}{"\n"}</span>;
  });
}

// ── Code block ────────────────────────────────────────────────────────────

function CodeBlock({ file }: { file: FileSpec }) {
  const highlighter =
    file.key === "css"     ? highlightCss     :
    file.key === "swift"   ? highlightSwift   :
                             highlightXml;

  function handleDownload() {
    const blob = new Blob([file.content], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-s4e-neutral-divider-10 bg-s4e-surface-table-header">
        <div className="flex items-center gap-2.5 min-w-0">
          <FileCode size={14} className="text-s4e-text-secondary shrink-0" />
          <span className="font-mono text-[11px] text-s4e-text-primary truncate">{file.filename}</span>
          <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500 shrink-0">
            {file.language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-s4e-neutral-divider-20 text-[11px] font-medium text-s4e-text-secondary hover:text-s4e-text-primary hover:border-s4e-neutral-grey-400 cursor-pointer shrink-0"
        >
          <Download size={12} />
          Download
        </button>
      </div>
      <pre className="px-5 py-4 overflow-x-auto text-[11px] leading-6 font-mono bg-s4e-neutral-grey-900 text-s4e-neutral-grey-300 max-h-[420px]">
        {highlighter(file.content)}
      </pre>
    </div>
  );
}

// ── Showcase ──────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

export function TokenExportShowcase({ files }: { files: FileSpec[] }) {
  const [tab, setTab] = useState<Format>(files[0].key);
  const active = files.find((f) => f.key === tab) ?? files[0];

  return (
    <div className="space-y-10">
      {/* When to use */}
      <div>
        <SectionTitle>When to use each format</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {files.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setTab(f.key)}
              className={cn(
                "border rounded-md px-4 py-3 text-left transition-colors cursor-pointer",
                tab === f.key
                  ? "border-s4e-brand-primary-500 bg-s4e-brand-primary-50"
                  : "border-s4e-neutral-divider-10 hover:border-s4e-neutral-grey-400 bg-s4e-surface-row",
              )}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <FileCode size={13} className="text-s4e-text-secondary" />
                <span className="font-mono text-[11px] text-s4e-brand-primary-500">{f.filename}</span>
              </div>
              <div className="text-[13px] font-medium text-s4e-text-primary mb-1">{f.label}</div>
              <p className="text-[11.5px] text-s4e-text-secondary leading-snug">{f.whenToUse}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected format preview */}
      <div>
        <SectionTitle>{active.label} preview</SectionTitle>
        <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
          {active.description}
        </p>
        <CodeBlock file={active} />
      </div>

      {/* All three side-by-side on larger screens */}
      <div>
        <SectionTitle>All formats</SectionTitle>
        <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
          Every format is generated from the same source — <code className="font-mono text-s4e-text-primary">app/globals.css</code>.
          They auto-regenerate before each <code className="font-mono text-s4e-text-primary">next build</code> via the{" "}
          <code className="font-mono text-s4e-text-primary">prebuild</code> npm hook.
        </p>
        <div className="space-y-4">
          {files.map((f) => (
            <CodeBlock key={f.key} file={f} />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Download, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

type Format = "css" | "swift" | "xml";

type FileSpec = {
  key:      Format;
  label:    string;
  filename: string;
  note:     string;
};

const FILES: FileSpec[] = [
  { key: "css",   label: "CSS",     filename: "tokens.css",   note: "Web · Tailwind" },
  { key: "swift", label: "Swift",   filename: "tokens.swift", note: "iOS · UIKit"    },
  { key: "xml",   label: "Android", filename: "tokens.xml",   note: "Android · XML"  },
];

// ── Inline syntax highlighters (reused from the dropdown variant) ──────────

function hl(format: Format, src: string): React.ReactNode[] {
  if (format === "css")   return hlCss(src);
  if (format === "swift") return hlSwift(src);
  return hlXml(src);
}

function hlCss(src: string): React.ReactNode[] {
  return src.split("\n").map((line, i) => {
    if (/^\s*\/\*/.test(line) || /^\s*\*/.test(line) || /\*\/\s*$/.test(line)) {
      return <span key={i} className="text-[#8a8a8a] italic block">{line || " "}{"\n"}</span>;
    }
    const m = line.match(/^(\s*)(--[a-z0-9-]+)(\s*:\s*)([^;]+)(;?)$/);
    if (m) {
      return (
        <span key={i} className="block">
          {m[1]}
          <span className="text-s4e-brand-secondary-500">{m[2]}</span>
          <span className="text-[#8a8a8a]">{m[3]}</span>
          <span className="text-s4e-text-white">{m[4]}</span>
          <span className="text-[#8a8a8a]">{m[5]}</span>
          {"\n"}
        </span>
      );
    }
    if (/\{\s*$/.test(line) || /^\s*\}/.test(line) || /^:/.test(line)) {
      return <span key={i} className="text-s4e-brand-primary-500 block">{line}{"\n"}</span>;
    }
    return <span key={i} className="block">{line || " "}{"\n"}</span>;
  });
}

function hlSwift(src: string): React.ReactNode[] {
  return src.split("\n").map((line, i) => {
    if (/^\s*\/\//.test(line)) {
      return <span key={i} className="text-[#8a8a8a] italic block">{line || " "}{"\n"}</span>;
    }
    if (/^\s*import\s/.test(line)) {
      return <span key={i} className="text-s4e-brand-primary-500 block">{line}{"\n"}</span>;
    }
    const ext = line.match(/^(extension)(\s+)([A-Z][A-Za-z]+)(.*)$/);
    if (ext) {
      return (
        <span key={i} className="block">
          <span className="text-s4e-brand-primary-500">{ext[1]}</span>
          {ext[2]}
          <span className="text-s4e-text-white font-semibold">{ext[3]}</span>
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
          <span className="text-s4e-text-white">{decl[4]}</span>
          <span className="text-s4e-brand-secondary-500">{decl[5]}</span>
          {"\n"}
        </span>
      );
    }
    return <span key={i} className="block">{line || " "}{"\n"}</span>;
  });
}

function hlXml(src: string): React.ReactNode[] {
  return src.split("\n").map((line, i) => {
    if (/^\s*<!--/.test(line) || /-->\s*$/.test(line)) {
      return <span key={i} className="text-[#8a8a8a] italic block">{line || " "}{"\n"}</span>;
    }
    const m = line.match(/^(\s*)(<\/?[a-z?]+)\s*([^>]*)?(\/?>)([^<]*)(<\/[a-z]+>)?$/i);
    if (m) {
      return (
        <span key={i} className="block">
          {m[1]}
          <span className="text-s4e-brand-primary-500">{m[2]}</span>
          {m[3] && <span className="text-s4e-brand-secondary-500"> {m[3]}</span>}
          <span className="text-s4e-brand-primary-500">{m[4]}</span>
          <span className="text-s4e-text-white">{m[5]}</span>
          {m[6] && <span className="text-s4e-brand-primary-500">{m[6]}</span>}
          {"\n"}
        </span>
      );
    }
    return <span key={i} className="block">{line || " "}{"\n"}</span>;
  });
}

// ── Component ─────────────────────────────────────────────────────────────

export function TokenExportTabs() {
  const pathname = usePathname();
  const slug = pathname?.match(/\/styleguide\/([^/]+)/)?.[1];

  const [active, setActive]     = useState<Format>("css");
  const [contents, setContents] = useState<Partial<Record<Format, string>>>({});
  const [status, setStatus]     = useState<"loading" | "ready" | "missing">("loading");
  const [lastSlug, setLastSlug] = useState<string | undefined>(slug);

  // Derived-state reset when slug changes (React 19 idiomatic pattern)
  if (slug !== lastSlug) {
    setLastSlug(slug);
    setContents({});
    setStatus("loading");
  }

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    Promise.all(
      FILES.map(async (f) => {
        const res = await fetch(`/tokens/${slug}/${f.filename}`);
        if (!res.ok) return [f.key, null] as const;
        const text = await res.text();
        return [f.key, text] as const;
      }),
    ).then((entries) => {
      if (cancelled) return;
      const valid = entries.filter(([, v]) => v !== null) as [Format, string][];
      if (valid.length === 0) {
        setStatus("missing");
        return;
      }
      setContents(Object.fromEntries(valid));
      setStatus("ready");
    });

    return () => { cancelled = true; };
  }, [slug]);

  if (status !== "ready" || !slug) return null;

  const activeContent = contents[active] ?? "";
  const activeSpec    = FILES.find((f) => f.key === active)!;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
        <span className="text-[15px] font-semibold text-s4e-text-primary">Token Export</span>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500">
          Used by this component
        </span>
      </div>
      <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
        The exact tokens this page references — exported per platform. Auto-regenerated from
        the component sources by <code className="font-mono text-s4e-text-primary">scripts/export-tokens.js</code>.
      </p>

      <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center justify-between gap-3 px-2 py-2 border-b border-s4e-neutral-divider-10 bg-s4e-surface-table-header">
          <div className="flex items-center gap-1">
            {FILES.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                disabled={!contents[f.key]}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer",
                  active === f.key
                    ? "bg-s4e-surface-row text-s4e-text-primary shadow-s4e-xs"
                    : "text-s4e-text-secondary hover:text-s4e-text-primary",
                  !contents[f.key] && "opacity-40 cursor-not-allowed",
                )}
              >
                <FileCode size={12} />
                {f.label}
                <span className="text-[#8a8a8a] font-mono text-[10px]">{f.note.split(" · ")[0]}</span>
              </button>
            ))}
          </div>
          <a
            href={`/tokens/${slug}/${activeSpec.filename}`}
            download={activeSpec.filename}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium text-s4e-text-on-accent bg-s4e-btn-primary-600 hover:bg-s4e-btn-primary-700 transition-colors"
          >
            <Download size={12} />
            Download {activeSpec.filename}
          </a>
        </div>

        {/* Code preview */}
        <pre className="px-5 py-4 text-[11px] leading-6 font-mono bg-s4e-btn-neutral-800 text-s4e-text-white overflow-auto max-h-[420px]">
          {hl(active, activeContent)}
        </pre>
      </div>
    </section>
  );
}

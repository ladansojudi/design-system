"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Download, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlatform, type Platform } from "@/components/styleguide/platform-provider";
import { HighlightedCode } from "@/components/styleguide/highlighted-code";

type Format = "css" | "swift" | "xml";

const PLATFORM_TO_FORMAT: Record<Platform, Format> = {
  react: "css",
  swift: "swift",
  xml:   "xml",
};

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

// ── Component ─────────────────────────────────────────────────────────────

export interface TokenExportTabsProps {
  /** When set, fetches /tokens/<slugOverride>/tokens.* instead of deriving from URL. */
  slugOverride?: string;
  /** Section header title. Default: "Token Export". */
  title?: string;
  /** Pill badge label. Default: "Used by this component". */
  badge?: string;
  /** Intro paragraph (overrides default copy). */
  intro?: React.ReactNode;
}

export function TokenExportTabs({ slugOverride, title, badge, intro }: TokenExportTabsProps = {}) {
  const pathname = usePathname();
  const urlSlug  = pathname?.match(/\/styleguide\/([^/]+)/)?.[1];
  const slug     = slugOverride ?? urlSlug;
  const { platform } = usePlatform();

  const [active, setActive]         = useState<Format>(PLATFORM_TO_FORMAT[platform]);
  const [contents, setContents]     = useState<Partial<Record<Format, string>>>({});
  const [status, setStatus]         = useState<"loading" | "ready" | "missing">("loading");
  const [lastSlug, setLastSlug]     = useState<string | undefined>(slug);
  const [lastPlatform, setLastPlatform] = useState<Platform>(platform);

  // Derived-state reset when slug changes (React 19 idiomatic pattern)
  if (slug !== lastSlug) {
    setLastSlug(slug);
    setContents({});
    setStatus("loading");
  }
  // Sync active tab to global platform when it changes
  if (platform !== lastPlatform) {
    setLastPlatform(platform);
    setActive(PLATFORM_TO_FORMAT[platform]);
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
        <span className="text-[15px] font-semibold text-s4e-text-primary">{title ?? "Token Export"}</span>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500">
          {badge ?? "Used by this component"}
        </span>
      </div>
      {intro ?? (
        <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
          The exact tokens this page references — exported per platform. Auto-regenerated from
          the component sources by <code className="font-mono text-s4e-text-primary">scripts/export-tokens.js</code>.
        </p>
      )}

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
        <HighlightedCode code={activeContent} lang={active} className="max-h-[420px]" />
      </div>
    </section>
  );
}

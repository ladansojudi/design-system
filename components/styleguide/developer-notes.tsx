"use client";

import { usePathname } from "next/navigation";
import { DEV_NOTES } from "@/components/styleguide/developer-notes-data";
import { HighlightedCode } from "@/components/styleguide/highlighted-code";

export function DeveloperNotes() {
  const pathname = usePathname();
  const slug = pathname?.match(/\/styleguide\/([^/]+)/)?.[1];
  const note = slug ? DEV_NOTES[slug] : undefined;
  if (!note) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
        <span className="text-[15px] font-semibold text-s4e-text-primary">Developer Notes</span>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500">
          Engineering
        </span>
      </div>

      <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
        {/* Import + usage */}
        <div className="border-b border-s4e-neutral-divider-10">
          <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-s4e-text-disabled bg-s4e-surface-table-header">
            Import &amp; usage
          </div>
          <HighlightedCode
            code={note.usage ? `${note.importLine}\n${note.usage}` : note.importLine}
            lang="tsx"
          />
        </div>

        {/* Props */}
        {note.props.length > 0 && (
          <div className="border-b border-s4e-neutral-divider-10 last:border-b-0">
            <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-s4e-text-disabled bg-s4e-surface-table-header">
              Props
            </div>
            <div className="overflow-x-auto s4e-scrollbar-hide">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="text-left">
                    {["Prop", "Type", "Default", "Description"].map((h) => (
                      <th key={h} className="py-2 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled border-b border-s4e-neutral-divider-10">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {note.props.map((p) => (
                    <tr key={p.name} className="border-b border-s4e-neutral-divider-10 last:border-b-0">
                      <td className="py-2.5 px-4 font-mono text-[11px] text-s4e-brand-primary-500 whitespace-nowrap">{p.name}</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-s4e-brand-secondary-500">{p.type}</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-s4e-text-disabled whitespace-nowrap">{p.def ?? "—"}</td>
                      <td className="py-2.5 px-4 text-[12px] text-s4e-text-secondary">{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Gotchas */}
        {note.notes.length > 0 && (
          <div className="border-b border-s4e-neutral-divider-10 last:border-b-0">
            <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-s4e-text-disabled bg-s4e-surface-table-header">
              Gotchas
            </div>
            <ul className="px-5 py-4 space-y-2">
              {note.notes.map((n) => (
                <li key={n} className="flex items-start gap-2.5 text-[12px] text-s4e-text-secondary leading-relaxed">
                  <span className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-s4e-brand-primary-500" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Edge cases */}
        {note.edgeCases.length > 0 && (
          <div>
            <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-s4e-text-disabled bg-s4e-surface-table-header">
              Edge cases
            </div>
            <ul className="px-5 py-4 space-y-2">
              {note.edgeCases.map((n) => (
                <li key={n} className="flex items-start gap-2.5 text-[12px] text-s4e-text-secondary leading-relaxed">
                  <span className="shrink-0 mt-[6px] inline-flex items-center justify-center w-3.5 h-3.5 rounded-[3px] bg-s4e-scale-yellow-500/15 text-s4e-scale-yellow-700 text-[8px] font-bold">!</span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

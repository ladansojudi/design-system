"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DEV_NOTES } from "@/components/styleguide/developer-notes-data";
import { HighlightedCode } from "@/components/styleguide/highlighted-code";

// API reference for the Code tab. Props come from /sentinel-manifest.json,
// which `npm run export` extracts from components/ui — so types and defaults
// always match the code. The usage snippet and known gaps come from the
// component's doc (/docs/components/<slug>.md). Hand-written gotchas in
// developer-notes-data.ts are shown only for components reviewed against code.

type Member = { name: string; type: string; optional?: boolean; default?: string; description?: string; deprecated?: boolean };
type Manifest = { components: { name: string; exports: string[]; props: Record<string, { extends?: string; members: Member[] }> }[] };

type Api = {
  importLine: string;
  usage?: string;
  props: { name: string; extends?: string; members: Member[] }[];
  gaps: string[];
};

export type { Manifest, Member };
let manifestPromise: Promise<Manifest | null> | null = null;
export const loadManifest = (): Promise<Manifest | null> =>
  (manifestPromise ??= fetch("/sentinel-manifest.json")
    .then((r) => (r.ok ? (r.json() as Promise<Manifest>) : null))
    .catch(() => null));

function section(md: string, title: string) {
  return md.split(new RegExp(`^## ${title}\\s*$`, "m"))[1]?.split(/^## /m)[0] ?? "";
}

async function loadApi(slug: string): Promise<Api | null> {
  const [manifest, md] = await Promise.all([
    loadManifest(),
    fetch(`/docs/components/${slug}.md`).then((r) => (r.ok ? r.text() : "")).catch(() => ""),
  ]);
  const comp = manifest?.components.find((c) => c.name === slug);
  if (!comp) return null;
  const usage = section(md, "Examples").match(/```tsx\n([\s\S]*?)```/)?.[1]?.trim();
  const gaps = section(md, "Known gaps")
    .split("\n")
    .map((l) => l.match(/^- \[ \] (.+)/)?.[1])
    .filter((l): l is string => !!l);
  return {
    importLine: `import { ${comp.exports.join(", ")} } from "@/components/ui/${slug}";`,
    usage,
    props: Object.entries(comp.props).map(([name, p]) => ({ name, ...p })),
    gaps,
  };
}

const label = "px-4 py-2 text-snt-11 font-medium uppercase tracking-wider text-snt-text-secondary bg-snt-bg-subtle";

function List({ items, warn }: { items: string[]; warn?: boolean }) {
  return (
    <ul className="space-y-2 px-5 py-4">
      {items.map((n) => (
        <li key={n} className="flex items-start gap-2.5 text-snt-14 leading-relaxed text-snt-text-secondary">
          <span aria-hidden className={warn ? "mt-[7px] size-1.5 shrink-0 rounded-full bg-snt-scale-yellow-500" : "mt-[9px] size-1 shrink-0 rounded-full bg-snt-text-secondary"} />
          {n}
        </li>
      ))}
    </ul>
  );
}

export function DeveloperNotes() {
  const pathname = usePathname();
  const slug = pathname?.match(/\/styleguide\/([^/]+)/)?.[1];
  const [api, setApi] = useState<{ slug: string; data: Api | null } | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    loadApi(slug).then((data) => { if (!cancelled) setApi({ slug, data }); });
    return () => { cancelled = true; };
  }, [slug]);

  const data = api && api.slug === slug ? api.data : null;
  if (!slug || !data) return null;
  const note = DEV_NOTES[slug];
  const usage = note?.usage ?? data.usage;
  const code = usage ? `${data.importLine}\n\n${usage.replace(/^import[^\n]*\n/gm, "").trim()}` : data.importLine;

  return (
    <section className="border-t border-snt-border-default pt-10 mt-12 first:mt-0 first:border-t-0 first:pt-0">
      <div className="mb-4 flex items-center gap-2">
        <span aria-hidden className="hidden">▶▶</span>
        <h2 className="text-snt-20 font-semibold tracking-tight text-snt-text-primary">API reference</h2>
      </div>

      <div className="overflow-hidden rounded-xl border border-snt-border-default">
        <div className="border-b border-snt-border-default">
          <div className={label}>Import &amp; usage</div>
          <HighlightedCode code={code} lang="tsx" />
        </div>

        {data.props.map((p) => (
          <div key={p.name} className="border-b border-snt-border-default last:border-b-0">
            <div className={label}>
              {p.name}
              {p.extends && <span className="ml-2 font-mono normal-case tracking-normal text-snt-text-secondary">extends {p.extends}</span>}
            </div>
            <div className="overflow-x-auto snt-scrollbar-hide">
              <table className="w-full min-w-[560px] text-left">
                <thead>
                  <tr>
                    {["Prop", "Type", "Default", "Description"].map((h) => (
                      <th key={h} scope="col" className="border-b border-snt-border-default px-4 py-2 text-snt-12 font-medium text-snt-text-secondary">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {p.members.map((m) => (
                    <tr key={m.name} className="border-b border-snt-border-default last:border-b-0 align-top">
                      <td className="whitespace-nowrap px-4 py-2.5 font-mono text-snt-12 text-snt-text-primary">
                        {m.name}{m.optional ? "" : <span className="text-snt-text-error" title="Required">*</span>}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-snt-12 text-snt-text-secondary">{m.type}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 font-mono text-snt-12 text-snt-text-secondary">{m.default ?? "—"}</td>
                      <td className="px-4 py-2.5 text-snt-14 text-snt-text-secondary">
                        {m.deprecated && <span className="mr-1.5 rounded bg-snt-bg-warning-subtle px-1 text-snt-11 font-medium text-snt-text-warning">Deprecated</span>}
                        {m.description ?? note?.props.find((x) => x.name === m.name)?.desc ?? ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {note && note.notes.length > 0 && (
          <div className="border-b border-snt-border-default last:border-b-0">
            <div className={label}>Gotchas</div>
            <List items={note.notes} />
          </div>
        )}
        {note && note.edgeCases.length > 0 && (
          <div className="border-b border-snt-border-default last:border-b-0">
            <div className={label}>Edge cases</div>
            <List items={note.edgeCases} warn />
          </div>
        )}
        {data.gaps.length > 0 && (
          <div>
            <div className={label}>Known gaps</div>
            <List items={data.gaps} warn />
          </div>
        )}
      </div>
    </section>
  );
}

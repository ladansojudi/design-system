"use client";

import { useEffect, useState } from "react";
import { BoolSwatch, OptionPill, PropertiesTable, type PropertyRow } from "@/components/styleguide/specs";
import { loadManifest, type Member } from "@/components/styleguide/developer-notes";

// Specs → Properties, generated from the component's real props (the manifest
// that `npm run export` extracts from components/ui). Callbacks are left out:
// this table is the designer-facing set — the full API is on the Code tab.

function row(m: Member): PropertyRow {
  const literals = [...m.type.matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  const isEnum = literals.length > 1 && /^("[^"]+"\s*\|\s*)+"[^"]+"$/.test(m.type.trim());
  const isBool = m.type === "boolean";
  return {
    name: m.name,
    type: isEnum ? "enum" : isBool ? "boolean" : m.type,
    values: isEnum ? (
      <div className="flex flex-wrap gap-1.5">{literals.map((l) => <OptionPill key={l} label={l} />)}</div>
    ) : isBool ? (
      <div className="flex items-center gap-1.5">
        <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
        <OptionPill swatch={<BoolSwatch on />} label="true" />
      </div>
    ) : undefined,
    default: m.default?.replace(/^"|"$/g, "") ?? "—",
    description: (m.deprecated ? "Deprecated. " : "") + (m.description ?? ""),
  };
}

export function PropsFromCode({ slug }: { slug: string }) {
  const [rows, setRows] = useState<PropertyRow[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    loadManifest().then((m) => {
      const comp = m?.components.find((c) => c.name === slug);
      const members = comp
        ? Object.values(comp.props).flatMap((p) => p.members).filter((x) => !/=>/.test(x.type) && !x.deprecated)
        : [];
      if (!cancelled) setRows(members.map(row));
    });
    return () => { cancelled = true; };
  }, [slug]);
  if (!rows) return <div className="h-24 animate-pulse rounded-xl bg-snt-bg-subtle motion-reduce:animate-none" />;
  if (rows.length === 0) return <p className="text-snt-14 text-snt-text-secondary">No configurable props — style it with className.</p>;
  return <PropertiesTable rows={rows} />;
}

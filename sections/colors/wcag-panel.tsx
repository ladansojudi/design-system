"use client";

import { cn } from "@/lib/utils";
import {
  contrast,
  fontFor,
  wcagKey,
  wcagLabel,
  type Palette,
  type Swatch,
  type WcagKey,
} from "@/sections/colors/lib";

const BADGE_CLASS: Record<WcagKey, string> = {
  aaa:  "bg-s4e-scale-green-500/15 text-s4e-scale-green-600",
  aa:   "bg-s4e-brand-primary-500/15 text-s4e-brand-primary-500",
  aal:  "bg-s4e-scale-yellow-500/20 text-s4e-scale-yellow-700",
  fail: "bg-s4e-scale-red-500/15 text-s4e-scale-red-600",
};

// ── Text on Surface matrix ────────────────────────────────────────────────

const TEXT_TOKENS = [
  "Text/Primary", "Text/Secondary", "Text/Disabled",
  "Text/Link", "Text/Brand",
  "Text/Success", "Text/Warning", "Text/Error", "Text/Info",
] as const;

const SURFACE_TOKENS = [
  "Surface/App", "Surface/Page", "Surface/Row",
  "Surface/Row Hover", "Surface/Table-Header",
  "Neutral/Grey-100",
] as const;

function shortLabel(token: string): string {
  return token.replace(/^[^/]+\//, "");
}

function findSwatch(palettes: Palette[], name: string): Swatch | undefined {
  for (const p of palettes) {
    const sw = p.swatches.find((s) => s.name === name);
    if (sw) return sw;
  }
  return undefined;
}

function CellBadge({ ratio }: { ratio: number }) {
  const k = wcagKey(ratio);
  const dotColor: Record<WcagKey, string> = {
    aaa:  "bg-s4e-scale-green-500",
    aa:   "bg-s4e-brand-primary-500",
    aal:  "bg-s4e-scale-yellow-500",
    fail: "bg-s4e-scale-red-500",
  };
  return (
    <span className="absolute top-1 right-1 inline-flex items-center gap-1 text-[8.5px] font-mono">
      <span className={cn("w-1.5 h-1.5 rounded-full", dotColor[k])} />
      <span className="text-s4e-text-primary mix-blend-difference">
        {wcagLabel(ratio)}
      </span>
    </span>
  );
}

function TextOnSurfaceMatrix({ palettes }: { palettes: Palette[] }) {
  const texts    = TEXT_TOKENS.map((t) => findSwatch(palettes, t)).filter((s): s is Swatch => !!s);
  const surfaces = SURFACE_TOKENS.map((t) => findSwatch(palettes, t)).filter((s): s is Swatch => !!s);

  return (
    <div className="overflow-x-auto s4e-scrollbar-hide rounded-xl border border-s4e-neutral-divider-10">
      <table className="border-collapse text-[11px] min-w-[760px] w-full">
        <thead>
          <tr>
            <th className="p-2 text-left font-medium text-[10px] uppercase tracking-widest text-s4e-text-disabled bg-s4e-surface-table-header">
              Text on →
            </th>
            {surfaces.map((s) => (
              <th
                key={s.name}
                className="p-2 text-left font-medium text-[10px] uppercase tracking-widest text-s4e-text-disabled bg-s4e-surface-table-header border-l border-s4e-neutral-divider-10"
              >
                <span className="block truncate">{shortLabel(s.name)}</span>
                <span className="block font-mono text-[9px] normal-case tracking-normal text-s4e-text-secondary mt-0.5">{s.hex}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {texts.map((fg) => (
            <tr key={fg.name} className="border-t border-s4e-neutral-divider-10">
              <th className="p-2 text-left font-normal align-top whitespace-nowrap">
                <div className="font-mono text-[11px] text-s4e-brand-primary-500">{shortLabel(fg.name)}</div>
                <div className="font-mono text-[9px] text-s4e-text-disabled mt-0.5">{fg.hex}</div>
              </th>
              {surfaces.map((bg) => {
                const r = contrast(fg.rgb, bg.rgb);
                return (
                  <td
                    key={bg.name}
                    title={`${fg.name} on ${bg.name} — ${r.toFixed(2)}:1`}
                    style={{ background: bg.hex, color: fg.hex }}
                    className="relative p-0 border-l border-s4e-neutral-divider-10 h-[58px] text-center align-middle"
                  >
                    <CellBadge ratio={r} />
                    <span className="text-[17px] font-semibold leading-none">Aa</span>
                    <span className="block text-[9.5px] font-mono opacity-80 mt-1">{r.toFixed(1)}:1</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AuditRow({ sw }: { sw: Swatch }) {
  const fc = fontFor(sw.rgb);
  const cw = contrast(sw.rgb, [255, 255, 255]); const kw = wcagKey(cw);
  const cb = contrast(sw.rgb, [0,   0,   0]);   const kb = wcagKey(cb);
  return (
    <tr className="border-t border-s4e-neutral-divider-10">
      <td className="py-2 px-3">
        <span
          style={{ background: sw.hex }}
          className="inline-block w-5 h-5 rounded-full ring-1 ring-inset ring-s4e-neutral-divider-20 align-middle"
        />
      </td>
      <td className="py-2 px-3 font-mono text-[11px] text-s4e-brand-primary-500">{sw.step}</td>
      <td className="py-2 px-3 font-mono text-[11px] text-s4e-text-secondary">{sw.hex}</td>
      <td className="py-2 px-3">
        <span className={cn("inline-block px-1.5 py-0.5 rounded-[2px] text-[10px] font-medium font-mono", BADGE_CLASS[kw])}>
          {wcagLabel(cw)} · {cw.toFixed(1)}:1
        </span>
      </td>
      <td className="py-2 px-3">
        <span className={cn("inline-block px-1.5 py-0.5 rounded-[2px] text-[10px] font-medium font-mono", BADGE_CLASS[kb])}>
          {wcagLabel(cb)} · {cb.toFixed(1)}:1
        </span>
      </td>
      <td className="py-2 px-3">
        <span className="inline-flex items-center gap-1.5">
          <span
            style={{ background: fc }}
            className="inline-block w-3.5 h-3.5 rounded-full ring-1 ring-inset ring-s4e-neutral-divider-20"
          />
          <span className="font-mono text-[11px] text-s4e-text-disabled">{fc}</span>
        </span>
      </td>
    </tr>
  );
}

function PaletteAudit({ palette }: { palette: Palette }) {
  return (
    <section className="mb-9">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-[14px] font-semibold text-s4e-text-primary">{palette.name}</h3>
      </div>
      <div className="overflow-x-auto s4e-scrollbar-hide">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="text-left">
              {["", "Step", "Hex", "vs White", "vs Black", "Font rengi"].map((h, i) => (
                <th key={i} className="py-2 px-3 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled border-b border-s4e-neutral-divider-10">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {palette.swatches.map((s) => (
              <AuditRow key={s.name} sw={s} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function WcagPanel({ palettes }: { palettes: Palette[] }) {
  const solid = palettes.filter((p) => !p.base.isAlpha);
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-[15px] font-semibold text-s4e-text-primary">Text on Surface</h2>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500">
          Live preview
        </span>
      </div>
      <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
        Every semantic text token rendered on every UI surface, with its real WCAG ratio.
        Use this to validate a combination before reaching for it in a component.
      </p>
      <TextOnSurfaceMatrix palettes={palettes} />

      <div className="h-px bg-s4e-neutral-divider-10 my-10" />

      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[15px] font-semibold text-s4e-text-primary">Full Scale Audit</h2>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500">
          vs white &amp; black
        </span>
      </div>
      {solid.map((p) => (
        <PaletteAudit key={p.slug} palette={p} />
      ))}
    </div>
  );
}

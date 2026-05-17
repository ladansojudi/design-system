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

const CELL_CLASS: Record<WcagKey, string> = {
  aaa:  "bg-s4e-scale-green-500/10 text-s4e-scale-green-600",
  aa:   "bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500",
  aal:  "bg-s4e-scale-yellow-500/15 text-s4e-scale-yellow-700",
  fail: "bg-s4e-scale-red-500/10 text-s4e-scale-red-600",
};

const BADGE_CLASS: Record<WcagKey, string> = {
  aaa:  "bg-s4e-scale-green-500/15 text-s4e-scale-green-600",
  aa:   "bg-s4e-brand-primary-500/15 text-s4e-brand-primary-500",
  aal:  "bg-s4e-scale-yellow-500/20 text-s4e-scale-yellow-700",
  fail: "bg-s4e-scale-red-500/15 text-s4e-scale-red-600",
};

function MatrixDot({ color }: { color: string }) {
  return (
    <span
      style={{ background: color }}
      className="inline-block w-3 h-3 rounded-full align-middle mr-1.5 ring-1 ring-inset ring-s4e-neutral-divider-20"
    />
  );
}

function BaseMatrix({ palettes }: { palettes: Palette[] }) {
  return (
    <div className="overflow-x-auto s4e-scrollbar-hide">
      <table className="border-collapse text-[11px] min-w-[560px] w-full">
        <thead>
          <tr>
            <th className="p-2 border border-s4e-neutral-divider-10" />
            {palettes.map((p) => (
              <th
                key={p.slug}
                className="p-2 border border-s4e-neutral-divider-10 text-left font-normal text-s4e-text-secondary"
              >
                <MatrixDot color={p.base.hex} />
                {p.slug}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {palettes.map((fg) => (
            <tr key={fg.slug}>
              <th className="p-2 border border-s4e-neutral-divider-10 text-left font-normal text-s4e-text-secondary">
                <MatrixDot color={fg.base.hex} />
                {fg.slug}
              </th>
              {palettes.map((bg) => {
                if (fg.slug === bg.slug) {
                  return (
                    <td
                      key={bg.slug}
                      className="p-2 border border-s4e-neutral-divider-10 text-center bg-s4e-neutral-grey-100 text-s4e-text-disabled"
                    >
                      —
                    </td>
                  );
                }
                const r = contrast(fg.base.rgb, bg.base.rgb);
                const k = wcagKey(r);
                return (
                  <td
                    key={bg.slug}
                    className={cn(
                      "p-2 border border-s4e-neutral-divider-10 text-center",
                      CELL_CLASS[k],
                    )}
                  >
                    {wcagLabel(r)}
                    <br />
                    <span className="text-[10px] opacity-70 font-mono">{r.toFixed(1)}:1</span>
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
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[15px] font-semibold text-s4e-text-primary">Base Color Matrix</h2>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500">
          500 variants
        </span>
      </div>
      <BaseMatrix palettes={solid} />

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

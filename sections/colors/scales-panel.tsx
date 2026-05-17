"use client";

import { cn } from "@/lib/utils";
import {
  contrast,
  fontFor,
  SEMANTIC_ROLES,
  wcagKey,
  wcagLabel,
  type Palette,
  type Swatch,
} from "@/sections/colors/lib";
import { useCopy } from "@/sections/colors/use-copy";

const BADGE_CLASS: Record<string, string> = {
  aaa:  "bg-black/15 text-current",
  aa:   "bg-black/10 text-current",
  aal:  "bg-s4e-scale-yellow-500/30 text-current",
  fail: "bg-s4e-scale-red-500/25 text-current",
};

function AlphaSwatchCell({ sw }: { sw: Swatch }) {
  const copy = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(sw.hex)}
      title={`${sw.hex} — ${sw.name}`}
      className={cn(
        "group relative aspect-[0.72] flex flex-col justify-end p-1.5 cursor-pointer overflow-hidden",
        "bg-s4e-neutral-grey-100 text-s4e-text-primary",
        "transition-[flex] duration-200 hover:flex-[2]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-s4e-brand-primary-500/60",
      )}
    >
      <span
        aria-hidden
        className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-px"
        style={{ background: sw.hex }}
      />
      <span className="relative z-[1] text-[9px] leading-none text-s4e-text-disabled">
        {sw.step}
      </span>
      <span className="relative z-[1] text-[10px] leading-none mt-0.5 font-medium font-mono text-s4e-text-secondary">
        α {sw.alpha.toFixed(2)}
      </span>
    </button>
  );
}

function SolidSwatchCell({ sw }: { sw: Swatch }) {
  const copy   = useCopy();
  const fg     = fontFor(sw.rgb);
  const cw     = contrast(sw.rgb, [255, 255, 255]);
  const cb     = contrast(sw.rgb, [0,   0,   0]);
  const best   = Math.max(cw, cb);
  const lvl    = wcagLabel(best);
  const lvlKey = wcagKey(best);

  return (
    <button
      type="button"
      onClick={() => copy(sw.hex)}
      title={`${sw.hex} — ${sw.name}`}
      style={{ background: sw.hex, color: fg }}
      className={cn(
        "group relative aspect-[0.72] flex flex-col justify-end p-1.5 cursor-pointer",
        "overflow-hidden transition-[flex] duration-200 hover:flex-[2]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-s4e-brand-primary-500/60",
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-white/10"
      />
      {sw.isBase && (
        <span aria-hidden className="absolute top-1.5 left-1.5 text-[8px] opacity-60 z-[1]">
          ●
        </span>
      )}
      <span
        className={cn(
          "absolute top-1 right-1 z-[1] px-1 py-px rounded-[2px] text-[8px] font-medium",
          BADGE_CLASS[lvlKey],
        )}
      >
        {lvl}
      </span>
      <span className="relative z-[1] text-[9px] leading-none opacity-65">{sw.step}</span>
      <span className="relative z-[1] text-[10px] leading-none mt-0.5 font-medium">{sw.hex}</span>
    </button>
  );
}

function SwatchCell({ sw }: { sw: Swatch }) {
  return sw.isAlpha ? <AlphaSwatchCell sw={sw} /> : <SolidSwatchCell sw={sw} />;
}

function CompactAlphaChip({ sw }: { sw: Swatch }) {
  const copy = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(sw.hex)}
      title={`${sw.hex} — ${sw.name}`}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer",
        "bg-s4e-neutral-grey-100 hover:bg-s4e-neutral-grey-200 transition-colors",
      )}
    >
      <span className="w-16 h-px shrink-0" style={{ background: sw.hex }} />
      <span className="text-[10px] text-s4e-text-disabled">α {sw.alpha.toFixed(2)}</span>
      <span className="font-mono text-[10px] text-s4e-text-secondary">{sw.step}</span>
    </button>
  );
}

function PaletteRow({ palette }: { palette: Palette }) {
  const allAlpha = palette.swatches.every((s) => s.isAlpha);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-[14px] font-semibold text-s4e-text-primary">{palette.name}</h3>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500">
          {palette.base.hex} · --{palette.slug}
        </span>
      </div>

      {allAlpha ? (
        <div className="flex flex-wrap gap-2">
          {palette.swatches.map((s) => (
            <CompactAlphaChip key={s.name} sw={s} />
          ))}
        </div>
      ) : (
        <>
          <div
            className="grid rounded-md overflow-hidden shadow-s4e-xs ring-1 ring-s4e-neutral-divider-10"
            style={{ gridTemplateColumns: `repeat(${palette.swatches.length}, minmax(0,1fr))` }}
          >
            {palette.swatches.map((s) => (
              <SwatchCell key={s.name} sw={s} />
            ))}
          </div>

          <div
            className="grid mt-1.5"
            style={{ gridTemplateColumns: `repeat(${palette.swatches.length}, minmax(0,1fr))` }}
          >
            {palette.swatches.map((s) => (
              <span key={s.name} className="text-center text-[9px] text-s4e-text-disabled truncate">
                {s.step}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function RoleCards() {
  const copy = useCopy();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {SEMANTIC_ROLES.map((role) => (
        <div
          key={role.label}
          className="border border-s4e-neutral-divider-10 rounded-md bg-s4e-surface-row p-4"
        >
          <div className="text-[10px] uppercase tracking-widest text-s4e-text-disabled mb-3">
            {role.label}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {role.chips.map((chip) => (
              <button
                key={chip.token}
                type="button"
                title={chip.token}
                onClick={() => copy(chip.token)}
                className={cn(
                  "w-[26px] h-[26px] rounded-full shrink-0 ring-1 ring-inset ring-s4e-neutral-divider-20",
                  "cursor-pointer transition-transform duration-150 hover:scale-110",
                  chip.bgClass,
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScalesPanel({ palettes }: { palettes: Palette[] }) {
  return (
    <div>
      {palettes.map((p) => (
        <PaletteRow key={p.slug} palette={p} />
      ))}

      <div className="h-px bg-s4e-neutral-divider-10 my-10" />

      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-[15px] font-semibold text-s4e-text-primary">Semantic Roles</h2>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500">
          Kullanım rehberi
        </span>
      </div>
      <RoleCards />
    </div>
  );
}

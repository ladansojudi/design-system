"use client";

import { cn } from "@/lib/utils";
import {
  contrast,
  fontFor,
  formatHsl,
  rgbToHsl,
  tokenVar,
  wcagKey,
  wcagLabel,
  type Palette,
  type Swatch,
  type WcagKey,
} from "@/sections/colors/lib";
import { useCopy } from "@/sections/colors/use-copy";

const BADGE_CLASS: Record<WcagKey, string> = {
  aaa:  "bg-s4e-scale-green-500/15 text-s4e-scale-green-600",
  aa:   "bg-s4e-brand-primary-500/15 text-s4e-brand-primary-500",
  aal:  "bg-s4e-scale-yellow-500/20 text-s4e-scale-yellow-700",
  fail: "bg-s4e-scale-red-500/15 text-s4e-scale-red-600",
};

function Badge({ ratio }: { ratio: number }) {
  const k = wcagKey(ratio);
  return (
    <span className={cn("inline-block px-1.5 py-0.5 rounded-[2px] text-[10px] font-medium font-mono", BADGE_CLASS[k])}>
      {wcagLabel(ratio)} · {ratio.toFixed(1)}:1
    </span>
  );
}

function Dot({ color, isAlpha }: { color: string; isAlpha?: boolean }) {
  if (isAlpha) {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 align-middle">
        <span style={{ background: color }} className="block w-5 h-px" />
      </span>
    );
  }
  return (
    <span
      style={{ background: color }}
      className="inline-block w-5 h-5 rounded-full ring-1 ring-inset ring-s4e-neutral-divider-20 align-middle"
    />
  );
}

function TokenRow({ palette, sw }: { palette: Palette; sw: Swatch }) {
  const copy = useCopy();
  const fc   = fontFor(sw.rgb);
  const cw   = contrast(sw.rgb, [255, 255, 255]);
  const cb   = contrast(sw.rgb, [0,   0,   0]);
  const varName = tokenVar(sw);

  // For scales with a real numeric base (Brand/Scale/Grey-500), display HSL
  // using the base's h/s + the swatch's actual L. This keeps the shade's first
  // two values identical to the main's, hiding 8-bit RGB rounding artifacts.
  // Other palettes (Severity, Surface, Feedback, etc.) use the per-swatch HSL.
  const hslDisplay = (() => {
    const own = rgbToHsl(sw.rgb);
    if (!palette.base.isBase) return formatHsl(own);
    const [bh, bs] = rgbToHsl(palette.base.rgb);
    return `hsl(${bh}, ${bs}%, ${own[2]}%)`;
  })();

  return (
    <tr className="border-t border-s4e-neutral-divider-10">
      <td className="py-2 px-3 align-middle">
        <button type="button" title={sw.hex} onClick={() => copy(sw.hex)}>
          <Dot color={sw.hex} isAlpha={sw.isAlpha} />
        </button>
      </td>
      <td className="py-2 px-3 align-middle">
        <button
          type="button"
          onClick={() => copy(varName)}
          className="font-mono text-[11px] text-s4e-brand-primary-500 hover:underline cursor-pointer"
        >
          {varName}
        </button>
      </td>
      <td className="py-2 px-3 align-middle">
        <button
          type="button"
          onClick={() => copy(sw.hex)}
          className="font-mono text-[11px] text-s4e-text-secondary hover:text-s4e-text-primary cursor-pointer"
        >
          {sw.hex}
        </button>
      </td>
      <td className="py-2 px-3 align-middle">
        <button
          type="button"
          onClick={() => copy(hslDisplay)}
          className="font-mono text-[11px] text-s4e-text-secondary hover:text-s4e-text-primary cursor-pointer"
        >
          {hslDisplay}
        </button>
      </td>
      <td className="py-2 px-3 align-middle">
        {sw.isAlpha ? <span className="text-s4e-text-disabled">—</span> : <Badge ratio={cw} />}
      </td>
      <td className="py-2 px-3 align-middle">
        {sw.isAlpha ? <span className="text-s4e-text-disabled">—</span> : <Badge ratio={cb} />}
      </td>
      <td className="py-2 px-3 align-middle">
        {sw.isAlpha ? (
          <span className="text-s4e-text-disabled">—</span>
        ) : (
          <span className="inline-flex items-center gap-1.5">
            <span
              style={{ background: fc }}
              className="inline-block w-3.5 h-3.5 rounded-full ring-1 ring-inset ring-s4e-neutral-divider-20"
            />
            <span className="font-mono text-[11px] text-s4e-text-secondary">{fc}</span>
          </span>
        )}
      </td>
    </tr>
  );
}

// ── Typography palette — rendered text samples, not generic swatches ─────

const TEXT_USE: Record<string, string> = {
  "Text/Primary":     "Default body text, headings, table cells.",
  "Text/Secondary":   "Supporting copy, meta, helper labels.",
  "Text/Disabled":    "Disabled controls, inactive items.",
  "Text/Placeholder": "Empty input hints — distinct from disabled conceptually.",
  "Text/Inverse":     "Text on a surface inverted from the current theme.",
  "Text/On-Accent":   "Text on a colored / accent surface (buttons, banners).",
  "Text/Link":        "Interactive text — links, primary CTAs, in-text actions.",
  "Text/Brand":       "Branded headlines, feature labels.",
  "Text/Success":     "Success messages, positive validation states.",
  "Text/Warning":     "Warnings, cautions, quota near-limit.",
  "Text/Error":       "Error messages, destructive confirmations, validation failures.",
  "Text/Info":        "Informational hints, secondary notifications.",
};

const INVERSE_BG: Record<string, string> = {
  "Text/Inverse":   "bg-s4e-neutral-grey-900",
  "Text/On-Accent": "bg-s4e-brand-primary-600",
};

function TypographyRow({ sw }: { sw: Swatch }) {
  const copy    = useCopy();
  const varName = tokenVar(sw);
  const hsl     = formatHsl(rgbToHsl(sw.rgb));
  const use     = TEXT_USE[sw.name] ?? "";
  const sampleBg = INVERSE_BG[sw.name] ?? "bg-s4e-surface-row";

  return (
    <tr className="border-t border-s4e-neutral-divider-10 align-middle">
      <td className="py-2.5 px-3">
        <div className={cn("inline-flex items-center justify-center w-24 h-10 rounded-md ring-1 ring-inset ring-s4e-neutral-divider-10", sampleBg)}>
          <span style={{ color: sw.hex }} className="text-[20px] font-semibold leading-none">Aa</span>
        </div>
      </td>
      <td className="py-2.5 px-3">
        <button
          type="button"
          onClick={() => copy(varName)}
          className="font-mono text-[11px] text-s4e-brand-primary-500 hover:underline cursor-pointer"
        >
          {varName}
        </button>
      </td>
      <td className="py-2.5 px-3">
        <button
          type="button"
          onClick={() => copy(sw.hex)}
          className="font-mono text-[11px] text-s4e-text-secondary hover:text-s4e-text-primary cursor-pointer"
        >
          {sw.hex}
        </button>
      </td>
      <td className="py-2.5 px-3">
        <button
          type="button"
          onClick={() => copy(hsl)}
          className="font-mono text-[11px] text-s4e-text-secondary hover:text-s4e-text-primary cursor-pointer"
        >
          {hsl}
        </button>
      </td>
      <td className="py-2.5 px-3 text-[12px] text-s4e-text-secondary">{use}</td>
    </tr>
  );
}

function TypographyTable({ palette }: { palette: Palette }) {
  return (
    <section className="mb-11">
      <div className="text-[12px] font-semibold uppercase tracking-widest text-s4e-text-secondary mb-3">
        {palette.name} — {palette.slug}
      </div>
      <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-3 max-w-2xl">
        Text rendered in each color on its appropriate surface. For contrast against any
        surface combination, see the <span className="text-s4e-text-primary font-medium">Text on Surface</span> matrix in the WCAG tab.
      </p>
      <div className="overflow-x-auto s4e-scrollbar-hide">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left">
              {["Sample", "Token", "Hex", "HSL", "Use case"].map((h, i) => (
                <th
                  key={i}
                  className="py-2 px-3 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled border-b border-s4e-neutral-divider-10"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {palette.swatches.map((s) => (
              <TypographyRow key={s.name} sw={s} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PaletteTable({ palette }: { palette: Palette }) {
  if (palette.slug === "typography") return <TypographyTable palette={palette} />;

  return (
    <section className="mb-11">
      <div className="text-[12px] font-semibold uppercase tracking-widest text-s4e-text-secondary mb-3">
        {palette.name} — {palette.slug}
      </div>
      <div className="overflow-x-auto s4e-scrollbar-hide">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left">
              {["", "Token", "Hex", "HSL", "vs White", "vs Black", "Font"].map((h, i) => (
                <th
                  key={i}
                  className="py-2 px-3 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled border-b border-s4e-neutral-divider-10"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {palette.swatches.map((s) => (
              <TokenRow key={s.name} palette={palette} sw={s} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function TokensPanel({ palettes }: { palettes: Palette[] }) {
  return (
    <div>
      {palettes.map((p) => (
        <PaletteTable key={p.slug} palette={p} />
      ))}
    </div>
  );
}

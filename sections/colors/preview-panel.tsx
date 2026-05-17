"use client";

import type { Palette } from "@/sections/colors/lib";

type CardCfg = {
  title: string;
  desc:  string;
  btn:   string;
  bg:      string;
  fg:      string;
  accent:  string;
  btnBg:   string;
  btnFg:   string;
};

function pick(palettes: Palette[], slug: string, step: string): string | null {
  const p = palettes.find((x) => x.slug === slug);
  if (!p) return null;
  const sw = p.swatches.find((s) => s.step === step) ?? p.base;
  return sw.hex;
}

function buildCards(palettes: Palette[]): CardCfg[] {
  const dark    = pick(palettes, "neutral-grey", "900")  ?? "#131515";
  const light   = pick(palettes, "neutral-grey", "00")   ?? "#FFFFFF";
  const text    = pick(palettes, "typography",   "Text/Primary")  ?? dark;
  const onDark  = pick(palettes, "neutral-grey", "00")   ?? "#FFFFFF";
  const primary = pick(palettes, "brand-primary",   "500") ?? "#1383D4";
  const second  = pick(palettes, "brand-secondary", "500") ?? "#EE7B59";
  const purple  = pick(palettes, "scale-purple",    "500") ?? "#772ED1";

  return [
    {
      title:  "Dark Surface",
      desc:   "Koyu zemin üzerine birincil metin. Marka renginin vurgu olarak kullanımı.",
      btn:    "Başla",
      bg:     dark, fg: onDark, accent: primary, btnBg: primary, btnFg: onDark,
    },
    {
      title:  "Primary CTA",
      desc:   "Marka birincil zemini üzerine zıt metin. Yüksek görünürlük.",
      btn:    "Devam",
      bg:     primary, fg: onDark, accent: light, btnBg: dark, btnFg: onDark,
    },
    {
      title:  "Accent Card",
      desc:   "Purple zemin üzerinde light metin. Kritik vurgular için ayrılmıştır.",
      btn:    "İncele",
      bg:     purple, fg: onDark, accent: light, btnBg: dark, btnFg: onDark,
    },
    {
      title:  "Light Surface",
      desc:   "Açık zemin kullanımı. Koyu metin + secondary marka rengi.",
      btn:    "Katıl",
      bg:     light, fg: text, accent: second, btnBg: second, btnFg: onDark,
    },
  ];
}

function Card({ c }: { c: CardCfg }) {
  return (
    <div
      style={{ background: c.bg, color: c.fg }}
      className="rounded-md px-7 py-7 ring-1 ring-inset ring-s4e-neutral-divider-10"
    >
      <h3 className="text-[19px] font-semibold mb-1" style={{ color: c.accent }}>
        {c.title}
      </h3>
      <p className="text-[12px] opacity-80 leading-relaxed">{c.desc}</p>
      <button
        type="button"
        style={{ background: c.btnBg, color: c.btnFg }}
        className="inline-block mt-4 px-4 py-2 rounded-md text-[12px] font-medium cursor-pointer"
      >
        {c.btn}
      </button>
    </div>
  );
}

export function PreviewPanel({ palettes }: { palettes: Palette[] }) {
  const cards = buildCards(palettes);
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-[15px] font-semibold text-s4e-text-primary">Kullanım Önizlemesi</h2>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500">
          Aktif tema
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {cards.map((c) => (
          <Card key={c.title} c={c} />
        ))}
      </div>
    </div>
  );
}

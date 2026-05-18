"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { tokenVar, type Palette, type Swatch } from "@/sections/colors/lib";
import { useCopy } from "@/sections/colors/use-copy";

type Format = "css" | "scss" | "json" | "tailwind";

function tokenScss(sw: Swatch): string {
  return "$" + tokenVar(sw).replace(/^--/, "");
}

function buildCss(palettes: Palette[]): string {
  let out = "/* Design System — Color Tokens */\n:root {\n";
  palettes.forEach((p) => {
    out += `  /* ${p.name} */\n`;
    p.swatches.forEach((s) => {
      out += `  ${tokenVar(s)}: ${s.hex};\n`;
    });
    out += "\n";
  });
  out += "}\n";
  return out;
}

function buildScss(palettes: Palette[]): string {
  let out = "// Design System — Color Tokens\n\n";
  palettes.forEach((p) => {
    out += `// ${p.name}\n`;
    p.swatches.forEach((s) => {
      out += `${tokenScss(s)}: ${s.hex};\n`;
    });
    out += "\n";
  });
  return out;
}

function buildJson(palettes: Palette[]): string {
  const obj: Record<string, Record<string, string>> = {};
  palettes.forEach((p) => {
    obj[p.slug] = {};
    p.swatches.forEach((s) => {
      obj[p.slug][s.step] = s.hex;
    });
  });
  return JSON.stringify(obj, null, 2);
}

function buildTailwind(palettes: Palette[]): string {
  const obj: Record<string, Record<string, string>> = {};
  palettes.forEach((p) => {
    obj[p.slug] = {};
    p.swatches.forEach((s) => {
      obj[p.slug][s.step] = s.hex;
    });
  });
  return (
    "// tailwind.config.js — extend.colors\n" +
    "module.exports = {\n" +
    "  theme: { extend: { colors: " +
    JSON.stringify(obj, null, 4).replace(/\n/g, "\n    ") +
    " } }\n" +
    "};\n"
  );
}

const BUILDERS: Record<Format, (p: Palette[]) => string> = {
  css:      buildCss,
  scss:     buildScss,
  json:     buildJson,
  tailwind: buildTailwind,
};

const LABELS: Record<Format, string> = {
  css: "CSS", scss: "SCSS", json: "JSON", tailwind: "Tailwind",
};

function HighlightedCss({ palettes }: { palettes: Palette[] }) {
  return (
    <>
      <span className="text-[#8a8a8a] italic">{`/* Design System — Color Tokens */`}</span>
      {"\n"}
      <span className="text-s4e-brand-primary-500">:root</span>
      {" {"}
      {"\n"}
      {palettes.map((p) => (
        <span key={p.slug}>
          {"  "}<span className="text-[#8a8a8a] italic">{`/* ${p.name} */`}</span>{"\n"}
          {p.swatches.map((s) => (
            <span key={s.name}>
              {"  "}
              <span className="text-s4e-brand-secondary-500">{tokenVar(s)}</span>
              <span className="text-[#8a8a8a]">: </span>
              <span className="text-s4e-text-white">{s.hex}</span>
              <span className="text-[#8a8a8a]">;</span>
              {"\n"}
            </span>
          ))}
          {"\n"}
        </span>
      ))}
      {"}\n"}
    </>
  );
}

export function ExportPanel({ palettes }: { palettes: Palette[] }) {
  const [format, setFormat] = useState<Format>("css");
  const copy   = useCopy();
  const plain  = useMemo(() => BUILDERS[format](palettes), [format, palettes]);
  const total  = palettes.reduce((a, p) => a + p.swatches.length, 0);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[15px] font-semibold text-s4e-text-primary">Token Export</h2>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500">
          {total} token
        </span>
      </div>

      <div className="flex gap-1.5 mb-4">
        {(Object.keys(LABELS) as Format[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFormat(f)}
            className={cn(
              "px-3 py-1.5 rounded-[3px] border text-[11px] font-medium uppercase tracking-wider transition-colors cursor-pointer",
              format === f
                ? "bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500 border-s4e-brand-primary-500/30"
                : "border-s4e-neutral-divider-10 text-s4e-text-secondary hover:text-s4e-text-primary",
            )}
          >
            {LABELS[f]}
          </button>
        ))}
      </div>

      <div className="relative rounded-md border border-s4e-neutral-divider-10 bg-s4e-btn-neutral-800 overflow-hidden">
        <button
          type="button"
          onClick={() => copy(plain, `${LABELS[format]} kopyalandı`)}
          className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-[3px] text-[10px] font-medium uppercase tracking-wider cursor-pointer bg-s4e-brand-primary-500/15 border border-s4e-brand-primary-500/30 text-s4e-brand-primary-500 hover:bg-s4e-brand-primary-500/25 transition-colors"
        >
          Tümünü Kopyala
        </button>
        <pre className="px-8 py-7 overflow-x-auto text-[12px] leading-7 font-mono text-s4e-text-white whitespace-pre">
          {format === "css" ? <HighlightedCss palettes={palettes} /> : plain}
        </pre>
      </div>
    </div>
  );
}

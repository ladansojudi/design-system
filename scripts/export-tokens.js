#!/usr/bin/env node
/**
 * Token export — generates token files from app/globals.css.
 *
 * Outputs:
 *   public/tokens/<slug>/tokens.css   — only the tokens used by <slug>
 *   public/tokens/<slug>/tokens.swift
 *   public/tokens/<slug>/tokens.xml
 *
 * Each <slug> matches a route under app/styleguide/<slug>. The script scans
 * the matching sections/<slug>/ source (and the page itself) for s4e-*
 * token references and emits a per-component subset.
 *
 * Run manually: `npm run tokens`
 * Auto-runs:   `npm run build` (via the prebuild script in package.json)
 */

const fs   = require("fs");
const path = require("path");

const ROOT       = path.resolve(__dirname, "..");
const SRC_CSS    = path.join(ROOT, "app", "globals.css");
const STYLEGUIDE = path.join(ROOT, "app", "styleguide");
const SECTIONS   = path.join(ROOT, "sections");
const OUT_DIR    = path.join(ROOT, "public", "tokens");

// ── Scales (Tailwind utility → semantic-name → px) ─────────────────────────
// Each row: [className → [tokenName, pxValue]].
// Token names are stable, design-system-style; class names are how we detect
// usage in source.

const SPACING = [
  ["space-1",   4],
  ["space-2",   8],
  ["space-3",  12],
  ["space-4",  16],
  ["space-5",  20],
  ["space-6",  24],
  ["space-8",  32],
  ["space-9",  36],
  ["space-10", 40],
  ["space-11", 44],
  ["space-12", 48],
  ["space-16", 64],
];
const SPACING_INDEX = new Map(SPACING.map((s) => [s[0], s[1]]));

const RADIUS = {
  "rounded-none": { token: "radius-none", px: 0 },
  "rounded-sm":   { token: "radius-sm",   px: 2 },
  "rounded":      { token: "radius-base", px: 4 },
  "rounded-md":   { token: "radius-md",   px: 6 },
  "rounded-lg":   { token: "radius-lg",   px: 8 },
  "rounded-xl":   { token: "radius-xl",  px: 12 },
  "rounded-2xl":  { token: "radius-2xl", px: 16 },
  "rounded-3xl":  { token: "radius-3xl", px: 24 },
  "rounded-full": { token: "radius-full", px: 9999 },
};

const BORDER_WIDTH = {
  "border":   { token: "border-width-1", px: 1 },
  "border-0": { token: "border-width-0", px: 0 },
  "border-2": { token: "border-width-2", px: 2 },
  "border-4": { token: "border-width-4", px: 4 },
};

const FONT_WEIGHT = {
  "font-normal":   { token: "font-weight-normal",   value: 400, swift: ".regular"  },
  "font-medium":   { token: "font-weight-medium",   value: 500, swift: ".medium"   },
  "font-semibold": { token: "font-weight-semibold", value: 600, swift: ".semibold" },
  "font-bold":     { token: "font-weight-bold",     value: 700, swift: ".bold"     },
};

const RING_WIDTH = {
  "ring-1": { token: "ring-width-1", px: 1 },
  "ring-2": { token: "ring-width-2", px: 2 },
  "ring-4": { token: "ring-width-4", px: 4 },
};

const RING_OFFSET = {
  "ring-offset-1": { token: "ring-offset-1", px: 1 },
  "ring-offset-2": { token: "ring-offset-2", px: 2 },
};

const FONT_SIZE_NAMED = {
  "text-xs":   12,
  "text-sm":   14,
  "text-base": 16,
  "text-lg":   18,
  "text-xl":   20,
};

// Prose / documentation / placeholder pages — no meaningful component tokens
// to export, so they're skipped. TokenExportTabs auto-hides when files are
// absent (the fetch 404s).
const EXCLUDE = new Set([
  "principles",
  "accessibility",
  "contribution",
  "component-status",
  "scan-type-item",
  "threat-row",
]);

// ── Read + parse :root block from globals.css ─────────────────────────────

const css = fs.readFileSync(SRC_CSS, "utf8");

const ROOT_BLOCK = /:root,\s*\[data-s4e-theme="light"\]\s*\{([\s\S]*?)\n\}/m;
const match      = css.match(ROOT_BLOCK);
if (!match) {
  console.error("export-tokens: could not find :root block in globals.css");
  process.exit(1);
}
const rootBody = match[1];

// Parse all --s4e-* tokens
const ALL_TOKENS = [];
const TOKEN_RE   = /--([a-z0-9-]+)\s*:\s*([^;]+);/g;
let m;
while ((m = TOKEN_RE.exec(rootBody)) !== null) {
  const name  = m[1].trim();
  const value = m[2].trim();
  if (!name.startsWith("s4e-")) continue;
  ALL_TOKENS.push({ name, value });
}

// Categorize one token: "color" | "z" | "duration" | "shadow" | null (skip)
function categorize({ name, value }) {
  const local = name.replace(/^s4e-/, "");
  if (local.startsWith("shadow-"))          return "shadow";
  if (local.startsWith("motion-ease-"))     return null;
  if (local.startsWith("z-"))               return "z";
  if (local.startsWith("motion-duration-")) return "duration";
  if (/^#[0-9a-fA-F]{6}$/.test(value))      return "color";
  return null; // rgba, etc.
}

// ── Naming helpers ────────────────────────────────────────────────────────

function toCamel(name) {
  return name.split("-").map((p, i) => (i === 0 ? p : p[0].toUpperCase() + p.slice(1))).join("");
}
function toSnake(name) { return name.replace(/-/g, "_"); }
function escapeXml(s)  { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

// ── File walker — collect source files for a given slug ───────────────────

function walk(dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return out; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?)$/.test(e.name)) out.push(p);
  }
  return out;
}

function sourcesForSlug(slug) {
  const files = [];
  walk(path.join(SECTIONS, slug), files);
  const pageFile = path.join(STYLEGUIDE, slug, "page.tsx");
  if (fs.existsSync(pageFile)) files.push(pageFile);
  return files;
}

// ── Token extraction from source ──────────────────────────────────────────

// Matches a Tailwind class name as a whole word inside a className string.
// The char before must be non-word-non-dash so `border` matches alone but
// not inside `border-r` or `myborder`.
function hasClass(text, cls) {
  const re = new RegExp(`(?:^|[^a-zA-Z0-9-])${cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|[^a-zA-Z0-9-])`);
  return re.test(text);
}

function extractTokensUsed(files) {
  const used         = new Set();   // s4e-* token names
  const spaces       = new Set();   // space-N names
  const radii        = new Set();   // rounded-* class names
  const borders      = new Set();   // border / border-N class names
  const fontWeights  = new Set();   // font-* class names
  const fontSizes    = new Set();   // px values (numbers) — from text-[Npx] and named scale
  const rings        = new Set();   // ring-N class names
  const ringOffsets  = new Set();   // ring-offset-N class names

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");

    // ── Color tokens via Tailwind classes (text-s4e-X, bg-s4e-X, …)
    const classMatches = text.matchAll(/(?:^|[^a-z])s4e-([a-z0-9-]+)/g);
    for (const m of classMatches) used.add(`s4e-${m[1]}`);

    // ── CSS var() references
    const vars = text.matchAll(/var\(--s4e-([a-z0-9-]+)\)/g);
    for (const m of vars) used.add(`s4e-${m[1]}`);

    // ── Spacing (p-4, gap-2, h-9, w-11, …)
    const spaceMatches = text.matchAll(/(?:^|[^a-z])(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|space-y|space-x|w|h|min-w|min-h|max-w|max-h)-(\d+(?:\.\d+)?)\b/g);
    for (const m of spaceMatches) {
      const n = m[1];
      if (SPACING_INDEX.has(`space-${n}`)) spaces.add(`space-${n}`);
    }

    // ── Radius / Border / Font-weight / Ring scales
    for (const cls of Object.keys(RADIUS))       { if (hasClass(text, cls)) radii.add(cls); }
    for (const cls of Object.keys(BORDER_WIDTH)) { if (hasClass(text, cls)) borders.add(cls); }
    for (const cls of Object.keys(FONT_WEIGHT))  { if (hasClass(text, cls)) fontWeights.add(cls); }
    for (const cls of Object.keys(RING_WIDTH))   { if (hasClass(text, cls)) rings.add(cls); }
    for (const cls of Object.keys(RING_OFFSET))  { if (hasClass(text, cls)) ringOffsets.add(cls); }

    // ── Font sizes: arbitrary text-[Npx] + named scale (text-sm, text-base, …)
    const fsArbitrary = text.matchAll(/text-\[(\d+)px\]/g);
    for (const m of fsArbitrary) fontSizes.add(parseInt(m[1], 10));
    for (const cls of Object.keys(FONT_SIZE_NAMED)) {
      if (hasClass(text, cls)) fontSizes.add(FONT_SIZE_NAMED[cls]);
    }
  }
  return { tokenNames: used, spaceNames: spaces, radii, borders, fontWeights, fontSizes, rings, ringOffsets };
}

// ── Builders for the three output formats ─────────────────────────────────

function buildCss(tokens, sets) {
  const colors    = tokens.filter((t) => categorize(t) === "color");
  const zIndex    = tokens.filter((t) => categorize(t) === "z");
  const durations = tokens.filter((t) => categorize(t) === "duration");
  const shadows   = tokens.filter((t) => categorize(t) === "shadow");

  const { spaceNames, radii, borders, fontWeights, fontSizes, rings, ringOffsets } = sets;

  let out = "";
  out += "/* Design System — Tokens used by this component\n";
  out += " * Auto-generated by scripts/export-tokens.js — do not edit by hand.\n";
  out += " */\n\n:root {\n";

  if (colors.length) {
    out += "  /* Colors */\n";
    for (const { name, value } of colors) out += `  --${name}: ${value};\n`;
  }
  if (spaceNames.size) {
    out += "\n  /* Spacing */\n";
    for (const n of spaceNames) out += `  --${n}: ${SPACING_INDEX.get(n)}px;\n`;
  }
  if (radii.size) {
    out += "\n  /* Radius */\n";
    for (const cls of radii) {
      const r = RADIUS[cls];
      out += `  --${r.token}: ${r.px === 9999 ? "9999px" : r.px + "px"};\n`;
    }
  }
  if (borders.size) {
    out += "\n  /* Border width */\n";
    for (const cls of borders) {
      const b = BORDER_WIDTH[cls];
      out += `  --${b.token}: ${b.px}px;\n`;
    }
  }
  if (fontSizes.size) {
    out += "\n  /* Font size */\n";
    for (const px of [...fontSizes].sort((a, b) => a - b)) {
      out += `  --font-size-${px}: ${px}px;\n`;
    }
  }
  if (fontWeights.size) {
    out += "\n  /* Font weight */\n";
    for (const cls of fontWeights) {
      const f = FONT_WEIGHT[cls];
      out += `  --${f.token}: ${f.value};\n`;
    }
  }
  if (rings.size || ringOffsets.size) {
    out += "\n  /* Focus ring */\n";
    for (const cls of rings) {
      const r = RING_WIDTH[cls];
      out += `  --${r.token}: ${r.px}px;\n`;
    }
    for (const cls of ringOffsets) {
      const r = RING_OFFSET[cls];
      out += `  --${r.token}: ${r.px}px;\n`;
    }
  }
  if (zIndex.length) {
    out += "\n  /* Z-Index */\n";
    for (const { name, value } of zIndex) out += `  --${name}: ${value};\n`;
  }
  if (durations.length) {
    out += "\n  /* Motion durations */\n";
    for (const { name, value } of durations) out += `  --${name}: ${value};\n`;
  }
  if (shadows.length) {
    out += "\n  /* Shadows */\n";
    for (const { name, value } of shadows) out += `  --${name}: ${value};\n`;
  }
  out += "}\n";
  return out;
}

function buildSwift(tokens, sets) {
  const colors    = tokens.filter((t) => categorize(t) === "color");
  const zIndex    = tokens.filter((t) => categorize(t) === "z");
  const durations = tokens.filter((t) => categorize(t) === "duration");

  const { spaceNames, radii, borders, fontWeights, fontSizes, rings, ringOffsets } = sets;

  let out = "";
  out += "// Design System — Tokens used by this component\n";
  out += "// Auto-generated by scripts/export-tokens.js — do not edit by hand.\n";
  out += "// Assumes UIColor(hex:) initializer exists in your project.\n\n";
  out += "import UIKit\n";

  if (colors.length) {
    out += "\n// MARK: - Colors\n\nextension UIColor {\n";
    for (const { name, value } of colors) {
      out += `    static let ${toCamel(name.replace(/^s4e-/, ""))} = UIColor(hex: "${value.toUpperCase()}")\n`;
    }
    out += "}\n";
  }

  // CGFloat extension — spacing + radius + border + font size + ring widths
  const hasCGFloat = spaceNames.size || radii.size || borders.size || fontSizes.size || rings.size || ringOffsets.size;
  if (hasCGFloat) {
    out += "\n// MARK: - Sizing (CGFloat)\n\nextension CGFloat {\n";
    if (spaceNames.size) {
      out += "    // Spacing\n";
      for (const n of spaceNames) out += `    static let ${toCamel(n)}: CGFloat = ${SPACING_INDEX.get(n)}\n`;
    }
    if (radii.size) {
      out += "\n    // Radius\n";
      for (const cls of radii) {
        const r = RADIUS[cls];
        out += `    static let ${toCamel(r.token)}: CGFloat = ${r.px}\n`;
      }
    }
    if (borders.size) {
      out += "\n    // Border width\n";
      for (const cls of borders) {
        const b = BORDER_WIDTH[cls];
        out += `    static let ${toCamel(b.token)}: CGFloat = ${b.px}\n`;
      }
    }
    if (fontSizes.size) {
      out += "\n    // Font size\n";
      for (const px of [...fontSizes].sort((a, b) => a - b)) {
        out += `    static let fontSize${px}: CGFloat = ${px}\n`;
      }
    }
    if (rings.size) {
      out += "\n    // Focus ring width\n";
      for (const cls of rings) {
        const r = RING_WIDTH[cls];
        out += `    static let ${toCamel(r.token)}: CGFloat = ${r.px}\n`;
      }
    }
    if (ringOffsets.size) {
      out += "\n    // Focus ring offset\n";
      for (const cls of ringOffsets) {
        const r = RING_OFFSET[cls];
        out += `    static let ${toCamel(r.token)}: CGFloat = ${r.px}\n`;
      }
    }
    out += "}\n";
  }

  if (fontWeights.size) {
    out += "\n// MARK: - Font weights (use UIFont.Weight directly)\n";
    for (const cls of fontWeights) {
      const f = FONT_WEIGHT[cls];
      out += `// ${f.token} → ${f.swift}   (CSS ${f.value})\n`;
    }
  }

  if (zIndex.length) {
    out += "\n// MARK: - Z-Index Layers\n\nextension Int {\n";
    for (const { name, value } of zIndex) {
      out += `    static let ${toCamel(name.replace(/^s4e-/, ""))}: Int = ${Number(value)}\n`;
    }
    out += "}\n";
  }
  if (durations.length) {
    out += "\n// MARK: - Motion Durations (TimeInterval, seconds)\n\nextension TimeInterval {\n";
    for (const { name, value } of durations) {
      const ms = parseInt(value, 10);
      const s  = (ms / 1000).toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
      out += `    static let ${toCamel(name.replace(/^s4e-/, ""))}: TimeInterval = ${s}\n`;
    }
    out += "}\n";
  }
  return out;
}

function buildAndroidXml(tokens, sets) {
  const colors    = tokens.filter((t) => categorize(t) === "color");
  const zIndex    = tokens.filter((t) => categorize(t) === "z");
  const durations = tokens.filter((t) => categorize(t) === "duration");

  const { spaceNames, radii, borders, fontWeights, fontSizes, rings, ringOffsets } = sets;

  let out = '<?xml version="1.0" encoding="utf-8"?>\n';
  out += "<!-- Design System — Tokens used by this component\n";
  out += "     Auto-generated by scripts/export-tokens.js — do not edit by hand. -->\n";
  out += "<resources>\n";

  if (colors.length) {
    out += "\n    <!-- Colors -->\n";
    for (const { name, value } of colors) {
      out += `    <color name="${toSnake(name.replace(/^s4e-/, ""))}">${escapeXml(value.toUpperCase())}</color>\n`;
    }
  }
  if (spaceNames.size) {
    out += "\n    <!-- Spacing -->\n";
    for (const n of spaceNames) out += `    <dimen name="${toSnake(n)}">${SPACING_INDEX.get(n)}dp</dimen>\n`;
  }
  if (radii.size) {
    out += "\n    <!-- Radius -->\n";
    for (const cls of radii) {
      const r = RADIUS[cls];
      out += `    <dimen name="${toSnake(r.token)}">${r.px}dp</dimen>\n`;
    }
  }
  if (borders.size) {
    out += "\n    <!-- Border width -->\n";
    for (const cls of borders) {
      const b = BORDER_WIDTH[cls];
      out += `    <dimen name="${toSnake(b.token)}">${b.px}dp</dimen>\n`;
    }
  }
  if (fontSizes.size) {
    out += "\n    <!-- Font size -->\n";
    for (const px of [...fontSizes].sort((a, b) => a - b)) {
      out += `    <dimen name="font_size_${px}">${px}sp</dimen>\n`;
    }
  }
  if (fontWeights.size) {
    out += "\n    <!-- Font weight -->\n";
    for (const cls of fontWeights) {
      const f = FONT_WEIGHT[cls];
      out += `    <integer name="${toSnake(f.token)}">${f.value}</integer>\n`;
    }
  }
  if (rings.size || ringOffsets.size) {
    out += "\n    <!-- Focus ring -->\n";
    for (const cls of rings) {
      const r = RING_WIDTH[cls];
      out += `    <dimen name="${toSnake(r.token)}">${r.px}dp</dimen>\n`;
    }
    for (const cls of ringOffsets) {
      const r = RING_OFFSET[cls];
      out += `    <dimen name="${toSnake(r.token)}">${r.px}dp</dimen>\n`;
    }
  }
  if (zIndex.length) {
    out += "\n    <!-- Z-Index Layers -->\n";
    for (const { name, value } of zIndex) {
      out += `    <integer name="${toSnake(name.replace(/^s4e-/, ""))}">${Number(value)}</integer>\n`;
    }
  }
  if (durations.length) {
    out += "\n    <!-- Motion Durations (milliseconds) -->\n";
    for (const { name, value } of durations) {
      const ms = parseInt(value, 10);
      out += `    <integer name="${toSnake(name.replace(/^s4e-/, ""))}">${ms}</integer>\n`;
    }
  }
  out += "\n</resources>\n";
  return out;
}

// ── Main: walk slugs under app/styleguide/ ────────────────────────────────

function isSlugDir(name) {
  return !name.startsWith("_") && !name.startsWith(".") && !name.endsWith(".tsx") && !name.endsWith(".ts");
}

const slugs = fs.readdirSync(STYLEGUIDE, { withFileTypes: true })
  .filter((e) => e.isDirectory() && isSlugDir(e.name))
  .map((e) => e.name);

let total = 0;
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const slug of slugs) {
  if (EXCLUDE.has(slug)) continue;
  const sources = sourcesForSlug(slug);
  if (sources.length === 0) continue;

  const sets   = extractTokensUsed(sources);
  const tokens = ALL_TOKENS.filter((t) => sets.tokenNames.has(t.name));

  const anyMore =
    sets.radii.size || sets.borders.size || sets.fontWeights.size ||
    sets.fontSizes.size || sets.rings.size || sets.ringOffsets.size;

  // Skip slugs that don't actually use any design-system token
  if (tokens.length === 0 && sets.spaceNames.size === 0 && !anyMore) continue;

  const outDir = path.join(OUT_DIR, slug);
  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, "tokens.css"),   buildCss(tokens, sets));
  fs.writeFileSync(path.join(outDir, "tokens.swift"), buildSwift(tokens, sets));
  fs.writeFileSync(path.join(outDir, "tokens.xml"),   buildAndroidXml(tokens, sets));

  total++;
  const extras = [
    sets.radii.size       && `${sets.radii.size}r`,
    sets.borders.size     && `${sets.borders.size}b`,
    sets.fontSizes.size   && `${sets.fontSizes.size}fs`,
    sets.fontWeights.size && `${sets.fontWeights.size}fw`,
    sets.rings.size       && `${sets.rings.size}rw`,
    sets.ringOffsets.size && `${sets.ringOffsets.size}ro`,
  ].filter(Boolean).join(" ");
  console.log(`  ${slug}: ${tokens.length} tokens · ${sets.spaceNames.size} spacing${extras ? " · " + extras : ""}`);
}

console.log(`✓ export-tokens — generated per-component tokens for ${total} slugs → ${path.relative(ROOT, OUT_DIR)}/`);

// ── Master "install once" bundle ──────────────────────────────────────────
//
// Emits public/tokens/_all/tokens.{css,swift,xml} containing the COMPLETE
// token set (every color, every spacing/radius/border/font/ring used anywhere
// in the system). Powers the /styleguide/tokens install page.

const allTokens = ALL_TOKENS.filter((t) => categorize(t) !== null);
const allSets = {
  spaceNames:  new Set(SPACING.map((s) => s[0])),
  radii:       new Set(Object.keys(RADIUS)),
  borders:     new Set(Object.keys(BORDER_WIDTH)),
  fontWeights: new Set(Object.keys(FONT_WEIGHT)),
  fontSizes:   new Set([10, 11, 12, 13, 14, 15, 16, 18, 20, 24, 32, 48]),
  rings:       new Set(Object.keys(RING_WIDTH)),
  ringOffsets: new Set(Object.keys(RING_OFFSET)),
};

const masterDir = path.join(OUT_DIR, "_all");
fs.mkdirSync(masterDir, { recursive: true });
fs.writeFileSync(path.join(masterDir, "tokens.css"),   buildCss(allTokens, allSets));
fs.writeFileSync(path.join(masterDir, "tokens.swift"), buildSwift(allTokens, allSets));
fs.writeFileSync(path.join(masterDir, "tokens.xml"),   buildAndroidXml(allTokens, allSets));
console.log(`✓ master bundle: ${allTokens.length} tokens · all scales → ${path.relative(ROOT, masterDir)}/`);

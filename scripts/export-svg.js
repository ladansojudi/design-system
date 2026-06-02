#!/usr/bin/env node
/**
 * SVG export — generates per-variant SVG renderings of components for
 * designers to paste into Figma as editable vectors.
 *
 * Approach: hand-crafted SVG using design-token values. Each variant
 * becomes a <rect> + <text> + optionally <circle> / <path>, which Figma
 * imports as editable layers (fill, stroke, font, all live).
 *
 * Outputs:  public/svg/<component>/<variant>.svg
 *
 * Run manually: `npm run svg`
 * Auto-runs:    `npm run export` (chained into prebuild)
 */

const fs   = require("fs");
const path = require("path");

const ROOT    = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "svg");

// ── Token palette (mirrored from app/globals.css light values) ────────────

const SCALE_50  = { yellow: "#fffbf0", red: "#fcf3f2", green: "#f1ffdb", blue: "#f7fafd" };
const SCALE_500 = { yellow: "#f5bf40", red: "#d13d2e", green: "#63a100", blue: "#7dafd6" };
const SCALE_600 = { yellow: "#a87c00", red: "#b0291e", green: "#406800", blue: "#2f6893" };

const BRAND_50  = "#e8f4fd";
const BRAND_500 = "#1383d4";
const BRAND_700 = "#09436c";

const NEUTRAL = {
  grey00: "#ffffff", grey100: "#f7f8f8", grey200: "#eef0f0",
  grey300: "#dfe2e2", grey400: "#c9cfcf", grey500: "#949e9e",
  grey800: "#1f2323", grey900: "#0f1010",
};

const TEXT = { primary: "#121f28", secondary: "#657078", disabled: "#a7adb2", inverse: "#ffffff", link: "#0066cc", error: "#b0291e" };

const SEVERITY = {
  critical: "#772ed1",
  high:     "#d13d2e",
  medium:   "#f5bf40",
  low:      "#63a100",
  info:     "#7dafd6",
};

const FONT = "Inter, system-ui, sans-serif";

function approxTextW(label, font) {
  return Math.ceil(label.length * font * 0.55);
}

function svg(width, height, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n${body}\n</svg>\n`;
}

function write(component, variant, content) {
  const dir = path.join(OUT_DIR, component);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${variant}.svg`), content);
}

// ── Button ────────────────────────────────────────────────────────────────

const BUTTON_VARIANT = {
  default: {
    solid:   { fill: TEXT.primary, text: TEXT.inverse, stroke: null },
    outline: { fill: "none", text: TEXT.primary, stroke: NEUTRAL.grey300 },
    ghost:   { fill: "none", text: TEXT.primary, stroke: null },
  },
  primary: {
    solid:   { fill: "#0f69aa", text: TEXT.inverse, stroke: null },
    outline: { fill: "none", text: TEXT.link, stroke: TEXT.link },
    ghost:   { fill: "none", text: TEXT.link, stroke: null },
  },
  destructive: {
    solid:   { fill: "#ae2700", text: TEXT.inverse, stroke: null },
    outline: { fill: "none", text: TEXT.error, stroke: TEXT.error },
    ghost:   { fill: "none", text: TEXT.error, stroke: null },
  },
};

function generateButtons() {
  const intents = Object.keys(BUTTON_VARIANT);
  const styles  = ["solid", "outline", "ghost"];
  const labels  = { solid: "Solid", outline: "Outline", ghost: "Ghost" };
  const H = 36, font = 13, padX = 16, radius = 6;
  let count = 0;
  for (const intent of intents) {
    for (const style of styles) {
      const c = BUTTON_VARIANT[intent][style];
      const label = labels[style];
      const w = approxTextW(label, font) + padX * 2;
      const fillAttr   = c.fill === "none" ? `fill="none"` : `fill="${c.fill}"`;
      const strokeAttr = c.stroke ? ` stroke="${c.stroke}" stroke-width="1"` : "";
      const body =
`  <rect width="${w}" height="${H}" rx="${radius}" ${fillAttr}${strokeAttr}/>
  <text x="${w / 2}" y="${H / 2}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="${font}" font-weight="500" fill="${c.text}">${label}</text>`;
      write("button", `${intent}-${style}`, svg(w, H, body));
      count++;
    }
  }
  return count;
}

// ── Badge (filled with optional left dot) ─────────────────────────────────

const BADGE_COLOR = {
  warning: { bg: SCALE_50.yellow, text: "#805a00", dot: SCALE_500.yellow, label: "Warning" },
  error:   { bg: SCALE_50.red,    text: SCALE_600.red,    dot: SCALE_500.red,    label: "Error"   },
  success: { bg: SCALE_50.green,  text: SCALE_600.green,  dot: SCALE_500.green,  label: "Success" },
  neutral: { bg: NEUTRAL.grey100, text: TEXT.secondary,   dot: NEUTRAL.grey400,  label: "Neutral" },
  info:    { bg: SCALE_50.blue,   text: SCALE_600.blue,   dot: SCALE_500.blue,   label: "Info"    },
  primary: { bg: BRAND_50,        text: BRAND_700,        dot: BRAND_500,        label: "Primary" },
};

function generateBadges() {
  const H = 22, font = 11, radius = 4, dotR = 3;
  const colors = Object.keys(BADGE_COLOR);
  let count = 0;
  for (const c of colors) {
    const cfg = BADGE_COLOR[c];
    // Filled with left dot
    {
      const textW = approxTextW(cfg.label, font);
      const padL = 8 + dotR * 2 + 4; // pad + dot + gap
      const padR = 8;
      const w = padL + textW + padR;
      const body =
`  <rect width="${w}" height="${H}" rx="${radius}" fill="${cfg.bg}"/>
  <circle cx="${8 + dotR}" cy="${H / 2}" r="${dotR}" fill="${cfg.dot}"/>
  <text x="${padL}" y="${H / 2}" text-anchor="start" dominant-baseline="central" font-family="${FONT}" font-size="${font}" font-weight="500" fill="${cfg.text}">${cfg.label}</text>`;
      write("badge-tag", `${c}-filled-dot`, svg(w, H, body));
      count++;
    }
    // Filled, no dot (Tag style)
    {
      const textW = approxTextW(cfg.label, font);
      const padX = 8;
      const w = padX * 2 + textW;
      const body =
`  <rect width="${w}" height="${H}" rx="${radius}" fill="${cfg.bg}"/>
  <text x="${w / 2}" y="${H / 2}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="${font}" font-weight="500" fill="${cfg.text}">${cfg.label}</text>`;
      write("badge-tag", `${c}-filled`, svg(w, H, body));
      count++;
    }
  }
  return count;
}

// ── Severity Badge ────────────────────────────────────────────────────────

function generateSeverityBadges() {
  const H = 22, font = 11, radius = 4, padX = 8;
  const labels = { critical: "Critical", high: "High", medium: "Medium", low: "Low", info: "Info" };
  let count = 0;
  for (const sev of Object.keys(SEVERITY)) {
    const label = labels[sev];
    const bg = SEVERITY[sev];
    const textColor = sev === "medium" || sev === "info" ? "#1f2323" : "#ffffff";
    const w = approxTextW(label, font) + padX * 2;
    const body =
`  <rect width="${w}" height="${H}" rx="${radius}" fill="${bg}"/>
  <text x="${w / 2}" y="${H / 2}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="${font}" font-weight="600" fill="${textColor}">${label}</text>`;
    write("severity-badge", sev, svg(w, H, body));
    count++;
  }
  return count;
}

// ── Spinner (static still frame — Figma can animate further) ──────────────

function generateSpinners() {
  // One per tone; medium size (16px)
  const tones = {
    primary: BRAND_500,
    neutral: NEUTRAL.grey500,
    white:   "#ffffff",
  };
  let count = 0;
  for (const tone of Object.keys(tones)) {
    const color = tones[tone];
    const isWhite = tone === "white";
    const size = 16;
    const stroke = 2;
    const r = (size - stroke) / 2;
    const cx = size / 2;
    const cy = size / 2;
    // Draw a 3/4 arc to indicate motion. Track at 30% opacity.
    const body =
`  ${isWhite ? `<rect width="${size + 12}" height="${size + 12}" fill="${NEUTRAL.grey800}"/>` : ""}
  <circle cx="${cx + (isWhite ? 6 : 0)}" cy="${cy + (isWhite ? 6 : 0)}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-opacity="0.3"/>
  <path d="M${cx + (isWhite ? 6 : 0)} ${(isWhite ? 6 : 0) + stroke / 2} a ${r} ${r} 0 0 1 ${r} ${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>`;
    const W = isWhite ? size + 12 : size;
    const H = isWhite ? size + 12 : size;
    write("spinner", tone, svg(W, H, body));
    count++;
  }
  return count;
}

// ── Skeleton ──────────────────────────────────────────────────────────────

function generateSkeletons() {
  const fill = "#eef0f0"; // grey-200
  let count = 0;
  // Line: 192×12, radius 4
  write("skeleton", "line",
    svg(192, 12,
`  <rect width="192" height="12" rx="4" fill="${fill}"/>`));
  count++;
  // Block: 192×64, radius 6
  write("skeleton", "block",
    svg(192, 64,
`  <rect width="192" height="64" rx="6" fill="${fill}"/>`));
  count++;
  // Circle (avatar): 40×40
  write("skeleton", "avatar",
    svg(40, 40,
`  <circle cx="20" cy="20" r="20" fill="${fill}"/>`));
  count++;
  return count;
}

// ── Checkbox ──────────────────────────────────────────────────────────────

function generateCheckboxes() {
  const size = 18, radius = 4;
  let count = 0;
  // Unchecked
  write("checkbox", "unchecked",
    svg(size, size,
`  <rect x="0.5" y="0.5" width="${size - 1}" height="${size - 1}" rx="${radius}" fill="${NEUTRAL.grey00}" stroke="${NEUTRAL.grey400}" stroke-width="1"/>`));
  count++;
  // Checked (primary fill + tick)
  write("checkbox", "checked",
    svg(size, size,
`  <rect width="${size}" height="${size}" rx="${radius}" fill="${BRAND_500}"/>
  <path d="M5 9 L8 12 L13 6" stroke="${TEXT.inverse}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`));
  count++;
  // Indeterminate (primary fill + dash)
  write("checkbox", "indeterminate",
    svg(size, size,
`  <rect width="${size}" height="${size}" rx="${radius}" fill="${BRAND_500}"/>
  <rect x="5" y="8" width="8" height="2" rx="1" fill="${TEXT.inverse}"/>`));
  count++;
  return count;
}

// ── Switch ────────────────────────────────────────────────────────────────

function generateSwitches() {
  const w = 32, h = 18, r = h / 2;
  const knobR = 7;
  let count = 0;
  // Off
  write("switch", "off",
    svg(w, h,
`  <rect width="${w}" height="${h}" rx="${r}" fill="${NEUTRAL.grey300}"/>
  <circle cx="${r}" cy="${r}" r="${knobR}" fill="${NEUTRAL.grey00}"/>`));
  count++;
  // On (primary)
  write("switch", "on",
    svg(w, h,
`  <rect width="${w}" height="${h}" rx="${r}" fill="${BRAND_500}"/>
  <circle cx="${w - r}" cy="${r}" r="${knobR}" fill="${NEUTRAL.grey00}"/>`));
  count++;
  return count;
}

// ── Main ─────────────────────────────────────────────────────────────────

let total = 0;
const counts = {
  button:         generateButtons(),
  "badge-tag":    generateBadges(),
  "severity-badge": generateSeverityBadges(),
  spinner:        generateSpinners(),
  skeleton:       generateSkeletons(),
  checkbox:       generateCheckboxes(),
  switch:         generateSwitches(),
};

for (const [name, n] of Object.entries(counts)) {
  total += n;
  console.log(`  ${name}: ${n} variants`);
}
console.log(`✓ export-svg — ${total} total SVGs → ${path.relative(ROOT, OUT_DIR)}/`);

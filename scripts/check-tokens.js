#!/usr/bin/env node
/**
 * Token guardrails (run by `npm run lint:ds`):
 *   1. Severity colours are their own palette — none equals a feedback scale
 *      colour (red / green / yellow / blue steps) or a feedback text colour.
 *   2. The brand colour stays distinguishable from every severity colour
 *      (CIEDE2000 >= MIN_DELTA_E), in light and dark.
 *   3. Each severity's text colour passes 4.5:1 on its own tint.
 * Exits 1 with a readable message when a rule fails.
 */
const fs = require("fs");
const path = require("path");

const MIN_DELTA_E = 15;
const css = fs.readFileSync(path.resolve(__dirname, "..", "app", "globals.css"), "utf8");

// ── Theme blocks ───────────────────────────────────────────────────────────
const light = css.slice(css.indexOf("\n:root,"), css.indexOf("\n.dark,"));
const dark = css.slice(css.indexOf("\n.dark,"), css.lastIndexOf("\n:root,"));
const top = css.slice(0, css.indexOf("\n:root,")); // severity lives above the theme blocks

function hex(block, name) {
  const m = block.match(new RegExp(`--snt-${name}:\\s*(#[0-9a-fA-F]{6})`));
  return m ? m[1].toLowerCase() : undefined;
}
const get = (theme, name) => hex(theme, name) ?? hex(top, name) ?? hex(light, name);

// ── CIEDE2000 ──────────────────────────────────────────────────────────────
function toLab(h) {
  const n = parseInt(h.slice(1), 16);
  const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(lin);
  const x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.95047;
  const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  const z = (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / 1.08883;
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}
function deltaE(h1, h2) {
  const [L1, a1, b1] = toLab(h1), [L2, a2, b2] = toLab(h2);
  const rad = Math.PI / 180, deg = 180 / Math.PI;
  const C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2), Cm = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Cm ** 7 / (Cm ** 7 + 25 ** 7)));
  const a1p = (1 + G) * a1, a2p = (1 + G) * a2;
  const C1p = Math.hypot(a1p, b1), C2p = Math.hypot(a2p, b2);
  const hp = (b, a) => ((Math.atan2(b, a) * deg) + 360) % 360;
  const h1p = hp(b1, a1p), h2p = hp(b2, a2p);
  const dLp = L2 - L1, dCp = C2p - C1p;
  let dhp = 0;
  if (C1p * C2p !== 0) {
    dhp = h2p - h1p;
    if (dhp > 180) dhp -= 360; else if (dhp < -180) dhp += 360;
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp / 2) * rad);
  const Lbp = (L1 + L2) / 2, Cbp = (C1p + C2p) / 2;
  let hbp = h1p + h2p;
  if (C1p * C2p !== 0) {
    hbp = Math.abs(h1p - h2p) > 180 ? (h1p + h2p + (h1p + h2p < 360 ? 360 : -360)) / 2 : (h1p + h2p) / 2;
  }
  const T = 1 - 0.17 * Math.cos((hbp - 30) * rad) + 0.24 * Math.cos(2 * hbp * rad) + 0.32 * Math.cos((3 * hbp + 6) * rad) - 0.2 * Math.cos((4 * hbp - 63) * rad);
  const dTh = 30 * Math.exp(-(((hbp - 275) / 25) ** 2));
  const Rc = 2 * Math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7));
  const Sl = 1 + (0.015 * (Lbp - 50) ** 2) / Math.sqrt(20 + (Lbp - 50) ** 2);
  const Sc = 1 + 0.045 * Cbp, Sh = 1 + 0.015 * Cbp * T;
  const Rt = -Math.sin(2 * dTh * rad) * Rc;
  return Math.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh));
}

// ── Rules ──────────────────────────────────────────────────────────────────
const SEVERITIES = ["critical", "high", "medium", "low", "info"];
const errors = [];

// 1. No severity colour is reused by a feedback colour.
const feedback = {};
for (const hue of ["red", "green", "yellow", "blue", "purple"]) {
  for (const step of [50, 100, 200, 500, 600, 700, 800]) {
    const v = get(light, `scale-${hue}-${step}`);
    if (v) feedback[`scale-${hue}-${step}`] = v;
  }
}
for (const t of ["text-success", "text-warning", "text-error", "text-info"]) {
  for (const [label, theme] of [["light", light], ["dark", dark]]) {
    const v = get(theme, t);
    if (v) feedback[`${t} (${label})`] = v;
  }
}
for (const sev of SEVERITIES) {
  const v = get(light, `severity-${sev}`);
  if (!v) { errors.push(`--snt-severity-${sev} is missing or not a #rrggbb value`); continue; }
  for (const [name, fv] of Object.entries(feedback)) {
    if (fv === v) errors.push(`--snt-severity-${sev} (${v}) is the same colour as ${name}. Severity needs its own value.`);
  }
}

// 2. The brand colour stays apart from the severity palette.
let closest = { de: Infinity };
for (const [label, theme] of [["light", light], ["dark", dark]]) {
  for (const step of [500, 600]) {
    const brand = get(theme, `brand-primary-${step}`);
    if (!brand) continue;
    for (const sev of SEVERITIES) {
      const v = get(theme, `severity-${sev}`);
      const de = deltaE(brand, v);
      if (de < closest.de) closest = { de, brand: `brand-primary-${step} ${label} ${brand}`, sev: `${sev} ${v}` };
      if (de < MIN_DELTA_E) {
        errors.push(`brand-primary-${step} (${label}, ${brand}) is too close to severity-${sev} (${v}): ΔE ${de.toFixed(1)} < ${MIN_DELTA_E}.`);
      }
    }
  }
}

// 3. Severity text is readable on its own tint (WCAG AA, 4.5:1), in both themes.
function contrast(h1, h2) {
  const lum = (h) => {
    const n = parseInt(h.slice(1), 16);
    const f = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f((n >> 16) & 255) + 0.7152 * f((n >> 8) & 255) + 0.0722 * f(n & 255);
  };
  const [a, b] = [lum(h1), lum(h2)];
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
for (const [label, theme] of [["light", light], ["dark", dark]]) {
  for (const sev of SEVERITIES) {
    const t = get(theme, `severity-${sev}-text`), bg = get(theme, `severity-${sev}-subtle`);
    if (!t || !bg) { errors.push(`--snt-severity-${sev}-text / -subtle missing (${label})`); continue; }
    const c = contrast(t, bg);
    if (c < 4.5) errors.push(`severity-${sev}-text on its subtle tint is ${c.toFixed(2)}:1 in ${label} (needs 4.5:1).`);
  }
}

if (errors.length) {
  console.error("✗ check-tokens");
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
console.log(`✓ check-tokens: severity palette is separate and its text passes AA; brand is ≥ ΔE ${MIN_DELTA_E} from it (closest: ${closest.sev} vs ${closest.brand}, ΔE ${closest.de.toFixed(1)})`);
module.exports = { deltaE };

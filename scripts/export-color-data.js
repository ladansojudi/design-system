#!/usr/bin/env node
/**
 * Keeps components/styleguide/color-data.ts in step with app/globals.css.
 *
 * The Colors page lists every token with its light and dark value. Those
 * values used to be typed in by hand and drifted from the real tokens. This
 * script reads the :root (light) and .dark blocks of globals.css, resolves
 * var() references, and rewrites lightHex / darkHex for each entry whose
 * bgClass names a token (bg-snt-<name> → --snt-<name>).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const css = fs.readFileSync(path.join(ROOT, "app/globals.css"), "utf8");
const FILE = path.join(ROOT, "components/styleguide/color-data.ts");

function block(startRe) {
  const m = startRe.exec(css);
  if (!m) return {};
  let i = css.indexOf("{", m.index) + 1, depth = 1;
  const start = i;
  while (depth && i < css.length) { if (css[i] === "{") depth++; else if (css[i] === "}") depth--; i++; }
  const vars = {};
  for (const d of css.slice(start, i - 1).matchAll(/(--snt-[\w-]+)\s*:\s*([^;]+);/g)) vars[d[1]] = d[2].trim().replace(/\/\*.*?\*\//g, "").trim();
  return vars;
}

const light = block(/^:root,\s*\n:root\s*{|^:root\s*,?\s*{/m);
// First :root block in the file is the light theme; .dark follows.
const first = /^:root,?[^{]*{/m.exec(css);
const lightVars = first ? block(/^:root,?[^{]*{/m) : light;
const darkVars = block(/^\.dark,?[^{]*{/m);

function resolve(name, theme, seen = new Set()) {
  if (seen.has(name)) return null;
  seen.add(name);
  const table = theme === "dark" ? { ...lightVars, ...darkVars } : lightVars;
  const v = table[name];
  if (!v) return null;
  const ref = /^var\((--snt-[\w-]+)\)$/.exec(v);
  return ref ? resolve(ref[1], theme, seen) : v;
}

let src = fs.readFileSync(FILE, "utf8");
let changed = 0, missed = [];
src = src.replace(/(lightHex:\s*)"([^"]*)"(,\s*darkHex:\s*)"([^"]*)"(,\s*bgClass:\s*)"bg-snt-([\w-]+)"/g,
  (all, a, lh, b, dh, c, tok) => {
    const l = resolve(`--snt-${tok}`, "light");
    const d = resolve(`--snt-${tok}`, "dark");
    if (!l || !d) { missed.push(tok); return all; }
    const up = (x) => (/^#[0-9a-f]{3,8}$/i.test(x) ? x.toUpperCase() : x);
    const nl = up(l), nd = up(d);
    if (nl !== lh || nd !== dh) changed++;
    return `${a}"${nl}"${b}"${nd}"${c}"bg-snt-${tok}"`;
  });
fs.writeFileSync(FILE, src);
console.log(`✓ export-color-data — ${changed} entries updated${missed.length ? `, ${missed.length} not resolved (${missed.slice(0, 8).join(", ")}…)` : ""}`);

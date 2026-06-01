#!/usr/bin/env node
/**
 * Component source export — copies each file in components/ui/ to
 * public/components/<name>.tsx.txt so the styleguide can fetch and render
 * the source for shadcn-style "Manual install" copy-paste.
 *
 * Run manually: `npm run components`
 * Auto-runs:   `npm run build` (via the prebuild script in package.json)
 */

const fs   = require("fs");
const path = require("path");

const ROOT    = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "components", "ui");
const OUT_DIR = path.join(ROOT, "public", "components");

// Files in components/ui/ that aren't part of the published library —
// scaffolding or third-party wrappers we don't want users to copy.
const EXCLUDE = new Set([
  "scroll-area.tsx",  // utility used by sidebar, not a documented component
  "card.tsx",         // unused shadcn scaffold; Cards organism uses cards.tsx
]);

fs.mkdirSync(OUT_DIR, { recursive: true });

let entries;
try { entries = fs.readdirSync(SRC_DIR, { withFileTypes: true }); }
catch { console.error(`export-components: ${SRC_DIR} not found`); process.exit(1); }

let total = 0;
for (const e of entries) {
  if (!e.isFile()) continue;
  if (!/\.tsx?$/.test(e.name)) continue;
  if (EXCLUDE.has(e.name)) continue;

  const src  = fs.readFileSync(path.join(SRC_DIR, e.name), "utf8");
  const slug = e.name.replace(/\.tsx?$/, "");
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.tsx.txt`), src);

  total++;
  console.log(`  ${slug}: ${src.split("\n").length} lines`);
}

console.log(`✓ export-components — copied ${total} components → ${path.relative(ROOT, OUT_DIR)}/`);

#!/usr/bin/env node
/**
 * Registry + manifest export — makes every component installable with the
 * shadcn CLI and describable to tools/agents as structured data.
 *
 * Outputs:
 *   registry.json              — shadcn registry definition (input to `shadcn build`)
 *   public/r/<name>.json       — built registry items (via `shadcn build`)
 *   public/sentinel-manifest.json   — machine-readable component manifest: props
 *                                (from the TypeScript source), defaults,
 *                                status, docs/source/install links, tokens used
 *
 * Install from a consumer project:
 *   npx shadcn add <SITE_URL>/r/button.json
 *
 * Set SITE_URL (e.g. on the deploy) so cross-item links are absolute.
 *
 * Run manually: `npm run registry`
 * Auto-runs:   `npm run build` (via the prebuild script in package.json)
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ts = require("typescript");

const ROOT     = path.resolve(__dirname, "..");
const UI_DIR   = path.join(ROOT, "components", "ui");
const DOCS_DIR = path.join(ROOT, "docs", "components");
const PUBLIC   = path.join(ROOT, "public");
const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const PKG      = require(path.join(ROOT, "package.json"));

if (!process.env.SITE_URL) {
  console.warn("  export-registry: SITE_URL not set — registry links point at http://localhost:3000");
}

// ── Docs front-matter (title, category, status, summary) ───────────────────

function readDoc(slug) {
  const file = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = {};
  for (const line of (fm ? fm[1] : "").split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim();
  }
  const body = fm ? raw.slice(fm[0].length) : raw;
  const summary = ((body.split(/\n#\s.+\n/)[1] ?? "").trim().split(/\n\n/).find((p) => !p.startsWith(">")) ?? "")
    .replace(/\s+/g, " ");
  const section = (title) => {
    const m = body.match(new RegExp(`### ${title}\\n([\\s\\S]*?)(?=\\n#{2,3} )`));
    return m ? m[1].trim().split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(2).trim()) : [];
  };
  return { meta, summary, whenToUse: section("When to use"), whenNotToUse: section("When not to use") };
}

// ── TypeScript API extraction ──────────────────────────────────────────────

function extractApi(file) {
  const src = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const isExported = (n) => n.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
  const deprecated = (n) => ts.getJSDocTags(n).some((t) => t.tagName.text === "deprecated");
  const docText = (n) => ts.getJSDocCommentsAndTags(n).map((d) => (typeof d.comment === "string" ? d.comment : "")).join(" ").trim() || undefined;

  const exports = [], props = {}, types = {}, defaults = {};
  // Non-exported aliases (type Intent = "default" | …) are inlined into prop types.
  const localAliases = {};
  for (const st of sf.statements) {
    if (ts.isTypeAliasDeclaration(st) && !isExported(st)) localAliases[st.name.text] = st.type.getText(sf).replace(/\s+/g, " ");
  }
  const resolve = (text) => text.replace(/\b[A-Z]\w*\b/g, (id) => (localAliases[id] && /^["'|\s\w-]+$/.test(localAliases[id]) ? localAliases[id] : id));
  const visitDefaults = (node) => {
    if (ts.isObjectBindingPattern(node)) {
      for (const el of node.elements) {
        if (el.initializer && ts.isIdentifier(el.propertyName ?? el.name)) {
          defaults[(el.propertyName ?? el.name).text] = el.initializer.getText(sf);
        }
      }
    }
    ts.forEachChild(node, visitDefaults);
  };

  for (const st of sf.statements) {
    if (ts.isVariableStatement(st) && isExported(st)) {
      for (const d of st.declarationList.declarations) exports.push(d.name.getText(sf));
    }
    if (ts.isFunctionDeclaration(st) && isExported(st) && st.name) exports.push(st.name.text);
    if (ts.isInterfaceDeclaration(st) && isExported(st)) {
      props[st.name.text] = {
        extends: st.heritageClauses?.map((h) => h.types.map((t) => t.getText(sf)).join(", ")).join(", "),
        members: st.members.filter(ts.isPropertySignature).map((m) => ({
          name: m.name.getText(sf),
          type: m.type ? resolve(m.type.getText(sf).replace(/\s+/g, " ")) : "unknown",
          optional: !!m.questionToken,
          ...(deprecated(m) ? { deprecated: true } : {}),
          ...(docText(m) ? { description: docText(m) } : {}),
        })),
      };
    }
    if (ts.isTypeAliasDeclaration(st) && isExported(st)) {
      const entry = { type: st.type.getText(sf).replace(/\s+/g, " "), ...(deprecated(st) ? { deprecated: true } : {}) };
      if (/Props$/.test(st.name.text)) props[st.name.text] = { extends: entry.type, members: [] };
      else types[st.name.text] = entry;
    }
    visitDefaults(st);
  }
  for (const p of Object.values(props)) for (const m of p.members) if (defaults[m.name] !== undefined) m.default = defaults[m.name];

  const imports = [...src.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
  const tokens = [...new Set([...src.matchAll(/(?:bg|text|border|ring|divide|fill|stroke|shadow)-(snt-[a-z0-9-]+)/g)].map((m) => m[1]))].sort();
  return { exports, props, types, imports, tokens, client: src.startsWith('"use client"') };
}

// ── Build registry.json ────────────────────────────────────────────────────

const EXCLUDE = new Set(["scroll-area.tsx"]);   // same as export-components.js
const THEME_URL = `${SITE_URL}/r/theme.json`;
const UTILS_URL = `${SITE_URL}/r/utils.json`;
const NPM_DEPS = (imports) => imports.filter((i) => !i.startsWith("@/") && !["react", "react-dom"].includes(i) && !i.startsWith("react/"));

const items = [{
  name: "theme",
  type: "registry:item",
  title: "Sentinel theme",
  description: "Sentinel design tokens (light + dark) and the Tailwind v4 @theme mapping. Install once before any component.",
  files: [{ path: "public/theme.css", type: "registry:file", target: "styles/sentinel-theme.css" }],
  docs: "Add `@import \"../styles/sentinel-theme.css\";` (path relative to your global CSS) right after `@import \"tailwindcss\";`. Dark mode: add `.dark` or `[data-snt-theme=\"dark\"]` to an ancestor.",
  categories: ["theme"],
}, {
  // Our own cn() (clsx + tailwind-merge). shadcn's built-in "utils" item now
  // re-exports a different package, so components depend on this one instead.
  name: "utils",
  type: "registry:lib",
  title: "Sentinel utils",
  description: "cn() — merges Tailwind class names (clsx + tailwind-merge). Required by every Sentinel component.",
  dependencies: ["clsx", "tailwind-merge"],
  files: [{ path: "lib/utils.ts", type: "registry:lib" }],
  categories: ["lib"],
}];

const manifest = {
  $schema: "sentinel-manifest/1",
  name: "sentinel",
  version: PKG.version,
  homepage: SITE_URL,
  install: { theme: `npx shadcn add ${THEME_URL}`, component: `npx shadcn add ${SITE_URL}/r/<name>.json` },
  rules: `${SITE_URL}/llms.txt`,
  lint: `${SITE_URL}/eslint-plugin-sentinel.mjs`,
  components: [],
};

for (const file of fs.readdirSync(UI_DIR).filter((f) => f.endsWith(".tsx") && !EXCLUDE.has(f)).sort()) {
  const slug = file.replace(/\.tsx$/, "");
  const doc = readDoc(slug);
  const api = extractApi(path.join(UI_DIR, file));
  const deps = NPM_DEPS(api.imports);
  const status = doc?.meta.status ?? "stable";
  items.push({
    name: slug,
    type: "registry:ui",
    title: doc?.meta.title ?? slug,
    description: doc?.summary,
    dependencies: deps.length ? deps : undefined,
    registryDependencies: [UTILS_URL, THEME_URL],
    files: [{ path: `components/ui/${file}`, type: "registry:ui" }],
    docs: `${doc?.meta.title ?? slug} (${status}). Usage, accessibility and known gaps: ${SITE_URL}/docs/components/${slug}.md`,
    categories: [(doc?.meta.category ?? "component").toLowerCase()],
    meta: { status },
  });
  manifest.components.push({
    name: slug,
    title: doc?.meta.title ?? slug,
    category: doc?.meta.category,
    status,
    summary: doc?.summary,
    whenToUse: doc?.whenToUse ?? [],
    whenNotToUse: doc?.whenNotToUse ?? [],
    exports: api.exports,
    props: api.props,
    types: api.types,
    tokens: api.tokens,
    clientComponent: api.client,
    dependencies: deps,
    links: {
      docs: `${SITE_URL}/docs/components/${slug}.md`,
      source: `${SITE_URL}/components/${slug}.tsx.txt`,
      registry: `${SITE_URL}/r/${slug}.json`,
    },
    install: `npx shadcn add ${SITE_URL}/r/${slug}.json`,
  });
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "sentinel",
  homepage: SITE_URL,
  items,
};

fs.writeFileSync(path.join(ROOT, "registry.json"), JSON.stringify(registry, null, 2) + "\n");
fs.writeFileSync(path.join(PUBLIC, "sentinel-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// shadcn builds public/r/*.json, inlining each file's content.
execFileSync(path.join(ROOT, "node_modules", ".bin", "shadcn"), ["build", "registry.json", "-o", "public/r"], { cwd: ROOT, stdio: "inherit" });

console.log(`✓ export-registry — ${items.length} items → public/r/, public/sentinel-manifest.json (${manifest.components.length} components)`);

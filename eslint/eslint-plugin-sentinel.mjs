/**
 * eslint-plugin-sentinel — guardrails that keep human- and AI-written code on the
 * Sentinel design system.
 *
 * Rules
 *   sentinel/no-hardcoded-colors        error  hex/rgb/hsl colours, Tailwind palette
 *                                         classes (bg-red-500) and arbitrary
 *                                         colour classes (bg-[#fff]) instead of
 *                                         snt-* tokens
 *   sentinel/prefer-semantic-tokens     warn   primitives that have a semantic alias
 *                                         (autofix: border-snt-neutral-divider-10
 *                                         → border-snt-border-default)
 *   sentinel/icon-only-needs-label      error  <Button iconOnly> without aria-label
 *   sentinel/no-deprecated-components   warn   importing Banner
 *   sentinel/no-arbitrary-values        warn   text-[13px], p-[7px], gap-[5px] … —
 *                                         use text-snt-<px> and the spacing scale
 *
 * Usage (flat config):
 *   import sentinel from "./eslint/eslint-plugin-sentinel.mjs";
 *   export default [sentinel.configs.recommended];
 */

// ── Shared helpers ─────────────────────────────────────────────────────────

const CLASS_ATTRS = new Set(["className", "class"]);
const COLOR_ATTRS = new Set(["fill", "stroke", "color", "stopColor"]);
const CLASS_FNS = new Set(["cn", "clsx", "cva", "twMerge", "classNames"]);
const STYLE_COLOR_KEYS = /^(color|background|backgroundColor|borderColor|borderTopColor|borderBottomColor|borderLeftColor|borderRightColor|outlineColor|fill|stroke|stopColor|boxShadow|textDecorationColor|caretColor|accentColor)$/;

const RAW_COLOR = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b|\b(?:rgba?|hsla?|oklch)\(/;
const PALETTE = "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const UTIL = "bg|text|border|border-[trblxy]|ring|ring-offset|outline|divide|fill|stroke|from|via|to|placeholder|shadow|accent|caret|decoration";
// Class tokens are unambiguous anywhere in a string, so these two are checked everywhere.
const PALETTE_CLASS = new RegExp(`(?<![\\w-])(?:[a-z-]+:)*(?:${UTIL})-(?:${PALETTE})-\\d{2,3}(?:\\/\\d+)?(?![\\w-])`);
const ARBITRARY_COLOR_CLASS = new RegExp(`(?<![\\w-])(?:[a-z-]+:)*(?:${UTIL})-\\[(?:#|rgb|hsl|oklch|color:)`);
// Typography and spacing only — geometry (w-[7px] dots, h-[22px] tracks) is legitimately off-scale.
const ARBITRARY_VALUE_CLASS = /(?<![\w-])(?:[a-z-]+:)*-?(?:text|leading|tracking|p[trblxy]?|m[trblxy]?|gap(?:-[xy])?|space-[xy])-\[-?\d+(?:\.\d+)?(?:px|rem|em)\]/;

/** Text of a string-ish node (Literal string or TemplateElement), else null. */
function stringValue(node) {
  if (node.type === "Literal" && typeof node.value === "string") return node.value;
  if (node.type === "TemplateElement") return node.value.cooked ?? node.value.raw;
  return null;
}

/** Where a string sits: "class", "style", "color-attr" or null. */
function contextOf(node) {
  for (let p = node.parent, child = node; p; child = p, p = p.parent) {
    if (p.type === "JSXAttribute") {
      const name = p.name && p.name.name;
      if (CLASS_ATTRS.has(name)) return "class";
      if (COLOR_ATTRS.has(name)) return "color-attr";
      if (name === "style") return "style";
      return null;
    }
    if (p.type === "CallExpression" && p.callee.type === "Identifier" && CLASS_FNS.has(p.callee.name)) return "class";
    if (p.type === "Property" && p.value === child) {
      const key = p.key && (p.key.name ?? p.key.value);
      if (typeof key === "string" && STYLE_COLOR_KEYS.test(key)) return "style";
    }
    if (p.type === "Program" || p.type.includes("Function")) return null;
  }
  return null;
}

function forEachString(context, visit) {
  const check = (node) => {
    const value = stringValue(node);
    if (value) visit(node, value);
  };
  return { Literal: check, TemplateElement: check };
}

// ── Rules ──────────────────────────────────────────────────────────────────

const noHardcodedColors = {
  meta: {
    type: "problem",
    docs: { description: "Disallow hard-coded colours; use snt-* design tokens." },
    messages: {
      raw: "Hard-coded colour \"{{match}}\". Use an snt-* token utility (e.g. text-snt-text-secondary) or var(--snt-…).",
      palette: "Tailwind palette class \"{{match}}\" bypasses the design tokens. Use the snt-* equivalent (e.g. bg-snt-bg-error-subtle).",
      arbitrary: "Arbitrary colour class \"{{match}}\". Use an snt-* token utility instead.",
    },
    schema: [],
  },
  create(context) {
    return forEachString(context, (node, value) => {
      let m;
      if ((m = value.match(PALETTE_CLASS))) return context.report({ node, messageId: "palette", data: { match: m[0] } });
      if ((m = value.match(ARBITRARY_COLOR_CLASS))) return context.report({ node, messageId: "arbitrary", data: { match: m[0] } });
      if (contextOf(node) && (m = value.match(RAW_COLOR))) context.report({ node, messageId: "raw", data: { match: m[0] } });
    });
  },
};

// Only aliases whose meaning is unambiguous — tints and reds stay manual
// because the same primitive also carries severity meaning.
const SEMANTIC = [
  ["(?:border|divide)", "neutral-divider-10", "border-default"],
  ["border", "neutral-grey-300", "border-strong"],
  ["border", "brand-primary-600", "border-focus"],
  ["bg", "neutral-grey-100", "bg-subtle"],
  ["ring", "brand-primary-500", "focus-ring"],
];
const SEMANTIC_RE = SEMANTIC.map(([pre, prim, sem]) => ({
  re: new RegExp(`(?<![\\w-])((?:[a-z-]+:)*${pre})-snt-${prim}(?![\\w-])`, "g"),
  prim, sem,
}));

const preferSemanticTokens = {
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: { description: "Prefer semantic Sentinel aliases over scale primitives when one exists." },
    messages: { prefer: "Use \"snt-{{sem}}\" instead of the primitive \"snt-{{prim}}\"." },
    schema: [],
  },
  create(context) {
    const source = context.sourceCode ?? context.getSourceCode();
    return forEachString(context, (node, value) => {
      for (const { re, prim, sem } of SEMANTIC_RE) {
        re.lastIndex = 0;
        if (!re.test(value)) continue;
        context.report({
          node,
          messageId: "prefer",
          data: { prim, sem },
          fix(fixer) {
            const text = source.getText(node);
            re.lastIndex = 0;
            return fixer.replaceText(node, text.replace(re, `$1-snt-${sem}`));
          },
        });
      }
    });
  },
};

const iconOnlyNeedsLabel = {
  meta: {
    type: "problem",
    docs: { description: "Icon-only buttons must have an accessible name." },
    messages: { missing: "<{{name}} iconOnly> needs aria-label (or aria-labelledby) — screen readers announce nothing otherwise." },
    schema: [],
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const name = node.name.type === "JSXIdentifier" ? node.name.name : null;
        if (name !== "Button") return;
        const attrs = node.attributes;
        if (attrs.some((a) => a.type === "JSXSpreadAttribute")) return;
        const iconOnly = attrs.find((a) => a.name && a.name.name === "iconOnly");
        if (!iconOnly) return;
        if (iconOnly.value && iconOnly.value.type === "JSXExpressionContainer" && iconOnly.value.expression.type === "Literal" && iconOnly.value.expression.value === false) return;
        const labelled = attrs.some((a) => a.name && ["aria-label", "aria-labelledby"].includes(a.name.name));
        if (!labelled) context.report({ node, messageId: "missing", data: { name } });
      },
    };
  },
};

const DEPRECATED = { Banner: "Use a full-width <Alert> at the top of the page content (see docs/components/banner.md → Migration)." };
const noDeprecatedComponents = {
  meta: {
    type: "suggestion",
    docs: { description: "Flag deprecated Sentinel components." },
    messages: { deprecated: "{{name}} is deprecated. {{hint}}" },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (!/components\/ui\//.test(node.source.value)) return;
        for (const s of node.specifiers) {
          const imported = s.imported ? s.imported.name ?? s.imported.value : null;
          if (imported && DEPRECATED[imported]) context.report({ node: s, messageId: "deprecated", data: { name: imported, hint: DEPRECATED[imported] } });
        }
      },
    };
  },
};

const noArbitraryValues = {
  meta: {
    type: "suggestion",
    docs: { description: "Prefer the spacing / type scale over arbitrary pixel values." },
    messages: { arbitrary: "Arbitrary value \"{{match}}\" is off the Sentinel scale. Use the type scale (text-snt-10/11/12/14/16/18/20/24/32/48) or a spacing step (p-3, gap-2 …)." },
    schema: [],
  },
  create(context) {
    return forEachString(context, (node, value) => {
      const m = value.match(ARBITRARY_VALUE_CLASS);
      if (m) context.report({ node, messageId: "arbitrary", data: { match: m[0] } });
    });
  },
};

// ── Plugin ─────────────────────────────────────────────────────────────────

const plugin = {
  meta: { name: "eslint-plugin-sentinel", version: "1.0.0" },
  rules: {
    "no-hardcoded-colors": noHardcodedColors,
    "prefer-semantic-tokens": preferSemanticTokens,
    "icon-only-needs-label": iconOnlyNeedsLabel,
    "no-deprecated-components": noDeprecatedComponents,
    "no-arbitrary-values": noArbitraryValues,
  },
};

plugin.configs = {
  recommended: {
    name: "sentinel/recommended",
    files: ["**/*.{jsx,tsx}"],
    plugins: { sentinel: plugin },
    rules: {
      "sentinel/no-hardcoded-colors": "error",
      "sentinel/prefer-semantic-tokens": "warn",
      "sentinel/icon-only-needs-label": "error",
      "sentinel/no-deprecated-components": "warn",
      "sentinel/no-arbitrary-values": "warn",
    },
  },
};

export default plugin;

// Run: node eslint/eslint-plugin-sentinel.test.mjs  (also `npm run lint:rules`)
import { RuleTester } from "eslint";
import plugin from "./eslint-plugin-sentinel.mjs";

const tester = new RuleTester({
  languageOptions: { ecmaVersion: 2022, sourceType: "module", parserOptions: { ecmaFeatures: { jsx: true } } },
});
const { rules } = plugin;

tester.run("no-hardcoded-colors", rules["no-hardcoded-colors"], {
  valid: [
    `<div className="bg-snt-surface-app text-snt-text-secondary" />`,
    `<a href="#abc">skip</a>`,
    `const id = "#fff"; // not a styling context`,
    `<div style={{ color: "var(--snt-text-primary)" }} />`,
    `cn("border-snt-border-default", isOpen && "ring-snt-focus-ring")`,
  ],
  invalid: [
    { code: `<div className="bg-red-500" />`, errors: [{ messageId: "palette" }] },
    { code: `const MAP = { error: "hover:text-rose-600/80" };`, errors: [{ messageId: "palette" }] },
    { code: `<div className="bg-[#1383d4]" />`, errors: [{ messageId: "arbitrary" }] },
    { code: `<div style={{ backgroundColor: "#1383d4" }} />`, errors: [{ messageId: "raw" }] },
    { code: `<svg><path fill="rgb(0,0,0)" /></svg>`, errors: [{ messageId: "raw" }] },
    { code: `cn("p-2", "border-[rgb(0,0,0)]")`, errors: [{ messageId: "arbitrary" }] },
  ],
});

tester.run("prefer-semantic-tokens", rules["prefer-semantic-tokens"], {
  valid: [
    `<div className="border-snt-border-default bg-snt-bg-subtle" />`,
    `<div className="bg-snt-scale-red-50" />`, // ambiguous (error vs severity) — left alone
  ],
  invalid: [
    {
      code: `<div className="border border-snt-neutral-divider-10 hover:bg-snt-neutral-grey-100" />`,
      output: `<div className="border border-snt-border-default hover:bg-snt-neutral-grey-100" />`,
      errors: [{ messageId: "prefer" }, { messageId: "prefer" }],
    },
    {
      code: `const c = "focus-visible:ring-snt-brand-primary-500/40";`,
      output: `const c = "focus-visible:ring-snt-focus-ring/40";`,
      errors: [{ messageId: "prefer" }],
    },
  ],
});

tester.run("icon-only-needs-label", rules["icon-only-needs-label"], {
  valid: [
    `<Button iconOnly aria-label="Re-run scan"><Play /></Button>`,
    `<Button iconOnly={false}>Save</Button>`,
    `<Button {...props} iconOnly />`,
    `<Button>Save</Button>`,
  ],
  invalid: [
    { code: `<Button iconOnly><Play /></Button>`, errors: [{ messageId: "missing" }] },
    { code: `<Button iconOnly={true} title="Run"><Play /></Button>`, errors: [{ messageId: "missing" }] },
  ],
});

tester.run("no-deprecated-components", rules["no-deprecated-components"], {
  valid: [`import { Alert } from "@/components/ui/alert";`],
  invalid: [{ code: `import { Banner } from "@/components/ui/banner";`, errors: [{ messageId: "deprecated" }] }],
});

tester.run("no-arbitrary-values", rules["no-arbitrary-values"], {
  valid: [`<p className="text-snt-14 p-3 w-[calc(100%-2rem)]" />`, `<span className="w-[7px] h-[7px] top-[3px]" />`],
  invalid: [
    { code: `<p className="text-[13px]" />`, errors: [{ messageId: "arbitrary" }] },
    { code: `<p className="hover:px-[7px]" />`, errors: [{ messageId: "arbitrary" }] },
  ],
});

console.log("✓ eslint-plugin-sentinel: all rule tests passed");

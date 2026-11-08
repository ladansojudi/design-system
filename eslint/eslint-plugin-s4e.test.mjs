// Run: node eslint/eslint-plugin-s4e.test.mjs  (also `npm run lint:rules`)
import { RuleTester } from "eslint";
import plugin from "./eslint-plugin-s4e.mjs";

const tester = new RuleTester({
  languageOptions: { ecmaVersion: 2022, sourceType: "module", parserOptions: { ecmaFeatures: { jsx: true } } },
});
const { rules } = plugin;

tester.run("no-hardcoded-colors", rules["no-hardcoded-colors"], {
  valid: [
    `<div className="bg-s4e-surface-app text-s4e-text-secondary" />`,
    `<a href="#abc">skip</a>`,
    `const id = "#fff"; // not a styling context`,
    `<div style={{ color: "var(--s4e-text-primary)" }} />`,
    `cn("border-s4e-border-default", isOpen && "ring-s4e-focus-ring")`,
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
    `<div className="border-s4e-border-default bg-s4e-bg-subtle" />`,
    `<div className="bg-s4e-scale-red-50" />`, // ambiguous (error vs severity) — left alone
  ],
  invalid: [
    {
      code: `<div className="border border-s4e-neutral-divider-10 hover:bg-s4e-neutral-grey-100" />`,
      output: `<div className="border border-s4e-border-default hover:bg-s4e-neutral-grey-100" />`,
      errors: [{ messageId: "prefer" }, { messageId: "prefer" }],
    },
    {
      code: `const c = "focus-visible:ring-s4e-brand-primary-500/40";`,
      output: `const c = "focus-visible:ring-s4e-focus-ring/40";`,
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
  valid: [`<p className="text-sm p-3 w-[calc(100%-2rem)]" />`],
  invalid: [{ code: `<p className="text-[13px]" />`, errors: [{ messageId: "arbitrary" }] }],
});

console.log("✓ eslint-plugin-s4e: all rule tests passed");

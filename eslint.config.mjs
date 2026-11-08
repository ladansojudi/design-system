import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import globals from "globals";
import s4e from "./eslint/eslint-plugin-s4e.mjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Build scripts are plain Node CommonJS.
  {
    files: ["scripts/**/*.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  // Design-system guardrails on the distributable components.
  {
    ...s4e.configs.recommended,
    files: ["components/ui/**/*.tsx"],
    rules: {
      ...s4e.configs.recommended.rules,
      // Known debt: components still use text-[Npx] until the type scale lands.
      "s4e/no-arbitrary-values": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

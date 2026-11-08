import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import globals from "globals";
import sentinel from "./eslint/eslint-plugin-sentinel.mjs";

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
    ...sentinel.configs.recommended,
    files: ["components/ui/**/*.tsx"],
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

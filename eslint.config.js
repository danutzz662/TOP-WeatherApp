import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  { ignores: ["node_modules/**", "dist/**", "build/**"] },
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  prettierRecommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
  },
];

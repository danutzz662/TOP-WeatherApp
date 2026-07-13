import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  { ignores: ["node_modules/**", "dist/**", "build/**"] },
  js.configs.recommended,
  ...compat.extends("google"),
  ...compat.extends("plugin:import/recommended"),
  ...compat.extends("plugin:prettier/recommended"),
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "valid-jsdoc": "off",
      "require-jsdoc": "off",
    },
  },
];

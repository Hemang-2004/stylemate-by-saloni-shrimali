import { FlatCompat } from "@eslint/eslintrc";
import next from "eslint-plugin-next";
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: { next, ts },
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },
    rules: {
      "next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
      "prettier/prettier": "warn",
    },
  },
  prettier,
];

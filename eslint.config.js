import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

import eslint from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  {
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: reactHooksPlugin.configs.recommended.rules,
  },
  ...pluginRouter.configs["flat/recommended"],
  ...pluginQuery.configs["flat/recommended"],
  {
    ignores: ["dist/**"],
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            {
              pattern: "@*/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
    },
  },
];

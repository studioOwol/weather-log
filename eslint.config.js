import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import importPlugin from "eslint-plugin-import"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import unusedImports from "eslint-plugin-unused-imports"
import globals from "globals"

export default defineConfig([
  globalIgnores(["node_modules", "dist", "build", ".vite", "coverage"]),
  {
    files: ["**/*.{js,jsx}", "src/**/*.{js,jsx}"],
    plugins: {
      react,
      import: importPlugin,
      "react-hooks": reactHooks,
      "unused-imports": unusedImports,
    },
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "no-var": "error",
      "prefer-const": "warn",
      "object-shorthand": ["warn", "always"],
      "prefer-template": "warn",
      eqeqeq: ["error", "smart"],
      curly: ["error", "multi-line"],
      "no-debugger": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unreachable-loop": "error",
      "no-constructor-return": "error",
      "no-constant-binary-expression": "error",
      "default-param-last": "warn",
      "arrow-body-style": ["warn", "as-needed"],
      "no-useless-return": "warn",
      yoda: ["error", "never"],

      "import/no-duplicates": "error",
      "import/newline-after-import": ["warn", { count: 1 }],
      "import/order": "off",

      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": ["warn", { args: "after-used", ignoreRestSiblings: true }],

      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "react/jsx-key": ["error", { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true }],
      "react/no-unknown-property": "error",
      "react/self-closing-comp": "warn",
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],
      "react/jsx-no-bind": ["warn", { allowArrowFunctions: true }],
      "react/jsx-no-duplicate-props": ["error", { ignoreCase: true }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": "off",
    },
  },

  {
    files: ["eslint.config.js", "prettier.config.*", "vite.config.*", "scripts/**/*.{js,jsx}"],
    languageOptions: {
      sourceType: "module",
      globals: globals.node,
    },
  },
])

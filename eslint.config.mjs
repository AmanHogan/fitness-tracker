// @ts-check
import eslint from "@eslint/js"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig(
  // 🚫 ignore component library (shadcn, generated UI, etc.)
  {
    ignores: ["**/components/**"],
  },

  eslint.configs.recommended,

  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",

      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
        },
      ],

      "@typescript-eslint/explicit-module-boundary-types": "error",
    },
  },
)

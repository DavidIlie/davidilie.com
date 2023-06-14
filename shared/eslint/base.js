/** @type {import("eslint").Linter.Config} */
const config = {
   extends: [
      "turbo",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "prettier",
   ],
   env: {
      es2022: true,
      node: true,
   },
   parser: "@typescript-eslint/parser",
   plugins: ["@typescript-eslint", "import"],
   rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-unused-vars": [
         "error",
         { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
         "warn",
         { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
         2,
         { checksVoidReturn: { attributes: false } },
      ],
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
   },
   ignorePatterns: [
      "**/.eslintrc.cjs",
      "**/*.config.js",
      "**/*.config.cjs",
      "shared/eslint/**",
      "shared/tailwind/**",
      ".next",
      "dist",
      "pnpm-lock.yaml",
   ],
   reportUnusedDisableDirectives: true,
};

module.exports = config;

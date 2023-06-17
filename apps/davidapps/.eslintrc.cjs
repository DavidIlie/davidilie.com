/** @type {import('eslint').Linter.Config} */
const config = {
   root: true,
   extends: [
      "@david/eslint-config/base",
      "@david/eslint-config/nextjs",
      "@david/eslint-config/react",
   ],
   parserOptions: {
      project: "tsconfig.json",
   },
};

module.exports = config;

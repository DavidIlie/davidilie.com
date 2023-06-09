import { defineConfig } from "tsup";

const cfg = {
   splitting: false,
   sourcemap: true,
   clean: true,
   treeshake: false,
   dts: true,
   format: ["esm", "cjs"],
};

export default defineConfig([
   {
      ...cfg,
      entry: ["src/**/*.tsx"],
      external: ["react"],
      esbuildOptions: (options) => {
         options.banner = {
            js: '"use client";',
         };
      },
   },
]);

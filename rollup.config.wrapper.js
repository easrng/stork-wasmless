import terser from "@rollup/plugin-terser";
export default {
  input: `wrapper.js`,
  output: [
    {
      file: `dist/stork.js`,
      format: "esm",
    },
    {
      file: `dist/stork.min.js`,
      format: "esm",
      plugins: [terser({
        compress: {
          global_defs: {
            "SUFFIX": ".min.js"
          }
        }
      })],
    },
  ],
};

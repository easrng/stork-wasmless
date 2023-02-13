import terser from "@rollup/plugin-terser";
export default {
  input: `stork/stork-wasm/pkg/stork_${process.env.target}.js`,
  output: [
    {
      file: `dist/stork_${process.env.target}.js`,
      format: "esm",
    },
    {
      file: `dist/stork_${process.env.target}.min.js`,
      format: "esm",
      plugins: [terser()],
    },
  ],
};

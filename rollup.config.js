import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

const input = "./src/index.js";

// Treat as externals all not relative and not absolute paths
// e.g. 'react' to prevent duplications in user bundle.
const isExternal = (id) =>
  !id.startsWith("\0") && !id.startsWith(".") && !id.startsWith("/");

const external = ["react", "react-dom"];
const plugins = [
  babel({ babelHelpers: "bundled" }),
  resolve(),
  commonjs(),
];
const minifiedPlugins = [
  ...plugins,
  replace({
    "process.env.NODE_ENV": '"production"',
    preventAssignment: true
  }),
  babel({
    babelHelpers: "bundled",
  }),
  terser({
    compress: { warnings: false },
  }),
];

export default [
  {
    input,
    output: {
      file: "dist/react-input-mask.js",
      format: "umd",
      name: "ReactInputMask",
      globals: { react: "React", "react-dom": "ReactDOM" },
    },
    external,
    plugins: [
      ...plugins,
      replace({
        "process.env.NODE_ENV": '"development"',
         preventAssignment: true
      }),
    ],
  },

  {
    input,
    output: {
      file: "dist/react-input-mask.min.js",
      format: "umd",
      name: "ReactInputMask",
      globals: { react: "React", "react-dom": "ReactDOM" },
    },
    external,
    plugins: minifiedPlugins,
  },

  {
    input,
    output: { file: "lib/react-input-mask.development.js", format: "cjs" },
    external: isExternal,
    plugins,
  },

  {
    input,
    output: { file: "lib/react-input-mask.production.min.js", format: "cjs" },
    external: isExternal,
    plugins: minifiedPlugins,
  },
];

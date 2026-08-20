import { build } from "esbuild";

await build({
  entryPoints: ["src/landing.jsx"],
  bundle: true,
  outfile: "assets/landing.js",
  format: "esm",
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  minify: true,
  legalComments: "none",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

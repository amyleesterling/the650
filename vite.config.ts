import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use RELATIVE asset URLs in the production build (`./assets/…` rather than an
// absolute `/the650/assets/…`). Because the app uses HashRouter, the document
// path never changes at runtime, so relative URLs resolve correctly whatever
// sub-path GitHub Pages serves the site from — this avoids the whole class of
// base-path mismatches that leave the page blank when the served path and the
// hard-coded base don't agree. The dev server keeps '/'.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "./" : "/",
}));

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The repo is served from https://<user>.github.io/the650/ on GitHub Pages,
// so the production base path must match the repository name. The dev server
// keeps '/' so local navigation works from the root.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/the650/" : "/",
}));
